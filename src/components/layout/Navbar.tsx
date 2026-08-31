"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaLink";
import { NavDropdown } from "@/components/layout/NavDropdown";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { NAV, SITE_NAME, type NavChild, type NavGroup } from "@/lib/site";
import logo from "@/assets/treeinapool-logo.png";

export function Navbar({ featuredWork = [] }: { featuredWork?: NavChild[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => setOpen(false), []);

  const groups: NavGroup[] = NAV.map((group) =>
    group.mergeFeaturedWork
      ? { ...group, children: [...featuredWork, ...(group.children ?? [])] }
      : group
  );

  const isActive = (group: NavGroup) =>
    Boolean(
      (group.href && group.href !== "/" && pathname.startsWith(group.href)) ||
        group.children?.some((child) => pathname === child.href.split("#")[0])
    );

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-[var(--color-bg)] transition-shadow ${
        scrolled
          ? "border-[var(--color-divider)] shadow-[0_1px_12px_color-mix(in_srgb,#2b2b2d_12%,transparent)]"
          : "border-transparent"
      }`}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2" aria-label={SITE_NAME}>
          <Image src={logo} alt="" width={28} height={28} className="h-7 w-auto" priority />
          <span className="font-[family-name:var(--font-heading)] text-lg font-semibold uppercase tracking-wide">
            {SITE_NAME}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {groups.map((group) => {
            if (group.cta) {
              return (
                <CtaLink
                  key={group.name}
                  href={group.href ?? "/contact"}
                  page="global-nav"
                  position="header"
                >
                  Book a call
                </CtaLink>
              );
            }

            if (group.children?.length) {
              return (
                <NavDropdown
                  key={group.name}
                  name={group.name}
                  href={group.href}
                  items={group.children}
                  active={isActive(group)}
                />
              );
            }

            return (
              <Link
                key={group.name}
                href={group.href!}
                aria-current={isActive(group) ? "page" : undefined}
                className="py-2 text-sm text-[var(--color-text)] hover:text-[var(--color-accent-700)] aria-[current=page]:text-[var(--color-accent-700)]"
              >
                {group.name}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          className="btn btn-ghost btn-icon flex h-11 w-11 items-center justify-center md:hidden"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>
      </Container>

      {open && <MobileMenu groups={groups} onClose={closeMenu} />}
    </header>
  );
}
