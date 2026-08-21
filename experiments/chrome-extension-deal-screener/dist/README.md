# Chrome Extension Deal Screener

**Version:** 0.1.0  
**Status:** Build complete, ready for publishing  
**Capital Required:** $5 (Chrome Web Store one-time fee)  
**Build Time:** ~4 hours total  
**Server Costs:** $0  

---

## What It Does

A Chrome extension that overlays a deterministic **Deal Score** on property listings across Zillow and Redfin. Users see GO/NO-GO recommendations based on pure math — no LLMs, no black boxes.

### On Any Property Listing Page:
- **Badge overlay** on each listing card (✓ GO / ✗ NO-GO / ? REVIEW)
- **Draggable detail panel** with SVG score ring, cap rate, cash-on-cash return, annual NOI
- **Color-coded risk indicators** (green/yellow/red thresholds)
- **Works with infinite scroll** — MutationObserver re-scans as new listings load

### User Flow:
1. Install extension from Chrome Web Store
2. Browse Zillow or Redfin property listings
3. Instant GO/NO-GO badges appear on each card
4. Click any badge → detailed analysis panel opens
5. First-time user prompted for email (optional) to save deals and export reports

---

## Architecture

```
┌─────────────────────────────────────────────┐
│  Browser Tab: Zillow / Redfin               │
├─────────────────────────────────────────────┤
│  Content Script (overlay.js)                │
│    ├── DOM scraping (Zillow/Redfin selectors)│
│    ├── Engine integration                    │
│    └── UI overlay + drag interaction        │
├─────────────────────────────────────────────┤
│  Underwriting Engine (engine.js)            │
│    ├── Fix & Flip analysis                  │
│    ├── Multifamily analysis                 │
│    └── Development analysis                 │
├─────────────────────────────────────────────┤
│  Email Capture (email-capture.js)           │
│    ├── localStorage state management        │
│    ├── Modal UI with value-first messaging  │
│    └── Deal storage + export               │
└─────────────────────────────────────────────┘
```

**All processing is client-side.** No server, no API calls, no third-party services required.

---

## File Structure

| File | Size | Purpose |
|------|------|---------|
| `manifest.json` | 603 B | Manifest V3 config, permissions, content script registration |
| `engine.js` | 20 KB | Ported underwriting engine (6/6 parity with Python) |
| `overlay.js` | 19.7 KB | Content script: DOM scraping, badge overlay, detail panel, MutationObserver |
| `overlay.css` | 4.2 KB | Styling for badges, panels, score rings, animations |
| `email-capture.js` | 10.9 KB | Email capture modal, deal storage, export functionality |
| `demo.html` | 12.4 KB | Self-contained demo with simulated listings and email capture flow |

**Total:** ~68 KB — lightweight, fast-loading extension.

---

## Installation (Local Testing)

1. Open Chrome → `chrome://extensions/`
2. Enable **Developer mode** (top right toggle)
3. Click **"Load unpacked"**
4. Select the `src/` directory
5. Navigate to zillow.com or redfin.com — badges should appear on listing cards

---

## Publishing to Chrome Web Store

1. Create a Google account (or use existing)
2. Pay **$5 one-time** developer registration fee at [chrome.google.com/webstore/devconsole](https://chrome.google.com/webstore/devconsole)
3. Click **"New Item"** → Upload the `src/` directory as a ZIP file
4. Fill in store listing:
   - **Title:** Deal Screener — Real Estate Underwriting
   - **Description:** See instant GO/NO-GO deal scores on Zillow and Redfin listings. Pure math underwriting — no LLMs, no black boxes.
   - **Category:** Productivity
   - **Screenshots:** Use demo.html rendered views (or take screenshots from local testing)
5. Submit for review (typically 1-3 business days)

---

## Monetization Path

### Phase 1: Free Extension → Email Capture ✅ Built
- Users get instant deal analysis on any listing page
- First-time modal asks for email in exchange for saving deals + export features
- Local storage handles all persistence — no backend needed yet

### Phase 2: Pro Tier ($9/mo) 📋 Planned
- Deeper analysis (comps, neighborhood trends, historical data)
- Unlimited saved deals with cloud sync
- Export to PDF with professional formatting
- Alert system for new deals matching criteria

### Phase 3: DD Reports Upsell Pipeline 📋 Planned
- When users identify a deal worth pursuing, extension offers professional due diligence reports
- Integrates with existing DD Reports pipeline (already built)
- $197–$497 per report conversion opportunity

---

## Analytics & Tracking

Currently tracks via `localStorage`:
- `deal_screener_email` — captured email address
- `deal_sreener_captured_v1` — whether email has been captured
- `deal_screener_deals` — array of analyzed deals (max 200)

**Production analytics hook:** Replace localStorage with API calls to your backend:
```javascript
// In email-capture.js, replace setCaptured():
async function setCaptured(email) {
  await fetch('/api/capture', { method: 'POST', body: JSON.stringify({ email }) });
  localStorage.setItem(STORAGE_KEY, email);
}

// Track deal analysis events:
function trackAnalysis(listing, result) {
  fetch('/api/analysis', { 
    method: 'POST', 
    body: JSON.stringify({ listing, score: result.deal_score, rec: result.recommendation })
  });
}
```

---

## Technical Notes

- **Manifest V3** — Uses modern Chrome extension API
- **Zero dependencies** — Pure vanilla JS, no frameworks
- **Cross-platform selectors** — Handles Zillow and Redfin DOM structures separately
- **Performance:** Lightweight — ~20KB total JS, instant load time
- **Privacy-first:** All data stored locally by default. No telemetry, no tracking without consent.

---

## Validation

- **Engine parity test:** 6/6 tests pass (matches Python engine output exactly)
- **Syntax validation:** All JS files pass `node -c` lint check
- **Demo tested:** Self-contained demo.html works in any modern browser

---

**Built by Luminary Underwriting Engine team.**  
*Deterministic underwriting. Zero LLMs. Fully auditable.*
