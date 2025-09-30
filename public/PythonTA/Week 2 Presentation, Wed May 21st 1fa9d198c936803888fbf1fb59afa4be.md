---
title: "Refactored render_pep8_errors() from if/elif Chain to ERROR_TO_ERROR_FUNCTION_MAPPING Dictionary"
---
# Week 2 Presentation, Wed May 21st

James Han, Students Developing Software

## 🧪 Task #1: Debugging test for `color_messages_by_type`

### ✅ The Problem

We had a module with three unused imports:

```python
import os
import sys
import math
```

```python
def test_check_all_returns_max_messages_when_max_exceeded(capsys):
    """Test that check_all outputs only the max number of messages set when the max is exceeded."""

    python_ta.check_all(
        "tests/fixtures/unused_imports.py",
        config={
            "output-format": "pyta-plain",
            "pyta-number-of-messages": 2,
        },
    )

    output = capsys.readouterr().out
    
    # Trucation message indicating max messages should be present
    assert "First 2 shown" in output
```

The test was checking that the output was limited to two messages — but it didn’t **specify which two**, making it brittle and unclear.

---

### 🛠 What I Changed

Updated the test to **expect specific lines**:

```python
assert "[Line 3]" in output
assert "[Line 4]" in output
assert "[Line 5]" not in output
```

Also ensured the truncation message appears:

```python
assert "First 2 shown" in output
```

Final Code:

```python
def test_check_all_returns_max_messages_when_max_exceeded(capsys):
    """Test that check_all outputs only the max number of messages set when the max is exceeded."""

    python_ta.check_all(
        "tests/fixtures/unused_imports.py",
        config={
            "output-format": "pyta-plain",
            "pyta-number-of-messages": 2,
        },
    )

    output = capsys.readouterr().out

    # Check that the first two outputs should appear
    assert "[Line 3]" in output
    assert "[Line 4]" in output

    # Verify that the third import should NOT be present
    assert "[Line 5]" not in output

    # Trucation message indicating max messages should be present
    assert "First 2 shown" in output
```

---

### 💡 Why It Matters

- Now the test is **clearer** and **more reliable**
- Prevents false positives if line ordering changes
- Boosts confidence that truncation logic works correctly

# (mini) Task #2: Refactoring PEP8 Error Rendering

---

```markdown
- [ ] I have updated the project documentation, if applicable.
  - This is **required** for new features.
- [ ] I have updated the project Changelog (this is required for all changes).
- [ ] If this is my first contribution, I have added myself to the [list of contributors](https://github.com/pyta-uoft/pyta/blob/master/README.md#contributors).

After opening your pull request:
```

# Task #3: Refactoring PEP8 Error Rendering

---

## The Goal

Refactor the `render_pep8_errors` function to remove the long if/elif chain.

**Why It Matters:**

- Improves readability and maintainability
- Makes adding new error codes a breeze
- Matches existing patterns (e.g., `CUSTOM_MESSAGES`)

> This was a focused refactor that cleans up a core part of how we format PEP8 errors. It replaces a brittle if/elif structure with a cleaner dictionary-based approach.
> 

---

## The Problem

**Original Code Pattern:**

```python

if "E101" in msg.msg:
    yield from render_pep8_errors_e101(msg, ...)
elif "E272" in msg.msg:
    yield from render_pep8_errors_e272(msg, ...)
...
```

**Issues:**

- Hard to scan and extend
- Risk of typos or misgrouped logic
- No single source of truth for what’s supported

> Every new error meant adding a new branch. Some branches even shared logic, which wasn’t always obvious. This kind of logic becomes technical debt fast.
> 

---

## 🚀 The Refactor

**New Code Pattern:**

```python

ERROR_TO_ERROR_FUNCTION_MAPPING = {
    "E101": render_pep8_errors_e101,
    "E272": render_pep8_errors_e272,
    ...
}

def render_pep8_errors(msg, node, lines=None):
    for code, fn in ERROR_TO_ERROR_FUNCTION_MAPPING.items():
        if code in msg.msg:
            yield from fn(msg, node, lines)
            return
    yield from render_generic(msg, node, lines)
```

**Benefits:**

- Clearer structure
- Centralized logic
- Easier to test & extend

> This is much more Pythonic. The mapping approach improves debuggability and lets us reuse logic cleanly.
>