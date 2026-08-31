# LinkedIn Post — Token Overhead = Black Box Problem (July 13, 2026)

**Hook:** xAI uploaded your entire repo with zero redaction. Tonight, a new study measured exactly how much AI tools hide from you before they even start working. Same problem. Different industry.

---

## Draft Post

Last night I read something that should terrify anyone using agentic AI in production:

A team at Systima ran controlled benchmarks between Claude Code and OpenCode on the same model, same machine, same tasks. The result?

Claude Code sent 33,000 tokens of system prompt, tool schemas, and injected scaffolding before your actual prompt even arrived. OpenCode sent 7,000. Same difference. A four-to-one ratio between what you asked for and what the system consumed just to say "hello."

And it gets worse:

• Claude Code re-wrote tens of thousands of prompt-cache tokens mid-session — up to 54x more cache writes than OpenCode on identical tasks
• Adding a single 72KB instruction file (AGENTS.md) adds 20,000 tokens per request
• Five MCP servers add another 5,000–7,000 tokens
• A task that costs 121K tokens directly balloons to 513K with two subagents

By the time a "production setup" sends its first real request, it's 75,000–85,000 tokens deep before you've typed a word.

Here's what I think this means:

Every token of harness overhead is a token of working context you cannot spend on actual work. It's invisible cost, unmeasured latency, and an opaque system that tells you nothing about what it actually did.

We see the exact same pattern in real estate underwriting.

Black-box AI models process deals with no audit trail, no deterministic reasoning chain, no way to verify why a GO or NO-GO decision was made. Just like Claude Code's 33k-token overhead — you have no idea what the system consumed before it arrived at its answer.

That's why we built deterministic underwriting: every calculation is explicit, auditable, and reproducible. No hidden context windows. No cache-write black boxes. If a deal doesn't pencil, you see exactly where and why — not an AI saying "trust me."

The token overhead story proves what I've been arguing for years: transparency isn't a feature. It's the baseline requirement for any system making decisions with your money or your time.

If we can't trust AI to be transparent about its own code, how do we expect it to make financial decisions?

---

**Posting recommendation:** Tuesday July 15 at 8 AM ET or Wednesday July 16 at 12 PM ET

**Follow-up comment template (post first reply):**
> For context: I've been building deterministic underwriting tools for real estate investors because I was tired of black-box AI making financial decisions with no audit trail. If you want to see what transparent, auditable deal analysis looks like — here's a sample report [link to deal-analysis-suite-demo]. Would love feedback from operators and developers alike.

**Assets to include:**
- Link to latest DD Report sample: `vault/shared/dd-reports/deal-analysis-suite-demo-austin-4unit.md` or `deal-analysis-suite-demo-st-johns-mixeduse-2026-06-13.md`
- Optional: screenshot of deterministic GO/NO-GO output showing explicit reasoning chain

---

## Positioning Notes

**Why this works:** The Systima study is the strongest real-world proof point we've had for deterministic positioning. It's not a theoretical argument — it's measured data from an independent source showing that popular AI tools literally cannot be transparent about what they're doing with context. That maps directly to our core thesis: if you can't audit how your AI tool works, don't trust it with financial decisions.

**Operator-first angle:** Leads with the practical problem (token overhead = wasted budget + opacity) rather than technical theory. Any operator running agents in production will relate immediately.

**Bridge to DD Reports:** Natural transition from "AI tools hide their context" → "same problem exists in underwriting" → "here's our deterministic solution." No hard pitch — just logical progression from shared pain point to differentiated approach.

**Credibility markers:** Cites specific measurements (33k vs 7k tokens, 54x cache writes) from an independent research source. Positions Andrey as someone who reads HN and understands the systems he's building on top of.

---

## Market Context (for reference only — do not include in post)

- Source: https://systima.ai/blog/claude-code-vs-opencode-token-overhead
- HN score: 513 points (#1 story tonight, July 13)
- Comments: 288 — strong engagement on transparency/opacity theme
- Timing: Published ~10 hours ago, riding the wave of "AI tool auditability" conversation
