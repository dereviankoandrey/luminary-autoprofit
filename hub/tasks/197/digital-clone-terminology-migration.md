# Digital Clone Terminology Migration

Date: 2026-06-06
Task: MemoryHub #197

## Scope Completed

Applied the D77 naming rule to the local Augur #193 deliverables:

- `research-1mind-superhuman.md`
- `augur-implementation-plan.md`
- `augur-product-brief.md`

The legacy person-presence wording was changed from Yahli as a "digital twin" to Yahli's "digital clone." Architecture and role sequencing were not changed: seller-first remains the first path, interviewer remains gated behind Serendipity Phase 2 maturity and latency validation.

## Intentional Exceptions

The remaining "AI Twin" references are Steno vendor/product terminology. They describe Steno's hosted product category and are not Augur's name for Yahli's person-presence layer.

The "Edge Twin" term is also intentionally preserved wherever it refers to the ExO / Serendipity organizational twin concept, per D77.

## Deferred Plan Update

The canonical Serendipity business plan v3.3 was not edited in place. Task #197 says that the plan portion likely folds into the v3.4 cycle (#195) under the established DRAFT -> review -> canonical process. The required v3.4 plan migration targets remain:

- Executive Summary Founder Twin paragraph
- Section 7 readiness block
- Section 8 Layer 1 founder-attention lines
- Section 11 sales motion
- Section 12 slide 7
- Appendix A Working Assumption 3
- Header changelog disambiguation line

## Verification

`rg` over the #193 deliverables now shows no remaining "Founder Twin", "Yahli-twin", "twin-as-seller", "twin-as-interviewer", "seller-twin", or person-presence "digital twin" usage. Remaining twin terms are vendor or organizational-concept exceptions.
