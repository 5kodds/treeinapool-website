import { spawn } from "node:child_process";

export const ROUTES = [
  "/",
  "/services",
  "/work",
  "/work/guided-intake-lender",
  "/work/spreadsheet-to-portal",
  "/process",
  "/about",
  "/insights",
  "/insights/how-to-scope-an-mvp-so-it-ships",
  "/insights/fixed-price-vs-time-and-materials",
  "/insights/what-a-product-agency-does-week-to-week",
  "/contact",
  "/performance",
  "/teardowns",
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
export function startServer(port) {
  const server = spawn("npm", ["run", "start", "--", "-p", String(port)], {
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
