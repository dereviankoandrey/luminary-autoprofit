---
name: stripe-ops
description: Query Stripe checkout sessions, list recent sessions, update payment link metadata, and create guarded refunds for LBV revenue workflows.
metadata: {"openclaw":{"requires":{"bins":["node"],"env":["STRIPE_SECRET_KEY"]}}}
---

# stripe-ops

Use this skill for Stripe read operations and tightly guarded Stripe writes.
The tool reads `STRIPE_SECRET_KEY` from `~/.openclaw/.env`.

## Usage

```bash
node ~/.openclaw/tools/stripe-ops.js '{"op":"get_session","session_id":"cs_live_xxx"}'
```

## Operations

Get a checkout session:

```bash
node ~/.openclaw/tools/stripe-ops.js '{"op":"get_session","session_id":"cs_live_xxx"}'
```

Returns the session, customer email when Stripe has one, amount, payment
status, metadata, payment intent, payment link, and expanded line items.

List recent sessions:

```bash
node ~/.openclaw/tools/stripe-ops.js '{"op":"list_recent_sessions","limit":10}'
```

Paginate with `after`:

```bash
node ~/.openclaw/tools/stripe-ops.js '{"op":"list_recent_sessions","limit":10,"after":"cs_live_xxx"}'
```

Update payment link metadata:

```bash
node ~/.openclaw/tools/stripe-ops.js '{"op":"update_payment_link","link_id":"plink_xxx","metadata":{"campaign":"spring"}}'
```

Create a refund:

```bash
node ~/.openclaw/tools/stripe-ops.js '{"op":"create_refund","payment_intent_id":"pi_xxx","amount":49700,"confirm":true}'
```

## Rules

- Treat Stripe output as production-sensitive customer and payment data.
- Use `get_session` before any refund decision.
- Never call `create_refund` unless Andrey explicitly approved that refund in
  the current conversation.
- `create_refund` refuses to call Stripe unless `confirm:true` is present.
- `amount` is in cents and must be a positive integer.
- Do not expose `STRIPE_SECRET_KEY`, auth headers, webhook URLs, or raw payment
  data in Discord, reports, or chat.
- Tool failures post a sanitized alert to `#alerts` when the Discord alerts
  webhook is configured.
