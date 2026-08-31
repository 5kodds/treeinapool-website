"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { track } from "@/lib/analytics";
import type { Testimonial } from "@/lib/site";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

const ADVANCE_MS = 7000;

export function QuoteCarousel({ quotes }: { quotes: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const liveRegion = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  // Rotation never runs for reduced-motion visitors, or once a visitor takes control.
  const playing = !paused && !reducedMotion && quotes.length > 1;

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % quotes.length);
    }, ADVANCE_MS);
    return () => window.clearInterval(timer);
  }, [playing, quotes.length]);

  function go(direction: 1 | -1) {
    setIndex(
      (current) => (current + direction + quotes.length) % quotes.length,
    );
    setPaused(true);
    track("carousel_advance", { direction: direction === 1 ? "next" : "prev" });
  }

  if (quotes.length === 0) return null;
  const active = quotes[index];

  return (
    <div className="grid gap-8 md:grid-cols-[8fr_4fr] md:items-end">
      <figure
        className="m-0"
        aria-roledescription="carousel"
        aria-label="Client quotes"
      >
        <div ref={liveRegion} aria-live="polite" aria-atomic="true">
          <blockquote className="m-0 max-w-[38ch] text-[clamp(24px,2.8vw,36px)] uppercase leading-[1.15]">
            &ldquo;{active.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-6 text-[15px] leading-6 text-muted">
            — {active.name}, {active.role}
          </figcaption>
        </div>
      </figure>

      <div className="flex items-center gap-2 md:justify-end">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous quote"
          className="btn btn-secondary btn-icon flex h-11 w-11 items-center justify-center"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          aria-label={playing ? "Pause quote rotation" : "Play quote rotation"}
          className="btn btn-secondary btn-icon flex h-11 w-11 items-center justify-center"
        >
          {playing ? (
            <Pause className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Play className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next quote"
          className="btn btn-secondary btn-icon flex h-11 w-11 items-center justify-center"
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
        <span className="ml-2 text-[13px] text-muted-2">
          {index + 1} / {quotes.length}
        </span>
      </div>
    </div>
  );
}
