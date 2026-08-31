"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaLink";
import {
  CONTACT_EMAIL,
  SHOW_WHATSAPP,
  SITE_NAME,
  type NavGroup,
} from "@/lib/site";
import logo from "@/assets/treeinapool-logo.png";

export function MobileMenu({
  groups,
  onClose,
}: {
  groups: NavGroup[];
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  const links = groups.filter((group) => !group.cta);
  const cta = groups.find((group) => group.cta);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[var(--color-bg)] md:hidden">
      <Container className="flex h-16 shrink-0 items-center justify-between border-b border-[var(--color-divider)]">
        <Link href="/" className="flex items-center gap-2" onClick={onClose}>
          <Image
            src={logo}
            alt=""
            width={28}
            height={28}
            className="h-7 w-auto"
          />
          <span className="font-[family-name:var(--font-heading)] text-lg font-semibold uppercase tracking-wide">
            {SITE_NAME}
          </span>
        </Link>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="btn btn-ghost btn-icon flex h-11 w-11 items-center justify-center"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </Container>

      <nav className="flex flex-1 flex-col overflow-y-auto" aria-label="Mobile">
        {links.map((group, i) => {
          const hasChildren = Boolean(group.children?.length);
          const isOpen = expanded === group.name;

          return (
            <div
              key={group.name}
              className="border-b border-[var(--color-divider)]"
            >
              <div className="flex items-stretch">
                {group.href ? (
                  <Link
                    href={group.href}
                    onClick={onClose}
                    className="flex flex-1 items-baseline gap-3 px-6 py-5 text-inherit no-underline"
                  >
                    <span className="text-xs font-semibold tracking-[0.08em] text-[var(--color-accent-700)]">
                      0{i + 1}
                    </span>
                    <span className="font-[family-name:var(--font-heading)] text-2xl font-semibold uppercase">
                      {group.name}
                    </span>
                  </Link>
                ) : (
                  <span className="flex flex-1 items-baseline gap-3 px-6 py-5">
                    <span className="text-xs font-semibold tracking-[0.08em] text-[var(--color-accent-700)]">
                      0{i + 1}
                    </span>
                    <span className="font-[family-name:var(--font-heading)] text-2xl font-semibold uppercase">
                      {group.name}
                    </span>
                  </span>
                )}

                {hasChildren && (
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-label={`${isOpen ? "Collapse" : "Expand"} ${group.name}`}
                    onClick={() => setExpanded(isOpen ? null : group.name)}
                    className="flex w-14 shrink-0 items-center justify-center border-l border-[var(--color-divider)]"
                  >
                    <ChevronDown
                      className={`h-5 w-5 text-[var(--color-accent-700)] transition-transform ${isOpen ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                )}
              </div>

              {hasChildren && isOpen && (
                <ul className="border-t border-[var(--color-divider)] bg-[color-mix(in_srgb,var(--color-text)_3%,transparent)]">
                  {group.children!.map((child) => (
                    <li key={`${child.name}-${child.href}`}>
                      <Link
                        href={child.href}
                        onClick={onClose}
                        className="block px-6 py-4 text-[15px] text-inherit no-underline"
                      >
                        {child.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}

        <div className="mt-auto flex shrink-0 flex-col gap-3 border-t border-[var(--color-divider)] px-6 py-5">
          <CtaLink
            href={cta?.href ?? "/contact"}
            page="global-nav"
            position="mobile-menu"
            className="btn-block"
          >
            Book a free discovery call
          </CtaLink>
          <div className="flex justify-between text-[13px] text-muted-2">
            <span>{CONTACT_EMAIL}</span>
            {SHOW_WHATSAPP && <span>WhatsApp</span>}
          </div>
        </div>
      </nav>
    </div>
  );
}
