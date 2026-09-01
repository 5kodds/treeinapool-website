import { spawn } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

/**
 * Content-backed routes are read from disk rather than listed by hand.
 * A hardcoded list goes stale the moment a case study is renamed or
 * removed, and then every check reports 404s that are the list's fault
 * rather than the site's.
 */
function contentRoutes(dir, prefix) {
  const full = path.join(process.cwd(), "content", dir);
  if (!existsSync(full)) return [];
  return readdirSync(full)
    .filter((file) => file.endsWith(".md"))
    .filter((file) => {
      // Drafts are deliberately unpublished, so they have no route.
      const raw = readFileSync(path.join(full, file), "utf8");
      return !/^draft:\s*true\s*$/m.test(raw);
    })
    .map((file) => `${prefix}/${file.replace(/\.md$/, "")}`);
}

export const ROUTES = [
  "/",
  "/services",
  "/work",
  ...contentRoutes("case-studies", "/work"),
  "/process",
  "/about",
  "/insights",
  ...contentRoutes("insights", "/insights"),
  "/contact",
  "/performance",
  "/teardowns",
  ...contentRoutes("teardowns", "/teardowns"),
  "/accessibility",
  "/privacy",
  "/terms",
];

/**
 * `npm run start` spawns next-server as a grandchild, so killing the npm
 * process alone orphans the server: it keeps the port and, in CI, keeps the
 * step open long after the work is done. Spawning detached puts both in
 * their own process group so stopServer() can signal the whole group.
 */
export function startServer(port, envOverrides = {}) {
  const server = spawn("npm", ["run", "start", "--", "-p", String(port)], {
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, ...envOverrides },
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

export function stopServer(server) {
  try {
    // Negative pid signals the whole group, so next-server goes with npm.
    process.kill(-server.pid, "SIGTERM");
  } catch {
    server.kill("SIGTERM");
  }
}

/**
 * page.evaluate has no default timeout, so a stalled in-page call would hang
 * the run indefinitely. Every step gets an explicit bound.
 */
export function withTimeout(promise, label, ms = 30_000) {
  let timer;
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      timer = setTimeout(
        () => reject(new Error(`timed out after ${ms}ms: ${label}`)),
        ms,
      );
    }),
  ]).finally(() => clearTimeout(timer));
}
