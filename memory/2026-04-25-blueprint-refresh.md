# Session: 2026-04-25 19:19:34 UTC

- **Session Key**: agent:main:telegram:direct:7727959008
- **Session ID**: 6240c661-32be-48f1-a46b-38bafb01615e
- **Source**: telegram

## Conversation Summary

user: [media attached: /home/andrey/.openclaw/media/inbound/BLUEPRINT_V2_REFRESH_MISSION---6996f7a4-37aa-46ad-aa7a-53a42f5b3255.md (text/markdown) | /home/andrey/.openclaw/media/inbound/BLUEPRINT_V2_REFRESH_MISSION---6996f7a4-37aa-46ad-aa7a-53a42f5b3255.md]
To send an image back, prefer the message tool (media/path/filePath). If you must inline, use MEDIA:https://example.com/image.jpg (spaces ok, quote if needed) or a safe relative path like MEDIA:./image.jpg. Absolute and ~ paths only work when they stay inside your allowed file-read boundary; host file:// URLs are blocked. Keep caption in the text body.
Conversation info (untrusted metadata):
```json
{
  "chat_id": "telegram:7727959008",
  "message_id": "675",
  "sender_id": "7727959008",
  "sender": "Andrey Derevianko",
  "timestamp": "Sat 2026-04-25 19:15 UTC"
}
```

Sender (untrusted metadata):
```json
{
  "label": "Andrey Derevianko (7727959008)",
  "id": "7727959008",
  "name": "Andrey Derevianko"
}
```

[Telegram Andrey Derevianko id:7727959008 +1m Sat 2026-04-25 19:15 UTC] Complete this mission

<file name="BLUEPRINT_V2_REFRESH_MISSION---6996f7a4-37aa-46ad-aa7a-53a42f5b3255.md" mime="text/markdown">

<<<EXTERNAL_UNTRUSTED_CONTENT id="fa4a8797ed136a1c">>>
Source: External
---
# BLUEPRINT V2 REFRESH — EMAIL MISSION FOR CLAUDE CODE

**Priority:** HIGH — Client retention + pipeline warming
**Target node:** aicsai-node-01 (production)
**Time budget:** ~90 min Claude Code work, ~15 min Andrey review
**Executes via:** Claude Code with `--dangerously-skip-permissions`
**Depends on:** Blueprint v2 PDF already live at https://luminarybotventures.com/files/Luminary_Blueprint.pdf
**Status as of this mission:** Luminary agent confirmed working on node-01. CFO/Bookkeeper NOT yet registered — not blocking for this mission since they aren't used.

---

## WHAT THIS MISSION DELIVERS

1. Fresh personalized Blueprint v2 download link to 12 paid clients
2. Two voice tracks:
 - **Track A (Luminary voice):** 6 T1 Blueprint buyers — novelty pitch, soft upgrade offer
 - **Track B (Andrey voice):** 6 paid pipeline clients — Blueprint + tier-specific delivery timeline
3. Two test emails to Andrey first. Batch send only on explicit Telegram approval.
4. 24h and 72h download tracking summaries (if tracking endpoint available)

---

## CRITICAL RULES

1. ABORT if production Blueprint PDF at public URL is less than 2MB (suggests v1 still live).
2. RATE LIMIT sends to 1 per 30 seconds.
3. LOG EVERY ACTION to `~/.openclaw/email-batches/blueprint-v2-refresh/audit.log`.
4. AWAIT EXPLICIT APPROVAL via Telegram before batch send. Acceptable approvals: APPROVE ALL, APPROVE, SEND.
5. NEVER attach the PDF directly. Personalization happens at download via signed token — send link only.
6. Reply-To header on every send: andreyderevianko@gmail.com. Even for Track A (Luminary voice), replies should reach Andrey.

---

## PHASE 1: PRE-FLIGHT CHECKS

### 1a. Verify Luminary agent works on production

```bash
timeout 60 npx openclaw agent --agent luminary --message "Respond in one short sentence: what is your name and role?" --local
```

Abort condition: Response does not contain "Luminary" or contains "Jedai". Telegram notify: Mission aborted — Luminary agent unreachable on node-01.

### 1b. Verify production Blueprint PDF is v2

```bash
PDF_SIZE=$(curl -sI https://luminarybotventures.com/files/Luminary_Blueprint.pdf | grep -i content-length | awk '{print $2}' | tr -d '\r\n ')
echo "Production Blueprint size: $PDF_SIZE bytes"
```

Abort conditions:

- PDF_SIZE is empty (URL unreachable)
- PDF_SIZE is less than 100000 bytes (live file is ~129KB; a floor of 100KB catches truncation and placeholder files without false-positiving on valid v2)
- Content-Type header is not `application/pdf`

On abort, Telegram notify: Mission aborted — Blueprint v2 PDF failed health check (reason: {reason}).

Also add explicit content-type verification:

```bash
PDF_TYPE=$(curl -sI https://luminarybotventures.com/files/Luminary_Blueprint.pdf | grep -i content-type | awk '{print $2}' | tr -d '\r\n ')
echo "Content-Type: $PDF_TYPE"
# Must contain "application/pdf"
```

### 1c. Verify required env vars

Check these are set (env | grep VAR):

- DOWNLOAD_TOKEN_SECRET
- GMAIL_USER
- GMAIL_APP_PASSWORD (or APP_PASSWORD)
- GOOGLE_SHEET_ID
- GOOGLE_SERVICE_ACCOUNT_EMAIL
- GOOGLE_PRIVATE_KEY

Abort on any missing. Telegram notify with specific var name.

### 1d. Create working directories

```bash
mkdir -p ~/.openclaw/email-batches/blueprint-v2-refresh/{drafts,sent,audit,cancelled}
```

---

## PHASE 2: BUILD CLIENT LIST

### 2a. Pull T1 Blueprint buyers from GSCRM (Track A)

Use Google Sheets API with existing service account (same credentials used by submit-questionnaire-route.ts).

Query criteria:

- Tier column contains "T1 Blueprint" or "Blueprint"
- Amount Paid > 0
- Status is not "refunded" or "disputed"

Expected result: 6 rows. If fewer than 5 or more than 10, pause and ask Andrey via Telegram to confirm the list before proceeding.

### 2b. Request Track B emails from Andrey

Pause after Phase 2a completes. Send Telegram:

```
Phase 2a complete: {N} T1 buyers found for Track A.

Track A (Luminary voice — T1 buyers):
{list of names + emails}

For Track B, I need emails for these 6 clients:
- Boon (T2)
- Moresi (T2)
- Hawboldt (T4-64)
- Sacco (T4-96)
- Matthews (T4-96)
- Kloefkorn (T5+T4)

Reply with:
TRACK_B:
boon@email.com | FirstName LastName
moresi@email.com | FirstName LastName
...

Or reply CANCEL to abort.
```

Wait up to 4 hours. Parse reply into structured list. Write to `~/.openclaw/email-batches/blueprint-v2-refresh/clients.json`.

---

## PHASE 3: GENERATE SIGNED TOKENS

Create `~/.openclaw/email-batches/blueprint-v2-refresh/generate-tokens.js`:

```javascript
const crypto = require('crypto');
const fs = require('fs');

const TTL_MS = 72 * 60 * 60 * 1000;
const SECRET = process.env.DOWNLOAD_TOKEN_SECRET;
if (!SECRET) { console.error('DOWNLOAD_TOKEN_SECRET missing'); process.exit(1); }

function createToken(name, email) {
 const exp = Date.now() + TTL_MS;
 const sig = crypto.createHmac('sha256', SECRET)
 .update(`${name}|${email}|${exp}`).digest('hex');
 return Buffer.from(JSON.stringify({ name, email, exp, sig })).toString('base64url');
}

const clients = JSON.parse(fs.readFileSync('clients.json', 'utf8'));
const withTokens = clients.map(c => {
 const token = createToken(c.name, c.email);
 return {
 ...c,
 token,
 downloadUrl: `https://luminarybotventures.com/api/download-blueprint?token=${token}`
 };
});
fs.writeFileSync('clients-with-tokens.json', JSON.stringify(withTokens, null, 2));
console.log(`Generated ${withTokens.length} tokens.`);
```

IMPORTANT: Verify token format matches lib/downloadToken.ts on production exactly before mass-use. Sanity check:

```bash
cd ~/.openclaw/email-batches/blueprint-v2-refresh
node generate-tokens.js
TEST_URL=$(cat clients-with-tokens.json | python3 -c "import json,sys; print(json.load(sys.stdin)[0]['downloadUrl'])")
curl -sI "$TEST_URL" | head -5
# Expect HTTP 200 or PDF content-type. If 401/403, token format mismatch — abort.
```

---

## PHASE 4: DRAFT EMAILS

### Track A template (Luminary voice)

```
Subject: Your Blueprint just got a major upgrade, {firstName}

Hi {firstName},

This is Luminary — the AI that runs Andrey's business. He asked me to write
you directly because he wanted you to experience the thing you bought a
piece of.

Your Blueprint v2 is ready. The biggest changes:

- New Chapter 3: Dual-Agent Architecture. OpenClaw runs the business side
 (16 agents, air-gapped CFO), Hermes runs the personal side. When
 something breaks, they repair each other. This pattern wasn't in v1 —
 it's the single biggest reliability upgrade we've made.
- 15 chapters total (was 14). Expanded model routing, voice setup, and
 revenue playbook.
- Same license, same terms. Your copy is stamped with your name.

Your fresh download link (valid 72 hours):

{downloadUrl}

If you want to see what the rest of the system looks like, your $97 counts
as a deposit against any higher tier. No pressure — Andrey hates upsell emails.

I'll be here when you need me.

— Luminary
(Andrey reviewed this before it went out.)
```

### Track B template (Andrey voice)

```
Subject: Blueprint v2 + your {tierShort} timeline

{firstName},

Quick update on two things.

First — Blueprint v2 is out. You already have access as part of your {tier}
purchase, but I wanted to make sure you get the refreshed personalized
copy. The big addition is Chapter 3, Dual-Agent Architecture — the single
most important reliability improvement we've made to the system you're
getting.

Your fresh download link (valid 72 hours):

{downloadUrl}

Second — your delivery timeline:

{TIMELINE_BLOCK}

If anything on that timeline doesn't work for you, reply and we'll adjust.
Luminary drafted this email. I reviewed it before sending.

Andrey
```

### Timeline blocks by tier

**T2 (Boon, Moresi):**

```
- T2 Starter Kit install package (configs, setup guide, install script):
 delivered within 7 days via private download link
- Pre-configured 16-agent OpenClaw environment + Hermes personal agent
- Reproducible install script validated on Ubuntu 24
- 30-day Telegram support: starts on your install day
- Blueprint v2: available now via the link above
```

**T4-64 (Hawboldt):**

```
- Hardware (GMKtec EVO-X2, 96GB RAM, 2TB SSD): shipped, will arrive within 5-7 business days
- Remote config session: 2-hour window scheduled after hardware arrival
- 60-day Telegram support: starts on install day
- Blueprint v2 + Starter Kit digital materials: available now via the link above
```

**T4-96 (Sacco, Matthews):**

```
- Hardware (Nimo, 128GB RAM, 1TB SSD): ships within 2-3 business days
- Remote config session: 2-hour window scheduled after hardware arrival
- 60-day Telegram support: starts on install day
- Blueprint v2 + Starter Kit digital materials: available now via the link above
```

**T5+T4 (Kloefkorn):**

```
- Founders Circle community access: provisioned within 7 days
- First quarterly 1-on-1 strategy call: scheduled for next month (2 hours)
- Hardware (your chosen config): ships within 5-10 business days
- Remote config session: scheduled after hardware arrival
- 60-day Telegram support + 12-month premium support: begins on install day
- Monthly workshop invites: start next month
- Blueprint v2 + Starter Kit digital materials: available now via the link above
```

### Save drafts

One file per client at drafts/{slugified-email}.md with YAML frontmatter:

```yaml
---
to: client@example.com
name: Firstname Lastname
tier: T4-96
track: B
subject: Blueprint v2 + your T4 timeline
status: PENDING_APPROVAL
tokenExpires: 2026-04-27T14:00:00Z
---

{rendered email body}
```

---

## PHASE 5: TEST SEND TO ANDREY

Send TWO test emails to andreyderevianko@gmail.com:

1. Test A: Track A template rendered for "Andrey", real minted token, subject `[TEST — TRACK A] Your Blueprint just got a major upgrade, Andrey`
2. Test B: Track B template with T4-96 timeline, real token, subject `[TEST — TRACK B] Blueprint v2 + your T4 timeline`

Use nodemailer with GMAIL_USER + GMAIL_APP_PASSWORD:

```javascript
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD || process.env.APP_PASSWORD }
});
await transporter.sendMail({
 from: `"Luminary Bot Ventures" <${process.env.GMAIL_USER}>`,
 to: 'andreyderevianko@gmail.com',
 replyTo: 'andreyderevianko@gmail.com',
 subject: '[TEST — TRACK A] ...',
 text: trackATestBody
});
```

Then Telegram summary:

```
Blueprint v2 refresh — ready for approval.

Track A drafts (Luminary voice, T1 buyers): {N_A}
{firstName list with one-line previews}

Track B drafts (Andrey voice, pipeline): {N_B}
{firstName list with tier badges}

Two test emails sent to your inbox:
- [TEST — TRACK A] — what T1 buyers will receive
- [TEST — TRACK B] — what pipeline clients will receive (T4-96 sample)

Drafts on disk:
~/.openclaw/email-batches/blueprint-v2-refresh/drafts/

To approve batch, reply: APPROVE ALL
To edit a draft: SSH to EVO-X2, edit the .md, then reply APPROVE ALL
To cancel: CANCEL

Mission paused.
```

---

## PHASE 6: WAIT FOR APPROVAL

Poll `~/.openclaw/email-batches/blueprint-v2-refresh/approval.txt` every 30 seconds.
Valid approvals: APPROVE ALL, APPROVE, SEND, GO.
Valid cancellation: CANCEL, STOP, ABORT.

Timeouts:

- 4 hours no response: reminder Telegram
- 12 hours: auto-cancel, move drafts to cancelled/, notify

---

## PHASE 7: BATCH SEND

On APPROVE ALL:

```javascript
for (const client of clients) {
 const draft = loadDraft(client.email);
 try {
 const info = await transporter.sendMail({
 from: `"Luminary Bot Ventures" <${GMAIL_USER}>`,
 to: client.email,
 replyTo: 'andreyderevianko@gmail.com',
 subject: draft.subject,
 text: draft.body
 });
 logSent(client, info.messageId, 'success');
 moveDraftToSent(client.email, { status: 'SENT', messageId: info.messageId, sentAt: new Date().toISOString() });
 } catch (err) {
 logSent(client, null, `failure: ${err.message}`);
 }
 await sleep(30000);
}
```

Append each result to sent.jsonl (one JSON per line).

After batch, Telegram:

```
Batch send complete: {success}/{total} delivered, {failures} failures.

{If failures:}
Failed sends:
- email1@x.com — {error}
- email2@y.com — {error}

Will check download activity at 24h and 72h.
```

---

## PHASE 8: DOWNLOAD TRACKING (optional)

If download-blueprint route logs to Google Sheets "Blueprint Downloads" tab:

- 24h after batch: Telegram `24h: {X}/{total} downloaded. Pending: {names}`
- 72h: Telegram `72h final: {Y}/{total} downloaded. Did not download: {names}`

If no tracking available: skip phase 8. Andrey checks manually.

---

## PHASE 9: CLEANUP (after 72h window)

```bash
cd ~/.openclaw/email-batches/
tar -czf blueprint-v2-refresh-$(date +%Y%m%d).tar.gz blueprint-v2-refresh/
mkdir -p ~/.openclaw/archive/
mv blueprint-v2-refresh-*.tar.gz ~/.openclaw/archive/
```

---

## ABORT / EMERGENCY STOP

Telegram `/stop blueprint-v2-refresh`:

1. Halt immediately
2. If mid-batch: log sent count, move remainder to cancelled/
3. Telegram: Halted at {phase}. {X} sent, {Y} cancelled.

---

## SUCCESS CRITERIA

- 12/12 drafts generated with valid tokens
- Both test emails delivered
- Andrey approves via Telegram
- 12/12 batch sent with Gmail message IDs logged
- Zero bounces, zero spam complaints
- Andrey's time: under 20 minutes total

---

## POST-MISSION (separate session, this afternoon)

After batch send confirms complete, start a fresh Claude Code session to diagnose and fix:
Why are cfo and bookkeeper not registered in `npx openclaw agents list` on node-01?

Investigation order:

1. npx openclaw agents list on node-01 — capture actual registered agent IDs
2. Check install-luminary-v2.sh for `openclaw agents add cfo ...` and `openclaw agents add bookkeeper ...` — confirm lines exist and syntax matches CLI.md
3. Check ~/.openclaw/openclaw.json agents section for cfo/bookkeeper entries (suspect: missing, or registered under old IDs cfo-company / studio-cfo)
4. Check orphan workspace dirs ~/.openclaw/workspace-cfo-company/ and ~/.openclaw/workspace-studio-cfo/ — decide: delete or re-register under new IDs

Fix requirement: All 16 agents respond correctly to `npx openclaw agent --agent <id> --message "..." --local` BEFORE any T2 or T4 fulfillment begins.

Not part of email mission. Gating condition for fulfillment on the timeline committed to in Track B emails.
<<<END_EXTERNAL_UNTRUSTED_CONTENT id="fa4a8797ed136a1c">>>
</file>
assistant: Blocked.

I tried to start the mission, but command execution on `aicsai-node-01` is currently failing immediately with:

`Refusing to traverse symlink in exec approvals path: /home/andrey/.openclaw`

What I confirmed before hitting the block:
- Node is `aicsai-node-01`
- `luminary` is registered in `~/.openclaw/openclaw.json`
- CFO agents appear registered as `cfo-company` and `cfo-studio`, not `cfo` / `bookkeeper`

What I cannot do until this is fixed:
- run pre-flight shell checks
- verify the live PDF headers
- check env vars
- query/build client lists
- mint tokens
- generate/send test emails
- write the audit trail the mission requires

Next step:
- fix the `.openclaw` symlink/approval-path issue on node-01, then I can continue immediately.

If you want, I can next help diagnose that blocker first.
user: Conversation info (untrusted metadata):
```json
{
  "chat_id": "telegram:7727959008",
  "message_id": "682",
  "sender_id": "7727959008",
  "sender": "Andrey Derevianko",
  "timestamp": "Sat 2026-04-25 19:19 UTC"
}
```

Sender (untrusted metadata):
```json
{
  "label": "Andrey Derevianko (7727959008)",
  "id": "7727959008",
  "name": "Andrey Derevianko"
}
```

Are you using ChatGPT5.5?
assistant: I’m running in OpenClaw here, not plain ChatGPT UI.

This session’s default appears configured to use `openai-codex/gpt-5.5`, but some agent definitions also use `gpt-5.4`.

If you want, I can check the active model for this exact session.
