# AI Underwriting SaaS — Beta Demo Output (v1)

**Generated:** 2026-05-16
**Purpose:** Show what the tool actually does so prospects can evaluate before joining beta.

This document shows real underwriting engine output for 4 sample Austin deals — 2 fix-and-flip and 2 multifamily. Each deal is run through the same framework logic that beta users will get.

---

## Demo Deal 1 — Strong Fix-and-Flip

**Address:** 4200 S Congress Ave, Austin, TX 78745
**Property Type:** Fix-and-Flip

### Inputs
| Metric | Value |
|---|---:|
| Acquisition Price | $185,000 |
| Renovation Budget | $45,000 |
| After Repair Value (ARV) | $340,000 |
| Holding Period | 5 months |
| Down Payment | 25% |
| Interest Rate | 8.5% |
| Other Costs | $12,000 |

### Output
| Metric | Value |
|---|---:|
| **Recommendation** | **✅ GO** |
| **Risk Level** | Low |
| Total Project Cost | $246,914 |
| Projected Profit | $93,086 |
| **ROI** | **37.7%** |
| Purchase-to-ARV Ratio | 54% |
| Holding Cost | $4,914 |

### Green Flags
- Strong purchase spread (54% of ARV)
- Strong ROI (37.7%)
- Renovation budget at reasonable 24% of acquisition

### Red Flags
- None

---

## Demo Deal 2 — Weak Fix-and-Flip

**Address:** 7821 Burnet Rd, Austin, TX 78757
**Property Type:** Fix-and-Flip

### Inputs
| Metric | Value |
|---|---:|
| Acquisition Price | $295,000 |
| Renovation Budget | $55,000 |
| After Repair Value (ARV) | $365,000 |
| Holding Period | 8 months |
| Down Payment | 25% |
| Interest Rate | 8.5% |
| Other Costs | $18,000 |

### Output
| Metric | Value |
|---|---:|
| **Recommendation** | **❌ NO-GO** |
| **Risk Level** | High |
| Total Project Cost | $380,538 |
| Projected Profit | -$15,538 |
| **ROI** | **-4.1%** |
| Purchase-to-ARV Ratio | 81% |
| Holding Cost | $12,538 |

### Green Flags
- Strong purchase spread (81% of ARV)
- Renovation budget at reasonable 19% of acquisition

### Red Flags
- ❗ ROI (-4.1%) below minimum threshold (15%) — **loss-making deal**

**Why this is NO-GO:** The spread between acquisition + reno and ARV is too thin. After holding costs and financing, this deal loses money. The tool catches this in seconds instead of wasting weeks on analysis.

---

## Demo Deal 3 — Strong Multifamily

**Address:** 1200 W Parmer Ln, Austin, TX 78727
**Property Type:** Multifamily

### Inputs
| Metric | Value |
|---|---:|
| Acquisition Price | $3,200,000 |
| Renovation Budget | $300,000 |
| Monthly Rental Income | $52,000 |
| Down Payment | 30% |
| Interest Rate | 7.0% |
| Operating Expense Ratio | 40% |

### Output
| Metric | Value |
|---|---:|
| **Recommendation** | **✅ GO** |
| **Risk Level** | Low |
| **Cap Rate** | **11.70%** |
| **DSCR** | **2.09** |
| **Cash-on-Cash Return** | **20.37%** |
| Annual Gross Income | $624,000 |
| NOI | $374,400 |
| Annual Debt Service | $178,833 |
| Annual Cash Flow | $195,567 |

### Green Flags
- Solid cap rate (11.70%)
- Strong DSCR (2.09)
- Positive cash-on-cash return (20.37%)

### Red Flags
- None

---

## Demo Deal 4 — Weak Multifamily

**Address:** 5500 Brodie Ln, Austin, TX 78745
**Property Type:** Multifamily

### Inputs
| Metric | Value |
|---|---:|
| Acquisition Price | $1,800,000 |
| Renovation Budget | $200,000 |
| Monthly Rental Income | $14,500 |
| Down Payment | 25% |
| Interest Rate | 7.5% |
| Operating Expense Ratio | 42% |

### Output
| Metric | Value |
|---|---:|
| **Recommendation** | **❌ NO-GO** |
| **Risk Level** | High |
| **Cap Rate** | **5.61%** |
| **DSCR** | **0.89** |
| **Cash-on-Cash Return** | **-2.75%** |
| Annual Gross Income | $174,000 |
| NOI | $100,920 |
| Annual Debt Service | $113,273 |
| Annual Cash Flow | -$12,353 |

### Green Flags
- Cap rate at 5.61% (passes minimum 5% threshold)

### Red Flags
- ❗ DSCR (0.89) below minimum threshold (1.10) — **income doesn't cover debt**
- ❗ Negative cash flow in Year 1 — **you lose money from month one**

**Why this is NO-GO:** Despite a decent-looking cap rate, the deal fails on two critical metrics: DSCR below 1.10 means income can't cover debt service, and negative Year 1 cash flow means the investment is self-funding in reverse. The cap rate alone is misleading.

---

## What This Shows

The engine provides instant, structured screening for two property types:

### Fix-and-Flip Analysis
- Calculates total project cost including financing and holding costs
- Projects profit and ROI
- Flags purchase price vs. ARV spread
- Evaluates renovation budget reasonableness
- Returns **GO / REVIEW / NO-GO** with risk level

### Multifamily Analysis
- Calculates cap rate, DSCR, and cash-on-cash return
- Models NOI, debt service, and annual cash flow
- Flags negative cash flow and sub-threshold metrics
- Returns **GO / REVIEW / NO-GO** with risk level

### Every Output Includes
- ✅ Clear recommendation (GO / REVIEW / NO-GO)
- ✅ Risk level (Low / Medium / High)
- ✅ Specific red flags with threshold context
- ✅ Specific green flags with metric values
- ✅ All key metrics in one table

---

**Beta access:** Limited spots available. Free tier: 3 screens/month.
