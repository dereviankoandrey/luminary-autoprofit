# AI Real Estate Underwriting — Deterministic Math, Zero Hallucination

[Show HN](https://news.ycombinator.com/) → Product Hunt → Indie Hackers (launch-ready)

---

## The Problem This Solves

Real estate investors waste thousands on underwriting services ($197-$497/report), or they use Excel spreadsheets that break silently, or they run LLM-based tools that hallucinate cap rates and ROI projections. Every approach has a fundamental flaw: **you can't trust the output**.

This tool is different. It runs pure SQLite-backed Python on your own data. There are no LLMs involved. No prompts to tune. No "approximate" calculations. Just math that either works or doesn't, every single time — like a spreadsheet you can audit line-by-line.

## What You Get

- **Instant GO / REVIEW / NO-GO scoring** on fix-and-flip, multifamily, and development deals
- **Full financial metrics:** ROI, cap rate, DSCR, cash-on-cash return, equity multiple
- **Red flag analysis** with specific failure points (why this deal fails vs. why it works)
- **3 deal-type engines** — each with industry-standard calculation logic

## Why This Is Better Than Alternatives

| | Excel Template | Paid Underwriter ($200+/report) | LLM-Powered Tool | **This Engine** |
|---|---|---|---|---|
| Speed | Manual entry, hours per deal | 24-72hr turnaround | Sub-second | Sub-second |
| Accuracy | Easy to break formulas | Human error possible | Hallucinates numbers | Deterministic math = 100% reproducible |
| Cost | Free but fragile | $197-$500/report | Subscription ($50+/mo) + API costs | **Free during beta** → ~$49/mo |
| Auditability | You can read formulas | Black box deliverables | Can't audit the model | Every calculation is open-source Python/SQLite |
| Privacy | Your data stays local | Sent to underwriter | Poured into LLM API | Runs entirely on your machine or private server |

## How It Works

1. Upload deal parameters (purchase price, ARV, rehab costs, financing terms) — via web UI
2. Select deal type: Fix-and-Flip / Multifamily / Development
3. Instant report with scoring, full metrics, and red flags

No signup required for the beta. No data collected. No analytics fingerprinting you. The engine runs client-side in a Streamlit app or on your own machine via `pip install`.

## Pricing (Launch + Beta)

- **Beta Access:** Free — until September 30, 2026
- **Early Supporter Launch Price:** $49/month → $197/month normal price
- **Team License:** $149/month (up to 5 users, shared workspace)
- **Self-Hosted/OSS:** Available on request for institutional buyers

## Quick Deploy (If You Want to Run It Yourself)

### Streamlit Cloud (Free Hosting)

```bash
git clone this repo
# Go to streamlit.io/cloud → Connect GitHub → Import repo
# Streamlit auto-detects underwriting_streamlit_app.py as entry point
# Done. Live in < 2 minutes.
```

### Local Run (Offline, Zero Dependencies Beyond Python)

```bash
python3 -m pip install -r requirements.txt
PYTHONPATH=. streamlit run underwriting_streamlit_app.py
```

## Technical Details

- **Language:** Python 3.11+/3.12+
- **Database:** SQLite 3 (local, zero-config, self-contained)
- **Frontend:** Streamlit Community Cloud or local deployment
- **No external APIs required** — everything runs offline once installed
- **Tests:** 6/6 canonical calculation test cases pass (see `underwriting_mvp.py`)

## Open Source & Self-Serve

This is open-source (MIT license). Fork it, modify it, integrate it into your workflow. The engine is designed to be composable — pull just the math functions into your own tools without needing a web UI.

For commercial hosting / managed SaaS with multi-tenant access, contact us for a demo.

---

<div align="center">

**Built for operators who want numbers they can actually use.**  
No LLMs. No hallucinations. Just deterministic analysis that works.

[🚀 Live Demo →](https://streamlit.io/cloud) · [💻 GitHub](https://github.com/) · [📫 Contact](mailto:)

</div>
