---
title: "Created python_ta/cfg/__main__.py CLI with Click for generate_cfg() Function"
---

# SDS PythonTA Report: CFG Module CLI Migration
James Han

## 📅 Week in Review

This week, I worked on creating a proper command-line interface for the CFG (Control Flow Graph) generator. This task involved understanding Python's module conventions, designing intuitive CLI interfaces, and making thoughtful decisions about API-to-CLI mappings.

---

## 🔍 Context: The Original Setup

The `python_ta` project has a powerful CFG generator with a comprehensive programmatic API. However, users were accessing it through a simple example script:

```bash
python -m examples.sample_usage.draw_cfg myfile.py
```

### The Original Script

```python
import python_ta.cfg.cfg_generator as cfg_generator
from sys import executable
from os import path

USAGE = f"USAGE: {path.basename(executable)} -m examples.sample_usage.draw_cfg <your-file.py>"

def main(filepath: str) -> None:
    cfg_generator.generate_cfg(mod=filepath, auto_open=True)

if __name__ == "__main__":
    import sys
    if len(sys.argv) < 2:
        print(USAGE)
        exit(1)
    filepath = sys.argv[1]
    main(filepath)
```

### Limitations of the Original Example

1. **Hard-coded behavior**: Always sets `auto_open=True` with no way to disable
2. **No access to visitor options**: The API supports configuration like separate condition blocks and function filtering, but the script doesn't expose them
3. **Basic error handling**: Only checks argument count, not file existence or validity
4. **No help system**: Just prints usage on error, no `--help` flag

---

## 📚 Understanding the Full API

The `generate_cfg` function has a rich API that the script wasn't exposing:

```python
def generate_cfg(
    mod: str = '',
    auto_open: bool = False,
    visitor_options: dict[str, Any] | None = None
) -> None:
    """
    Generate a control flow graph for the given module.
    
    Parameters:
        mod: Path to the module (must have .py extension) or '' for current file
        auto_open: Automatically open the graph in browser
        visitor_options: Configuration dict with options like:
            - "separate-condition-blocks": bool - Whether to separate if conditions
            - "functions": list[str] - Restrict to specific functions/methods
    """
```

### Key API Features Not Accessible via Script:
- Toggle `auto_open` on/off
- Separate if-statement conditions into distinct blocks
- Generate CFGs for specific functions only (useful for large files)

---

## 🎯 The Task: Create a Proper Module CLI

Transform the example script into a proper `__main__.py` file that:
1. Lives in the correct location (`python_ta/cfg/__main__.py`)
2. Exposes all API functionality
3. Provides a professional CLI experience
4. Uses Click for robust argument parsing

---

## 🗺️ Mapping API to CLI Design

### Design Decision 1: The `mod` Parameter

**API**: `mod: str = ''` (empty string means current file)  
**Problem**: No "current file" context when running from command line  
**Decision**: Make it a required positional argument

```bash
python -m python_ta.cfg myfile.py  # Clear and required
```

### Design Decision 2: The `auto_open` Parameter

**API**: `auto_open: bool = False`  
**Options Considered**:
1. `--auto-open/--no-auto-open` (Click's boolean flag pattern)
2. `--auto-open` as a simple flag

**Decision**: Simple flag for cleaner UX
```bash
python -m python_ta.cfg myfile.py --auto-open
```

### Design Decision 3: The `visitor_options` Parameter

**API**: `visitor_options: dict[str, Any] | None`  
**Challenge**: How to pass dictionary data via CLI?

**Options Explored**:

1. **JSON String** (Initial implementation):
   ```bash
   --visitor-options '{"separate-condition-blocks": true, "functions": ["main"]}'
   ```
   ❌ Error-prone, hard to type, requires JSON knowledge

2. **Key=Value Pairs** (David's suggestion):
   ```bash
   --visitor-options "separate-condition-blocks=true,functions=main,helper"
   ```

3. **Individual Options** (Alternative?):
   ```bash
   --separate-condition-blocks --functions main --functions helper
   ```

---

## 💬 Communication & Iteration

### Initial Implementation & Feedback

**My initial message to David:**
> I made a few design decisions for the CLI API that I wanted to run by you:
> - Made `mod` a required positional argument since there's no "current file" context from command line
> - Chose `--auto-open` as a simple flag rather than `--auto-open/--no-auto-open` for cleaner UX
> - Implemented `--visitor-options` as a JSON string to stay flexible and match the dict structure

**David's feedback:**
> - Making `mod` required in the CLI is good
> - Simple flag for `--auto-open` is good
> - For `--visitor-options`, I don't like using JSON syntax, which is annoying for humans to type manually

### Handling the `functions` List Challenge

**My follow-up question:**
> Quick question about parsing the `functions` option since it takes a list - with commas already separating key=value pairs, how should I handle multiple function names?

**David's solution:**
> Using quotes to surround the function argument is ideal. We should accept either single or double quotes

This exchange led me to reconsider and ultimately implement individual CLI options instead.

---

## 🛠️ Final Implementation

### `python_ta/cfg/__main__.py`

```python
import click
from typing import Any
from . import cfg_generator

@click.command()
@click.argument('mod', type=click.Path(exists=True))
@click.option('--auto-open', is_flag=True, default=False,
              help='Automatically open the graph in your browser')
@click.option('--separate-condition-blocks', is_flag=True,
              help='Place if-statement conditions in separate blocks')
@click.option('--functions', multiple=True,
              help='Generate CFG only for specified functions (can be used multiple times)')
def main(mod: str, auto_open: bool, separate_condition_blocks: bool,
         functions: tuple[str, ...]) -> None:
    """Generate a control flow graph for a Python module."""
    
    # Build visitor_options only if needed
    visitor_options = {}
    
    if separate_condition_blocks:
        visitor_options["separate-condition-blocks"] = True
    
    if functions:
        visitor_options["functions"] = list(functions)
    
    # Call the original API
    cfg_generator.generate_cfg(
        mod=mod,
        auto_open=auto_open,
        visitor_options=visitor_options if visitor_options else None
    )

if __name__ == '__main__':
    main()
```

---

## 🧪 Test Suite

### `tests/test_cfg_cli.py`

```python
import pytest
from click.testing import CliRunner
from unittest.mock import patch, MagicMock
from python_ta.cfg.__main__ import main


class TestCFGCLI:
    """Test suite for the CFG module CLI interface."""
    
    def setup_method(self):
        """Set up test fixtures."""
        self.runner = CliRunner()
        self.test_file = 'test_module.py'
    
    @patch('python_ta.cfg.__main__.cfg_generator.generate_cfg')
    def test_basic_invocation(self, mock_generate):
        """Test basic CLI invocation with just a file path."""
        with self.runner.isolated_filesystem():
            # Create a test file
            with open(self.test_file, 'w') as f:
                f.write('print("hello")')
            
            result = self.runner.invoke(main, [self.test_file])
            
            assert result.exit_code == 0
            mock_generate.assert_called_once_with(
                mod=self.test_file,
                auto_open=False,
                visitor_options=None
            )
    
    @patch('python_ta.cfg.__main__.cfg_generator.generate_cfg')
    def test_auto_open_flag(self, mock_generate):
        """Test --auto-open flag functionality."""
        with self.runner.isolated_filesystem():
            with open(self.test_file, 'w') as f:
                f.write('print("hello")')
            
            result = self.runner.invoke(main, [self.test_file, '--auto-open'])
            
            assert result.exit_code == 0
            mock_generate.assert_called_once_with(
                mod=self.test_file,
                auto_open=True,
                visitor_options=None
            )
    
    @patch('python_ta.cfg.__main__.cfg_generator.generate_cfg')
    def test_separate_condition_blocks(self, mock_generate):
        """Test --separate-condition-blocks flag."""
        with self.runner.isolated_filesystem():
            with open(self.test_file, 'w') as f:
                f.write('if True: pass')
            
            result = self.runner.invoke(
                main, 
                [self.test_file, '--separate-condition-blocks']
            )
            
            assert result.exit_code == 0
            mock_generate.assert_called_once_with(
                mod=self.test_file,
                auto_open=False,
                visitor_options={'separate-condition-blocks': True}
            )
    
    @patch('python_ta.cfg.__main__.cfg_generator.generate_cfg')
    def test_single_function_filter(self, mock_generate):
        """Test filtering to a single function."""
        with self.runner.isolated_filesystem():
            with open(self.test_file, 'w') as f:
                f.write('def main(): pass')
            
            result = self.runner.invoke(
                main,
                [self.test_file, '--functions', 'main']
            )
            
            assert result.exit_code == 0
            mock_generate.assert_called_once_with(
                mod=self.test_file,
                auto_open=False,
                visitor_options={'functions': ['main']}
            )
    
    @patch('python_ta.cfg.__main__.cfg_generator.generate_cfg')
    def test_multiple_function_filters(self, mock_generate):
        """Test filtering to multiple functions."""
        with self.runner.isolated_filesystem():
            with open(self.test_file, 'w') as f:
                f.write('def foo(): pass\ndef bar(): pass')
            
            result = self.runner.invoke(
                main,
                [self.test_file, '--functions', 'foo', '--functions', 'bar']
            )
            
            assert result.exit_code == 0
            mock_generate.assert_called_once_with(
                mod=self.test_file,
                auto_open=False,
                visitor_options={'functions': ['foo', 'bar']}
            )
    
    @patch('python_ta.cfg.__main__.cfg_generator.generate_cfg')
    def test_qualified_method_names(self, mock_generate):
        """Test support for qualified method names like MyClass.method."""
        with self.runner.isolated_filesystem():
            with open(self.test_file, 'w') as f:
                f.write('class MyClass:\n    def method(self): pass')
            
            result = self.runner.invoke(
                main,
                [self.test_file, '--functions', 'MyClass.method']
            )
            
            assert result.exit_code == 0
            mock_generate.assert_called_once_with(
                mod=self.test_file,
                auto_open=False,
                visitor_options={'functions': ['MyClass.method']}
            )
    
    @patch('python_ta.cfg.__main__.cfg_generator.generate_cfg')
    def test_all_options_combined(self, mock_generate):
        """Test using all CLI options together."""
        with self.runner.isolated_filesystem():
            with open(self.test_file, 'w') as f:
                f.write('def main():\n    if True: pass')
            
            result = self.runner.invoke(
                main,
                [
                    self.test_file,
                    '--auto-open',
                    '--separate-condition-blocks',
                    '--functions', 'main',
                    '--functions', 'helper'
                ]
            )
            
            assert result.exit_code == 0
            mock_generate.assert_called_once_with(
                mod=self.test_file,
                auto_open=True,
                visitor_options={
                    'separate-condition-blocks': True,
                    'functions': ['main', 'helper']
                }
            )
    
    def test_nonexistent_file_error(self):
        """Test error handling for nonexistent files."""
        result = self.runner.invoke(main, ['nonexistent.py'])
        
        assert result.exit_code == 2
        assert 'Path "nonexistent.py" does not exist' in result.output
    
    def test_help_message(self):
        """Test that --help displays proper documentation."""
        result = self.runner.invoke(main, ['--help'])
        
        assert result.exit_code == 0
        assert 'Generate a control flow graph' in result.output
        assert '--auto-open' in result.output
        assert '--separate-condition-blocks' in result.output
        assert '--functions' in result.output
    
    @patch('python_ta.cfg.__main__.cfg_generator.generate_cfg')
    def test_empty_visitor_options_not_passed(self, mock_generate):
        """Test that empty visitor_options dict is passed as None."""
        with self.runner.isolated_filesystem():
            with open(self.test_file, 'w') as f:
                f.write('pass')
            
            # No visitor options specified
            result = self.runner.invoke(main, [self.test_file])
            
            assert result.exit_code == 0
            # Should pass None, not empty dict
            mock_generate.assert_called_once_with(
                mod=self.test_file,
                auto_open=False,
                visitor_options=None
            )


class TestCFGModuleInvocation:
    """Test invoking the CFG module directly."""
    
    @patch('python_ta.cfg.__main__.cfg_generator.generate_cfg')
    def test_module_invocation(self, mock_generate):
        """Test running as python -m python_ta.cfg."""
        import subprocess
        import sys
        
        with CliRunner().isolated_filesystem():
            with open('test.py', 'w') as f:
                f.write('print("test")')
            
            # Test that the module can be invoked
            result = subprocess.run(
                [sys.executable, '-m', 'python_ta.cfg', 'test.py'],
                capture_output=True,
                text=True
            )
            
            # Should not error
            assert result.returncode in (0, 1)  # 1 if module not installed
```

---

## 📊 Before vs After Comparison

### Before (Example Script)
```bash
# Limited functionality
$ python -m examples.sample_usage.draw_cfg myfile.py

# No options available
$ python -m examples.sample_usage.draw_cfg
USAGE: python -m examples.sample_usage.draw_cfg <your-file.py>
```

### After (Proper CLI)
```bash
# Full functionality
$ python -m python_ta.cfg myfile.py
$ python -m python_ta.cfg myfile.py --auto-open
$ python -m python_ta.cfg myfile.py --separate-condition-blocks
$ python -m python_ta.cfg myfile.py --functions main --functions MyClass.method

# Professional help system
$ python -m python_ta.cfg --help
Usage: python -m python_ta.cfg [OPTIONS] MOD

  Generate a control flow graph for a Python module.

Options:
  --auto-open                  Automatically open the graph in your browser
  --separate-condition-blocks  Place if-statement conditions in separate blocks
  --functions TEXT            Generate CFG only for specified functions
  --help                      Show this message and exit.
```

---

## 🚀 Migration & Cleanup

### Files Changed
```diff
- examples/sample_usage/draw_cfg.py  # Removed
+ python_ta/cfg/__main__.py         # Added
+ tests/test_cfg_cli.py             # Added
```

### Documentation Updates
- Updated Docs to reference new CLI usage
- Added docstring examples showing both programmatic and CLI usage

---

## 📚 Key Learnings

1. **API Design != CLI Design**: What works for programmatic interfaces may need rethinking for command-line usage
2. **User Experience Matters**: JSON might be flexible, but individual options are more user-friendly
3. **Iterative Design**: Initial implementations benefit from feedback and revision
4. **Convention Power**: Following Python conventions (`__main__.py`) makes tools more discoverable
5. **Test Coverage**: CLI tools need comprehensive testing, including error cases and help documentation

---

## ✨ Impact

This migration transforms a useful but limited example script into a professional CLI tool that:
- Exposes the full power of the CFG API
- Provides excellent user experience with help and error messages
- Follows Python best practices and conventions
- Sets a pattern for future CLI tools in the project

The journey from example to official feature showcases the natural evolution of developer tools and the importance of listening to user needs.