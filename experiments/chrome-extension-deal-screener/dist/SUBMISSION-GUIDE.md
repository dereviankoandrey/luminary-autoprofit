# Chrome Web Store Submission Guide — Deal Screener v0.1.0

**Estimated time to complete:** 15–20 minutes  
**Cost:** $5 one-time (Google Play Developer registration)  
**Review timeline:** Typically 1–3 business days  

---

## Step 1: Google Developer Account ($5)

1. Go to **[chrome.google.com/webstore/devconsole](https://chrome.google.com/webstore/devconsole)**
2. Sign in with your Google account (or create one — use your existing Gmail)
3. Click **"Register"** as a publisher
4. Pay **$5** via credit card (one-time fee, no recurring charges)
5. Complete identity verification if prompted

> **Note:** If you already have a Google Play Developer account ($25), you can publish Chrome extensions from there too — same dashboard, no additional fee.

---

## Step 2: Prepare the Extension Package

1. Navigate to your extension directory: `experiments/chrome-extension-deal-screener/src/`
2. Select **all 6 files** in that folder:
   - `manifest.json` (603 B)
   - `engine.js` (20 KB)
   - `overlay.css` (4.2 KB)
   - `overlay.js` (19.7 KB)
   - `email-capture.js` (10.9 KB)
   - `demo.html` (12.4 KB — included for reference, not required by store)

3. **ZIP the files together** (not the parent folder):
   ```bash
   cd experiments/chrome-extension-deal-screener/src/
   zip ../deal-screener-v0.1.0.zip *.json *.js *.css
   # or manually: select all 6 files → right-click → Send to → Compressed (zipped) folder
   ```

4. Verify the ZIP contains the files directly (not a nested folder). The manifest.json must be at the root of the ZIP.

---

## Step 3: Create New Item in Chrome Web Store

1. Go to **[chrome.google.com/webstore/devconsole](https://chrome.google.com/webstore/devconsole)**
2. Click **"New Item"** (top right)
3. Upload your `deal-screener-v0.1.0.zip` file

---

## Step 4: Fill in Store Listing Details

### Basic Info Tab

| Field | Value |
|-------|-------|
| **Name** | Deal Screener — Real Estate Underwriting |
| **Description** (short) | Instant GO/NO-GO deal scores on Zillow & Redfin. Pure math underwriting — no LLMs, no black boxes. |
| **Category** | Productivity → Finance & Money |

### Detailed Description Tab

Copy the full description from `marketing/store-listing.md`. Here's a ready-to-paste version:

```
See every deal's true value before you click "Schedule a Tour."

Deal Screener overlays real-time GO/NO-GO analysis directly on Zillow and Redfin property listings. It runs pure underwriting math — cap rates, cash-on-cash returns, NOI projections — right in your browser. No APIs. No subscriptions. No LLM hallucinations.

HOW IT WORKS
1. Install the free extension
2. Browse any Zillow or Redfin search page
3. Instant green/red badges appear on every listing card
4. Click a badge to see detailed metrics: deal score, cap rate, cash-on-cash return, risk level
5. Save your analyzed deals and export reports

WHY DETERMINISTIC MATTERS
When you're evaluating a $500K multifamily property, "probably good" isn't enough. Deal Screener uses the same underwriting math professional investors use — but makes it instant and accessible to anyone browsing listings.

• Cap Rate Analysis — Is the property priced above market?
• Cash-on-Cash Return — What's your actual annual return on invested capital?
• Deal Score (0–100) — Quick visual assessment of overall deal quality
• Risk Level Classification — Low / Medium / High based on threshold analysis

BUILT FOR SERIOUS INVESTORS
Whether you're a first-time multifamily buyer or a seasoned developer scanning markets, Deal Screener removes the guesswork from initial deal screening. No more opening 20 tabs to run numbers in spreadsheets.

The extension works with:
• Zillow search results and map view listings
• Redfin search results and listing pages
• Dynamic page updates (infinite scroll supported)

FREE FOREVER — NO SERVER, NO TRACKING
All analysis runs locally in your browser. Your property data never leaves your machine. We don't track you, we don't sell your data, and we don't need an account to use it.

Deal Screener. Math only. No LLMs. Fully auditable.
```

### Rating & Privacy Tab

| Field | Value |
|-------|-------|
| **Rating** | Everyone (no age restrictions) |
| **Privacy Policy URL** | See Step 5 below |
| **Data Safety** | Select: "No data collected" — all processing is client-side, no network requests |

### Tags Tab

Enter these tags (comma-separated):
```
real estate, investment, underwriting, deal analysis, zillow, redfin, multifamily, cash flow, cap rate, property investor, screener
```

---

## Step 5: Privacy Policy (Required)

Chrome Web Store requires a privacy policy URL. Two options:

### Option A: Host on GitHub Pages (recommended, free)
1. Create a new public GitHub repo called `deal-screener-privacy`
2. Add an `index.html` file with the privacy policy content below
3. Enable GitHub Pages in repository settings → Branch: main, Folder: root
4. Your URL will be: `https://<username>.github.io/deal-screener-privacy/`

### Privacy Policy Content (for index.html):
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Deal Screener — Privacy Policy</title>
  <style>body{font-family:system-ui;max-width:600px;margin:40px auto;padding:0 20px;line-height:1.6}</style>
</head>
<body>
<h1>Deal Screener Privacy Policy</h1>
<p><strong>Last updated:</strong> July 16, 2026</p>

<h2>Data Collection</h2>
<p>Deal Screener does not collect, transmit, or store any personal data. All analysis runs entirely within your browser using local JavaScript execution.</p>

<h2>Local Storage</h2>
<p>The extension uses browser localStorage only to save your optional email address (if you choose to provide it for deal saving/export features) and your saved deals list. This data never leaves your device.</p>

<h2>No Network Requests</h2>
<p>Deal Screener makes zero network requests beyond loading property data from Zillow or Redfin (which is initiated by the browser, not the extension). No analytics, no tracking, no telemetry of any kind.</p>

<h2>Contact</h2>
<p>For privacy-related questions: <a href="mailto:andrey@aicsai.com">andrey@aicsai.com</a></p>
</body>
</html>
```

### Option B: Use a simple hosted page
If you have any existing website or hosting, create a single HTML file and point to it. The policy content above is all that's required — this extension collects no data by design.

---

## Step 6: Screenshots (Required — at least one)

Take screenshots of the extension in action:

1. **Open demo.html** in your browser (`experiments/chrome-extension-deal-screener/src/demo.html`)
2. Navigate to a Zillow or Redfin listing page after loading the extension locally
3. Capture these views (recommended sizes):
   - **Screenshot 1:** Extension overlay with badges on Zillow search results (1280×800 recommended)
   - **Screenshot 2:** Detail panel open showing score ring and metrics (1280×800 recommended)
   - **Screenshot 3:** Email capture modal (if applicable, 1280×800 recommended)

> If you don't have a browser installed for screenshots right now, the demo.html file is self-contained — open it in any browser and take screenshots from there. The demo simulates listing cards with analysis results.

---

## Step 7: Promoted Graphics (Optional but Recommended)

- **Promo Image (1400×560):** Banner image for your store page
- **Feature Graphic (300×65):** Small header graphic
- These are optional — the extension will still publish without them, but they increase credibility

---

## Step 8: Submit for Review

1. Click **"Submit for Review"** in the top right corner
2. Fill out any remaining required fields
3. Confirm your submission
4. Wait for approval (typically 1–3 business days)

You'll receive an email notification when your extension is published or if revisions are needed.

---

## Post-Publishing Checklist

- [ ] Extension approved and live on Chrome Web Store
- [ ] Test the installed extension from a different browser/profile to confirm it works for new users
- [ ] Share the Chrome Web Store link in the LinkedIn post (draft available at `vault/shared/dd-reports/linkedin-launch-chrome-extension-2026-07-15.md`)
- [ ] Add store URL to any future marketing materials

---

## Troubleshooting

**"Your ZIP file is not valid"** — Make sure manifest.json is at the root of the ZIP, not inside a subfolder. The ZIP should contain the files directly, not `src/manifest.json` but just `manifest.json`.

**"Manifest version must be 2 or 3"** — Our manifest uses V3 (correct for modern Chrome). If you get this error, verify your manifest.json starts with `"manifest_version": 3`.

**Extension doesn't appear on Zillow/Redfin** — After publishing, users need to visit the Chrome Web Store page and click "Add to Chrome" from there. Simply having it installed locally won't work for store distribution.

---

**Total estimated time: 15–20 minutes**  
**One-time effort. Extension then distributes autonomously.**
