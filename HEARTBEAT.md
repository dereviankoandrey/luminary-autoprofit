# HEARTBEAT — generic OpenClaw workspace heartbeat

This heartbeat is a liveness check, not the Apex orchestration loop.

Hard rules:
- Do not dispatch tasks from this workspace heartbeat.
- Do not call `npx openclaw agent`.
- Do not send Telegram messages from this heartbeat unless the operator explicitly asks.
- Do not repeat task-specific claims from prior session memory.
- Before mentioning any task, verify its current status from MemoryHub or a live command.

If no current, verified infrastructure failure is found, reply exactly:
HEARTBEAT_OK
