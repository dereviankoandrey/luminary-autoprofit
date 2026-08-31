# Device Sales Follow-Up Pack

**Created:** 2026-04-25 05:00 UTC  
**Purpose:** turn the raw device sales/setup status list into an actionable follow-up queue with clear priorities, exact asks, and copy-paste outreach drafts.

## Why this exists
The raw tracker captures contacts and rough statuses, but it does not yet separate:
- money collection tasks
- delivery exception tasks
- post-delivery setup tasks
- status-clarification tasks
- unclear prospect list cleanup

This pack makes the next moves obvious and faster to execute.

## Highest-Priority Actions

### 1) Steve Hawboldt — delivery exception
- **Contact:** steve@yellowridge.ca
- **Phone:** 16042507344
- **Offer / item:** T4 128GB A360 price
- **Current status:** Ordered / shipped / not arrived
- **Goal:** confirm shipment status, delivery ETA, and whether intervention is needed
- **Best next action:** ask whether the device has arrived; if not, get the order/shipping reference and expected delivery date

### 2) Peter Sacco — post-delivery setup conversion
- **Contact:** pete@petesacco.com
- **Offer / item:** T4 128GB A360 price
- **Current status:** Delivered
- **Goal:** convert delivery into setup completion or next scheduled step
- **Best next action:** confirm receipt, ask if box was opened, and schedule or advance setup

### 3) Kevin Matthews — payment collection
- **Contact:** kmatthews@NobleAccountingLLC.com
- **Offer / item:** T4 Complete Kit
- **Current status:** Unpaid
- **Goal:** collect payment or determine if deal is stalled
- **Best next action:** send a short payment follow-up with a direct request for status and payment timing

### 4) Jay — payment collection
- **Contact:** jay@domoregood.com
- **Offer / item:** T3 Remote Setup
- **Current status:** Unpaid
- **Goal:** collect payment or close the loop
- **Best next action:** ask if they still want to move forward and request payment timing

### 5) Remaining Track B — status clarification sweep
- **Contacts:** Nick Moresi, Elisabeth Mayer, Jay Wilkinson, Sheila Kloefkorn, Dr. Dorine Rivers
- **Current status:** Status unclear
- **Goal:** classify each contact as active / waiting / paid / delivered / dead / not a fit
- **Best next action:** send one short status-check message to each and normalize responses into the tracker

### 6) Track A — list definition cleanup
- **Current issue:** list meaning and required action are not yet defined
- **Goal:** determine whether Track A is lead list, prospects, prior customers, or follow-up targets
- **Best next action:** ask Andrey what Track A represents and what outcome is desired for that list

## Suggested Working Queue

| Priority | Contact / Group | Objective | Desired outcome | Status after follow-up should become |
|---|---|---|---|---|
| 1 | Steve Hawboldt | Resolve delivery issue | delivered / delayed with ETA / needs escalation | Delivered / Delayed / Escalation needed |
| 2 | Peter Sacco | Move from delivery to setup | setup scheduled or completed | Setup scheduled / Setup completed |
| 3 | Kevin Matthews | Collect payment | paid or declined | Paid / Declined / Follow up later |
| 4 | Jay @ domoregood.com | Collect payment | paid or declined | Paid / Declined / Follow up later |
| 5 | Status-unclear Track B contacts | Clarify pipeline stage | classified next step | Active / Waiting / Lost / Paid / Delivered |
| 6 | Track A | Clarify list purpose | assign next action type | Defined |

## Normalized Status Definitions
Use these so the tracker becomes operational instead of free-form.

- **Lead** — identified but not yet contacted
- **Active conversation** — engaged, awaiting next step
- **Awaiting payment** — wants to proceed but has not paid
- **Paid / awaiting fulfillment** — payment received, product or setup not yet delivered
- **Shipped** — physical item sent, awaiting delivery
- **Delivered / setup pending** — device received, next step is onboarding/setup
- **Setup scheduled** — date/time agreed
- **Setup completed** — fulfilled
- **Delayed / exception** — blocked by shipping, tech, or response issue
- **Closed lost** — not moving forward

## Copy-Paste Follow-Up Drafts

### Steve Hawboldt — delivery check
> Hi Steve — quick check on the T4 device: has it arrived yet? If not, can you send me the latest shipping status or expected delivery date so I can help move this forward?

### Peter Sacco — post-delivery setup
> Hi Peter — I see the device was delivered. Did you receive it successfully, and are you ready for the next setup step? If yes, let’s get the setup scheduled or completed.

### Kevin Matthews — payment follow-up
> Hi Kevin — quick follow-up on the T4 Complete Kit. Are you still planning to move forward? If yes, please send payment timing or let me know if you need anything from me to finalize it.

### Jay @ domoregood.com — payment follow-up
> Hi Jay — following up on the T3 Remote Setup. Are you still wanting to proceed? If yes, please let me know payment timing and we’ll move it forward.

### Track B status-clarification draft
> Hi — quick status check on your device/setup request. Are you still planning to move forward, or should I mark this as paused? If active, what is the current next step from your side?

### Internal ask to Andrey about Track A
> Need one clarification so I can make the device tracker operational: what does Track A represent, and what action do you want taken on those contacts (prospect follow-up, payment chase, setup scheduling, or something else)?

## Minimal Data To Capture After Each Follow-Up
For each contact, capture:
- last touch date
- reply status
- next step
- owner
- due date
- normalized status

## Recommended Tracker Upgrade
Once replies start coming in, extend `memory/device-sales-setup-tracker-2026-04-25.md` with these columns:
- Last touch
- Next step
- Owner
- Due date
- Normalized status

## Rule
Do not infer payment, delivery, or deal stage from silence. Convert each contact into an explicit status.