# DD Reports Stripe + Landing Page Setup Guide

**Purpose:** One-time setup to activate the DD Reports revenue pipeline.  
**Estimated time:** ~25 minutes  
**Cost:** $0 upfront (Stripe takes 2.9% + $0.30 per transaction)

---

## Step 1: Create Payment Links in Stripe (10 min)

### Prerequisites
- Stripe account at [dashboard.stripe.com](https://dashboard.stripe.com)
- If you don't have one, sign up takes ~5 minutes (email + business info)

### Create Two Products

**Product A — Quick Take DD Report**
1. Go to **Products → Add product**
2. Name: `DD Reports - Quick Take`
3. Description: `Fast-track due diligence report for single deals. 48-hour turnaround.`
4. Pricing type: One-time payment
5. Price: `$197`
6. Product code/ID: `dd-quick-take` (for your records)
7. Click **Save**

**Product B — Full Analysis DD Report**
1. Go to **Products → Add product**
2. Name: `DD Reports - Full Analysis`
3. Description: `Comprehensive due diligence report with full underwriting, market analysis, risk assessment, and investor-grade pro formas.`
4. Pricing type: One-time payment
5. Price: `$497`
6. Product code/ID: `dd-full-analysis` (for your records)
7. Click **Save**

### Create Payment Links

For each product:
1. On the product page, click **Create payment link**
2. Customize: Add a description that matches the product name
3. Configure success message: `"Thank you! Your DD Report is being prepared. You'll receive it within 48 hours via email."`
4. Click **Create link**
5. Copy each link (they look like `https://buy.stripe.com/xxxxx`)

**Save these links somewhere safe — you'll need them for the landing page.**

---

## Step 2: Deploy Landing Page (10 min)

### Option A: GitHub Pages (Recommended — free, fastest)

If you already have a GitHub account:

```bash
# Clone or create a repo for your landing page
mkdir dd-reports-landing && cd dd-reports-landing

# Create index.html with the template below
cat > index.html << 'HEREDOC'
[PASTE THE TEMPLATE FROM SECTION 3 BELOW]
HEREDOC

git init
git add .
git commit -m "DD Reports landing page"
# Push to GitHub repo, enable Pages in Settings → Pages
```

### Option B: Netlify Drop (Zero config)

1. Create a folder with `index.html` (template below)
2. Drag the folder onto [app.netlify.com/drop](https://app.netlify.com/drop)
3. Done — instant live URL

---

## Step 3: Landing Page Template

Save this as `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DD Reports — Deterministic Due Diligence</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0a; color: #e0e0e0; line-height: 1.6; }
        .container { max-width: 800px; margin: 0 auto; padding: 4rem 2rem; }
        h1 { font-size: 2.5rem; color: #fff; margin-bottom: 1rem; }
        h2 { font-size: 1.5rem; color: #fff; margin: 2rem 0 1rem; border-left: 3px solid #4caf50; padding-left: 1rem; }
        .subtitle { font-size: 1.2rem; color: #999; margin-bottom: 3rem; }
        .cta-button { display: inline-block; background: #4caf50; color: #fff; padding: 1rem 2.5rem; text-decoration: none; border-radius: 6px; font-size: 1.1rem; font-weight: 600; margin: 0.5rem 0.5rem 0.5rem 0; }
        .cta-button:hover { background: #43a047; }
        .pricing-card { border: 1px solid #333; border-radius: 8px; padding: 2rem; margin: 1.5rem 0; transition: border-color 0.2s; }
        .pricing-card:hover { border-color: #4caf50; }
        .price { font-size: 2rem; color: #4caf50; font-weight: 700; }
        .features { list-style: none; padding: 0; margin: 1rem 0; }
        .features li { padding: 0.3rem 0; padding-left: 1.5rem; position: relative; }
        .features li:before { content: "✓"; color: #4caf50; position: absolute; left: 0; font-weight: bold; }
        .operator-badge { display: inline-block; background: #1a1a2e; border: 1px solid #333; padding: 0.3rem 1rem; border-radius: 20px; font-size: 0.85rem; color: #999; margin-bottom: 2rem; }
        .trust-signals { display: flex; gap: 2rem; margin: 2rem 0; flex-wrap: wrap; }
        .trust-item { text-align: center; }
        .trust-number { font-size: 1.8rem; color: #4caf50; font-weight: 700; }
        .trust-label { font-size: 0.85rem; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <span class="operator-badge">Luminary Ventures — Deterministic Underwriting</span>
        
        <h1>Deterministic Due Diligence Reports</h1>
        <p class="subtitle">Investor-grade deal analysis. Zero black-box AI. Every number auditable, every calculation traceable.</p>
        
        <div class="trust-signals">
            <div class="trust-item">
                <div class="trust-number">$4B+</div>
                <div class="trust-label">Portfolio experience</div>
            </div>
            <div class="trust-item">
                <div class="trust-number">20yr</div>
                <div class="trust-label">Developer/CFO track record</div>
            </div>
            <div class="trust-item">
                <div class="trust-number">48hr</div>
                <div class="trust-label">Turnaround time</div>
            </div>
        </div>

        <h2>Why Deterministic?</h2>
        <p style="color: #999; margin-bottom: 1.5rem;">AI tools that can't audit their own calculations shouldn't be trusted with financial decisions. Every DD Report uses deterministic math — no hallucination, no hidden assumptions, every number you can verify in seconds.</p>

        <h2>Quick Take — $197</h2>
        <div class="pricing-card">
            <ul class="features">
                <li>Single deal analysis (fix-and-flip, multifamily, or development)</li>
                <li>Deterministic underwriting with full calculation transparency</li>
                <li>GO / REVIEW / NO-GO recommendation with reasoning</li>
                <li>Risk assessment and red flag identification</li>
                <li>48-hour turnaround</li>
            </ul>
            <!-- REPLACE # WITH YOUR ACTUAL STRIPE LINK -->
            <a href="#" class="cta-button">Order Quick Take →</a>
        </div>

        <h2>Full Analysis — $497</h2>
        <div class="pricing-card">
            <ul class="features">
                <li>Everything in Quick Take, plus:</li>
                <li>Multi-scenario pro formas (base/bear/bull)</li>
                <li>Market context from live data sources</li>
                <li>Detailed due diligence checklist</li>
                <li>Competitive comparable analysis</li>
                <li>Priority 24-hour turnaround</li>
            </ul>
            <!-- REPLACE # WITH YOUR ACTUAL STRIPE LINK -->
            <a href="#" class="cta-button">Order Full Analysis →</a>
        </div>

        <h2>How It Works</h2>
        <p style="color: #999; margin-bottom: 1.5rem;">1. Choose your tier and submit deal details via our intake form<br>
        2. Our deterministic engine analyzes the numbers + market data<br>
        3. Receive an investor-grade DD Report within 48 hours</p>

        <!-- REPLACE # WITH YOUR INTAKE FORM URL -->
        <a href="#" class="cta-button" style="background: transparent; border: 1px solid #4caf50;">Submit a Deal →</a>
        
        <p style="color: #666; margin-top: 3rem; font-size: 0.85rem; text-align: center;">Built by a 20-year real estate developer and CFO who's underwritten $4B+ in deals. Not AI hype — deterministic math.</p>
    </div>
</body>
</html>
```

**Before publishing, replace:**
- `#` links with your actual Stripe payment link URLs (from Step 1)
- The intake form URL (`Submit a Deal →`) with your intake form or email address

---

## Step 4: Intake Form (Optional but Recommended)

You can use any of these for deal submissions:

**Simplest:** Just put your email in the landing page CTA button. Andrey receives the deal details and works from there.

**Better:** Create a free Google Form with fields matching the intake template at `vault/shared/dd-reports/dd-intake-form-template.md`. Embed it on the landing page or link to it.

---

## Step 5: Test the Full Flow (5 min)

1. Open your live URL in an incognito window
2. Click through a payment link (use Stripe's test mode first if available, or process one real $197 transaction as a test)
3. Verify you receive the payment notification
4. Send yourself a sample DD Report to confirm delivery works end-to-end

---

## What Happens After Activation

Once this pipeline is live:
- Any warm lead can buy a report directly — no back-and-forth needed
- Revenue flows automatically into Stripe
- Andrey receives deal details and produces reports using the autonomous pipeline
- One activated lane = ~$400-500/week revenue potential with zero ongoing engineering effort

**Estimated time to first dollar: 25 minutes setup + same-day delivery.**
