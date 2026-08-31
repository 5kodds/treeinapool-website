"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaLink";
import { CONTACT_EMAIL, NAV_ITEMS, SHOW_WHATSAPP, SITE_NAME } from "@/lib/site";
import logo from "@/assets/treeinapool-logo.png";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className="sticky top-0 z-40 border-b border-[var(--color-divider)] bg-[var(--color-bg)]"
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2" aria-label={SITE_NAME}>
          <Image src={logo} alt="" width={28} height={28} className="h-7 w-auto" priority />
          <span className="font-[family-name:var(--font-heading)] text-lg font-semibold uppercase tracking-wide">
            {SITE_NAME}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className="text-sm text-[var(--color-text)] hover:text-[var(--color-accent-700)] aria-[current=page]:text-[var(--color-accent-700)]"
            >
              {item.name}
            </Link>
          ))}
          <CtaLink href="/contact" page="global-nav" position="header">
            Book a call
          </CtaLink>
        </nav>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="btn btn-ghost btn-icon flex h-11 w-11 items-center justify-center md:hidden"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>
      </Container>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[var(--color-bg)] md:hidden">
          <Container className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
              <Image src={logo} alt="" width={28} height={28} className="h-7 w-auto" />
              <span className="font-[family-name:var(--font-heading)] text-lg font-semibold uppercase tracking-wide">
                {SITE_NAME}
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="btn btn-ghost btn-icon flex h-11 w-11 items-center justify-center"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </Container>

          <nav className="flex flex-1 flex-col" aria-label="Mobile">
            {NAV_ITEMS.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-baseline gap-3 border-b border-[var(--color-divider)] px-6 py-6"
              >
                <span className="text-xs font-semibold tracking-[0.08em] text-[var(--color-accent-700)]">
                  0{i + 1}
                </span>
                <span className="font-[family-name:var(--font-heading)] text-2xl font-semibold uppercase">
                  {item.name}
                </span>
              </Link>
            ))}
            <div className="mt-auto flex flex-col gap-3 border-t border-[var(--color-divider)] px-6 py-5">
              <CtaLink href="/contact" page="global-nav" position="mobile-menu" className="btn-block">
                Book a free discovery call
              </CtaLink>
              <div className="flex justify-between text-[13px] text-muted-2">
                <span>{CONTACT_EMAIL}</span>
                {SHOW_WHATSAPP && <span>WhatsApp</span>}
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
