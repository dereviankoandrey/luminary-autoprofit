# Austin Entitlement Signal Brief — Issue Archive Reference Counter

## Current Status
- Latest Issue: **#15** (2026-08-01)
- Previous Issue: #14 (2026-07-30)
- Production Pipeline: ACTIVE but EDIMS URL pattern needs remediation post-austintexas.gov redesign

## Published Issues

| Issue | Date Produced | Subject | Source Meeting ID | Status |
|-------|--------------|---------|-------------------|--------|
| #10 | 2026-07-12 | First post-summer issue: Budget Jul 16, Expedited Dev Review ($50K grants) | mid=unknown | Published |
| #11 | TBD | Summer break wrap-up / return-to-work session | N/A | Not produced |
| #12 | TBD | Post-Austin Council July 16 budget outcomes | Jul 16 BGT | Not produced |
| #13 | TBD | Budget progress report (July hearings) | mid=unknown | Not produced |
| #14 | 2026-07-30 | FY27 Meeting Outcomes & August Schedule Locked | Jul 28, Mid=1491 | Published + archived |
| **#15** | **2026-08-01 (TODAY)** | **Two-Day Budget Work Session Window Confirmed — Aug 4 & Aug 6** | **Aug/17 TBD** | **Published** |

## Next Scheduled Issue
- Target: **#15.5** — Staff Memo Extraction (~Aug 8-9) or **#16** if staff memo extraction fails
- Production trigger: Post-Aug 6 work session transcripts, or ~Aug 8 staff memos publication

## File Structure Convention (New Standard for Post-redesign)

```
~/austin-brief/                    # Working directory
├── austin_entitlement_signal_brief_sample_YYYY-MM-DD.md   # Published brief
├── archive/                     # Archived cycles
│   └── issue-NN_yyyy-mm-dd/     # Per-issue folder with sources, transcripts, etc.
│       ├── brief_vN.md          # Final published version
│       ├── source_notes.txt     # Raw extraction notes
│       └── staff_memo_*.pdf     # Staff memo files (when available)
├── ISSUE_COUNTER                # Integer tracking: latest issue number
├── PUBLISHED_LISTING            # Current issues listing (for outreach reference)
```

## EDIMS Access Status

| Endpoint | Method | Status | Last Known Working Pattern | Remediation Needed |
|----------|--------|--------|---------------------------|-------------------|
| meetings homepage (`/council/meetings`) | Browser extract ✅ | WORKING | https://austintexas.gov/council/meetings None needed — list page is stable | No |
| individual meeting detail pages | Link follow from homepage | NEEDS VERIFICATION | URL pattern post-redesign unknown yet | Verify Aug 4+6 URLs next cycle |
| EDIMS document.cfm?action_notes,meeting_notes | Direct URL ❌ | BROKEN (404) | `services.austintexas.gov/council_meetings/action_notes.cfm?mid=XXXX` — NEW pattern TBD | Critical: must resolve before Aug 12-14 final votes for transcript extraction |

## Notes on Summer Gap
Issues #11, #12, and #13 are estimated/unknown from the summer gap period. The August Council returned early (Jul 10 instead of Jul 15) which compressed the pre-hold schedule vs projections. Issue #13 may have been produced internally but file is not currently present at expected paths — may need manual verification with operator during next touchpoint.
