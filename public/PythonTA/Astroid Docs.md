---
title: "Astroid Documentation: extract_node() and nodes_of_class() Reference"
---

# ASTs and Astroid
Goal: parse python code by converting it to a standardized format. We use Astroid to build an Abstract Syntax Tree.

#### Building and accessing an AST using Astroid
`astroid.extract_node` takes a string of python code and builds a tree of astroid node class instances in memory.
```

node = astroid.extract_node("a = 1 + 2")

```
It takes in code as a string, where the special squence `#@` is like a bookmark that tells extract_node to return the node on that line.

Here, because there are no `#@`, `extract_node` returns the top level node of the AST it built (in this case, an `Assign` node)
That Assign node then contains:
    - `Assign.targets`-> a `Name` node (`a`)
    - `Assign.value`-> a `BinOp` node (representing 1+2)
    - and so on… where the `BinOp` node also has left, right, and op attributes
    
```
node_a, node_b = astroid.extract_node("""
... def test():
...     if True:
...         return 5 #@
...     return 5 #@
... """)
```
Here, because there are two `#@` markers, `extract_node` will only return those two lines. `node_a` will be the node returned in the first return statement, and `node_b` contains the node returned in the second return statement.

For every Astroid AST:
- ✅ The **nodes** (tree structure) are all astroid classes — like `Const`, `Call`, `If`, `FunctionDef`, etc.
- ✅ But the **properties** of those nodes (like `.op`, `.value`, `.name`) can be _primitive Python types_.

#### Common types of nodes
- `Const`: literal atomic values in python (chars, strings, integers, floats, booleans)
- `Bin_Op`: a Binary operation excluding `or` and `and`, which are `Bool_Op` nodes
- `Call`: A function call or method call on an object
- `List`
- `Expr`
- `Statement`
- `If`
- `For`
- `FunctionDef`


    