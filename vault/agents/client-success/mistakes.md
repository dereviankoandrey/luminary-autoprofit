# Mistakes

## General Lessons
- Do not assume installed models are registered in every agent. Check each agent's `models.json`.
- Do not assume the active runtime path is `/mnt/data/...`. Verify whether the live path is `/home/andrey/.openclaw/...`.
- When a model or auth change appears ignored, suspect a stale live session before assuming config failed.
- Write important operational fixes into files, not just chat.

## Client-Success-Specific
- Do not optimize support flows without checking actual onboarding and delivery friction points.
- Clarity beats completeness in client-facing operations.
