# Chrome Extension Deal Screener — Architecture Spec
**Date:** 2026-07-14  
**Status:** Spec only (not yet built)  
**Capital Required:** $0 (free Chrome Web Store publishing)

## Concept
A free Chrome extension that overlays a "Deal Score" on Zillow/Redfin/FBZ property listings. Users see:
- Cash-on-cash return estimate (based on listing price + local cap rates)
- GO / NO-GO decision from our underwriting engine
- Quick comparison vs. neighborhood average

## Why This Works Tonight
1. **Proven pattern:** IndieHackers features Chrome extensions as fastest path to 5-figure MRR
2. **Zero capital:** Free publishing, no server costs if client-side only
3. **Autonomous build:** Underwriting engine already exists in Python; can be ported to JS/WASM or called via lightweight API
4. **Distribution built-in:** Users share extensions organically; "I found a 18% return deal on Zillow" is viral by nature
5. **Funnel to paid:** Free extension → email capture → DD Reports upsell

## Architecture Options (Fastest to Slowest)
| Option | Build Time | Cost | Complexity |
|--------|-----------|------|------------|
| A: Pure client-side JS port of engine | 2-4 hours | $0 | Medium |
| B: Lightweight API + manifest v3 extension | 1 hour | $0 (Streamlit Cloud free) | Low |
| C: Full React-based overlay | 8+ hours | $0 | High |

**Recommendation:** Option A. Port the deterministic math from `underwriting_mvp.py` to vanilla JS. No server needed. Users get instant results on any listing page.

## Key Technical Notes
- Underwriting engine uses pure math: cap rate, cash-on-cash, NOI, GRM — all derivable from listing data
- Zillow/Redfin/FBZ have consistent DOM structures that can be scraped client-side
- No API keys needed for basic property data (it's already on the page)
- Extension manifest v3 is straightforward

## Monetization Path
1. **Phase 1:** Free extension → email capture on first analysis → build list
2. **Phase 2:** "Pro" tier ($9/mo) — deeper analysis, multiple properties, export reports
3. **Phase 3:** DD Reports upsell for investors who want professional due diligence

## Validation Metric
Install count + email captures in first 7 days. Target: 50 installs, 10 email captures = signal to proceed with Phase 2.

## Blockers
- None autonomously resolvable. Engine porting requires coding agent work (doable).
- Chrome Web Store review takes 1-3 days but costs nothing.
