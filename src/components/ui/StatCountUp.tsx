"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

const DURATION_MS = 900;

/**
 * Counts a numeric outcome stat up when it scrolls into view. Anything
 * without a number in it (or a bracketed placeholder) renders as-is, and
 * reduced-motion visitors always see the final value immediately.
 */
export function StatCountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [progress, setProgress] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  const match = /^(\D*?)(\d+(?:\.\d+)?)(.*)$/.exec(value);
  const isPlaceholder = value.includes("[");
  const animatable = Boolean(match) && !isPlaceholder && !reducedMotion;

  useEffect(() => {
    const node = ref.current;
    if (!node || !animatable) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();

        const start = performance.now();
        let frame = 0;
        const step = (now: number) => {
          const elapsed = Math.min(1, (now - start) / DURATION_MS);
          // easeOutCubic
          setProgress(1 - Math.pow(1 - elapsed, 3));
          if (elapsed < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
        node.dataset.cleanup = String(frame);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      const frame = Number(node.dataset.cleanup);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [animatable]);

  if (!animatable || !match) {
    return <>{value}</>;
  }

  const [, prefix, digits, suffix] = match;
  const target = Number(digits);
  const decimals = digits.includes(".") ? digits.split(".")[1].length : 0;
  const current = (target * progress).toFixed(decimals);

  return (
    <span ref={ref}>
      {prefix}
      {current}
      {suffix}
    </span>
  );
}
