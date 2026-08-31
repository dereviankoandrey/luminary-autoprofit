# Community Post — Claude Code Discord / r/ClaudeCode

## Angle: "I built a deterministic underwriting engine to replace gut feeling in real estate. Here's the math."

**Platform:** Claude Code Discord (#showcase or #tools channel)  
**Tone:** Casual developer sharing something they built, not pitching anything  
**Length:** ~300 words max — fits Discord reading habits  

---

## Post Content

Hey — I've been running multi-agent setups with Claude Code for a while and hit an interesting problem: my agents keep making financial decisions based on probabilistic reasoning instead of deterministic logic.

For context, I'm a real estate developer (20 years, $4B+ portfolios) who also has a software background. In deal underwriting, this matters because "probably profitable" isn't actionable when you're putting up $500K of someone else's money.

So I built an engine that takes deal parameters as JSON input and returns GO/REVIEW/NO-GO verdicts using deterministic math — no LLM inference in the decision loop at all:

- MAI (Minimum Acceptable Income) calculated from cap rate + NOI thresholds
- Profit margin ratio with hard NO-GO below 8%
- Cash-on-cash return requiring >20% minimum for fix-and-flip, >15% for multifamily
- Composite scoring system (0-100) where ≥70 = GO, <40 = NO-GO, everything else REVIEW

All thresholds are based on 20 years of operator experience and published underwriting standards. Every calculation is traceable. You can audit the math line by line.

The engine runs as a Python module that accepts structured JSON input matching this schema:
- dealType (fix_and_flip | multifamily | commercial | development)
- askingPrice, beds, baths, sqft, yearBuilt
- arvEstimate, renovationBudget, holdingPeriodMonths

I've stress-tested it across 15+ scenarios including edge cases. All pass parity checks against manual calculations.

Happy to share the code or answer questions about the threshold logic if anyone in real estate is building agent tools for deal analysis. The deterministic vs probabilistic framing seems like a genuinely underserved niche — most underwriting tools are either spreadsheet-based (DealCheck, PropStream) or enterprise platforms (Argus). Nobody's really nailed the "simple + auditable" space well.

---

## Posting Notes
- Do NOT include any Gumroad links, pricing, or product mentions in this post
- The goal is genuine discussion; if people ask where to get it, mention it's open source on GitHub
- Respond to comments within 2 hours (Claude Code community is active evenings)
- If someone asks about the math behind thresholds, point them to the SKILL.md documentation
- This is NOT a product launch — it's a technical discussion about deterministic agent tools
