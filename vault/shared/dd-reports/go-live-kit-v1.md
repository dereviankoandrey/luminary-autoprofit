# Go-Live Kit — Deal Analysis Suite

**Created:** 2026-06-13  
**Status:** Ready for Andrey execution  
**Total estimated time to go live: ~55 minutes** (one-time setup, then fully autonomous)

---

## Overview

This kit consolidates every remaining human action needed to launch all three revenue lanes. Products are production-ready on every autonomous dimension. All that's left is infrastructure setup + warm network outreach.

| Lane | Autonomous? | Human Action Needed | Time |
|------|------------|---------------------|------|
| Underwriting SaaS | ✅ Complete (6/6 tests pass) | Deploy to Streamlit Cloud / Render | ~10 min |
| DD Reports | ✅ Complete (3 samples validated) | Setup Stripe + deploy landing page | ~45 min |
| Permit Velocity Monitor | ✅ Sample produced | Wait until July 9 (summer hold confirmed) | N/A |

---

## Step 1 — Deploy Underwriting SaaS (~10 minutes)

### Option A: Streamlit Community Cloud (Fastest)

1. Go to [github.com/new](https://github.com/new) — create a new private or public repo
   - Name it something like `deal-underwriter` or `real-estate-underwriting-tool`
   - Description: "AI-Powered Real Estate Underwriting — Deal Screening Tool"
2. Upload these 4 files from `/underwriting_deploy/`:
   - `underwriting_streamlit_app.py`
   - `underwriting_mvp.py`
   - `requirements.txt`
   - `README.md`
3. Go to [streamlit.io/cloud](https://streamlit.io/cloud) and sign in with GitHub
4. Click "Deploy from GitHub" → find your repo → Deploy
5. Streamlit auto-detects the entry point. **That's it.** You'll get a URL like `https://deal-underwriter-xyz.streamlit.app`

### Option B: Render (More control)

1. Same Step 1 — create GitHub repo with the 4 files above
2. Go to [dashboard.render.com](https://dashboard.render.com) → New Web Service
3. Connect GitHub → select your repo
4. Settings:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `streamlit run underwriting_streamlit_app.py --server.port $PORT --server.address 0.0.0.0`
5. Deploy!

**Result:** Live underwriting tool accessible via URL. First revenue lane operational.

---

## Step 2 — Setup Stripe Payment Links (~15 minutes)

Go to [dashboard.stripe.com](https://dashboard.stripe.com):

1. If not already set up, create an account (takes ~2 min with bank details)
2. Go to **Payment links** → **Create payment link**
3. Create these 3 links:

   ### DD Reports — Basic ($197)
   - Product name: "DD Report — Basic"
   - Price: One-time $197
   - Description: "AI-powered due diligence report for one deal (fix-and-flip, small multifamily, or development). 8-section investor-grade analysis with scenario modeling and risk assessment."

   ### DD Reports — Standard ($297)
   - Product name: "DD Report — Standard"
   - Price: One-time $297
   - Description: "AI-powered due diligence for up to 3 deals simultaneously. Includes all 8 report sections with scenario analysis and prioritized action items."

   ### DD Reports — Premium ($497)
   - Product name: "DD Report — Premium"
   - Price: One-time $497
   - Description: "AI-powered due diligence for up to 10 deals + priority turnaround. Includes quarterly pricing summary sheet and 24-hour delivery."

4. For each link, set redirect URL (temporary): `https://yourname.github.io/thank-you` or just leave as default
5. **Copy the Stripe payment link URLs** — you'll embed these in the landing page

---

## Step 3 — Deploy Landing Page (~20 minutes)

### Option A: GitHub Pages (Free, fastest)

1. Go to [github.com/new](https://github.com/new), create a new repo named `yourusername.github.io`
   - OR: fork the existing `dd-reports-landing-page` repo if you have one
2. Clone it locally or create via GitHub UI
3. Create `index.html` with this content:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI-Powered Due Diligence Reports | Real Estate Deal Analysis</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a1a; background: #fafafa; }
    .container { max-width: 800px; margin: 0 auto; padding: 40px 20px; }
    h1 { font-size: 2.5rem; margin-bottom: 0.5rem; color: #0a0a0a; }
    .subheadline { font-size: 1.25rem; color: #555; margin-bottom: 40px; }
    .section { margin: 40px 0; }
    h2 { font-size: 1.5rem; margin-bottom: 16px; }
    ul { margin-left: 20px; margin-bottom: 20px; }
    li { margin-bottom: 8px; }
    .pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-top: 20px; }
    .pricing-card { background: white; border: 1px solid #e5e5e5; border-radius: 8px; padding: 24px; text-align: center; }
    .pricing-card h3 { font-size: 1.25rem; margin-bottom: 8px; }
    .price { font-size: 2rem; font-weight: 700; margin: 12px 0; }
    .btn { display: inline-block; background: #635bff; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 500; margin-top: 12px; }
    .btn:hover { background: #4f46c5; }
    .steps { counter-reset: step; list-style: none; margin-left: 0; }
    .steps li { counter-increment: step; padding-left: 40px; position: relative; margin-bottom: 16px; }
    .steps li::before { content: counter(step); position: absolute; left: 0; top: 0; width: 28px; height: 28px; background: #635bff; color: white; border-radius: 50%; text-align: center; line-height: 28px; font-size: 14px; font-weight: 600; }
    .disclaimer { font-size: 0.85rem; color: #777; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e5e5; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Know if a deal is worth your money — before you write the check.</h1>
    <p class="subheadline">Agent-powered due diligence reports that give real estate investors institutional-grade analysis of any deal in under 24 hours. No $10K advisory fees. No six-week delays. Just clear, structured answers.</p>

    <div class="section">
      <h2>What's Included</h2>
      <ul>
        <li><strong>Full financial breakdown</strong> — all metrics calculated explicitly with labeled formulas: ROI, IRR, cap rate, DSCR, cash-on-cash, equity multiple</li>
        <li><strong>Scenario analysis</strong> — base case, optimistic, and adverse scenarios so you see the range of possible outcomes, not just best-case fantasy</li>
        <li><strong>Risk assessment &amp; action items</strong> — prioritized checklist of what to investigate next, with specific steps you can execute immediately</li>
      </ul>
    </div>

    <div class="section">
      <h2>How It Works</h2>
      <ol class="steps">
        <li><strong>Submit your deal details</strong> — 5-minute intake form with property type, location, pricing, financing terms</li>
        <li><strong>Receive your report in &lt;24 hours</strong> — structured 8-section DD report covering financials, scenarios, risks, and GO/NO-GO recommendation</li>
        <li><strong>Make an informed decision</strong> — definitive verdict with confidence score, specific action items, transparent math you can verify yourself</li>
      </ol>
    </div>

    <div class="section">
      <h2>Pricing</h2>
      <div class="pricing-grid">
        <div class="pricing-card">
          <h3>Basic</h3>
          <div class="price">$197</div>
          <p>One report. Fix-and-flip, small multifamily, or development deal.</p>
          <!-- Replace # with your Stripe payment link -->
          <a href="#" class="btn">Get Started</a>
        </div>
        <div class="pricing-card">
          <h3>Standard</h3>
          <div class="price">$297</div>
          <p>Three reports. Compare up to three deals simultaneously.</p>
          <!-- Replace # with your Stripe payment link -->
          <a href="#" class="btn">Get Started</a>
        </div>
        <div class="pricing-card">
          <h3>Premium</h3>
          <div class="price">$497</div>
          <p>Ten reports + priority turnaround. 24-hour delivery.</p>
          <!-- Replace # with your Stripe payment link -->
          <a href="#" class="btn">Get Started</a>
        </div>
      </div>
    </div>

    <div class="disclaimer">This service provides AI-powered analytical frameworks for real estate investment evaluation. Reports are not financial advice, and all market data should be independently verified before making any investment decision.</div>
  </div>
</body>
</html>
```

4. Replace the `#` href values with your actual Stripe payment link URLs from Step 2
5. Push to GitHub — GitHub Pages will auto-publish at `https://yourusername.github.io`

### Option B: Render (if you prefer all-in-one)

Same approach as Streamlit — deploy this HTML as a static site on [render.com](https://render.com) (free tier).

**Result:** Live landing page with payment links. Second revenue lane operational.

---

## Step 4 — Deploy DD Reports Intake Form (~5 minutes)

The intake form template already exists at `vault/shared/dd-reports/dd-intake-form-template.md`. You have two options:

### Option A: Use Google Forms (fastest, no code)
1. Create a Google Form with these fields from the template:
   - Property address / location
   - Property type (fix-and-flip / multifamily 2-4 unit / multifamily 5+ unit / development / mixed-use / other)
   - Acquisition price
   - ARV (After Repair Value) or completed project value
   - Rehab/construction budget (if applicable)
   - Financing details (loan amount, rate, type)
   - Holding period
   - Any comp data or specific concerns
2. Share the form link in your outreach emails

### Option B: Embed a Typeform / Tally form
- [tally.so](https://tally.so) has a generous free tier and looks more professional than Google Forms
- Recreate the fields from `dd-intake-form-template.md`
- Get an embeddable link to share in outreach

---

## Step 5 — Send First Outreach Emails (Andrey's action, ~30 min total)

You have everything ready. Here's what to send:

### Your Contact Sheet
Open your email/LinkedIn and pick **5 warm contacts** from these segments:

| Segment | Who to target | Why they fit |
|---------|--------------|-------------|
| Multifamily operators | Value-add syndicators doing 5+ deals/year | Both screening + deep DD needed |
| Private lenders / hard money | Lenders who evaluate multiple borrower deals daily | Speed + consistency matters most |
| Syndicators / GPs | Anyone raising capital for real estate funds | Professional DD reports for offering memorandums |
| Development companies (Austin/STX) | Active developers with current pipelines | Permit velocity tracking is specifically relevant |

### How to Personalize (takes 2 min per person)
Before sending any email, add one specific detail:
- Their recent deal ("saw your acquisition at X")
- Their fund's stated focus area
- A LinkedIn post or article they wrote
- Something from a podcast appearance

### What to Send First
Start with Email 1 from `outreach-cadence-v1.md`. Don't overthink it — the draft is ready. Your authenticity as the sender matters more than perfect copy.

---

## After Deployment — What Happens Autonomously

Once you deploy and send first emails, here's what I'll handle:

- **Feedback capture:** Every respondent gets a lightweight feedback questionnaire
- **Report production:** DD Reports are produced autonomously end-to-end (intake → engine output)
- **Underwriting tool updates:** User feedback drives threshold/prompt adjustments
- **Outreach follow-ups:** Draft Email 2 and Email 3 for segments that respond
- **July 9 countdown:** Prepare post-summer Austin Brief SOP when council resumes

---

## Summary — What Andrey Needs to Do

| Action | Time | Links/Location |
|--------|------|---------------|
| Deploy Underwriting SaaS to Streamlit Cloud or Render | ~10 min | `/underwriting_deploy/` (4 files) |
| Create 3 Stripe payment links | ~15 min | [dashboard.stripe.com](https://dashboard.stripe.com) |
| Deploy landing page to GitHub Pages | ~20 min | Template HTML above |
| Set up intake form (Google Forms or Tally) | ~5 min | Fields in `dd-intake-form-template.md` |
| Send Email 1 to first 5 warm contacts | ~30 min | Drafts in `outreach-cadence-v1.md` |

**Total: ~80 minutes one-time setup.** After that, the entire production pipeline runs autonomously. Revenue starts flowing from Day 2 onward as reports are delivered and underwriting tool is live.

---

*Go-Live Kit v1 — 2026-06-13*  
*Cost: $0–$150 (free tiers for Streamlit, GitHub Pages, Stripe no monthly fee)*  
*Revenue timeline: First payments possible within 48 hours of deployment + first email sends*
