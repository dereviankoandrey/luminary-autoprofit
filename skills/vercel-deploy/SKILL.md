---
name: vercel-deploy
description: Deploy the LBV site to Vercel production and retrieve recent Vercel logs.
metadata: {"openclaw":{"requires":{"bins":["node"]}}}
---

# vercel-deploy

Use this skill after a successful Git push to deploy `~/luminary-build/site` to
Vercel production.

## Usage

```bash
node ~/.openclaw/tools/vercel-deploy.js '{"op":"deploy_prod"}'
```

## Operations

Deploy production:

```bash
node ~/.openclaw/tools/vercel-deploy.js '{"op":"deploy_prod"}'
```

Fetch logs:

```bash
node ~/.openclaw/tools/vercel-deploy.js '{"op":"logs","path":"luminarybotventures.com","lines":50}'
```

## Rules

- Deploy only after Git changes are committed and pushed.
- The tool refuses to deploy with a dirty working tree.
- Report the returned deploy URL and ready state.
- If deploy fails, fetch logs or surface the deploy output tail.
- Never print Vercel tokens, auth files, project env files, or secrets.
