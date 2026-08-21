# Austin Market Intel — Live Source Validation Log

## Purpose
Record which public Austin-market source endpoints are currently reachable through the available tool stack so one real sample issue can be assembled with less trial-and-error.

## Validation Run
**Date:** 2026-04-23 02:00 UTC

## URLs Checked

### Reachable
1. **Austin City Council**  
   URL: `https://www.austintexas.gov/city-council`  
   Result: redirected to `/council`, returned 200  
   Notes: page is reachable, but extracted content is mostly navigation chrome; still useful as a stable starting point for council tracking.

2. **Austin Boards and Commissions**  
   URL: `https://www.austintexas.gov/department/boards-and-commissions`  
   Result: redirected to `/boards-commissions`, returned 200  
   Notes: confirms the new city-site path is live and explicitly mentions agendas, approved minutes, membership, and by-laws for active boards and commissions.

3. **BLS Austin-Round Rock-San Marcos Economy at a Glance**  
   URL: `https://www.bls.gov/eag/eag.tx_austin_msa.htm`  
   Result: returned 200  
   Notes: extracted macro labor data including February 2026 unemployment rate at 3.7% and employment at 1,496.3 (thousand).

4. **Austin Open Data portal**  
   URL: `https://data.austintexas.gov/`  
   Result: returned 200  
   Notes: portal is reachable, but extraction quality is thin through current tooling; likely better for manual follow-up or direct dataset/API targeting.

### Unreachable / Weak
1. **Old council meeting info center path**  
   URL: `https://www.austintexas.gov/department/city-council/council/council_meeting_info_center`  
   Result: 404  
   Notes: legacy path appears dead after city-site migration.

2. **Old planning commission path**  
   URL: `https://www.austintexas.gov/department/planning-commission`  
   Result: 404  
   Notes: legacy path appears dead after city-site migration.

3. **Austin site search guess for planning commission**  
   URL: `https://www.austintexas.gov/services/search?query=planning%20commission`  
   Result: 404  
   Notes: guessed search URL is not usable for discovery.

4. **Census Austin QuickFacts**  
   URL: `https://www.census.gov/quickfacts/fact/table/austincitytexas/PST045224`  
   Result: 403 / Cloudflare block  
   Notes: not currently reliable through this tool path.

## Takeaways
- Austin public-source validation is **partially viable**.
- New city-site URLs work better than the legacy `/department/...` paths.
- BLS is currently the cleanest macro source for a first sample issue.
- A real Austin sample issue is still possible, but source discovery remains slower and noisier without Tavily/search.

## Smallest Next Step
Use the reachable Austin city pages plus 2-3 additional known public sources with stable URLs to assemble the first source-backed sample issue.