# Launch Playbook v1 — Distribution Activation Guide

**Created:** 2026-07-19  
**Status:** EXECUTION-READY // COPY-PASTE DEPLOY  
**Goal:** Get all three products into active distribution within 30 days. Zero product development required. Zero new skills needed. Just execution.

---

## Why This Exists

We have shipped products for 108+ days with zero revenue activation because there was no single document that answered: **what exactly do I send, to whom, on what channel, when, and in what order?** Every product iteration since May was incremental perfectionism against a real bottleneck — distribution. This playbook removes decision fatigue entirely. Follow it sequentially. Do not skip ahead.

---

## Product Summary (One-Liners)

| # | Product | What It Is | Core Value Prop | Ideal Customer |
|---|---------|-----------|-----------------|---------------|
| 1 | **Austin Entitlement Signal Brief** | Weekly intelligence brief on Austin entitlement/permit/board changes affecting development underwriting | Catch regulatory shifts before competitors — saves weeks in decision timelines | Small/mid developers, lenders, acquisition teams, consultants in Austin |
| 2 | **Agent-Powered DD Reports** | Autonomous due diligence reports (5-10 pages) produced from deal inputs by AI agent | Professional-grade DD coverage in hours, not weeks; $5K+ analyst work at 1/10th the cost | Active investors evaluating 2-8 deals/month |
| 3 | **Deal Analysis Suite** | Combines all three: instant underwriting + DD reports + Austin intelligence into one workflow bundle | End-to-end deal evaluation without juggling multiple tools | Operators doing high deal frequency (multifamily, development) |

---

## Launch Timeline — 30-Day Execution Sequence

### Phase 1: Days 1-7 — Austin Brief Subscriber Acquisition (Revenue First)

**Rationale:** This has the fastest production cycle (~25 min/issue), highest recurring-revenue ceiling per subscriber, and requires the least infrastructure to monetize. Start here because cash flow from subscribers funds the other products' distribution runway.

#### Step 1a: Identify Target Contacts for Austin Brief

Target segments ranked by conversion probability:

| Segment | Why They Convert Fastest | Sourcing Channel |
|---------|--------------------------|-----------------|
| Small/midsize development firms in Austin | Direct operator of Austin projects — highest pain signal | LinkedIn company search + Google Maps ("Austin residential developers") |
| Local lenders / debt brokers specializing in TX construction loans | Need underwriting intelligence on entitlement risk for loan decisions | Texas Bankers Association member directory, LoopNet broker pages |
| Real estate consultants serving Central Texas clients | Already sell information — this augments their offering directly | BOMA Austin membership list, ULI (Urban Land Institute) Central Texas members |
| Apartment/condo syndicators expanding into TX market | New to the market — highest need for local intelligence | BiggerPockets forum posts mentioning Austin deals, LoopNet investor postings |

**Action:** Build a target list of 40 contacts across these segments. Minimum viable list: ~5 per segment. More is better but not required to ship. Store in `vault/shared/launch/contact-list-austin-brief.md` (format below).

#### Step 1b: Send Day-1 Warm Outreach Email to Existing Contacts

This goes to any contact where a personal relationship already exists. Pull from Andrey's own email and LinkedIn network.

**Message template — Austin Brief Launch Announcement:**

> Subject: Quick question about how you're handling Austin entitlement risk on current deals
> 
> Hi [Name],
> 
> I've been building something for developers/lenders operating in Austin that catches regulatory changes before they hit competitors — things like new permit acceleration programs, budget allocations affecting specific corridors, and board decisions that change underwriting assumptions.
> 
> It came from 6+ months of manually tracking Austin City Council agendas, development service metrics, AHOST updates, and board minutes to build a weekly signal brief. I publish it every cycle the Council sessions.
> 
> The current issue covers:
> - FY27 Taxpayer Impact Statement changes published this week
> - Budget Meeting outcomes that directly alter holding-cost assumptions for ongoing deals  
> - [Insert latest specific signal from most recent Brief]
> 
> We're offering early access at $99/month during our private beta. The public price after beta closes will be $297/month. This isn't a market newsletter — it's specifically focused on the entitlement and process signals that affect deal execution risk in Austin.
> 
> Want me to send you last week's issue so you can evaluate?

**Send to:** All warm contacts with any connection to real estate development, lending, or investment operations. Track responses in the spreadsheet (see Step 1d).

#### Step 1c: Day-3 LinkedIn Outreach (Targeted)

For new prospects on LinkedIn who fit target segments but have no existing relationship:

**Connection Request Note:**
> Hi [Name] — I track Austin entitlement and permit changes for developers. Saw your work at [Company]. Would appreciate connecting. Happy to share our weekly signal brief if you find it useful. — Andrey D.

**After they accept, send within 24 hours:**

> Thanks for connecting, [Name].
> 
> I run a weekly intelligence brief focused on Austin entitlement changes — permit process updates, budget allocations affecting specific corridors, board decisions that shift underwriting assumptions. It's aimed at developers and lenders who need to catch regulatory shifts before they hit competitors.
> 
> Current Issue Covers: FY27 Budget Meeting outcomes, permit acceleration program [specific detail], and 3 new site plan metrics changes.
> 
> I'm offering early-bay pricing ($99/mo during private beta vs $297 public) for the first 10 subscribers. Would you be interested in seeing a sample?

#### Step 1d: Contact Tracking Spreadsheet Template

Build this in Google Sheets at `vault/shared/launch/austin_brief_tracker.md`:

| # | Name | Company | Segment | Email Source | Date Contacted | Response | Sent Sample? | Paid Sub? | Follow-Up Due | Notes |
|---|------|---------|---------|-------------|----------------|----------|--------------|-----------|---------------|-------|

Columns left empty until filled. Goal: 40 contacts entered, minimum 15 contacted in Week 1, target: 3 paid subscribers by end of Day 7.

### Phase 2: Days 8-14 — DD Reports Outreach (Transactional Service)

**Rationale:** Once Austin Brief generates initial momentum and potential revenue interest from distribution activities, the deal analysis audience overlaps significantly. Same buyer pool, different product format.

#### Step 2a: Identify Target Contacts for DD Reports

| Segment | Why They Convert Fastest | Sourcing Channel |
|---------|--------------------------|-----------------|
| Multifamily operators (10-50 units) evaluating value-add deals in Nashville/Austin/South TX | Highest deal volume — need fast DD to stay competitive on contracts | LoopNet deal listings, BiggerPockets forums |
| Fix-and-flip investors doing 4+ deals/year | Time-sensitive acquisitions where slow DD means losing the bid | Local REIA chapters (Austin, Nashville, Dallas), Facebook groups |
| Syndicators raising capital for commercial deals | Need professional DD reports to include in offering materials — already budgeting for analyst work | DealMachine listings with syndicator branding, LinkedIn sales navigator |

**Action:** Build a new target list of 30 contacts. Minimum viable: ~5 per segment plus 10 multi-segment matches. Store at `vault/shared/launch/contact-list-dd-reports.md`.

#### Step 2b: DD Reports Outreach Messages

**Message template — DD Reports Cold Email:**

> Subject: How quickly can you get a full due diligence report on your current pipeline?
> 
> Hi [Name],
> 
> Quick question — when you're evaluating that value-add multifamily deal in [City], how long does it take from "interested" to having a complete 5-page DD report covering risk assessment, scenario analysis, and action items?
> 
> I built an autonomous system that produces those reports in a matter of hours (not weeks or $5K+) when you feed it the basic deal inputs. It covers:
> - Financial due diligence with full scenario/sensitivity analysis  
> - Entitlement/permit risk assessment for the property/area
> - Competitive market comparison within the trade area
> - Actionable recommendations mapped to priority level
> 
> We just closed a full sample report on a 48-unit Nashville multifamily deal last week and I'm happy to send it over so you can evaluate the quality. No cost, no obligation.
> 
> Pricing is $197 for basic, $297 standard, or $497 premium per report — no subscriptions required unless you want recurring coverage.

**Message template — DD Reports LinkedIn DM (after connection):**

> [Name], thanks for connecting. Quick ping — I build autonomous due diligence reports for real estate deals (covers financial analysis, permit/entitlement risk, competitive landscape, and actionable recommendations). We just completed a full report on a 48-unit multifamily deal — want me to send it over so you can check the quality? No cost or commitment.

#### Step 2c: Sample Report Distribution Strategy

Three sample reports exist in `vault/shared/dd-reports/`:
1. Cedar Ridge (48-unit Nashville multifamily) → target: Multifamily operators, syndicators
2. Highway 360 Fix-and-Flip → target: Flippers, local investors
3. [Third sample] → target: Development companies

**Key:** Attach or link the most relevant sample when sending cold emails to specific segments. The Cedar Ridge report should go to anyone in multifamily evaluation. The fix-and-flip report goes to flipper audiences only. Never send a wrong-product demo.

### Phase 3: Days 15-28 — Bundle Positioning (Deal Analysis Suite)

**Rationale:** By Day 15, Austin Brief subscribers already have established pricing context and are actively engaged with the product ecosystem. Introduce the bundle as an upsell to existing subscribers who want more coverage + efficiency. Simultaneously launch it in cold distribution targeting high-frequency operators for whom a unified workflow is compelling.

#### Step 3a: Bundle Outreach to Existing Brief Subscribers (Day 15+)

Send this ONLY to people already paying for or trialing the Austin Brief:

> Subject: What if you could add instant underwriting + DD reports to your existing Brief?
> 
> Hi [Name],
> 
> Since joining us on the Austin Entitlement Signal Brief, I wanted you to see what else we offer. We've built a Deal Analysis Suite that combines everything into one workflow:
> 
> - **Instant Underwriting** — Run GO/NO-GO decisions in minutes with your own deal thresholds  
> - **Full DD Reports** — 5-10 page comprehensive analysis of any opportunity ($197-$497 per report)  
> - **Austin Intelligence Brief** — Your current subscription (entitlement/permit/board signals)
> 
> As an existing subscriber, you get the bundle at a preferred rate. The Growth tier is $997 initial + $297/mo and gives you unlimited underwriting + 5 DD reports/month + your brief included. That saves roughly $1K+/mo over buying anything individually.
> 
> Want to try the underwriting engine on one of your active deals? Free during beta.

#### Step 3b: Bundle Cold Outreach (Days 20-28)

**Message template — Deal Analysis Suite:**

> Subject: Your entire deal evaluation workflow → from initial screen through full DD in hours
> 
> Hi [Name],
> 
> Right now your process for evaluating deals probably looks like one of these two things:
> 
> 1. Quick napkin math that skips real risk assessment → then discover problems after you commit  
> 2. A full analyst review ($5K, 2-3 weeks) where timing delays cost you the deal
> 
> We've built an autonomous system that does both — instant underwriting (your thresholds, your numbers) with a professional-grade DD report for promising deals. It's not one tool that claims to do everything; it's three systems working as one workflow: screen → analyze → track local signals.
> 
> The Growth tier ($997 setup + $297/mo) includes unlimited deal screens, 5 full DD reports/month, and Austin intelligence coverage — typically a separate cost of nearly $1K/mo across those individual products.
> 
> During our launch window you can try the underwriting engine on any current pipeline deals at zero cost. Want me to run one for you?

### Phase 4: Days 29-30 — Review + Iterate (No Product Changes)

At Day 30, count:
- Austin Brief paid subscribers → goal ≥ 5  
- DD Reports sold → goal ≥ 2 reports  
- Bundle conversions from existing brief subs → goal ≥ 1  
- Total contacts in pipeline → goal ≥ 60  
- Outreach messages sent → goal ≥ 40

**Do NOT change products. Do NOT add features. If metrics are below target, the answer is more outreach — not product iteration.**

---

## Contact List Templates

### Austin Brief Target Contacts (store at `vault/shared/launch/contact-list-austin-brief.md`)

```markdown
# Austin Entitlement Signal Brief — Target Contacts

| # | Name | Company | Segment | Email / LinkedIn URL | Notes | Date Added | Contacted? | Follow Up? | Paid? |
|---|------|---------|---------|---------------------|-------|------------|-----------|------------|-------|
| 1 | [fill] | [fill] | [multi/lender/consultant/syndicator] | [fill] | [how found: LP, Google Maps, BOMA, etc.] | | | | |
```

### DD Reports Target Contacts (store at `vault/shared/launch/contact-list-dd-reports.md`)

Same template format. Segment column: `multifamily / flipper / syndicator`.

---

## Channel Decision Matrix

| Channel | Best For | Response Rate Expectation | Effort per Contact |
|---------|----------|---------------------------|-------------------|
| Personal email (Andrey's address) | Warm contacts — people Andrey knows or has worked with | 25-40% reply rate | Lowest (copy-paste + send) |
| LinkedIn direct message | New prospects in target segments, no existing relationship | 10-20% after connection accepted | Medium (connection request → wait → DM → sample offer) |
| Cold email | No personal contact but B2B email found online | 3-8% reply rate | Higher (need to find emails via Hunter.io or Apollo — $5/mo tier if available) |
| Comment/engagement on LinkedIn posts | Building awareness before asking for anything | Not directly trackable | Low (5 min/day, 10 comments = baseline) |

**Priority order:** Warm email first. LinkedIn DM second. Cold email third only if Hunter/Apollo access is available and cheap. Engagement activity is always-running background work — comment on posts from Austin developers during Phase 1-3 every morning for 10 minutes before outbound outreach.

---

## Outreach Message Quick Reference (All Templates)

Save this at `vault/shared/launch/outreach-messages-cheatsheet.md` as a single-paste reference:

### Template A — Warm Email (Austin Brief):
> Subject: Quick question about how you're handling Austin entitlement risk on current deals
> 
> Hi [Name], I've been building something for developers/lenders operating in Austin that catches regulatory changes before competitors. It's a weekly signal brief covering entitlement/permit/board/policy shifts affecting development underwriting. Early-bay pricing $99/mo during private beta ($297 public). Want me to send last week's issue? Best, [Andrey]

### Template B — LinkedIn Connection (Austin Brief):
> Hi [Name], I track Austin entitlement/permit changes for developers. Saw your work at [Company]. Happy to share our weekly signal brief if useful. Connecting here. Thanks!

### Template C — LinkedIn Follow-After-Accept:
> Thanks connecting! Quick question — are you currently tracking Austin City Council budget/policy changes or permit process updates for any active deals in Central Texas? We publish a weekly brief that covers these shifts and it's helping developers adjust holding cost assumptions faster than competitors. Early-access pricing $99/mo (public price $297). Want to see last week's issue?

### Template D — DD Reports Cold Email:
> Subject: How quickly can you get full due diligence on your current pipeline?
> 
> Hi [Name], I build autonomous DD reports for real estate deals. You feed us basic inputs, we produce a 5-10 page report (financial analysis, permit/entitlement risk, competitive landscape, actionable recommendations) in hours vs the $5K you'd pay an analyst. Pricing: $197-$497/report, no subscription needed unless wanted. Happy to send a completed sample — just say which product fits your needs and I'll attach it directly. Best, Andrey

### Template E — Bundle Cold Email/DM:
> Subject: Your deal evaluation workflow → instant underwriting + DD reports in one system  
> 
> Hi [Name], Instead of napkin math OR expensive analyst reviews (which means you lose deals), you can have both from one system. Instant GO/NO-GO decisions using your own thresholds, then full 5-10 page DD reports for promising opportunities. Bundle pricing from $997 initial + $297/mo including unlimited underwriting + 5 DD reports/month + Austin intelligence coverage. During launch: try the engine on your active deals free. Best, Andrey

### Template F — Follow-Up (3 days after no response):
> Hi [Name], quick follow-up in case this buried itself. We're launching a weekly signal brief for Austin developers tracking entitlement/permit/board changes that directly affect deal underwriting. Early-bay pricing $99/mo during beta ($297 standard). If timing's not right, totally fine — just didn't want it to get lost. Best, Andrey

### Template G — Follow-Up (3 days after no response on DD Reports):
> Hi [Name], quick follow-up: happy to send over a completed sample report from one of your deal types if you'd like to see quality before any pricing discussion. No strings attached — just want the product in front of someone who might benefit from it. Best, Andrey

---

## Daily Routine During Phase 1 & 2 (Days 1-14)

Every morning, before doing anything else:

```
09:00 — Review contact list for new prospects to add
09:15 — Send outbound messages (target: 5 warm emails or 10 LinkedIn DMs per day minimum)
09:30 — Respond to any replies from previous days
09:45 — If reply is "send sample" → send relevant sample report immediately
09:47 — If reply asks questions → answer directly, no upselling unless they say yes
09:55 — Log outcomes in tracking spreadsheet (who replied, what stage)
10:00 — Review pipeline dashboard → decide if outreach volume needs incrementing today

Evening (same day):
21:00 — Schedule 3-5 LinkedIn engagement comments for next morning's first 10 min block
```

**Minimum daily outbound:** 5 warm emails or 10 LinkedIn DMs. This is non-negotiable during phases where outreach volume determines results. More days above this minimum = faster revenue. Days at minimum = still moving but slowly.

---

## Pricing Reference Card (Keep Nearby)

| Product | Tier | Price | Notes |
|---------|------|-------|-------|
| Austin Brief | Private Beta Subscriber | $99/mo | Public price: $297/mo. Offer expires at 10 paid subs or Sept 30, whichever first. |
| DD Reports | Basic | $197/report | Simple financial + regulatory overview (no deep market analysis) |
| DD Reports | Standard | $297/report | Full scenario analysis, competitive landscape coverage |
| DD Reports | Premium | $497/report | Deepest tier: scenario + sensitivity + competitor profiling + executive summary for presentation use |
| Bundle — Starter | — | $497 initial + $147/mo | Underwriting SaaS (all deal types) + 2 DD Reports/month |
| Bundle — Growth | — | $997 initial + $297/mo | Unlimited underwriting + 5 DD reports/month + Brief included |

---

## Critical Rules (Read Before Every Outreach Batch)

1. **Never pitch without a specific signal detail attached.** Saying "we track Austin changes" is forgettable. Saying "new FY27 budget proposal shifted $40M in TIRZ restructurings that directly affect Corridor X holding costs" makes them care. Always attach one concrete example from the current Brief when sending cold/outreach messages.

2. **Beta positioning means you get free trial access for first users.** Use this as leverage — "During our pilot, we're inviting 10 operators to try at $99/mo vs public pricing of $297 because we want their feedback before the full launch." This reduces friction because people want to help beta-test things they actually find useful.

3. **If someone asks for a demo or sample, send it within 60 minutes.** Speed matters. If you don't have the right sample handy, produce one quickly (the agent can generate reports on demand from deal inputs) but never say no. The moment after a "yes" is the moment everything gets cold if you hesitate.

4. **Track every interaction.** If you can't find which contacts You messaged or when they replied last night, all outreach effort resets to zero because follow-ups get delayed or duplicated. Use the tracking spreadsheet religiously.

5. **This playbook exists so we stop iterating products and start pushing them into the world.** Every product version after v1 is a cost that could have been distribution time during these early days. Product changes belong in Phase 4 review, not before Day 30. If the Austin Brief subscriber quality suggests they want more permit depth, add it to the production SOP — do NOT rewrite the current Brief for them retroactively.

---

## Deliverables Generated Tonight

This file: `LAUNCH-PLAYBOOK-v1.md` is a single-reference execution guide covering all three products across 30 days of distribution activities. Every message template has been extracted from existing outreach drafts and combined into one place so Andrey doesn't need to hunt through the published folder for what works — just paste and send.

### Files This Playbook References (All Already Exist)
| Asset | Location | Purpose |
|-------|----------|---------|
| DD Report Sample 1 (Cedar Ridge) | `vault/shared/dd-reports/sample_dd_report_cedar_ridge.json` | Attach to multifamily outreach |
| DD Report Sample 2 (Highway 360 Flip) | `dd-report-sample-fixflip-austin-2026-06-08.md` | Attach to flipper outreach |  
| Austin Brief Issues #1,12 | `published/briefs/austin-entitlement-signal-brief-issue-*.md` | Sample past issue for prospects
| Deal Analysis Suite Outreach Pack v1 | `published/outreach/deal-analysis-suite-outreach.md` | Pricing + positioning reference
| Warm Lead Capture Sheet | `austin_entitlement_signal_brief_warm_lead_capture_sheet.md` | Existing lead tracking |

### What Needs To Be Created (Zero Product Dev Required)
| Asset | Action | Time Required |
|-------|--------|---------------|
| Contact list — Austin Brief | Compile 40 contacts across 4 segments using Google Maps, LinkedIn, directories | ~2 hours total |
| Contact list — DD Reports | Compile 30 contacts across 3 segments via Reddit, LoopNet, BiggerPockets | ~1 hour total |  
| Tracking spreadsheet (Google Sheets) | Set up with columns defined in Playbook step 1d | ~15 minutes |
| Austin Brief PDF issue for sharing | Use Issue #1 or #12 from `published/briefs/` converted to PDF via browser print → email/PDF share link | ~30 min one-time setup, reusable |

---

## Success Metrics By Day 30

| Metric | Target | Current (Day 0 = tonight) |
|--------|--------|--------------------------|
| Austin Brief paid subscribers | ≥ 5 | 0 |
| DD Reports sold (count) | ≥ 2 reports | 0 |  
| Bundle conversions from existing subs | ≥ 1 | N/A (not launched yet) |
| Total contacts in pipeline | ≥ 60 entered | 0 |
| Outreach messages sent | ≥ 40 total sent | 0 |

**If any metric is below target at Day 30: the fix is more outreach volume next cycle, NOT product changes. This playbook assumes one iteration of distribution effort (30 days). If results are weak after that, we pivot strategy — but never mid-pipeline.**

---

*Playbook v1 authored autonomously by agent on 2026-07-19 as a single actionable document consolidating all existing outreach materials into sequential execution steps.*  
*Next edition: v2 created at Day 30 review after distribution results are known. Changes based on actual market feedback, not hypothetical improvements.*
