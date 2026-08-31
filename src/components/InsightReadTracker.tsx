"use client";

import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics";

/** Fires insight_read once the reader passes 75% of the article. */
export function InsightReadTracker({ slug }: { slug: string }) {
  const fired = useRef(false);

  useEffect(() => {
    function onScroll() {
      if (fired.current) return;
      const doc = document.documentElement;
      const progress = (window.scrollY + doc.clientHeight) / doc.scrollHeight;
      if (progress >= 0.75) {
        fired.current = true;
        track("insight_read", { slug });
        window.removeEventListener("scroll", onScroll);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug]);

  return null;
}
