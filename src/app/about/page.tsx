import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Frame } from "@/components/ui/Frame";
import { Kicker } from "@/components/ui/Kicker";
import { CtaLink } from "@/components/ui/CtaLink";
import founderPhoto from "@/assets/founder-headshot.png";

export const metadata: Metadata = {
  title: "About",
  description: "Who builds at TreeInAPool, how we work, and why the name.",
};

const VALUES = [
  {
    title: "Written scope, not a vibe",
    body: "Price, timeline and what's included are agreed in writing before we start. Scope changes are priced, not absorbed silently or refused outright.",
  },
  {
    title: "You watch it get built",
    body: "A live URL updates every sprint. You are reacting to working software, not a slide deck describing progress.",
  },
  {
    title: "You own what you paid for",
    body: "Code, accounts and infrastructure transfer to you at launch. Nothing is held back to force a retainer.",
  },
  {
    title: "Say no when that's the answer",
    body: "If a discovery call ends with \"you don't need us yet,\" that's what we'll say — a bad-fit engagement costs both sides more than it's worth.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="pt-14 pb-10 md:pt-20 md:pb-12">
        <Container>
          <Kicker>About</Kicker>
          <h1 className="-ml-[0.05em] max-w-[20ch] text-[clamp(34px,5vw,68px)] uppercase leading-[1.04] tracking-wide">
            Small studio. Direct work.
          </h1>
          <p className="mt-7 max-w-[56ch] text-[17px] leading-7 text-muted">
            TreeInAPool is a product development agency: a small, senior team that takes prototypes
            and rough operations and turns them into software people rely on.
          </p>
        </Container>
      </section>

      <section className="pb-16 md:pb-20">
        <Container className="grid gap-10 md:grid-cols-[4fr_8fr] md:items-start">
          <div className="relative aspect-[4/5] w-full overflow-hidden border border-[var(--color-divider)]">
            <Image
              src={founderPhoto}
              alt="Olaseni Otusanya, founder of TreeInAPool"
              fill
              sizes="(min-width: 768px) 320px, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-accent-700)]">
              Founder
            </span>
            <h2 className="mt-2 text-3xl uppercase leading-[1.1] tracking-wide">
              Olaseni Otusanya
            </h2>
            <p className="mt-5 max-w-[62ch] text-[16px] leading-7 text-muted">
              TreeInAPool is run as a small, hands-on studio rather than a large agency with
              account layers between you and the people building your product — on most
              engagements, the founder is in the discovery call and the sprint demos, not just
              the sales call.
            </p>
            <p className="mt-4 max-w-[62ch] text-[16px] leading-7 text-muted">
              [ Founder bio — background, prior work, and what led to starting TreeInAPool.
              Replace this bracketed paragraph with the real story before launch; we won&apos;t
              publish invented history. ]
            </p>
            <div className="mt-8 border-t border-[var(--color-divider)] pt-6">
              <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-accent-700)]">
                Why &quot;TreeInAPool&quot;
              </span>
              <p className="mt-3 max-w-[62ch] text-[16px] leading-7 text-muted">
                [ The name&apos;s origin story — pending decision D7. A distinctive name is an
                asset worth a real one-line story; this section should carry it once it&apos;s
                written down. ]
              </p>
            </div>
            <div className="mt-8 border-t border-[var(--color-divider)] pt-6">
              <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-accent-700)]">
                How the team scales
              </span>
              <p className="mt-3 max-w-[62ch] text-[16px] leading-7 text-muted">
                Core discovery, design and architecture stay with the founder on every project.
                Build capacity flexes with a small bench of vetted engineers and designers brought
                in per engagement, briefed by, and accountable to, the same person you talked to
                on the discovery call.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-[var(--color-divider)] py-14 md:py-16">
        <Container>
          <Kicker>What we hold ourselves to</Kicker>
          <div className="grid gap-6 sm:grid-cols-2">
            {VALUES.map((value) => (
              <Frame key={value.title} className="p-6">
                <h3 className="text-xl uppercase leading-6 tracking-wide">{value.title}</h3>
                <p className="mt-3 text-[15px] leading-6 text-muted">{value.body}</p>
              </Frame>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-[var(--color-divider)] py-14 md:py-16">
        <Container className="grid gap-10 md:grid-cols-[7fr_5fr] md:items-center">
          <div>
            <h2 className="text-[clamp(28px,3.4vw,44px)] uppercase leading-[1.06] tracking-wide">
              Talk to the person building it
            </h2>
            <p className="mt-4 max-w-[52ch] text-base leading-7 text-muted">
              Thirty minutes, direct with the founder — no account manager relay.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <CtaLink href="/contact" page="about" position="closing-cta">
              Book a free discovery call
            </CtaLink>
          </div>
        </Container>
      </section>
    </>
  );
}
