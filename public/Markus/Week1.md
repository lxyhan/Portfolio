---
title: "Created assignment_with_criteria_and_released_results Factory for Test Suite"
---

# Markus Week 3

## Overview

### This Week's Accomplishments

**MarkUs Development**
- Completed code review improvements for criteria controller test suite
- Refactored factories and test setup based on David's feedback

**Hack the North Weekend**
- Built Orbit - AI-powered networking assistant
- Gained valuable experience with real-time AI systems

---

## Factory Improvements

### Created Reusable Factory for Released Results

**The Problem**: 
Released marks are a critical security feature in MarkUs - once released, they can't be modified (triggers student emails, audit logging). We had manual release logic duplicated across multiple tests.

```ruby
# OLD - Manual setup repeated in multiple tests
let!(:released_assignment) { create(:assignment_with_criteria_and_results) }
before do
  Result.joins(:submission)
        .where(submissions: { grouping_id: released_assignment.groupings.ids })
        .update_all(released_to_students: true)
end
```

**The Solution**:
Created a new factory that handles this automatically:

```ruby
# NEW - Just use the factory
let!(:released_assignment) { create(:assignment_with_criteria_and_released_results) }
# Release logic happens automatically in the factory
```

**Impact**: 
- Eliminates ~6 lines of setup code per test
- Can be reused across 23+ test files that need released marks
- Self-documenting - factory name clearly shows intent

---

## Code Quality Improvements

### Leveraging Rails Conventions

**1. Using Model Methods Over Raw SQL**

The factory now uses `assignment.current_results` instead of manual SQL queries. This is important because the model method handles edge cases we were missing:
- Filters out peer review results
- Only gets current submission versions
- Handles remark requests properly
- Already tested and used in production code

**2. Flash Message Consistency**
```ruby
# Before - inconsistent with rest of test suite
expect(flash[:error]).to include('Error message')

# After - using the same matcher as other tests
expect(flash[:error]).to have_message('Error message')
```

**3. General Cleanup**
- Removed redundant comments that didn't add value
- Simplified factory parameters to use built-in defaults
- Let Rails handle type conversions automatically

---

## Hack the North - The Problem

### Networking is Broken

**Before Conversations**:
- Who is this person?
- What do they work on?
- What should I talk about?

**During Conversations**:
- What did they just say about that project?
- How does this connect to what we discussed earlier?

**After Conversations**:
- What were the key points?
- Who should I follow up with?
- How are all these people connected?

**Our Solution**: Orbit - AI that handles the before, during, and after

---

## Orbit - How It Works

### Real-Time AI Intelligence

**Instant Recognition**
- Camera spots faces → immediately pulls LinkedIn/public profiles
- Persistent memory remembers everyone across sessions
- "Oh, you met Sarah last week about AI research"

**Live Conversation Intelligence**
- Real-time transcription of discussions
- AI generates smart follow-up questions
- Captures action items automatically

**Relationship Mapping**
- Visualizes connections between people
- Identifies shared interests and mutual connections
- "Sarah and Mike both work on computer vision"

**Technical Achievement**:
Built complete pipeline in 36 hours - computer vision + live transcription + relationship graphs + persistent memory, all running in real-time with sub-second latency.

---

## Technical Highlights & Challenges

### What Made This Hard

**Real-Time Performance**:
- Running face recognition, profile scraping, and transcription simultaneously
- Had to achieve sub-second response times
- Parallel processing architecture with WebSockets

**Computer Vision Complexity**:
- Multiple faces in frame at once
- Varying lighting conditions and angles
- Persistent identity tracking across sessions

**Data Pipeline**:
```
Live Video → Face Detection → Profile Scraping → 
Conversation Analysis → Relationship Mapping
```
Every step had to be optimized for real-time performance.

**Key Learning**: Real-time AI orchestration is possible but requires careful architecture - every millisecond counts when users expect instant results.

---

## Impact & Next Steps

### MarkUs Improvements Summary

**Code Quality**:
- Eliminated duplicate logic across test suite
- Improved maintainability with reusable factories
- Better alignment with Rails best practices
- Self-documenting test setup

**Technical Growth**:
- Deeper understanding of model methods vs raw SQL
- Better grasp of factory patterns
- Experience with test suite refactoring

### Hack the North Takeaways

**Skills Gained**:
- Real-time system architecture
- Multi-model AI orchestration
- Computer vision pipeline design
- Performance optimization under constraints

### This Week
- Back to regular MarkUs development
- Applying HTN learnings to future projects
- Ready for next tasks!