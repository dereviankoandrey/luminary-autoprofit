#!/usr/bin/env python3
import sys, os
sys.path.insert(0, os.path.join(os.getcwd(), 'underwriting_deploy'))
from importlib import reload, import_module

um = import_module('underwriting_mvp')
reload(um)

print("=== ENGINE VALIDATION: July 12, 2026 ===")

r1 = um.analyze_deal({
    "deal_type": "fix_and_flip", "acquisition_price": 250000,
    "renovation_budget": 75000, "arv": 450000,
    "holding_period_months": 8, "financing_down_percent": 25,
    "financing_interest_rate": 9.5, "outro": ""
})
print("Test1 FF-GO: ROI={}%, Rec={}, Conf={}".format(
    r1["roi_percent"], r1["recommendation"], r1["confidence_score"]))

r2 = um.analyze_deal({
    "deal_type": "fix_and_flip", "acquisition_price": 350000,
    "renovation_budget": 100000, "arv": 480000,
    "holding_period_months": 12, "financing_down_percent": 30,
    "financing_interest_rate": 10, "outro": ""
})
print("Test2 FF-NOGO: ROI={}%, Rec={}".format(
    r2["roi_percent"], r2["recommendation"]))

r3 = um.analyze_deal({
    "deal_type": "multifamily", "acquisition_price": 2000000,
    "rental_income": 18000, "operating_expense_percent": 40,
    "financing_down_percent": 25, "financing_interest_rate": 7.5,
    "outro": ""
})
print("Test3 MF: CapRate={}%, CoC={}".format(
    r3["cap_rate_percent"], r3["cash_on_cash_return"]))

r4 = um.analyze_deal({
    "deal_type": "development", "land_cost": 500000,
    "hard_construction_costs": 2000000, "soft_costs": 300000,
    "holding_period_months": 24, "end_value": 3200000,
    "equity_invested": 750000, "outro": ""
})
print("Test4 Dev: ROI={}%, IRR={:.1f}%".format(
    r4["roi_percent"], r4["simplified_irr_percent"]))

r5 = um.analyze_deal({
    "deal_type": "fix_and_flip", "acquisition_price": 200000,
    "renovation_budget": 50000, "arv": 350000,
    "holding_period_months": 6, "outro": ""
})
print("Test5 Minimal: ROI={}%, Rec={}".format(
    r5["roi_percent"], r5["recommendation"]))

r6 = um.analyze_deal({
    "deal_type": "fix_and_flip", "acquisition_price": 420000,
    "renovation_budget": 115000, "arv": 680000,
    "holding_period_months": 7, "financing_down_percent": 25,
    "financing_interest_rate": 9.0, "outro": ""
})
print("Test6 Dallas FF: ROI={}%, Rec={}, Conf={}".format(
    r6["roi_percent"], r6["recommendation"], r6["confidence_score"]))

r7 = um.analyze_deal({
    "deal_type": "multifamily", "acquisition_price": 5000000,
    "rental_income": 32000, "operating_expense_percent": 45,
    "financing_down_percent": 25, "financing_interest_rate": 8.5,
    "outro": ""
})
print("Test7 MF-NOGO: CapRate={}%, DSCR={}, Rec={}".format(
    r7["cap_rate_percent"], r7["dscr"], r7["recommendation"]))

print("\n=== ALL VALIDATION TESTS COMPLETE ===")
