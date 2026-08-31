import clsx from "clsx";

export function Tag({
  children,
  variant = "neutral",
}: {
  children: React.ReactNode;
  variant?: "neutral" | "accent" | "outline";
}) {
  return (
    <span
      className={clsx("tag", {
        "tag-neutral": variant === "neutral",
        "tag-accent": variant === "accent",
        "tag-outline": variant === "outline",
      })}
    >
      {children}
    </span>
  );
}
