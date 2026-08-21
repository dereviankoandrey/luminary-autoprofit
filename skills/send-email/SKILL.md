---
name: send-email
description: Send M365 SMTP email from approved LBV shared-mailbox aliases.
metadata: {"openclaw":{"requires":{"bins":["node"],"env":["SMTP_USER","SMTP_PASSWORD","SMTP_FROM"]}}}
---

# send-email

Use this skill to send approved customer-facing or operational emails through
Microsoft 365 SMTP.

## Usage

```bash
node ~/.openclaw/tools/send-email.js '{"from_alias":"clientsuccess","to":"customer@example.com","subject":"Welcome","body_html":"<p>Hello.</p>"}'
```

## Parameters

| Field | Required | Description |
|---|---|---|
| `from_alias` | yes | One of `system`, `clientsuccess`, `onboarding`, `cmo`, `cro`, `coo`, `creative`, `hello`. |
| `to` | yes | Email address or array of email addresses. |
| `subject` | yes | Subject line. |
| `body_html` | yes | HTML body. |
| `body_text` | no | Plain-text body. Generated from HTML if omitted. |
| `reply_to` | no | Reply-To email address. |

## Alias Mapping

| Alias | From address |
|---|---|
| `system` | `system@luminarybotventures.com` |
| `clientsuccess` | `clientsuccess@luminarybotventures.com` |
| `onboarding` | `onboarding@luminarybotventures.com` |
| `cmo` | `cmo@luminarybotventures.com` |
| `cro` | `cro@luminarybotventures.com` |
| `coo` | `coo@luminarybotventures.com` |
| `creative` | `creative@luminarybotventures.com` |
| `hello` | `hello@luminarybotventures.com` |

## Examples

Client Success welcome note:

```bash
node ~/.openclaw/tools/send-email.js '{"from_alias":"clientsuccess","to":"dereviankoandrey@gmail.com","subject":"Phase C M365 SMTP test","body_html":"<p>Client Success M365 SMTP test from OpenClaw.</p>","body_text":"Client Success M365 SMTP test from OpenClaw."}'
```

System notice:

```bash
node ~/.openclaw/tools/send-email.js '{"from_alias":"system","to":["andrey@luminarybotventures.com"],"subject":"Operational notice","body_html":"<p>Done.</p>"}'
```

## Rules

- Do not send customer-facing email unless the mission or Andrey explicitly
  approves the send.
- Do not include credentials, private keys, raw webhook URLs, payment details,
  or sensitive customer data.
- Use the role alias that matches the agent identity.
- If the send fails, the tool posts a sanitized failure alert to Discord
  `#alerts` when `discord-post` is installed and configured.
