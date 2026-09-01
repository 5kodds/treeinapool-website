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

/**
 * Waits for an element instead of sampling it. Playwright's count() does
 * not wait, so asserting on it races hydration, these pages render their
 * interactive parts on the client, so the element is legitimately absent
 * for a moment after domcontentloaded.
 */
async function present(locator, message, timeout = 15_000) {
  try {
    await locator.first().waitFor({ state: "visible", timeout });
  } catch {
    throw new Error(message);
  }
}

/**
 * A submission counts as confirmed only when the form swaps to its success
 * element. Checking page text instead would match the surrounding marketing
 * copy and stay green through a genuine delivery failure, which is exactly
 * what an upstream 403 looks like.
 */
async function confirmed(scope, message) {
  // The two forms word their success state differently: the project form
  // says "Message sent", the rebuild form "Enquiry received".
  const status = scope.locator('[role="status"]', {
    hasText: /message sent|enquiry received/i,
  });
  try {
    await status.first().waitFor({ state: "visible", timeout: 10_000 });
  } catch {
    const alert = scope.locator('[role="alert"]');
    const detail = (await alert.count())
      ? `, form reported: "${(await alert.first().innerText()).trim().slice(0, 120)}"`
      : "";
    throw new Error(`${message}${detail}`);
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

// This suite submits both enquiry forms and the newsletter on every run.
// With a real Formspree endpoint in .env.local that meant a live submission
// each time, which quietly ate the account's monthly quota. The server is
// started with the endpoints blanked so the route takes its undelivered
// path: the on-screen flow is still exercised end to end, and nothing is
// ever sent. Delivery itself is verified once, by hand, against production.
const server = await startServer(PORT, {
  FORMSPREE_ENDPOINT: "",
  FORMSPREE_NEWSLETTER_ENDPOINT: "",
});
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
    // Assert on the result element, not on page text: the static copy in
    // the left column also says "reply within one business day", so a body
    // regex would pass even when delivery failed.
    await confirmed(page, "project enquiry did not confirm");
  });

  await check("rebuild enquiry tab submits", async () => {
    await page.goto(`${ORIGIN}/contact`, { waitUntil: "domcontentloaded" });
    const tab = page.getByRole("tab", { name: /rebuild/i });
    await present(tab, "no rebuild enquiry tab found");
    await tab.first().click();
    await page.waitForTimeout(300);

    // Fail loudly on a missing field. Skipping silently is how the first
    // version of this test filled almost nothing and still reported green:
    // every selector below except name and email was wrong.
    for (const [selector, value] of [
      ["#rebuild-name", "Test User"],
      ["#rebuild-email", "test@example.com"],
      ["#rebuild-site", "https://example.com"],
      ["#rebuild-message", "Our current site is slow and hard to update."],
    ]) {
      await present(page.locator(selector), `missing field ${selector}`);
      await page.fill(selector, value);
    }

    for (const selector of [
      "#rebuild-platform",
      "#rebuild-goal",
      "#rebuild-timeline",
      "#rebuild-budget",
    ]) {
      await present(page.locator(selector), `missing field ${selector}`);
      await page.selectOption(selector, { index: 1 });
    }

    // Scope to the tab panel. `form button` picks up the footer newsletter
    // form as well, and .last() was submitting that instead, its empty
    // email is where the confusing "Enter a valid email address" came from.
    const panel = page.locator('[role="tabpanel"]');
    await panel.locator('button[type="submit"]').first().click();
    await confirmed(panel, "rebuild enquiry did not confirm");
  });

  await check("newsletter form submits from the footer", async () => {
    await page.goto(`${ORIGIN}/`, { waitUntil: "domcontentloaded" });
    const email = page.locator('footer input[type="email"]');
    await present(email, "no newsletter email field in the footer");
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
  // the interaction to assert, a click() would hover first, opening it,
  // and then toggle it shut again.
  await check("nav dropdown opens on hover", async () => {
    await page.goto(`${ORIGIN}/`, { waitUntil: "domcontentloaded" });
    const trigger = page
      .locator('header button[aria-haspopup="true"]', { hasText: /services/i })
      .first();
    await present(trigger, "no Services nav trigger found");
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
    await present(toggle, "no FAQ accordion toggle on /process");
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
    await present(opener, "no mobile menu button");
    await opener.first().click();
    await mobilePage.waitForTimeout(400);
    // Groups with children keep their child links in a collapsed list, so
    // target the visible top-level link rather than the first match.
    const workLink = mobilePage.locator('a[href="/work"]:visible').first();
    await present(workLink, "no visible Work link in the mobile menu");
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
    await present(expander, "no expandable group in the mobile menu");
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
