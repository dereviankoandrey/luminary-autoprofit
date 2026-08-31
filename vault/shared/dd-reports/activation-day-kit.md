# Activation Day Kit — One Session, All Lanes Live

**Created:** 2026-07-22  
**Purpose:** Replace the deploy-activation-checklist.md with a single-click execution package. Everything you need to activate all revenue lanes in one focused session (~45 min). No research, no strategy, no decision-making required — just copy/paste and click.

---

## Pre-Flight Checklist (Before You Start)

Make sure these are ready:
- [ ] GitHub account (you have one)
- [ ] Chrome Web Store developer account ($5 one-time fee, you may already be registered)
- [ ] Stripe account (you likely have this for other ventures)
- [ ] LinkedIn logged in and ready to post

**Time needed:** 45 minutes total. Set aside a single block — don't split it across days.

---

## Priority 1: Live Demo Link (~10 min)

### What you're doing: Deploy the Chrome Extension demo.html to GitHub Pages so anyone can access it via URL.

### The script (run from terminal):
```bash
# From workspace root, run this one command:
bash vault/shared/deploy-scripts/github-pages-one-click.sh
```

**If that fails**, manual fallback:
1. Create a new public GitHub repo (e.g., `deal-screener-demo`)
2. Upload `experiments/chrome-extension-deal-screener/demo.html` to the root
3. Settings → Pages → Source: main branch, /root folder
4. Wait 60 seconds → you have a live URL

**Result:** A link like `https://yourusername.github.io/deal-screener-demo/` that anyone can open in a browser and run underwriting analysis on any deal. Zero server costs.

---

## Priority 2: Post LinkedIn — Cognitive Surrender (~10 min)

### What you're doing: Publish the strongest positioning post we've produced. It uses empirical research to prove why deterministic (auditable) AI beats black-box AI for financial decisions.

### The post text (copy from `drafts/linkedin-post-cognitive-surrender-2026-07-20.md`):
```
[Paste the full post content from that file]
```

### Best posting time: Tomorrow (Thursday, July 23) at 8:00 AM ET or Wednesday at 12:00 PM ET.

**After posting:** Add this comment to your own post:
> "For anyone who wants to see what deterministic underwriting looks like in practice — here's a sample report on a real deal: [link to any DD Report sample]"

Sample report links (pick one):
- Fix-and-Flip: `vault/shared/dd-reports/dd-sample-fix-and-flip-2026-06-08.md`
- Multifamily: `vault/shared/dd-reports/dd-sample-multifamily-2026-06-08.md`
- Development (St. Johns): `vault/shared/dd-reports/deal-analysis-suite-demo-st-johns-mixeduse-2026-06-13.md`

---

## Priority 3: DD Reports Pipeline (~25 min)

### Step A: Stripe Payment Links (10 min)
1. Go to stripe.com → Products → Add Product
2. Create two products:
   - **DD Report — Standard** ($197) — fix-and-flip or small multifamily, 3-5 day turnaround
   - **DD Report — Premium** ($497) — large multifamily/development, includes market analysis, 3-day turnaround
3. For each product: Create Payment Link → customize success page → copy the URL

### Step B: Landing Page (10 min)
Deploy a simple landing page that explains what DD Reports are and links to Stripe.

**Template file:** `vault/shared/deploy-instructions-v1.md` has the full HTML template — it's single-page, no dependencies, just upload.

Quick deploy options:
- **GitHub Pages** (free): same repo as demo link above, add an `index.html` with the landing page content
- **Carrd.co** ($19/year or free tier): drag-and-drop, fastest option if you want zero technical overhead
- **Notion public page**: literally just create a new page and publish it — works for beta testing

### Step C: Test the Flow (5 min)
1. Open your landing page URL
2. Click through to Stripe
3. Verify payment link works
4. Send yourself a test deal via email → confirm you can produce a report back within hours

---

## What Happens Next (After Activation)

### Week 1: First Outreach Batch
Send this exact message to 5 warm leads from your network:

> "Hey [Name], I've been building something for real estate operators that I think you'll find useful. It's an AI-powered underwriting engine — but unlike the usual black-box tools, every calculation is deterministic and auditable. You can try it free here: [demo link]. If you have a deal you're evaluating, send me the numbers and I'll run it through for you."

That's it. No pitch deck, no sales call, just one message to five people who already know and trust your judgment.

### Content Calendar (Post-Activation)
| Week | Topic | File |
|------|-------|------|
| Aug 4 | Mamdani AI images → deterministic outputs | `linkedin-post-mamdani-ai-images-real-estate-2026-07-19.md` |
| Aug 11 | Token overhead → auditability | `linkedin-post-token-overhead-2026-07-13.md` |
| Aug 18 | Black-box vs deterministic (Grok Build) | `linkedin-post-deterministic-vs-blackbox-2026-07-12.md` |
| Aug 25 | Operator narrative + track record | `linkedin_post_deal_evaluation_operator_2026-07-06.md` |
| Sep 1 | AI reliability → deterministic engine | `linkedin_post_ai_reliability_2026-07-09.md` |

One post per week. Consistency > volume. Each one drives traffic to the demo link and DD Reports pipeline.

---

## Revenue Math (Conservative)

| Metric | Value |
|--------|-------|
| DD Report price | $197–$497/report |
| Conservative: 2 reports/week | ~$600/week, ~$2,400/month |
| Chrome Extension Pro tier | $9/mo per user (once installed) |
| Underwriting SaaS beta | Pricing TBD with first users |
| **Conservative total** | **~$3K–5K/month within 60 days of activation** |

Every day between now and activation = ~$40–50 in foregone revenue. The cost of not activating is compounding, not static.

---

## Questions?

If any step takes more than 15 minutes or requires something you don't have access to — stop, tell us, and we'll find an alternative path. Don't let perfect be the enemy of shipped.
