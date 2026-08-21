# 1Mind Superhuman Teardown and Augur Build Matrix

Date: 2026-06-04
Task: Apex hub task #193
Scope: research and planning only. No production changes, routing changes, installs, or finance/infra commitments.

## Executive Decision

Augur should not clone 1Mind as another cloud-only enterprise avatar platform. The buildable wedge is a private, owned "Superhuman GTM agent" stack where Augur owns the GTM Brain, the knowledge ingestion pipeline, customer data isolation, guardrails, and workflow orchestration. Face is optional and should be bought or validated through real-time avatar vendors after the voice/waveform agent proves latency, quality, and booking conversion.

The first productized version should be Yahli's Serendipity consulting digital clone under the Ultr8/LBV umbrella: voice plus waveform first, Calendly booking, Serendipity KB and pitch knowledge, and a custom Augur GTM Brain. Tavus should be the primary face validation path, HeyGen LiveAvatar the fallback, and Steno a parallel Path A2 pilot for hosted AI Twin/voice-text workflows rather than the main private brain.

## Source Basis

- Latka x Amanda Kahlow YouTube interview: [$1M in 3 Months Selling AI Agents?](https://youtu.be/lFX0n3uYTkw). Official page did not expose transcript through the browser, but auto-captions were retrieved locally with existing `yt-dlp` for research validation. Treat transcript wording as non-official captions; use metrics directionally unless confirmed in sales material.
- AI to ROI case study: [1mind Superhuman Agents Delivering Go-to-Market Performance](https://ai2roi.substack.com/p/ai-to-roi-case-study-1mind-superhuman).
- Pipecat avatar pattern: [Pipecat Simli video service](https://docs.pipecat.ai/server/services/video/simli) and [Pipecat supported services](https://docs.pipecat.ai/server/services/supported-services).
- AWS reference architecture: [sample-voice-ai-tavus-avatar-demo](https://github.com/aws-samples/sample-voice-ai-tavus-avatar-demo).
- Tavus: [API overview](https://docs.tavus.io/api-reference), [pricing](https://www.tavus.io/pricing), [LLM layer](https://docs.tavus.io/sections/conversational-video-interface/persona/llm), [tool calling](https://docs.tavus.io/sections/conversational-video-interface/persona/llm-tool), [tool-call examples](https://docs.tavus.io/sections/onboarding-guide/tool-calling-examples).
- HeyGen/LiveAvatar: [LiveAvatar overview](https://docs.liveavatar.com/), [LiveAvatar FAQ](https://help.heygen.com/en/articles/12758866-liveavatar-faq), [HeyGen API pricing](https://help.heygen.com/en/articles/10060327-heygen-api-pricing-explained), [HeyGen developer pricing](https://developers.heygen.com/docs/pricing), [interactive sessions](https://developers.heygen.com/docs/interactive-sessions).
- Steno: [Steno docs](https://docs.steno.ai/), [features](https://docs.steno.ai/getting-started/features), [deploy](https://docs.steno.ai/dashboard/deploy), [SDK](https://docs.steno.ai/developers/sdk), [pricing](https://docs.steno.ai/pricing), [data privacy and LLMs](https://docs.steno.ai/security/data-privacy-llms).
- Local stack references: [Ollama OpenAI compatibility](https://docs.ollama.com/openai), [SYSTRAN faster-whisper](https://github.com/SYSTRAN/faster-whisper), [Piper TTS](https://github.com/rhasspy/piper), [Calendly API overview](https://calendly.com/help/calendly-api-overview), [Calendly embed and API](https://help.calendly.com/hc/en-us/articles/31618574740247-Calendly-embed-and-the-API), [Calendly webhooks](https://calendly.com/help/webhooks-overview).

## 1Mind Teardown

1Mind's practical product is not "an avatar." It is a GTM labor substitute packaged as a Superhuman: a customer-facing agent with presence, voice, memory, sales workflows, and tight tool orchestration. The visual face increases perceived human capability, but the defensibility sits in the GTM Brain.

### Commercial Signals

- 1Mind sells enterprise and mid-market B2B, not SMB self-serve. In the Latka interview, 1Mind is framed around enterprise customers, role-based licensing, and ACVs around $100K to $400K.
- The interview reports $1M contracted revenue within roughly three months of selling and 211% NDR. These were verified from auto-captions, but should be treated as interview claims.
- The AI to ROI case study says 1Mind has 65+ enterprise/mid-market customers on year-long contracts and focuses on revenue outcomes: deal cycle compression, ACV growth, and closed/won rates.
- The case study reports examples: HubSpot's Fiona at 88% engagement, +75% free-trial signups, +25% closed/won influence; Pipedrive over 100% visitor-to-trial uplift; Experity 5x deal volume compared with Qualified; Clari/Salesloft replacing Drift with a dedicated Superhuman.
- 1Mind's model is premium, cloud-managed, and enterprise-oriented. That leaves room for Augur to offer a private/owned wedge: lower entry price, owned brain/data, and a consulting-led implementation path.

### Product Layers

1. Presence layer
   - Face, voice, or waveform/mascot. The AI to ROI case study is explicit that face is optional, and notes New Relic using waveform to avoid the perception of replacing human roles.
   - Augur implication: voice/waveform MVP is legitimate, not a compromise. The face tier is packaging and conversion lift, not the core product.

2. GTM Brain
   - AI Context Graph: customer/account memory, content grounding, prior interactions, deal state, and role-specific operating context.
   - Action Orchestration: real-time tool calls, CRM reads/writes, booking, content surfacing, and deterministic guardrails over generative dialogue.
   - Augur implication: self-host this. This is the owned asset and moat.

3. Surfaces
   - Website embed for inbound qualification and booking.
   - In-product assistant for onboarding and adoption.
   - Deal room assistant for buyer education and technical Q&A.
   - Live-call ride-along where a human can control or invoke the Superhuman through a back channel.
   - Augur implication: start with web widget, then add deal-room and live-call controls after single-tenant latency and quality are proven.

4. Human control
   - 1Mind does not merely "let AI talk." It keeps humans in control through deterministic rules and back-channel control for live calls.
   - Augur implication: do not let the first version modify CRM, promise pricing, or book meetings without validated tool outputs and user-visible confirmation.

## What Augur Should Copy

- Copy the category: Superhuman GTM agent as GTM capacity, not a chatbot.
- Copy the layer model: presence + voice + GTM Brain + workflow surfaces.
- Copy the face-optional precedent: waveform is acceptable if the brain works.
- Copy the bottom-of-funnel KPI framing: qualified meetings, booked calls, conversion lift, cycle compression, and revived pipeline.
- Copy the implementation discipline: define success metrics, centralize training content, connect CRM/booking tools, and preserve conversation memory.

## What Augur Should Not Copy

- Do not build multi-tenant infrastructure before a single-tenant agent proves latency, quality, and conversion.
- Do not make face generation the hard dependency.
- Do not depend on a vendor-hosted brain when Augur's differentiation is private/owned intelligence.
- Do not commit to a per-role model tag or fixed model lineup before benchmarking the existing cluster.
- Do not drift into AICSAI finance/infra or duplicate #179/#180. This document references deltas only; no prior #179/#180 artifacts were found locally during this task.

## Build-vs-Buy Matrix

| Component | Decision | Default Stack | Why | Validation Gate |
|---|---:|---|---|---|
| Conversation orchestration | Build | Pipecat | Pipecat already supports modular STT, LLM, TTS, memory, and video services, including HeyGen/Tavus video service integrations. | Working single-tenant pipeline with instrumented turn latency. |
| GTM Brain | Build | Custom Augur GTM Brain | This is the owned IP: context graph, guardrails, workflows, and customer-specific ingestion. | Accurate retrieval and deterministic action policy on Serendipity scenarios. |
| LLM runtime | Build/self-host | BYO-LLM through Ollama/OpenAI-compatible API | Ollama supports OpenAI-compatible chat completions, streaming, JSON mode, and tools. | Benchmark per-role candidates on existing hardware; no committed model tag yet. |
| STT | Build/self-host | faster-whisper | SYSTRAN faster-whisper is optimized through CTranslate2 and supports GPU/CPU modes. | Measure partial/final transcript latency and WER on real prospect audio. |
| TTS | Build/self-host first | Piper or another local TTS behind Pipecat | Local TTS preserves owned/private posture; Piper is fast/local but archived, so treat it as baseline rather than final voice quality. | Naturalness and time-to-first-audio benchmark against cloud fallback. |
| Presence waveform | Build | Web waveform + voice UI | Lowest-risk face-optional first surface; matches New Relic waveform precedent. | User does not confuse it with chat; booking conversion beats static page baseline. |
| Face/avatar | Buy/validate | Tavus primary, HeyGen fallback | Real-time video is specialized and credit/concurrency economics must be tested before ownership. | Side-by-side live demos with the same brain/tool flow. |
| Steno Path A2 | Pilot only | Steno hosted AI Twin | Good hosted twin/voice-text packaging, SDK, memory, and monetization; video avatar is documented as beta. It is not the private-owned default. | Can it export/control enough structure to feed Augur's owned GTM Brain? |
| Booking | Buy | Calendly embed/API/webhooks | Calendly supports embedding the booking flow and webhooks for scheduled/canceled events; API can retrieve scheduling links but not book meetings directly. | Agent offers correct link, confirms intent, and records webhook outcome. |
| CRM connector | Build adapter | Start read-only, then guarded writes | CRM is too central for unguarded LLM actions. | Deterministic schema validation; write tools require explicit confirmation. |
| Knowledge ingestion | Build | `/knowledge/serendipity`, pitch deck, CRM notes | Repeatable onboarding/ingestion is a moat and later productization lever. | Source citations, freshness metadata, and per-customer isolation. |
| Guardrails | Build | Rules engine before/after LLM | Deterministic constraints keep the system sellable. | Red-team tests for pricing, legal, scope, hallucination, and unsafe promises. |
| Analytics | Build light first | Session logs, latency traces, booked-call events | Needed for sales proof and benchmarking. | Turn-level and funnel-level reporting. |

## Face Vendor Scorecard

Scores are 1-5 for Augur's needs, not generic quality.

| Criteria | Tavus CVI | HeyGen LiveAvatar | Steno Path A2 |
|---|---:|---:|---:|
| Real-time video readiness | 5 | 4 | 2 |
| BYO/control path | 4 | 4 | 2 |
| Structured tool-call workflows | 5 | 3 | 2 |
| Calendly/function-calling fit | 5 | 3 | 2 |
| Credit/concurrency visibility | 4 | 3 | 3 |
| Private/owned brain fit | 4 | 4 | 1 |
| White-label GTM packaging | 4 | 4 | 3 |
| Overall Augur fit | 5 | 4 | 2 |

### Tavus CVI

Tavus is the best primary face validation path. Its docs define CVI as an end-to-end real-time video conversation pipeline with persona, replica, and conversation objects. Tavus exposes persona layers for STT, LLM, TTS, perception, custom LLM support, and tool calling. Tool calls produce events for the client/app to execute, which fits Augur's deterministic backend policy. Pricing is also easy to prototype: free minutes, then Starter/Growth tiers with included conversation minutes and concurrency.

Risk: Tavus full pipeline may duplicate Augur's own STT/LLM/TTS stack. Use Tavus in two modes: fast demo with Tavus pipeline, then owned-brain validation using custom LLM/logic or echo-style integration where practical.

### HeyGen LiveAvatar

HeyGen is the fallback face path. LiveAvatar offers FULL mode where it manages ASR/LLM/TTS/WebRTC and LITE mode where Augur provides the AI stack while LiveAvatar handles real-time video streaming. It supports embeddings, sandbox mode, custom WebRTC handling through LiveKit/Agora, and BYO LLM/TTS in the LiveAvatar docs. Credit math is less clean because LiveAvatar credits are separate from HeyGen API credits, and FULL/LITE consume different credits per minute.

Risk: HeyGen's broader developer docs emphasize generated video and interactive video-agent sessions, while LiveAvatar is its distinct real-time product. Keep tests strictly on LiveAvatar, not scripted video generation.

### Steno Path A2

Steno is worth a parallel Path A2 pilot if the goal is to learn hosted twin packaging, user memory, monetization, and SDK ergonomics. Steno offers custom AI Twins, real-time voice and text, user memory, knowledge-base control, deploy via custom domain or embedded widget, and SDK hooks for voice/text chat. It also publishes subscription plans from $500/month upward and a privacy posture around customer separation.

Risk: Steno's real-time video avatar is documented as "currently in development beta." It is also a hosted AI Twin platform, so it conflicts with the private/owned GTM Brain direction unless it can export structured data and accept enough control from Augur.

## Recommended Augur Architecture

```
Browser widget / call surface
  -> WebRTC/audio transport
  -> Pipecat pipeline
      -> VAD / turn manager
      -> faster-whisper STT
      -> Augur GTM Brain
          -> context graph retrieval
          -> persona policy: Yahli
          -> deterministic guardrails
          -> tool router: Calendly, CRM, knowledge, handoff
          -> Ollama-hosted role model
      -> local TTS
      -> waveform UI
      -> optional face adapter: Tavus / HeyGen / Steno A2
  -> observability: latency, transcripts, tool calls, outcomes
```

## Immediate Build Principles

- Treat Yahli as the product persona and Serendipity consulting as the first offer.
- Keep the first MVP single-tenant and private.
- Use waveform/voice to prove usefulness before face.
- Make Calendly booking the first write-like action because it is externally observable and low-risk when implemented through link/embed plus webhook confirmation.
- Keep CRM writes behind confirmation until guardrails pass.
- Make ingestion repeatable from day one: every customer has isolated KB, source map, freshness metadata, persona policy, and red-team pack.

## Unverified or Source-Gap Claims

- Handoff #84, #179, and #180 were not found in local workspace files. The accepted direction from #84 was used because it was included in this task brief.
- The YouTube interview metrics were validated against locally retrieved auto-captions, not an official transcript. Use the YouTube link as the source and verify before quoting in external sales collateral.
- Exact Tavus/HeyGen/Steno real-world latency, concurrency behavior, and credit burn were not measured. They require live account testing.
- No benchmark results are predicted here. The implementation plan defines how to measure them on existing cluster hardware.
