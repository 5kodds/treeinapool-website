# Certification badges, D19

The footer has a credential bar. It renders nothing until
`src/lib/site.ts` → `CREDENTIALS` has a row, and it should stay that way
until a certificate actually exists.

## Why the reference badges cannot simply be copied

The Google Partner, Meta Business Partner and Premier Partner marks in the
reference footer are not decoration, they are the output of programmes that
verify membership in a public directory. Anyone evaluating this studio can
search that directory in one click. Displaying a mark without the
certification is also trademark misuse, on top of being a false claim to a
prospective client, and it is the single easiest thing on a website to
disprove.

There is a second problem with those two specifically. Both are **advertising
programmes**. Google Partner requires a rolling 90-day spend of $10,000
across managed Google Ads accounts, plus certified strategists and a 70 per
cent optimisation score. Meta's is structured the same way, around managed
ad spend. TreeInAPool does not run ads for clients, so even at full effort
neither is reachable, and neither would mean anything to somebody buying a
product build.

## What is worth pursuing, in order

| Programme | Why it fits | Cost to enter | Realistic effort |
|-----------|-------------|---------------|------------------|
| **Vercel Solution Partner**, then Partner Certification | The whole studio ships Next.js on Vercel. This is the badge that matches what is actually sold, and certification is tied to real Next.js and Vercel releases | Free to apply | Apply, then certify developers. Recertification follows major releases |
| **Shopify Partner**, Service Track | Free, immediate, and real. Gives unlimited development stores. Worth holding the moment any commerce work is on the table | Free | Sign up, agree terms. Tiers rise with delivered work |
| **Google Cloud** or **AWS Partner** | Credible infrastructure signal for the SME and operations buyer. Requires a verified business entity | Free entry tier | Business verification, then a training path |
| **Stripe partner ecosystem** | Directly adjacent to the Vuvu.ng payments work. Higher tiers are invitation-only | Free to start | Check the partner portal for current tiers |
| **Clutch / GoodFirms profile** | Not a certification, but third-party verified client reviews, which is the gap this site actually has | Free | Needs clients willing to be interviewed. Blocked on the same permission as D8 |

## The honest sequence

The badge bar is not the constraint. Verified client reviews are: the site
has no testimonial, no logo and no confirmed outcome figure, and a
prospective client feels that before they notice a missing partner mark.

1. Get the Baniri confirmation (see `TESTIMONIAL-REQUESTS.md`). It unblocks
   real numbers on the Vuvu study and a first review.
2. Apply for **Vercel Solution Partner**. It is free, it matches the work,
   and it is the badge a technical buyer respects.
3. Register as a **Shopify Partner** the same afternoon. Free, immediate.
4. Revisit cloud partner status once there is a registered business entity
   and a second engineer to certify.

## Adding one once it is earned

```ts
// src/lib/site.ts
export const CREDENTIALS: Credential[] = [
  {
    name: "Vercel Solution Partner",
    note: "Certified on Next.js and Vercel delivery",
    href: "https://vercel.com/partners/find-a-partner?slug=treeinapool",
    logo: "/credentials/vercel-partner.svg",
  },
];
```

Use the artwork the programme supplies, at the size and clear space its
brand guidelines require, and point `href` at the entry in the issuer's own
directory rather than at a page on this site. A badge a visitor cannot
verify is decoration, and this site does not ship decoration.
