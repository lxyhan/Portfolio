---
title: "Built split_by_comma_if_outside_quotes() Parser for --visitor-options CLI Argument"
---

# SDS PythonTA: Weekly Standup
James Han

## 📅 Quick Recap: Last Week

Created CFG module CLI in additional to the Python code:
- Moved from `examples/sample_usage/draw_cfg.py` to `python_ta/cfg/__main__.py`
- Initial implementation used JSON for `--visitor-options`

---

## 🔧 This Week: Building a User-Friendly Parser

### The Problem

JSON Syntax -> CSV

```bash
# What users had to type:
--visitor-options '{"separate-condition-blocks": true, "functions": ["main", "helper"]}'

# What they wanted:
--visitor-options "separate-condition-blocks=true,functions='main,helper'"
```

### Challenge

How do you parse comma-separated key=value pairs when the values themselves might contain commas?

---

## Solution

```python
def split_by_comma_if_outside_quotes(options_str: str) -> List[str]:
    """Split string by commas, but not commas inside quotes."""
    parts = []
    current_part = []
    in_quotes = False
    quote_char = None
    
    for char in options_str:
        if char in ('"', "'") and not in_quotes:
            in_quotes = True
            quote_char = char
            current_part.append(char)
        elif char == quote_char and in_quotes:
            in_quotes = False
            quote_char = None
            current_part.append(char)
        elif char == ',' and not in_quotes:
            parts.append(''.join(current_part).strip())
            current_part = []
        else:
            current_part.append(char)
    
    if current_part:
        parts.append(''.join(current_part).strip())
    
    return parts
```

---


## Inital Approach
```Python
def parse_visitor_options(options_str):
    """Parse comma-separated key=value pairs."""
    if not options_str:
        return {}

    options = {}

    if "separate-condition-blocks=" in options_str:
        if "separate-condition-blocks=true" in options_str:
            options["separate-condition-blocks"] = True
        elif "separate-condition-blocks=false" in options_str:
            options["separate-condition-blocks"] = False
        else:
            raise ValueError("separate-condition-blocks must be 'true' or 'false'")

    if "functions=" in options_str:
        start = options_str.find("functions=") + len("functions=")
        value = options_str[start:].strip().strip("'\"")
        if not value:
            raise ValueError("functions cannot be empty")
        options["functions"] = [f.strip() for f in value.split(",")]

    return options
```

## Parsing Function

The parser automatically converts string values to appropriate Python types:

```python
def parse_visitor_options(options_str: str) -> Dict[str, Union[bool, List[str], str]]:
    """Parse comma-separated key=value pairs."""
    if not options_str:
        return {}

    parts = split_by_comma_if_outside_quotes(options_str)

    options: Dict[str, Union[bool, List[str], str]] = {}
    for part in parts:
        if "=" not in part:
            continue

        key, value = part.split("=", 1)
        value = value.strip()

        # Strip any quotes if present
        if value.startswith(("'", '"')) and value.endswith(("'", '"')):
            value = value[1:-1]

        # Type conversions
        if value.lower() in ("true", "false"):
            options[key] = value.lower() == "true"
        elif "," in value:
            options[key] = [v.strip() for v in value.split(",")]
        else:
            options[key] = value

    return options
```
---

## Testing

```python
"""
Test suite for the CFG CLI interface.
"""

from unittest.mock import patch

from click.testing import CliRunner

from python_ta.cfg.__main__ import main


class TestCFGCLI:
    """Test the command-line interface for CFG generation."""

    def setup_method(self):
        """Set up the Click test runner."""
        self.runner = CliRunner()

    @patch("python_ta.cfg.__main__.generate_cfg")
    def test_basic_call(self, mock_generate_cfg):
        """Test basic CLI call with just filepath."""
        result = self.runner.invoke(main, ["mock_file.py"])

        assert result.exit_code == 0
        mock_generate_cfg.assert_called_once_with(
            mod="mock_file.py", auto_open=False, visitor_options=None
        )

    @patch("python_ta.cfg.__main__.generate_cfg")
    def test_with_auto_open(self, mock_generate_cfg):
        """Test CLI with --auto-open flag."""
        result = self.runner.invoke(main, ["mock_file.py", "--auto-open"])

        assert result.exit_code == 0
        mock_generate_cfg.assert_called_once_with(
            mod="mock_file.py", auto_open=True, visitor_options=None
        )

    @patch("python_ta.cfg.__main__.generate_cfg")
    def test_with_visitor_options_separate_conditions(self, mock_generate_cfg):
        """Test CLI with visitor options for separate-condition-blocks."""
        options = {"separate-condition-blocks": True}
        result = self.runner.invoke(
            main, ["mock_file.py", "--visitor-options", "separate-condition-blocks=true"]
        )

        assert result.exit_code == 0
        mock_generate_cfg.assert_called_once_with(
            mod="mock_file.py", auto_open=False, visitor_options=options
        )

    @patch("python_ta.cfg.__main__.generate_cfg")
    def test_with_visitor_options_functions(self, mock_generate_cfg):
        """Test CLI with visitor options for specific functions."""
        options = {"functions": ["MyClass.method", "top_level_func"]}
        result = self.runner.invoke(
            main, ["mock_file.py", "--visitor-options", "functions='MyClass.method,top_level_func'"]
        )

        assert result.exit_code == 0
        mock_generate_cfg.assert_called_once_with(
            mod="mock_file.py", auto_open=False, visitor_options=options
        )

    @patch("python_ta.cfg.__main__.generate_cfg")
    def test_with_all_options(self, mock_generate_cfg):
        """Test CLI with all options combined."""
        options = {
            "separate-condition-blocks": True,
            "functions": ["analyze_data", "MyClass.process"],
        }
        result = self.runner.invoke(
            main,
            [
                "mock_file.py",
                "--auto-open",
                "--visitor-options",
                "separate-condition-blocks=true,functions='analyze_data,MyClass.process'",
            ],
        )

        assert result.exit_code == 0
        mock_generate_cfg.assert_called_once_with(
            mod="mock_file.py", auto_open=True, visitor_options=options
        )

    def test_missing_filepath_argument(self):
        """Test CLI without required filepath argument."""
        result = self.runner.invoke(main, [])

        assert result.exit_code == 2
        assert "Missing argument" in result.output

    def test_help_message(self):
        """Test that --help displays expected information."""
        result = self.runner.invoke(main, ["--help"])

        assert result.exit_code == 0
        assert "Generate a Control Flow Graph" in result.output
        assert "--auto-open" in result.output
        assert "--visitor-options" in result.output
        assert "Comma-separated key=value pairs" in result.output
```

### Edge Cases Tested

```python
# Empty options
--visitor-options ""                      → {}

# No equals sign (ignored)
--visitor-options "invalid"               → {}

# Multiple equals signs (split on first)
--visitor-options "path=/home/user=test"  → {"path": "/home/user=test"}

# Nested quotes
--visitor-options 'msg="Hello, world"'    → {"msg": "Hello, world"}
```

---

## 🔄 Git Workflow Lessons

### The Independent PR Challenge

**Week 1**: Created PRs that built on each other
```
master → PR1 → PR2 → PR3  ❌
```

Each PR should not contain changes from other PRs

**Week 2**: Fixed approach
```
master → PR1
master → PR2  ✅
master → PR3
```

### Key Learnings:
1. **Always branch from master**: `git checkout -b feature master`
2. **Check "Files Changed" tab**: Ensure PR only shows intended changes
3. **Update after merges**: Rebase other PRs when one gets merged
4. **Make small but maintainable and correct PRs**: Makes it easier for reviewers and for PRs to get merged
