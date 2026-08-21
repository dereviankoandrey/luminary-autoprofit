# AI Underwriting Calculator - MVP

**Experiment Date:** 2026-04-01  
**Status:** BUILD PHASE  
**Target Cost:** <$100  
**Target Time:** <3 hours autonomous

---

## Objective
Build a minimal viable underwriting calculator that:
1. Takes property inputs (price, rehab, rents, etc.)
2. Generates IRR, cash-on-cash, and sensitivity analysis
3. Provides AI-generated "go/no-go" recommendation
4. Matches Andrey's manual underwriting within 10% margin

---

## Architecture (No-Code/Low-Code)

### Option A: Airtable + Softr + GPT API (Target: $50-75)
- **Airtable:** Free tier (up to 1,200 records)
- **Softr:** Free tier (limited to 100 users/month)
- **GPT API:** $50 credits (estimated 500-1000 API calls)
- **Domain:** Use Softr subdomain (free)

### Option B: Python + Streamlit (Target: $0-25)
- **Streamlit Cloud:** Free tier
- **GPT API:** $25 credits
- **Self-hosted calculation logic** (more control, less friction)

---

## MVP Framework (Simplified)

### Inputs
```
- Property Purchase Price
- Acquisition Costs (closing, legal, etc.)
- Rehabilitation Budget
- Total Units / Square Footage
- Current Rent per Unit/SF
- Projected Rent per Unit/SF
- Operating Expenses (% of gross)
- Hold Period (years)
- Exit Cap Rate
- Financing Terms (LTV, interest rate, term)
```

### Outputs
```
- Cash-on-Cash Return
- IRR (Internal Rate of Return)
- Equity Multiple
- Debt Service Coverage Ratio (DSCR)
- Sensitivity Table (2-3 key variables)
- AI Recommendation: GO / NO-GO / REVIEW
```

### Decision Logic (Go/No-Go)
```
GO if:
- Cash-on-Cash > 12%
- IRR > 15%
- DSCR > 1.25x

NO-GO if:
- Cash-on-Cash < 8%
- IRR < 10%
- DSCR < 1.15x

REVIEW if:
- Between thresholds (requires human analysis)
```

---

## Build Steps

### Phase 1: Airtable Base (30 min)
1. Create tables: Properties, Outputs, Analysis_Log
2. Define fields and relationships
3. Set up API integration

### Phase 2: Softr Frontend (45 min)
1. Create input form page
2. Connect to Airtable
3. Create results display page
4. Add "Get Analysis" button

### Phase 3: GPT Integration (45 min)
1. Define prompt for underwriting analysis
2. Set up API webhook from Softr
3. Test with mock data

### Phase 4: Validation (30 min)
1. Run 5 test cases using Andrey's real project data (sanitized)
2. Compare outputs to manual underwriting
3. Document framework gaps

---

## Cost Tracker
| Item | Cost |
|------|------|
| Airtable Pro (optional) | $0-20/mo |
| Softr Pro (optional) | $0-50/mo |
| GPT API Credits | $50 |
| Domain | $0 (using subdomain) |
| **Total** | **$50-120** |

---

## Success Metrics
- [ ] MVP generates analysis in < 60 seconds
- [ ] Output accuracy within 10% of manual underwriting
- [ ] 3/5 mock properties get clear GO/NO-GO recommendation
- [ ] Total cost under $100
- [ ] Build time under 3 hours

---

## Next Actions
1. Begin Airtable base setup
2. Define minimum viable input/output schema
3. Create first test case (mock property)

---

*Created: 2026-04-01 02:00 UTC*  
*Agent: Jedai*
