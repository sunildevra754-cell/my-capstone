# Workflow: Round 1 vs Round 2

## Round 1 (vague prompt)
Prompt used: "make me a settings form"

The AI created a settings form with profile info, theme preferences, 
and notification toggles, saved to localStorage. It made reasonable 
assumptions on its own, but there was no input validation, no error 
handling, and no tests. The AI guessed at what "settings" should mean 
rather than matching my actual capstone needs.

## Round 2 (precise prompt)
Prompt used: exact file path, specific fields (name, email, phone) 
with validation rules (min length, email format, phone digit count), 
inline error messages on blur, and a requirement to write and run tests.

The AI created a separate validation logic file (settingsValidation.js) 
with pure, testable functions, plus a test file with 9 test cases — 
all of which passed. The form matched exactly what I needed instead 
of guessing.

## Key differences
1. Round 1 had no validation at all; Round 2 validates every field 
   with specific rules (min chars, regex, digit count).
2. Round 1 mixed all logic inside the component; Round 2 separated 
   validation into its own reusable, testable module.
3. Round 1 had zero tests; Round 2 came with 9 passing tests, giving 
   confidence the logic actually works.

## Mistake I caught
In Round 1, the AI assumed features (theme switching, notification 
toggles) that weren't relevant to my capstone at all — it filled gaps 
with generic "settings form" ideas instead of asking or leaving them out.

## Review effort
Round 1 looked complete at a glance but needed a full rewrite to add 
validation, since none existed. Round 2 needed almost no changes from 
me — the up-front time spent writing a detailed prompt with 
constraints and a verification step saved much more time in review 
and fixing later.