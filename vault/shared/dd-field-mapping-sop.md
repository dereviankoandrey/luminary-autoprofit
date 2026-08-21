# DD Reports — Intake-to-Engine Field Mapping SOP

**Created:** 2026-06-11  
**Issue:** DD intake form uses investor-friendly field names; underwriting engine expects internal key names. Data is correct but unmapped → false negatives (zero-value calculations, incorrect GO/NO-GO).  
**Cost:** $0 | **Effort:** Documentation only

## Mapping Table

| Intake Form Field (Investor-Facing) | Engine Key (Internal) | Notes |
|-------------------------------------|----------------------|-------|
| `current_monthly_rent`              | `rental_income`      | Enter total monthly rent across all units |
| `down_payment_pct`                  | `financing_down_percent` | Percentage, not decimal (e.g., 25 for 25%) |
| `operating_expenses_pct`            | `operating_expense_percent` | Percentage of gross rent |
| `purchase_price`                    | `property_value`     | Total acquisition cost including closing |
| `interest_rate`                     | `interest_rate`      | Same name — no mapping needed |
| `loan_term_years`                   | `loan_term_years`    | Same name — no mapping needed |

## Usage Instructions

1. When an investor completes the DD intake form, translate field names using the table above before passing to the underwriting engine.
2. All values remain unchanged — only the key names differ.
3. If a new deal type introduces additional fields, extend the mapping table here and re-test with a synthetic sample before handing off to Andrey for deployment.

## Test Cases (Passing)

- Multifamily 4-unit: cap rate 6.83%, cash-on-cash 3.35%, DSCR 1.14 → GO ✅
- Determinism check passed on re-run with same inputs ✅

---
*This document lives in `vault/shared/`. Update it when intake form or engine field names change.*
