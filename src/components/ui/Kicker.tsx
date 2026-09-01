/**
 * Section label above a rule. Defaults to a span, because several kickers
 * sit above the page h1 where a heading would break the hierarchy. Pass
 * as="h2" wherever the kicker genuinely labels a section whose contents are
 * h3s, otherwise the page jumps h1 to h3 and a screen reader loses a level.
 */
export function Kicker({
  children,
  as: Tag = "span",
}: {
  children: React.ReactNode;
  as?: "span" | "h2";
}) {
  return (
    <>
      <Tag className="kicker">{children}</Tag>
      <hr className="hr mb-8 md:mb-10" />
    </>
  );
}
