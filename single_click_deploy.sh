#!/bin/bash
# single_click_deploy.sh – prepares a zip and a draft outreach email

# Generate a dated zip of the deployment package
DATE=$(date +%Y-%m-%d)
ZIP_NAME="underwriting_deploy_${DATE}.zip"
zip -r "$ZIP_NAME" underwriting_deploy/
echo "Created $ZIP_NAME"

# Create a draft email template
EMAIL_TEMPLATE="outreach_template_${DATE}.txt"
cat > "$EMAIL_TEMPLATE" <<'EOF'
Subject: Transform Your Real‑Estate Investment Process with AI‑Powered Underwriting

Hi [First Name],

I’m reaching out because I’ve built an AI‑driven underwriting SaaS that automates the most time‑consuming part of real‑estate investment analysis – quickly evaluating deals, modeling cash‑flows, and surfacing risk signals.

What it does:
- Takes deal inputs (purchase price, financing, rent roll, etc.) and produces a structured underwriting report in minutes.
- Generates scenario analysis (base case, upside, downside) with clear sensitivity triggers.
- Flags “GO/NO‑GO” signals based on customizable risk thresholds.
- Integrates with your existing workflow via a simple web interface.

Pricing:
- Starter ($197/mo): Basic underwriting with 5 deals/month
- Growth ($497/mo): Unlimited deals + advanced scenario analysis
- Enterprise (custom): Dedicated support + integration options

Hi [First Name],

I'm reaching out because I've built an AI-driven underwriting SaaS that automates the most time-consuming part of real-estate investment analysis – quickly evaluating deals, modeling cash-flows, and surfacing risk signals.

What it does:
- Takes deal inputs (purchase price, financing, rent roll, etc.) and produces a structured underwriting report in minutes.
- Generates scenario analysis (base case, upside, downside) with clear sensitivity triggers.
- Flags "GO/NO-GO" signals based on customizable risk thresholds.
- Integrates with your existing workflow via a simple web interface.

To see a live demo or schedule a quick call, just reply to this email or click here: https://underwriting-demo.example.com

Best regards,
[Your Name]
[Contact Information]
EOF