---
title: "Fixed SectionsController#destroy Foreign Key Violation with section_starter_file_groups"
---

# Markus Week 4

## Summary

This week I fixed a foreign key constraint violation bug that was preventing instructors from deleting sections that had starter file groups assigned to them.

---

## PR: Section Deletion Foreign Key Error

Fixed a database constraint error that was blocking section deletion when starter file groups were assigned.

## What was broken

When instructors tried to delete a section that had starter file groups assigned to it, they'd get hit with this error:

```
PG::ForeignKeyViolation: ERROR: update or delete on table "sections" 
violates foreign key constraint "fk_rails_e17dbd98da" on table 
"section_starter_file_groups"
DETAIL: Key (id)=(3) is still referenced from table 
"section_starter_file_groups".
```

The section wouldn't delete and instructors were stuck.

## Why this was happening

The `SectionsController#destroy` method was cleaning up some associations before deleting the section, but not all of them:

```ruby
@section.assessment_section_properties.each(&:destroy)
@section.destroy  # ❌ BOOM - foreign key violation
```

The problem: `section_starter_file_groups` is a join table that connects sections to their starter file templates. These records have a `section_id` foreign key pointing to the section. The database won't let you delete a section while these references still exist.

## The fix

Added one line to destroy the starter file group assignments before destroying the section:

```ruby
@section.assessment_section_properties.each(&:destroy)
@section.section_starter_file_groups.each(&:destroy)  # ✅ Clean up the join table
@section.destroy  # Now this works!
```

## Results

- Sections with assigned starter file groups can now be deleted successfully
- No more foreign key violation errors
- Follows the same cleanup pattern already used for assessment properties

## Testing

Tested locally by creating a section, assigning starter file groups to it, then deleting it. Previously would fail with the foreign key error, now deletes cleanly.