#!/bin/bash
# TTS helper for Codex - converts text to Telegram-compatible Opus voice message
# Usage: tts_reply.sh "text to speak" output.ogg

TEXT="$1"
OUTPUT="$2"

if [ -z "$TEXT" ] || [ -z "$OUTPUT" ]; then
    echo "Usage: tts_reply.sh \"text\" output.ogg"
    exit 1
fi

TMPDIR="/tmp/tts_$$"
mkdir -p "$TMPDIR"

# Generate MP3 via edge-tts
python3 -c "
import edge_tts, asyncio, sys
text = sys.argv[1]
output = sys.argv[2]
async def main():
    communicate = edge_tts.Communicate(text, 'en-US-AriaNeural')
    await communicate.save(output)
asyncio.run(main())
" "$TEXT" "$TMPDIR/raw.mp3"

# Convert to Opus .ogg for Telegram
ffmpeg -y -i "$TMPDIR/raw.mp3" -acodec libopus -b:a 48k -ar 24000 -ac 1 "$OUTPUT" 2>/dev/null

# Cleanup
rm -rf "$TMPDIR"
