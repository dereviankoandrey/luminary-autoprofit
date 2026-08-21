# AI Underwriting SaaS - MVP Experiment Log

**Date:** 2026-03-28  
**Status:** In Progress  
**Objective:** Build demo underwriting calculator to validate concept before beta recruitment

---

## Experiment Design

**Hypothesis:** AI can generate accurate, actionable real estate underwriting analysis using Andrey's simplified framework logic, providing immediate value to developers at <$300/mo price point.

**Success Criteria:**
- MVP build cost < $100
- Build time < 5 hours
- Test properties produce outputs matching Andrey's expected logic
- AI-generated analysis is coherent and useful (not generic fluff)
- At least 3/5 test properties show clear "go/no-go" recommendations

---

## Architecture

**Stack:**
- Frontend: Softr (free tier) or similar no-code form builder
- Backend: Airtable (free tier) for data storage
- AI: OpenAI GPT API for analysis generation
- Hosting: Included with Softr/Airtable

**Data Flow:**
1. User inputs property details via form
2. Airtable stores input + triggers webhook
3. Webhook calls GPT API with input data + framework prompt
4. GPT returns analysis + metrics
5. Softr displays results to user

---

## Framework Inputs (Simplified)

**Required User Inputs:**
- Property address (or description)
- Acquisition price
- Renovation budget
- After-Repair Value (ARV) estimate
- Holding period (months)
- Financing terms (down payment %, interest rate)
- Rental income estimate (if income property)
- Operating expenses (or % of income)

**Output Metrics:**
- Cash-on-cash return
- Internal Rate of Return (IRR)
- Equity multiple
- Net Operating Income (NOI)
- Cap rate
- Break-even occupancy
- Recommended "Go/No-Go" flag

**Red Flags AI Should Identify:**
- Purchase price > 85% of ARV (for fix-and-flip)
- Negative cash flow in Year 1
- IRR < 15% (threshold adjustable)
- Renovation budget < 20% or > 50% of acquisition (unusual)
- Holding period too long (>24 months for fix-and-flip)
- Financing costs > 35% of total project cost

---

## Step-by-Step Build Plan

### Step 1: Define Framework Prompt (30 min)
Create detailed prompt for GPT that encodes Andrey's underwriting logic.

### Step 2: Set Up Airtable Base (45 min)
Create tables for:
- Properties (inputs + outputs)
- Analysis Results
- Users (future)

### Step 3: Build Softr Frontend (1-2 hours)
- Create form for user inputs
- Connect to Airtable
- Display results page

### Step 4: Integrate GPT API (1-2 hours)
- Set up webhook from Airtable to GPT
- Parse GPT response back to Airtable
- Handle errors/timeouts

### Step 5: Test with Mock Properties (1 hour)
- Create 5 test cases (good deal, bad deal, borderline, commercial, multifamily)
- Verify outputs match expected logic
- Iterate on prompt if needed

### Step 6: Document Results (30 min)
- Log costs, time, findings
- Make go/no-go recommendation

---

## Build Progress

### [ ] Step 1: Framework Prompt (Not Started)
**Status:** Pending

**Draft Prompt Structure:**
```
You are an expert real estate underwriter with 20+ years of experience in mixed-use, 
multifamily, and development projects. Analyze the following property deal and 
provide:

1. Key metrics calculation
2. Risk assessment
3. Go/No-Go recommendation with rationale
4. Red flags identified

Deal Details:
[User inputs go here]

Use Andrey's underwriting framework:
- Fix-and-flip: Purchase < 85% ARV, IRR > 20%, holding < 12 months
- Multifamily: Cap rate > 5%, cash-on-cash > 8%, DSCR > 1.25
- Development: IRR > 18%, equity multiple > 2.0x, risk-adjusted returns

[Analysis instructions...]
```

### [ ] Step 2: Airtable Base (Not Started)
**Status:** Pending

Tables to create:
- `Properties` (main table)
  - Fields: Name, Address, Acquisition Price, Renovation Budget, ARV, Holding Period, Down Payment %, Interest Rate, Rental Income, Operating Expenses, IRR, Cash-on-Cash, Cap Rate, NOI, Recommendation, Red Flags, Created At
- `Users` (future use)

### [ ] Step 3: Softr Frontend (Not Started)
**Status:** Pending

Pages needed:
- Home (landing page with value prop)
- Calculator (input form)
- Results (display analysis)

### [ ] Step 4: GPT Integration (Not Started)
**Status:** Pending

- API key management
- Webhook setup (Airtable → GPT → Airtable)
- Error handling

### [ ] Step 5: Testing (Not Started)
**Status:** Pending

Test cases:
1. **Good Fix-and-Flip:** $200K purchase, $50K Reno, $350K ARV, 6-month hold → Should recommend GO
2. **Bad Fix-and-Flip:** $300K purchase, $50K Reno, $350K ARV, 12-month hold → Should recommend NO-GO
3. **Borderline Multifamily:** $1M purchase, $100K Reno, 12 units @ $1,500/mo, 5% cap rate → Should flag for review
4. **Strong Multifamily:** $2M purchase, $200K Reno, 20 units @ $2,000/mo, 7% cap rate → Should recommend GO
5. **Development Risk:** $500K land, $2M construction, 24-month hold, IRR 16% → Should flag risk

### [ ] Step 6: Documentation (Not Started)
**Status:** Pending

---

## Costs Tracking

| Item | Estimated | Actual | Notes |
|------|-----------|--------|-------|
| Airtable (free tier) | $0 | $0 | Up to 1,200 records |
| Softr (free tier) | $0 | $0 | Branded, limited features |
| GPT API credits | $50 | [Pending] | Estimated 100-200 API calls |
| Domain (optional) | $15 | $0 | Not needed for MVP |
| **Total** | **$50-65** | [Pending] | |

---

## Time Tracking

| Activity | Estimated | Actual | Notes |
|----------|-----------|--------|-------|
| Framework prompt | 0.5 hr | [Pending] | |
| Airtable setup | 0.75 hr | [Pending] | |
| Softr frontend | 1.5 hr | [Pending] | |
| GPT integration | 1.5 hr | [Pending] | |
| Testing | 1 hr | [Pending] | 5 test cases |
| Documentation | 0.5 hr | [Pending] | |
| **Total** | **5.75 hr** | [Pending] | |

---

## Results

**Build Completed:** [Pending]

**Test Results:**

| Test Case | Expected | Actual | Match? | Notes |
|-----------|----------|--------|--------|-------|
| Good Fix-and-Flip | GO | [Pending] | [Pending] | |
| Bad Fix-and-Flip | NO-GO | [Pending] | [Pending] | |
| Borderline Multifamily | REVIEW | [Pending] | [Pending] | |
| Strong Multifamily | GO | [Pending] | [Pending] | |
| Development Risk | FLAG | [Pending] | [Pending] | |

**AI Output Quality:** [Pending]
- Coherent analysis? [Pending]
- Useful metrics? [Pending]
- Actionable recommendations? [Pending]

**Costs Incurred:** [Pending]

**Time Spent:** [Pending]

---

## Go/No-Go Decision

**Criteria Met:**
- [ ] Cost < $100
- [ ] Build time < 5 hours
- [ ] 3/5 test cases match expected logic
- [ ] AI analysis is coherent and useful
- [ ] Clear path to beta recruitment

**Decision:** [Pending]

**If GO:**
- Recruit 3-5 beta users from Andrey's network
- Offer 3-month free trial in exchange for feedback
- Iterate on framework based on real user data

**If NO-GO:**
- Identify failure points (cost, time, accuracy, value prop)
- Pivot to next opportunity or iterate on concept
- Document lessons learned

---

*Last updated: 2026-03-28 02:00 UTC*
*Status: Experiment not yet started*
