# AI Underwriting SaaS - Deployment Plan (MVP)

**Status:** Ready to deploy (framework validated, code exists)  
**Created:** 2026-03-30  
**Author:** Jedai (for Andrey)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (User Interface)                 │
├─────────────────────────────────────────────────────────────────┤
│  Option A: Softr (No-Code, Fastest)                            │
│  - Drag-and-drop UI builder                                     │
│  - Airtable backend integration                                 │
│  - Stripe integration built-in                                  │
│  - $50-100/mo                                                   │
│  - Setup time: 2-3 hrs                                          │
│                                                                 │
│  Option B: Streamlit (Python, Free)                            │
│  - Pure Python, uses existing underwriting_mvp.py              │
│  - Deploy on Streamlit Cloud (free tier)                       │
│  - Stripe integration via API                                   │
│  - $0-20/mo                                                     │
│  - Setup time: 3-4 hrs                                          │
│                                                                 │
│  Option C: Render + React (Custom, Scalable)                   │
│  - Full control, most professional                             │
│  - Render.com (free tier available)                            │
│  - React frontend + Python API                                 │
│  - $0-50/mo (scales with usage)                               │
│  - Setup time: 5-8 hrs                                         │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                        API LAYER                                 │
├─────────────────────────────────────────────────────────────────┤
│  - FastAPI or Flask wrapper around underwriting_mvp.py         │
│  - Endpoints:                                                   │
│    • POST /analyze (property data → analysis)                  │
│    • GET  /pricing (subscription tiers)                        │
│    • POST /webhook/stripe (payment processing)                 │
│  - Rate limiting: 3 free reports/mo, then pay                  │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                       DATA LAYER                                 │
├─────────────────────────────────────────────────────────────────┤
│  Option A: Airtable (No-Code)                                  │
│  - Store property submissions, analysis results                │
│  - User accounts via Softr                                     │
│  - $20-50/mo                                                    │
│                                                                 │
│  Option B: SQLite (Simple, Free)                               │
│  - Single file database                                        │
│  - Perfect for MVP                                             │
│  - $0                                                           │
│                                                                 │
│  Option C: PostgreSQL (Scalable)                               │
│  - Render.com PostgreSQL add-on                               │
│  - $7-50/mo                                                     │
│  - Production-ready                                            │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                     PAYMENT PROCESSING                           │
├─────────────────────────────────────────────────────────────────┤
│  Stripe Integration                                             │
│  - One-time reports: $49-99/report                             │
│  - Monthly subscription: $197/mo (unlimited reports)           │
│  - Premium tier: $497/mo (includes consultation, custom models)│
│  - Webhook for payment confirmation                            │
│  - Setup time: 1-2 hrs                                         │
└─────────────────────────────────────────────────────────────────┘
```

---

## Recommended Path: Streamlit + Render (Free MVP)

**Why this path:**
1. **Zero capital required** (free tiers for everything)
2. **Fastest deployment** (3-4 hrs)
3. **Uses existing code** (no refactoring needed)
4. **Scalable** (can migrate later)
5. **Full control** (Python stack throughout)

### Setup Steps

#### Step 1: Create Streamlit App (1-2 hrs)

**File: `app.py`**
```python
import streamlit as st
import json
from underwriting_mvp import analyze_deal

st.title("AI Real Estate Underwriter")
st.markdown("Enter property details for instant analysis based on Andrey's framework.")

# Input form
property_type = st.selectbox("Property Type", ["Fix-and-Flip", "Multifamily", "Development"])
acquisition = st.number_input("Acquisition Price ($)", min_value=0, step=10000)
renovation = st.number_input("Renovation Budget ($)", min_value=0, step=5000)

if property_type == "Fix-and-Flip":
    arv = st.number_input("After-Repair Value (ARV) ($)", min_value=0, step=10000)
    holding_months = st.number_input("Holding Period (months)", min_value=1, max_value=60, value=6)
    data = {
        "property_type": "Fix-and-Flip",
        "acquisition_price": acquisition,
        "renovation_budget": renovation,
        "arv": arv,
        "holding_period_months": holding_months,
        "financing_down_percent": 25,
        "financing_interest_rate": 8.5,
        "other_costs": 15000
    }
else:
    rental_income = st.number_input("Monthly Rental Income ($)", min_value=0, step=1000)
    data = {
        "property_type": "Multifamily",
        "acquisition_price": acquisition,
        "renovation_budget": renovation,
        "rental_income": rental_income,
        "financing_down_percent": 30,
        "financing_interest_rate": 7.5,
        "operating_expense_percent": 40
    }

if st.button("Analyze Deal"):
    result = analyze_deal(data)
    
    # Display results
    st.header(f"Recommendation: {result['recommendation']}")
    st.metric("Risk Level", result['risk_level'])
    
    if result['green_flags']:
        st.success(f"✅ {len(result['green_flags'])} Positive Indicators")
        for flag in result['green_flags']:
            st.write(f"• {flag}")
    
    if result['red_flags']:
        st.error(f"⚠️ {len(result['red_flags'])} Red Flags")
        for flag in result['red_flags']:
            st.write(f"• {flag}")
    
    st.json(result)
```

#### Step 2: Deploy to Render.com (1 hr)

1. Create GitHub repo with:
   - `app.py`
   - `underwriting_mvp.py`
   - `requirements.txt` (streamlit, fastapi, gunicorn)

2. Create Render.com account (free)

3. Create "Web Service" from GitHub repo
   - Build command: `pip install -r requirements.txt`
   - Start command: `streamlit run app.py --server.port $PORT`
   - Free tier: 0.125 CPU, 512 MB RAM (sufficient for MVP)

4. Set environment variables:
   - `STRIPE_SECRET_KEY` (if adding payments)

#### Step 3: Add Stripe Integration (1-2 hrs)

**Pricing tiers:**
- Free: 3 reports/month
- Pro: $197/mo - Unlimited reports
- Premium: $497/mo - Reports + 30-min consultation + custom framework tweaks

**Implementation:**
- Create Stripe product/pricing
- Add "Upgrade" button in Streamlit app
- Webhook endpoint to track usage

---

## Beta User Recruitment Script

**Target:** 3-5 developers from Andrey's network  
**Channel:** Email or direct message  
**Goal:** Get 3 people to test for 2 weeks (free), then convert to paid

**Script:**
```
Subject: Quick favor - test my AI underwriting tool

Hey [Name],

I've built an AI underwriting calculator that applies Andrey's 20+ years of deal-making logic. 
It's already validated against real deals (100% accuracy on test cases).

Looking for 3-5 beta testers to stress-test it for 2 weeks. You'll get:
- Free unlimited access during beta
- Early-bird pricing (50% off for life if you convert to paid)
- Direct feedback channel to shape the product

No commitment - just run 2-3 deals you're evaluating and tell me if it catches what you'd catch.

Worth 10 min of your time? Reply "test" and I'll send the link.

-Jedai (for Andrey)
```

---

## Success Metrics (First 30 Days)

| Metric | Target | Why |
|--------|--------|-----|
| Beta users recruited | 3-5 | Validation sample size |
| Deals analyzed per beta user | 5-10 | Test depth |
| Framework accuracy (user feedback) | 90%+ | Must match Andrey's judgment |
| Conversion to paid | 1-2 (33-50%) | Early adopter conversion |
| Revenue | $197-497/mo | First recurring revenue |

---

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Beta users don't engage | Medium | High | Follow up, offer consultation call |
| Pricing too high | Medium | Medium | Test $97/mo tier if no conversions |
| Framework doesn't match real deals | Low | High | Already validated, but adjust thresholds if needed |
| Competitor copycats | Medium | Low | Moat = Andrey's expertise, not code |
| Technical deployment issues | Low | Medium | Streamlit has excellent docs, 1-2 day max |

---

## Next Steps (Execute Order)

1. **Tonight:** Deploy Streamlit app to Render (3-4 hrs)
2. **Tomorrow:** Setup Stripe account, add payment tier (2 hrs)
3. **Day 3:** Send beta user recruitment to Andrey (1 hr)
4. **Week 1:** Collect feedback, iterate (ongoing)
5. **Week 2:** First paid conversions

---

*Document created: 2026-03-30 02:30 UTC*  
*Status: Ready for execution pending Andrey approval*
