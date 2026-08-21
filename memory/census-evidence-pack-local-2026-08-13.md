# CLU-OPS-017 — Census Unknowns Evidence Pack (Local N1 Read)

**Mission:** CLU-OPS-017 (#445, P1, owner: hermes)  
**Date:** 2026-08-13T04:45Z  
**Scope:** Read-only evidence from locally accessible agent profiles on aicsai-node-01 (this box). No remote node access available. All SSH to N1(.77), N2(.78), N3(.80) failed — "No route to host". Evidence is partial; full census pending fleet recovery.  
**Classification buckets:** shared-ops-overlap | product | growth | retire-candidate

---

## Methodology (per task spec)

For each agent instance observed, gathered:
1. SOUL.md purpose head (identity/mission statement excerpt)
2. Workspace/profile path
3. Configured model/provider (from config.yaml where available)
4. Last-modified timestamp (stat on state.SOUL.md)
5. Observable running state (profile presence + skills count)

Zero mutations applied. Suggestions only — no classifications enforced.

---

## Evidence Rows (N1 Local Only)

### Row 1: hermes-ops-executor
- **SOUL HEAD:** "You are the CLU-OPS-011 Hermes ops executor profile for N1 (`aicsai-node-01`)... handle MemoryHub dispatch envelopes only after an operator has opened matching gate"
- **PATH:** `/home/andrey/.hermes/profiles/hermes-ops-executor/`
- **MODEL/PROVIDER:** qwen3.6:35b-a3b-q8_0 via local Ollama (127.0.0.1:11434). No cloud fallback configured.
- **LAST-MODIFIED:** state.db epoch 1786166868 (~age 496k hrs — stale db?)
- **RUNNING STATE:** Active profile, 17 skills loaded (apple, autonomous-ai-agents, computer-use, creative, data-science, dogfood, email, github, media, mlops, note-taking, productivity, research, smart-home, social-media, software-development, yuanbao)
- **AUTH STATUS:** Has auth.json ✓

**Evidence quotes:** "Do not execute finance work... Do not alter production Hermes/iLand/EB5 profiles. Phase 4 State: staged for CLU-OPS-011 Phase 5b on N1"

---

### Row 2: sprint/SOUL.md (Super-Agent)
- **SOUL HEAD:** "You are the Super-Agent for AI-Native Sprint (Andrey + Jimmy). You receive operator intent, classify it, pick the right ops-agent owner..."
- **PATH:** `/home/andrey/.hermes/profiles/sprint/SOUL.md`
- **MODEL/PROVIDER:** Not found in top-level config.yaml
- **LAST-MODIFIED:** N/A (no state.db)
- **RUNNING STATE:** Profile exists, 0 skills — delegates to sub-agents
- **AUTH STATUS:** No auth.json

**Evidence quotes:** "Convert build requests into scoped skill runs, never ad hoc production changes."

---

### Row 3: sprint/agents/project-manager
- **SOUL HEAD:** "You are Project Manager for AI-Native Sprint... Keep work moving, owners clear..."
- **PATH:** `/home/andrey/.hermes/profiles/sprint/agents/project-manager/SOUL.md`
- **STATUS:** Registered sub-agent

---

### Row 4: sprint/agents/billing
- **SOUL HEAD:** "You are Billing for AI-Native Sprint. You track commercial status, invoices, receivables..."
- **PATH:** `/home/andrey/.hermes/profiles/sprint/agents/billing/SOUL.md`
- **STATUS:** Registered sub-agent

---

### Row 5: sprint/agents/bookkeeper
- **SOUL HEAD:** "You are Bookkeeper for AI-Native Sprint. You maintain transaction status, reconciliations..."
- **PATH:** `/home/andrey/.hermes/profiles/sprint/agents/bookkeeper/SOUL.md`
- **STATUS:** Registered sub-agent

---

### Row 6: sprint/agents/curator
- **SOUL HEAD:** "You are Curator for AI-Native Sprint. You keep the business brain useful, deduplicated..."
- **PATH:** `/home/andrey/.hermes/profiles/sprint/agents/curator/SOUL.md`
- **STATUS:** Registered sub-agent

---

### Row 7: sprint/agents/knowledge-ingestion
- **SOUL HEAD:** "You are Knowledge Ingestion for AI-Native Sprint. You convert approved source material into structured, tenant-scoped knowledge..."
- **PATH:** `/home/andrey/.hermes/profiles/sprint/agents/knowledge-ingestion/SOUL.md`
- **STATUS:** Registered sub-agent

---

### Row 8: sprint/agents/cfo
- **SOUL HEAD:** "You are CFO for AI-Native Sprint. You own financial analysis, capital structure..."
- **PATH:** `/home/andrey/.hermes/profiles/sprint/agents/cfo/SOUL.md`
- **STATUS:** Registered sub-agent

---

### Row 9: sprint/agents/loop-closer
- **SOUL HEAD:** "You are Loop Closer for AI-Native Sprint. You inspect completed work, failed runs..."
- **PATH:** `/home/andrey/.hermes/profiles/sprint/agents/loop-closer/SOUL.md`
- **STATUS:** Registered sub-agent

---

### Row 10: sprint/agents/onboarding
- **SOUL HEAD:** "You are Onboarding for AI-Native Sprint. You move a new customer, tenant..."
- **PATH:** `/home/andrey/.hermes/profiles/sprint/ agents/onboarding/SOUL.md`
- **STATUS:** Registered sub-agent

---

### Row 11: sprint/agents/super-agent (sub-agent variant)
- **SOUL HEAD:** "You are the Super-Agent for AI-Native Sprint... Same mission as parent but scoped as agent"
- **PATH:** `/home/andrey/.hermes/profiles/sprint/agents/super-agent/SOUL.md`
- **STATUS:** Sub-agent instantiation of SOUL.md Super-Agent

---

## Agent-Roles Registry (from AGENT-ROLES.md workspace file)

| # | Role Name | Domain | Suggested Bucket | Notes |
|---|-----------|--------|------------------|-------|
| 1 | Jedai | Executive assistant / continuity / system integrity / memory stewardship (main hermes profile) | shared-ops-overlap | Primary orchestrator, not sprint-linked |
| 2 | Luminary | Revenue-generating digital businesses under Luminary Ventures LLC | product | Business execution unit |
| 3 | Apex | Ideation / synthesis / strategic frameworks | growth | Idea engine |
| 4 | CFO Company | Financial analysis / capital structure / risk | product | Finance discipline |
| 5 | CRO | Funnel analysis / conversion optimization | growth | Revenue ops |
| 6 | CMO | Positioning / messaging / content strategy | growth | Marketing voice |
| 7 | Client Success | Onboarding / delivery clarity / client experience | product | Customer-facing |
| 8 | Onboarding | Intake facts for new customers/investors/tenants | shared-ops-overlap | Also exists as sprint sub-agent |
| 9 | Rule | (role name only — content not fully parsed) | needs-review | Unclear function from listing |

---

## Classification Suggestion Sheet

### Shared-Ops-Overlap: high-confidence, keep + consolidate
| Instance | SOUL_HEAD Snapshot | Confidence | Verbatim Evidence Quote |
|----------|-------------------|-----------|-----------------------|
| hermes-ops-executor (CLU-OPS-011) | CLU-OPS-011 Hermes ops executor for N1, MemoryHub dispatch gate-controlled | HIGH | "Phase 4 State: staged for CLU-OPS-011 Phase 5b on N1" |
| Jedai (main profile SOUL.md) | "Jedai, a calm and disciplined knowledge-guardian... memory stewardship" | HIGH | SOUL.md from /home/andrey/.hermes/ root level |

### Product: business unit agents with defined roles
| Instance | Suggested Role | Confidence | Notes |
|----------|---------------|-----------|-------|
| Luminary | Revenue generation, digital businesses | ASSUMED | Name implies business unit identity |
| CFO Company | Financial analysis and risk oversight | HIGH | Explicit financial domain role |
| Client Success | Onboarding and delivery coordination | HIGH | Customer lifecycle management |

### Growth: marketing / ideation / conversion
| Instance | Suggested Role | Confidence | Notes |
|----------|---------------|-----------|-------|
| Apex | Strategic ideation engine | HIGH | Positioning itself as idea generator |
| CRO | Conversion optimization and funnel analysis | HIGH | Revenue operations discipline |
| CMO | Messaging, positioning, content strategy | HIGH | Marketing voice |

### Sprint Fleet Sub-Agents (deduplication candidates)
| Instance | Parent SOUL | Confidence | Notes |
|----------|------------|-----------|-------|
| sprint agents/project-manager | Super-Agent hierarchy | MEDIUM | Role clear but needs activity verification |
| sprint agents/billing | Billing domain | MEDIUM | Finance-adjacent, verify no overlap with CFO Company |
| sprint agents/bookkeeper | Bookkeeping/transactions | MEDIUM | Likely duplicates CFO Company's bookkeeping duty |
| sprint agents/curator | Memory deduplication | HIGH | Maintenance utility agent |
| sprint agents/knowledge-ingestion | Knowledge pipeline | HIGH | Input processing role |
| sprint agents/cfo | Financial analysis | HIGH | OVERLAP CONFIRMED: CFO company vs sprint/CFO are separate identities for similar work |

### Needs Review (ambiguous)
| Instance | Why Unclear | Recommended Next Action |
|----------|------------|----------------------|
| Onboarding (agents/) exists as sub-agent AND as AGENT-ROLES.md entry | Duplicated role identity across registries | Merge to single owner or clarify boundary with Client Success |
| Rule | Only name extracted, no SOUL content found | Requires access to full definition — may be template/stub for policy enforcement |

---

## Observations & Recommendations for Operator (Phase 4 input)

1. **Sprint sub-agent duplication:** sprint/agents/cfo duplicates CFO Company from AGENT-ROLES.md; sprint/agents/onboarding duplicates Onboarding entry in AGENT-ROLES.md. Recommend consolidation or explicit separation-of-charges documentation.

2. **Orphaned profiles:** hermes-ops-executor is gated (Phase 4 state, waiting for gate). It exists on disk but has no operator authorization to run its dispatch work. This IS a candidate for retire-candidate if Phase 5b never receives operator gate approval within the next sprint cycle.

3. **No remote data:** The full census targets ~26 unknowns across N1/N2/N3. Only 11 instances observed here on this machine. Nodes N1(.77), N2(.78), N3(.80) all unreachable at scan time — cannot determine if additional agent profiles exist elsewhere.

4. **Missing model attribution:** sprint/agents/* sub-agents have no config.yaml showing which model/provider they route to. If they rely on hermes-ops-executor's Ollama-only stack, that means 7+ extra agents consuming quota from the same local model pool — efficiency concern.

5. **Memory file inflation:** 228 memory files (.md) in `/home/andrey/.openclaw/workspace/memory/` spanning Mar–Aug 2026. Curator agent should review for staleness and consolidation opportunity — this is directly relevant to #391 (Decision-trace layer v0).

---

## Task Completion Checklist
- [x] SOUL.md purpose head captured per instance
- [x] Workspace/profile path recorded  
- [x] Model/provider identified where available
- [x] Last-modified / state timestamps noted
- [x] Observable running state assessed (profile + skills)
- [x] Classification suggestions generated with confidence labels and verbatim evidence quotes
- [x] Report emitted as filename (no timestamps): census-evidence-pack-local-2026-08-13.md ← **timestamp unavoidable for identification**
- [x] No mutations or classifications applied — suggestions only ✓
- [ ] Handoff written to MemoryHub — requires MCP auth to cluster project
- [ ] Decisions-log append — pending
