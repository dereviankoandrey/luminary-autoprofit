# Austin Source URL Health Check — 2026-05-22

**Time:** 2026-05-22 10:00 UTC  
**Trigger:** Overnight Employee heartbeat  
**Purpose:** Verify all active Austin public-source URLs used by the intelligence products still resolve correctly.

## Executive Summary
**Status: PARTIAL FAILURE** — Several legacy Austin city-site URL patterns are now dead. The active product files appear to use the correct modern paths, but the old `/department/` prefix URLs documented in validation logs are confirmed broken. No active brief/bundle sample files reference the dead paths.

## URL Audit Results

### ✅ Confirmed Working (Current Active Paths)
| URL | Status | Notes |
|---|---|---|
| `https://www.austintexas.gov/council` | 200 | Council home page |
| `https://www.austintexas.gov/council/meetings` | 200 | Meeting info center — live agenda data |
| `https://www.austintexas.gov/boards-commissions` | 200 | Boards & commissions hub |
| `https://www.austintexas.gov/development-services` | 200 | Dev services home |
| `https://www.austintexas.gov/development-services/site-plan-performance-metrics` | 200 | Site plan metrics — live data |
| `https://www.austintexas.gov/development-services/expedited-site-plan-review` | 200 | Expedited pilot page |
| `https://www.austintexas.gov/development-services/expedited-building-plan-review` | 200 | Expedited building plan review |
| `https://www.austintexas.gov/development-services/types-permits` | 200 | Permit types index |
| `https://www.austintexas.gov/development-services/commercial-plan-review` | 200 | Commercial plan review |
| `https://www.austintexas.gov/planning` | 200 | Planning department home |
| `https://www.austintexas.gov/housing` | 200 | Housing hub |
| `https://data.austintexas.gov/` | 200 | Open data portal |
| `https://services.austintexas.gov/edims/...` | 200 | Document archive (ID-based) |

### ❌ Confirmed Dead (Legacy Paths)
| URL | Status | Notes |
|---|---|---|
| `https://capitol.austintexas.gov` | DNS failure | Domain no longer resolves |
| `https://capitol.austintexas.gov/meetings/` | DNS failure | Domain no longer resolves |
| `https://www.austintexas.gov/department/boards-and-commissions` | 404 | Old prefix path |
| `https://www.austintexas.gov/department/city-council/council/council_meeting_info_center` | 404 | Old prefix path |
| `https://www.austintexas.gov/department/planning-commission` | 404 | Old prefix path |
| `https://www.austintexas.gov/department/development-services` | 404 | Old prefix path |
| `https://www.austintexas.gov/city-council` | 404 | Redirects to `/council` but old path itself is 404 |
| `https://www.austintexas.gov/planning/planning-commission` | 404 | Sub-path not found |

### ⚠️ New Findings
- **Planning Commission** page is no longer at a direct URL. It appears to be accessible via the boards & commissions hub at `/boards-commissions` but the direct `/planning/planning-commission` path is dead.
- **AI Pre-Check Beta** (Archistar) is now live on the expedited building plan review page — new signal source for future briefs.
- **PDC Appointments** page referenced at `/pdc-appointments` — new source for pre-application consultation tracking.
- **AB+C Portal** at `https://abc.austintexas.gov/` is the current permit management system.

## Impact Assessment
- **Active product files:** No active brief/bundle sample files reference dead URLs. The workspace files already migrated to the modern `/council`, `/development-services/`, and `/boards-commissions` paths.
- **Old validation logs:** Contain dead `/department/` paths but these are historical records, not active references.
- **Risk level:** LOW for current operations. MEDIUM if future automation blindly copies old URLs from historical logs.

## Actions Taken
1. Systematically tested all known Austin city-site URL patterns.
2. Confirmed the modern path structure is: `https://www.austintexas.gov/{department}/{page}` (no `/department/` prefix).
3. Documented new findings (AI Pre-Check Beta, PDC Appointments, AB+C Portal).
4. Verified active product files use correct paths.

## Recommendations
1. **Add AI Pre-Check Beta** to the Austin intelligence source stack — it's a new signal source.
2. **Add PDC Appointments** tracking as a potential future signal layer.
3. **Schedule quarterly URL health checks** to catch future site restructuring early.
4. **Update the source validation log** to reflect current state (see below).

## Updated Source Validation Log
The file `austin_market_intel_live_source_validation.md` should be updated to reflect:
- Dead paths moved to "Confirmed Dead" section
- New working paths added to "Reachable" section
- New signal sources (AI Pre-Check Beta, PDC Appointments) documented
