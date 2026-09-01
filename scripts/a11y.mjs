#!/usr/bin/env node
/**
 * Runs axe-core against every route on desktop and mobile viewports.
 *
 *   npm run build && npm run a11y
 *
 * Exits non-zero on any serious or critical violation, so CI fails before
 * an accessibility regression reaches the /accessibility claim.
 */
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { chromium } from "playwright";
import { startServer, stopServer, withTimeout } from "./lib/dev-server.mjs";

const require = createRequire(import.meta.url);
const AXE_SOURCE = readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");

const PORT = Number(process.env.A11Y_PORT ?? 3997);
const ORIGIN = `http://localhost:${PORT}`;
const ROUTES = [
  "/",
  "/services",
  "/work",
  "/work/guided-intake-lender",
  "/process",
  "/about",
  "/insights",
  "/insights/how-to-scope-an-mvp-so-it-ships",
  "/contact",
  "/performance",
  "/teardowns",
  "/accessibility",
  "/privacy",
  "/terms",
  "/this-route-does-not-exist",
];
const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

const PAGE_TIMEOUT_MS = 30_000;

const server = await startServer(PORT);
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || undefined,
  args: ["--no-sandbox"],
});

let blocking = 0;
let errored = 0;

try {
  for (const viewport of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
    });
    const page = await context.newPage();
    page.setDefaultTimeout(PAGE_TIMEOUT_MS);
    page.setDefaultNavigationTimeout(PAGE_TIMEOUT_MS);

    for (const route of ROUTES) {
      const label = `${viewport.name.padEnd(7)} ${route}`;
      let violations;

      try {
        // domcontentloaded, not load: the audit does not need every
        // subresource settled, and waiting on them is a stall risk.
        await withTimeout(
          page.goto(`${ORIGIN}${route}`, { waitUntil: "domcontentloaded" }),
          `goto ${route}`,
        );
        await withTimeout(
          page.addScriptTag({ content: AXE_SOURCE }),
          `inject axe on ${route}`,
        );
        ({ violations } = await withTimeout(
          page.evaluate(async () => {
            // @ts-expect-error injected at runtime
            return await window.axe.run(document, {
              runOnly: {
                type: "tag",
                values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"],
              },
              // Skip serialising every passing node, violations are all
              // this script reports on, and the payload is much smaller.
              resultTypes: ["violations"],
            });
          }),
          `axe.run on ${route}`,
        ));
      } catch (error) {
        errored += 1;
        console.log(`✗ ${label}\n    ${error.message}`);
        continue;
      }

      const serious = violations.filter((v) =>
        ["serious", "critical"].includes(v.impact),
      );
      blocking += serious.length;

      if (violations.length === 0) {
        console.log(`✓ ${label}`);
      } else {
        console.log(`${serious.length ? "✗" : "!"} ${label}`);
        for (const violation of violations) {
          console.log(
            `    [${violation.impact}] ${violation.id}: ${violation.help}`,
          );
          for (const node of violation.nodes.slice(0, 2)) {
            console.log(`      ${node.html.slice(0, 140)}`);
          }
        }
      }
    }
    await context.close();
  }
} finally {
  await browser.close();
  stopServer(server);
}

if (errored > 0) {
  console.error(
    `\n${errored} route(s) could not be audited, treat as a failure.`,
  );
  process.exit(1);
}

if (blocking > 0) {
  console.error(`\n${blocking} serious/critical accessibility violation(s).`);
  process.exit(1);
}

console.log("\nNo serious or critical violations.");
