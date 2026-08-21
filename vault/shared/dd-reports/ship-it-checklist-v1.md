# Ship It Checklist — All Revenue Lanes

**Created:** 2026-07-17 (Night 30)  
**Estimated total time:** ~45 minutes one-time  
**Revenue impact:** $17,500+ foregone per month until completed

---

## Priority 1: Underwriting SaaS — Deploy to Streamlit Cloud
**Time:** ~10 minutes | **Impact:** Immediate MRR potential

1. Push the underwriting code to GitHub (if not already done)
2. Go to https://streamlit.io/cloud → sign in with GitHub
3. Click "New App" → select repo → main.py as entry point
4. Click Deploy

**Assets ready:** `underwriting_deploy/` directory contains all deploy files, including DEPLOYMENT_COMPLETED.txt and deploy-instructions-v1.md

---

## Priority 2: DD Reports — Stripe Payment Link
**Time:** ~15 minutes | **Impact:** Fastest path to revenue ($197–$497 per report)

1. Log into https://dashboard.stripe.com
2. Go to Products → Add Product → "Due Diligence Report"
3. Set price ($197 base, or $497 for premium)
4. Copy the Payment Link
5. Paste link into DD Reports delivery pipeline config

**Assets ready:** Intake form template (`dd-intake-form-template.md`), launch readiness checklist (`dd-launch-readiness.md`), 3 sample reports in `vault/shared/dd-reports/`

---

## Priority 3: Chrome Extension — Publish to Web Store
**Time:** ~20 minutes | **Impact:** Lead generation engine + $9/mo Pro tier pipeline

1. Go to https://chrome.google.com/webstore/devconsole (requires $5 one-time developer fee if not already paid)
2. Click "New Item" → upload ZIP of `experiments/chrome-extension-deal-screener/src/`
3. Fill in store listing: use copy from `marketing/store-listing.md`
4. Upload privacy policy (use template from `launch-kit/SUBMISSION-GUIDE.md`)
5. Submit for review (1–3 day turnaround)

**Assets ready:** All 6 source files, README.md, marketing docs, submission guide (`launch-kit/SUBMISSION-GUIDE.md`)

---

## Priority 4: LinkedIn — Post Operator Narrative
**Time:** ~5 minutes | **Impact:** Warm network distribution for all lanes above

1. Open LinkedIn → paste post from `drafts/linkedin_post_deal_evaluation_operator_2026-07-06.md` (or use the short-form version)
2. Include a link to one of the sample DD Reports as engagement bait in comments
3. Post at 8AM ET Tuesday or 12PM ET Wednesday for best reach

**Assets ready:** LinkedIn article + short-form post drafted, operator-first positioning validated by market signals

---

## Summary

| Action | Time | Revenue Path | Status |
|--------|------|-------------|--------|
| Deploy Underwriting SaaS | ~10 min | MRR $97–297/mo | Code ready, 80+ days idle |
| Create Stripe Payment Link | ~15 min | Per-report $197–497 | Pipeline autonomous, waiting on payment rail |
| Publish Chrome Extension | ~20 min | Lead gen + $9/mo Pro | Build complete, in store queue |
| Post LinkedIn Article | ~5 min | All lanes (distribution) | Drafted, unposted 31+ days |

**Total:** ~50 minutes to unlock everything that's been sitting idle for months.
