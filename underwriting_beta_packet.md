# AI Underwriting SaaS — Beta Packet

## Positioning
Fast first-pass deal screening for small operators, lenders, and lean acquisition teams.

The product is not trying to replace full underwriting. It helps kill weak deals earlier by returning a fast **GO / REVIEW / NO-GO** recommendation with metrics, red flags, green flags, and a short explanation.

## Core Promise
- screen inbound deals in minutes instead of burning analyst time on every file
- apply a more consistent first-pass standard across deals
- surface why a deal passed, failed, or needs deeper review
- give operators something they can react to before building a full model

## Beta Offer
- Free beta: up to 3 deal screens per month
- Paid beta hypothesis: $197/month self-serve
- Team beta hypothesis: $497/month for up to 3 users with a tighter feedback loop

## Best Fit
- small multifamily operators
- private lenders and debt brokers
- lean GP / syndicator teams
- fix-and-flip operators with recurring inbound opportunities

## Proof Available Now
- Working app: `underwriting_streamlit_app.py`
- Underwriting engine: `memory/underwriting_mvp.py`
- Engine validation: 6/6 built-in cases pass
- Buyer-visible sample output: `memory/underwriting_beta_demo_output_v1.md`
- Live UI screenshots captured on 2026-05-22:
  - `artifacts/underwriting-ui-2026-05-22/01-home-screen.png`
  - `artifacts/underwriting-ui-2026-05-22/02-fix-flip-go.png`
  - `artifacts/underwriting-ui-2026-05-22/03-multifamily-go.png`
  - `artifacts/underwriting-ui-2026-05-22/04-weak-deal-no-go.png`
- Validation notes:
  - `underwriting_ui_smoke_test_2026-05-22.md`
  - `underwriting_screenshot_pack_2026-05-22.md`

## What To Show In A Demo
1. Start on the home screen to frame this as first-pass screening, not a full IC memo.
2. Open a strong sample deal and show the recommendation state plus core metrics.
3. Open a weak sample and show how the tool surfaces the failure clearly.
4. Point to the sample written report for what a shareable output can look like.
5. Ask whether this would save time in the prospect's current workflow.

## Suggested 15-Minute Demo Flow
1. Ask how many deals they screen per month and where they lose time today.
2. Show one strong deal result.
3. Show one weak deal result.
4. Ask whether speed, consistency, or explainability matters most.
5. Close with whether they would test it on a real deal from their pipeline.

## Qualification Questions
1. How many deals do you screen per month?
2. What gets rejected fastest today?
3. How much analyst time is wasted on obvious no-go deals?
4. Would a first-pass screen help you move faster or just create noise?
5. If the outputs stayed reliable, would this become weekly workflow?

## Validation Standard
A beta user counts as validated if they say yes to at least 2 of these:
1. This would save me time.
2. I would use it at least weekly.
3. I would want repeat use or team access.
4. I would pay for this if outputs stay reliable.

## Recommended Ask
Use a simple CTA:

> I built a lightweight underwriting tool that gives a quick GO / REVIEW / NO-GO before full analysis. I want blunt feedback from a few operators and lenders. Open to a 15-minute walkthrough and reaction?

## Current Best Next Step
Use this packet with the screenshot pack and sample report to recruit the first 3-5 warm beta conversations. The main blocker is no longer proof generation. It is now selecting real candidate names and getting the first live reactions.
