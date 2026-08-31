"use client";

import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics";

// Fires case_study_read once the reader has scrolled past 60% of the
// document, per the PRD's instrumentation plan (§9).
export function CaseStudyReadTracker({ slug }: { slug: string }) {
  const fired = useRef(false);

  useEffect(() => {
    function onScroll() {
      if (fired.current) return;
      const doc = document.documentElement;
      const scrolled = (window.scrollY + doc.clientHeight) / doc.scrollHeight;
      if (scrolled >= 0.6) {
        fired.current = true;
        track("case_study_read", { slug });
        window.removeEventListener("scroll", onScroll);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug]);

  return null;
}
