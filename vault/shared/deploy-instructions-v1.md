# Deploy the Underwriting Engine — One Page, Copy/Paste

**Estimated time:** 5 minutes  
**What you need:** GitHub account (free), Streamlit Cloud account (free)  
**Current deploy-ready assets:** `underwriting_deploy/` directory  

---

## Step 1: Push to GitHub

Open terminal and run these exact commands from your workspace root:

```bash
cd ~/openclaw/workspace

# Create a new repo on github.com/new — name it "real-estate-underwriting-engine" or similar
git init
git add underwriting_deploy/
git commit -m "Deploy: Underwriting engine v1 (Streamlit + MVP)"
git branch -M main
git remote add origin git@github.com:<YOUR_USERNAME>/real-estate-underwriting-engine.git
git push -u origin main
```

That's it. One folder, one commit, one push. The directory contains:
- `underwriting_mvp.py` — the validated engine (11/11 test scenarios pass)
- `underwriting_streamlit_app.py` — the Streamlit frontend
- `requirements.txt` — dependencies
- Demo JSON files for testing

## Step 2: Deploy on Streamlit Cloud

1. Go to [streamlit.io](https://streamlit.io) and sign in with GitHub
2. Click **"New App"** → select your repo (`<YOUR_USERNAME>/real-estate-underwriting-engine`)
3. Set the path to: `underwriting_deploy/underwriting_streamlit_app.py`
4. Click **Deploy**

The app will be live at something like: `https://your-app-name.yourusername.streamlit.app`

## Step 3: Verify

Open the deployed URL in your browser. You should see the Streamlit interface with:
- Deal type selector (multifamily, fix-and-flip, development, mixed-use)
- Input fields for deal parameters
- GO/NO-GO output with financial metrics
- Risk assessment section

Test it by entering a known-good scenario (use `demo_2026-07-01-multifamily.json` as reference data).

---

## What Happens After Deploy

Once live, you have three paths forward:

### Path A: Send to warm network (fastest revenue)
Use the pre-written outreach sequences in `vault/shared/dd-reports/outreach-cadence-v2-credibility.md`. Pick 3 contacts from your network who evaluate deals regularly. Send Email 1 from each sequence. Total time: ~5 minutes per person.

### Path B: Set up DD Reports payment flow
Create Stripe account → create one payment link → connect to autonomous intake form. Fully end-to-end after this. Estimated time: 30-45 minutes one-time.

### Path C: Both
Deploy the engine, set up Stripe, start outreach. This is the full launch sequence.

---

*Created: 2026-07-07 by Overnight Employee (Luminary)*  
*Purpose: Reduce deployment friction from "I'll do it later" to copy/paste and click*  
*Related assets: underwriting_deploy/, outreach-cadence-v2-credibility.md, deal-analysis-suite-outreach-draft-v1.md*
