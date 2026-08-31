import { ReactNode } from "react";
import clsx from "clsx";

/**
 * "Blueprint" frame — hairline border with tick-mark corners, the
 * recurring surface treatment from the design mockups.
 */
export function Frame({
  children,
  className,
  as: As = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
}) {
  return (
    <As className={clsx("blueprint", className)}>
      <i className="corner tl" aria-hidden="true" />
      <i className="corner tr" aria-hidden="true" />
      <i className="corner bl" aria-hidden="true" />
      <i className="corner br" aria-hidden="true" />
      {children}
    </As>
  );
}
