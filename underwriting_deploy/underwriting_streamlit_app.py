from pathlib import Path
import sys

import streamlit as st

sys.path.append(str(Path(__file__).resolve().parent / "memory"))
from underwriting_mvp import analyze_deal

SAMPLE_DEALS = {
    "Fix-and-Flip / Strong": {
        "property_type": "Fix-and-Flip",
        "acquisition_price": 200000,
        "renovation_budget": 50000,
        "arv": 350000,
        "holding_period_months": 6,
        "financing_down_percent": 25,
        "financing_interest_rate": 8.5,
        "other_costs": 15000,
    },
    "Fix-and-Flip / Weak": {
        "property_type": "Fix-and-Flip",
        "acquisition_price": 300000,
        "renovation_budget": 50000,
        "arv": 350000,
        "holding_period_months": 12,
        "financing_down_percent": 25,
        "financing_interest_rate": 8.5,
        "other_costs": 15000,
    },
    "Multifamily / Strong": {
        "property_type": "Multifamily",
        "acquisition_price": 1800000,
        "renovation_budget": 100000,
        "rental_income": 23200,
        "financing_down_percent": 30,
        "financing_interest_rate": 7.5,
        "operating_expense_percent": 40,
    },
}

st.set_page_config(page_title="AI Underwriting MVP", layout="centered")
st.title("AI Underwriting MVP")
st.caption("Zero-cost local wrapper for Luminary's underwriting logic")
st.info("For screening and scenario analysis only. Not investment, legal, or lending advice.")

sample_name = st.selectbox("Load sample deal", ["Custom"] + list(SAMPLE_DEALS.keys()))
defaults = SAMPLE_DEALS.get(sample_name, SAMPLE_DEALS["Fix-and-Flip / Strong"])
default_property_type = defaults["property_type"] if sample_name != "Custom" else "Fix-and-Flip"

st.markdown("### Input")
property_type = st.selectbox("Property Type", ["Fix-and-Flip", "Multifamily"], index=0 if default_property_type == "Fix-and-Flip" else 1)
acquisition_price = st.number_input("Acquisition Price", min_value=0, step=10000, value=int(defaults.get("acquisition_price", 200000)))
renovation_budget = st.number_input("Renovation Budget", min_value=0, step=5000, value=int(defaults.get("renovation_budget", 50000)))
financing_down_percent = st.number_input("Down Payment %", min_value=0, max_value=100, step=5, value=int(defaults.get("financing_down_percent", 25)))
financing_interest_rate = st.number_input("Interest Rate %", min_value=0.0, max_value=25.0, step=0.25, value=float(defaults.get("financing_interest_rate", 8.5)))

if property_type == "Fix-and-Flip":
    arv = st.number_input("ARV", min_value=0, step=10000, value=int(defaults.get("arv", 350000)))
    holding_period_months = st.number_input("Holding Period (Months)", min_value=1, max_value=60, value=int(defaults.get("holding_period_months", 6)))
    other_costs = st.number_input("Other Costs", min_value=0, step=1000, value=int(defaults.get("other_costs", 15000)))
    payload = {
        "property_type": property_type,
        "acquisition_price": acquisition_price,
        "renovation_budget": renovation_budget,
        "arv": arv,
        "holding_period_months": holding_period_months,
        "financing_down_percent": financing_down_percent,
        "financing_interest_rate": financing_interest_rate,
        "other_costs": other_costs,
    }
else:
    rental_income = st.number_input("Monthly Rental Income", min_value=0, step=1000, value=int(defaults.get("rental_income", 23200)))
    operating_expense_percent = st.number_input("Operating Expense %", min_value=0, max_value=100, step=5, value=int(defaults.get("operating_expense_percent", 40)))
    payload = {
        "property_type": property_type,
        "acquisition_price": acquisition_price,
        "renovation_budget": renovation_budget,
        "rental_income": rental_income,
        "financing_down_percent": financing_down_percent,
        "financing_interest_rate": financing_interest_rate,
        "operating_expense_percent": operating_expense_percent,
    }

st.markdown("### Offer framing")
st.write("- Free beta: 3 reports/month")
st.write("- Pro target: $197/mo unlimited reports")
st.write("- Premium target: $497/mo with custom review layer")

if st.button("Analyze Deal"):
    result = analyze_deal(payload)
    st.subheader(f"Recommendation: {result['recommendation']}")
    st.write(f"Risk Level: {result['risk_level']}")
    st.write(result["summary"])

    metrics = result.get("metrics", {})
    if metrics:
        st.markdown("### Key metrics")
        st.json(metrics)

    if result["green_flags"]:
        st.success("Green Flags")
        for flag in result["green_flags"]:
            st.write(f"- {flag}")

    if result["red_flags"]:
        st.error("Red Flags")
        for flag in result["red_flags"]:
            st.write(f"- {flag}")

    st.markdown("### Full output")
    st.json(result)
