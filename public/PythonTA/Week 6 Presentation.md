---
title: "Added output_format and output_filepath Parameters to AccumulationTable.__init__()"
---

# 🗓️ Weekly Update – James Han

---

## 1. What I Worked On

### Feature: Output Formatting for `AccumulationTable`

- Added support for **CSV output** in addition to `tabulate` tables
- Users can now:
  - Write output to **stdout** or **a specified file**
  - Choose between **table** and **CSV** formats
- Refactored the writer logic to avoid duplication and improve readability

---

## 2. How It Works

### Example Usage
```python
# Example usage:
AccumulationTable(..., output_format="csv", output_path="results.csv")
```

### Output Configuration Matrix

| Output Path | Format | Behavior |
|-------------|--------|----------|
| `None` | `table` | Print to console as table |
| `None` | `csv` | Print to console as CSV |
| `file.csv` | `table` | Append table to file |
| `file.csv` | `csv` | Append CSV to file |

**Simple, clean, and flexible.**

---

## 3. Why It Matters

- **Structured Exports**: Enables structured exports for logging, testing, and pipelines
- **Script Integration**: Helpful for scripts that ingest outputs for further processing
- **Future-Ready**: Lays groundwork for future extensions (e.g., JSON, Markdown table support)

---

## 4. Challenges I Hit

- **Git Branch Issues**: Accidentally branched off a previously merged branch 😬
- **Resolution**: Cleaned it up by cherry-picking the right commits into a new branch
- **Final Step**: Renamed and reopened the PR with just the relevant changes

---

## Next Steps

- Monitor PR feedback and iterate as needed
- Consider additional output formats based on user requests
- Document the new functionality for team reference

---

*End of Weekly Update*