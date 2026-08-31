import fs from "node:fs";
import path from "node:path";

const DATA_PATH = path.join(
  process.cwd(),
  "content",
  "performance",
  "latest.json",
);

export type PerfPage = {
  path: string;
  label: string;
  scores: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
  };
  vitals: {
    lcpMs: number;
    cls: number;
    tbtMs: number;
    fcpMs: number;
    speedIndexMs: number;
  };
  formFactor: string;
  throttling: string;
};

export type PerfReport = {
  measuredOn: string;
  lighthouseVersion: string;
  measuredAgainst: string;
  note: string;
  pages: PerfPage[];
};

/**
 * Reads the last recorded Lighthouse run. Returns null when no run has been
 * recorded — the page then says so rather than showing a number nobody
 * measured. Regenerate with `npm run perf`.
 */
export function getPerformanceReport(): PerfReport | null {
  if (!fs.existsSync(DATA_PATH)) return null;
  try {
    return JSON.parse(fs.readFileSync(DATA_PATH, "utf8")) as PerfReport;
  } catch {
    return null;
  }
}

export function formatMs(ms: number): string {
  return ms >= 1000 ? `${(ms / 1000).toFixed(1)}s` : `${ms}ms`;
}
