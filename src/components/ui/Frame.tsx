import { ReactNode } from "react";
import clsx from "clsx";

/**
 * "Blueprint" frame: a hairline border with tick-mark corners, the
 * recurring surface treatment from the design mockups.
 */
export function Frame({
  children,
  className,
  as: As = "div",
  id,
  tabIndex,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
  /** Set when the frame is an anchor target for an in-page link. */
  id?: string;
  /** -1 makes an anchor target focusable, so a hash link moves focus too. */
  tabIndex?: number;
}) {
  return (
    <As className={clsx("blueprint", className)} id={id} tabIndex={tabIndex}>
      <i className="corner tl" aria-hidden="true" />
      <i className="corner tr" aria-hidden="true" />
      <i className="corner bl" aria-hidden="true" />
      <i className="corner br" aria-hidden="true" />
      {children}
    </As>
  );
}
