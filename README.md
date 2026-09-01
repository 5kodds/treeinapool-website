# TreeInAPool Website

**Live: https://treeinapool-website.vercel.app**

Deployed on Vercel from `main`: every push builds and ships. A custom domain
is still open as decision D6, and `SITE_URL` follows whatever host the site
is served from, so nothing in the code changes when that domain lands.

Marketing and lead-generation site for TreeInAPool. Next.js App Router,
TypeScript, Tailwind v4, statically generated, no CMS and no database.

Built from the v2 PRD and the Claude Design mockups, then upgraded per
`UPGRADE-BRIEF-v2.1` (informative & sophisticated) and its Epic I
credibility addendum.

## Stack

- **Next.js 16** (App Router, static generation) + **React 19** + **TypeScript**
- **Tailwind v4**: design tokens in `src/app/globals.css` under `@theme`,
  with component classes in `@layer components` so utilities always win
- **gray-matter** for the three markdown content types
- **zod** for form validation, client and server side
- Dev-only tooling: **lighthouse** (`npm run perf`), **axe-core** +
  **playwright** (`npm run a11y`)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build, every page statically generated
npm run lint
npm run perf     # regenerate content/performance/latest.json (needs a build first)
npm run a11y     # axe-core across every route, desktop + mobile; fails on serious/critical
npm run audit    # dead links, metadata, JSON-LD, console errors, placeholder leaks
npm run e2e      # the journeys that convert: both forms, newsletter, nav, accordions
npm run cta      # every link and button on every route actually goes somewhere
npm run verify   # lint + build + a11y + audit + cta + e2e, in order
npm run logo     # regenerate the logo assets from assets-src/ (rarely needed)
```

`npm run verify` is the one command to run before a deploy. Each of the
four checks below also runs on every push in CI.

## Project structure

```
content/case-studies/*.md   # client work
content/insights/*.md       # articles
content/teardowns/*.md      # unsolicited analyses (draft: true by default)
content/performance/        # latest.json, written only by `npm run perf`
scripts/perf.mjs            # Lighthouse run → latest.json
scripts/a11y.mjs            # axe-core run, used by CI
src/app/                    # routes, sitemap.ts, robots.ts, opengraph-image.tsx
src/components/             # shared UI and page components
src/lib/site.ts             # nav, services, process, FAQs, proof data, budgets
src/lib/markdown.ts         # dependency-free renderer for the article subset
```

## Content types

All three are markdown with frontmatter, loaded by a matching `src/lib/*.ts`.
Adding a file publishes a page with no code change, and the sitemap picks it up.

**Case studies** (`content/case-studies/`): client, sector, engagement,
duration, problem, approach steps, outcome stats, stack, optional
testimonial. The testimonial band renders only when the field is non-null.

**Insights** (`content/insights/`): title, date, category, summary,
optional readingTime (derived when absent) and `draft`. Renders with a
sticky table of contents built from the `##` headings.

**Teardowns** (`content/teardowns/`): unsolicited analyses of public
sites, deliberately styled apart from client work and labelled *"Unsolicited
analysis. Not a client engagement."* Every finding and prediction requires
`source` and `observedOn`; entries missing either are **dropped at load
time**, so an undated assertion cannot ship. `draft: true` keeps a teardown
out of the index and sitemap. Read the rules in the template header before
writing one.

## Wire up lead delivery

Both enquiry paths (`/contact`, new project and rebuild tabs) post to
`/api/contact`, which validates with zod and then:

- if `FORMSPREE_ENDPOINT` is set, forwards the submission with a
  `lead_type` of `project` or `rebuild` so the two can be triaged apart;
- if it isn't set, accepts the submission so the on-screen flow works but
  **stores and sends nothing**. The visitor gets a pre-filled `mailto:`
  fallback so a real lead still reaches `treeinapool@gmail.com`.

`/api/subscribe` behaves the same way for newsletter sign-ups via
`FORMSPREE_NEWSLETTER_ENDPOINT`. Copy `.env.example` to `.env.local` and
fill both in before driving traffic. Swapping to Resend or SendGrid means
changing one branch in each route.

## Placeholder discipline

Proof sections are built but empty: testimonials and client logos live in
`src/lib/site.ts` as typed placeholders and render **only** when
`NEXT_PUBLIC_SHOW_PLACEHOLDER_PROOF=true` (on in development, off in
production). Filling in real, permissioned data and flipping that one
variable is the entire go-live step.

Everything else the founder owns (pricing bands, the products-shipped
count, the WhatsApp number, case study figures, the founder bio and the
name-origin story) is a visibly bracketed `[ placeholder ]` rather than an
invented value. `DECISIONS-v2.1.md` tracks every one, who it blocks, and
where it lands.

## Performance and accessibility

`/performance` publishes this site's own Lighthouse figures. Nothing on
that page is typed by hand: it renders `content/performance/latest.json`,
which only `npm run perf` writes, and it shows the measurement date, the
Lighthouse version, and the profile used. If no run has been recorded, the
page says so instead of showing a number. **Re-run it against the live
domain before any pitch.**

`/accessibility` states WCAG 2.1 AA as a commitment. `npm run a11y` runs
axe-core over every route at 1440px and 390px and exits non-zero on any
serious or critical violation; CI runs it on every push. Pinch-zoom is never
disabled, and reduced-motion visitors get instant states with no
auto-advancing carousel.

## What the checks cover

| Command | Catches | Fails the build on |
|---|---|---|
| `npm run lint` | Type and lint errors | any error |
| `npm run build` | Anything that breaks static generation | any error |
| `npm run a11y` | WCAG 2.1 AA violations, both viewports | serious or critical |
| `npm run audit` | Dead internal links, missing title/description/og, unparseable JSON-LD, `<img>` with no alt, missing or duplicated `<h1>`, console errors, failed requests | any ERROR |
| `npm run cta` | Links with no destination, buttons with no handler, CTAs that don't navigate | any dead control |
| `npm run e2e` | Both enquiry forms, newsletter, nav dropdown (hover + keyboard + Escape), FAQ accordions, mobile menu | any failed journey |

`npm run e2e` submits the forms, so it starts its server with the Formspree
endpoints blanked. The submission path is exercised end to end and nothing
is ever delivered, which keeps the suite from eating the Formspree quota.
Delivery itself is confirmed by hand against production, not on every run.

Two deliberate design choices in `audit`:

- **Placeholder leaks are warnings, not errors.** Bracketed placeholders
  are expected until the decision log is closed, so they are reported on
  every run. That list *is* the live view of what `DECISIONS-v2.1.md`
  still owes, but they don't fail the build. When you want them to gate a
  launch, promote them to ERROR in `scripts/audit.mjs`.
- **External links are checked but never fail the build.** A third-party
  outage isn't a reason to block a deploy. CI passes `--skip-external`;
  run `npm run audit` locally to include them.

## Analytics

`src/lib/analytics.ts` exports `track(event, props)`, forwarding to
`window.plausible` when present and no-oping otherwise. To turn it on, add
a Plausible (or GA4) script to `src/app/layout.tsx`.

| Event | Fires when | Props |
|---|---|---|
| `cta_click_primary` | A primary CTA is clicked | `page`, `position` |
| `nav_dropdown_open` | A header nav group opens | `group` |
| `service_card_reveal` | A service card is expanded on Home | `service` |
| `service_card_click` | A case study card is clicked | `card`, `type` |
| `faq_open` | An FAQ or why-us block is expanded | `question`, `page` |
| `carousel_advance` | The quote carousel is advanced manually | `direction` |
| `form_submitted` | The project enquiry form is submitted | `projectType` |
| `rebuild_enquiry_submitted` | The rebuild enquiry form is submitted | `platform`, `timeline` |
| `newsletter_signup` | The footer newsletter form is submitted |, |
| `case_study_read` | 60% scroll on a case study | `slug` |
| `insight_read` | 75% scroll on an article | `slug` |

North-star metric: qualified lead submissions per 100 sessions
(`form_submitted` + `rebuild_enquiry_submitted` over sessions).

## Logo assets

`assets-src/treeinapool-logo-master.png` is the original render, on a solid
white field. It is the only file to replace if the artwork ever changes;
`npm run logo` derives everything the site ships from it:

| Output | Used for |
|---|---|
| `src/assets/treeinapool-logo.png` | Header mark (next/image handles delivery) |
| `src/app/icon.png` | Browser tab icon |
| `src/app/apple-icon.png` | iOS home screen |

The script removes the white background by flood-filling inwards from the
canvas edge, so the pale highlights *on* the mark survive. A global
"delete white" would punch holes through them. The two enclosed loop holes
can't be reached from the edge, so they're caught separately by neutrality:
on this artwork the holes are pure grey-white (saturation 0) while the
highlights are blue-tinted (saturation ~37). Alpha ramps across the
anti-aliased rim rather than hard-cutting, which keeps the edge smooth at
favicon sizes. Output is trimmed to the mark and palette-quantised: 746 KB
down to 57 KB with no visible loss.

## Deploying

Live on Vercel at https://treeinapool-website.vercel.app, building from
`main` on every push. Environment variables set there:

| Variable | Purpose |
|---|---|
| `FORMSPREE_ENDPOINT` | Project and rebuild enquiries |
| `FORMSPREE_NEWSLETTER_ENDPOINT` | Footer newsletter |
| `NEXT_PUBLIC_SITE_URL` | Optional. Overrides the base URL used for canonicals, sitemap and OG images |

`NEXT_PUBLIC_SITE_URL` is optional because `SITE_URL` falls back to Vercel's
own production URL. Set it explicitly once the custom domain (D6) is live.

Both Formspree forms must have **reCAPTCHA disabled**: this app posts
server-to-server, which Formspree treats as an AJAX submission and rejects
with HTTP 403 while reCAPTCHA is on. Spam protection therefore belongs in
this app (honeypot, rate limiting) rather than at Formspree.

Verified against the live deployment: every route returns 200, the 404 page
works, canonicals and OG image URLs resolve to the deployed host, and both
enquiry and newsletter submissions return `delivered: true`.
