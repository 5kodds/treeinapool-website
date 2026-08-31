"use client";

import Link from "next/link";
import clsx from "clsx";
import { track } from "@/lib/analytics";

export function CtaLink({
  href,
  children,
  variant = "primary",
  page,
  position,
  className,
  external,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  page: string;
  position: string;
  className?: string;
  external?: boolean;
}) {
  const cls = clsx(
    "btn",
    {
      "btn-primary": variant === "primary",
      "btn-secondary": variant === "secondary",
      "btn-ghost": variant === "ghost",
    },
    className
  );

  const handleClick = () => {
    if (variant === "primary") {
      track("cta_click_primary", { page, position });
    }
  };

  if (external) {
    return (
      <a
        href={href}
        className={cls}
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} onClick={handleClick}>
      {children}
    </Link>
  );
}
