# Mistakes

## General Lessons
- Do not assume installed models are registered in every agent. Check each agent's `models.json`.
- Do not assume the active runtime path is `/mnt/data/...`. Verify whether the live path is `/home/andrey/.openclaw/...`.
- When a model or auth change appears ignored, suspect a stale live session before assuming config failed.
- Write important operational fixes into files, not just chat.

## Jedai-Specific
- When diagnosing prior work, check memory and current live config before concluding.
- For OpenClaw issues, verify the exact active path and active session state.
- If a tool or CLI is unavailable on PATH, do not assume the command can be executed from this runtime.
