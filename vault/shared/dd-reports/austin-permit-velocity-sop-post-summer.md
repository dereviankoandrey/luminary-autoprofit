# Austin Permit Velocity Monitor — Post-Summer SOP v1

**Created:** 2026-06-14  
**Target launch date:** July 9, 2026 (when Austin building department resumes sessions)  
**Status:** Planning complete, ready for immediate production execution on 7/9  
**Owner:** Overnight Employee + Luminary  

---

## Product Overview

A weekly automated intelligence brief tracking Austin building department activity as an early-warning signal for development deal feasibility. Delivered as a recurring subscription product ($497/month during active cycles, $297/month during summer recess).

### Why This Exists

The timing gap between when developers make feasibility assumptions and when actual permitting outcomes materialize is where deals go bad. Most developers can't (and shouldn't) monitor city council agendas, building permit data, and inspection volumes continuously. This product does that monitoring systematically and surfaces only what matters for development decisions.

---

## Data Sources (Needs Verification on 7/7)

**IMPORTANT — Website Migration Detected 2026-06:** Austin.gov recently redesigned their website. All original URLs from prior research returned 404 on 2026-06-14. The correct URLs must be discovered during July 7 verification.

### Recommended Discovery Approach

On July 7, use these starting points to locate the actual data pages:

1. **City of Austin homepage:** `https://www.austintexas.gov`
2. **Search for "city council meetings"** — navigate from homepage navigation (not direct URL)
3. **Search for "building permits data"** — access via Services → Permits & Regulations
4. **Public Data Portal:** `https://data.austintexas.gov` — Austin's open data platform (likely still functional with permit datasets)
5. **Open Austin Data Portal:** Check `/data.austintexas.gov` for building permit CSV exports

### Primary Data Sources to Find
| Source | What to track | Method |
|--------|--------------|--------|
| City Council meeting materials | Permit/zoning/agenda items | Navigate from new homepage → meetings page |
| Austin Public Works — Building Division | Permit applications/issuals/withdrawals by property type | Via data portal or services menu |
| Inspection statistics | Pass/fail rates, backlog duration | Same navigation path as permits |
| Planning Commission materials | Zoning changes, development approvals | Navigate from homepage → boards & commissions |

**Verification task on July 7:** Confirm all four sources are accessible under new URL structure. If any source remains inaccessible, document alternative data paths (e.g., county records via Travis County GIS for adjacent jurisdictions).

---

## Brief Structure (Template)

Each weekly brief follows this structure:

### Header
- **Brief # [N]** — Week of [date range]
- **Market:** Austin, TX — Building Department Activity
- **Data Through:** [as-of date]

### Section 1: Permit Volume Summary
| Metric | This Week | Previous Week | Change | Quarter-over-Quarter |
|--------|-----------|---------------|--------|---------------------|
| Total permits issued | X | Y | ±Z% | ±Q% |
| Multifamily (5+ units) | X | Y | ±Z% | ±Q% |
| Mixed-use | X | Y | ±Z% | ±Q% |
| Single-family renovation | X | Y | ±Z% | ±Q% |
| New single-family | X | Y | ±Z% | ±Q% |

### Section 2: Plan Review & Inspection Signals
- **Average plan review cycle time:** [days] (vs. target)
- **Inspection pass rate:** [X]% first-pass, [Y]% second-pass
- **Inspection backlog indicators:** [qualitative assessment]

### Section 3: Council & Planning Actions
- List any permit-related agenda items from city council meetings
- Note any zoning changes or development approvals with deal-relevance flags
- Flag unusual patterns (e.g., sudden acceleration/delay in review timelines)

### Section 4: What This Means for Your Pipeline
- Bullet points translating data into actionable signals
- "Permit volume down X% suggests tightening supply → consider accelerating timeline"
- "Inspection pass rate dropping to Y% indicates capacity strain → budget extra weeks"
- "Council agenda item Z may signal policy shift affecting [deal type]"

### Section 5: GO/NO-GO for Active Pipeline Deals
(For subscribers with active deals in the Austin market)
- Assessment of current permitting climate against deal feasibility assumptions
- Specific early-warning flags where applicable

---

## Technical Architecture

```
[Data Source Monitors] → [Extraction & Parsing] → [Aggregation Engine]
       ↓                                                        ↓
   Web Fetchers                                    Database/JSON Store
       ↓                                                        ↓
   ┌─────────────────────────────────────────────────────┐
   │              Weekly Brief Generator                  │
   │  • Compile metrics                                    │
   │  • Calculate week-over-week and quarter-over-quarter  │
   │  • Generate analytical narrative                      │
   │  • Apply deal-relevance filters                       │
   └─────────────────────────────────────────────────────┘
       ↓
   [Brief Output] → [Delivery to Subscribers]
```

### Implementation Notes
- All data sources are public and freely accessible (no API costs)
- Extraction can use web_fetch + markdown parsing from city websites
- Storage: Simple JSON/Markdown files in version-controlled directory
- Brief generation: Agent-driven ( Overnight Employee or Luminary)
- Delivery: Email to subscribers (manual at first, automated with tools later)

---

## Pricing Strategy

### Active Cycle Rate: $497/month
- Weekly briefs during council session periods (typically September–June)
- Includes deal-specific analysis for subscribers with active Austin pipeline deals
- Competitive position: Cheaper than one analyst hour, delivered continuously

### Summer Recess Rate: $297/month
- Reduced frequency during summer recess (late June through August)
- Monthly summary instead of weekly briefs
- Council activity is minimal; focus shifts to inspection/permit volume trends only

### Annual Subscription: $4,764 (save one month)
- Encourages commitment across full operating year
- Includes quarterly deep-dive analysis beyond weekly briefs

---

## Launch Plan (July 9 Execution)

| Day | Action | Owner | Time |
|-----|--------|-------|------|
| July 7-8 | Verify council sessions resumed; confirm data availability | Overnight Employee | ~30 min |
| July 9 | Produce Week 1 brief from available data | Overnight Employee + Luminary | ~60 min |
| July 9 | Deliver to warm contacts who showed interest in permit tracking | Andrey | ~15 min |
| July 9 | Publish sample brief publicly on landing page | Andrey | ~10 min |
| Weekly | Continue brief production every Monday | Overnight Employee | ~45 min/week |

---

## Summer Hold Monitoring (June 14 — July 8)

During the summer hold period, continue collecting baseline data to build momentum:

1. **Track permit volume trends** even without council sessions — this creates meaningful quarter-over-quarter comparisons for Week 1
2. **Build the first sample brief** from available data to use as a demo for outreach
3. **Identify 5-10 warm contacts** who would benefit from permit tracking specifically (developers, land-use attorneys, real estate attorneys in Austin)
4. **Prepare summer-rate pricing messaging** — frame reduced cost during recess as "build your pipeline during the lull"

---

## Competitive Positioning

### What Differentiates This Product
1. **Automated, not manual:** Competitors are human analysts compiling this data manually. We do it automatically and consistently.
2. **Signal extraction, not raw data:** The brief tells you what the numbers mean for your deals — raw data dump would be useless to operators under time pressure.
3. **Deal-relevance layer:** For subscribers with active pipeline deals, we assess whether current permitting conditions support or threaten feasibility assumptions.

### Who Already Does This
- No one offers this as a standalone subscription product in Austin
- City websites provide raw data but require manual compilation and interpretation
- Real estate consulting firms (RCLCO, Marcus & Millichap) produce market reports quarterly — too slow and too broad for deal-by-deal relevance

---

## Metrics to Track

| Metric | Target | Notes |
|--------|--------|-------|
| Subscriber count at launch | 3-5 (warm network) | Beta pricing: first month free |
| Week-over-week consistency | 100% delivery rate | Critical for trust building |
| Lead time signal accuracy | Qualitative — does flagged change actually affect deals? | Feedback loop with subscribers |
| Summer-to-active conversion | 80%+ (summer → $497 rate) | Ensure value during active cycle justifies price jump |

---

*Post-Summer SOP v1 — 2026-06-14*  
*Next update trigger: July 7 verification check*  
*File location: `vault/shared/dd-reports/austin-permit-velocity-sop-post-summer.md`*
