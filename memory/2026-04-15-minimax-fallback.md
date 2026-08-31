# Session: 2026-04-15 01:22:10 UTC

- **Session Key**: agent:main:telegram:jedai:direct:7727959008
- **Session ID**: 96692b78-ce11-48ee-b1a2-ed1e4d902c20
- **Source**: telegram

## Conversation Summary

user: Conversation info (untrusted metadata):
```json
{
  "message_id": "618",
  "sender_id": "7727959008",
  "sender": "Andrey Derevianko",
  "timestamp": "Tue 2026-04-14 08:10 UTC"
}
```

Sender (untrusted metadata):
```json
{
  "label": "Andrey Derevianko (7727959008)",
  "id": "7727959008",
  "name": "Andrey Derevianko"
}
```

Can you add MiniMax Global — OAuth (minimax.io) as a fallback for you?
assistant: Done.

I added MiniMax Global as a fallback for Jedai (`main`) in:

- `/home/andrey/.openclaw/openclaw.json`

Inserted fallback:
- `minimax/minimax-m1`

Current Jedai fallback order is now:
1. `custom-api-groq-com/meta-llama/llama-4-scout-17b-16e-instruct`
2. `minimax/minimax-m1`
3. `ollama/qwen3.5:35b`
4. `ollama/qwen2.5:14b`

Note: I did not verify MiniMax provider/auth readiness. If `minimax.io` OAuth isn’t already configured in OpenClaw, this will exist as config but won’t actually work until provider/plugin/auth support is present. If you want, I can check and wire that up next.
user: Conversation info (untrusted metadata):
```json
{
  "message_id": "620",
  "sender_id": "7727959008",
  "sender": "Andrey Derevianko",
  "timestamp": "Tue 2026-04-14 08:27 UTC"
}
```

Sender (untrusted metadata):
```json
{
  "label": "Andrey Derevianko (7727959008)",
  "id": "7727959008",
  "name": "Andrey Derevianko"
}
```

Yes. Is this version 2.7?
assistant: No — not from what I can see.

What’s configured right now is:
- `minimax/minimax-m1`

And the runtime status shows:
- OpenClaw `2026.4.12`
- fallback includes `minimax/minimax-m1`

I also confirmed MiniMax support exists in the environment, but auth is not configured yet:
- `minimax` → needs `MINIMAX_API_KEY`
- `minimax-portal` → needs `MINIMAX_OAUTH_TOKEN` or `MINIMAX_API_KEY`

So:
- **MiniMax is added as a fallback**
- **It is not specifically “version 2.7”**
- **It also isn’t authenticated yet**

If you want `2.7`, send me the exact MiniMax model/provider ID you want, and I’ll swap it in correctly.
