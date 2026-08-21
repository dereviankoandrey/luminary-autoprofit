# Yahli Digital Clone Asset Manifest

Date: 2026-06-06
Task: MemoryHub #180
Status: Intake manifest created; task blocked on human/provider assets.

## Purpose

This manifest lists the assets required before any non-mock Serendipity/Yahli digital clone session can go live. Mock/local development can proceed, but live Yahli likeness, voice, avatar, or hosted AI Twin sessions must remain blocked until the permission and provider gates below are satisfied.

## Hard Go-Live Gates

| Gate | Required Asset | Status | Owner / Source |
|---|---|---|---|
| Likeness + voice permission | Written confirmation from Yahli allowing use of her likeness/voice for the Serendipity digital clone, including provider training/use | Missing | Yahli / operator |
| Provider choice | Primary provider account availability confirmed: Tavus, HeyGen, or Steno Path A2 | Missing | Operator |
| Tavus path | Tavus replica/persona ID and API access, if Tavus selected | Missing | Operator/provider |
| HeyGen path | HeyGen LiveAvatar avatar/voice ID and API access, if HeyGen selected | Missing | Operator/provider |
| Steno path | `STENO_SUBSCRIPTION_KEY`, `STENO_CHAT_ID`, `STENO_AI_NAME`, account tier, video beta status, embed mode, if Steno selected | Missing | Operator/provider |
| Booking | Calendly event type or approved booking URL for Serendipity sales calls | Missing | Operator/Yahli |
| Knowledge | `/knowledge/serendipity/pitch-deck.pdf` or `.pptx` | Missing on this node | Operator/Yahli |
| Offer brief | `/knowledge/serendipity/offer.md`: one paragraph offer, target buyer, pain points, qualification criteria, desired CTA | Missing on this node | Operator/Yahli |
| Optional FAQ | `/knowledge/serendipity/faq.md` | Missing on this node | Operator/Yahli |
| Optional objections | `/knowledge/serendipity/objections.md` | Missing on this node | Operator/Yahli |
| Optional cases | `/knowledge/serendipity/case-studies.md` | Missing on this node | Operator/Yahli |

## Known Corpus Leads From MemoryHub

These are leads for later harvesting/transcription. They are not a substitute for written provider consent.

| Asset Lead | Notes | Source |
|---|---|---|
| Yahli YouTube channel | Public channel `Yahli Admati`, futurist/innovation/CEO-advisor positioning | Handoff #186 |
| Dana Reinstein interview | 44-minute interview: `youtu.be/_gG7tDerrVs` | Handoff #186 |
| Dana Regev podcast | 2-part podcast, 2020 | Handoff #186 |
| HR conference and healthcare-leadership lectures | Public long-form Hebrew video/audio leads | Handoff #186 |
| 2018 morning-show appearance | Public video lead | Handoff #186 |
| Yahli Spotify show | `טיפה של אופטימיות | Future Backwards | Building The Future | Yahli Admati`, `open.spotify.com/show/2QoUwlPulmIl0t552cMWGu` | Handoff #191 |
| Alex podcast interview | Additional corpus item, around 50K views, to be sent | Handoff #216 |

## Required Knowledge Folder Shape

Target:

```text
/knowledge/serendipity/
  pitch-deck.pdf        # or pitch-deck.pptx
  offer.md
  faq.md                # optional
  objections.md         # optional
  case-studies.md       # optional
  corpus-manifest.md
  consent/
    yahli-likeness-voice-permission.md
```

Minimum `offer.md` fields:

```md
# Serendipity Offer

## One-Paragraph Offer

## Target Buyer

## Pain Points

## Qualification Criteria

## Desired CTA
```

Minimum `corpus-manifest.md` fields:

```md
| Source | URL/path | Language | Duration/pages | Rights status | Transcript status | Use |
|---|---|---|---:|---|---|---|
```

## Consent Gate Rule

Non-mock sessions must fail closed unless written permission is present:

- `YAHLI_LIKENESS_LICENSE_CONFIRMED=true`
- consent document path exists
- selected provider has a configured account/session asset

If any of those are missing, the UI/API should allow mock development only and display an operator-facing configuration error for Tavus/HeyGen/Steno modes.

## Current Blocker Summary

The public corpus leads are enough to plan archive harvesting and transcript work. They are not enough to launch a non-mock Yahli digital clone. The task remains blocked until the operator/Yahli provide permission, provider/account identifiers, Calendly URL, and the Serendipity knowledge package.
