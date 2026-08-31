# Voice Message Rule for Codex (Main Agent)

**HARD RULE:** Every message sent to Andrey via Telegram must be accompanied by a voice note (.ogg) containing a spoken version of the message.

## Implementation
1. Generate the text response
2. Use TTS to create an .ogg voice note of the text
3. Send both text and voice note together

## TTS Setup
- Use existing TTS pipeline from /home/andrey/.openclaw/workspace/transcripts/codex_voice_setup.ogg
- Output format: .ogg (Opus, mono, 24000 Hz)
- Compatible with Telegram voice messages
