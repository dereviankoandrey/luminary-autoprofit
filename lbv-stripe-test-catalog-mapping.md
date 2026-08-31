# Stripe Test Catalog Clone — Implementation Plan
**Task:** N1-LBV-006 | **Priority:** P3 | **Created:** 2026-06-06

## Problem

Stripe has two separate environments — Live and Test — each with their own independent product catalog, prices, webhooks, and customer data. The test environment is the only way to audit an end-to-end purchase without charging real money. Currently there is no documented mapping between what a user sees on the site (product names) and what Stripe has configured underneath (Price IDs, Product IDs), which means:

- No reliable way to validate purchase flows in testing
- Cannot run automated end-to-end purchase smoke tests
- Cannot verify webhook delivery, receipt generation, or post-payment automation without manual guesswork

## Goal

Create a complete `Product Name → Price ID → Product ID` mapping for the **Test** Stripe environment that serves as both:
1. A reference document for operators during manual QA
2. An input specification for automated purchase tests (scripts, Cypress, Playwright)

## Prerequisites

- Access to the Stripe Test Dashboard (`https://dashboard.stripe.com/test`) — operator provides credentials or temporary API key with `product.*` and `price.*` read permissions
- The site's product configuration (currently on Vercel; may reference Stripe Live by default, needs test-mode toggle)

## Steps

### Step 1: Catalog Inventory (READ ONLY)

Run these against the **Test** environment:

```
curl -s -u sk_test_<KEY>:https://api.stripe.com/v1/products?limit=100 \
  | jq '.data[] | {id, name}'
```

This returns every product configured in sandbox mode. For each product, also fetch its prices:

```
curl -s -u sk_test_<KEY>:https://api.stripe.com/v1/products/<PRODUCT_ID>/prices?limit=100 \
  | jq '.data[] | {id, price_type, unit_amount, currency, active}'
```

### Step 2: Build the Mapping Document

Create a CSV or JSON file at `stripe-test-catalog.json`:

```json
{
  "environment": "test",
  "exported_at": "2026-06-06T12:00:00Z",
  "products": [
    {
      "name": "Example Product Name",
      "product_id": "prod_XXXXXXXXXX",
      "prices": [
        {
          "label": "Monthly — $29/mo",
          "price_id": "price_XXXXXXXXXXXXX",
          "type": "recurring",
          "unit_amount": 2900,
          "currency": "usd",
          "interval": "month",
          "active": true
        }
      ]
    }
  ]
}
```

### Step 3: Site Environment Switcher

The deploy is on Vercel — Stripe key currently hardcoded or in environment variable. Add a conditional based on `NODE_ENV`:

```ts
stripe = new Stripe(
  process.env.NODE_ENV === 'production'
    ? process.env.STRIPE_LIVE_KEY!
    : process.env.STRIPE_TEST_KEY!
);
```

Vercel env vars: set both `STRIPE_LIVE_KEY` and `STRIPE_TEST_KEY`. The deploy hook (`VERCEL_ENV`) maps to the right one.

### Step 4: Diff / Verification Script

Write a lightweight script that compares the live Stripe catalog against what the site currently references, flagging:

- Prices on the site but NOT in Live or Test Stripe (would fail at checkout)
- Prices in Stripe but not referenced by the site (orphaned — waste of stripe slots)
- Amount mismatches between front-end display and Stripe pricing

Output: `catalog-diff-report.md` with pass/fail status.

### Step 5: End-to-End Purchase Smoke Test

Using the test catalog mapping plus `STRIPE_TEST_KEY`, implement a smoke test that verifies the full flow end-to-end in test mode. This enables every future purchase-related bug fix to be validated automatically before merging.

Output: `tests/e2e/purchase-test.spec.ts` (or equivalent).

## Acceptance Criteria

- [ ] Complete product → price mapping for both Live AND Test catalogs
- [ ] Mapping stored in version-controlled JSON under `/stripe-catalog/` directory
- [ ] Site checkout uses correct environment based on deployment stage
- [ ] Diff script exists and passes (0 orphans, 0 mismatches)
- [ ] End-to-end purchase smoke test runs green in CI

## Risks & Guardrails

- **Test key must NOT be committed to source control.** Use Vercel env vars for `STRIPE_TEST_KEY`.
- Do not use `sk_live_*` anywhere outside the production deploy hook.
- If products exist in Live but lack a Test counterpart, create them in Test first then enable the site switcher — never flip before mapping exists.

## Next Steps After Approval

1. Operator grants temporary Stripe test API read access (or operator runs Step 1 manually)
2. Catalog document generated and committed
3. Site env switcher coded, tested locally, deployed to Vercel preview branch only
4. Diff script written and verified
5. E2E smoke test built on feature branch
6. Operator-driven merge of smoke test + env switcher to main
