# TreeInAPool — Website v2 Product Requirements Document

**Product:** TreeInAPool marketing & lead-generation website (v2 rebuild)
**Owner:** Olaseni Otusanya
**Status:** Draft for founder review
**Date:** 31 Aug 2026
**Predecessor:** Lovable prototype (v1) — used as directional inspiration only; v2 is a ground-up rebuild

---

## 1. Context & Problem Statement

TreeInAPool is a product development agency. The v1 Lovable prototype validated the concept and rough content, but it falls short on three fronts:

1. **Sophistication** — the site reads as a template rather than the work of an agency that builds digital products for a living. An agency's own site is its strongest portfolio piece; a generic one actively undermines credibility.
2. **Navigation** — visitors can't move through the site with a clear path from "what do you do" → "proof you're good" → "how do we start."
3. **UI/UX efficiency** — too many clicks, unclear hierarchy, and no single obvious conversion action per page.

**The core job of this site:** convert a skeptical prospect (founder, SME owner, or product lead) into a booked discovery call in under 3 minutes of browsing.

---

## 2. North Star Metric & Supporting Metrics

| Metric | Definition | Target (90 days post-launch) |
|---|---|---|
| **North Star: Qualified discovery calls booked** | Calls booked via site CTA where prospect fits ICP | 8–12 / month |
| Visitor → CTA click rate | % of sessions with ≥1 primary CTA click | ≥ 6% |
| CTA click → booking completion | % who finish the booking flow | ≥ 40% |
| Time to first meaningful action | Median seconds from landing to first scroll-past-hero or click | < 15s |
| Bounce rate (homepage) | Single-page sessions with no interaction | < 55% |
| Mobile Lighthouse performance score | Core Web Vitals proxy | ≥ 90 |

---

## 3. Target Users & Jobs-to-be-Done

| Persona | Situation | Job-to-be-done | What convinces them |
|---|---|---|---|
| **Non-technical founder** | Has an idea or a rough prototype (often no-code) | "Turn my idea into a real, scalable product" | Case studies, plain-language process, fixed-scope packages |
| **SME / business owner** | Existing business needs an app, portal, or automation | "Digitize my operations without hiring a dev team" | Industry-relevant examples, pricing transparency, speed |
| **Product lead / CTO** | Needs extra build capacity | "Extend my team with people who ship" | Tech stack depth, engineering process, code quality signals |

**Primary market note:** if serving both African/Nigerian and international clients, the site must feel globally credible while remaining locally reachable (WhatsApp contact, local case studies, NGN/USD pricing framing — decide in §11).

---

## 4. Scope

### 4.1 In scope (v2 launch)
- 6-page site: Home, Services, Work/Case Studies, Process, About, Contact/Book
- Booking integration (Calendly or equivalent) embedded, not just linked
- CMS-lite for case studies (markdown or headless CMS) so new work can be added without a developer
- Analytics + event instrumentation (§9)
- Responsive design, mobile-first
- SEO fundamentals: metadata, OG images, sitemap, semantic HTML

### 4.2 Out of scope (v2)
- Blog (v2.1 candidate)
- Client portal / login
- Multi-language
- Live chat (WhatsApp deep link is the interim)

---

## 5. Information Architecture & Navigation

**Principle: one primary action per page, never more than two clicks to booking.**

```
Home
├── Services        (what we build)
├── Work            (proof — case studies)
│     └── /work/[slug]  (individual case study)
├── Process         (how engagement works)
├── About           (who we are)
└── Book a Call     (persistent CTA — header button + footer + inline)
```

**Navigation rules:**
- Sticky header, max 5 items + 1 visually distinct CTA button ("Book a Call")
- Footer repeats nav + contact channels (email, WhatsApp, LinkedIn)
- Every page ends with a contextual CTA section — no dead ends
- Breadcrumbs only on case study detail pages
- Mobile: hamburger opens a full-screen menu with the CTA pinned at the bottom

---

## 6. Page-by-Page Requirements

### 6.1 Home
| Section | Content | Acceptance criteria |
|---|---|---|
| Hero | One-sentence value prop + subline + primary CTA + one credibility line (e.g., "X products shipped") | Value prop readable without scrolling on 375px viewport; CTA above the fold |
| Services snapshot | 3–4 service cards linking to Services page | Each card ≤ 20 words; hover/tap state present |
| Featured work | 2–3 case study cards with outcome-first headlines ("Cut onboarding time 60%", not "Built an app") | Cards pull from CMS; images lazy-loaded |
| Process teaser | 3–4 step visual strip | Links to Process page |
| Social proof | Client logos and/or 1–2 short testimonials | No fake logos; omit section entirely if none available yet |
| Final CTA | "Book a free discovery call" + embedded scheduler or link | Booking reachable in ≤ 1 click |

### 6.2 Services
- Each service gets: name, who it's for, what's included, typical timeline, starting-from price band (decision D3, §11), and a CTA.
- Suggested service structure (adjust to actual offering):
  1. **Prototype → Production** (rebuild no-code/MVP prototypes into scalable products — this is literally the journey the client is on when they find you; lead with it)
  2. **Product Design (UI/UX)**
  3. **Full-cycle Product Development** (discovery → design → build → launch)
  4. **AI & Automation Integration**
- Acceptance: a first-time visitor can state what TreeInAPool does in one sentence after this page (test with 3 people pre-launch).

### 6.3 Work / Case Studies
- Grid of cards; each detail page follows a fixed template: **Client & context → Problem → Approach → Outcome (with numbers) → Stack → Testimonial → CTA.**
- Acceptance: template enforced by CMS schema; minimum 2 case studies at launch (even if one is an internal/self-initiated build, labeled honestly).

### 6.4 Process
- 4–5 stage visual timeline (e.g., Discover → Define → Design → Build → Launch & Support) with what the client gets and does at each stage, plus typical duration.
- FAQ accordion (pricing model, IP ownership, communication cadence, post-launch support).
- Acceptance: answers the top 5 pre-sales questions so the discovery call starts warmer.

### 6.5 About
- Founder story (short), team/partner model honesty, values, and why "TreeInAPool" (the name is distinctive — give it a one-line origin story; memorable names with stories get retold).
- Acceptance: at least one real photo; no stock-photo "team" imagery.

### 6.6 Contact / Book
- Embedded scheduler as primary path; short form (name, email, project type, budget band, one free-text field) as secondary; WhatsApp deep link as tertiary.
- Acceptance: form ≤ 5 fields; submission confirmed on-screen and by email; scheduler loads in < 2s.

---

## 7. Design Direction (UI/UX Requirements)

**Anti-template principles — this is where v2 must visibly beat the Lovable prototype:**

1. **Typography-led design.** One distinctive display face for headlines + one clean text face. No default shadcn/Inter-everywhere look.
2. **A real color system.** 1 dominant brand color, 1 accent used *only* for CTAs, generous neutrals. CTA color appears nowhere else — this alone fixes most "where do I click" problems.
3. **Whitespace as hierarchy.** Fewer elements per viewport; each scroll reveals one idea.
4. **Motion with restraint.** Subtle scroll-reveal and hover states only; no parallax carnival. Respect `prefers-reduced-motion`.
5. **Outcome-first copywriting.** Every headline states a client outcome, not a feature. ("We turn prototypes into products people pay for" > "We offer development services.")
6. **Grid discipline.** 12-col desktop / 4-col mobile, consistent spacing scale (4/8px system).

**UX efficiency rules:**
- Max 1 primary + 1 secondary CTA visible at any time
- All tap targets ≥ 44px
- Forms: inline validation, no page reloads
- Zero autoplay media; hero loads as static or CSS-only animation
- WCAG 2.1 AA contrast throughout

---

## 8. Technical Requirements

| Area | Requirement | Rationale |
|---|---|---|
| Framework | Next.js (or Astro) with static generation | Speed, SEO, easy hosting |
| Styling | Tailwind with a defined design-token layer | Consistency + fast iteration |
| CMS | Markdown files in repo (simplest) or Sanity/Contentful free tier | Case studies without a dev |
| Hosting | Vercel or Netlify free tier | Zero-ops, preview deploys |
| Booking | Calendly embed (inline widget) | Already familiar; native embed beats link-out |
| Forms | Formspree / native API route + email | Low cost |
| Performance budget | LCP < 2.5s, CLS < 0.1, total JS < 200KB gzipped on landing | Mobile-heavy audience |
| SEO | Per-page meta, OG images, structured data (Organization, Service) | Discoverability |

---

## 9. Instrumentation Plan

**Tooling:** Plausible or GA4 + a lightweight event layer.

| Event | Trigger | Why it matters |
|---|---|---|
| `cta_click_primary` | Any "Book a Call" click (prop: page, position) | North Star funnel top |
| `booking_started` | Scheduler widget opened | Funnel mid |
| `booking_completed` | Scheduler confirmation | North Star numerator |
| `form_submitted` | Contact form success | Secondary conversion |
| `whatsapp_click` | WhatsApp deep link tap | Channel preference signal |
| `case_study_read` | ≥ 60% scroll on a case study page | Proof-content engagement |
| `service_card_click` | Service card → detail | Which offer draws interest |

**Review cadence:** weekly funnel check for first 4 weeks, then biweekly. Kill/iterate rule: any page with > 70% bounce and < 2% CTA click after 4 weeks gets redesigned or merged.

---

## 10. Launch Acceptance Criteria (Definition of Done)

- [ ] All 6 pages live, responsive 320px–1440px+, cross-browser (Chrome, Safari, Firefox, mobile Safari/Chrome)
- [ ] Booking flow tested end-to-end: click → schedule → confirmation email received
- [ ] Contact form tested with real submission
- [ ] Lighthouse ≥ 90 performance / ≥ 95 accessibility / ≥ 95 SEO on Home (mobile)
- [ ] All events in §9 firing and visible in analytics
- [ ] Minimum 2 case studies published with outcome metrics
- [ ] No lorem ipsum, no placeholder images, no broken links (crawl check)
- [ ] Favicon, OG image, 404 page, sitemap.xml, robots.txt present
- [ ] 3-person hallway usability test passed: each can (a) say what TreeInAPool does, (b) find pricing/engagement info, (c) reach booking — all in < 2 minutes

---

## 11. Founder Decision Log (open decisions)

| # | Decision needed | Options | Recommendation | Status |
|---|---|---|---|---|
| D1 | Build approach | (a) Claude/AI-assisted custom build on Next.js, (b) Framer, (c) upgrade Lovable output | (a) — full control, best performance, reusable as a portfolio proof | Open |
| D2 | Primary market framing | Global-first, Nigeria-first, or dual | Dual: global tone, local reachability (WhatsApp + local case study) | Open |
| D3 | Pricing transparency | Publish "from" price bands vs. no pricing | Publish bands — filters unqualified leads, saves call time | Open |
| D4 | Booking tool | Calendly vs. Cal.com vs. form-only | Calendly inline embed | Open |
| D5 | Case study #1 & #2 | Which projects, and can outcomes be quantified? | Pick the two with the clearest before/after numbers | Open |
| D6 | Domain & email | treeinapool.com + branded email before launch | Secure both before build starts | Open |
| D7 | Name story | Publish the "TreeInAPool" origin on About page | Yes — distinctiveness is an asset | Open |

---

## 12. Milestones (suggested)

| Week | Deliverable |
|---|---|
| 1 | Decisions D1–D7 closed; sitemap + wireframes approved; copy draft for Home & Services |
| 2 | Design system (tokens, type, components) + Home & Services built |
| 3 | Work, Process, About, Contact built; case studies written; booking + analytics wired |
| 4 | QA against §10 checklist, usability test, launch; instrumentation review scheduled |

---

*Next step: close the decision log (§11), then I can draft the sitemap wireframes, the full copy deck, or build the site itself.*
