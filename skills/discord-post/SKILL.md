---
name: discord-post
description: Post operational updates and alerts to LBV Discord channels using the routing map.
metadata: {"openclaw":{"requires":{"bins":["node"],"env":["DISCORD_BOT_TOKEN"]}}}
---

# discord-post

Use this skill when an operational milestone, error, escalation, or mission
summary needs to be visible in Discord.

## Usage

```bash
node ~/.openclaw/tools/discord-post.js '{"agent":"example-agent","message":"Phase B test from node-02"}'
```

## Parameters

| Field | Required | Description |
|---|---|---|
| `channel` | no | Optional explicit key or Discord channel ID. Normally omit this and route by `agent` through `~/orchestration/discord-channels.json`. |
| `message` | yes unless `embed` is provided | Message text. Do not include credentials, private keys, raw webhook URLs, or bearer tokens. |
| `embed` | no | Discord embed object, or an array of embed objects, for structured summaries. |
| `agent` | no | Agent id. Used for username and default channel selection. |
| `username` | no | Discord webhook display name override. |

## Routing

Agent routing is configured only in `~/orchestration/discord-channels.json`.
Unknown agents fall back to the `default` entry. Adding an agent means adding one
line to that JSON file; do not add agent names to this skill or tool code.
For normal agent reports and announcements, omit `channel` and set `agent` to
the current agent id so the shared-bot map owns the route.

## Examples

Post a route-mapped update:

```bash
node ~/.openclaw/tools/discord-post.js '{"agent":"example-agent","message":"Phase B node-02 Discord test."}'
```

Post an alert:

```bash
node ~/.openclaw/tools/discord-post.js '{"agent":"new-agent","message":"Overflow route test."}'
```

Post a structured milestone:

```bash
node ~/.openclaw/tools/discord-post.js '{"agent":"example-agent","message":"Deploy complete.","embed":{"title":"Deployment","description":"Production deployment reached READY.","color":3066993}}'
```

## Rules

- Use Discord for milestones, escalations, gate notices, failures, and mission
  completion summaries.
- Every agent report or announcement that is visible outside the current session
  should also be posted once through this skill using the current `agent` id.
- For high-priority issues, always use `channel:"alerts"`.
- Telegram delivery to Andrey stays in place for Apex/operator paths; Discord is
  additive, not a replacement.
- Do not post secrets, private keys, raw webhook URLs, auth headers, customer
  payment data, or full stack traces containing secrets.
- Keep messages concise and include enough context for Andrey to act without a
  follow-up question.
