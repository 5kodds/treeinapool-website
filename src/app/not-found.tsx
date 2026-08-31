import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaLink";

export default function NotFound() {
  return (
    <section className="py-24">
      <Container>
        <span className="kicker">404</span>
        <hr className="hr mb-8" />
        <h1 className="max-w-[18ch] text-[clamp(34px,5vw,60px)] uppercase leading-[1.06] tracking-wide">
          That page didn&apos;t ship.
        </h1>
        <p className="mt-6 max-w-[48ch] text-base leading-7 text-muted">
          The page you&apos;re looking for doesn&apos;t exist, or it moved. Try
          the work below, or head back home.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <CtaLink href="/" variant="secondary" page="404" position="body">
            Back to home
          </CtaLink>
          <CtaLink href="/work" variant="ghost" page="404" position="body">
            See the work
          </CtaLink>
        </div>
      </Container>
    </section>
  );
}
