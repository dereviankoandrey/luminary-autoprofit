# Weekly Development Review Runbook

**Last updated:** 2026-04-21 10:00 UTC  
**Purpose:** turn the existing review template, output sheet, and unblocker sheet into one practical operating sequence that can be run quickly without guessing the next step.

## Why this exists
The business already has the component parts for pipeline management, but there was still no short runbook for actually running the first live weekly review end-to-end.

This closes that gap.

## Trigger
Run this when:
- Andrey sends updates on active projects
- a weekly development review is scheduled
- multiple project/counterparty updates have accumulated
- a capital conversation changes the state of a top project

## Inputs Required
Before starting, gather:
- `memory/andrey-unblocker-sheet.md`
- `memory/weekly-development-review-template.md`
- `memory/weekly-development-review-output-sheet.md`
- `memory/development-update-ingestion-log.md`
- `memory/development-pipeline-operating-sheet.md`
- `memory/capital-outreach-tracker.md`
- `memory/top-3-project-briefing-pack.md`
- `memory/pipeline-execution-board.md`

## Fastest Operating Sequence

### Step 1 — Capture raw updates
If Andrey replies informally by text, email, or chat, move the verified facts into:
- `memory/andrey-unblocker-sheet.md` if they are still fragmented
- `memory/development-update-ingestion-log.md` if they are already specific enough to log as updates

Rule: do not spread the same update across multiple trackers before it is logged once.

### Step 2 — Run the portfolio-level review
Open `memory/weekly-development-review-template.md` and complete:
- week of
- top 3 projects by urgency
- top 3 capital / partner follow-ups due
- main portfolio blocker
- main portfolio win
- biggest risk if no action this week

### Step 3 — Review top 3 projects first
In this order:
1. Laguna Marble Falls
2. Leander Springs
3. ZFB at Anderson Mill

For each project, capture only:
- current stage
- latest milestone completed
- immediate blocker
- next milestone / deadline
- capital need / amount / timing
- active counterparties
- next ask
- owner
- this week’s must-do action

### Step 4 — Complete the output sheet during the same session
Use `memory/weekly-development-review-output-sheet.md` to record:
- what changed
- due dates
- owners
- whether each downstream tracker needs updating
- decisions needed from Andrey

Do not leave any follow-up without an owner or due date.

### Step 5 — Propagate updates in this exact order
1. `memory/development-update-ingestion-log.md`
2. `memory/development-pipeline-operating-sheet.md`
3. `memory/capital-outreach-tracker.md`
4. `memory/top-3-project-briefing-pack.md`
5. `memory/pipeline-execution-board.md`

This preserves the source-of-truth trail first, then updates current-state trackers.

### Step 6 — Close the review
Before ending, confirm:
- overdue follow-ups are copied forward
- decisions needed from Andrey are explicit
- top-3 project briefs match the newest facts
- capital tracker reflects any named counterparties mentioned

## Minimum Viable Review
If time is tight, complete only these items:
1. portfolio-level summary
2. top 3 projects
3. overdue follow-ups
4. decisions needed from Andrey
5. tracker checklist

## Decision Rules
- If a fact is unverified, mark it unknown.
- If a project has no owner, due date, or next ask, it is not operational yet.
- If a counterparty is named, add them to the capital tracker.
- If a top-3 project changes, update the briefing pack the same day.
- If multiple trackers disagree, trust the ingestion log first, then reconcile the others.

## Expected Outputs From One Good Review
- current status for top projects
- named counterparties and next asks captured
- overdue follow-ups visible
- explicit decisions needed from Andrey
- all downstream trackers synchronized

## Best Next Action After This Runbook
Use this runbook together with `memory/andrey-unblocker-sheet.md` as soon as Andrey provides fresh inputs.
