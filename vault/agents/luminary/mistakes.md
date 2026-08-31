# Mistakes

## General Lessons
- Do not assume installed models are registered in every agent. Check each agent's `models.json`.
- Do not assume the active runtime path is `/mnt/data/...`. Verify whether the live path is `/home/andrey/.openclaw/...`.
- When a model or auth change appears ignored, suspect a stale live session before assuming config failed.
- Write important operational fixes into files, not just chat.

## Luminary-Specific
- Auth failures may come from empty or stale `auth-profiles.json`, not just invalid tokens.
- Separate OAuth accounts can exist, but `auth-state.json` controls which one is actually used.
- If Luminary shows the wrong OpenAI identity, inspect `lastGood.openai-codex` and restart the session.
- Telegram pairing errors are access-control issues, not model issues.
- Missed voice companion on 2026-06-14 reply to Andrey. Rule is now expanded to apply to ALL outbound Telegram messages without an expiry date — any text-only outbound is treated as an execution failure.
