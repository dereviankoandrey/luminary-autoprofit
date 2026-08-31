# Hermes Serendipity ExO Skill Install Diagnostic

Date: 2026-06-06
Task: MemoryHub #201
Status: Blocked on missing target Hermes profile on Node-01.

## Source Bundle

The ExO skill bundle is present locally at:

```text
/home/andrey/building-an-exo-skill_v20/
```

Observed contents include:

- `SKILL.md`
- `config.toml`
- `schema.json`
- `references/`
- `templates/`
- nested duplicate bundle directory `building-an-exo-skill_v20/`

## Target Search

I searched for a Serendipity Hermes profile/home on Node-01:

```bash
find /home/andrey -type d -path '*/profiles/serendipity*'
find /home/andrey -type f \( -name 'config.yaml' -o -name 'SOUL.md' -o -name 'AGENTS.md' \) | rg 'serendipity|hermes/profiles|spark-hermes/profiles|\\.hermes/profiles'
```

Result:

- No `/home/andrey/.hermes/profiles/serendipity` profile found.
- No `serendipity` Hermes profile config found elsewhere.
- The only separate Hermes service profile found on Node-01 was Spark:
  - `/home/andrey/spark-hermes/profiles/spark/config.yaml`
  - `/home/andrey/spark-hermes/profiles/spark/SOUL.md`

## Why Install Was Not Performed

Installing the ExO skill into global `~/.hermes/skills` or the Spark profile would not satisfy #201. The task explicitly targets the Hermes `serendipity` profile. Since that profile does not exist on Node-01, there is no safe target path to modify.

## Required Next Step

Create or expose the actual Serendipity Hermes profile first, then install the bundle into that profile's `skills/` directory and register it per Hermes conventions.

Expected target shape once available:

```text
<SERENDIPITY_HERMES_HOME>/
  config.yaml
  SOUL.md
  skills/
    building-an-exo-skill_v20/
      SKILL.md
      config.toml
      schema.json
      references/
      templates/
```

If the intended Serendipity runtime is on another node, copy from `/home/andrey/building-an-exo-skill_v20/` on Node-01 to that node/profile and run the profile-local Hermes skill audit/check there.
