---
name: git-ops
description: Pull, inspect, commit, and push changes to the LBV site repo on master.
metadata: {"openclaw":{"requires":{"bins":["node","git"]}}}
---

# git-ops

Use this skill to work with the LBV site repo at `~/luminary-build/site` on
branch `master`.

## Usage

```bash
node ~/.openclaw/tools/git-ops.js '{"op":"status"}'
```

## Operations

Pull latest:

```bash
node ~/.openclaw/tools/git-ops.js '{"op":"pull"}'
```

Check status:

```bash
node ~/.openclaw/tools/git-ops.js '{"op":"status"}'
```

Commit and push specific files:

```bash
node ~/.openclaw/tools/git-ops.js '{"op":"commit_and_push","files":["src/app/page.tsx"],"message":"fix: adjust hero copy"}'
```

## Rules

- Only use `~/luminary-build/site`.
- Only use branch `master`.
- Run `status` before `commit_and_push`.
- Stage only the files supplied in `files`.
- Never commit `.env` files, credentials, API keys, or generated secrets.
- The tool refuses to push if the working tree has more than 50 changed files.
- Commit messages must use conventional commit format.
