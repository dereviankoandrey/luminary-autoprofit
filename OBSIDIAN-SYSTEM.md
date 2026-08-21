# OBSIDIAN-SYSTEM.md

Layered memory system for all agents in this workspace.

## Layer 1: Built-in memory
Always-present compact files already injected by OpenClaw:
- SOUL.md
- USER.md
- TOOLS.md
- IDENTITY.md
- HEARTBEAT.md
- AGENTS.md
- MEMORY.md in main direct session only

Treat these as the tiny always-visible layer.

## Layer 2: Operating instructions
AGENTS.md remains the behavioral and workflow layer.
It now points agents to the shared vault structure below.

## Layer 3: Shared vault inside workspace
Use these files as the Obsidian-style working vault.

### Shared
- `vault/shared/user-profile.md`
- `vault/shared/project-state.md`
- `vault/shared/decisions-log.md`

### Agent-private
- `vault/agents/<agent>/working-context.md`
- `vault/agents/<agent>/mistakes.md`
- `vault/agents/<agent>/daily/YYYY-MM-DD.md`

## Layer 4: Session history
Past session transcripts remain the fallback recall layer.
Use memory search or session logs when needed.

## Read rules
On session start, read in this order when relevant:
1. SOUL.md
2. USER.md
3. shared vault files
4. your agent-private `working-context.md`
5. today and yesterday daily logs if they exist
6. MEMORY.md only in direct main session

## Write rules
Write to files, not just chat context.

### Always write when
- a task starts and has multiple steps
- a decision is made
- an assumption is confirmed or corrected
- a task completes
- you learn a recurring lesson or mistake

### During longer work
Checkpoint after roughly every 3 to 5 meaningful tool actions.
Keep entries short and factual.

## Compaction recovery
If context feels thin after compaction or a long gap:
- re-read shared vault files
- re-read your `working-context.md`
- re-read today’s private daily log

## Style
- keep shared files concise and durable
- keep private files operational and messy if needed
- move stable truths from daily notes into shared files
- do not duplicate large blocks across files
