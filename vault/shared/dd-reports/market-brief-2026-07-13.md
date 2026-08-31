# Market Brief — July 13, 2026

## Top Story: Claude Code Token Overhead (513 pts on HN)

**Source:** Systima.ai benchmark comparing Claude Code vs OpenCode

**Key findings:**
- Claude Code sends ~33K tokens of system prompt/tool schemas before the user's actual prompt arrives; OpenCode sends ~7K — a 4.7x ratio
- Cache inefficiency: Claude Code re-writes up to 54x more cache tokens mid-session on identical tasks
- Config bloat: A single 72KB instruction file adds ~20K tokens per request; five MCP servers add 5–7K more
- Subagent multipliers: A 121K-token task becomes 513K with two subagents (each has bootstrap cost + parent transcript consumption)
- Production setups arrive at 75K–85K tokens deep before the user types a word

**Why it matters for us:** This is the strongest real-world validation of our deterministic/auditable positioning. Black-box AI tools can't even be transparent about their own context consumption — let alone financial decision-making. Direct bridge to DD Reports thesis: if you can't audit how your tool works, don't trust it with money.

**Content angle:** LinkedIn post drafted (`linkedin-post-token-overhead-2026-07-13.md`). Operator-first narrative leveraging measured data from independent source.

## Other Notable Stories

| # | Story | Score | Relevance |
|---|-------|-------|-----------|
| 3 | Ask HN: Add flag for AI-generated articles | 256 pts | Content authenticity concern — reinforces "human-verified + deterministic" positioning angle |
| 9 | LARP – Revenue infrastructure for serious founders | 195 pts | Solo founder economy continues; validates our direct-to-investor distribution model |
| 11 | Migrating production AI agent to GPT-5.6: 2.2x faster, 27% cheaper | 167 pts | Model economics improving — supports our cost-comparison messaging in DD Reports |
| 10 | GhostLock Linux stack-UAF (15 years) | 158 pts | Infrastructure security awareness rising — tangential to auditability theme |

## Capability Notes
- web_fetch: Working on HN (~15% research capability)
- web_search: Still down (~87 days cumulative)
- memory_search: Still broken (embedding 401)
