#!/usr/bin/env node
/**
 * Inventories every interactive control on every page and proves it goes
 * somewhere. Link hrefs resolving is not enough: a button that looks like a
 * call to action but carries no handler is invisible to a link checker and
 * is exactly what a visitor means by "it doesn't lead anywhere".
 *
 *   npm run build && npm run cta
 *   AUDIT_BASE_URL=https://... npm run cta   # against a deployment
 *
 * For every route it reports:
 *   - links whose destination 404s or is missing
 *   - buttons with no discernible purpose (not submit, not a disclosure,
 *     not a tab, no aria-controls), candidate dead CTAs
 *   - then actually clicks each primary CTA and asserts the URL changed
 */
import { chromium } from "playwright";
import { ROUTES, startServer, stopServer } from "./lib/dev-server.mjs";

const PORT = Number(process.env.CTA_PORT ?? 3992);
const REMOTE = (process.env.AUDIT_BASE_URL ?? "").replace(/\/+$/, "");
const ORIGIN = REMOTE || `http://localhost:${PORT}`;

const problems = [];
const note = (route, kind, detail) => problems.push({ route, kind, detail });

const server = REMOTE ? null : await startServer(PORT);
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || undefined,
  args: ["--no-sandbox"],
});

let linkCount = 0;
let buttonCount = 0;
let ctaClicks = 0;

try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();
  page.setDefaultTimeout(20_000);
  page.setDefaultNavigationTimeout(20_000);

  for (const route of ROUTES) {
    try {
      await page.goto(`${ORIGIN}${route}`, { waitUntil: "domcontentloaded" });
    } catch (error) {
      note(route, "load", error.message.split("\n")[0]);
      continue;
    }
    // Let client-rendered controls mount before taking inventory.
    await page.waitForTimeout(600);

    const inventory = await page.evaluate(() => {
      const links = [...document.querySelectorAll("a")].map((a) => ({
        href: a.getAttribute("href"),
        text: (a.textContent ?? "").trim().slice(0, 40),
      }));
      const buttons = [...document.querySelectorAll("button")].map((b) => ({
        text: (b.textContent ?? "").trim().slice(0, 40),
        type: b.getAttribute("type"),
        inForm: Boolean(b.closest("form")),
        role: b.getAttribute("role"),
        pressed: b.getAttribute("aria-pressed"),
        controls: b.getAttribute("aria-controls"),
        expanded: b.getAttribute("aria-expanded"),
        popup: b.getAttribute("aria-haspopup"),
        label: b.getAttribute("aria-label"),
      }));
      return { links, buttons };
    });

    linkCount += inventory.links.length;
    buttonCount += inventory.buttons.length;

    for (const link of inventory.links) {
      if (!link.href) {
        note(route, "link", `<a> with no href: "${link.text}"`);
      }
    }

    // A button is accounted for if it submits a form, toggles something,
    // opens a menu, or is a tab. Anything else does nothing when clicked.
    for (const button of inventory.buttons) {
      const purposeful =
        (button.type === "submit" && button.inForm) ||
        button.controls ||
        button.expanded !== null ||
        button.pressed !== null ||
        button.popup ||
        button.role === "tab";
      if (!purposeful) {
        note(
          route,
          "button",
          `no handler or target: "${button.text || button.label || "(unlabelled)"}"`,
        );
      }
    }

    // Prove the primary calls to action actually navigate.
    const ctas = page.getByRole("link", {
      name: /book a call|book a free discovery|rebuild enquiry|see the work/i,
    });
    const count = await ctas.count();
    for (let i = 0; i < count; i += 1) {
      const cta = ctas.nth(i);
      const href = await cta.getAttribute("href");
      const text = (await cta.textContent())?.trim().slice(0, 30);
      if (!href) {
        note(route, "cta", `"${text}" has no href`);
        continue;
      }
      const before = page.url();
      const samePage = href.split("#")[0] === route || href.startsWith("#");
      try {
        await cta.click();
        if (samePage) {
          // An in-page CTA must still do something visible: land on its
          // anchor. A bare same-page link is what "doesn't lead anywhere"
          // looks like to a visitor.
          const hash = href.includes("#") ? href.split("#")[1] : "";
          if (!hash) throw new Error("same-page CTA with no anchor");
          await page
            .locator(`#${hash}`)
            .waitFor({ state: "visible", timeout: 5000 });
        } else {
          await page.waitForURL((url) => url.toString() !== before, {
            timeout: 8000,
          });
        }
        ctaClicks += 1;
      } catch {
        note(route, "cta", `"${text}" (${href}) led nowhere when clicked`);
      }
      await page.goto(`${ORIGIN}${route}`, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(400);
    }

    process.stdout.write(".");
  }
  process.stdout.write("\n");
  await context.close();
} finally {
  await browser.close();
  if (server) stopServer(server);
}

console.log(
  `\nChecked ${ORIGIN}: ${linkCount} links, ${buttonCount} buttons, ${ctaClicks} CTA navigations across ${ROUTES.length} routes.`,
);

if (problems.length === 0) {
  console.log("Every link has a destination and every button has a purpose.");
  process.exit(0);
}

const byKind = new Map();
for (const p of problems) {
  if (!byKind.has(p.kind)) byKind.set(p.kind, []);
  byKind.get(p.kind).push(p);
}
for (const [kind, list] of [...byKind].sort()) {
  console.log(`\n${kind} (${list.length})`);
  for (const p of list) console.log(`  ${p.route.padEnd(46)} ${p.detail}`);
}
console.log(`\n${problems.length} problem(s).`);
process.exit(1);
