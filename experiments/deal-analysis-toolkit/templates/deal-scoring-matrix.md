# Deal Scoring Matrix — Operator-Grade Evaluation Framework

**Version:** 1.0 | **Updated:** 2026-07-29  
**Author:** Andrey Derevianko (20-year developer/CFO, $4B+ portfolio operator)  
**Philosophy:** Deterministic math > gut feel. Every number auditable. No black boxes.

---

## How to Use This Template

1. Fill in the deal parameters (price, ARV, costs, financing)
2. Calculate each metric using the formulas provided
3. Score each category (A/B/C/D/F based on thresholds below)
4. Review composite score and recommendation
5. Document your reasoning for any deviation from the algorithm's output

**This is not a substitute for professional advice.** It's an operator's thinking framework — distilled from 20 years of making and losing money in real estate. Use it to pressure-test deals, not replace due diligence.

---

## Deal Parameters

| Parameter | Value | Notes |
|-----------|-------|-------|
| Address | | |
| Property Type | ☐ Fix-and-Flip ☐ Multifamily ☐ Buy-and-Hold ☐ Development | |
| Acquisition Price | $ | |
| After Repair Value (ARV) | $ | Based on comparable sales, not comps that "should" sell for this much |
| Renovation Budget | $ | Line-item detailed. No % of purchase price shortcuts. |
| Holding Period | months | Include carrying costs for each month |
| Disposition Cost Rate | % | Typical: 6–8% (agent commissions + closing) |

---

## Financial Metrics

### 1. Profit Margin (PM)

```
PM = (ARV - Acquisition Price - Renovation Budget - Holding Costs - Disposition Costs) / ARV × 100
```

| Score | Threshold | Interpretation |
|-------|-----------|----------------|
| A | ≥ 25% | Strong margin — walk away if you have options |
| B | 18–24% | Acceptable — depends on other factors |
| C | 12–17% | Marginal — need strong secondary thesis |
| D | 6–11% | Weak — one bad month destroys this deal |
| F | < 6% | NO-GO. This is a job, not an investment. |

**Your PM:** ______ % → Score: ___

### 2. Cost of Capital (COC)

```
Monthly COC = (Acquisition Price + Renovation Budget × 0.5) × Monthly Interest Rate
Total Holding Costs = Monthly COC × Holding Period + Insurance + Taxes + Utilities
```

| Score | Threshold | Interpretation |
|-------|-----------|----------------|
| A | ≤ 8% annualized | Cheap money — favorable conditions |
| B | 9–12% | Market rate — acceptable |
| C | 13–16% | Expensive — compresses margins fast |
| D | 17–20% | Painful — short holding periods only |
| F | > 20% | Predatory territory. Find different financing or pass. |

**Your COC:** ______ % annualized → Score: ___

### 3. Return on Cash (ROC)

```
Total Cash Invested = Down Payment + Closing Costs (Acq) + Renovation Budget + Holding Costs
ROC = Net Profit / Total Cash Invested × 100
```

| Score | Threshold | Interpretation |
|-------|-----------|----------------|
| A | ≥ 35% | Exceptional — consider scaling this strategy |
| B | 25–34% | Strong — repeatable model |
| C | 18–24% | Adequate — competitive with market alternatives |
| D | 10–17% | Below cost of capital for many investors |
| F | < 10% | You'd be better off in a money market fund with less risk. |

**Your ROC:** ______ % → Score: ___

### 4. Days on Market Sensitivity (DMS)

```
Stress Test: If holding period extends by 3 months, does the deal still score B or above?
```

| Score | Interpretation |
|-------|----------------|
| A | Handles +6 month delay and stays profitable |
| B | Handles +4 month delay acceptably |
| C | Breaks even at +3 month extension |
| D | Loses money with +2 month extension |
| F | Already marginal — any delay kills it |

**Your DMS Score:** ___

---

## Composite Scoring

| Category | Weight | Your Score (A=5, B=4, C=3, D=2, F=1) | Weighted Points |
|----------|--------|-----------------------------------------|-----------------|
| Profit Margin | 30% | | |
| Cost of Capital | 15% | | |
| Return on Cash | 30% | | |
| Days on Market Sensitivity | 25% | | |

### Composite Score = Σ(Weighted Points) / Max Possible × 100

**Your Score:** ______ / 100

---

## Recommendation Engine (Deterministic — No Ambiguity)

| Score Range | Decision | Action |
|-------------|----------|--------|
| 85–100 | **STRONG GO** | Execute. This is a proven winner. Move fast. |
| 70–84 | **GO with conditions** | Proceed if: (a) you control the renovation timeline, (b) financing is locked, (c) exit strategy is defined. |
| 55–69 | **REVIEW** | Don't pass or accept — analyze. What's dragging the score down? Can it be fixed with better terms, lower price, or faster timeline? If not, walk away. |
| 40–54 | **CONDITIONAL NO-GO** | Only proceed if you have a secondary value-add thesis (e.g., rezoning potential, subdivision opportunity) that isn't captured in these numbers. |
| 0–39 | **NO-GO** | This deal is a wealth destroyer. There are better uses of your time and capital. Move on. |

**Your Recommendation:** ___

---

## Operator Notes

> "I've seen more deals die from overconfidence than bad math. The numbers can be wrong, but they're *auditable* wrong. Gut feeling gives you a number you can't defend to yourself at 2 AM when the roof leaks and the contractor is late."
>
> — Andrey Derevianko

**What's missing from this analysis?** (Document your qualitative concerns here.)

- [ ] Neighborhood trajectory risk:
- [ ] Contractor/execution risk:
- [ ] Financing contingency risk:
- [ ] Regulatory/zoning risk:
- [ ] Other:

---

*This template is part of the Deal Analysis Toolkit by Luminary Ventures. For questions about this framework or access to the full underwriting engine, contact: andrey@luminaryventures.io*
