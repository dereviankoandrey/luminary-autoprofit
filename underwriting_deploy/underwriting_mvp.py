#!/usr/bin/env python3
"""
AI Real Estate Underwriting Calculator - MVP
Single-file prototype for rapid validation

Usage: python underwriting_mvp.py

This script:
1. Accepts property inputs (via JSON or command line)
2. Calculates key metrics using Andrey's framework
3. Provides GO/NO-GO/REVIEW recommendation
4. Identifies red flags and green flags
"""

import json
import sys

# Andrey's Underwriting Framework Thresholds
THRESHOLDS = {
    "fix_and_flip": {
        "max_purchase_to_arv": 0.85,  # Purchase should be ≤ 85% of ARV
        "min_roi": 0.20,  # Minimum 20% ROI
        "max_hold_months": 12,  # Maximum 12 months holding
        "max_hold_months_risky": 18,  # >18 months is risky
        "min_roi_warning": 0.15  # <15% is NO-GO
    },
    "multifamily": {
        "min_cap_rate": 0.05,  # Minimum 5% cap rate
        "min_cash_on_cash": 0.08,  # Minimum 8% cash-on-cash
        "min_dscr": 1.25,  # Minimum DSCR 1.25
        "min_dscr_warning": 1.10,  # <1.10 is NO-GO
        "min_cap_rate_warning": 0.04  # <4% is NO-GO
    },
    "development": {
        "min_irr": 0.18,  # Minimum 18% IRR
        "min_equity_multiple": 2.0,  # Minimum 2.0x equity multiple
        "min_irr_warning": 0.15,  # <15% is NO-GO
        "min_equity_multiple_warning": 1.5,  # <1.5x is NO-GO
        "max_hold_months": 36  # Maximum 36 months
    }
}


def calculate_fix_and_flip(data):
    """Calculate metrics for fix-and-flip deals."""
    acquisition = data.get("acquisition_price", 0)
    reno = data.get("renovation_budget", 0)
    arv = data.get("arv", 0)
    holding_months = data.get("holding_period_months", 0)
    down_pct = data.get("financing_down_percent", 0.25) / 100
    interest_rate = data.get("financing_interest_rate", 0.085) / 100
    other_costs = data.get("other_costs", 0)
    
    # Financing
    loan_amount = acquisition * (1 - down_pct)
    monthly_interest = loan_amount * interest_rate / 12
    holding_costs = monthly_interest * holding_months
    
    # Total project cost
    total_cost = acquisition + reno + other_costs + holding_costs
    
    # Profit and ROI
    profit = arv - total_cost
    roi = profit / total_cost if total_cost > 0 else 0
    
    return {
        "total_project_cost": round(total_cost, 2),
        "profit": round(profit, 2),
        "roi_percent": round(roi * 100, 2),
        "holding_cost": round(holding_costs, 2),
        "purchase_to_arv_ratio": round(acquisition / arv, 4) if arv > 0 else 0
    }


def calculate_development(data):
    """Calculate metrics for development deals (ground-up, mixed-use, subdivision)."""
    land_cost = data.get("land_cost", data.get("acquisition_price", 0))
    hard_costs = data.get("hard_construction_costs", data.get("construction_budget", 0))
    soft_costs = data.get("soft_costs", 0)
    financing_costs = data.get("financing_costs", 0)
    sales_commission_pct = data.get("sales_commission_percent", 0.06) / 100
    holding_months = data.get("holding_period_months", 12)
    end_value = data.get("end_value", data.get("total_revenue", data.get("gross_revenue", 0)))
    equity_invested = data.get("equity_invested", 0)
    debt_percent = data.get("debt_percent", 0.70) / 100
    interest_rate = data.get("interest_rate", 0.085) / 100
    units = data.get("units", data.get("total_units", 0))
    avg_unit_price = data.get("avg_unit_price", 0)
    
    # If end_value not provided but we have units + avg price, calculate it
    if end_value == 0 and units > 0 and avg_unit_price > 0:
        end_value = units * avg_unit_price
    
    # If soft_costs not provided, estimate at 15% of hard costs
    if soft_costs == 0 and hard_costs > 0:
        soft_costs = hard_costs * 0.15
    
    # If financing_costs not provided, estimate
    if financing_costs == 0:
        loan_amount = (land_cost + hard_costs + soft_costs) * debt_percent
        financing_costs = loan_amount * interest_rate * (holding_months / 12)
    
    # Sales commissions
    sales_commissions = end_value * sales_commission_pct
    
    # Total project cost
    total_cost = land_cost + hard_costs + soft_costs + financing_costs + sales_commissions
    
    # Developer profit
    profit = end_value - total_cost
    
    # ROI (on total cost)
    roi = profit / total_cost if total_cost > 0 else 0
    
    # Equity calculations
    if equity_invested > 0:
        equity_multiple = end_value / (total_cost * (1 - debt_percent)) if total_cost > 0 and (1 - debt_percent) > 0 else 0
        return_on_equity = profit / equity_invested if equity_invested > 0 else 0
    else:
        equity_invested = total_cost * (1 - debt_percent)
        equity_multiple = end_value / equity_invested if equity_invested > 0 else 0
        return_on_equity = profit / equity_invested if equity_invested > 0 else 0
    
    # Simplified IRR approximation (profit / equity / years * adjustment)
    # This is a rough proxy; true IRR requires cash flow timing
    hold_years = holding_months / 12 if holding_months > 0 else 1
    simplified_irr = return_on_equity / hold_years if hold_years > 0 else 0
    
    # Cost per unit if applicable
    cost_per_unit = total_cost / units if units > 0 else 0
    revenue_per_unit = end_value / units if units > 0 else 0
    
    return {
        "total_project_cost": round(total_cost, 2),
        "end_value": round(end_value, 2),
        "profit": round(profit, 2),
        "roi_percent": round(roi * 100, 2),
        "equity_invested": round(equity_invested, 2),
        "equity_multiple": round(equity_multiple, 2),
        "return_on_equity_percent": round(return_on_equity * 100, 2),
        "simplified_irr_percent": round(simplified_irr * 100, 2),
        "holding_months": holding_months,
        "cost_per_unit": round(cost_per_unit, 2) if units > 0 else None,
        "revenue_per_unit": round(revenue_per_unit, 2) if units > 0 else None,
        "sales_commissions": round(sales_commissions, 2),
        "financing_costs": round(financing_costs, 2),
    }


def calculate_multifamily(data):
    """Calculate metrics for multifamily/income properties."""
    acquisition = data.get("acquisition_price", 0)
    reno = data.get("renovation_budget", 0)
    monthly_rent = data.get("rental_income", 0)
    down_pct = data.get("financing_down_percent", 0.25) / 100
    interest_rate = data.get("financing_interest_rate", 0.07) / 100
    operating_expense_pct = data.get("operating_expense_percent", 0.40) / 100
    
    # Annual income and expenses
    annual_gross = monthly_rent * 12
    operating_expenses = annual_gross * operating_expense_pct
    noi = annual_gross - operating_expenses
    
    # Cap rate
    cap_rate = noi / acquisition if acquisition > 0 else 0
    
    # Financing
    loan_amount = acquisition * (1 - down_pct)
    monthly_payment = loan_amount * (interest_rate / 12) / (1 - (1 + interest_rate / 12) ** -360) if interest_rate > 0 else 0
    annual_debt_service = monthly_payment * 12
    
    # Cash flow and cash-on-cash
    annual_cash_flow = noi - annual_debt_service
    cash_invested = acquisition * down_pct
    cash_on_cash = annual_cash_flow / cash_invested if cash_invested > 0 else 0
    
    # DSCR
    dscr = noi / annual_debt_service if annual_debt_service > 0 else 0
    
    return {
        "annual_gross_income": round(annual_gross, 2),
        "operating_expenses": round(operating_expenses, 2),
        "noi": round(noi, 2),
        "cap_rate_percent": round(cap_rate * 100, 2),
        "annual_debt_service": round(annual_debt_service, 2),
        "annual_cash_flow": round(annual_cash_flow, 2),
        "cash_on_cash_return": round(cash_on_cash * 100, 2),
        "dscr": round(dscr, 2)
    }


def analyze_deal(data):
    """Main analysis function - applies framework and returns recommendation."""
    property_type = data.get("property_type", "").lower()
    
    red_flags = []
    green_flags = []
    
    # Calculate metrics based on property type
    if "fix" in property_type or "flip" in property_type:
        metrics = calculate_fix_and_flip(data)
        thresholds = THRESHOLDS["fix_and_flip"]
        
        # Apply thresholds
        purchase_ratio = metrics["purchase_to_arv_ratio"]
        if purchase_ratio > 0.90:
            red_flags.append(f"Purchase price ({purchase_ratio*100:.0f}% of ARV) exceeds 90% threshold")
        elif purchase_ratio <= thresholds["max_purchase_to_arv"]:
            green_flags.append(f"Strong purchase spread ({purchase_ratio*100:.0f}% of ARV)")
        
        if metrics["roi_percent"] < thresholds["min_roi_warning"] * 100:
            red_flags.append(f"ROI ({metrics['roi_percent']:.1f}%) below minimum threshold ({thresholds['min_roi_warning']*100:.0f}%)")
        elif metrics["roi_percent"] >= thresholds["min_roi"] * 100:
            green_flags.append(f"Strong ROI ({metrics['roi_percent']:.1f}%)")
        
        if metrics["holding_cost"] / metrics["total_project_cost"] > 0.40:
            red_flags.append("Financing/holding costs exceed 40% of total project")
        
        # Renovation budget check
        if data.get("renovation_budget", 0) > 0:
            reno_ratio = data["renovation_budget"] / data.get("acquisition_price", 1)
            if reno_ratio < 0.15:
                red_flags.append(f"Renovation budget ({reno_ratio*100:.0f}%) may be underestimated")
            elif reno_ratio > 0.60:
                red_flags.append(f"Renovation budget ({reno_ratio*100:.0f}%) unusually high - risk of cost overruns")
            else:
                green_flags.append(f"Renovation budget at reasonable {reno_ratio*100:.0f}% of acquisition")
    
    elif "multi" in property_type or "income" in property_type or "apartment" in property_type:
        metrics = calculate_multifamily(data)
        thresholds = THRESHOLDS["multifamily"]
        
        if metrics["cap_rate_percent"] < thresholds["min_cap_rate_warning"] * 100:
            red_flags.append(f"Cap rate ({metrics['cap_rate_percent']:.2f}%) below minimum threshold ({thresholds['min_cap_rate_warning']*100:.0f}%)")
        elif metrics["cap_rate_percent"] >= thresholds["min_cap_rate"] * 100:
            green_flags.append(f"Solid cap rate ({metrics['cap_rate_percent']:.2f}%)")
        
        if metrics["dscr"] < thresholds["min_dscr_warning"]:
            red_flags.append(f"DSCR ({metrics['dscr']:.2f}) below minimum threshold ({thresholds['min_dscr_warning']})")
        elif metrics["dscr"] >= thresholds["min_dscr"]:
            green_flags.append(f"Strong DSCR ({metrics['dscr']:.2f})")
        
        if metrics["cash_on_cash_return"] < 0:
            red_flags.append("Negative cash flow in Year 1")
        elif metrics["cash_on_cash_return"] >= thresholds["min_cash_on_cash"] * 100:
            green_flags.append(f"Positive cash-on-cash return ({metrics['cash_on_cash_return']:.2f}%)")
    
    # Development deals
    elif "development" in property_type or "mixed-use" in property_type or "subdivision" in property_type:
        metrics = calculate_development(data)
        thresholds = THRESHOLDS["development"]
        
        if metrics["simplified_irr_percent"] < thresholds["min_irr_warning"] * 100:
            red_flags.append(f"Simplified IRR ({metrics['simplified_irr_percent']:.1f}%) below minimum threshold ({thresholds['min_irr_warning']*100:.0f}%)")
        elif metrics["simplified_irr_percent"] >= thresholds["min_irr"] * 100:
            green_flags.append(f"Strong IRR ({metrics['simplified_irr_percent']:.1f}%)")
        
        if metrics["equity_multiple"] < thresholds["min_equity_multiple_warning"]:
            red_flags.append(f"Equity multiple ({metrics['equity_multiple']:.2f}x) below minimum threshold ({thresholds['min_equity_multiple_warning']}x)")
        elif metrics["equity_multiple"] >= thresholds["min_equity_multiple"]:
            green_flags.append(f"Strong equity multiple ({metrics['equity_multiple']:.2f}x)")
        
        if metrics["roi_percent"] < 0:
            red_flags.append(f"Negative project ROI ({metrics['roi_percent']:.1f}%)")
        elif metrics["roi_percent"] >= 0.15:
            green_flags.append(f"Positive project ROI ({metrics['roi_percent']:.1f}%)")
        
        # Holding period risk
        if metrics["holding_months"] > thresholds["max_hold_months"]:
            red_flags.append(f"Extended holding period ({metrics['holding_months']} months) — construction/absorption risk")
        
        # Cost-per-unit sanity (if units provided)
        if metrics.get("cost_per_unit") and metrics.get("revenue_per_unit"):
            margin_per_unit = (metrics["revenue_per_unit"] - metrics["cost_per_unit"]) / metrics["revenue_per_unit"]
            if margin_per_unit < 0.15:
                red_flags.append(f"Thin per-unit margin ({margin_per_unit*100:.1f}%) — pricing/absorption risk")
            elif margin_per_unit >= 0.25:
                green_flags.append(f"Healthy per-unit margin ({margin_per_unit*100:.1f}%)")
    
    else:
        # Default/unknown property type - basic analysis
        metrics = {"note": "Property type not recognized - using basic analysis"}
        red_flags.append("Unknown property type - manual review recommended")
    
    # Determine recommendation
    # Critical red flags always trigger NO-GO
    critical_red_flags = [f for f in red_flags if "below minimum" in f.lower() or "negative" in f.lower() or "exceeds 90" in f.lower()]
    
    if len(critical_red_flags) >= 1:
        recommendation = "NO-GO"
        risk_level = "High"
    elif len(red_flags) >= 2:
        recommendation = "REVIEW"
        risk_level = "Medium"
    elif len(red_flags) >= 1:
        recommendation = "REVIEW"
        risk_level = "Medium"
    else:
        recommendation = "GO"
        risk_level = "Low"
    
    # Build summary
    summary = f"Deal analysis for {data.get('property_type', 'unknown property')}. "
    if recommendation == "GO":
        summary += f"Metrics meet or exceed Andrey's framework thresholds. {len(green_flags)} positive indicators identified."
    elif recommendation == "REVIEW":
        summary += f"Deal has some concerns requiring manual review. {len(red_flags)} red flags identified."
    else:
        summary += f"Deal fails Andrey's framework thresholds. {len(red_flags)} red flags identified."
    
    return {
        "property_type": data.get("property_type", "Unknown"),
        "metrics": metrics,
        "recommendation": recommendation,
        "risk_level": risk_level,
        "red_flags": red_flags,
        "green_flags": green_flags,
        "summary": summary,
        "confidence_score": max(0, 100 - len(red_flags) * 15 + len(green_flags) * 5)
    }


def main():
    """Main entry point - accept JSON input or run demo tests."""
    
    if len(sys.argv) > 1:
        # Read from command line argument (JSON string)
        try:
            data = json.loads(sys.argv[1])
        except json.JSONDecodeError:
            print("Error: Invalid JSON input")
            sys.exit(1)
    else:
        # Run demo tests
        print("=" * 60)
        print("AI Real Estate Underwriting Calculator - MVP Demo")
        print("=" * 60)
        print()
        
        test_cases = [
            {
                "name": "Test 1: Good Fix-and-Flip",
                "data": {
                    "property_type": "Fix-and-Flip",
                    "acquisition_price": 200000,
                    "renovation_budget": 50000,
                    "arv": 350000,
                    "holding_period_months": 6,
                    "financing_down_percent": 25,
                    "financing_interest_rate": 8.5,
                    "other_costs": 15000
                },
                "expected": "GO"
            },
            {
                "name": "Test 2: Bad Fix-and-Flip",
                "data": {
                    "property_type": "Fix-and-Flip",
                    "acquisition_price": 300000,
                    "renovation_budget": 50000,
                    "arv": 350000,
                    "holding_period_months": 12,
                    "financing_down_percent": 25,
                    "financing_interest_rate": 8.5,
                    "other_costs": 15000
                },
                "expected": "NO-GO"
            },
            {
                "name": "Test 3: Strong Multifamily",
                "data": {
                    "property_type": "Multifamily",
                    "acquisition_price": 2000000,
                    "renovation_budget": 200000,
                    "rental_income": 40000,
                    "financing_down_percent": 30,
                    "financing_interest_rate": 7.0,
                    "operating_expense_percent": 40
                },
                "expected": "GO"
            },
            {
                "name": "Test 4: Marginal Multifamily",
                "data": {
                    "property_type": "Multifamily",
                    "acquisition_price": 1500000,
                    "renovation_budget": 150000,
                    "rental_income": 12000,
                    "financing_down_percent": 25,
                    "financing_interest_rate": 7.5,
                    "operating_expense_percent": 45
                },
                "expected": "NO-GO"
            },
            {
                "name": "Test 5: Strong Development (Mixed-Use)",
                "data": {
                    "property_type": "Development",
                    "land_cost": 5000000,
                    "hard_construction_costs": 35000000,
                    "end_value": 65000000,
                    "units": 280,
                    "holding_period_months": 24,
                    "debt_percent": 70,
                    "interest_rate": 8.5,
                },
                "expected": "GO"
            },
            {
                "name": "Test 6: Weak Development",
                "data": {
                    "property_type": "Development",
                    "land_cost": 8000000,
                    "hard_construction_costs": 40000000,
                    "end_value": 45000000,
                    "units": 300,
                    "holding_period_months": 36,
                    "debt_percent": 70,
                    "interest_rate": 9.0,
                },
                "expected": "NO-GO"
            }
        ]
        
        results = []
        for test in test_cases:
            print(f"\n{test['name']}")
            print("-" * 40)
            result = analyze_deal(test["data"])
            results.append({
                "name": test["name"],
                "result": result,
                "expected": test["expected"],
                "match": result["recommendation"] == test["expected"]
            })
            
            print(f"Recommendation: {result['recommendation']}")
            print(f"Risk Level: {result['risk_level']}")
            print(f"Summary: {result['summary']}")
            
            if result['green_flags']:
                print(f"Green Flags: {', '.join(result['green_flags'])}")
            
            if result['red_flags']:
                print(f"Red Flags: {', '.join(result['red_flags'])}")
            
            print(f"Match Expected: {'✓' if result['recommendation'] == test['expected'] else '✗'}")
        
        print("\n" + "=" * 60)
        print("DEMO SUMMARY")
        print("=" * 60)
        matches = sum(1 for r in results if r['match'])
        total = len(results)
        print(f"Test Cases: {total}")
        print(f"Matches Expected: {matches}/{total} ({matches/total*100:.0f}%)")
        
        if matches == total:
            print("\n✓ All tests passed! Framework logic validated.")
        else:
            print("\n✗ Some tests failed. Review framework thresholds.")
        
        return
    
    # If JSON input provided, process it
    result = analyze_deal(data)
    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
