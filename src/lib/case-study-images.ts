import type { StaticImageData } from "next/image";
import vuvuCard from "@/assets/work/vuvu-card.webp";
import vuvuHero from "@/assets/work/vuvu-hero.webp";
import afromadeitCard from "@/assets/work/afromadeit-card.webp";
import afromadeitHero from "@/assets/work/afromadeit-hero.webp";
import farmbuddyCard from "@/assets/work/farmbuddy-card.webp";
import farmbuddyHero from "@/assets/work/farmbuddy-hero.webp";

/**
 * Imagery for the work cards and case study heroes, keyed by slug.
 *
 * `kind` matters and is not decoration. A screenshot is evidence, and it says
 * "this is the product". A photograph is illustration, and presenting one as
 * the other is the quiet kind of lie this site is built to avoid. The alt
 * text and the visible caption both follow from it.
 */
export type CaseStudyImages = {
  card: StaticImageData;
  hero: StaticImageData;
  kind: "screenshot" | "photograph";
  /** Rendered under the hero. Required for a photograph. */
  credit?: string;
};

const IMAGES: Record<string, CaseStudyImages> = {
  "vuvu-bill-payments": {
    card: vuvuCard,
    hero: vuvuHero,
    kind: "screenshot",
  },
  "afromadeit-global": {
    card: afromadeitCard,
    hero: afromadeitHero,
    kind: "screenshot",
  },
  "farm-buddy": {
    card: farmbuddyCard,
    hero: farmbuddyHero,
    kind: "photograph",
    credit:
      "Illustration, not a screenshot: cassava showing mosaic mottling, the kind of leaf a user photographs. Public domain (CC0) via Openverse.",
  },
};

/** Alt text that says what the reader is actually looking at. */
export function imageAlt(images: CaseStudyImages, title: string): string {
  return images.kind === "screenshot"
    ? `${title}, screenshot of the live product`
    : `${title}, photograph of a cassava leaf showing the mottling a user would point the camera at`;
}

export function caseStudyImages(slug: string): CaseStudyImages | null {
  return IMAGES[slug] ?? null;
}
