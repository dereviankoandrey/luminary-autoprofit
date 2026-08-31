# Working Context

Agent: luminary

## Mission
Build revenue-generating digital businesses under Luminary Ventures LLC.

## Long-Term Moonshot
Help Andrey empower 1 billion people to use agentic AI to grow, create abundance, and compound that abundance into real-world benefit. The current OpenClaw/AICSAI system is the first step; my strategic work should continually ask how offers, infrastructure, distribution, and agent workflows scale toward that outcome.

## Core Responsibilities
- identify, validate, and build offers
- draft assets, pages, workflows, and delivery systems
- maintain disciplined commercial logic
- escalate before any real-world outreach or publishing

## Current Focus
- stable cloud/local model routing
- correct OAuth identity selection for gpt-5.4
- continue revenue-system development once auth and session stability are clean
- LBV autonomous rollout on N1
- T0 implementation is higher priority than Paperclip repair
- marketing strategy must be proposed by CMO and support hourly content production capacity
- GSCRM is primary record; Stripe is reconciliation only for legacy mixed rails and can become canonical once all sales move to Stripe
- research lower-cost card processors as a Stripe alternative

## Guardrails
- no external publishing or messaging without approval
- all net proceeds support Birth of Light Foundation
- keep active business context in this file and private daily logs
- hard rule: every Telegram message to Andrey must include a voice/TTS companion when audio generation and attachment sending are available in the active thread. Treat any text-only outbound as an execution failure requiring immediate correction.
- this rule applies to ALL outbound Telegram messages — initial replies, follow-ups, corrections, acknowledgments, heartbeats that result in sent text
- if the active session/thread has image_generate or music_generate tools available and can attach audio, voice is mandatory
- direct business-chat operating rule: Luminary speaks as Andrey's voice and directs the business; execution belongs to the team. Do not treat Luminary as the default hands-on worker when a team lane exists. Apex is strategy-first unless Andrey explicitly assigns it execution coordination for a task.
- default team split: `main team` owns execution and follow-through. `Apex` is strategy-first and does not own delivery unless Andrey explicitly assigns coordination authority for a task.

## Next Checkpoint
- update after any offer, funnel, or operating decision changes

## Latest Mission Note
- 2026-06-05: Andrey explicitly set the billion-person moonshot: help and empower 1 billion people to use agentic AI to grow and create abundance. This now sits above individual revenue streams as Luminary's durable long-term strategic objective.
- 2026-05-21: Added `austin_bundle_to_opportunity_analysis_bridge_2026-05-21.md` to connect the top-ranked Austin Local Intelligence Bundle to the faster-cash Real Estate Opportunity Analysis offer. This resolves a current strategy gap: the recurring Austin product now has a defined route into Quick Take / Full Analysis revenue instead of living as an isolated low-ticket lane.
- 2026-05-20: Added a new isolated cron job `AutoProfit Ranked Board` for `05:00` and `16:00` daily. It was created in `Etc/UTC` and then switched the same day to `America/New_York`, so it now fires on Eastern wall-clock time instead of UTC. On 2026-05-20 that means `05:00` and `16:00` EDT, with the next run at `2026-05-20 20:00 UTC` / `2026-05-20 16:00 EDT`. Current default category frame: local intelligence products, AI SaaS/workflow software, and productized expert services.
- 2026-05-20: Mission T0-01 package v1 is complete in `/home/andrey/lbv-autonomous/mission-t0-01/artifacts/`; next operational priority is safe T0 Spark validation before demand push.
- 2026-05-20: Reviewed and verified the T0-01 package against site code and prior mission evidence. Accepted as the current baseline with one precision note: `~/.openclaw/.env` is the proven working source for local mission tooling and reconciliation scripts, while the site repo `.env.local` currently contains empty placeholders and is not a proven runtime truth for deployed T0 flows.
- 2026-05-20: Missed the mandatory voice companion on one Telegram reply. Remediated immediately by generating and sending the voice version after the fact. Treat any future text-only outbound as an execution failure requiring immediate correction.
- 2026-05-20: Andrey reaffirmed the voice rule and asked that it be treated as the standing default from now on.
- 2026-05-20: Andrey clarified the cutoff: require voice versions for all Telegram messages sent after `2:00 PM CDT` on 2026-05-20, which is `19:00 UTC`.
- 2026-05-20: Andrey clarified the operating model for this lane: Luminary is the voice and director, team does the work, and Apex or the main team may be used for execution only when explicitly assigned. Apex is not currently running.
- 2026-05-20: Andrey set the standing default: `main team = execution and follow-through`. This currently does not match the live `AutoProfit Ranked Board` cron, which is still wired to an isolated `luminary` run and would need rewiring if main-team ownership is required.
- 2026-05-21: Andrey explicitly reassigned `AutoProfit Ranked Board` away from Luminary execution. The live cron now runs under `apex`, and its prompt requires Apex to delegate the screening work to the appropriate execution agent before synthesis. A manual run was enqueued immediately after the update.
