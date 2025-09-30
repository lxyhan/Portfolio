---
title: "Added Regex Pattern Matching and getattr() Fallback to render_pep8_errors()"
---

# SDS Week 4 Presentation

## Agenda this week
- My ticket from last week: refactoring `render_pep8_errors`
  
#### Ran through multiple iterations of this change
- First, I refactored it using a dictionary mapping
- I then updated the naming following a code review
- Thirdly, I converted the function to use Regex matching
- Lastly, I spent a lot of time debugging (tests were failing!)

## 📍 The Original: Long `if`/`elif` Chain

```python
def render_pep8_errors(msg, _node, source_lines=None):
    if "E101" in msg.msg or "E123" in msg.msg:
        yield from render_pep8_errors_e101_and_e123(msg, _node, source_lines)
    elif "E115" in msg.msg:
        yield from render_pep8_errors_e115(msg, _node, source_lines)
    elif "E116" in msg.msg:
        yield from render_pep8_errors_e116(msg, _node, source_lines)
    else:
        yield from render_generic(msg, _node, source_lines)

```

#### Problems
- ❌ Very verbose: 30+ branches is hard to maintain
- Not scalable: adding new codes = more elifs
- 💥 Fragile: assumes msg.msg always exists

## 🛠 First Refactor: Mapping Dictionary

```python
RENDERERS = {
    "E101": render_pep8_errors_e101_and_e123,
    "E123": render_pep8_errors_e101_and_e123,
    "E115": render_pep8_errors_e115,
    # ...
}

def render_pep8_errors(msg, _node, source_lines=None):
    for error_code in RENDERERS:
        if error_code in msg.msg:
            yield from RENDERERS[error_code](msg, _node, source_lines)
            return
    yield from render_generic(msg, _node, source_lines)
```

#### ✅ Improvements
	•	DRY-er logic
	•	Easier to extend

#### ❌ Still Flawed
	•	Manual loop over keys
	•	Still assumes msg.msg exists

⸻

## ⚡ Second Refactor: Regex Matching

```python
def render_pep8_errors(msg, _node, source_lines=None):
    error = re.search(r"(E\d{3})", msg.msg)
    if error:
        yield from RENDERERS[error.group(1)](msg, _node, source_lines)
        return
    yield from render_generic(msg, _node, source_lines)
```

#### ✅ Benefits
- Automatically detects E### codes
- Much cleaner logic

#### ❌ Still Flawed
- Broke Tests: Some mocks use .message not .msg

## 🐛 Bug Summary: `AttributeError: 'Message' object has no attribute 'message'`

### ❓ What happened

Refactored code assumed `msg.msg` always exists:

```python
error = re.search(r"(E\d{3})", msg.msg)
```

#### 💥 The issue

Some test msg objects use .message instead of .msg, causing:

```python
AttributeError: 'Message' object has no attribute 'message'
```

#### ✅ Fix

Use `getattr` fallback:
```
raw_msg = getattr(msg, "msg", None) or getattr(msg, "message", None)
```
#### 🔑 Takeaway

Mocks/test objects may differ — always access attributes defensively.



## 🩹 Final Fix

```python
def render_pep8_errors(msg, _node, source_lines=None):
    raw_msg = getattr(msg, "msg", None) or getattr(msg, "message", None)
    if not raw_msg:
        yield from render_generic(msg, _node, source_lines)
        return

    matched_error = re.search(r"(E\d{3})", raw_msg)
    if matched_error and matched_error.group(1) in RENDERERS:
        yield from RENDERERS[matched_error.group(1)](msg, _node, source_lines)
        return

    yield from render_generic(msg, _node, source_lines)

```

#### ✅ New code now:

	•	Handles test mocks and real cases
	•	Auto-matches error codes
	•	Falls back gracefully

## 🧩 [1-2 min Segway] — Regex Matching in Python

```python
import re

msg = "Something went wrong: E704"
match = re.search(r"E\d{3}", msg)

if match:
    print(match.group(0))  # ➝ 'E704'

🎯 What does r"E\d{3}" mean?

Symbol	Meaning
E	The literal ‘E’ character
\d	Any digit (0-9)
{3}	Exactly 3 digits
r""	Raw string — skips escape parsing

```

## 🧪 Bonus: More Regex Tricks

#### Pattern Meaning

```python
(?<=E)\d{3}	# Match 3 digits after ‘E’ (look behind)
E(?=\d{3})	# Match ‘E’ before 3 digits (look ahead)
E\d{3}(?=:)	# Match E### followed by colon
```

## ✅ Final Outcome
	•	🧼 Replaced 30+ if/elif checks
	•	🧠 Learned defensive attribute handling
	•	🧩 Cleaned up logic with regex
	•	🧪 Bonus: Regex tips for robust matching
