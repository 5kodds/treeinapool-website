export const SITE_NAME = "TreeInAPool";
/**
 * Absolute base for canonicals, the sitemap, robots, OG image URLs and
 * JSON-LD. It must match wherever the site is actually being served: point
 * it at a domain that does not resolve and every social preview breaks,
 * because the OG image is referenced absolutely.
 *
 * Order: an explicit NEXT_PUBLIC_SITE_URL wins; otherwise Vercel's own
 * production URL if system environment variables are exposed (the default);
 * otherwise the intended domain, pending D6.
 */
const VERCEL_PRODUCTION_URL =
  process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL;

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (VERCEL_PRODUCTION_URL
    ? `https://${VERCEL_PRODUCTION_URL}`
    : "https://treeinapool.com")
).replace(/\/+$/, "");
export const SITE_DESCRIPTION =
  "TreeInAPool is a product development agency. We turn prototypes into products people pay for.";

// D2: dual market framing: global tone, local reach.
export const CONTACT_EMAIL = "treeinapool@gmail.com";
// Digits only, country code first: wa.me rejects spaces and symbols.
export const WHATSAPP_NUMBER = "19852447681";
export const WHATSAPP_URL = WHATSAPP_NUMBER
  ? `https://wa.me/${WHATSAPP_NUMBER}`
  : "";
/** Human-readable form for display; the link itself uses the raw digits. */
export const WHATSAPP_DISPLAY = "+1 985 244 7681";
export const SHOW_WHATSAPP = true;

// D11: public location line for the footer.
export const LOCATION_LINE = "[ Location line, D11 ]";

// D13: real profile URLs needed before these link out.
export const SOCIAL_LINKS: {
  name: string;
  href: string;
  placeholder?: boolean;
}[] = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/olaseniotusanya" },
  { name: "X", href: "", placeholder: true },
];

/**
 * The founder, named once here so the About page, the Organization
 * structured data and anything added later all describe the same person
 * the same way.
 */
export const FOUNDER = {
  name: "Olaseni Otusanya",
  jobTitle: "Founder",
  /** Verifiable, currently held, and stated the same way on the other site. */
  alsoKnownFor: "Co-Founder and COO, Product at AfroMadeIt Global LLC",
  profileUrl: "https://www.linkedin.com/in/olaseniotusanya",
};
export const CURRENCY_NOTE = "NGN / USD";

/**
 * The naira and dollar columns are not one number converted twice. They are
 * two markets, each priced against what senior product work actually costs
 * in it, which is why the ratio between them is not the spot rate.
 */
export const PRICING_BASIS =
  "Bands are the starting point for a fixed scope, not an hourly estimate. The naira and dollar figures are priced to their own markets rather than converted from one another, and the final number is fixed in writing after the discovery call.";

/**
 * The escape hatch for work that does not fit any band. Named here so the
 * services table, the service cards and the enquiry forms all describe the
 * same option in the same words.
 */
export const CUSTOM_SCOPE = {
  label: "Custom scope",
  band: "Priced after discovery",
  summary:
    "Multi-product platforms, regulated builds, migrations off something large, or a scope that spans more than one of the four. Anything above the bands is quoted on its own terms.",
  formOption: "Above the bands, custom scope",
};

export type Service = {
  id: string;
  code: string;
  name: string;
  who: string;
  timeline: string;
  bandNgn: string;
  bandUsd: string;
  summary: string;
  /** Longer "what this actually is" copy for the service page. */
  whatItIs: string;
  /** Who the engagement suits, and who it doesn't. */
  whoItsFor: string;
  included: string[];
  owns: string;
  faqs: { q: string; a: string }[];
};

// D3 resolved. Bands are set from 2026 market benchmarks for senior-led
// boutique studios, read against what this studio actually offers: the
// founder on the engagement, fixed written scope, and ownership transferred
// at launch. See DECISIONS-v2.1.md for the benchmarks each number came from.
export const SERVICES: Service[] = [
  {
    id: "prototype-to-production",
    code: "S1",
    name: "Prototype → production",
    who: "Founders with a no-code build",
    timeline: "4–8 weeks",
    bandNgn: "₦6.5m",
    bandUsd: "$12k",
    summary:
      "Your Lovable or Bubble build, rewritten as a product that survives real users and real load.",
    whatItIs:
      "A rebuild, not a patch. We read the prototype you already have, keep the product decisions it proved, and re-implement it on a stack that survives real traffic, real data and a real team. Your users move across on a migration plan with a rollback, so nobody loses an account on launch day.",
    whoItsFor:
      "For founders whose no-code build has started to hurt: the data model is bending, the monthly bill climbs with every user, and you cannot hire a developer to work on it. If your prototype is still cheap and still answering questions, you are not ready for this yet, and we will tell you so.",
    included: [
      "Audit of the existing prototype and data",
      "Production architecture and stack decision",
      "Rebuild of the core flows",
      "Data migration with a rollback plan",
      "Deploy, monitoring, handover",
    ],
    owns: "Code + accounts",
    faqs: [
      {
        q: "Will our users notice the switch?",
        a: "Only in that it gets faster. The migration runs with a rollback plan, and we cut over once the new build has been tested against real data.",
      },
      {
        q: "Can you keep the same look?",
        a: "Yes. Most rebuilds keep the interface people already know and change what's underneath, unless you specifically want a redesign.",
      },
      {
        q: "What if parts of the prototype are worth keeping?",
        a: "Then we keep them. The audit's job is to separate what proved itself from what was scaffolding.",
      },
    ],
  },
  {
    id: "product-design",
    code: "S2",
    name: "Product design",
    who: "Teams with devs, no designer",
    timeline: "2–4 weeks",
    bandNgn: "₦4.0m",
    bandUsd: "$7.5k",
    summary:
      "Flows, screens and a component system your developers build from directly, with the states and edge cases drawn, not left to interpretation.",
    whatItIs:
      "Flows, screens, and a component system your developers can build from without asking a question every hour. Every state is drawn, including empty, loading, error and permission-denied, because those are the screens that get invented badly at 2am when they aren't specified.",
    whoItsFor:
      "For teams with engineers but no designer, and for founders who need the product decided before they spend build budget. If you need a logo and brand identity, that's a different job and we'll point you somewhere better.",
    included: [
      "User flows for the core journeys",
      "High-fidelity screens, desktop and mobile",
      "Component library with states",
      "Design tokens handed to code",
      "One round of usability testing",
    ],
    owns: "Files + tokens",
    faqs: [
      {
        q: "Do we get the source files?",
        a: "Yes. The design files and the exported design tokens, in your account, from the first week.",
      },
      {
        q: "Can you work with our existing design system?",
        a: "Yes. If one exists we extend it rather than replacing it, which is usually cheaper and always less disruptive.",
      },
      {
        q: "What if our developers disagree with a design?",
        a: "Good. That conversation happens during design, not after the build. Engineering feedback shapes the flows before they're signed off.",
      },
    ],
  },
  {
    id: "full-cycle-build",
    code: "S3",
    name: "Full-cycle build",
    who: "SMEs digitising operations",
    timeline: "8–14 weeks",
    bandNgn: "₦12m",
    bandUsd: "$22k",
    summary:
      "Discovery through launch for one product: a web app, a mobile app, or the internal portal your operation currently runs on spreadsheets.",
    whatItIs:
      "Discovery through launch for one product, run in two-week sprints. Every sprint ends with a live URL you can open and click, and the roadmap is re-published so you can see what shipped, what slipped, and what's next.",
    whoItsFor:
      "For SMEs digitising an operation that currently runs on spreadsheets, shared inboxes and WhatsApp, and for founders taking a validated idea to a first real release. If the scope is genuinely open-ended, start with discovery only.",
    included: [
      "Discovery workshop and written scope",
      "Design (as S2, scoped to the build)",
      "Engineering in two-week sprints",
      "QA, accessibility and performance pass",
      "Launch plus 30 days of support",
    ],
    owns: "The whole product",
    faqs: [
      {
        q: "What happens if the scope changes mid-build?",
        a: "It gets priced in writing and you approve it before anyone builds it. The roadmap is updated so the change is visible, not absorbed silently.",
      },
      {
        q: "How much of our team's time does this take?",
        a: "About two hours a week: one demo, plus decisions only you can make.",
      },
      {
        q: "Do you handle hosting and deployment?",
        a: "Yes, on infrastructure registered in your name so it transfers cleanly at launch.",
      },
    ],
  },
  {
    id: "ai-automation",
    code: "S4",
    name: "AI & automation",
    who: "Operations with manual steps",
    timeline: "3–6 weeks",
    bandNgn: "₦4.5m",
    bandUsd: "$8k",
    summary:
      "The steps someone on your team does by hand every day, such as quoting, triage, reconciliation and reporting, moved into software, with a human still in the loop where it matters.",
    whatItIs:
      "We map the manual work first, then automate the parts that are safe to automate and leave a human in the loop where a wrong answer is expensive. Every deployment ships with an evaluation harness, so accuracy is a number you can watch rather than a claim.",
    whoItsFor:
      "For operations where someone spends hours a day on quoting, triage, reconciliation or reporting. If the underlying process isn't written down anywhere yet, the mapping is the first deliverable, because automating a process nobody agrees on just produces faster confusion.",
    included: [
      "Process mapping of the manual work",
      "Model and tooling selection",
      "Integration with your existing systems",
      "Evaluation harness and accuracy baseline",
      "Escalation paths for the edge cases",
    ],
    owns: "Pipelines + evals",
    faqs: [
      {
        q: "How do we know it's accurate?",
        a: "You get a baseline measured against real examples before launch, and the same harness runs afterwards so drift shows up early.",
      },
      {
        q: "What happens on edge cases?",
        a: "They escalate to a person by design. The system is built to know what it doesn't know.",
      },
      {
        q: "Are we locked into one model provider?",
        a: "No. The integration is written so the model behind it can be swapped without rewriting the workflow.",
      },
    ],
  },
];

export type NavChild = { name: string; href: string; description?: string };

export type NavGroup = {
  name: string;
  href?: string;
  children?: NavChild[];
  /** Rendered as the always-visible primary CTA rather than a nav link. */
  cta?: boolean;
  /** Featured case studies are merged into this group's children at render time. */
  mergeFeaturedWork?: boolean;
};

/** Single source of truth for header and footer navigation. */
export const NAV: NavGroup[] = [
  {
    name: "Services",
    href: "/services",
    children: [
      ...SERVICES.map((service) => ({
        name: `${service.code} · ${service.name}`,
        href: `/services#${service.code.toLowerCase()}`,
        description: service.who,
      })),
      {
        name: "All services",
        href: "/services",
        description: "Compare scope, timeline and bands",
      },
    ],
  },
  {
    name: "Work",
    href: "/work",
    mergeFeaturedWork: true,
    children: [
      {
        name: "All work",
        href: "/work",
        description: "Client engagements, with outcomes",
      },
      {
        name: "Teardowns",
        href: "/teardowns",
        description: "Unsolicited analysis of public sites",
      },
    ],
  },
  {
    name: "Company",
    children: [
      {
        name: "About",
        href: "/about",
        description: "Who builds it, and how the studio works",
      },
      {
        name: "Process",
        href: "/process",
        description: "How an engagement runs, stage by stage",
      },
      {
        name: "Performance",
        href: "/performance",
        description: "Our own Core Web Vitals, dated",
      },
    ],
  },
  { name: "Insights", href: "/insights" },
  // Targets the form directly. Plain /contact left the header CTA doing
  // nothing visible for anyone already on that page.
  { name: "Contact", href: "/contact#enquiry", cta: true },
];

export const PROCESS_STAGES = [
  {
    n: "01",
    name: "Discover",
    duration: "1 week",
    body: "One call, one written scope. You leave knowing price and timeline.",
    client: "Share what you have and what's not working.",
  },
  {
    n: "02",
    name: "Design",
    duration: "2 weeks",
    body: "Flows and screens you approve before a line of product code is written.",
    client: "Review and sign off on flows, screens, and the token system.",
  },
  {
    n: "03",
    name: "Build",
    duration: "4–10 weeks",
    body: "Weekly demo on a live URL. You test what exists, not a status report.",
    client: "Use the live build every week and flag what's off.",
  },
  {
    n: "04",
    name: "Launch & support",
    duration: "30 days",
    body: "Deploy, hand over the code and the accounts, then 30 days of support.",
    client: "Go live, hand your team the keys, raise anything that breaks.",
  },
] as const;

export const DISCOVERY_OUTPUTS = [
  {
    title: "A written scope",
    body: "The sequence we're building, what is explicitly not in it, and the assumptions behind both, so nothing important is carried only in someone's memory.",
  },
  {
    title: "A price and a date",
    body: "Fixed, in writing, with the mechanism for changing them spelled out before anyone needs it.",
  },
  {
    title: "A baseline measurement",
    body: "Where the current numbers actually sit, covering load times, drop-off and whatever the project is meant to move, recorded before we touch anything.",
  },
  {
    title: "A risk list",
    body: "What could make this late or expensive, ranked, with the mitigation for each. The uncomfortable ones go at the top.",
  },
  {
    title: "An honest recommendation",
    body: 'Including "you don\'t need us yet" or "this is the wrong first project" when that is what the week actually showed.',
  },
] as const;

/** Budgets we hold ourselves to on client builds, stated as numbers. */
export const BUDGETS = [
  {
    metric: "Lighthouse performance (mobile)",
    commitment: "≥ 90",
    note: "Measured on the launch build, on the real domain",
  },
  {
    metric: "Lighthouse accessibility",
    commitment: "≥ 95",
    note: "Plus a keyboard-only pass and an axe run with zero serious violations",
  },
  {
    metric: "WCAG conformance",
    commitment: "2.1 AA",
    note: "Treated as a bug class, not a nice-to-have",
  },
  {
    metric: "Largest contentful paint",
    commitment: "< 2.5s",
    note: "On a mid-tier device over 4G",
  },
  {
    metric: "Cumulative layout shift",
    commitment: "< 0.1",
    note: "No content jumping as the page settles",
  },
] as const;

export const MONTHLY_REPORT = [
  "What shipped, with the live URL to check it against",
  "What slipped, why, and the revised date",
  "Budget burned against budget planned",
  "The numbers we baselined at discovery, re-measured",
  "What we need from you next month, with dates",
  "Risks that changed status since last month",
] as const;

/**
 * Proof sections (testimonials, client logos) ship fully built but filled
 * with bracketed placeholders. They render only when this flag is on, * on in development, off in production until real, permissioned data lands.
 */
export const SHOW_PLACEHOLDER_PROOF =
  process.env.NEXT_PUBLIC_SHOW_PLACEHOLDER_PROOF === "true" ||
  process.env.NODE_ENV === "development";

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  /** Placeholder rows never render in production. See D8. */
  placeholder?: boolean;
};

// D8: real quotes + written permission needed before these go live.
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "[ Client quote pending: one sentence, in their words, naming the change they felt. ]",
    name: "[ Name ]",
    role: "[ Role, company ]",
    placeholder: true,
  },
  {
    quote: "[ Client quote pending: the outcome, not the adjectives. ]",
    name: "[ Name ]",
    role: "[ Role, company ]",
    placeholder: true,
  },
  {
    quote: "[ Client quote pending: what working together was actually like. ]",
    name: "[ Name ]",
    role: "[ Role, company ]",
    placeholder: true,
  },
];

export type TrustItem = { name: string; note: string; placeholder?: boolean };

// D8: no logo goes up without the client's written sign-off.
export const TRUST_ITEMS: TrustItem[] = [
  { name: "[ Client logo ]", note: "Fintech", placeholder: true },
  { name: "[ Client logo ]", note: "Operations", placeholder: true },
  { name: "[ Client logo ]", note: "Logistics", placeholder: true },
  { name: "[ Client logo ]", note: "Healthcare", placeholder: true },
];

// D9: founder sign-off needed on this line.
export const PERSONALITY_STATEMENT =
  "Working with us is less like hiring an agency and more like hiring the two people who will actually build the thing, because that is who turns up to the call.";

export const WHY_US = [
  {
    title: "You are never guessing what happened this week",
    body: "Most agency relationships go quiet between invoices. Ours can't: every sprint ends with a live URL you can open, click, and break. If a week went badly, you find out in that demo, not in a post-mortem.",
    points: [
      "Two-week sprints, each ending in working software",
      "A re-published roadmap showing what shipped and what slipped",
      "One person accountable, reachable, and in the demo",
    ],
  },
  {
    title: "The scope is a document, not a conversation",
    body: "Discovery ends with a written scope: what's included, what isn't, what it costs, and when it lands. Changes are priced in writing before anyone builds them, so the number you approved is the number you pay.",
    points: [
      "Fixed scope and price agreed before a line of product code",
      "Change requests quoted, then approved, then built",
      "No line item you can't trace to something you asked for",
    ],
  },
  {
    title: "You keep everything when we're done",
    body: "Repositories, hosting, analytics, and domains transfer to you at launch. If you never speak to us again, the product keeps running and any competent developer can pick it up.",
    points: [
      "Code and accounts transferred, not licensed back",
      "Documented architecture a new team can read",
      "30 days of post-launch support, retainer optional after",
    ],
  },
] as const;

export type Faq = {
  q: string;
  a: string;
  /** Routes this question is shown on. "/" is the Home page. */
  pages: string[];
};

export const FAQS: Faq[] = [
  {
    q: "How is pricing structured?",
    a: "Fixed scope, fixed price, agreed in writing after the discovery call. If scope changes mid-project, the change is priced and approved before we build it. No surprise invoices.",
    pages: ["/", "/services", "/process", "/contact"],
  },
  {
    q: "Who owns the code and the IP?",
    a: "You do. Repositories and accounts are transferred to you at launch, not licensed back to you.",
    pages: ["/", "/services", "/process", "/work", "/about"],
  },
  {
    q: "How do we communicate during the build?",
    a: "A weekly demo on a live URL, plus an async channel for day-to-day questions. No status-report theatre. You see the actual product every sprint.",
    pages: ["/", "/process", "/work"],
  },
  {
    q: "What happens after launch?",
    a: "30 days of support are included with every full build. After that, a maintenance retainer is optional. Nothing is forced.",
    pages: ["/", "/services", "/process", "/work"],
  },
  {
    q: "What if we're not sure which service we need?",
    a: "That's what the discovery call is for. You'll leave with a written recommendation, including \"you don't need us yet\" when that's the honest answer.",
    pages: ["/", "/services", "/contact"],
  },
  {
    q: "How quickly can you start?",
    a: "Discovery usually starts within a week or two of the call. Build slots are booked in sequence, so the exact start date is confirmed in writing with the scope.",
    pages: ["/process", "/contact"],
  },
  {
    q: "Do you work with teams outside Nigeria?",
    a: "Yes. Engagements run async with a weekly live demo, and we quote in both NGN and USD.",
    pages: ["/contact", "/services"],
  },
  {
    q: "What do you need from us during the build?",
    a: "About two hours a week: one demo, plus decisions when a question is genuinely yours to answer. Everything else is our job.",
    pages: ["/process", "/work", "/about"],
  },
  {
    q: "Can you take over a project another agency started?",
    a: "Often, yes. It starts with an audit of what exists so nobody promises a timeline before reading the code.",
    pages: ["/services", "/work", "/contact", "/about"],
  },
];

/** FAQs mapped to a given route. */
export function faqsForPage(page: string): Faq[] {
  return FAQS.filter((faq) => faq.pages.includes(page));
}
