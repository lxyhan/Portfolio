---
title: "Refactored AccumulationTable Tests with @pytest.fixture Parametrization"
---

# 🗓️ SDS PythonTA Week 7 Update – James Han

---

## What I Worked On This Week

Added output formatting options to `AccumulationTable`. Before this, users could only get the default tabulated output printed to console. Now they can:

- Choose between **table** and **csv** formats
- Output to a file instead of just console
- Append to existing files (useful for logging multiple runs)

---

## The Implementation

### Updated Constructor

```python
def __init__(
    self,
    accumulation_names: list[str],
    output: Union[None, str] = None,
    format: Literal["table", "csv"] = "table",
) -> None:
```

### Core Logic Changes

The main change was in `_tabulate_data()` - split it into two branches:

```python
def _tabulate_data(self) -> None:
    """Print the values of the accumulator and loop variables into a table"""
    iteration_dict = self._create_iteration_dict()
    
    if self.output_format == "table":
        table = tabulate.tabulate(
            iteration_dict,
            headers="keys",
            colalign=(*["left"] * len(iteration_dict),),
            disable_numparse=True,
            missingval="None",
        )
        
        if self.output_filepath is None:
            print(table)
        else:
            try:
                with open(self.output_filepath, "a") as file:
                    file.write(table)
                    file.write("\n")
            except OSError as e:
                print(f"Error writing table formatted data to file: {e}")
    else:
        # CSV format
        csv_preformat = [
            dict(zip(iteration_dict.keys(), row)) 
            for row in zip(*iteration_dict.values())
        ]
        
        if self.output_filepath is None:
            writer = csv.DictWriter(sys.stdout, fieldnames=iteration_dict.keys())
            writer.writeheader()
            writer.writerows(csv_preformat)
        else:
            try:
                with open(self.output_filepath, "a", newline="") as file:
                    writer = csv.DictWriter(file, fieldnames=iteration_dict.keys())
                    writer.writeheader()
                    writer.writerows(csv_preformat)
            except OSError as e:
                print(f"Error writing csv formatted data to file: {e}")
```

---

## Usage Examples

### Basic CSV output to console:
```python
with AccumulationTable(["sum_so_far"], format="csv"):
    for number in [10, 20, 30]:
        sum_so_far += number
```

### Writing to file:
```python
with AccumulationTable(["sum_so_far", "avg_so_far"], 
                      output="results.txt", 
                      format="csv"):
    for number in numbers:
        sum_so_far += number
        avg_so_far = sum_so_far / count
```

---

## Testing Changes

Had to refactor the existing tests to be parametrized. The old approach had separate `test_tabular_output_to_existing_file()` and `test_csv_output_to_existing_file()` functions that were basically identical except for format.

### New Parametrized Tests

```python
@pytest.fixture(params=["table", "csv"])
def output_format(request):
    """Parametrized fixture for output format."""
    return request.param

def test_output_to_existing_file(existing_file_content, output_format):
    """Test output to existing file with parametrized format."""
    numbers = [10, 20, 30, 40, 50, 60]
    sum_so_far = 0
    list_so_far = []
    avg_so_far = None
    
    table_kwargs = {"output": str(existing_file_content)}
    if output_format == "csv":
        table_kwargs["format"] = "csv"
    
    with AccumulationTable(["sum_so_far", "avg_so_far", "list_so_far"], **table_kwargs):
        for number in numbers:
            sum_so_far = sum_so_far + number
            avg_so_far = sum_so_far / (len(list_so_far) + 1)
            list_so_far.append((sum_so_far, avg_so_far))

    # Check the file content
    with open(existing_file_content, "r") as file:
        content = file.read()
    
    expected_table_content = get_expected_content(output_format)
    if output_format == "table":
        expected_file_content = "Existing Content\n" + expected_table_content + "\n"
    else:
        expected_file_content = "Existing Content\n" + expected_table_content
    
    assert content == expected_file_content
```

### Expected Output Strings

Instead of dynamically generating expected output (which could hide bugs), wrote out the literal expected strings:

```python
def get_expected_content(format_type):
    """Return the exact expected file content as literal strings."""
    if format_type == "csv":
        return """iteration,number,sum_so_far,avg_so_far,list_so_far
0,N/A,0,,[]
1,10,10,10.0,"[(10, 10.0)]"
2,20,30,15.0,"[(10, 10.0), (30, 15.0)]"
3,30,60,20.0,"[(10, 10.0), (30, 15.0), (60, 20.0)]"
4,40,100,25.0,"[(10, 10.0), (30, 15.0), (60, 20.0), (100, 25.0)]"
5,50,150,30.0,"[(10, 10.0), (30, 15.0), (60, 20.0), (100, 25.0), (150, 30.0)]"
6,60,210,35.0,"[(10, 10.0), (30, 15.0), (60, 20.0), (100, 25.0), (150, 30.0), (210, 35.0)]"
"""
    else:  # table format
        return """iteration    number    sum_so_far    avg_so_far    list_so_far
-----------  --------  ------------  ------------  ---------------------------------------------------------------------------
0            N/A       0             None          []
1            10        10            10.0          [(10, 10.0)]
2            20        30            15.0          [(10, 10.0), (30, 15.0)]
3            30        60            20.0          [(10, 10.0), (30, 15.0), (60, 20.0)]
4            40        100           25.0          [(10, 10.0), (30, 15.0), (60, 20.0), (100, 25.0)]
5            50        150           30.0          [(10, 10.0), (30, 15.0), (60, 20.0), (100, 25.0), (150, 30.0)]
6            60        210           35.0          [(10, 10.0), (30, 15.0), (60, 20.0), (100, 25.0), (150, 30.0), (210, 35.0)]"""
```

---

## Problems I Ran Into

### Git Branch Mess
Accidentally branched off an old merged branch instead of main. Ended up with a bunch of unrelated commits in my PR. Had to:
1. Create a clean branch from main  
2. Cherry-pick just my commits
3. Force push and update the PR

---