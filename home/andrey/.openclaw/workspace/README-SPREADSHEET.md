# Business Ideas Pipeline - Google Sheets Setup

## How to Import into Google Sheets

### Option 1: Direct Import from CSV
1. Go to [Google Sheets](https://sheets.google.com)
2. Click **Blank** to create a new sheet
3. Go to **File → Import → Upload**
4. Select `business-ideas-pipeline.csv` from this workspace
5. Choose **Replace spreadsheet** or **Insert new sheet**
6. Click **Import data**

### Option 2: Copy-Paste from Local File
1. Open `business-ideas-pipeline.csv` in a text editor
2. Copy all content
3. Paste directly into Google Sheets (A1 cell)
4. Go to **Data → Split text to columns**
5. Select **Comma** as the separator

## Recommended Sheet Structure

Once imported, create these tabs:

### Tab 1: **Pipeline** (from CSV)
- Current business ideas with status tracking
- Columns: Idea, Stage, Capital, Revenue Targets, Blockers, Next Actions, etc.

### Tab 2: **Idea Inbox**
- For capturing new ideas quickly (no analysis yet)
- Columns: Date Captured, Idea Name, Initial Concept, Source, Status, Assigned To

### Tab 3: **Evaluation Matrix**
- Score ideas against criteria (recurring revenue, operational leverage, time to market, capital required, expertise match)
- Use conditional formatting to highlight top candidates

### Tab 4: **Execution Tracker**
- Milestones and weekly progress for active ideas
- Columns: Week Start Date, Milestone, Owner, Status, Notes, Blockers

## Automation Suggestions

1. **Filter views** for:
   - Only "Discovery" stage ideas
   - Only "MVP Ready" ideas
   - Ideas by Priority (1, 2, 3)

2. **Conditional formatting**:
   - Green for "MVP Ready"
   - Yellow for "Discovery"
   - Red for "Blocked"

3. **Weekly review formula**:
   - Use `=FILTER()` to show all ideas needing attention this week

## Next Steps

1. Import the CSV into Google Sheets
2. Share the sheet with me (Jedai) if you want me to update it directly
3. Create the additional tabs (Inbox, Evaluation, Tracker)
4. Set up weekly review reminders

**Current pipeline data is as of 2026-04-01.**
