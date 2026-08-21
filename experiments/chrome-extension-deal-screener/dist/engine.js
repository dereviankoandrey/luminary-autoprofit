#!/usr/bin/env node
/**
 * Underwriting Engine — Ported from Python to Node.js/JS
 * Zero dependencies. Pure math. Fully auditable.
 * 
 * Run: node engine.js          → run all 6 test cases (parity check)
 *      node engine.js <json>   → analyze single deal from JSON input
 */

// ─── Thresholds ──────────────────────────────────────────────

const THRESHOLDS = {
  fix_and_flip: {
    max_purchase_to_arv: 0.85,
    min_roi: 0.20,
    max_hold_months: 12,
    max_hold_months_risky: 18,
    min_roi_warning: 0.15,
  },
  multifamily: {
    min_cap_rate: 0.05,
    min_cash_on_cash: 0.08,
    min_dscr: 1.25,
    min_dscr_warning: 1.10,
    min_cap_rate_warning: 0.04,
  },
  development: {
    min_irr: 0.18,
    min_equity_multiple: 2.0,
    min_irr_warning: 0.15,
    min_equity_multiple_warning: 1.5,
    max_hold_months: 36,
  },
};

// ─── Fix & Flip ──────────────────────────────────────────────

function calculateFixAndFlip(d) {
  const acquisition = d.acquisition_price || 0;
  const reno = d.renovation_budget || 0;
  const arv = d.arv || 0;
  const holdMonths = d.holding_period_months || 0;
  const downPct = (d.financing_down_percent || 25) / 100;
  const intRate = (d.financing_interest_rate || 8.5) / 100;
  const otherCosts = d.other_costs || 0;

  const loanAmt = acquisition * (1 - downPct);
  const monthlyInterest = loanAmt * intRate / 12;
  const holdingCosts = monthlyInterest * holdMonths;
  const totalCost = acquisition + reno + otherCosts + holdingCosts;
  const profit = arv - totalCost;
  const roi = totalCost > 0 ? profit / totalCost : 0;

  return {
    total_project_cost: Math.round(totalCost * 100) / 100,
    profit: Math.round(profit * 100) / 100,
    roi_percent: Math.round(roi * 10000) / 100,
    holding_cost: Math.round(holdingCosts * 100) / 100,
    purchase_to_arv_ratio: arv > 0 ? Math.round((acquisition / arv) * 10000) / 10000 : 0,
  };
}

// ─── Multifamily ──────────────────────────────────────────────

function calculateMultifamily(d) {
  const acquisition = d.acquisition_price || 0;
  const monthlyRent = d.rental_income || 0;
  const downPct = (d.financing_down_percent || 25) / 100;
  const intRate = (d.financing_interest_rate || 7.0) / 100;
  const opExPct = (d.operating_expense_percent || 40) / 100;

  const annualGross = monthlyRent * 12;
  const operatingExpenses = annualGross * opExPct;
  const noi = annualGross - operatingExpenses;
  const capRate = acquisition > 0 ? noi / acquisition : 0;

  const loanAmt = acquisition * (1 - downPct);
  let monthlyPayment = 0;
  if (intRate > 0) {
    const r = intRate / 12;
    monthlyPayment = loanAmt * (r / (1 - Math.pow(1 + r, -360)));
  }
  const annualDebtService = monthlyPayment * 12;

  const annualCashFlow = noi - annualDebtService;
  const cashInvested = acquisition * downPct;
  const cashOnCash = cashInvested > 0 ? annualCashFlow / cashInvested : 0;
  const dscr = annualDebtService > 0 ? noi / annualDebtService : 0;

  return {
    annual_gross_income: Math.round(annualGross * 100) / 100,
    operating_expenses: Math.round(operatingExpenses * 100) / 100,
    noi: Math.round(noi * 100) / 100,
    cap_rate_percent: Math.round(capRate * 10000) / 100,
    annual_debt_service: Math.round(annualDebtService * 100) / 100,
    annual_cash_flow: Math.round(annualCashFlow * 100) / 100,
    cash_on_cash_return: Math.round(cashOnCash * 10000) / 100,
    dscr: Math.round(dscr * 100) / 100,
  };
}

// ─── Development ──────────────────────────────────────────────

function calculateDevelopment(d) {
  const landCost = d.land_cost || d.acquisition_price || 0;
  const hardCosts = d.hard_construction_costs || d.construction_budget || 0;
  let softCosts = d.soft_costs || 0;
  let financingCosts = d.financing_costs || 0;
  const salesCommPct = (d.sales_commission_percent || 6) / 100;
  const holdMonths = d.holding_period_months || 12;
  let endValue = d.end_value || d.total_revenue || d.gross_revenue || 0;
  let equityInvested = d.equity_invested || 0;
  const debtPct = (d.debt_percent || 70) / 100;
  const intRate = (d.interest_rate || 8.5) / 100;
  const units = d.units || d.total_units || 0;
  const avgUnitPrice = d.avg_unit_price || 0;

  if (endValue === 0 && units > 0 && avgUnitPrice > 0) endValue = units * avgUnitPrice;
  if (softCosts === 0 && hardCosts > 0) softCosts = hardCosts * 0.15;
  if (financingCosts === 0) {
    const loanAmt = (landCost + hardCosts + softCosts) * debtPct;
    financingCosts = loanAmt * intRate * (holdMonths / 12);
  }

  const salesCommissions = endValue * salesCommPct;
  const totalCost = landCost + hardCosts + softCosts + financingCosts + salesCommissions;
  const profit = endValue - totalCost;
  const roi = totalCost > 0 ? profit / totalCost : 0;

  if (equityInvested > 0) {
    const equityMultiple = totalCost > 0 && (1 - debtPct) > 0
      ? endValue / (totalCost * (1 - debtPct)) : 0;
    const returnOnEquity = profit / equityInvested;
    const holdYears = holdMonths > 0 ? holdMonths / 12 : 1;
    const simplifiedIRR = holdYears > 0 ? returnOnEquity / holdYears : 0;

    return {
      total_project_cost: Math.round(totalCost * 100) / 100,
      end_value: Math.round(endValue * 100) / 100,
      profit: Math.round(profit * 100) / 100,
      roi_percent: Math.round(roi * 10000) / 100,
      equity_invested: Math.round(equityInvested * 100) / 100,
      equity_multiple: Math.round(equityMultiple * 100) / 100,
      return_on_equity_percent: Math.round(returnOnEquity * 10000) / 100,
      simplified_irr_percent: Math.round(simplifiedIRR * 10000) / 100,
      holding_months: holdMonths,
      cost_per_unit: units > 0 ? Math.round((totalCost / units) * 100) / 100 : null,
      revenue_per_unit: units > 0 ? Math.round((endValue / units) * 100) / 100 : null,
      sales_commissions: Math.round(salesCommissions * 100) / 100,
      financing_costs: Math.round(financingCosts * 100) / 100,
    };
  }

  equityInvested = totalCost * (1 - debtPct);
  const equityMultiple = equityInvested > 0 ? endValue / equityInvested : 0;
  const returnOnEquity = profit / equityInvested;
  const holdYears = holdMonths > 0 ? holdMonths / 12 : 1;
  const simplifiedIRR = holdYears > 0 ? returnOnEquity / holdYears : 0;

  return {
    total_project_cost: Math.round(totalCost * 100) / 100,
    end_value: Math.round(endValue * 100) / 100,
    profit: Math.round(profit * 100) / 100,
    roi_percent: Math.round(roi * 10000) / 100,
    equity_invested: Math.round(equityInvested * 100) / 100,
    equity_multiple: Math.round(equityMultiple * 100) / 100,
    return_on_equity_percent: Math.round(returnOnEquity * 10000) / 100,
    simplified_irr_percent: Math.round(simplifiedIRR * 10000) / 100,
    holding_months: holdMonths,
    cost_per_unit: units > 0 ? Math.round((totalCost / units) * 100) / 100 : null,
    revenue_per_unit: units > 0 ? Math.round((endValue / units) * 100) / 100 : null,
    sales_commissions: Math.round(salesCommissions * 100) / 100,
    financing_costs: Math.round(financingCosts * 100) / 100,
  };
}

// ─── Analysis Engine (flags + recommendation) ────────────────

function analyzeDeal(data) {
  const propertyType = (data.property_type || "").toLowerCase();
  const redFlags = [];
  const greenFlags = [];

  let metrics, thresholds;
  if (/fix.*flip|flip/.test(propertyType)) {
    metrics = calculateFixAndFlip(data);
    thresholds = THRESHOLDS.fix_and_flip;

    if (metrics.purchase_to_arv_ratio > 0.9) {
      redFlags.push(`Purchase price (${Math.round(metrics.purchase_to_arv_ratio * 100)}% of ARV) exceeds 90% threshold`);
    } else if (metrics.purchase_to_arv_ratio <= thresholds.max_purchase_to_arv) {
      greenFlags.push(`Strong purchase spread (${Math.round(metrics.purchase_to_arv_ratio * 100)}% of ARV)`);
    }

    if (metrics.roi_percent < thresholds.min_roi_warning * 100) {
      redFlags.push(`ROI (${metrics.roi_percent.toFixed(1)}%) below minimum threshold (${Math.round(thresholds.min_roi_warning * 100)}%)`);
    } else if (metrics.roi_percent >= thresholds.min_roi * 100) {
      greenFlags.push(`Strong ROI (${metrics.roi_percent.toFixed(1)}%)`);
    }

    if (metrics.holding_cost / metrics.total_project_cost > 0.4) {
      redFlags.push("Financing/holding costs exceed 40% of total project");
    }

    if (data.renovation_budget && data.acquisition_price) {
      const renoRatio = data.renovation_budget / data.acquisition_price;
      if (renoRatio < 0.15) redFlags.push(`Renovation budget (${Math.round(renoRatio * 100)}%) may be underestimated`);
      else if (renoRatio > 0.6) redFlags.push(`Renovation budget (${Math.round(renoRatio * 100)}%) unusually high — risk of cost overruns`);
      else greenFlags.push(`Renovation budget at reasonable ${Math.round(renoRatio * 100)}% of acquisition`);
    }
  } else if (/multi|income|apartment/.test(propertyType)) {
    metrics = calculateMultifamily(data);
    thresholds = THRESHOLDS.multifamily;

    if (metrics.cap_rate_percent < thresholds.min_cap_rate_warning * 100) {
      redFlags.push(`Cap rate (${metrics.cap_rate_percent.toFixed(2)}%) below minimum threshold (${Math.round(thresholds.min_cap_rate_warning * 100)}%)`);
    } else if (metrics.cap_rate_percent >= thresholds.min_cap_rate * 100) {
      greenFlags.push(`Solid cap rate (${metrics.cap_rate_percent.toFixed(2)}%)`);
    }

    if (metrics.dscr < thresholds.min_dscr_warning) {
      redFlags.push(`DSCR (${metrics.dscr.toFixed(2)}) below minimum threshold (${thresholds.min_dscr_warning})`);
    } else if (metrics.dscr >= thresholds.min_dscr) {
      greenFlags.push(`Strong DSCR (${metrics.dscr.toFixed(2)})`);
    }

    if (metrics.cash_on_cash_return < 0) redFlags.push("Negative cash flow in Year 1");
    else if (metrics.cash_on_cash_return >= thresholds.min_cash_on_cash * 100) {
      greenFlags.push(`Positive cash-on-cash return (${metrics.cash_on_cash_return.toFixed(2)}%)`);
    }
  } else if (/development|mixed.?use|subdivision/.test(propertyType)) {
    metrics = calculateDevelopment(data);
    thresholds = THRESHOLDS.development;

    if (metrics.simplified_irr_percent < thresholds.min_irr_warning * 100) {
      redFlags.push(`Simplified IRR (${metrics.simplified_irr_percent.toFixed(1)}%) below minimum threshold (${Math.round(thresholds.min_irr_warning * 100)}%)`);
    } else if (metrics.simplified_irr_percent >= thresholds.min_irr * 100) {
      greenFlags.push(`Strong IRR (${metrics.simplified_irr_percent.toFixed(1)}%)`);
    }

    if (metrics.equity_multiple < thresholds.min_equity_multiple_warning) {
      redFlags.push(`Equity multiple (${metrics.equity_multiple.toFixed(2)}x) below minimum threshold (${thresholds.min_equity_multiple_warning}x)`);
    } else if (metrics.equity_multiple >= thresholds.min_equity_multiple) {
      greenFlags.push(`Strong equity multiple (${metrics.equity_multiple.toFixed(2)}x)`);
    }

    if (metrics.roi_percent < 0) redFlags.push(`Negative project ROI (${metrics.roi_percent.toFixed(1)}%)`);
    else if (metrics.roi_percent >= 15) greenFlags.push(`Positive project ROI (${metrics.roi_percent.toFixed(1)}%)`);

    if (metrics.holding_months > thresholds.max_hold_months) {
      redFlags.push(`Extended holding period (${metrics.holding_months} months) — construction/absorption risk`);
    }

    if (metrics.cost_per_unit && metrics.revenue_per_unit) {
      const marginPerUnit = (metrics.revenue_per_unit - metrics.cost_per_unit) / metrics.revenue_per_unit;
      if (marginPerUnit < 0.15) redFlags.push(`Thin per-unit margin (${(marginPerUnit * 100).toFixed(1)}%) — pricing/absorption risk`);
      else if (marginPerUnit >= 0.25) greenFlags.push(`Healthy per-unit margin (${(marginPerUnit * 100).toFixed(1)}%)`);
    }
  } else {
    return {
      property_type: "Unknown",
      metrics: { note: "Property type not recognized — using basic analysis" },
      recommendation: "REVIEW",
      risk_level: "Medium",
      red_flags: ["Unknown property type — manual review recommended"],
      green_flags: [],
      summary: "Deal analysis for unknown property type. Manual review recommended.",
      confidence_score: 50,
    };
  }

  // Determine recommendation
  const criticalRedFlags = redFlags.filter(f => /below minimum|negative|exceeds 90/.test(f.toLowerCase()));

  let recommendation, riskLevel;
  if (criticalRedFlags.length >= 1) { recommendation = "NO-GO"; riskLevel = "High"; }
  else if (redFlags.length >= 1) { recommendation = "REVIEW"; riskLevel = "Medium"; }
  else { recommendation = "GO"; riskLevel = "Low"; }

  const summary = `Deal analysis for ${data.property_type || "unknown property"}. ${
    recommendation === "GO" ? `Metrics meet or exceed framework thresholds. ${greenFlags.length} positive indicators.`
      : recommendation === "REVIEW" ? `Deal has concerns requiring manual review. ${redFlags.length} red flag(s).`
        : `Deal fails framework thresholds. ${redFlags.length} critical red flag(s).`}`;

  const confidenceScore = Math.max(0, Math.min(100, 100 - redFlags.length * 15 + greenFlags.length * 5));

  return { property_type: data.property_type || "Unknown", metrics, recommendation, risk_level: riskLevel,
    red_flags: redFlags, green_flags: greenFlags, summary, confidence_score: confidenceScore };
}

// ─── Quick Screener (for overlay) — simplified multifamily only ──

function quickScreeen(data) {
  const price = parseFloat(data.price || data.listing_price || 0);
  if (price <= 0) return { error: "No price found" };

  const monthlyRent = parseFloat(data.monthly_rent || data.gross_rental_income || 0);
  const downPct = ((data.down_payment_percent || 25) / 100);
  const intRate = ((data.interest_rate || 7.0) / 100);

  if (monthlyRent > 0 && price > 0) {
    const annualGross = monthlyRent * 12;
    const noi = annualGross * (1 - (data.opex_ratio || 0.4));
    const capRate = noi / price;

    const loanAmt = price * (1 - downPct);
    let monthlyPayment = 0;
    if (intRate > 0) { const r = intRate / 12; monthlyPayment = loanAmt * (r / (1 - Math.pow(1 + r, -360))); }
    const annualDebtService = monthlyPayment * 12;
    const cashFlow = noi - annualDebtService;
    const cashInvested = price * downPct;
    const cashOnCash = cashInvested > 0 ? (cashFlow / cashInvested) * 100 : 0;

    let dealScore = 50;
    if (capRate >= 0.08) dealScore += 20; else if (capRate >= 0.06) dealScore += 10; else if (capRate < 0.04) dealScore -= 20;
    if (cashOnCash >= 8) dealScore += 20; else if (cashOnCash >= 5) dealScore += 10; else if (cashOnCash < 0) dealScore -= 15;

    const rec = capRate >= 0.06 && cashOnCash >= 5 ? "GO" : capRate < 0.04 || cashOnCash < 0 ? "NO-GO" : "REVIEW";
    const risk = rec === "GO" ? "Low" : rec === "NO-GO" ? "High" : "Medium";

    return { deal_score: Math.max(0, Math.min(100, Math.round(dealScore))), recommendation: rec, risk_level: risk,
      cap_rate_percent: Math.round(capRate * 10000) / 100, cash_on_cash_return: Math.round(cashOnCash * 100) / 100,
      annual_noi: Math.round(noi * 100) / 100, price_per_unit: data.units ? Math.round(price / data.units) : null };
  }

  const arv = parseFloat(data.arv || data.rehab_value || 0);
  if (arv > 0 && price > 0) {
    const purchaseToARV = price / arv;
    let dealScore = 50;
    if (purchaseToARV <= 0.70) dealScore += 30; else if (purchaseToARV <= 0.80) dealScore += 15; else if (purchaseToARV > 0.90) dealScore -= 20;

    const rec = purchaseToARV <= 0.75 ? "GO" : purchaseToARV >= 0.90 ? "NO-GO" : "REVIEW";
    return { deal_score: Math.max(0, Math.min(100, Math.round(dealScore))), recommendation: rec, risk_level: rec === "GO" ? "Low" : rec === "NO-GO" ? "High" : "Medium",
      purchase_to_arv_ratio: Math.round(purchaseToARV * 10000) / 10000 };
  }

  return { error: "Insufficient data for quick screen. Need price + rent or ARV." };
}

// ─── Test Harness (parity check against Python engine specs) ──

function runTests() {
  const testCases = [
    { name: "Test 1: Good Fix-and-Flip", data: { property_type: "Fix-and-Flip", acquisition_price: 200000, renovation_budget: 50000, arv: 350000, holding_period_months: 6, financing_down_percent: 25, financing_interest_rate: 8.5, other_costs: 15000 }, expected: "GO" },
    { name: "Test 2: Bad Fix-and-Flip", data: { property_type: "Fix-and-Flip", acquisition_price: 300000, renovation_budget: 50000, arv: 350000, holding_period_months: 12, financing_down_percent: 25, financing_interest_rate: 8.5, other_costs: 15000 }, expected: "NO-GO" },
    { name: "Test 3: Strong Multifamily", data: { property_type: "Multifamily", acquisition_price: 2000000, renovation_budget: 200000, rental_income: 40000, financing_down_percent: 30, financing_interest_rate: 7.0, operating_expense_percent: 40 }, expected: "GO" },
    { name: "Test 4: Marginal Multifamily", data: { property_type: "Multifamily", acquisition_price: 1500000, renovation_budget: 150000, rental_income: 12000, financing_down_percent: 25, financing_interest_rate: 7.5, operating_expense_percent: 45 }, expected: "NO-GO" },
    { name: "Test 5: Strong Development (Mixed-Use)", data: { property_type: "Development", land_cost: 5000000, hard_construction_costs: 35000000, end_value: 65000000, units: 280, holding_period_months: 24, debt_percent: 70, interest_rate: 8.5 }, expected: "GO" },
    { name: "Test 6: Weak Development", data: { property_type: "Development", land_cost: 8000000, hard_construction_costs: 40000000, end_value: 45000000, units: 300, holding_period_months: 36, debt_percent: 70, interest_rate: 9.0 }, expected: "NO-GO" },
  ];

  console.log("=".repeat(60));
  console.log("Underwriting Engine — JS Port Parity Test");
  console.log("=".repeat(60));

  let matches = 0;
  for (const test of testCases) {
    const result = analyzeDeal(test.data);
    const pass = result.recommendation === test.expected;
    if (pass) matches++;

    console.log(`\n${test.name}`);
    console.log("-".repeat(40));
    console.log(`Recommendation: ${result.recommendation} (${pass ? "✓ PASS" : "✗ FAIL"})`);
    console.log(`Risk Level: ${result.risk_level}`);
    console.log(`Summary: ${result.summary}`);
    if (result.green_flags.length) console.log(`Green Flags: ${result.green_flags.join(", ")}`);
    if (result.red_flags.length) console.log(`Red Flags: ${result.red_flags.join(", ")}`);
  }

  console.log("\n" + "=".repeat(60));
  console.log("PARITY TEST SUMMARY");
  console.log("=".repeat(60));
  console.log(`Test Cases: ${testCases.length}`);
  console.log(`Passed: ${matches}/${testCases.length} (${Math.round(matches/testCases.length*100)}%)`);

  if (matches === testCases.length) {
    console.log("\n✓ All tests passed! JS port matches Python engine logic.");
  } else {
    console.log(`\n✗ ${testCases.length - matches} test(s) failed. Logic drift detected.`);
  }

  return { pass: matches === testCases.length, matches, total: testCases.length };
}

// ─── CLI Entry Point ──────────────────────────────────────────

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length > 0) {
    // Single deal analysis from JSON file or string
    let data;
    try {
      const fs = require("fs");
      if (fs.existsSync(args[0])) {
        data = JSON.parse(fs.readFileSync(args[0], "utf8"));
      } else {
        data = JSON.parse(args[0]);
      }
    } catch (e) {
      console.error("Error: Invalid JSON input");
      process.exit(1);
    }
    const result = analyzeDeal(data);
    console.log(JSON.stringify(result, null, 2));
  } else {
    // Run parity tests
    runTests();
  }
}

// ─── Exports ──────────────────────────────────────────────────

module.exports = { analyzeDeal, calculateFixAndFlip, calculateMultifamily, calculateDevelopment, quickScreeen };
