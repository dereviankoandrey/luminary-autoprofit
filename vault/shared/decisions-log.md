# Decisions Log

## 2026-04-09
- Standardized local model inventory across agents.
- Jedai primary model set to openai-codex/gpt-5.4 with local fallbacks.
- Luminary auth issues traced to empty/stale auth stores and repaired.
- Adopted layered memory workflow inspired by Obsidian-style vault structure.

## 2026-04-10
- Added per-agent private working context and mistake logs.
- Recorded cross-agent operational lesson: always verify active path, auth state, model registry, and live session state separately.
- Recorded cross-agent operational lesson: stale sessions can preserve old auth or model behavior after config changes.

## 2026-05-20
- Mission T0-01 package set T0 Spark validation and provisioning ahead of marketing, customer follow-up, payment-rail research, and any Paperclip repair; GSCRM remains canonical and Stripe remains reconciliation for mixed rails.
- Operating rule for Luminary in direct business chat: Luminary is Andrey's voice and business director, not the hands-on delivery team. Team agents do execution work. Apex remains strategy/ideation by default unless Andrey explicitly assigns it coordination authority for a task.
- Default operating split refined: `main team` owns execution and follow-through by default; `Apex` remains strategy-only unless explicitly assigned coordination authority; `Luminary` remains Andrey's voice and business direction layer.
- Voice delivery rule hardened: every Telegram message to Andrey must include a voice/TTS companion whenever tooling supports audio generation and attachment sending. Treat any text-only outbound as an execution failure requiring immediate correction.
- Voice delivery cutoff clarified: the hard rule applies to all Telegram messages sent on or after `2026-05-20 14:00 CDT` (`2026-05-20 19:00 UTC`).
- `AutoProfit Ranked Board` received an explicit exception to the default split on 2026-05-21: `Apex` now owns coordination for that cron and must delegate execution to the appropriate worker before returning the ranked board.

## 2026-06-04
- Switched OpenClaw local-primary model routing from `ollama/gemma4:26b` to `ollama/qwen3.6:35b-a3b-q8_0`; Apex is also primary on Qwen 35B A3B, while Luminary remains cloud-primary.

## 2026-06-05
- Andrey set the long-term moonshot for Luminary and the broader system: help and empower 1 billion people to use agentic AI to grow and create abundance. Treat OpenClaw/AICSAI as the first step toward scaling that mission.
- Created the daily `Moonshot Morning Research` cron at 5:00 AM America/New_York to research three goals: sell/partially exit real estate to free time and capital, make TriTrack real globally, and empower 1B people with agentic AI.
- Overnight Employee (this session) created `Moonshot Roadmap` in `vault/shared/moonshot-roadmap.md`: phased strategic plan across three pillars (Real Estate Exit, TriTrack Global, 1B Agentic AI), with weekly review cadence. This is now the canonical execution plan all agents can reference.

## 2026-06-10
- **DD Reports production pipeline completed autonomously.** Intake form template (`dd-intake-form-template.md`) and launch-readiness checklist (`dd-launch-readiness.md`) created. Product is now fully ready on the autonomous side — only needs landing page deployment + Stripe setup (~45 min human effort).

## 2026-06-12
- **Deal Analysis Suite bundle outreach draft v1 created** (`vault/shared/dd-reports/deal-analysis-suite-outreach-draft-v1.md`). Positions all 3 revenue lanes (Underwriting SaaS, DD Reports, Permit Velocity Monitor) as one cohesive workflow offering. Bundle pricing recommended over per-tool because investors buy workflows, not tools.
- **No new opportunity categories found.** All existing lanes cover the highest-leverage archetypes. Distribution remains the single binding constraint across all 3 revenue paths.

## Rule
Log decisions, not raw activity.

## 2026-06-08
- **Agent-Powered Due Diligence Reports validated as a real product lane.** Two sample reports (multifamily acquisition and fix-and-flip development) produced autonomously. Output quality confirmed as investor-grade: multi-scenario pro formas, market context from live data sources, risk tiering, due diligence checklists, and correct identification of when deals don't pencil. Commercial pricing at $197–$497/report is viable. Bottleneck remains distribution (Andrey's warm network access for first buyers). Samples stored in `vault/shared/dd-reports/`.
