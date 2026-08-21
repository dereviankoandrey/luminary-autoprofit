---
name: telegram-alert
description: Send a Telegram alert to Andrey (or a specified chat). Use for agent status updates, error escalations, silent failure notifications, and operational milestones.
metadata: {"openclaw":{"requires":{"bins":["node"],"env":["TELEGRAM_BOT_TOKEN"]}}}
---

# telegram-alert

Send a Telegram message via the LBV bot. Default recipient is Andrey (chat_id 7727959008).

## Usage

```bash
node ~/.openclaw/tools/telegram-alert.js '<json>'
```

## Parameters

| Field | Required | Description |
|---|---|---|
| `message` | yes | Text to send |
| `severity` | no | `info` / `warning` / `error` / `critical` (default: `info`) |
| `chat` | no | Telegram chat_id (default: Andrey's personal chat) |

## Examples

Informational update:
```bash
node ~/.openclaw/tools/telegram-alert.js '{"message":"Blueprint auto-delivery completed for Jane Smith","severity":"info"}'
```

Error escalation:
```bash
node ~/.openclaw/tools/telegram-alert.js '{"message":"GSCRM write failed for session cs_live_xxx. Manual intervention needed.","severity":"error"}'
```

Critical alert:
```bash
node ~/.openclaw/tools/telegram-alert.js '{"message":"Stripe webhook failed 3 times. Stopping further processing.","severity":"critical"}'
```

## Severity emoji mapping

- `info` → ℹ️
- `warning` → ⚠️
- `error` → 🔴
- `critical` → 🚨

## Rules

- Use for escalations, silent failures, and milestones — not for every agent action
- Always include enough context in the message for Andrey to take action without asking follow-up questions
- Include session IDs, customer emails, or error messages where relevant
- Do not send sensitive credentials or full private keys in messages
