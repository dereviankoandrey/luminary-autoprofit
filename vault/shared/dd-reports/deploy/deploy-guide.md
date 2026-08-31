# DEAL ANALYSIS SUITE — ONE-PAGE LAUNCH SCRIPT

**Total time: ~55 minutes one-time. Then autonomous forever.**  
**Revenue starts within 48 hours of deployment + first email sends.**

---

## STEP 1: Deploy Underwriting SaaS (~10 min)

**Files are at:** `/underwriting_deploy/` (4 files ready to upload)

### Streamlit Cloud (fastest, recommended):
1. [github.com/new](https://github.com/new) → create repo named `deal-underwriter`
2. Upload from `/underwriting_deploy/`: `underwriting_streamlit_app.py`, `underwriting_mvp.py`, `requirements.txt`, `README.md`
3. [streamlit.io/cloud](https://streamlit.io/cloud) → sign in with GitHub → "Deploy from GitHub" → find repo → Deploy
4. Done. You'll get a URL like `deal-underwriter-xyz.streamlit.app`

---

## STEP 2: Stripe Payment Links (~15 min)

[dashboard.stripe.com](https://dashboard.stripe.com) → Payment links → Create (x3):

| Tier | Price | Description to paste |
|------|-------|---------------------|
| DD Reports — Basic | $197 one-time | "AI-powered due diligence report for one deal (fix-and-flip, small multifamily, or development). 8-section investor-grade analysis with scenario modeling and risk assessment." |
| DD Reports — Standard | $297 one-time | "AI-powered due diligence for up to 3 deals simultaneously. Includes all 8 report sections with scenario analysis and prioritized action items." |
| DD Reports — Premium | $497 one-time | "AI-powered due diligence for up to 10 deals + priority turnaround. Includes quarterly pricing summary sheet and 24-hour delivery." |

After creating each → **copy the payment link URL** → you'll paste it into Step 3.

---

## STEP 3: Deploy Landing Page (~20 min)

**The actual HTML file is here:** [index.html](./index.html) — just upload it, add Stripe links, and deploy to GitHub Pages.

### GitHub Pages:
1. Create repo `yourusername.github.io`
2. Upload `index.html` (from this same directory)
3. Replace `href="#"` with your Stripe payment URLs from Step 2
4. Commit + push → live at `https://yourusername.github.io`

---

## STEP 4: Intake Form (~5 min)

**Template fields:** [dd-intake-form-template.md](../../dd-intake-form-template.md)

### Google Forms (easiest):
1. [forms.google.com](https://forms.google.com) → New form "Deal Intake"
2. Add fields: property address, property type, acquisition price, ARV, rehab budget, financing details, holding period, any comp data/concerns
3. Copy form link — share in outreach

---

## STEP 5: First Outreach (~10 min)

**Full email drafts:** [deal-analysis-suite-outreach-draft-v1.md](../../deal-analysis-suite-outreach-draft-v1.md)  
**Cadence sequences (4 segments × 3 emails):** [outreach-cadence-v1.md](../../outreach-cadence-v1.md)

### Quick template for personalization:
> "Hey [Name], [1 specific detail about them/recent deal]. I'm launching an AI underwriting + due diligence service for real estate investors — it runs full financial analysis, scenario modeling, and risk assessment in minutes instead of hours. Would love to give you a free report on one of your current deals so you can see if it's useful. Interested?"

**Who to email first:** Active multifamily syndicators, private lenders/hard money lenders, investor group leaders, property managers with acquisition arms.

---

## 📁 ALL FILES REFERENCE

| File | Purpose |
|------|---------|
| `deploy/index.html` | **Deployable landing page** — add Stripe links and upload |
| `../underwriting_deploy/` (4 files) | Underwriting engine + Streamlit app |
| `../dd-sample-*.md` | 3 investor-grade sample reports |
| `../deal-analysis-suite-demo-*.md` | 2 demo reports (Austin 4-unit, St. Johns Mixed-Use) |
| `../dd-intake-form-template.md` | Intake form field spec |
| `../deal-analysis-suite-outreach-draft-v1.md` | Bundle pitch email drafts |
| `../outreach-cadence-v1.md` | Segment-specific 3-email sequences |

---

## ⏰ POST-DEPLOYMENT TIMELINE

| Time | What happens |
|------|-------------|
| Day 0 | You finish 55-min setup, send first emails |
| Day 0-1 | First responses → I process intake, generate reports, handle follow-ups |
| Day 1-2 | First reports delivered → payments hit Stripe |
| Week 1 | Feedback loop active — I iterate prompts based on real deals |
| Ongoing | Fully autonomous: intake → engine → delivery → feedback |
