# AI Real Estate Underwriting — Demo Report

**Generated:** 2026-05-18  
**Engine:** Andrey's Underwriting Framework v1 (Python MVP)  
**Purpose:** This is what beta users will see — instant underwriting analysis with GO/NO-GO/REVIEW recommendation

---

## Sample Deal #1: Multifamily Value-Add (Round Rock, TX)

### Property Overview
| Field | Value |
|---|---|
| Address | 2400 N I-35 Frontage Rd, Round Rock, TX 78664 |
| Type | Class B Multifamily |
| Units | 120 |
| Year Built | 2005 |
| Description | 120-unit multifamily, 15 min south of downtown Austin. 65% occupied at 92% of market rent. Value-add through selective unit renovations and lease-up to market rate. |

### Deal Inputs
| Input | Value |
|---|---|
| Acquisition Price | $3,200,000 |
| Renovation Budget | $400,000 |
| Current Monthly Rental Income | $58,000 |
| Financing (Down / Rate) | 25% / 7.25% |
| Operating Expense Ratio | 42% |

### Underwriting Results

**Recommendation: ✅ GO**  
**Risk Level: Low**  
**Confidence Score: 115/100**

| Metric | Value | Threshold | Status |
|---|---|---|---|
| Cap Rate | 12.62% | ≥ 5.0% | ✅ Strong |
| DSCR | 2.05 | ≥ 1.25 | ✅ Strong |
| Cash-on-Cash Return | 25.90% | ≥ 8.0% | ✅ Strong |
| NOI | $403,680/yr | — | — |
| Annual Cash Flow | $207,213/yr | — | — |

### Green Flags
- Solid cap rate (12.62%)
- Strong DSCR (2.05)
- Positive cash-on-cash return (25.90%)

### Red Flags
- None identified

### Analysis Summary
Metrics meet or exceed Andrey's framework thresholds. 3 positive indicators identified. This deal shows strong fundamentals with significant cash flow and lender-friendly DSCR. The cap rate of 12.62% provides comfortable margin above the going-in rate even after value-add renovations.

---

## Sample Deal #2: Mixed-Use Development (Riverside, Austin)

### Property Overview
| Field | Value |
|---|---|
| Site | Riverside Mixed-Use, Austin, TX 78741 |
| Type | Mixed-Use Development |
| Units | 150 residential + 30,000 SF retail |
| Description | 150-unit mixed-use development. 120 residential units + 30,000 SF ground-floor retail. Riverside corridor, 8 min to downtown. |

### Deal Inputs
| Input | Value |
|---|---|
| Land Cost | $1,800,000 |
| Hard Construction Costs | $12,600,000 |
| Soft Costs | $1,890,000 |
| Financing (Debt %) | 65% / 8.0% |
| Holding Period | 28 months |
| End Value | $22,500,000 |
| Equity Invested | $3,600,000 |

### Underwriting Results

**Recommendation: ⚠️ REVIEW**  
**Risk Level: Medium**  
**Confidence Score: 100/100**

| Metric | Value | Threshold | Status |
|---|---|---|---|
| Simplified IRR | 35.7% | ≥ 18.0% | ✅ Strong |
| Equity Multiple | 3.30x | ≥ 2.0x | ✅ Strong |
| Project ROI | 15.4% | — | ✅ Positive |
| Cost Per Unit | $130,027 | — | — |
| Revenue Per Unit | $150,000 | — | — |
| Total Project Cost | $19,504,020 | — | — |
| Developer Profit | $2,995,980 | — | — |

### Green Flags
- Strong IRR (35.7%)
- Strong equity multiple (3.30x)
- Positive project ROI (15.4%)

### Red Flags
- Thin per-unit margin (13.3%) — pricing/absorption risk

### Analysis Summary
Deal has strong return metrics but thin per-unit margins that leave little room for cost overruns or absorption delays. Recommend deeper review of construction cost assumptions, pre-leasing/absorption timing, and sensitivity analysis on the retail component before committing equity.

---

## How It Works

1. **Enter deal inputs** — acquisition price, costs, financing terms, income projections
2. **Get instant analysis** — cap rate, IRR, DSCR, equity multiple, ROI, per-unit metrics
3. **Receive GO / NO-GO / REVIEW** — based on Andrey's proven framework thresholds
4. **See green flags & red flags** — specific items to investigate or watch
5. **Export or share** — clean report format for partner/investor conversations

### Supported Deal Types
- **Fix-and-Flip** — purchase-to-ARV analysis, ROI, holding cost optimization
- **Multifamily** — cap rate, DSCR, cash-on-cash, NOI stress testing
- **Development** — IRR, equity multiple, cost-per-unit, absorption risk

---

## Engine Validation

| Test | Type | Expected | Actual | Status |
|---|---|---|---|---|
| Good Fix-and-Flip | F&F | GO | GO | ✅ |
| Bad Fix-and-Flip | F&F | NO-GO | NO-GO | ✅ |
| Strong Multifamily | Multi | GO | GO | ✅ |
| Marginal Multifamily | Multi | NO-GO | NO-GO | ✅ |
| Strong Development | Dev | GO | GO | ✅ |
| Weak Development | Dev | NO-GO | NO-GO | ✅ |

**Result: 6/6 tests pass (100%)**

---

*This report was generated automatically by the AI Real Estate Underwriting MVP engine. All calculations follow Andrey's underwriting framework. Demo deals use realistic Austin-area parameters but are fictional — not actual offers or recommendations.*
