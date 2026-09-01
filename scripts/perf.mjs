#!/usr/bin/env node
/**
 * Regenerates content/performance/latest.json from a real Lighthouse run.
 *
 *   npm run build && npm run perf
 *
 * Starts the production server, audits the routes below on a mobile
 * profile, and writes the scores with the date, the URL, and the profile
 * they were measured under. Nothing on /performance is hand-written, if
 * this file has not been run, the page says so instead of showing numbers.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";
import { startServer, stopServer, ROUTES as ALL_ROUTES } from "./lib/dev-server.mjs";

const PORT = Number(process.env.PERF_PORT ?? 3999);
/**
 * PERF_BASE_URL measures a deployment instead of a local build. A local build
 * has no CDN, no real TLS and no cold start, so it flatters itself. The page
 * says which of the two it was.
 */
const REMOTE = process.env.PERF_BASE_URL?.replace(/\/+$/, "");
const ORIGIN = REMOTE || `http://localhost:${PORT}`;

/**
 * The case study route is read off disk rather than hardcoded. The previous
 * list still named a case study that had been deleted, so every run measured
 * a 404 and reported it as the site's performance.
 */
const firstCaseStudy = ALL_ROUTES.find((route) => route.startsWith("/work/"));
const ROUTES = [
  { path: "/", label: "Home" },
  { path: "/services", label: "Services" },
  ...(firstCaseStudy ? [{ path: firstCaseStudy, label: "Case study" }] : []),
  { path: "/contact", label: "Contact" },
];

const CHROME_PATH =
  process.env.CHROME_PATH ?? process.env.LIGHTHOUSE_CHROMIUM_PATH ?? undefined;

async function audit(url, chromePort) {
  const result = await lighthouse(
    url,
    { port: chromePort, output: "json", logLevel: "error" },
    undefined,
  );
  const { categories, audits, configSettings, runtimeError } = result.lhr;
  if (runtimeError?.code && runtimeError.code !== "NO_ERROR") {
    throw new Error(`${runtimeError.code}: ${runtimeError.message}`);
  }

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

const server = REMOTE ? null : await startServer(PORT);
const chrome = await chromeLauncher.launch({
  chromeFlags: [
    "--headless=new",
    "--no-sandbox",
    "--disable-dev-shm-usage",
    // Outbound traffic in this environment only leaves through the agent proxy.
    ...(REMOTE && process.env.HTTPS_PROXY
      ? [`--proxy-server=${process.env.HTTPS_PROXY}`, "--ignore-certificate-errors"]
      : []),
  ],
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
    measuredAgainst: REMOTE
      ? `the live deployment at ${REMOTE}`
      : "local production build (npm run build && npm run start)",
    note: REMOTE
      ? "Scores from the live deployment, on a throttled mobile profile. Re-run after any change that touches the home page."
      : "Scores from a local production build, which has no CDN and no cold start, so it flatters itself. Re-run with PERF_BASE_URL against the live domain before any pitch.",
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
  if (server) stopServer(server);
}
