# Stripe Alternatives Research — Comprehensive Comparison
**Date:** 2026-06-11 | **Prepared for:** Andrey

---

## Baseline: Stripe Standard Pricing (US Domestic)

| Feature | Rate |
|---------|------|
| Online domestic cards | **2.9% + 30¢** per successful transaction |
| International cards | +1.5% surcharge |
| Currency conversion | +1% on top |
| ACH / bank debits | ~0.8% (varies by product) |
| Apple Pay/Google Pay | Same as domestic card rate |
| Monthly fees | **$0** — pure pay-as-you-go |
| Setup fees | $0 |
| Billing (subscriptions) | Starting at $620/mo for advanced plan, or 0.7% of billing volume on pay-as-you-go |
| Radar (fraud) | Included at $0.05/screened txn (standard); $0.02/screened txn (custom pricing) |
| Disputes | $15.00 per dispute |
| PCI compliance | Included (SAQ A for most integrations) |
| SDKs | Python, Ruby, PHP, Go, Java, Node.js, .NET, iOS, Android — excellent docs |

---

## Provider Comparison Table

| Provider | Base Card Fee (US Domestic) | Monthly Fee | API Maturity | SDKs | Webhooks | Subscriptions | Fraud Detection | Countries/Currencies | Settlement | Key Differentiator vs Stripe |
|----------|---------------------------|-------------|--------------|------|----------|---------------|-----------------|---------------------|------------|------------------------------|
| **Braintree (PayPal)** | 2.89% + $0.29 | $0 | High — mature REST API, well-documented | JS, iOS, Android, .NET, PHP, Python, Ruby, Node.js, Go, Java | Yes | Yes (Recurring Billing) | PayPal Fraud Tools + optional Premium ($0.40+/txn) | 190+ countries, 25+ currencies | T+2 standard | Cheaper per txn; built-in PayPal/Venmo acceptance |
| **Mollie** | 1.80% + €0.25 (EEA consumer cards) / 2.90% + €0.25 (commercial) | €0 (Standard) | Very High — REST API, excellent docs, webhooks-first | PHP, Python, Go, Node.js, Java, .NET, Ruby, C# | Yes, robust event system | Yes (Recurring product) | Mollie Risk Scanner + optional additional tools | 35+ countries, 120+ payment methods | Next business day | Dramatically cheaper in EU; 120+ local PMs; no lock-in |
| **Authorize.Net** | 2.9% + $0.30 (All-In-One); lower with Gateway-only + interchange-plus | $25/mo (Gateway) or $49/mo (All-In-One) | High — XML/JSON API, mature docs | .NET, PHP, Java, Python, Node.js, iOS, Android | Yes | Yes (ARB) | Advanced Fraud Suite (+$25/mo) | US-focused, some international | T+1-2 | Lower fixed fee per txn ($0.30 vs $0.49 PayPal); interchange-plus option can drop effective rate to ~2.2–2.5% |
| **Checkout.com** | Custom pricing (IC++ available; typically 2.5–2.8% domestic) | $0 (no monthly fee) | Very High — full REST API, excellent docs, webhook support | Java, .NET, PHP, Ruby, Python, Node.js, iOS, Android | Yes | Yes | Checkout Radar (ML-based), 3D Secure | 150+ currencies, 45+ countries | T+1 available | Enterprise-grade; direct acquiring; better rates at scale |
| **Adyen** | IC++ model: Interchange + ~0.2–0.6% (varies by card/country); US cards ~2.9% + €0.13 | $0 | Very High — unified API for all channels | Java, .NET, PHP, Ruby, Python, Node.js, iOS, Android, Go | Yes, comprehensive event model | Yes (Subscription management) | CAKE ML-based fraud; device intelligence | 250+ currencies, 200+ countries | Varies by region | True global acquiring; lowest effective rates at high volume; single integration omnichannel |
| **Paddle** (MoR) | 5% + 50¢ per transaction | $0 | Medium — REST API, good docs but less flexible than Stripe | JavaScript SDK, webhooks | Yes | Yes (full subscription management) | Built-in fraud/chargeback protection | Global tax compliance (180+ countries) | T+7 standard | Handles all tax/VAT filing; merchant of record; full customer support for billing |
| **Paystack** | 1.5% + ₦20 (Nigeria); ~1.15% for enterprise; international cards 3.76% | $0 | High — REST API, well-documented | Python, PHP, Java, .NET, iOS, Android, Node.js, Ruby | Yes | Yes (Subscriptions product) | Built-in fraud prevention | Nigeria, Ghana, South Africa, Kenya; 25+ currencies | T+1 to T+3 | Best-in-class for Africa; significantly cheaper than Stripe in African markets |
| **Flutterwave** | 2.9% + ₦40 (Nigeria); ~1.76% enterprise; global cards 3.4–3.95% | $0 | High — REST API, docs improving | JavaScript, PHP, Java, Python, .NET, iOS, Android | Yes | Yes (Recurring Billing) | Fraud detection tools; 3D Secure | 34 African countries + global; 160+ currencies | T+1 to T+2 | Pan-African focus with global reach; strong local PM coverage in Africa |
| **Rapyd** | Custom pricing per country (IC++ model); typical ~2.5–3% domestic | $0 | High — unified API, documentation available | JavaScript, PHP, Java, Python, .NET, iOS, Android, Ruby | Yes | Yes | Built-in fraud engine (multiple providers) | 160+ countries, 80+ currencies | Varies by country/method | Unmatched global coverage; local PMs in every market |
| **2Checkout (Verifone)** | 3.5% + $0.49 or 5% (fixed rate plans); varies by plan | $0 for self-serve; enterprise custom | Medium — REST API available but less polished | JS, PHP, .NET, Java, iOS, Android | Yes | Yes | Fraud management tools; AVS/CVV | 200+ countries, 100+ currencies | Varies | Merchant of record capability; handles global tax compliance |
| **Square** | 2.9% + 30¢ (online); 2.6% + 10¢ (in-person swiped) | $0 for basic; $60/mo for advanced features | High — excellent REST API and docs | Node.js, PHP, Python, Ruby, Java, .NET, iOS, Android | Yes | Yes (Subscriptions) | Built-in fraud tools; chargeback management | 47 countries; multiple currencies | T+1 standard | Stronger in-person + online unified ecosystem; free POS hardware options |
| **Razorpay** (US) | 2.70% + $0.30 domestic cards | $0 | High — REST API, good docs | Android, iOS, Web, server-side SDKs | Yes | Yes | Built-in fraud prevention | US: cards, ACH; India: full suite | Cards T+2, ACH T+5 | Slightly cheaper than Stripe (2.7% vs 2.9%); free promotion available; excellent Indian market coverage |

---

## Deep Dive: Each Provider

### 1. Braintree (PayPal)

**Processing Fees:**
- Standard cards + digital wallets: **2.89% + $0.29**
- International cards: +1% surcharge
- Venmo: 3.49% + $0.49
- ACH Direct Debit: 0.75% (capped at $5)
- Chargebacks: $15.00

**Monthly Costs:** $0 — pure pay-as-you-go

**API & Developer Services:**
- Mature REST API, consistently updated
- SDKs for all major platforms (JS, iOS, Android, .NET, PHP, Python, Ruby, Node.js, Go, Java)
- Comprehensive documentation with code examples
- Full webhook support with event verification
- Drop-in UI and Hosted Fields for PCI-compliant card entry

**Recurring Billing:** Yes — built-in Recurring Billing API with subscription management, prorations, trials, and pausing

**Fraud Detection:** PayPal's fraud tools (basic) + optional Fraud Management Network ($0.40+/txn) with machine learning

**Countries/Currencies:** 190+ countries, 25+ currencies

**Settlement:** Typically T+2 standard business days

**Notable Limitations vs Stripe:**
- Documentation, while mature, is not as polished or developer-friendly as Stripe's
- Braintree UIs (Drop-in/Hosted Fields) are less customizable than Stripe Elements
- PayPal integration adds complexity if you don't want PayPal branding visible
- Less expansive product ecosystem (no equivalent to Stripe Terminal, Treasury, Issuing, Atlas, etc.)
- API versioning can be opaque; deprecation notices sometimes unclear

**Verdict:** A solid, proven alternative. Slightly cheaper than Stripe on base rate ($2.89 vs $2.90). Best for businesses that want built-in PayPal and Venmo acceptance without extra integration work.

---

### 2. Mollie

**Processing Fees (EU Standard):**
- EEA consumer cards: **1.80% + €0.25** — significantly cheaper than Stripe
- EEA commercial cards: 2.90% + €0.25
- Non-EEA cards: 3.25% + €0.25
- Amex: 2.90% + €0.25
- PayPal: PayPal rate + €0.10
- iDEAL: €0.32 flat
- SEPA Direct Debit: €0.35 flat
- Local PMs: varies (many under €0.50 flat)

**Monthly Costs:** €0 — pure pay-as-you-go on Standard plan

**API & Developer Services:**
- REST API, excellent documentation at https://docs.mollie.com
- SDKs: PHP, Python, Go, Node.js, Java, .NET/C#, Ruby, C#
- Full webhook support with signature verification
- Payment Links, Checkout, Invoicing included
- Connect for Platforms (marketplace support)

**Recurring Billing:** Yes — dedicated Recurring product with subscription management, dunning, and trials

**Fraud Detection:** Mollie Risk Scanner (built-in); additional advanced tools available

**Countries/Currencies:** 35+ countries primarily in Europe; 120+ payment methods accepted; multi-currency payouts in 12 currencies

**Settlement:** Next business day for most methods; daily/weekly/monthly payout schedules available

**Notable Limitations vs Stripe:**
- Primary focus is European market — limited support outside EEA (no standalone US entity for cards)
- No in-person payment ecosystem comparable to Stripe Terminal
- No embedded finance products (lending, issuing, treasury)
- Documentation quality is high but SDK ecosystem smaller than Stripe's (fewer language bindings)
- Fewer pre-built integrations with e-commerce platforms vs Stripe

**Verdict:** **Best value for EU-based businesses.** EEA consumer card rate of 1.80% + €0.25 is dramatically cheaper than Stripe's 2.9%. Excellent developer experience with clean REST API and solid SDKs. One of the strongest overall alternatives if you operate in Europe.

---

### 3. Adyen

**Processing Fees:**
- Uses **Interchange++** pricing model: Interchange cost + ~0.2–0.6% markup depending on card type/country
- US consumer Visa/MC debit: ~$0.13 + interchange + lower adhoc fees
- Online cards: varies by country — typically 1.80–2.90% + €0.13 depending on card and region
- Global standard rates are generally at or below Stripe's flat rate

**Monthly Costs:** $0 on standard; enterprise contracts may have minimums

**API & Developer Services:**
- Unified API across online, in-store, mobile — single integration
- SDKs: Java, .NET, PHP, Ruby, Python, Node.js, iOS, Android, Go
- Comprehensive REST API documentation (developer.adyen.com)
- Full webhook support with event-driven architecture
- Payouts API, Refunds API, Presentment API

**Recurring Billing:** Yes — advanced subscription management with retry logic, proration, and metered billing

**Fraud Detection:** CAKE (Adyen's custom fraud system) — ML-based, configurable rule sets; Device Intelligence for device fingerprinting

**Countries/Currencies:** 200+ countries, 250+ currencies, direct acquiring in major markets

**Settlement:** Varies by region and contract; typically T+1 to T+3

**Notable Limitations vs Stripe:**
- **Complex pricing model** — interchange++ requires more effort to understand costs (though it's more transparent long-term)
- Sales-driven onboarding: Adyen prefers enterprise deals; getting reasonable rates as a small business can be harder
- Documentation is thorough but less beginner-friendly than Stripe's (assumes more technical knowledge)
- Minimum volume expectations for best rates — very small businesses may not get competitive pricing
- Less "product suite" breadth — fewer standalone products compared to Stripe's ecosystem (no tax, identity, atlas equivalents)

**Verdict:** **Best for scaling businesses and enterprises.** Direct acquiring means the lowest effective rates at volume. The interchange++ model saves real money at scale but requires more operational complexity. Excellent API maturity with true omnichannel support.

---

### 4. Checkout.com

**Processing Fees:**
- Custom pricing based on business profile — no published flat rates
- Interchange++ (IC++) options available
- Typical effective rates: ~2.5–2.8% for domestic cards at standard volumes (below Stripe's 2.9%)
- Volume discounts and multi-product discounts available

**Monthly Costs:** $0 — pay-as-you-go on standard pricing

**API & Developer Services:**
- Unified Payments API — one integration for all features
- SDKs: Java, .NET, PHP, Ruby, Python, Node.js, iOS, Android
- Well-documented REST API at developer.checkout.com
- Full webhook support with event signatures
- 3D Secure, network tokens, and smart routing built in

**Recurring Billing:** Yes — Recurring Payments API with subscription management, vaulting, and retry logic

**Fraud Detection:** Checkout Radar — ML-based fraud prevention; customizable rules; integrates with Visa/Mastercard prevention networks

**Countries/Currencies:** 150+ currencies, 45+ countries (and growing), domestic coverage in each region

**Settlement:** T+1 available for eligible merchants

**Notable Limitations vs Stripe:**
- No publicly disclosed pricing — must contact sales, which creates friction for small/medium businesses
- Smaller community and fewer third-party integrations/plugins than Stripe
- Less extensive product suite (no embedded lending, treasury, or business banking products)
- Documentation is good but not as polished/comprehensive as Stripe's
- Smaller ecosystem of pre-built CMS/e-commerce integrations

**Verdict:** **Strong enterprise-grade alternative.** Best for businesses with significant volume who can negotiate competitive rates. Unified API and ML-based fraud detection are genuinely competitive with Stripe. The lack of transparent pricing is the main barrier.

---

### 5. Authorize.Net

**Processing Fees:**
- All-In-One plan: **2.9% + $0.30** per transaction (same % as Stripe, lower fixed fee than PayPal)
- Gateway-only: Connect to any merchant processor — effective rates can drop to **2.2–2.5%** with interchange-plus pricing
- Chargebacks: $25

**Monthly Costs:** 
- Gateway Only: $25/month
- All-In-One: $49/month (includes payment gateway + merchant account)

**API & Developer Services:**
- Mature JSON and XML APIs
- SDKs for .NET, PHP, Java, Python, Node.js, iOS, Android
- Comprehensive documentation at developer.authorize.net
- Webhook support via Transaction Relay API
- Customer Profile management built in

**Recurring Billing:** Yes — Automated Recurring Billing (ARB) one of the oldest and most battle-tested subscription APIs

**Fraud Detection:** Advanced Fraud Suite available for +$25/month — includes AVS, CVV, custom rules, VIP lists

**Countries/Currencies:** Primarily US-focused; supports international cards but not as a global acquirer

**Settlement:** T+1 standard (depends on merchant processor)

**Notable Limitations vs Stripe:**
- Older API architecture (JSON and XML both supported — legacy baggage)
- Monthly fees ($25–$49) add up for low-volume businesses
- Documentation is functional but dated compared to Stripe's gold-standard docs
- Smaller, less active developer community
- No equivalent product suite (no billing platform, tax, identity, issuing, etc.)
- Primarily a US gateway — limited true global acquirer capability

**Verdict:** **Good for businesses needing interchange-plus flexibility.** The ability to connect to any merchant processor and negotiate your own rates is powerful. However, the dated API experience and monthly fees make it less attractive for modern SaaS/dev-first businesses compared to Stripe alternatives like Mollie or Braintree.

---

### 6. Paddle (Merchant of Record)

**Processing Fees:**
- **5% + 50¢** per successful transaction — all-inclusive
- Add-ons: Tax compliance (+0.5%), Advanced churn recovery ($0.02–$0.07), Subscription billing (up to 3.9% add-on), International cards (up to 4.4% add-on)
- Real total with add-ons can reach ~7%+ for some businesses

**Monthly Costs:** $0 — pure pay-as-you-go, no lock-in contracts

**API & Developer Services:**
- REST API for checkout, subscriptions, and tax management
- SDK: JavaScript (browser), webhooks supported
- Documentation quality is good but API surface is narrower than Stripe
- Not a general-purpose payments gateway — more focused on the merchant-of-record layer

**Recurring Billing:** Yes — full subscription management included (this is core to Paddle's value prop)

**Fraud Detection:** Built-in fraud prevention and chargeback protection included in base price

**Countries/Currencies:** Global — handles tax/VAT compliance in 180+ countries, multiple currencies via checkout

**Settlement:** Standard T+7 (payout timing varies)

**Notable Limitations vs Stripe:**
- **Higher fee rate** (5% vs Stripe's 2.9%) — not "cheaper" on pure processing
- Limited to digital goods/SaaS businesses (not for physical products or marketplaces in the same way)
- Paddle is the merchant of record — they legally sell on your behalf, which limits flexibility
- Less control over checkout UX compared to Stripe's Elements/Checkout customization
- Smaller API feature set — no standalone payments without the MoR wrapper

**Verdict:** **Not cheaper for processing alone, but may be cheaper when you factor in tax compliance overhead.** For SaaS/digital product businesses selling globally, Paddle eliminates the enormous cost (in time and money) of managing VAT/Sales Tax across 100+ jurisdictions. The total cost of ownership comparison favors Paddle if you're losing significant revenue/engineering hours to tax complexity.

---

### 7. Paystack

**Processing Fees:**
- Nigeria: **1.5% + ₦100** (capped at ₦2,000) for businesses; ~1.15% for enterprise volumes
- South Africa: ~1.5% + ZAR flat fee
- Kenya: Competitive local rates
- International cards: ~3.76% 
- Gambia: Custom pricing

**Monthly Costs:** $0 — pure pay-as-you-go

**API & Developer Services:**
- REST API, well-documented at developer.paystack.com
- SDKs: Python, PHP, Java, .NET/C#, iOS, Android, Node.js, Ruby, Go, Laravel (PHP)
- Full webhook support with event verification
- Payment Links, Checkout UI, Invoicing included

**Recurring Billing:** Yes — Subscriptions product with automatic retries, dunning management, and subscription lifecycle APIs

**Fraud Detection:** Built-in fraud prevention engine; risk scoring on transactions

**Countries/Currencies:** Nigeria, Ghana, South Africa, Kenya; 25+ currencies supported

**Settlement:** T+1 to T+3 depending on country and method

**Notable Limitations vs Stripe:**
- Geographically limited to African markets (and a few corridors) — not a global alternative
- Smaller ecosystem than Stripe — fewer third-party integrations, smaller community
- API is solid but documentation quality doesn't quite match Stripe's polish
- No in-person/POS capability comparable to Stripe Terminal

**Verdict:** **Dominant in Africa with excellent developer experience.** If your business operates in or sells to Africa, Paystack is significantly cheaper than Stripe and has the best local payment method coverage. Not relevant for other regions.

---

### 8. Flutterwave

**Processing Fees:**
- Nigeria: ~2.9% + ₦40 (standard); enterprise rates starting at ~1.76%
- Global cards: 3.4–3.95% depending on card type and region
- Bank transfers: lower flat-rate pricing in African markets

**Monthly Costs:** $0 — pay-as-you-go on standard plans

**API & Developer Services:**
- REST API with improving documentation at developer.flutterwave.com
- SDKs: JavaScript, PHP, Java, Python, .NET/C#, iOS (Swift/Obj-C), Android (Kotlin/Java)
- Webhook support with event verification
- Payment Pages, Checkout, Invoicing included

**Recurring Billing:** Yes — Recurring Billing API for subscriptions and installments

**Fraud Detection:** Built-in fraud detection tools; 3D Secure integration; risk management features

**Countries/Currencies:** 34 African countries + global reach via international card acceptance; 160+ currencies

**Settlement:** T+1 to T+2 depending on country

**Notable Limitations vs Stripe:**
- Documentation quality varies — improving but not yet at Stripe's level
- API consistency can vary across different product lines (payments, transfers, terminals)
- Smaller developer community and ecosystem vs Stripe
- In-person capabilities less mature than Stripe Terminal

**Verdict:** **Strong Pan-African alternative to Stripe.** Broader country coverage than Paystack but similar pricing. Best choice when you need payments across multiple African countries in a single integration. API maturity is solid but not quite at Stripe's level.

---

### 9. Rapyd

**Processing Fees:**
- Custom pricing per country (interchange++ based) — no published flat rates
- Typically ~2.5–3.0% for domestic cards depending on region
- Must contact sales for specific rates in your market

**Monthly Costs:** $0 — pay-as-you-go

**API & Developer Services:**
- Unified API covering 160+ countries
- SDKs: JavaScript, PHP, Java, Python, .NET/C#, iOS, Android, Ruby
- REST API documentation available at docs.rapyd.net
- Webhook support available

**Recurring Billing:** Yes — subscription management through the unified API

**Fraud Detection:** Built-in fraud engine with multiple risk assessment providers integrated

**Countries/Currencies:** 160+ countries, 80+ currencies, 500+ local payment methods

**Settlement:** Varies by country and payment method

**Notable Limitations vs Stripe:**
- **No transparent pricing** — must contact sales for any quote
- Documentation available but not as comprehensive or well-organized as Stripe's
- Smaller developer community; harder to find examples, Stack Overflow answers, etc.
- API has some inconsistency across different product types (payments, payouts, accounts)
- Brand recognition is lower — potential trust concerns with end users

**Verdict:** **Best for businesses needing extreme global reach.** If you need to accept payments in 160+ countries with hundreds of local payment methods through a single API, Rapyd is unmatched. Pricing can be competitive but the opaque quote-only model makes comparison difficult.

---

### 10. 2Checkout (Verifone / Verifone)

**Processing Fees:**
- Self-serve: ~3.5% + $0.49 per transaction
- Custom pricing available for higher volumes
- Some fixed-rate plans at ~5% with no per-transaction fee

**Monthly Costs:** $0 on self-serve plans; custom for enterprise

**API & Developer Services:**
- REST API available
- SDKs: JavaScript, PHP, .NET, Java, iOS, Android (limited/maintained)
- Webhook support
- Documentation quality is adequate but dated

**Recurring Billing:** Yes — subscription management through the platform

**Fraud Detection:** Fraud management tools including AVS, CVV verification, and risk scoring

**Countries/Currencies:** 200+ countries, 100+ currencies

**Settlement:** Varies by method and region

**Notable Limitations vs Stripe:**
- Documentation quality is the weakest among major competitors — frequently cited as frustrating
- API feels legacy compared to Stripe's modern REST design
- SDK ecosystem is limited and sometimes outdated
- Brand has less developer credibility than Stripe, Braintree, or Adyen
- 2Checkout was acquired by Verifone, creating integration uncertainty

**Verdict:** **A niche option for specific use cases.** Handles tax compliance as a MoR in some configurations. Otherwise, there are stronger alternatives in every category. Only consider if specifically needed for certain emerging markets where it has unique local PM coverage.

---

### 11. Square

**Processing Fees:**
- Online/checkout: **2.9% + 30¢** (same as Stripe)
- In-person (swiped): **2.6% + 10¢** — better than most competitors
- In-person (keyed-in): 3.5% + $0.15
- International cards: +1.5% surcharge
- ACH (US): ~0.8%

**Monthly Costs:** $0 for basic processing; $60+/mo for advanced features (Team, Inventory, Loyalty, etc.)

**API & Developer Services:**
- Excellent REST API with comprehensive documentation at developer.squareup.com
- SDKs: Node.js, PHP, Python, Ruby, Java, .NET/C#, iOS (Swift/Obj-C), Android (Kotlin)
- Full webhook support
- Terminal API for in-person payments
- Cash App Pay integration

**Recurring Billing:** Yes — Subscriptions product with flexible plans, trials, and dunning

**Fraud Detection:** Built-in fraud prevention tools; chargeback management; Seller Protection

**Countries/Currencies:** 47 countries; multiple currencies (USD, CAD, AUD, GBP, JPY, EUR)

**Settlement:** T+1 standard for most regions

**Notable Limitations vs Stripe:**
- Stronger ecosystem is in-person/retail — the online-only developer experience lags slightly behind Stripe
- Fewer advanced payment products (no embedded finance, treasury equivalent)
- Global coverage narrower than Stripe's
- Tax compliance not as automated as Stripe Tax
- Some APIs are less mature for complex platform/marketplace use cases compared to Stripe Connect

**Verdict:** **Best if you have physical retail + online presence.** The unified online + in-person ecosystem is genuinely compelling. For online-only businesses, Stripe still has the edge in feature breadth and developer experience. Pricing is essentially equivalent on online transactions.

---

### 12. Razorpay (US Entity)

**Processing Fees:**
- US domestic cards: **2.70% + $0.30** — cheaper than Stripe's 2.9% + 30¢
- Foreign/international cards: ~3.90% + $0.30 (+1.20% surcharge)
- ACH Direct Debit: 0.50% (capped at $5) — cheapest ACH option
- International cards for Indian customers: Up to 3% platform fee

**Monthly Costs:** $0 — pure pay-as-you-go; **limited-time: free card processing first year up to $50,000 volume**

**API & Developer Services:**
- RESTful API with good documentation at docs.razorpay.com
- SDKs: Android, iOS, Web, server-side (PHP, Python, Java, .NET, Ruby)
- Full webhook support with event signing
- Payment Pages, Links, and Plugins (Shopify, WooCommerce, Magento)

**Recurring Billing:** Yes — Subscriptions product with management APIs; UPI autodebit for Indian market

**Fraud Detection:** Built-in fraud prevention tools; risk scoring; velocity checks

**Countries/Currencies:** US entity processes USD cards; India entity handles full INR ecosystem with 100+ payment methods (UPI, cards, wallets, netbanking)

**Settlement:** Cards T+2 business days; ACH T+5

**Notable Limitations vs Stripe:**
- US offering is relatively new — the ecosystem and community are smaller than Stripe's
- Documentation quality is good but not yet at Stripe's gold standard
- Brand awareness in Western markets is limited compared to Stripe/PayPal/Braintree
- The company did a "reverse flip" from Delaware back to India in May 2025, which may cause compliance considerations for US businesses
- ACH return and NOC fees ($5 each) are worth noting

**Verdict:** **Best value US-focused alternative currently.** At 2.70% + $0.30 vs Stripe's 2.9%, plus the free promotion up to $50K volume, Razorpay offers genuine cost savings. The API is solid and developer-friendly. Watch for brand adoption concerns with B2B clients who may not recognize the name.

---

## Top 3 Recommendations

### 🥇 #1: Braintree (PayPal) — Best Overall Alternative

**Why:**
- **Cheaper per transaction:** 2.89% + $0.29 vs Stripe's 2.9% + 30¢ (saves ~$0.01 per $100 transaction, which compounds significantly at scale)
- **API maturity matches Stripe:** Comprehensive REST API, SDKs for every major language, well-maintained documentation, full webhook support
- **Built-in PayPal acceptance:** No extra integration needed — customers can pay with their PayPal balance, bank, or card
- **Proven at massive scale:** Powers Airbnb, Instacart, StubHub, and thousands of other high-traffic platforms
- **Recurring billing is mature:** Subscription management with trials, proration, pausing
- **No monthly fees:** Pure pay-as-you-go like Stripe

**Best for:** Businesses that want Stripe-quality APIs at slightly lower cost, plus the bonus of built-in PayPal/Venmo acceptance without extra integration work.

---

### 🥈 #2: Mollie — Best Value for EU/European Businesses

**Why:**
- **Dramatically cheaper in Europe:** 1.80% + €0.25 for EEA consumer cards vs Stripe's equivalent rate of ~2.9% — that's **over 35% savings on the processing fee**
- **Developer experience rivals Stripe:** Clean REST API, excellent documentation at docs.mollie.com, SDKs in 8 languages
- **120+ local payment methods:** iDEAL, Bancontact, SEPA Direct Debit, Giropay, eps — far more European PM coverage than Stripe
- **No lock-in, no monthly fees:** Pure pay-as-you-go with transparent pricing
- **Recurring billing included:** No need for an additional subscription product
- **Next-day payouts standard:** Faster settlement than most alternatives

**Best for:** Any business operating in Europe that wants dramatically lower processing costs without sacrificing API quality. This is the clear winner for EU-based SaaS, e-commerce, and marketplaces.

---

### 🥉 #3: Adyen — Best for Scaling Enterprises

**Why:**
- **Lowest effective rates at volume:** The interchange++ model means you pay the actual card network cost + a small markup (~0.2–0.6%). At high volumes, this is meaningfully cheaper than Stripe's flat 2.9%
- **True global acquiring:** Direct relationships with card networks in major markets — not a pass-through processor
- **Single omnichannel API:** One integration handles online, mobile, and in-store payments (unlike Stripe which requires Terminal for POS)
- **Enterprise-grade fraud detection:** CAKE ML-based system with device intelligence, far more configurable than standard solutions
- **250+ currencies across 200+ countries:** Truly global coverage
- **Subscriptions and payouts APIs are comprehensive:** Full billing lifecycle management

**Best for:** Businesses processing $1M+ annually that want to optimize every basis point of processing cost while maintaining enterprise-grade API maturity. The sales-onboarding requirement is the barrier — Adyen pushes hard on enterprise deals, which can be good or bad depending on your volume.

---

## Honorable Mentions by Use Case

| Use Case | Recommendation | Why |
|----------|---------------|-----|
| **Selling globally (tax compliance)** | Paddle | Merchant of record handles all VAT/Sales Tax filing — saves enormous overhead even if processing fees are higher |
| **African market focus** | Paystack | Best API quality and pricing for Nigeria, Ghana, Kenya; Stripe rates are 2-3x higher in these markets |
| **Multi-country Africa coverage** | Flutterwave | Broader African country reach than Paystack with competitive pricing |
| **Need interchange-plus flexibility** | Authorize.Net | Connect to any merchant processor and negotiate your own rate; effective rates can drop to ~2.2% |
| **Physical retail + online** | Square | Unified ecosystem; in-person rate of 2.6% + 10¢ beats every alternative |
| **Extreme global coverage** | Rapyd | 160+ countries, 500+ local payment methods through one API |
| **US-focused, want lower fees** | Razorpay (US) | 2.70% + $0.30 with free promo up to $50K volume; genuine cost savings vs Stripe |

---

## Key Takeaways

1. **For pure cost savings with equal API quality:** Braintree (2.89% vs 2.9%) and Mollie in EU (1.80% vs ~2.9%) offer real per-transaction savings without sacrificing developer experience.

2. **At scale, interchange++ wins:** Adyen's and Checkout.com's IC++ models save meaningful money once you're processing enough volume to overcome the onboarding friction.

3. **"Cheaper" depends on your definition:** Paddle is more expensive per transaction but can be cheaper total-cost-of-ownership for SaaS businesses when you factor in tax compliance overhead.

4. **Geography matters most:** Mollie dominates EU, Paystack/Flutterwave dominate Africa, and Braintree/Razorpay are the best US alternatives. There is no single "cheaper than Stripe" provider that excels globally — but the top 3 cover all major use cases well.

5. **API maturity bar is high:** All of the top alternatives listed have REST APIs with SDKs and webhook support comparable to Stripe. The providers that fall short on developer experience are Authorize.Net (dated API) and 2Checkout (poor documentation), so they don't qualify as direct replacements for most developers.
