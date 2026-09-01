#!/usr/bin/env node
/**
 * Regenerates content/performance/latest.json from a real Lighthouse run.
 *
 *   npm run build && npm run perf
 *
 * Starts the production server, audits the routes below on a mobile
 * profile, and writes the scores with the date, the URL, and the profile
 * they were measured under. Nothing on /performance is hand-written — if
 * this file has not been run, the page says so instead of showing numbers.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";
import { startServer, stopServer } from "./lib/dev-server.mjs";

const PORT = Number(process.env.PERF_PORT ?? 3999);
const ORIGIN = `http://localhost:${PORT}`;
const ROUTES = [
  { path: "/", label: "Home" },
  { path: "/work/guided-intake-lender", label: "Case study" },
];

const CHROME_PATH =
  process.env.CHROME_PATH ?? process.env.LIGHTHOUSE_CHROMIUM_PATH ?? undefined;

async function audit(url, chromePort) {
  const result = await lighthouse(
    url,
    { port: chromePort, output: "json", logLevel: "error" },
    undefined,
  );
  const { categories, audits, configSettings } = result.lhr;

  return {
    scores: {
      performance: Math.round(categories.performance.score * 100),
      accessibility: Math.round(categories.accessibility.score * 100),
      bestPractices: Math.round(categories["best-practices"].score * 100),
      seo: Math.round(categories.seo.score * 100),
    },
    vitals: {
      lcpMs: Math.round(audits["largest-contentful-paint"].numericValue),
      cls: Number(audits["cumulative-layout-shift"].numericValue.toFixed(3)),
      tbtMs: Math.round(audits["total-blocking-time"].numericValue),
      fcpMs: Math.round(audits["first-contentful-paint"].numericValue),
      speedIndexMs: Math.round(audits["speed-index"].numericValue),
    },
    formFactor: configSettings.formFactor,
    throttling: configSettings.throttlingMethod,
  };
}

const server = await startServer(PORT);
const chrome = await chromeLauncher.launch({
  chromeFlags: ["--headless=new", "--no-sandbox", "--disable-dev-shm-usage"],
  chromePath: CHROME_PATH,
});

try {
  const pages = [];
  for (const route of ROUTES) {
    process.stdout.write(`Auditing ${route.path} … `);
    const measurement = await audit(`${ORIGIN}${route.path}`, chrome.port);
    pages.push({ ...route, ...measurement });
    process.stdout.write(`performance ${measurement.scores.performance}\n`);
  }

  const output = {
    measuredOn: new Date().toISOString().slice(0, 10),
    lighthouseVersion: (
      await import("lighthouse/package.json", { with: { type: "json" } })
    ).default.version,
    measuredAgainst: "local production build (npm run build && npm run start)",
    note: "Scores from a local production build. Re-run against the live domain once deployed, and before any pitch.",
    pages,
  };

  const outPath = path.join(
    process.cwd(),
    "content",
    "performance",
    "latest.json",
  );
  mkdirSync(path.dirname(outPath), { recursive: true });
  writeFileSync(outPath, `${JSON.stringify(output, null, 2)}\n`);
  console.log(`\nWrote ${outPath}`);
} finally {
  await chrome.kill();
  stopServer(server);
}
