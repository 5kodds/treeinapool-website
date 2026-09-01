#!/usr/bin/env node
/**
 * Whole-site audit. Crawls every route of a production build and reports
 * everything that looks wrong, grouped by severity.
 *
 *   npm run build && npm run audit
 *
 * Checks, per page:
 *   - every internal link resolves (no dead nav, footer or body links)
 *   - external links respond (best effort; skipped with --skip-external)
 *   - no bracketed placeholder text is visible to a production visitor
 *   - title, meta description, canonical, og:title and og:image all present
 *   - every JSON-LD block parses and declares an @type
 *   - every <img> has an alt attribute
 *   - exactly one <h1>, and no skipped heading levels
 *   - no browser console errors or failed requests
 *
 * Exits non-zero if any ERROR-level finding is present, so it can gate CI.
 * WARN-level findings are reported but do not fail the run.
 */
import { chromium } from "playwright";
import {
  ROUTES,
  startServer,
  stopServer,
  withTimeout,
} from "./lib/dev-server.mjs";

const PORT = Number(process.env.AUDIT_PORT ?? 3994);
const SKIP_EXTERNAL = process.argv.includes("--skip-external");

// Point at a deployed site with AUDIT_BASE_URL to audit production rather
// than a local build, same checks, against what visitors actually get.
const REMOTE = (process.env.AUDIT_BASE_URL ?? "").replace(/\/+$/, "");
const ORIGIN = REMOTE || `http://localhost:${PORT}`;

const findings = [];
const add = (level, route, check, detail) =>
  findings.push({ level, route, check, detail });

// Placeholders are intentional in content the founder still owns, but they
// must never reach a section a visitor reads as fact. This flags the ones
// that render, so the decision log and the live site cannot drift apart.
const PLACEHOLDER = /\[\s*[^\]]{0,60}\]/g;
const seenPlaceholders = new Set();
const PLACEHOLDER_ALLOWED = [/\[\s*\]/];

// Hosts that answer non-browser requests with a refusal regardless of whether
// the URL is good. A link here is still checked for reachability, just not
// judged by its status code.
const BOT_BLOCKED = ["linkedin.com", "www.w3.org"];

const server = REMOTE ? null : await startServer(PORT);
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || undefined,
  args: ["--no-sandbox"],
});

const internalTargets = new Set();
const externalTargets = new Set();

try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();
  page.setDefaultTimeout(30_000);
  page.setDefaultNavigationTimeout(30_000);

  for (const route of ROUTES) {
    const consoleErrors = [];
    const failedRequests = [];
    const onConsole = (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    };
    const onFailed = (req) => {
      // Next.js cancels in-flight RSC prefetches whenever navigation moves
      // on, and the browser aborts the favicon the same way. Those surface
      // as requestfailed but are not defects, only real transport and
      // status failures are worth reporting.
      const errorText = req.failure()?.errorText ?? "";
      if (errorText.includes("ERR_ABORTED")) return;
      failedRequests.push(`${req.method()} ${req.url()}: ${errorText}`);
    };

    page.on("console", onConsole);
    page.on("requestfailed", onFailed);

    // Auditing a deployed site crosses the public internet, where a single
    // reset says nothing about the site. Retry with backoff and only report
    // a route as dead once it has failed every attempt, a flaky check that
    // blames the site for a network hiccup is worse than no check.
    const attempts = REMOTE ? 3 : 1;
    let response;
    let loadError;
    for (let attempt = 1; attempt <= attempts; attempt += 1) {
      try {
        response = await withTimeout(
          page.goto(`${ORIGIN}${route}`, { waitUntil: "domcontentloaded" }),
          `goto ${route}`,
        );
        loadError = undefined;
        break;
      } catch (error) {
        loadError = error;
        if (attempt < attempts) {
          await new Promise((r) => setTimeout(r, 1500 * attempt));
        }
      }
    }
    if (loadError) {
      add(
        "ERROR",
        route,
        "load",
        `${loadError.message} (after ${attempts} attempts)`,
      );
      page.off("console", onConsole);
      page.off("requestfailed", onFailed);
      continue;
    }

    if (response && response.status() >= 400) {
      add("ERROR", route, "status", `HTTP ${response.status()}`);
    }

    const data = await withTimeout(
      page.evaluate(() => {
        const meta = (selector, attr = "content") =>
          document.querySelector(selector)?.getAttribute(attr) ?? null;

        return {
          title: document.title || null,
          description: meta('meta[name="description"]'),
          canonical: meta('link[rel="canonical"]', "href"),
          ogTitle: meta('meta[property="og:title"]'),
          ogImage: meta('meta[property="og:image"]'),
          jsonLd: [
            ...document.querySelectorAll('script[type="application/ld+json"]'),
          ].map((node) => node.textContent ?? ""),
          links: [...document.querySelectorAll("a[href]")].map((a) => ({
            href: a.getAttribute("href"),
            resolved: a.href,
            text: (a.textContent ?? "").trim().slice(0, 40),
          })),
          imagesWithoutAlt: [...document.querySelectorAll("img")].filter(
            (img) => img.getAttribute("alt") === null,
          ).length,
          headings: [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map(
            (h) => Number(h.tagName[1]),
          ),
          // Scanning <main> alone was hiding a placeholder that sat in the
          // footer of all eighteen pages. Chrome and footer are scanned too,
          // and the caller de-duplicates so a sitewide string reports once.
          text: document.body.innerText,
          mainText:
            document.querySelector("main")?.innerText ??
            document.body.innerText,
        };
      }),
      `evaluate ${route}`,
    );

    page.off("console", onConsole);
    page.off("requestfailed", onFailed);

    // metadata completeness

    if (!data.title) add("ERROR", route, "meta", "no <title>");
    if (!data.description) add("ERROR", route, "meta", "no meta description");
    if (!data.canonical) add("WARN", route, "meta", "no canonical link");
    if (!data.ogTitle) add("ERROR", route, "meta", "no og:title");
    if (!data.ogImage) add("ERROR", route, "meta", "no og:image");

    // structured data

    for (const block of data.jsonLd) {
      try {
        const parsed = JSON.parse(block);
        const types = Array.isArray(parsed) ? parsed : [parsed];
        for (const entry of types) {
          if (!entry["@type"]) {
            add("ERROR", route, "json-ld", "block has no @type");
          }
        }
      } catch (error) {
        add("ERROR", route, "json-ld", `does not parse: ${error.message}`);
      }
    }

    // images

    if (data.imagesWithoutAlt > 0) {
      add(
        "ERROR",
        route,
        "images",
        `${data.imagesWithoutAlt} <img> without an alt attribute`,
      );
    }

    // heading structure

    const h1s = data.headings.filter((level) => level === 1).length;
    if (h1s === 0) add("ERROR", route, "headings", "no <h1>");
    if (h1s > 1) add("WARN", route, "headings", `${h1s} <h1> elements`);
    for (let i = 1; i < data.headings.length; i += 1) {
      const jump = data.headings[i] - data.headings[i - 1];
      if (jump > 1) {
        add(
          "WARN",
          route,
          "headings",
          `skips h${data.headings[i - 1]} → h${data.headings[i]}`,
        );
        break;
      }
    }

    // placeholder leakage

    const placeholders = (data.text.match(PLACEHOLDER) ?? []).filter(
      (match) => !PLACEHOLDER_ALLOWED.some((allowed) => allowed.test(match)),
    );
    for (const placeholder of [...new Set(placeholders)]) {
      // A string in the header or footer appears on all eighteen routes.
      // Report it once, against the first route it was seen on, so one
      // sitewide placeholder does not drown out eighteen page-specific ones.
      if (seenPlaceholders.has(placeholder)) continue;
      seenPlaceholders.add(placeholder);
      add("WARN", route, "placeholder", `visible to visitors: ${placeholder}`);
    }

    // console health

    for (const error of consoleErrors) {
      add("ERROR", route, "console", error.slice(0, 160));
    }
    for (const request of failedRequests) {
      add("ERROR", route, "network", request.slice(0, 160));
    }

    // collect link targets

    for (const link of data.links) {
      if (!link.href || link.href.startsWith("#")) continue;
      if (link.href.startsWith("mailto:") || link.href.startsWith("tel:"))
        continue;
      if (link.resolved.startsWith(ORIGIN)) {
        internalTargets.add(
          link.resolved.replace(ORIGIN, "").split("#")[0] || "/",
        );
      } else if (link.resolved.startsWith("http")) {
        externalTargets.add(link.resolved);
      }
    }

    if (REMOTE) await new Promise((r) => setTimeout(r, 400));
    process.stdout.write(".");
  }

  process.stdout.write("\n");

  // internal link integrity

  for (const target of internalTargets) {
    const res = await page.request.get(`${ORIGIN}${target}`).catch(() => null);
    if (!res) {
      add("ERROR", target, "link", "internal link could not be fetched");
    } else if (res.status() >= 400) {
      add(
        "ERROR",
        target,
        "link",
        `internal link returns HTTP ${res.status()}`,
      );
    }
  }

  // external links

  if (!SKIP_EXTERNAL) {
    for (const target of externalTargets) {
      const res = await page.request
        .get(target, { timeout: 15_000 })
        .catch(() => null);
      // Some hosts refuse anything that is not a browser. LinkedIn answers
      // bots with its own HTTP 999, and w3.org rate-limits with a 403. Those
      // say the crawler was blocked, not that the link is broken, so
      // reporting them trains us to ignore the whole section.
      if (res && BOT_BLOCKED.some((host) => target.includes(host))) {
        continue;
      }
      if (!res) {
        add(
          "WARN",
          target,
          "link",
          "external link unreachable from this network",
        );
      } else if (res.status() >= 400) {
        add(
          "WARN",
          target,
          "link",
          `external link returns HTTP ${res.status()}`,
        );
      }
    }
  }

  await context.close();
} finally {
  await browser.close();
  if (server) stopServer(server);
}

// report

const errors = findings.filter((f) => f.level === "ERROR");
const warnings = findings.filter((f) => f.level === "WARN");

function report(title, list) {
  if (list.length === 0) return;
  console.log(`\n${title} (${list.length})`);
  const byCheck = new Map();
  for (const finding of list) {
    if (!byCheck.has(finding.check)) byCheck.set(finding.check, []);
    byCheck.get(finding.check).push(finding);
  }
  for (const [check, group] of [...byCheck].sort()) {
    console.log(`\n  ${check}`);
    for (const finding of group) {
      console.log(`    ${finding.route.padEnd(46)} ${finding.detail}`);
    }
  }
}

console.log(
  `\nAudited ${ROUTES.length} routes, ${internalTargets.size} internal and ${externalTargets.size} external link targets.`,
);
report("ERRORS, fix before launch", errors);
report("WARNINGS, review", warnings);

if (errors.length === 0 && warnings.length === 0) {
  console.log("\nClean: nothing to fix.");
} else {
  console.log(`\n${errors.length} error(s), ${warnings.length} warning(s).`);
}

process.exit(errors.length > 0 ? 1 : 0);
