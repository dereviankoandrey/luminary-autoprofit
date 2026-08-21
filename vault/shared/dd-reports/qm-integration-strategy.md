# QM Integration Strategy — Underwriting Engine as a Skill/Tool

**Created:** 2026-08-01  
**Source signal:** YC QM (520 pts on HN, multiplayer agent harness for startups)  
**Purpose:** Map our underwriting engine to QM's skill/tool architecture so it can run inside multi-agent workspaces when investors/operators adopt QM

---

## Executive Summary

QM is infrastructure. It doesn't solve real estate underwriting. The opportunity isn't competing with QM — it's building the domain-specific intelligence that runs inside it. This document maps our existing underwriting engine to QM's skill/tool contract, producing a concrete integration path for when multi-agent platforms become standard (which YC is signaling will happen now).

---

## How QM Skills and Tools Work

QM has two extension points:

### 1. Skills (`sandbox/skills/<id>/SKILL.md`)
- Text-based procedural instructions that agents follow
- Include context, steps, decision trees
- Consumed by the agent loop as "how to do X"
- Can reference tools, external APIs, data sources

**Structure:**
```
sandbox/
  skills/
    deal-analyzer/
      SKILL.md          # Instructions for the agent
      engine.js         # Reference implementation (text asset)
      examples.json     # Sample inputs/outputs for training
```

### 2. Tools (`sandbox/tools/<id>/tool.json`)
- Executable binaries or scripts with defined interfaces
- Have structured input/output schemas
- Run in the sandbox's isolated environment
- Can produce deterministic outputs (our underwriting engine fits perfectly)

**Structure:**
```
sandbox/
  tools/
    underwriter/
      tool.json         # Schema definition: inputs, outputs, description
      engine            # Compiled binary or script entry point
```

---

## Mapping Our Underwriting Engine to QM Architecture

### Current State (Standalone)
Our underwriting engine (`underwriting_mvp.py`) accepts deal parameters and returns GO/REVIEW/NO-GO verdicts with full pro forma, risk assessment, and scenario analysis. It's a command-line tool with structured JSON input/output.

### Target State (QM Skill + Tool)

#### Layer 1: QM Tool (`underwriter` binary)
The Python engine gets wrapped as a QM tool with this interface:

```json
{
  "id": "real-estate-underwriter",
  "name": "Real Estate Deal Underwriter",
  "description": "Deterministic underwriting analysis for real estate deals. Accepts deal parameters and returns GO/REVIEW/NO-GO verdicts with full pro forma, risk assessment, and scenario analysis.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "dealType": {"type": "string", "enum": ["fix_and_flip", "multifamily", "commercial", "development"]},
      "address": {"type": "string"},
      "askingPrice": {"type": "number"},
      "beds": {"type": "integer"},
      "baths": {"type": "integer"},
      "sqft": {"type": "integer"},
      "yearBuilt": {"type": "integer"},
      "arvEstimate": {"type": "number"},
      "renovationBudget": {"type": "number"},
      "holdingPeriodMonths": {"type": "integer"}
    },
    "required": ["dealType", "askingPrice"]
  },
  "outputSchema": {
    "type": "object",
    "properties": {
      "verdict": {"type": "string", "enum": ["GO", "REVIEW", "NO-GO"]},
      "riskLevel": {"type": "string"},
      "metrics": {"type": "object"},
      "proForma": {"type": "object"},
      "scenarioAnalysis": {"type": "array"},
      "confidence": {"type": "number"}
    }
  },
  "securityPosture": "strict"
}
```

The `securityPosture: "strict"` ensures every underwriting call requires human approval before execution — matching the trust paradigm that financial decision-making demands.

#### Layer 2: QM Skill (`deal-analyzer`)
The skill provides operator-first procedural guidance on how to interpret results, what follow-up analysis to run, and how to present findings to investors/partners:

```markdown
# Deal Analyzer Skill

## Purpose
Analyze real estate deals using deterministic underwriting. Always verify inputs with the human before running analysis. Present results in operator-friendly format.

## When to Use
- Before making offers on investment properties
- During deal screening sessions with partners
- For due diligence on existing holdings
- When evaluating potential acquisitions

## Workflow
1. Gather deal parameters from listing data or owner
2. Run underwriter tool with collected parameters
3. Present verdict and key metrics in summary format
4. If REVIEW: run additional scenario analysis (stress test cap rates, interest rates)
5. If NO-GO: identify what parameters would change the verdict to GO

## Output Format
Always present results as:
- Verdict (GO/REVIEW/NO-GO) with one-sentence rationale
- Key metrics table (MAI, ARV, renovation budget, holding costs)
- Risk factors list
- Alternative paths if NO-GO
```

#### Layer 3: Shared Skill Distribution
QM supports shared skills with admin-gated promotion. Our underwriting skill could be distributed as:

1. **Direct install:** Investors/operators clone the skill repo and add to their QM deployment's `sandbox/skills/` directory
2. **Skill pack from git:** QM imports skills directly from a git repository (our DD Reports repo)
3. **Admin-gated org distribution:** For investor groups, all members get access via admin promotion

---

## Strategic Positioning Implications

### For Pillar 1: Real Estate Exit
Our underwriting engine becomes a portable skill that any operator can use during exit analysis — not just for buying deals but for validating portfolio valuations. This makes the skill valuable even if we never monetize it directly.

### For Pillar 2: TriTrack Global
This is the integration blueprint. TriTrack's architecture should be designed as QM-compatible skills from day one, not bolted on later. The `sandbox/` directory structure and tool.json schema become part of our product specification.

### For Pillar 3: 1B Agentic AI
The core thesis: **infrastructure will be commoditized; domain intelligence won't.** QM is infrastructure (agent harness, permissions, memory scoping). Our underwriting engine is domain intelligence (real estate deal analysis with deterministic math). The winning position isn't "better agent platform" — it's "most valuable skill running inside every agent platform."

---

## Next Steps (When Multi-Agent Becomes Standard)

1. **Build the wrapper:** Create `underwriter_tool.py` that reads JSON input, runs the engine, outputs JSON matching tool.json schema
2. **Package as QM skill:** Structure files in `sandbox/skills/real-estate-underwriter/` layout
3. **Test with QM CLI:** If QM is available, run `qm init`, add our skills/tools, verify agent consumption
4. **Publish to git:** Make the skill pack publicly available for any QM deployment to import

---

## Competitive Moat

| Competitor | Approach | Our Advantage |
|-----------|----------|---------------|
| DealCheck/PropStream | Consumer SaaS, cap-rate only | Full underwriting + deterministic math + operator narrative |
| Argus/Yardi | Enterprise, expensive, complex | Free, simple, agent-native, portable as a skill |
| Black-box AI tools | Probabilistic, non-auditable | Deterministic, traceable, auditable — maps to QM's Strict security posture |

Our moat isn't the underwriting engine itself (that can be cloned). It's:
1. **20 years of operator validation** behind every calculation and threshold
2. **Deterministic positioning** that aligns with the market's trust shift toward auditable AI
3. **Agent-native architecture** designed for multi-agent consumption from day one

---

*This is a strategic blueprint, not an immediate action item. The QM ecosystem will take months to mature. But designing our products as compatible skills now means we're ready when it does.*
