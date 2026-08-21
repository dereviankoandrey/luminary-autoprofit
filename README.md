# AI Underwriting MVP

Minimal deployable wrapper around `memory/underwriting_mvp.py`.

## Files

- `underwriting_streamlit_app.py` - Streamlit UI
- `memory/underwriting_mvp.py` - underwriting engine and built-in tests
- `requirements.txt` - Python dependency list

## Local Run

### Standard path

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
streamlit run underwriting_streamlit_app.py
```

### Current workspace fallback
If `python3 -m venv` fails because `ensurepip` / `python3.12-venv` is unavailable, use a local vendor directory instead:

```bash
mkdir -p .vendor
python3 -m pip install --target .vendor -r requirements.txt
PYTHONPATH=.vendor python3 -m streamlit run underwriting_streamlit_app.py --global.developmentMode false
```

Then open the local Streamlit URL shown in the terminal.

## Quick Verification

```bash
python3 memory/underwriting_mvp.py
python3 -m py_compile underwriting_streamlit_app.py memory/underwriting_mvp.py
```

If using the fallback vendor path:

```bash
PYTHONPATH=.vendor python3 memory/underwriting_mvp.py
PYTHONPATH=.vendor python3 -m py_compile underwriting_streamlit_app.py memory/underwriting_mvp.py
```

Expected built-in result: 4 demo cases, all matching their expected recommendation.

## Free-Tier Deployment Path

### Streamlit Community Cloud

1. Push these files to a GitHub repo.
2. Create a new Streamlit app.
3. Set the entrypoint to `underwriting_streamlit_app.py`.
4. Streamlit Cloud will install `requirements.txt` automatically.

### Render Web Service

If using Render instead:

- Build command: `pip install -r requirements.txt`
- Start command: `streamlit run underwriting_streamlit_app.py --server.port $PORT --server.address 0.0.0.0`

## Current Scope

This MVP supports:
- Fix-and-flip analysis
- Multifamily analysis
- GO / REVIEW / NO-GO recommendation
- Red flag and green flag surfacing
- Built-in sample deals for demo flows
- Basic pricing/disclaimer framing for beta packaging

## Next Useful Steps

1. Deploy to a free tier and run 3 UI smoke tests.
2. Capture screenshots of sample deal outputs.
3. Add usage tracking or lead capture.
4. Share demo link with 3 beta users.
