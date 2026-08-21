# Developer Playbook Sample — Fast Deal Triage OS

## Purpose
Give a lean developer, acquisition lead, or lender a repeatable first-pass screen that turns raw deal inputs into **GO / REVIEW / NO-GO** without waiting for a full custom underwriting cycle.

## Best Fit
- small developers
- acquisition teams
- private lenders
- independent sponsors
- analysts screening noisy inbound flow

## Core Outcome
Kill weak deals faster, escalate only the deals worth deeper work, and keep the logic consistent across teammates.

## Operating Rule
Use this playbook for **first-pass triage only**. Do not treat it as final investment approval.

## Inputs Required
### Fix-and-Flip / Small Residential
- purchase price
- rehab budget
- after-repair value
- holding period
- target gross margin or minimum spread
- key known red flags

### Multifamily / Rental
- purchase price
- unit count
- current rent / projected rent
- occupancy
- cap rate or NOI assumptions
- renovation budget if relevant
- major known risks

## Triage Workflow
1. **Collect minimum inputs**
   - if critical numbers are missing, label **REVIEW** instead of guessing.
2. **Run first-pass math**
   - estimate margin, spread, or simple return buffer.
3. **Check hard red flags**
   - unclear exit, thin margin, weak occupancy, unrealistic assumptions, major unknowns.
4. **Assign one recommendation**
   - **GO** = numbers clear hurdle and no major red flags
   - **REVIEW** = potential is real but one or more variables need confirmation
   - **NO-GO** = weak economics or too many unresolved risks
5. **Log the reason in one sentence**
   - example: "NO-GO because margin buffer is too thin after rehab and holding assumptions."
6. **Route next action**
   - GO -> deeper underwriting
   - REVIEW -> request missing data
   - NO-GO -> archive with reason code

## Decision Heuristics
### GO
- healthy margin buffer
- assumptions feel realistic
- no obvious execution blocker
- clear path to deeper diligence

### REVIEW
- economics may work but key data is missing
- one major assumption needs confirmation
- operational or entitlement risk is unclear

### NO-GO
- spread too thin
- upside depends on unrealistic rent or exit assumptions
- multiple unresolved red flags
- complexity is too high for expected return

## Recommended Reason Codes
- thin_margin
- weak_demand_assumption
- rehab_risk
- occupancy_risk
- unclear_exit
- missing_key_inputs
- financing_unclear
- entitlement_or_process_risk

## Intake Template
```text
Deal name:
Asset type:
Location:
Purchase price:
Rehab / capex:
Revenue assumption (ARV or rent/NOI):
Holding period:
Known red flags:
Missing data:
Recommendation:
Reason code:
Next action:
```

## Team QA Checklist
- Did we use a fixed recommendation label?
- Did we log the main reason code?
- Did we avoid inventing missing inputs?
- Did we route the deal to the right next step?
- Could another teammate understand the decision in under 30 seconds?

## Agent-Assisted Version
An agent can:
1. normalize inbound deal notes into the intake template,
2. flag missing inputs,
3. summarize the likely decision,
4. produce a clean triage log for review.

Human review should still confirm any deal marked **GO**.

## Where This Connects To Existing Luminary Assets
- `underwriting_beta_packet.md`
- `underwriting_pricing_test_matrix.md`
- `underwriting_demo_capture_checklist.md`
- `README.md`

## Validation Standard
This sample playbook passes if a cold reader can:
1. understand the workflow quickly,
2. use the template without extra explanation,
3. see how the membership would deliver concrete operator value.
