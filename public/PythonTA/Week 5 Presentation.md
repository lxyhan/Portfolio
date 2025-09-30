---
title: "Fixed AccumulationTable.loop_variables Extraction Using nodes_of_class(astroid.AssignName)"
---

# SDS Week 5: Accumulation Table: Nested Loop Variables
James Han

## 📅 Week in Review

This week, I tackled a surprisingly tricky bug in the `AccumulationTable` feature related to extracting **loop variables from nested structures** – tuples within tuples, lists inside tuples, etc.

Our goal? To improve the `AccumulationTable` so it can automatically extract **all loop variables**, regardless of how deeply nested they are. It turns out, Python’s AST (abstract syntax tree) gets gnarly fast when the structure isn’t flat.

---

## 🔍 Context

The `AccumulationTable` class powers a dynamic table that displays changing variable values during each iteration of a loop. It’s a teaching tool for beginner programmers to visualize what happens inside `for` loops.

Previously, this worked well for simple cases like:

```python
for x in items:
    ...
```

But failed when loop targets looked like:

```python
for a, (b, (c, d)) in data:
    ...
```

In this structure, `a`, `b`, `c`, and `d` were not being picked up correctly.

---

## 🐛 The Bug

The original extraction logic looked like this:

```python
if isinstance(node, astroid.For) and isinstance(node.target, astroid.Tuple):
    self.loop_variables = {loop_var.name: [] for loop_var in node.target.elts}
elif isinstance(node, astroid.For):
    self.loop_variables[node.target.name] = []
```

🔴 **Problem:** This only handled flat tuples — it didn’t recurse into inner tuples or lists.

---

## First Attempt

Before arriving at the clean solution, I tried writing a recursive helper to handle nested tuple unpacking manually:

```python
def extract_loop_variables(self, target: Any) -> dict:
    # if isinstance(target, astroid.Name):
    #     return {target.name: []}
    # elif isinstance(target, (astroid.Tuple, astroid.List)):
    #     loop_variables = {}
    #     for element in target.elts:
    #         loop_variables.update(self.extract_loop_variables(element))
    #     return loop_variables
    # else:
    #     print(f"[WARNING] Unexpected loop target node: {target!r}")
    #     return {}

    print(
        "[DEBUG] loop variable names:",
        [node.AssignName for node in target.nodes_of_class(astroid.AssignName)],
    )
    return
```

This helped debug the issue but was verbose, incomplete, and hard to scale.


## 🛠️ The Fix

By reading the **Astroid** documentation and inspecting examples in the codebase, we discovered that `nodes_of_class(astroid.AssignName)` recursively finds **all variables**, regardless of nesting level.

### ✅ Final Fix

```python
if isinstance(node, astroid.For):
    self.loop_variables = {
        nested_node.name: []
        for nested_node in node.target.nodes_of_class(astroid.AssignName)
    }
```

This was cleaner, more robust, and handled any depth of nesting.

---

## 🧪 New Test Cases

We added comprehensive tests to validate the new functionality:

### `test_accumulation_table_deeply_nested_tuple`

```python
data = [
    ("x", ([1], (2, 3))),
    ("y", ([4], (5, 6))),
]
with AccumulationTable(["data"]) as table:
    for a, (b, (c, d)) in data:
        b[0] += 1

assert table.loop_variables["a"] == ["N/A", "x", "y"]
assert table.loop_variables["b"] == ["N/A", [2], [5]]
assert table.loop_variables["c"] == ["N/A", 2, 5]
assert table.loop_variables["d"] == ["N/A", 3, 6]
```

### `test_accumulation_table_list_deepcopy`

This test ensured we **deepcopy data correctly** to track mutations:

```python
data = [[1], [2], [3]]
with AccumulationTable(["data"]) as table:
    for sublist in data:
        sublist[0] *= 2

assert table.loop_accumulators["data"] == [
    [[1], [2], [3]],
    [[2], [2], [3]],
    [[2], [4], [3]],
    [[2], [4], [6]],
]
```

---

## 📚 Key Learnings

* **Documentation is king** – Astroid has powerful utilities like `nodes_of_class`.
* **Don’t reinvent the wheel** – Referencing how other features are implemented helped guide this fix.
* **Testing deeply matters** – Nested test cases exposed edge conditions we’d otherwise miss.

---

## ✨ Final Thoughts

This bug was sneaky, but fixing it helped us:

* Improve reliability for students using the debugger
* Deepen our understanding of Python ASTs
* Write cleaner, more generalizable code
