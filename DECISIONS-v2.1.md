# Founder decision log, v2.1

Open decisions carried forward from the v2 PRD (D1–D7), added by the v2.1
upgrade brief (D8–D14), and added by the Epic I credibility addendum
(D15–D18).

Everything below is **built and wired**, each row is content or a
confirmation the founder owns, not engineering work. Where a decision is
outstanding, the site ships a clearly bracketed placeholder rather than an
invented value, and nothing fabricated reaches a production build.

## Blocking launch

| ID | Decision needed | Where it lands | Why it blocks |
|----|----------------|----------------|---------------|
| D3 | Real "starting from" price bands per service | `src/lib/site.ts` → `SERVICES[].bandNgn` / `bandUsd` | The comparison table and every service card currently show `₦[ 0.0m ] / $[ 0k ]` |
| D5 | Real case study data, client name, sector, confirmed numbers | `content/case-studies/*.md` | Both seeded case studies are templates; every figure must be one the client has confirmed |
| D6 | Confirm the production domain | `src/lib/site.ts` → `SITE_URL` | Canonicals, sitemap, OG URLs and JSON-LD all derive from it |
| D7 | Founder origin story, bio, and the "why TreeInAPool" line | `src/app/about/page.tsx` | Three bracketed paragraphs are visible on `/about` today |
| D12 | Privacy and Terms legal review | `/privacy`, `/terms` | Both pages carry a visible "template copy pending legal review" notice |
| D18 | Confirm WCAG 2.1 AA is a commitment TreeInAPool will hold to | `/accessibility` | The page states it as a public commitment; `npm run a11y` enforces it in CI |
|, | Products-shipped count and start year | `src/app/page.tsx` hero | Reads `[ 00 ] products shipped since [ year ]` |

## Blocking a specific feature, not launch

| ID | Decision needed | Where it lands | What it unblocks |
|----|----------------|----------------|------------------|
| D2 | WhatsApp number (international format, digits only) | `src/lib/site.ts` → `WHATSAPP_NUMBER` | WhatsApp CTAs currently fall back to email; the footer shows `[ number, D2 ]` |
| D8 | Real testimonial quotes and client logos, **with written permission** | `src/lib/site.ts` → `TESTIMONIALS`, `TRUST_ITEMS` | The quote carousel and trust bar are hidden in production until real data lands. Verified: a default production build contains neither the placeholder quotes nor the placeholder logos |
| D10 | Review the three seeded insight articles | `content/insights/*.md` | They are authored drafts (generic educational content, no client claims) and are live on `/insights` today |
| D15 | Approve the teardown format and its "not a client engagement" labelling | `content/teardowns/`, `/teardowns` | The template ships with `draft: true`, so nothing publishes until approved |
| D16 | Which sites get teardowns, and whether each is public or private to the pitch | `content/teardowns/*.md` | No subject is named anywhere in the repo |

## Non-blocking

| ID | Decision needed | Where it lands | Current behaviour |
|----|----------------|----------------|-------------------|
| D1 | Stack choice |, | Settled: Next.js 16 App Router, static generation |
| D4 | Booking tool | `/contact` | Settled for now: form-only, no scheduler embed. Both enquiry paths work today |
| D9 | Approve or edit the personality statement | `src/lib/site.ts` → `PERSONALITY_STATEMENT` | Draft copy is live on the Home page |
| D11 | Public location line | `src/lib/site.ts` → `LOCATION_LINE` | Footer shows `[ Location line, D11 ]` |
| D13 | Social profile URLs (LinkedIn, X, others) | `src/lib/site.ts` → `SOCIAL_LINKS` | Links render only once a real URL exists; `sameAs` in the Organization JSON-LD fills itself from the same list |
| D14 | Newsletter provider | `FORMSPREE_NEWSLETTER_ENDPOINT` | Sign-ups are accepted and the visitor is offered a mailto fallback; nothing is stored until this is set |
| D17 | Budget bands on the rebuild enquiry form | `src/lib/contact-schema.ts` → `REBUILD_BUDGET_BANDS` | Placeholder bands are live and functional; change the array to change the form |

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
`hello@treeinapool.com`.

## Conflicts flagged rather than guessed

None. Where the v2.1 brief and the v2 PRD could have collided, booking
(PRD D4: form-only) and pricing display (PRD D3: bands with placeholders), the PRD's founder decisions were kept, as the brief instructs.
