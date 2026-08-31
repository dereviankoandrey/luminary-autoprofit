# Simplified Underwriting Framework (MVP)

**Purpose:** Define minimum viable inputs/outputs for AI underwriting calculator  
**Source:** Andrey's 20+ years of real estate development underwriting  
**Version:** MVP 1.0 (2026-04-01)

---

## Core Inputs (Minimum Viable)

### 1. Property Basics
```
- Property Type: [Multifamily, Mixed-Use, Retail, Industrial, Office]
- Purchase Price: $_______
- Acquisition Costs: $_______ (typically 3-5% of purchase price)
- Rehabilitation Budget: $_______ (per unit or per SF)
- Total Units: _______ (or Total SF: _______)
- Current Occupancy: _______%
```

### 2. Income Assumptions
```
- Current Rent/Unit (or $/SF): $_______
- Projected Rent/Unit (or $/SF): $_______
- Rent Growth Rate (annual): _______% (typically 3-4%)
- Other Income (parking, laundry, etc.): $_______/month
```

### 3. Expense Assumptions
```
- Operating Expenses (% of Gross): _______% (typically 35-50%)
- Property Taxes: $_______/year
- Insurance: $_______/year
- Management Fee (% of gross): _______% (typically 4-6%)
- Capital ExReserves (% of gross): _______% (typically 4-6%)
```

### 4. Financing Terms
```
- Loan-to-Value (LTV): _______% (typically 65-75%)
- Interest Rate: _______%
- Loan Term (years): _______ (typically 5-10)
- Amortization Period (years): _______ (typically 25-30)
- Debt Yield Requirement: _______% (typically 6-8%)
```

### 5. Exit Assumptions
```
- Hold Period (years): _______ (typically 3-7)
- Exit Cap Rate: _______% (typically 50-100 bps above purchase cap)
- Sale Costs (% of sale price): _______% (typically 6-8%)
```

---

## Core Outputs (Minimum Viable)

### 1. Return Metrics
```
- Cash-on-Cash Return: _______% (Year 1 pre-tax cash flow / equity invested)
- IRR (Internal Rate of Return): _______% (over hold period)
- Equity Multiple: _______x (total cash distributed / equity invested)
```

### 2. Underwriting Metrics
```
- Initial Cap Rate: _______% (NOI / Purchase Price)
- Stabilized Cap Rate: _______% (NOI / Purchase Price at stabilization)
- Debt Service Coverage Ratio (DSCR): _______x (NOI / Annual Debt Service)
- Break-Even Occupancy: _______% (Operating Expenses / Gross Potential Income)
```

### 3. Cash Flow Projections (Year 1-5)
```
Year | Gross Income | NOI | Debt Service | Cash Flow
-----|--------------|-----|--------------|----------
1    | $_______    | $___| $_______    | $_______
2    | $_______    | $___| $_______    | $_______
...
```

### 4. Sensitivity Analysis
```
Scenario | IRR | Cash-on-Cash | Equity Multiple
---------|-----|--------------|----------------
Base     | ___%| ____%        | ____x
Rent -5% | ___%| ____%        | ____x
Rent +5% | ___%| ____%        | ____x
Vac +5%  | ___%| ____%        | ____x
Exit Cap +50bps | ___%| ____% | ____x
```

---

## AI Decision Logic (Go/No-Go)

### GO Recommendation
If ALL of the following:
- Cash-on-Cash Return > 12% (Year 1)
- IRR > 15% (over hold period)
- DSCR > 1.25x (stabilized)
- Equity Multiple > 1.8x

### NO-GO Recommendation
If ANY of the following:
- Cash-on-Cash Return < 8%
- IRR < 10%
- DSCR < 1.15x
- Equity Multiple < 1.5x

### REVIEW Recommendation (Requires Human Analysis)
If between thresholds:
- Cash-on-Cash: 8-12%
- IRR: 10-15%
- DSCR: 1.15-1.25x
- Equity Multiple: 1.5-1.8x

---

## AI Prompt Structure (for analysis generation)

```
You are an expert real estate underwriter with 20+ years of experience.
Analyze the following property using standard underwriting methodology.

PROPERTY INPUTS:
{insert all input values}

TASK:
1. Calculate Year 1 and stabilized NOI
2. Calculate DSCR based on stabilized NOI
3. Create 5-year cash flow projection
4. Calculate IRR, Cash-on-Cash, Equity Multiple
5. Run sensitivity analysis on rent +/-5% and exit cap +/-50bps
6. Provide GO/NO-GO/REVIEW recommendation with reasoning

OUTPUT FORMAT:
- Key Metrics (bullet list with values)
- Cash Flow Summary (5-year table)
- Sensitivity Table
- Recommendation: [GO/NO-GO/REVIEW]
- Rationale: [2-3 sentences explaining the decision]
- Risks/Considerations: [2-3 bullet points]
```

---

## Test Cases (for MVP validation)

### Test Case 1: Multifamily - Austin (Small Asset)
- Purchase: $2.5M, 24 units, $105k/unit
- Rehab: $25k/unit
- Current Rent: $1,200/unit, Projected: $1,450/unit
- 75% LTV, 7.5% interest, 30-yr amort
- Hold: 5 years, Exit Cap: 5.5%

### Test Case 2: Mixed-Use - Austin (Mid Asset)
- Purchase: $8M, ground floor retail + 40 units above
- Rehab: $150k/unit equivalent
- Current Occupancy: 70%, Target: 95%
- 70% LTV, 7.25% interest
- Hold: 7 years, Exit Cap: 6%

### Test Case 3: Multifamily - Suburban (Value-Add)
- Purchase: $12M, 120 units, 20 years old
- Rehab: $30k/unit (full renovation)
- Rent growth: 4%/year
- 70% LTV, 7% interest
- Hold: 5 years

### Test Case 4: Industrial - Satellite City
- Purchase: $5M, 40k SF warehouse
- NOI: $350k current, projected $420k
- 75% LTV, 7.5% interest
- Hold: 5 years, Exit Cap: 6.5%

### Test Case 5: Mixed-Use - Distant Market (Diversification)
- Purchase: $3.5M, 16 units + retail
- Market: Secondary city (lower entry, lower returns)
- 65% LTV, 8% interest (higher rate for distant market)
- Hold: 5 years, Exit Cap: 6%

---

## Validation Criteria

### Success = All 5 test cases:
1. Generate output in < 60 seconds
2. IRR within 10% of manual underwriting benchmark
3. Clear GO/NO-GO/REVIEW recommendation
4. Sensitivity table includes at least 3 scenarios

### Fail = Any of the following:
1. Output errors or API timeouts
2. IRR discrepancy > 15% from manual calculation
3. No clear recommendation (AI hedges too much)
4. Critical metrics missing

---

## Next Steps Post-Validation

### If GO:
- Recruit 3-5 beta users from Andrey's network
- Iterate on framework based on feedback
- Consider pricing ($299-599/mo)
- Plan public launch (target: 90 days)

### If NO-GO:
- Identify framework gaps
- Iterate on calculation logic
- Re-test with adjusted parameters
- Re-evaluate in 2 weeks

### If REVIEW:
- Adjust decision thresholds
- Add more nuance to AI reasoning
- Consider hybrid model (AI + human review for edge cases)

---

*Created: 2026-04-01 02:00 UTC*  
*Agent: Jedai*
