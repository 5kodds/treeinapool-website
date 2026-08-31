# TreeInAPool — Website v2

Marketing & lead-generation site for TreeInAPool, rebuilt per the [v2 PRD](./uploads/treeinapool-website-v2-prd.md)
from the Claude Design mockups (Home, Services, Case Study, Mobile). Next.js
App Router, TypeScript, Tailwind v4, statically generated.

## Stack

- **Next.js 16** (App Router, static generation) + **React 19** + **TypeScript**
- **Tailwind v4** — design tokens in `src/app/globals.css` (`@theme`), lifted
  directly from the mockups' design system (`Barlow` / `Barlow Condensed`,
  the blueprint/tick-mark card style, the accent-blue palette)
- **gray-matter** for the case-study content layer (markdown + frontmatter)
- **zod** for form validation, client and server side
- No CMS, no database — case studies are files in `content/case-studies/`

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (statically generates every page)
npm run lint
```

## Project structure

```
content/case-studies/*.md   # one file per case study (see schema below)
src/app/                    # routes (Home, /services, /work, /work/[slug],
                             # /process, /about, /contact, /api/contact,
                             # sitemap.ts, robots.ts, opengraph-image.tsx)
src/components/              # shared + page components
src/lib/site.ts              # services, process stages, FAQs, nav, market config
src/lib/case-studies.ts      # reads content/case-studies/*.md
src/lib/analytics.ts         # track() — see "Analytics" below
```

## Editing content

Most sitewide copy that isn't founder-specific lives in `src/lib/site.ts`
(services, pricing bands, process stages, FAQs, contact info). Case studies
are markdown files in `content/case-studies/` with this frontmatter:

```yaml
title: "Cut onboarding time 60%"
category: "Fintech"
year: 2026
client: "Acme Lending"
sector: "Lending"
engagement: "S3 · Full-cycle build"
duration: "11 weeks"
summary: "..."
problem: "..."
problemTags: ["Manual re-entry", "..."]
approach:
  - title: "Shadowed the desk"
    body: "..."
outcomes:
  - stat: "−60%"
    label: "Time from application to decision"
stack: ["Next.js", "TypeScript", "..."]
testimonial: null # or { quote: "...", name: "..." } once real
featured: true # shows on the Home page
```

Add a new file to add a case study — no code change needed. `/work/[slug]`
and the sitemap pick it up automatically via `generateStaticParams`.

## What's still placeholder (founder decisions, PRD §11)

The build ships fully functional, but the following are intentionally left
as bracketed placeholders — matching the mockups' own convention — rather
than invented numbers, quotes, or photos:

| Item | Where | Needs |
|---|---|---|
| Products-shipped count | Home hero | Real number + year |
| Price bands (D3) | `src/lib/site.ts` → `SERVICES[].bandNgn/bandUsd` | Real "from" prices |
| WhatsApp number | `src/lib/site.ts` → `WHATSAPP_NUMBER` | Number, intl format, no symbols |
| Case study data (D5) | `content/case-studies/*.md` | Real client name, numbers, confirmed by the client |
| Testimonials | Home / case studies | Omit until a real quote exists (already omitted) |
| Founder bio + name origin (D7) | `src/app/about/page.tsx` | Replace the two bracketed paragraphs |
| Domain (D6) | `src/lib/site.ts` → `SITE_URL` | Point at the real domain once secured |

## Wire up lead delivery

The contact form (`/contact` and the Home page's compact form) posts to
`/api/contact`, which validates with zod and then:

- if `FORMSPREE_ENDPOINT` is set, forwards the submission there and the
  visitor sees "Message sent";
- if it isn't set, the submission is accepted (so the on-screen flow still
  works) but is **not stored or emailed anywhere** — the visitor sees a
  fallback `mailto:` link so a real lead still reaches `hello@treeinapool.com`.

Before real launch, either:

1. Create a free [Formspree](https://formspree.io) form and set
   `FORMSPREE_ENDPOINT` to its endpoint URL (`.env.local` locally, project
   env vars on Vercel/Netlify), or
2. Swap the branch in `src/app/api/contact/route.ts` for a different
   provider (Resend, SendGrid, etc.).

Booking (PRD decision D4) is form-only for now — no Calendly/Cal.com embed.
If that changes, the "Book the call" sections in `page.tsx` and `contact/page.tsx`
are where an inline scheduler widget would go.

## Analytics

`src/lib/analytics.ts` exports `track(event, props)`, wired into the CTAs,
the contact form, WhatsApp links, and case-study scroll depth, per the PRD's
instrumentation plan (§9): `cta_click_primary`, `form_submitted`,
`whatsapp_click`, `case_study_read`, `service_card_click`. It forwards to
`window.plausible` when present. To turn it on, add a Plausible (or GA4)
script to `src/app/layout.tsx` and update `track()` if you switch providers.

## Deploying

The project is a standard Next.js app — no special build config. Push to
Vercel or Netlify, set `FORMSPREE_ENDPOINT` (see above) as an environment
variable, and point the domain from PRD decision D6 at it once secured.

## SEO / launch checklist status (PRD §10)

- [x] All 6 pages live, responsive, mobile-first
- [x] Contact form tested end to end (validation + submit + fallback)
- [x] Per-page metadata, dynamic OG image, sitemap.xml, robots.txt, custom 404
- [x] Favicon
- [ ] Booking flow — form-only by decision; add a scheduler embed if that changes
- [ ] Real case studies, pricing, WhatsApp number, founder bio (see table above)
- [ ] Lighthouse pass and analytics wiring — run once deployed to a real domain
- [ ] 3-person hallway usability test
