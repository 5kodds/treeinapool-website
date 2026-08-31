"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { track } from "@/lib/analytics";
import type { NavChild } from "@/lib/site";

export function NavDropdown({
  name,
  href,
  items,
  active,
}: {
  name: string;
  href?: string;
  items: NavChild[];
  active: boolean;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const groupRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (!groupRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function openPanel() {
    if (open) return;
    setOpen(true);
    track("nav_dropdown_open", { group: name });
  }

  return (
    <div
      ref={groupRef}
      className="relative"
      onMouseEnter={openPanel}
      onMouseLeave={() => setOpen(false)}
      onFocus={openPanel}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node))
          setOpen(false);
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="true"
        onClick={() => (open ? setOpen(false) : openPanel())}
        className="flex items-center gap-1 py-2 text-sm text-[var(--color-text)] hover:text-[var(--color-accent-700)] aria-[current=page]:text-[var(--color-accent-700)]"
        aria-current={active ? "page" : undefined}
      >
        {name}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute left-1/2 top-full z-50 w-[320px] -translate-x-1/2 pt-3"
      >
        <div className="blueprint bg-[var(--color-bg)] shadow-[0_12px_32px_color-mix(in_srgb,#2b2b2d_18%,transparent)]">
          <i className="corner tl" aria-hidden="true" />
          <i className="corner tr" aria-hidden="true" />
          <i className="corner bl" aria-hidden="true" />
          <i className="corner br" aria-hidden="true" />
          <ul className="flex flex-col py-1">
            {items.map((child) => (
              <li key={`${child.name}-${child.href}`}>
                <Link
                  href={child.href}
                  onClick={() => setOpen(false)}
                  className="block px-5 py-3 text-inherit no-underline hover:bg-[color-mix(in_srgb,var(--color-accent-600)_8%,transparent)]"
                >
                  <span className="block text-sm font-medium">
                    {child.name}
                  </span>
                  {child.description && (
                    <span className="mt-0.5 block text-[13px] leading-5 text-muted-2">
                      {child.description}
                    </span>
                  )}
                </Link>
              </li>
            ))}
            {href && (
              <li className="mt-1 border-t border-[var(--color-divider)]">
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className="block px-5 py-3 text-sm font-medium text-[var(--color-accent-700)]"
                >
                  {name} overview →
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
