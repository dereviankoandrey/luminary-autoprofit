---
name: gscrm
description: Read and write the LBV Google Sheets CRM for sales, onboarding, and fulfillment tracking.
metadata: {"openclaw":{"requires":{"bins":["node"],"env":["GOOGLE_SHEET_ID","GSCRM_SHEET_NAME"]}}}
---

# gscrm

Use this skill to read and update the LBV Google Sheets CRM. The service
account key is loaded from `~/.luminary/gscrm-sa.json`; the sheet ID and sheet
name come from env vars.

## Usage

```bash
node ~/.openclaw/tools/gscrm.js '{"op":"read","limit":5}'
```

## Operations

Read recent rows:

```bash
node ~/.openclaw/tools/gscrm.js '{"op":"read","limit":5}'
```

Search rows:

```bash
node ~/.openclaw/tools/gscrm.js '{"op":"read","query":"customer@example.com"}'
```

Append a row:

```bash
node ~/.openclaw/tools/gscrm.js '{"op":"append","row":{"Timestamp":"2026-05-12T00:00:00Z","Email":"test@example.com","Full Name":"[TEST] Example","Tier":"TEST","Payment Status":"TEST","Fulfillment Status":"TEST","Stripe Session ID":"test_session_123"}}'
```

Update a row:

```bash
node ~/.openclaw/tools/gscrm.js '{"op":"update","session_id":"test_session_123","fields":{"Fulfillment Status":"TEST UPDATED","Notes / Next Action":"[TEST] updated"}}'
```

Delete a test row:

```bash
node ~/.openclaw/tools/gscrm.js '{"op":"delete","row_number":42}'
```

## Rules

- Never hard-code the sheet name. Use `GSCRM_SHEET_NAME`.
- Read before updating if you are not certain of the target row.
- For append, include at minimum `Timestamp`, `Email`, `Tier`, and
  `Payment Status`.
- Delete only `[TEST]` rows or rows explicitly approved by Andrey.
- Do not place credentials, private keys, or payment data in GSCRM notes.
- If the tool returns `ok:false`, report the sanitized error to Apex or
  `#alerts` before retrying.
