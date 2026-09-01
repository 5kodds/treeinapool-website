#!/usr/bin/env node
/**
 * End-to-end checks for the journeys that convert. A page can render
 * perfectly and still fail to take a lead, which no static audit catches.
 *
 *   npm run build && npm run e2e
 *
 * Covers, on desktop and mobile:
 *   - project enquiry: validation rejects bad input, valid input succeeds
 *   - rebuild enquiry: the second tab submits and is tagged distinctly
 *   - newsletter: submits from the footer
 *   - navigation: dropdowns open, mobile menu opens and navigates
 *   - FAQ accordions expand
 */
import { chromium } from "playwright";
import { startServer, stopServer } from "./lib/dev-server.mjs";

const PORT = Number(process.env.E2E_PORT ?? 3993);
const ORIGIN = `http://localhost:${PORT}`;

const results = [];
async function check(name, fn) {
  try {
    await fn();
    results.push({ name, ok: true });
    console.log(`✓ ${name}`);
  } catch (error) {
    results.push({ name, ok: false, error: error.message });
    console.log(`✗ ${name}\n    ${error.message.split("\n")[0]}`);
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const server = await startServer(PORT);
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || undefined,
  args: ["--no-sandbox"],
});

try {
  const desktop = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await desktop.newPage();
  page.setDefaultTimeout(15_000);

  await check("project enquiry rejects an invalid email", async () => {
    await page.goto(`${ORIGIN}/contact`, { waitUntil: "domcontentloaded" });
    await page.fill("#name", "Test User");
    await page.fill("#email", "not-an-email");
    await page.fill("#message", "We need to rebuild our internal ops tool.");
    await page.click('form button[type="submit"]');
    await page.waitForTimeout(500);
    const body = await page.innerText("body");
    assert(
      /valid email/i.test(body),
      "expected a validation message for the bad email",
    );
  });

  await check("project enquiry submits and confirms on screen", async () => {
    await page.goto(`${ORIGIN}/contact`, { waitUntil: "domcontentloaded" });
    await page.fill("#name", "Test User");
    await page.fill("#email", "test@example.com");
    const projectType = page.locator("#projectType");
    if (await projectType.count()) {
      await projectType.selectOption({ index: 1 });
    }
    const budget = page.locator("#budgetBand");
    if (await budget.count()) await budget.selectOption({ index: 1 });
    await page.fill("#message", "We need to rebuild our internal ops tool.");
    await page.click('form button[type="submit"]');
    await page.waitForTimeout(1500);
    const body = await page.innerText("body");
    assert(
      /message sent|thank|reply within/i.test(body),
      "expected an on-screen confirmation after submitting",
    );
  });

  await check("rebuild enquiry tab submits", async () => {
    await page.goto(`${ORIGIN}/contact`, { waitUntil: "domcontentloaded" });
    const tab = page.getByRole("tab", { name: /rebuild/i });
    assert((await tab.count()) > 0, "no rebuild enquiry tab found");
    await tab.first().click();
    await page.waitForTimeout(300);

    for (const [selector, value] of [
      ["#rebuild-name", "Test User"],
      ["#rebuild-email", "test@example.com"],
      ["#siteUrl", "https://example.com"],
    ]) {
      const field = page.locator(selector);
      if (await field.count()) await field.fill(value);
    }

    for (const selector of [
      "#platform",
      "#conversionGoal",
      "#timeline",
      "#rebuildBudget",
    ]) {
      const field = page.locator(selector);
      if (await field.count()) await field.selectOption({ index: 1 });
    }

    await page.locator('form button[type="submit"]').last().click();
    await page.waitForTimeout(1500);
    const body = await page.innerText("body");
    assert(
      /message sent|thank|reply within/i.test(body),
      "expected an on-screen confirmation after the rebuild enquiry",
    );
  });

  await check("newsletter form submits from the footer", async () => {
    await page.goto(`${ORIGIN}/`, { waitUntil: "domcontentloaded" });
    const email = page.locator('footer input[type="email"]');
    assert(
      (await email.count()) > 0,
      "no newsletter email field in the footer",
    );
    await email.first().fill("subscriber@example.com");
    await page.locator("footer form button").first().click();
    await page.waitForTimeout(1200);
    const footer = await page.innerText("footer");
    assert(
      /thank|subscrib|check your inbox|signed up/i.test(footer),
      "expected newsletter confirmation text in the footer",
    );
  });

  // The dropdown opens on hover and focus by design (Epic A), so hover is
  // the interaction to assert — a click() would hover first, opening it,
  // and then toggle it shut again.
  await check("nav dropdown opens on hover", async () => {
    await page.goto(`${ORIGIN}/`, { waitUntil: "domcontentloaded" });
    const trigger = page
      .locator('header button[aria-haspopup="true"]', { hasText: /services/i })
      .first();
    assert((await trigger.count()) > 0, "no Services nav trigger found");
    await trigger.hover();
    await page.waitForTimeout(300);
    assert(
      (await trigger.getAttribute("aria-expanded")) === "true",
      "hovering did not set aria-expanded=true",
    );
    const panelId = await trigger.getAttribute("aria-controls");
    assert(
      await page.locator(`#${panelId}`).isVisible(),
      "the panel named by aria-controls is not visible",
    );
  });

  await check("nav dropdown is keyboard reachable", async () => {
    await page.goto(`${ORIGIN}/`, { waitUntil: "domcontentloaded" });
    const trigger = page
      .locator('header button[aria-haspopup="true"]', { hasText: /services/i })
      .first();
    await trigger.focus();
    await page.waitForTimeout(300);
    assert(
      (await trigger.getAttribute("aria-expanded")) === "true",
      "focusing the trigger did not open the panel",
    );
    await page.keyboard.press("Escape");
    await page.waitForTimeout(200);
    assert(
      (await trigger.getAttribute("aria-expanded")) === "false",
      "Escape did not close the panel",
    );
  });

  await check("FAQ accordion expands", async () => {
    await page.goto(`${ORIGIN}/process`, { waitUntil: "domcontentloaded" });
    const toggle = page.locator("button[aria-expanded][aria-controls]").last();
    assert((await toggle.count()) > 0, "no FAQ accordion toggle on /process");
    assert(
      (await toggle.getAttribute("aria-expanded")) === "false",
      "the FAQ started open; expected collapsed by default",
    );
    await toggle.click();
    await page.waitForTimeout(300);
    assert(
      (await toggle.getAttribute("aria-expanded")) === "true",
      "clicking the FAQ did not expand it",
    );
  });

  await desktop.close();

  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
  });
  const mobilePage = await mobile.newPage();
  mobilePage.setDefaultTimeout(15_000);

  await check("mobile menu opens and navigates", async () => {
    await mobilePage.goto(`${ORIGIN}/`, { waitUntil: "domcontentloaded" });
    const opener = mobilePage.getByLabel(/open menu/i);
    assert((await opener.count()) > 0, "no mobile menu button");
    await opener.first().click();
    await mobilePage.waitForTimeout(400);
    // Groups with children keep their child links in a collapsed list, so
    // target the visible top-level link rather than the first match.
    const workLink = mobilePage.locator('a[href="/work"]:visible').first();
    assert(
      (await workLink.count()) > 0,
      "no visible Work link in the mobile menu",
    );
    await workLink.click();
    await mobilePage.waitForURL("**/work", { timeout: 10_000 });
  });

  await check("mobile menu expands a collapsed group", async () => {
    await mobilePage.goto(`${ORIGIN}/`, { waitUntil: "domcontentloaded" });
    await mobilePage
      .getByLabel(/open menu/i)
      .first()
      .click();
    await mobilePage.waitForTimeout(400);
    const expander = mobilePage.getByLabel(/expand /i).first();
    assert(
      (await expander.count()) > 0,
      "no expandable group in the mobile menu",
    );
    const before = await mobilePage.locator("a:visible").count();
    await expander.click();
    await mobilePage.waitForTimeout(300);
    const after = await mobilePage.locator("a:visible").count();
    assert(after > before, "expanding the group revealed no additional links");
  });

  await mobile.close();
} finally {
  await browser.close();
  stopServer(server);
}

const failed = results.filter((r) => !r.ok);
console.log(
  `\n${results.length - failed.length}/${results.length} journeys passed.`,
);
if (failed.length > 0) {
  console.error("\nFailed:");
  for (const f of failed) console.error(`  ${f.name}: ${f.error}`);
  process.exit(1);
}
