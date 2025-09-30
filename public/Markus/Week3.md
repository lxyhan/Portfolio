---
title: "Fixed N+1 Query in StudentsController#index with Eager Loading"
---

# Markus Week 3 - James Han

## Summary

This week I merged in two PRs that significantly improve our application's performance and maintainability:

1. **Students Page Performance Fix** - Resolved a critical N+1 query issue that was causing extremely slow page loads for instructors with large courses (200+ students). Fixed by adding proper eager loading, reducing database queries from 200+ to just 17.

2. **Rack Deprecation Warnings Cleanup** - Eliminated 26+ deprecation warnings in our test suite by updating status codes from `:unprocessable_entity` to `:unprocessable_content` across 42 files, ensuring future Rack compatibility.


---

## PR: Students Page Performance Issue

Fixed a pretty bad N+1 query problem that was making the Students page super slow for instructors with large courses.

## What was broken

The Students page was doing something really inefficient. Every time an instructor loaded their student list, the page would:
1. Load all the students from the database 
2. Then for each student, make a separate query to get their user info (name, email, etc.)

So for a course with 200 students, we were making 200+ individual database calls. The logs were absolutely full of stuff like:

```sql
User Load SELECT "users".* FROM "users" WHERE "users"."id" = 29 LIMIT 1
User Load SELECT "users".* FROM "users" WHERE "users"."id" = 30 LIMIT 1  
User Load SELECT "users".* FROM "users" WHERE "users"."id" = 31 LIMIT 1
... (and on and on)
```

## Why this was happening

The issue was in `StudentsController#index`. The code was doing:

```ruby
current_course.students.includes(:grace_period_deductions, :section).map do |s|
  # accessing s.user_name, s.first_name, s.email, etc.
end
```

The problem is that `user_name`, `first_name`, etc. aren't actually stored on the Student model - they're delegated to the associated User model through `delegate_missing_to :user` in the Role class. So even though we were eager loading some associations, we weren't loading the one we actually needed.

## The fix

Pretty straightforward once I figured out what was going on. Just added `:user` to the includes:

```ruby
current_course.students.includes(:grace_period_deductions, :section, :user)
```

## Results

- Before: 200+ individual queries 
- After: 17 total queries (most of which are for auth/setup stuff)
- Page load time went from painfully slow to normal

The Rails bullet gem was actually complaining about "over-eager loading" after the fix, but that's a false positive - we definitely need all those associations.

## Testing

Tested it locally with Docker and confirmed the query count dropped dramatically. The Students page loads way faster now, especially noticeable with courses that have lots of students.



## PR: Rack Deprecation Warnings Fix

When running our test suite, we were seeing warnings like this:

```ruby
warning: Status code :unprocessable_entity is deprecated and will be 
removed in a future version of Rack. Please use :unprocessable_content instead.
```

Numerous warnings cluttering our test output every time we run Rspec in docker.

---

## What's Rack?

- Rack is the web server interface that Rails sits on top of
- Think of it as the foundation that handles HTTP requests/responses
- Recent update aligned status codes with official IANA registry

---

## The Fix

**Before:**
```ruby
render 'shared/http_status', 
       locals: { code: '422', message: 'Invalid data' }, 
       status: :unprocessable_entity
```

**After:**
```ruby
render 'shared/http_status', 
       locals: { code: '422', message: 'Invalid data' }, 
       status: :unprocessable_content
```


- Files changed: 42 (controllers + rspec testing files)
- Total replacements: ~150
- Warnings eliminated: 26+
