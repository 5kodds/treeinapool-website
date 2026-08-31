export const SITE_NAME = "TreeInAPool";
export const SITE_URL = "https://treeinapool.com";
export const SITE_DESCRIPTION =
  "TreeInAPool is a product development agency. We turn prototypes into products people pay for.";

// D2: dual market framing — global tone, local reach.
export const CONTACT_EMAIL = "hello@treeinapool.com";
export const WHATSAPP_NUMBER = ""; // TODO: add the real WhatsApp number (with country code, no symbols) before launch
export const WHATSAPP_URL = WHATSAPP_NUMBER
  ? `https://wa.me/${WHATSAPP_NUMBER}`
  : "";
export const SHOW_WHATSAPP = true;
export const CURRENCY_NOTE = "NGN / USD";

export type Service = {
  id: string;
  code: string;
  name: string;
  who: string;
  timeline: string;
  bandNgn: string;
  bandUsd: string;
  summary: string;
  included: string[];
  owns: string;
};

// D3: price bands are placeholders pending the founder's real numbers.
export const SERVICES: Service[] = [
  {
    id: "prototype-to-production",
    code: "S1",
    name: "Prototype → production",
    who: "Founders with a no-code build",
    timeline: "4–8 weeks",
    bandNgn: "₦[ 0.0m ]",
    bandUsd: "$[ 0k ]",
    summary:
      "Your Lovable or Bubble build, rewritten as a product that survives real users and real load.",
    included: [
      "Audit of the existing prototype and data",
      "Production architecture and stack decision",
      "Rebuild of the core flows",
      "Data migration with a rollback plan",
      "Deploy, monitoring, handover",
    ],
    owns: "Code + accounts",
  },
  {
    id: "product-design",
    code: "S2",
    name: "Product design",
    who: "Teams with devs, no designer",
    timeline: "2–4 weeks",
    bandNgn: "₦[ 0.0m ]",
    bandUsd: "$[ 0k ]",
    summary:
      "Flows, screens and a component system your developers build from directly — with the states and edge cases drawn, not left to interpretation.",
    included: [
      "User flows for the core journeys",
      "High-fidelity screens, desktop and mobile",
      "Component library with states",
      "Design tokens handed to code",
      "One round of usability testing",
    ],
    owns: "Files + tokens",
  },
  {
    id: "full-cycle-build",
    code: "S3",
    name: "Full-cycle build",
    who: "SMEs digitising operations",
    timeline: "8–14 weeks",
    bandNgn: "₦[ 0.0m ]",
    bandUsd: "$[ 0k ]",
    summary:
      "Discovery through launch for one product: a web app, a mobile app, or the internal portal your operation currently runs on spreadsheets.",
    included: [
      "Discovery workshop and written scope",
      "Design (as S2, scoped to the build)",
      "Engineering in two-week sprints",
      "QA, accessibility and performance pass",
      "Launch plus 30 days of support",
    ],
    owns: "The whole product",
  },
  {
    id: "ai-automation",
    code: "S4",
    name: "AI & automation",
    who: "Operations with manual steps",
    timeline: "3–6 weeks",
    bandNgn: "₦[ 0.0m ]",
    bandUsd: "$[ 0k ]",
    summary:
      "The steps someone on your team does by hand every day — quoting, triage, reconciliation, reporting — moved into software, with a human still in the loop where it matters.",
    included: [
      "Process mapping of the manual work",
      "Model and tooling selection",
      "Integration with your existing systems",
      "Evaluation harness and accuracy baseline",
      "Escalation paths for the edge cases",
    ],
    owns: "Pipelines + evals",
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
      { name: "All services", href: "/services", description: "Compare scope, timeline and bands" },
    ],
  },
  {
    name: "Work",
    href: "/work",
    mergeFeaturedWork: true,
    children: [{ name: "All work", href: "/work", description: "Every case study and teardown" }],
  },
  {
    name: "Company",
    children: [
      { name: "About", href: "/about", description: "Who builds it, and how the studio works" },
      { name: "Process", href: "/process", description: "How an engagement runs, stage by stage" },
      { name: "Performance", href: "/performance", description: "Our own Core Web Vitals, dated" },
    ],
  },
  { name: "Insights", href: "/insights" },
  { name: "Contact", href: "/contact", cta: true },
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

/**
 * Proof sections (testimonials, client logos) ship fully built but filled
 * with bracketed placeholders. They render only when this flag is on —
 * on in development, off in production until real, permissioned data lands.
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
      "[ Client quote pending — one sentence, in their words, naming the change they felt. ]",
    name: "[ Name ]",
    role: "[ Role, company ]",
    placeholder: true,
  },
  {
    quote: "[ Client quote pending — the outcome, not the adjectives. ]",
    name: "[ Name ]",
    role: "[ Role, company ]",
    placeholder: true,
  },
  {
    quote: "[ Client quote pending — what working together was actually like. ]",
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
  "Working with us is less like hiring an agency and more like hiring the two people who will actually build the thing — because that is who turns up to the call.";

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
    a: "Fixed scope, fixed price, agreed in writing after the discovery call. If scope changes mid-project, the change is priced and approved before we build it — no surprise invoices.",
    pages: ["/", "/services", "/process", "/contact"],
  },
  {
    q: "Who owns the code and the IP?",
    a: "You do. Repositories and accounts are transferred to you at launch, not licensed back to you.",
    pages: ["/", "/services", "/process", "/work"],
  },
  {
    q: "How do we communicate during the build?",
    a: "A weekly demo on a live URL, plus an async channel for day-to-day questions. No status-report theatre — you see the actual product every sprint.",
    pages: ["/", "/process", "/work"],
  },
  {
    q: "What happens after launch?",
    a: "30 days of support are included with every full build. After that, a maintenance retainer is optional — nothing is forced.",
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
    pages: ["/process", "/work"],
  },
  {
    q: "Can you take over a project another agency started?",
    a: "Often, yes. It starts with an audit of what exists so nobody promises a timeline before reading the code.",
    pages: ["/services", "/work", "/contact"],
  },
];

/** FAQs mapped to a given route. */
export function faqsForPage(page: string): Faq[] {
  return FAQS.filter((faq) => faq.pages.includes(page));
}
