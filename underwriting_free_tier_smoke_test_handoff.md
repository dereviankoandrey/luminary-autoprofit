# AI Underwriting SaaS — Free-Tier Smoke-Test Handoff

## Goal
Route around the current local exec blocker by using either a validated local fallback runtime or a command-capable free-tier runtime to produce one clean demo proof pack.

## Current Status
### Local validation completed on 2026-05-05
- `requirements.txt` installed successfully into workspace-local `.vendor/`
- `underwriting_mvp.py` built-in demo tests passed 4/4
- Streamlit booted successfully with `PYTHONPATH=.vendor`
- Local HTTP check returned `200 OK`

Reference: `underwriting_local_validation_report_2026-05-05.md`

## Local fallback run path
```bash
cd /home/andrey/.openclaw/workspace
python3 -m pip install --target .vendor -r requirements.txt
PYTHONPATH=.vendor python3 memory/underwriting_mvp.py
PYTHONPATH=.vendor python3 -m streamlit run underwriting_streamlit_app.py --global.developmentMode false --server.headless true --server.port 8765 --server.address 127.0.0.1
```

## Fastest $0 Paths
### Option A — Streamlit Community Cloud
Best if a GitHub repo can be used quickly.

### Option B — Render Web Service
Best if Streamlit Cloud is unavailable but a simple web service can be created.

## Minimum File Set
- `underwriting_streamlit_app.py`
- `memory/underwriting_mvp.py`
- `requirements.txt`
- `README.md`

## Exact Deploy Sequence
1. Put the minimum file set in a repo or uploadable project folder.
2. Create a free-tier Streamlit or Render app.
3. Set entrypoint/start command:
   - Streamlit Cloud: `underwriting_streamlit_app.py`
   - Render: `streamlit run underwriting_streamlit_app.py --server.port $PORT --server.address 0.0.0.0`
4. Wait for dependency install from `requirements.txt`.
5. Open the deployed app.
6. Run the smoke-test checklist below.

## Smoke-Test Checklist
1. Confirm home screen loads.
2. Run one fix-and-flip sample deal.
3. Run one multifamily sample deal.
4. Run one weak custom scenario.
5. Confirm each run returns recommendation + metrics + flags.

## Screenshot Pack To Capture
- home screen
- fix-and-flip GO result
- multifamily GO result
- weak-deal NO-GO result
- full output/JSON view

## Pass / Fail
### Pass if
- app loads without runtime errors
- sample deals return expected outputs
- screenshots are clean enough for `underwriting_beta_landing_page.md`

### Fail if
- dependency install breaks
- app fails to boot
- outputs differ from the built-in expected recommendation logic
- screenshots are too rough to use in beta outreach

## What To Log After Smoke Test
- runtime used
- deploy URL
- any install/runtime errors
- strongest screenshot
- exact blocker if it still fails

## Next Action After Pass
Insert the strongest screenshot set into `underwriting_beta_landing_page.md` and use `underwriting_beta_demo_script.md` for the first 3 beta demos.

## Estimated Human Time
- 20-40 minutes if repo/runtime access is available
- near-zero additional spend on the free tier
