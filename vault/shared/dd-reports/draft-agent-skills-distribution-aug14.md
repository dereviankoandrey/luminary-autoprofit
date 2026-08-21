# Distribution Draft — Claude Code / Cursor Community Post
**Date:** August 14, 2026
**Target Channels:**
- r/LocalLLaMA (Reddit) - "Show HN" style post about open-source underwriting skill
- Claude Code Discord (#show-and-tell channel)
- Open Interpreter community Discord
- skills.sh featured listing

---

## Post Title Options (A/B ready for Andrey to publish)

### Option A — Technical audience:
"I built an open-source deterministic real estate underwriting skill for coding agents — zero hallucination, fully auditable math"

### Option B — Operator/business audience:
"We needed a deterministic underwriting engine for AI agent workflows. Built it as an open skill anyone can install."

### Option C — Hybrid (best of both):
"This SKILL.md gives any coding agent 20 years of real estate underwriting expertise in its pocket"

---

## Post Body Draft

```markdown
I built a deterministic real estate deal analysis engine packaged as an open Claude Code/Cursor skill. No probabilistic outputs, no hallucination — every calculation is auditable math.

**What it does:**
- Accepts any real estate deal (fix-and-flip, buy-and-hold, mixed-use)
- Runs through the same metrics institutional underwriters use: ROI, cash-on-cash, DSCR, cap rate, debt service coverage
- Produces GO / CAUTION / NO-GO verdicts with full calculation trace

**Why it's different:**
Every AI model can "estimate" a deal. This doesn't estimate — it calculates from first principles. Every default value is explicit. Every risk factor is flagged. You can independently verify any output against the formulas in this repo.

This matters because:
- Real estate investors have millions at stake on underwriting decisions
- Probabilistic AI models can hallucinate numbers that make or lose deals
- Deterministic math doesn't care about your mood — it's always consistent
- The agent-skill format means any developer with Claude Code has this capability in their pocket immediately

**Why I open-sourced it:**
1. More eyes = more verification of the math = trust building for the product line
2. If someone builds on top of this (they will), that's better than reinventing underwriting from scratch
3. The agent skill distribution model is genuinely low-friction — zero dependency, one file install

**What I've built alongside it (and where Luminary's going):**
- Chrome Extension Deal Screener for browsing Zillow/Redfin directly [GitHub demo](https://dereviankoandrey.github.io/deal-screener-demo/)
- Flash Deal Analyses across 10+ Sun Belt markets
- Underwriting SaaS (deploy-ready)

All deterministic. All audit trail. None of them run on cloud APIs for the core math — pure SQLite calculations.

Would love feedback from anyone who's built tools or workflows in the real estate vertical, especially around distribution and go-to-market strategy. Happy to chat via DMs.

Repo: [link to be filled]
Demo: https://dereviankoandrey.github.io/deal-screener-demo/
```

---

## Distribution Plan (for Andrey — ~10 min total)

| Step | Action | Time | Channel |
|------|--------|------|---------|
| 1 | Push SKILL.md updates + any new docs to GitHub | 5 min (single commit) | git push to `dereviankoandrey/luminary-re-underwriting-skill` |
| 2 | Post on r/LocalLLaMA as "Show" post | 3 min | Reddit community (~150K members) |
| 3 | Post on Claude Code Discord #show-and-tell | 2 min | Active developer community ~5K+ members |

**Total Andrey time:** ~10 minutes
**Reversibility:** Deleting posts takes <1 minute; unpublishing GitHub repo takes <1 minute
**Cost to distribute:** $0

---

## Alternative: LinkedIn Post (for operator audience)

```markdown
After 20+ years in real estate development, I've seen operators killed by bad underwriting — not because they were inexperienced, but because the tools available to them produce estimates, not analysis.

So I built deterministic underwriting that any coding agent can use:

✅ Every calculation is auditable math (not "AI estimates")
✅ GO / CAUTION / NO-GO verdicts with full reason trace
✅ Zero dependency — it's one install away in Claude Code or Cursor
$$0 cost to try, but million-dollar consequences for bad underwriting deserve tools that don't hallucinate

The agent skill format means any developer who wants to add real estate analysis to their tool stack literally just installs the skill. No API keys, no servers, no infrastructure.

This is part of a broader open-source project building deterministic deal analysis tools for real estate investors. The engine runs pure SQLite — no cloud APIs involved in the core math.

Built at Luminary Bot Ventures. Open source because trust should be auditable, not promised.
```

---

## Internal Notes (do NOT include in public posts)

- **Luminary Bot Ventures** — real estate tech + AI infrastructure company
- **Founder:** Andrey Derevianko (20+ years US/Australia real estate development, MBA from Harvard Business School, background in software dev)
- Target positioning: "Deterministic tools over probabilistic guesses for decision-critical workflows"
