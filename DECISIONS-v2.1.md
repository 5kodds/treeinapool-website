# Founder decision log, v2.1

Open decisions carried forward from the v2 PRD (D1–D7), added by the v2.1
upgrade brief (D8–D14), and added by the Epic I credibility addendum
(D15–D18).

Everything below is **built and wired**. Each row is content or a
confirmation the founder owns, not engineering work. Where a decision is
outstanding, the site ships a clearly bracketed placeholder rather than an
invented value, and nothing fabricated reaches a production build.

## Blocking launch

| ID | Decision needed | Where it lands | Why it blocks |
|----|----------------|----------------|---------------|
| D5 | Outcome numbers, and permission to name Baniri Technologies | `content/case-studies/*.md` | The invented studies are gone. Farm Buddy (own product), Vuvu.ng (for Baniri Technologies) and AfroMadeIt Global (own company, founder is Co-Founder & COO) replace them, each labelled for what it actually is. **No metrics anywhere**, so the outcome band stays hidden until real figures are confirmed. The Vuvu `[ Confirm ]` gap is closed: duration now reads Sep 2024 to Sep 2025 from the founder's own record, and the App Store listing (Baniri Technologies Ltd, v1.0 on 19 Nov 2024) is cited in the study because it is publicly checkable. **The resume metrics are deliberately not published**: 45% fewer defects, 25% earlier pest detection, 90%+ forecast accuracy and 60%+ of queries automated are self-reported, and the outcome band says in print that every figure there is client-confirmed. Get Baniri to confirm them and they can go in. **Naming a client publicly still needs their agreement**, so confirm Baniri are happy to be named before this goes in front of anyone |
| D6 | Confirm the production domain | `src/lib/site.ts` → `SITE_URL` | Canonicals, sitemap, OG URLs and JSON-LD all derive from it |
| D7 | Sign off the origin, founder and name copy | `src/app/about/page.tsx` | **Drafted at the founder's request**, from the three real projects. The founder bio is now written rather than bracketed, built from what is publicly verifiable (AfroMadeIt lists him as Co-Founder & COO, Product; Baniri Technologies Ltd is the listed developer of Vuvu) plus his own resume. One line to decide on: it says he worked in agricultural extension for close to four years before writing software, which is prior work rather than training history, and it is what makes the Farm Buddy origin land. Cut that sentence if he would rather not lead with it. The degree and the Udacity nanodegree are deliberately left out, per the earlier "projects only" instruction. The name section is an explicit metaphor rather than an invented anecdote, so it is a position to endorse, not a memory to remember. Needs a read-through |
| D12 | Privacy and Terms legal review | `/privacy`, `/terms` | Both pages carry a visible "template copy pending legal review" notice |
| D18 | Confirm WCAG 2.1 AA is a commitment TreeInAPool will hold to | `/accessibility` | The page states it as a public commitment; `npm run a11y` enforces it in CI |
| n/a | Products-shipped count and start year | `src/app/page.tsx` hero | Reads `[ 00 ] products shipped since [ year ]` |

## Blocking a specific feature, not launch

| ID | Decision needed | Where it lands | What it unblocks |
|----|----------------|----------------|------------------|
| D2 | ~~WhatsApp number~~ | `src/lib/site.ts` → `WHATSAPP_NUMBER` | **Resolved.** +1 985 244 7681 is live; WhatsApp CTAs and the footer link out to wa.me |
| D8 | Real testimonial quotes and client logos, **with written permission** | `src/lib/site.ts` → `TESTIMONIALS`, `TRUST_ITEMS` | The quote carousel and trust bar are hidden in production until real data lands. Verified: a default production build contains neither the placeholder quotes nor the placeholder logos |
| D10 | Review the three seeded insight articles | `content/insights/*.md` | They are authored drafts (generic educational content, no client claims) and are live on `/insights` today |
| D15 | Approve the teardown format and its "not a client engagement" labelling | `content/teardowns/`, `/teardowns` | The template ships with `draft: true`, so nothing publishes until approved |
| D16 | Which sites get teardowns, and whether each is public or private to the pitch | `content/teardowns/*.md` | No subject is named anywhere in the repo |

## Non-blocking

| ID | Decision needed | Where it lands | Current behaviour |
|----|----------------|----------------|-------------------|
| D1 | Stack choice | n/a | Settled: Next.js 16 App Router, static generation |
| D4 | Booking tool | `/contact` | Settled for now: form-only, no scheduler embed. Both enquiry paths work today |
| D9 | Approve or edit the personality statement | `src/lib/site.ts` → `PERSONALITY_STATEMENT` | Draft copy is live on the Home page |
| D11 | Public location line | `src/lib/site.ts` → `LOCATION_LINE` | Footer shows `[ Location line, D11 ]` |
| D13 | Social profile URLs (LinkedIn, X, others) | `src/lib/site.ts` → `SOCIAL_LINKS` | **Half resolved.** LinkedIn is live at `linkedin.com/in/olaseniotusanya` and now also appears in the founder `sameAs` on the Organization JSON-LD. X is still a placeholder: the handle `@olaseniotusanya` is listed on his GitHub profile, but it is a personal account, so it links out only if he wants it to. Links render only once a real URL exists |
| D14 | Newsletter provider | `FORMSPREE_NEWSLETTER_ENDPOINT` | Sign-ups are accepted and the visitor is offered a mailto fallback; nothing is stored until this is set |
| D17 | Budget bands on the enquiry forms | `src/lib/contact-schema.ts` → `BUDGET_BANDS`, `REBUILD_BUDGET_BANDS` | **Resolved.** Both sets now mirror the published starting-from bands, so a band means the same thing on the form as on the page that sent the visitor there. Each set ends with "Above the bands, custom scope" and "Prefer to discuss on the call" |

## Also needed before real leads arrive

**Resolved.** `FORMSPREE_ENDPOINT` and `FORMSPREE_NEWSLETTER_ENDPOINT` are
set in Vercel, and both were verified against the live deployment: the
enquiry and newsletter endpoints each returned `delivered: true`. Note that
Formspree rejects server-to-server posts with HTTP 403 while reCAPTCHA is
enabled on a form, so that setting is off on both. Spam protection for
these forms therefore belongs in the app (honeypot, rate limiting) rather
than at Formspree.

Without the variables the forms still work on screen but store and send
nothing, falling back to a pre-filled mailto so a lead still reaches
`treeinapool@gmail.com`.

## Pricing, D3, resolved

Bands are live on `/services` and in `src/lib/site.ts`. They are
**starting-from figures for a fixed scope**, not hourly estimates, and the
naira and dollar columns are priced to their own markets rather than
converted from each other. At the September 2026 rate of roughly ₦1,375 to
the dollar a straight conversion would put the naira column three to four
times above what senior product work actually clears in Lagos, which would
make the naira price decorative. Two markets, two prices, stated as such.

| Service | Timeline | From (NGN) | From (USD) | What it was set against |
|---------|----------|-----------|-----------|-------------------------|
| S1 Prototype → production | 4 to 8 weeks | ₦6.5m | $12k | No-code to production rebuilds quoted at $30k to $100k by US and EU agencies; boutique and offshore equivalents at 40 to 60 per cent less |
| S2 Product design | 2 to 4 weeks | ₦4.0m | $7.5k | Fixed-fee design sprints at $8k to $25k, MVP design packages at $15k to $60k with mid-tier agencies |
| S3 Full-cycle build | 8 to 14 weeks | ₦12m | $22k | Agency MVPs at $30k to $150k, median around $120k; lean multi-feature builds at $30k to $60k |
| S4 AI & automation | 3 to 6 weeks | ₦4.5m | $8k | Single-workflow automation at $5k to $15k, multi-workflow at $15k to $50k |
| S5 Custom scope | Set in scoping | Priced after discovery | Priced after discovery | The escape hatch, for work that outgrows the four |

Where the naira column sits: Nigerian agencies quote ₦1.5m and up for a
custom web application, and mid-market business sites at ₦600k to ₦1.2m.
Those are website prices. These bands sit deliberately above them, because
what is being sold is senior product work with a written scope and
transferred ownership, not a five-page site.

**What still needs the founder.** The bands are researched, not invented,
but they are still a positioning decision only he can sign: raise them if
the first three enquiries close without anyone blinking, and say so if the
naira column turns out to be reading high for the local market. The dollar
and naira ladders should move together when they move.

## Conflicts flagged rather than guessed

None. Where the v2.1 brief and the v2 PRD could have collided, on booking
(PRD D4: form-only) and pricing display (PRD D3: bands with placeholders),
the PRD's founder decisions were kept, as the brief instructs.
