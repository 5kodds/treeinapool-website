#!/usr/bin/env node
/**
 * Runs axe-core against every route on desktop and mobile viewports.
 *
 *   npm run build && npm run a11y
 *
 * Exits non-zero on any serious or critical violation, so CI fails before
 * an accessibility regression reaches the /accessibility claim.
 */
import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { chromium } from "playwright";

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

function startServer() {
  const server = spawn("npm", ["run", "start", "--", "-p", String(PORT)], {
    stdio: ["ignore", "pipe", "pipe"],
    env: process.env,
  });
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(
      () => reject(new Error("Server did not start in 60s")),
      60_000,
    );
    server.stdout.on("data", (chunk) => {
      if (chunk.toString().includes("Ready")) {
        clearTimeout(timeout);
        resolve(server);
      }
    });
    server.on("error", reject);
  });
}

const server = await startServer();
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || undefined,
  args: ["--no-sandbox"],
});

let blocking = 0;

try {
  for (const viewport of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
    });
    const page = await context.newPage();

    for (const route of ROUTES) {
      await page.goto(`${ORIGIN}${route}`, { waitUntil: "load" });
      await page.addScriptTag({ content: AXE_SOURCE });
      const { violations } = await page.evaluate(async () => {
        // @ts-expect-error injected at runtime
        return await window.axe.run(document, {
          runOnly: {
            type: "tag",
            values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"],
          },
        });
      });

      const serious = violations.filter((v) =>
        ["serious", "critical"].includes(v.impact),
      );
      blocking += serious.length;

      const label = `${viewport.name.padEnd(7)} ${route}`;
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
  server.kill();
}

if (blocking > 0) {
  console.error(`\n${blocking} serious/critical accessibility violation(s).`);
  process.exit(1);
}
console.log("\nNo serious or critical violations.");
