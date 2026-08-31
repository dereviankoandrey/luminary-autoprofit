# Spec: sam.gov Scout Agent — LBV Federal Contract Opportunity Discovery

**Task:** N1-LBV-010 (#18)  
**Date:** 2026-06-06  
**Status:** DRAFT — API-corrected 2026-06-06; awaiting operator review & decision  
**Audience:** Andrey, Shaila, LBV operators; Claude AI / Codex build agents  
**Pattern analog:** N2 Content Machine Scout → Writer → Editor → Distributor pipeline

---

## Executive Summary

The sam.gov scout agent discovers federal contract opportunities where AI-agent systems can fulfill requirements — either for LBV to bid on directly or as a sales channel (selling LBV products to prime contractors who win those bids). It follows the proven **search + filter + summarize** pattern from N2's content scout but targets a fundamentally different data source and business logic.

This scope is read-only and discovery-first. The first build should consume SAM.gov's public Get Opportunities API only, write no CRM records until a dry-run sample has been reviewed, and send no outbound communications. SAM.gov API credentials are operator-provided secrets and must not be committed or logged.

**Three design decisions must be made before build:**

| # | Decision | Recommendation | Sections |
|---|----------|----------------|----------|
| A | Host node | **N1 (LBV production)** with N2 Scout architecture as pattern reference | §3 |
| B | Targeting parameters (NAICS, set-asides, contract size) | Five NAICS clusters, SDVOSB/HUBZone focus, $250K–$7M sweet spot | §4 |
| C | Output channel | **GSCRM row** as primary; Telegram digest as secondary for human review | §5 |

---

## 1. Scope & Positioning

### 1.1 What the Scout Does (In Scope)

- Polls SAM.gov public opportunities data for new opportunity postings matching defined criteria
- Evaluates each posting against LBV's AI-agent capability profile
- Produces a structured output: opportunity record + match-reasoning summary
- Produces a dry-run sample first; after operator approval, records results to GSCRM rows and optionally pushes Telegram digest alerts

### 1.2 What the Scout Does NOT Do (Out of Scope)

- **No proposal writing** — that's a downstream BD agent or human task once an opportunity is deemed worthy
- **No registration/compliance management** — SAM.gov registration, CAGE code, NAICS self-certification are operator responsibilities tracked separately
- **No pricing/quote generation** — the scout reports *opportunities*, not *bids*
- **No outbound outreach to awardees** — the "sales channel" use case is documented but deferred until core discovery proves its worth; no automated LinkedIn/Email scraping of potential subcontractors

### 1.3 Two Use Cases

| Use Case | Description | Trigger for Action |
|----------|-------------|-------------------|
| **A) LBV as bidder** | Discover opportunities where LBV can fulfill as a prime or joint venture partner | Scout flags + human review → operator decides to bid → downstream proposal work |
| **B) LBV as product vendor** | Prime contractors win federal AI-agent contracts; LBV supplies the AI platform as a sub/teaming partner | Scout identifies winning awards (FPDS retrospective) + operator outreach |

---

## 2. Target NAICS Codes — Detailed Analysis

### 2.1 Selection Methodology

NAICS codes are filtered by three criteria:
1. **Genuine demand** — agencies actively post contracts in this code with recurring patterns
2. **AI-agent fit** — the statement of work logically maps to agent-delivered outcomes (chatbots, research analysts, document processors, data extractors)
3. **Competitive landscape** — sufficient openness for a small business / SBSE to win without needing $50M+ incumbent relationships

### 2.2 Core NAICS Codes (Tier 1 — Primary Targets)

| NAICS | Title | Why AI-Agent Fit | Federal Spend Signal | LBV Strategy |
|-------|-------|-------------------|--------------------|--------------|
| **541512** | Computer Systems Design Services | Agencies buy "systems analysis," "automation modernization," and IT support services. Many SOWs describe exactly what LLM agents do — document processing, intake triage, workflow automation. | ~$70B/yr federal IT services; steady multi-digit contract flow | **Highest priority.** Most direct fit for our capability deck. Target JSA (Joint Solitary Agency) and sole-source 16(g) evaluations. |
| **541511** | Custom Computer Programming Services | "Software development" contracts that often include requirements document analysis, code documentation, test automation — tasks AI agents excel at when scoped right. | ~$44B/yr; many small-bid sets (<$2M) | Secondary for prototype/MVP-type scopes. Stronger in smaller agency IT modernization set-asides. |
| **541618** | Other Scientific & Technical Consulting | "Management consulting" + "process improvement" awards often describe workflow automation without naming it. Perfect cover story — pitch agent systems as "workflow modernization consulting." | ~$18B/yr; highly fragmented, many awards < $1M | **Underexploited wedge.** Agencies like HHS, USDA, DOI routinely post these. Lower price competition than IT services codes. |
| **561110** | Office Administrative Services | "Typing," "records management," "correspondence handling." Surprisingly large market for document-heavy agencies (VA, DOD, GSA). AI agents process emails, route correspondence, generate redlines. | ~$30B+ across all federal admin services; many micro-purchases < $10K | Long-tail revenue stream. Good for sub-contracting to prime contractors who win larger BPA contracts. |
| **541990** | All Other Professional, Scientific & Technical Services | Catch-all code agencies use when requirements don't neatly fit other codes. Includes "research support," "data analysis services," and increasingly "AI pilot programs." | Growing rapidly as agencies experiment with AI under this flexible code | **Emerging wedge.** Set up alerts for terms like "artificial intelligence prototype," "LLM proof of concept," "demonstration project" within this NAICS. |

### 2.3 Secondary NAICS Codes (Tier 2 — Watch List)

| NAICS | Title | Notes |
|-------|-------|-------|
| **611420** | Distance Education | Agencies like DoD, VA need training content automation. AI agents can generate course materials, QA existing content. |
| **541330** | Engineering Services | DOD/DoE engineering analysis + data summarization — less direct fit but strong for tech-adjacent pitching if we win a systems design contract first and add this as a sub-code. |
| **561440** | Collection Agencies | Debt management automation. Less aligned to AI-agent core but government debt portfolio is massive ($79B+ held by Treasury). |

### 2.4 NAICS Code Strategy Summary

```
Core focus (build alerts for these first):
  █████████████████████████ 541512 — Computer Systems Design Services (primary)
  ████████████████████       541618 — Scientific & Technical Consulting (undervalued wedge)
  ██████████████             541511 — Custom Computer Programming (MVP/pilot work)
  █████████                  561110 — Office Administrative Services (long-tail sub work)
  █████                      541990 — All Other Professional Services (emerging AI)

Watch list (add to alerts once core pipeline is live):
  ░░░░                       611420, 541330, 561440 — add in Phase 2
```

---

## 3. Host Node Recommendation

### 3.1 Decision: N1 (LBV Production) with N2 Architecture Reference

**Recommendation: Deploy on N1.** Here's why:

#### Arguments for N1

1. **Business context alignment:** LBV is run from N1 (Spark daemon, GSCRM integration, Telegram bot operations). A scout agent on N1 can directly write to the same GSCRM rows and send alerts through the same Telegram channel the operator already monitors. No cross-node data flow complexity.

2. **Agent identity & model routing:** N1 runs qwen3.6:35b-a3b-q8_0 at ctx 262144 / 100% GPU — optimal for the large-context analysis the scout needs (full SOW documents, multi-page opportunity descriptions). N2 only has gemma4:26b resident, which is inferior for long-document reasoning.

3. **No production disruption risk:** N1's current workload (Spark v1.0 with 1 customer Paperclip/LBV tasks) is modest — no critical customer-facing services in danger. The scout is a low-CPU, I/O-bound polling task that won't compete with Spark's per-call LLM needs.

4. **Operator proximity:** Andrey monitors N1-side outputs. When the scout flags a high-value opportunity, the alert appears in whichever Telegram channel N1 writes to — immediate operator awareness.

#### Arguments Against N2 (and why they lose)

| N2 Argument | Why It Doesn't Apply Here |
|-------------|--------------------------|
| "Content Machine Scout is on N2" | The N2 Scout is a **content-generation pipeline** (scout → writer → editor → distributor). It pulls from RSS/news sources for subwoofer reputation content. Different data source, different output format, different operational cadence. The *pattern* matters, not the node. N1 can reuse the architecture without housing it. |
| "R&D/testbed first" | Appropriate for experimental research. The scout's core logic (sam.gov API calls + simple filtering) is well-understood; no need to burn precious R&D cycles on something that follows a known pattern. |
| "128 GB RAM / 2 TB disk available" | N1 has enough headroom. The scout uses ~50-200 MB RAM for the polling service and LLM context window allocation — trivial compared to node loads. |

#### Alternative: Standalone Project Node

The third option discussed in §1 of task #18 (a standalone business stream) is **not recommended at this stage**. It adds operational overhead (separate node, separate auth, separate monitoring) for marginal benefit. If the scout pipeline proves its value and spawns sub-tasks (proposal writing agent, competitor analysis agent, telemetering tool), then a dedicated "bid management" workstream can be created. Not now.

### 3.2 N1 Deployment Profile

| Component | Config |
|-----------|--------|
| **Hermes profile** | `lbv-scout` (isolated from `spark`, from operator `~/.hermes/`) |
| **LLM routing** | N1 GPU: qwen3.6:35b-a3b-q8_0 for SOW analysis; OpenRouter fallback for polling logic |
| **Profile config** | `model.max_tokens: 4096`, `platform_toolsets.cli: [clarify, no_mcp]`, `telemetry.enabled: false` (per v7 operational patterns) |
| **Workspace** | `/home/andrey/lbv-scout-workspace/` (neutral path — per N1 operational rule: never spawn from daemon repo) |
| **Cron schedule** | Every 6 hours (00:00, 06:00, 12:00, 18:00 UTC) — sam.gov updates typically batch hourly but the real signal is daily/weekly |
| **GSCRM integration** | Direct row writes via GSheets API (same auth pathway as Spark Stripe webhook → GSCRM) |

---

## 4. Search & Filter Configurations

### 4.1 Set-Aside Types — What to Focus On

| Set-Aside Type | Description | Recommendation | Rationale |
|----------------|-------------|----------------|-----------|
| **SBA 8(a)** | Small business certification for socioeconomically disadvantaged firms. 9-year program. Agencies must set aside ~3% of contracting dollars. | **Include as watch, NOT primary target** | LBV would need to self-certify as an 8(a) firm (requires SBA approval process, ~6-12 months). Until that's obtained, 8(a) opportunities are useful for competitive intelligence but not directly bidable. |
| **HUBZone** | Certified small businesses in historically underutilized business zones. Preference in scoring (often +10 points). | **Include as watch if LBV qualifies** | Check HUBZone eligibility. If LBV addresses fall within a HUBZone, this is a powerful differentiator. Include in alerts; do not exclude. |
| **SDVOSB** | Service-Disabled Veteran-Owned Small Business. VA Section 8127 program reserves ~3% of DOD contracts for SDVOSBs. | **Primary set-aside focus** | If LBV has (or can partner with) an SDVOSB entity, this is the highest-value set-aside to target. VA and DOD are massive buyers of IT services. The SDVOSB pool faces less competition overall — veteran-owned certification process is ~3-6 months via SBA's Veteran Small Business Certification (VaQVC) program. |
| **Other than Full & Open** | Includes sole-source awards (§16(g)), JSA (Joint Statutory Authority), and BPA call orders within existing contracts. | **Monitor as separate alert class** | These are "below radar" — not typically posted on sam.gov for public search but visible in FPDS/USAJOBS. Valuable for competitive intelligence on where primes are already deploying AI agents. |

### 4.2 Primary Configuration Recommendation

**Default mode (immediate build):**
- **Search scope:** All open opportunities (not limited to set-asides initially)
- **Set-aside filters:** None locked down — scout flags all set-aside markers in results for operator review
- **Rationale:** We don't know our exact competitive posture yet (8(a)? HUBZone? SDVOSB partner?). Cast the net wide, classify by set-aside type in output, let operator triage.

**Set-aside strategy progression:**
1. **Phase 1 (launch):** No set-aside filtering. Scout returns everything matching NAICS + keywords. Operator learns which opportunities are actually bidable.
2. **Phase 2 (post-validation):** Lock down to LBV's actual certifications/eligibilities once operator clarifies business structure.
3. **Phase 3 (growth):** Add competitive intelligence mode — track awards by NAICS to see who's winning, what prices, and identify prime contractors we could team with.

### 4.3 Contract Size Range Strategy

| Window | Description | Recommended Approach | Why |
|--------|-------------|---------------------|-----|
| **Micro-purchases (< $10K)** | Too small to justify BD effort, but good for market signal on what agencies want from AI agents | **Flag only if keyword match is exceptional** (e.g., "AI" + agent keywords in a micro-purchase) | Low ROI per hour of scout time spent evaluating. Not worth systematic monitoring. |
| **Simplified acquisitions ($10K - $250K)** | Good for pilots, rapid-turn services, sub-contracting work under larger BPA awards. Manageable scope without teaming requirements. | **Primary revenue window for early stage** — include all | Where a 1-3 person shop like LBV can realistically win as prime with minimal overhead. |
| **Mid-market ($250K - $7M)** | Sweet spot for government service contracts. Enough dollars to be meaningful, small enough that big primes don't monopolize every set-aside. | **Include all** — this is our core engagement zone | Most 541512/541618 awards fall here. Manageable proposal writing effort (typically ~40 hours of operator time per bid). |
| **Large ($7M - $30M)** | Significant complexity, usually require teaming partners, past performance history of similar scale, bonding capacity. | **Watch list only** — surface as competitive intelligence for now | LBV doesn't have the track record or bonding line. These opportunities are useful primarily as "who's winning what" signals for eventual teaming. |
| **Mega ($30M+)** | Enterprise-wide IT services, cloud migration programs. Not relevant to LBV current capability profile. | **Exclude** | No point monitoring. |

### 4.4 Contract Size: Final Recommended Filter Window

```
ACTIVE FILTER: $25K — $7M annual value (or contract ceiling)
  - Below $25K: too small unless exceptional keyword signal
  - Above $7M: surface as "watch list" only, no bid recommendation

DYNAMIC THRESHOLDS BY SET-ASIDE TYPE:
  SDVOSB set-asides: extend floor to $100K (VA/DoD prefer larger awards in this pool)
  HUBZone set-asides: keep at $25K floor (less competition, smaller wins are viable)
```

### 4.5 Keyword & Phrase Filters

These run **in addition to** NAICS filtering — not instead of. An opportunity must match the NAICS + at least one keyword phrase to be flagged:

**Primary keyword set (high signal):**
- "artificial intelligence" OR "AI" OR "machine learning" OR "natural language processing"
- "automated" AND ("correspondence" OR "email" OR "inquiry" OR "intake")
- "chatbot" OR "conversational AI" OR "virtual assistant"
- "document processing" OR "records management" OR "data extraction"
- "workflow automation" OR "process improvement" AND ("software" OR "system")
- "intelligence analysis" OR "research support" (for 541990 wedge)

**Exclusion phrases (noise reduction):**
- "hardware" OR "infrastructure deployment" (non-AI work masquerading as AI RFP)
- "construction" OR "facilities maintenance" (not our business)
- "medical device" OR "pharmaceutical" (requires specialized licensing we don't have)

---

## 5. Output Channel Design

### 5.1 Primary Channel: GSCRM Row Writes

After Phase 0 operator approval, every qualified opportunity the scout accepts should generate a GSCRM row. GSCRM is the system of record — the searchable, filterable, human-queryable repository where discovered opportunities live. Phase 0 produces a dry-run file only and writes no CRM rows.

#### GSCRM Row Schema (Proposed)

| Field | Type | Source | Notes |
|-------|------|--------|-------|
| `opportunity_id` | string | sam.gov API ID (e.g., `SAMHSA-2026-001234`) | Primary key; unique per posting |
| `posting_date` | date | sam.gov postDate field | When opportunity was published |
| `close_date` | date | sam.gov closeDate field | Deadline for submissions |
| `agency` | string | Awarding agency name | e.g., "VA," "DOD," "HHS," "NSF" |
| `naics_code` | multi-select | solicitation body text | One or more NAICS codes from posting |
| `set_aside_type` | enum | solicitation metadata | Full & Open / SDVOSB / HUBZone / 8(a) / Other |
| `est_contract_value` | range string | sam.gov estimated value field | e.g., "$500K - $2M" or "TBD (not stated)" |
| `is_set_aside_match` | boolean | operator-defined eligibility + NAICS score | Does LBV have the right to bid this given its certifications? |
| `ai_relevance_score` | int 1-5 | scout LLM analysis of SOW | Auto-calculated by scout; human-adjustable in GSCRM |
| `sow_summary` | text | LLM-generated summary of Statement of Work | Max ~500 words; captures what agency actually wants |
| `match_reasoning` | text | LLM-generated rationale | Why this matches LBV capabilities — specific SOW language cited |
| `recommended_action` | enum | scout recommendation | Bid / Decline / Watch / Sub-contract opportunity |
| `prime_potential` | boolean | scout analysis of award pattern | Does this look like work a prime could win and subcontract to LBV? |
| `status` | enum | operator-driven | Discovered → Under Review → Bidding Declined → Submitted → Awarded (to competitor) |
| `notes` | text | free-form | Any operator additions |

#### Row Write Cadence & Batching

- **Individual writes** for high-signal matches (AI relevance >= 4) after Gate 0 — immediate GSCRM row creation, real-time visibility
- **Batch writes** for lower-signal matches (AI relevance 2-3) after Gate 0 — accumulated during each 6-hour poll cycle, written together at end of cycle
- **Noise suppression:** Duplicates within 72 hours are collapsed into a single row with an amendment log

### 5.2 Secondary Channel: Telegram Digest

**Every 24 hours (09:00 UTC), the scout produces a digest message.** This is NOT real-time alerting — it's a curated, operator-friendly summary of the prior cycle. Designed for async review during morning standup.

#### Digest Format (Telegram-optimized)

```
🇺🇸 SAM.GOV SCOUT — Daily Digest · 2026-06-06

Found 12 opportunities matching LBV criteria this cycle.

⚡ HIGH PRIORITY (review for bidding):

1/ VA IT Modernization & Digital Services
   NAICS: 541512 | Set-aside: SDVOSB | Est. $800K-$2M
   Close: 2026-07-15
   Summary: "Cloud migration, automated correspondence processing..."
   AI relevance: █████ 4/5 — chatbot/email automation = core fit

2/ HHS Research Data Processing Pilot
   NAICS: 541990 | Set-aside: Full & Open | Est. $150K-$300K
   Close: 2026-06-28
   Summary: "AI-powered data extraction from legacy documents..."
   AI relevance: ██████ 5/5 — exact match, small scope, fast close

📋 WATCH LIST (sub-contract potential, no immediate bid):

3/ DoD Enterprise Cloud Support BPA Call
   NAICS: 541512 | Set-aside: 8(a) | Est. $5M-$10M ceiling call
   Close: TBD (BPA call)
   AI relevance: ████ 4/5 — but requires teaming; watch prime awardees

🔕 NOISE filtered: 34 postings below keyword threshold, suppressed

GSCRM rows written: 12. Status: Discovered → Under Review.
[Operator: reply with action codes]
```

#### Digest Timing Logic

| Time | Action | Rationale |
|------|--------|-----------|
| 09:00 UTC (5 AM EDT / 4 AM MDT) | Morning digest | Operator reviews during morning coffee before workday starts |
| Every 6 hours poll (12:00, 18:00, 00:00 UTC) | Only GSCRM writes + instant high-priority alerts (AI relevance 5 only) | Prevents notification fatigue; reserve Telegram for truly urgent signals |

### 5.3 Why Not Telegram-Only or GSCRM-Only

| Channel | As Primary? | Verdict |
|---------|-------------|---------|
| **GSCRM-only** | ✅ Could work if operator actively queries it daily | But sam.gov volume could be high (50+ matches/week); manual GCRM filtering becomes tedious. Telegram digest provides the "push" layer so no manual searching is needed. |
| **Telegram-only** | ❌ Loses persistence, searchability, structured data | Memorable but ephemeral. No way to track opportunity pipeline over weeks/months. Telegram messages are hard to sort by agency, NAICS, or close date. GSCRM provides the longitudinal system-of-record. |
| **GSCRM + Telegram digest** | ✅✅ Best of both worlds | Real-time data record + curated daily summary without notification noise |

### 5.4 Future: Separate Business Stream?

If weekly discovery volume exceeds ~30 meaningful matches (requiring >30 GSCRM rows/week) and the operator finds themselves creating separate manual follow-up tasks for each bid opportunity, then splitting the scout into a **dedicated Bid Management stream** under its own Telegram channel is justified. This threshold has not been tested — it's a Phase 2 consideration.

---

## 6. Search & Filter Workflow Architecture

### 6.1 Overview: Four-Stage Pipeline

```
┌─────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   POLL      │────>│  PARSE       │────>│  SCORE &     │────>│  OUTPUT      │
│   Cycle     │     │  & NORMALIZE │     │  CLASSIFY    │     │  Write to    │
│  (6hr)      │     │              │     │              │     │  GSCRM +     │
│ sam.gov API │     │ Extract NAICS│     │ AI relevance │     │ Telegram     │
│ requests    │     │ set-asides   │     │ scoring      │     │ digest       │
│             │     │ values, dates│     │ LLM summary  │     │              │
└─────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
                                                    │
                          ┌───────────────────────────┘
                          ▼
                    ┌──────────────┐
                    │  DEDUPLICAT‖│────> Suppress repeats within 72hr window
                    │  E          │     Track amendments to existing rows
                    └──────────────┘
```

### 6.2 Stage 1: Poll (SAM.gov Get Opportunities Public API)

**Data source:** SAM.gov Get Opportunities Public API.

Use the current public search endpoint:

```text
https://api.sam.gov/opportunities/v2/search
```

This endpoint returns published opportunity details matching request parameters. The public API requires an API key, requires posted-date parameters, returns data synchronously with pagination, and returns the latest active version of an opportunity. Active notices are updated daily; archived notices are updated weekly.

| Parameter | Value | Rationale |
|-----------|-------|------------|
| `api_key` | Operator-provided SAM.gov public API key | Required by SAM.gov. Store as `SAM_GOV_API_KEY`; never log the value. |
| `postedFrom`, `postedTo` | Sliding date window, formatted `MM/dd/yyyy` | Required. SAM.gov documents a maximum one-year posted-date range. MVP should poll the last 7 days, then advance by checkpoint. |
| `ncode` | One NAICS code per query, initially 541512, 541511, 541618, 561110, 541990 | Official NAICS filter. Use separate queries per code for cleaner attribution and easier retry. |
| `ptype` | Start with `r,o,k,p,s` | Sources Sought, Solicitation, Combined Synopsis/Solicitation, Presolicitation, Special Notice. Exclude awards in MVP; add awards later for competitive intelligence. |
| `typeOfSetAside` | Empty in MVP | Cast wide at launch; classify set-aside metadata after retrieval until LBV eligibility is clarified. |
| `rdlfrom`, `rdlto` | Optional deadline window | Use only after initial sampling proves it improves signal; response-deadline range also has a one-year limit. |
| `ccode` | Optional PSC/classification code | Add after Phase 0 if NAICS produces too much noise. |
| `limit` | 100 initially, up to 1000 if needed | SAM.gov max is 1000; start lower to conserve daily quota. |
| `offset` | 0, then increment by `limit` until exhausted | Official pagination parameter. |

Do not rely on API-level value filters in MVP. The public Get Opportunities API documentation does not list `valueMin` or `valueMax` search parameters. Contract value and ceiling should be parsed from returned metadata, descriptions, attachments, or left as `TBD` and used in post-processing only.

**Expected volume:** unknown until Phase 0 sampling. Initial estimate: ~15-40 raw opportunities per 6-hour poll cycle after API-level NAICS/procurement-type filtering. After keyword filtering: ~8-20. After AI relevance scoring: ~2-5 actionable matches. Phase 0 must validate or revise these numbers before automation.

### 6.3 Stage 2: Parse & Normalize

For each opportunity returned by the API:

1. Extract structured fields: title, agency, NAICS codes, set-aside designation, estimated value, posting date, close date, solicitation type (IR/BSR/etc.)
2. Capture `description`, `uiLink`, `additionalInfoLink`, `links`, and any visible description URL from the API result. Fetching attachments or detail pages is Phase 1+ only and must respect SAM.gov access requirements.
3. Normalize value fields to dollar ranges (handle "TBD," not-stated, multiple task-order ceilings)
4. Detect set-aside type from solicitation body text if metadata is missing

### 6.4 Stage 3: Score & Classify (Agent Processing)

**This is the LLM agent's core work.** For each parsed opportunity, run a structured classification prompt:

```
Input: {opportunity_title, agency, naics_code, set_aside_type, 
        est_value_range, close_date, sow_summary_or_full_text}

Output (JSON):
{
  "ai_relevance_score": <int 1-5>,
  "capability_match_description": "<text>",
  "sow_summary": "<max 500 words>",
  "recommended_action": "<Bid|Decline|Watch|Sub-contract opportunity>",
  "prime_potential": <boolean>,
  "key_gov_languages_cited": ["specific SOW text phrases that indicate need"],
  "competitive_intelligence_notes": "<who the prime might be, what agency pattern>"
}

Scoring rubric:
1 — No meaningful AI-agent fit. Generic IT/hardware/general consulting.
2 — Weak fit. Some overlap with agent capabilities but requirement is fundamentally different (e.g., hardware deployment, network infrastructure).
3 — Moderate fit. Agent could help in a sub-role or as part of a larger solution teaming arrangement.
4 — Strong fit. Core SOW elements map directly to what LBV's AI agents deliver (document processing, intake automation, research analysis, chatbot/triage systems).
5 — Exceptional fit. Near-perfect match. This is exactly the kind of requirement an AI-agent startup should bid on. Small scope, clean description, manageable proposal effort.
```

### 6.5 Stage 4: De-duplicate & Output

| Step | Logic |
|------|-------|
| **72-hour de-dup check** | Compare new opportunity OPI (opportunity ID) against existing GSCRM rows for past 72 hours. sam.gov posts are often amended rather than new — suppress as duplicate and log amendment notes instead of creating a new row. |
| **Phase 0 output** | Write accepted matches to a dry-run local sample file only; no GSCRM or Telegram writes. |
| **High-signal immediate write** | After Gate 0, AI relevance 5 → create GSCRM row immediately within poll cycle, no wait for digest pipeline. |
| **Standard batch write** | After Gate 0, scores 2-4 → queue for end-of-cycle batch write to GSCRM. |
| **Noise rejection** | Score 1 → discard silently (no GSCRM row created; internal log counts it for volume tracking). |

### 6.6 Prompt Design Strategy

The scout agent uses **two prompts**:

1. **`scout-classify`** — the core classification prompt (Stage 3 above). This is a structured JSON-output prompt, designed to minimize LLM output variability and maximize parseability for GSCRM row generation.

2. **`scout-digest`** — the daily digest generator prompt. Takes the day's batch of classified opportunities and produces the Telegram-formatted summary. Uses markdown formatting optimized for Telegram rendering.

Both prompts should be created via `mcp_memory_hub_get_prompt(name='scout-classify')` pattern — defined as named, versioned prompts in MemoryHub so they can evolve without changing code.

---

## 7. Build Phases & Milestones

### Phase 0: Research & API Validation (1-2 days, no CRM writes)
- Confirm `SAM_GOV_API_KEY` exists in the chosen runtime environment without printing it.
- Run read-only API probes against `https://api.sam.gov/opportunities/v2/search` for the five primary NAICS codes using a 7-day posted-date window.
- Verify pagination behavior, API response shape, required date formatting, and daily quota behavior.
- Produce a dry-run sample file with at most 50 normalized opportunities, no GSCRM writes and no Telegram alerts.
- Test keyword filter precision on the dry-run sample.
- **Gate:** Operator reviews the dry-run sample and approves target filters before any CRM write path is enabled.

### Phase 1: Core Scout Pipeline (5-7 days)
- Implement poll→parse→score→dry-run-output pipeline.
- Add GSCRM row writes only after Gate 0 approval.
- Manual operator review of GSCRM entries for correctness of AI relevance scores
- **Gate:** Operator validates >=80% accuracy of scout's AI relevance scoring on first 20 entries

### Phase 2: Telegram Digest + Automation (3-5 days)
- Add daily digest output to Telegram
- Add de-duplication logic
- Tune keyword filters based on feedback from Phase 1
- **Gate:** Scout runs 7 consecutive days without missed polls or GSCRM write failures

### Phase 3: Competitive Intelligence Mode (optional, post-validation)
- Add FPDS retrospective analysis — track award winners for monitored NAICS codes
- Identify prime contractors who consistently win AI-related federal contracts (teaming prospects)
- Add sub-contracting opportunity flags when primes win and need tech subs
- **Gate:** Operator confirms intel is actionable enough to justify the additional data pipeline

### Phase 4: Bid Management Integration (long-term, if scout proves value)
- Connect scout outcomes to a bid lifecycle tracker in GSCRM
- Agent-assisted proposal outline generation for "Bid" flagged opportunities
- Teammate matching database (SDVOSB partners, prime contractors, industry associations)

---

## 8. Risk Posture

| Risk | Impact | Mitigation |
|------|--------|------------|
| **sam.gov API rate limits** | Poll failures during high-volume periods | Implement exponential backoff; cap at 100 requests/cycle; respect API usage policies |
| **LLM hallucination of opportunity details** | Operator wastes time on non-existent or mis-described opportunities | Always include sam.gov OPI ID in output for verification; structured JSON output reduces variability |
| **False positives (low relevance scores)** | Noise in GSCRM, operator fatigue | Start conservative: only create GSCRM rows for score >=3 initially. Tune down to 2 after validation. |
| **SAM.gov registration expiration** | Scout identifies opportunities LBV cannot actually bid on | Operator responsible for maintaining SAM registration; scout can include a "registration status" field in GSCRM if operator provides the expiry date |
| **Competitive intelligence → competitive harm** | If LBV is seen as targeting specific agencies/contracts too aggressively | Keep the scout focused on pattern discovery, not aggressive bid targeting. No automated outreach to primes (out of scope by design). |

---

## 9. Open Decisions for Operator

| # | Decision | Options | Recommendation |
|---|----------|---------|----------------|
| 1 | **Set-aside targeting** | Cast net wide (all set-asides) vs. lock down once certifications are confirmed | Wide net at launch; operator filters during review |
| 2 | **Telegram alert threshold** | Immediate alerts for score 5 only, or all scores >=4? | Score 5 only (reserve Telegram for truly high-signal). All others get daily digest. |
| 3 | **Poll frequency** | Every 6 hours vs. every 4 hours | Start at 6 hours (sam.gov updates are typically batched; 4h adds cost for marginal signal gain) |
| 4 | **Hermes profile name** | `lbv-scout` vs. `federal-bd` vs. other | `lbv-scout` — clear, unambiguous within the cluster |
| 5 | **SAM.gov API key** | Operator provides a personal public API key, or creates a system account later | Personal public API key for MVP; system account only if the scout graduates to production scale |
| 6 | **First output mode** | Dry-run file only vs. immediate GSCRM writes | Dry-run file only for Phase 0, then GSCRM after operator review |

---

## Appendix A: sam.gov API Reference Summary

The scout should consume one primary public endpoint in MVP:

1. **`https://api.sam.gov/opportunities/v2/search`** — Search published opportunities with filters such as posted date, procurement type, solicitation number, notice ID, title, place of performance, organization, set-aside, NAICS (`ncode`), classification code (`ccode`), response deadline, `limit`, and `offset`.

Important API constraints from GSA Open Technology docs:

- `api_key` is required.
- `postedFrom` and `postedTo` are required, format `MM/dd/yyyy`.
- Posted-date range max is one year.
- `limit` max is 1000 and default is 1.
- The API returns the latest active version of the opportunity.
- Active notices are updated daily; archived notices are updated weekly.
- Use the separate Opportunity Management API only for authorized federal opportunity management workflows. It is not the MVP data source for this read-only scout.

Operator credential note: the SAM.gov public API key is retrieved from SAM.gov account details. Do not create accounts or request credentials as part of this build mission; operator provides the key.

Primary references checked 2026-06-06:

- GSA Open Technology — SAM.gov Get Opportunities Public API: https://open.gsa.gov/api/get-opportunities-public-api/
- GSA Open Technology — SAM.gov Opportunity Management API, for non-MVP authorized management workflows only: https://open.gsa.gov/api/opportunities-api/
- GSA Open Technology — SAM.gov Entity Management API, useful only for later vendor/entity enrichment: https://open.gsa.gov/api/entity-api/

## Appendix B: NAICS Code Selection References

Primary NAICS sources:
- Census Bureau NAICS definition manual (2022 edition)
- SAM.gov opportunity posting metadata (NAICS codes are agency-declared in postings)
- FPDS award data (historical spend by NAICS code for validation)

## Appendix C: Telegram Message Format Conventions

All scout messages follow Telegram markdown conventions:
- **Bold** for labels and categories
- *Italics* for nuance and disclaimers
- Inline `code` for technical values (OPI IDs, NAICS codes)
- Emojis for visual scanning (`🇺🇸 SAM.GOV SCOUT`, `⚡ HIGH PRIORITY`, `📋 WATCH LIST`, `🔕`)
- Bar chart representation for relevance scores (`█████ 5/5`) — Telegram renders text blocks fine

---

*End of spec. Awaiting operator review and approval to proceed.*
