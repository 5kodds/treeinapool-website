import type { StaticImageData } from "next/image";
import vuvuCard from "@/assets/work/vuvu-card.png";
import vuvuHero from "@/assets/work/vuvu-hero.png";
import afromadeitCard from "@/assets/work/afromadeit-card.png";
import afromadeitHero from "@/assets/work/afromadeit-hero.png";

/**
 * Screenshots of the real product, captured from the live site, keyed by case
 * study slug. A study with no entry falls back to the drawn placeholder rather
 * than to a stand-in image, because an invented screenshot is a lie about what
 * was built. farm-buddy has no entry on purpose: it is live, but its current
 * build is a bare prototype and shipping that shot would undercut the claim
 * the rest of the page is making.
 */
export type CaseStudyImages = { card: StaticImageData; hero: StaticImageData };

const IMAGES: Record<string, CaseStudyImages> = {
  "vuvu-bill-payments": { card: vuvuCard, hero: vuvuHero },
  "afromadeit-global": { card: afromadeitCard, hero: afromadeitHero },
};

export function caseStudyImages(slug: string): CaseStudyImages | null {
  return IMAGES[slug] ?? null;
}
