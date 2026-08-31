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

export const NAV_ITEMS = [
  { name: "Services", href: "/services" },
  { name: "Work", href: "/work" },
  { name: "Process", href: "/process" },
  { name: "About", href: "/about" },
] as const;

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

export const FAQS = [
  {
    q: "How is pricing structured?",
    a: "Fixed scope, fixed price, agreed in writing after the discovery call. If scope changes mid-project, the change is priced and approved before we build it — no surprise invoices.",
  },
  {
    q: "Who owns the code and the IP?",
    a: "You do. Repositories and accounts are transferred to you at launch, not licensed back to you.",
  },
  {
    q: "How do we communicate during the build?",
    a: "A weekly demo on a live URL, plus an async channel for day-to-day questions. No status-report theatre — you see the actual product every sprint.",
  },
  {
    q: "What happens after launch?",
    a: "30 days of support are included with every full build. After that, a maintenance retainer is optional — nothing is forced.",
  },
  {
    q: "What if we're not sure which service we need?",
    a: "That's what the discovery call is for. You'll leave with a written recommendation, including \"you don't need us yet\" when that's the honest answer.",
  },
] as const;
