# AI Underwriting SaaS — Demo Capture Checklist

## Goal
Produce one clean beta-demo asset pack as soon as command-capable runtime access is available.

## Smoke-Test Steps
1. Run `python3 memory/underwriting_mvp.py`
2. Run `python3 -m py_compile underwriting_streamlit_app.py memory/underwriting_mvp.py`
3. Launch `streamlit run underwriting_streamlit_app.py`
4. Open one fix-and-flip sample deal
5. Open one multifamily sample deal
6. Run one custom weak-deal scenario

## Capture List
- Home screen / hero view
- Fix-and-flip GO result
- Multifamily GO result
- Weak-deal NO-GO result
- Full JSON/output panel

## Pass Criteria
- built-in tests pass
- app loads without errors
- each sample returns recommendation + metrics + flags
- screenshots are clean enough for beta outreach or landing-page proof

## Notes To Record
- runtime used
- exact commands run
- any install errors
- any UI bugs or confusing copy
- which screenshot is strongest for first beta demo
