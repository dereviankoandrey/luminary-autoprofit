# Austin Market Intel Subscription — Public Source Map v1

## Purpose
Define the minimum repeatable source stack for producing one Austin market-intel issue with low cost and high agent autonomy.

## Core Source Buckets

### 1. City / Entitlement / Permit Signals
- Austin Permit Search / Development Services public records
- Austin Planning Commission agendas / backup materials
- Austin City Council agendas when land-use items are relevant
- Austin zoning / case filing pages

### 2. County / Recorded Activity
- Travis County public records portals
- appraisal district / property search references when ownership context matters

### 3. Market / Leasing / Supply Signals
- public multifamily and office market reports from major brokerages
- major landlord / developer press releases
- public project announcements and construction updates

### 4. Capital Markets / Transactions
- broker press releases
- lender / developer announcements
- local business journal style transaction coverage
- SEC / offering-adjacent public references only when clearly relevant

### 5. Demand / Macro / Policy
- census / BLS / public employment releases
- major employer expansion or contraction announcements
- state and local housing-policy updates

## Minimum Source Rule
Only include a signal in the issue if:
1. the source is public or already owned,
2. the date is visible,
3. the claim can be linked back to a named source,
4. and the implication is relevant to acquisition, underwriting, lending, or development decisions.

## Suggested Weekly Collection Order
1. City / permit / zoning changes
2. major project announcements
3. financing / sale activity
4. demand and policy context
5. final dedupe and scoring

## Fast Triage Tags
- permits
- zoning
- financing
- sale
- lease
- supply
- demand
- policy
- submarket
- urgency-high
- urgency-medium
- urgency-low

## Keep / Kill Filter
Keep only items that score at least:
- relevance: 4/5
- actionability: 3/5
- source confidence: 4/5

Kill items that are:
- generic national news with no Austin implication
- opinion without primary-source backing
- duplicative coverage of the same event
- interesting but not decision-useful

## Pass Standard For First Live Issue
This source map passes if one issue can be assembled with:
- 5-10 strong Austin-specific signals,
- under 90 minutes total assembly time,
- clear source traceability,
- and light human QA only.

## Smallest Next Step
Use this source map with `austin_market_intel_sample_issue_template.md` to produce one source-backed sample issue and time the workflow.