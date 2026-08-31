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

/**
 * `npm run start` spawns next-server as a grandchild, so killing the npm
 * process alone orphans the server: it keeps the port and, in CI, keeps the
 * step open long after the work is done. Spawning detached puts both in
 * their own process group so stopServer() can signal the whole group.
 */
function startServer() {
  const server = spawn("npm", ["run", "start", "--", "-p", String(PORT)], {
    stdio: ["ignore", "pipe", "pipe"],
    env: process.env,
    detached: true,
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

function stopServer(server) {
  try {
    // Negative pid signals the whole group, so next-server goes with npm.
    process.kill(-server.pid, "SIGTERM");
  } catch {
    server.kill("SIGTERM");
  }
}

const PAGE_TIMEOUT_MS = 30_000;

/**
 * page.evaluate has no default timeout, so a stalled in-page call would
 * hang the job indefinitely. Every step is bounded and a stall fails the
 * route loudly instead of silently burning runner minutes.
 */
function withTimeout(promise, label) {
  let timer;
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      timer = setTimeout(
        () =>
          reject(new Error(`timed out after ${PAGE_TIMEOUT_MS}ms: ${label}`)),
        PAGE_TIMEOUT_MS,
      );
    }),
  ]).finally(() => clearTimeout(timer));
}

const server = await startServer();
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
              // Skip serialising every passing node — violations are all
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
    `\n${errored} route(s) could not be audited — treat as a failure.`,
  );
  process.exit(1);
}

if (blocking > 0) {
  console.error(`\n${blocking} serious/critical accessibility violation(s).`);
  process.exit(1);
}

console.log("\nNo serious or critical violations.");
