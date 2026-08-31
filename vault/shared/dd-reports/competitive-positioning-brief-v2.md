# Competitive Positioning Brief — Deterministic Underwriting vs. Alternatives

**Created:** 2026-07-23  
**Positioning Frame:** "Single-tool wins" (validated by Bento at 658pts/151c on HN)  
**Purpose:** Content for Show HN launch + LinkedIn replies + investor outreach follow-ups

---

## The Landscape: Three Tiers of Underwriting Tools

### Tier 1: Spreadsheet-Based (The Default)
| Tool | What It Does | Price | Deterministic? | Auditability |
|------|-------------|-------|----------------|--------------|
| Excel/Google Sheets | Blank canvas, user builds everything | Free–$20/mo | Yes (if formulas are correct) | Full — every cell visible |
| Pre-built templates | Fixed structure, limited customization | $5–$100 one-time | Yes (same caveat) | Full but fragile |

**Strengths:** Full control, zero cost, familiar interface.  
**Weaknesses:** Error-prone (typos break formulas), version chaos, no market context, requires financial modeling expertise, time-intensive to build and maintain.

### Tier 2: Consumer Underwriting Apps
| Tool | What It Does | Price | Deterministic? | Auditability |
|------|-------------|-------|----------------|--------------|
| DealCheck | Basic pro forma + comparable sales | $15–$30/mo | Partial (fixed formulas) | Limited — proprietary UI hides calculations |
| PropStream | Data aggregation + basic analysis | $99–$249/mo | Partial | Limited — data sources opaque, calculations simplified |
| BiggerPockets Calculator | Single-purpose calculators | Free–$16.50/mo | Yes (simple formulas) | Full but extremely limited scope |

**Strengths:** Faster than spreadsheets, some market data built in, mobile-friendly.  
**Weaknesses:** Simplified calculations (cap rate only for many tools), subscription lock-in, no scenario modeling depth, no professional report output, limited deal type support.

### Tier 3: Enterprise & Professional Platforms
| Tool | What It Does | Price | Deterministic? | Auditability |
|------|-------------|-------|----------------|--------------|
| Argus Enterprise | Commercial real estate financial modeling | $50–$150/user/mo + setup fees | Yes (industry standard) | Full but extremely complex — designed for analysts, not operators |
| Yardi Voyager | Property management + financials | $200+/user/mo | Yes | Full but enterprise-grade complexity |
| CoStar/Reis | Market data + analytics | $500–$2000+/mo | N/A (data provider) | Data sources documented, analysis requires separate tools |

**Strengths:** Industry-standard accuracy, comprehensive features, institutional adoption.  
**Weaknesses:** Enterprise pricing ($1K–$24K/year), steep learning curve, overkill for deal-by-deal evaluation, slow to update.

### Tier 4: AI/LLM-Based Tools (The New Category)
| Tool | What It Does | Price | Deterministic? | Auditability |
|------|-------------|-------|----------------|--------------|
| Various "AI underwriting" startups | Natural language deal analysis | $20–$100/mo | No — LLM-generated | None — outputs are probabilistic, not auditable |
| Custom GPT prompts | User-built AI workflows | $20/mo (ChatGPT) | No | None by design |

**Strengths:** Fast natural language interface, can process unstructured data.  
**Weaknesses:** Hallucination risk on calculations, no audit trail, confidence ≠ accuracy (cognitive surrender research: 3x less accurate but 2x more confident), vendor lock-in to specific AI provider.

---

## Where Deterministic Underwriting Sits

```
         Low ────────────────────── High
         |                          |
Audit    │ Tier 1 (Spreadsheets)    │ Argus/Yardi
Ability  │ Tier 4 (AI/LLM tools)    │ Enterprise platforms
         │                          │
         │ Tier 2 (Consumer apps)   │
Speed    │                          │
         │                          │
         └──────────────────────────┘
         Low Cost                   High Cost
```

**Our positioning:** Speed of consumer apps + auditability of spreadsheets + deterministic accuracy at enterprise-grade, without the enterprise price tag or learning curve.

---

## Response Templates for Competitive Questions

### "How is this different from DealCheck?"

> DealCheck uses fixed formulas — which is good. But it's limited to basic metrics (cap rate, cash-on-cash) and doesn't go into full underwriting depth: no scenario modeling, no sensitivity analysis, no market context integration, no professional report generation.
> 
> This does all of that in seconds with deterministic math you can audit. Same approach as DealCheck's formulas, but the full analytical suite — not just a calculator.

### "Why not just use Excel?"

> If your Excel model is correct and up-to-date, it works fine. The problem is: most people aren't maintaining their models. They're using outdated templates, making typos in formulas, or building from scratch for each deal (which takes hours).
> 
> This gives you the same deterministic math as a correctly-built spreadsheet — but it's always correct, always current, and runs in seconds instead of hours. Plus every calculation is visible and auditable in one place.

### "Is this an AI tool?"

> The underwriting engine isn't AI at all. It uses fixed financial formulas (NPV, IRR, equity multiple, DSCR) computed deterministically from your inputs. Every number can be traced to its source formula.
> 
> There are optional AI elements for market context and narrative generation — but those are explicitly labeled as such and never used for calculations. The math is math. Not probability.

### "What about Argus?"

> Argus is the gold standard for commercial real estate financial modeling in institutional settings. It's also enterprise-grade complexity, $50–$150/user/month, and requires training to use effectively.
> 
> This tool targets a different use case: deal-by-deal evaluation by operators who need speed AND accuracy without an analyst team. Think of it as the "pre-screen" that tells you which deals are worth the deep-dive into Argus (or deeper analysis).

### "How do I know the calculations are correct?"

> That's the whole point — you can verify them yourself in 30 seconds. Every formula is visible, every input field has a label explaining what it represents, and the outputs trace directly back to your inputs through transparent math.
> 
> Unlike AI tools that give you an answer with no way to check how they got there, this tool shows its work. That's not just better UX — it's fundamental to financial decision-making where wrong answers cost real money.

---

## Key Differentiator Summary for Marketing Use

**One-liner:** "Deterministic underwriting with full auditability — the speed of a tool, the accuracy of math."

**Elevator pitch:** "Built by a 20-year developer/CFO who was tired of choosing between fast-but-unreliable AI tools and reliable-but-slow spreadsheets. This sits in the middle: deterministic calculations you can verify, with the speed and UX that operators actually need."

**Trust signal:** "Every calculation auditable. Zero black box. If you can't verify it yourself, you shouldn't be making financial decisions on it."

---

*This brief is designed for immediate use in replies to competitors, investor conversations, and marketing materials. All positioning follows the operator-first narrative established in prior drafts.*
