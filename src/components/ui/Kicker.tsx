export function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <>
      <span className="kicker">{children}</span>
      <hr className="hr mb-8 md:mb-10" />
    </>
  );
}
