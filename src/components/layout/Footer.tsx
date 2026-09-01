import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { NewsletterForm } from "@/components/NewsletterForm";
import {
  CONTACT_EMAIL,
  LOCATION_LINE,
  SERVICES,
  SHOW_WHATSAPP,
  SITE_NAME,
  SOCIAL_LINKS,
  WHATSAPP_NUMBER,
  WHATSAPP_URL,
} from "@/lib/site";

const COMPANY_LINKS = [
  { name: "About", href: "/about" },
  { name: "Process", href: "/process" },
  { name: "Work", href: "/work" },
  { name: "Teardowns", href: "/teardowns" },
  { name: "Insights", href: "/insights" },
  { name: "Performance", href: "/performance" },
  { name: "Contact", href: "/contact" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const socials = SOCIAL_LINKS.filter((social) => social.href);

  return (
    <footer className="mt-auto border-t border-[var(--color-divider)]">
      {/* Newsletter */}
      <Container className="grid gap-6 border-b border-[var(--color-divider)] py-10 md:grid-cols-[6fr_6fr] md:items-center">
        <div>
          <h2 className="text-2xl uppercase leading-7 tracking-wide">
            One useful email when we publish
          </h2>
          <p className="mt-2 max-w-[52ch] text-[15px] leading-6 text-muted">
            New writing on scoping, pricing and shipping software. No drip
            sequence, no pitch, unsubscribe in one click.
          </p>
        </div>
        <div className="md:justify-self-end">
          <NewsletterForm />
        </div>
      </Container>

      {/* Columns */}
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <span className="font-[family-name:var(--font-heading)] text-lg font-semibold uppercase tracking-wide">
            {SITE_NAME}
          </span>
          <p className="mt-3 max-w-[32ch] text-[14px] leading-6 text-muted">
            A product development agency. We turn prototypes into products
            people pay for.
          </p>
          {socials.length > 0 && (
            <div className="mt-4 flex gap-4 text-sm">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--color-accent-800)]"
                >
                  {social.name}
                </a>
              ))}
            </div>
          )}
        </div>

        <div>
          <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-muted-2">
            Services
          </span>
          <ul className="mt-4 flex flex-col gap-2 text-sm">
            {SERVICES.map((service) => (
              <li key={service.id}>
                <Link
                  href={`/services#${service.code.toLowerCase()}`}
                  className="text-muted no-underline hover:text-[var(--color-accent-700)]"
                >
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-muted-2">
            Company
          </span>
          <ul className="mt-4 flex flex-col gap-2 text-sm">
            {COMPANY_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-muted no-underline hover:text-[var(--color-accent-700)]"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-muted-2">
            Contact
          </span>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-muted">
            <li>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="no-underline hover:text-[var(--color-accent-700)]"
              >
                {CONTACT_EMAIL}
              </a>
            </li>
            {SHOW_WHATSAPP && (
              <li>
                {WHATSAPP_URL ? (
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-underline hover:text-[var(--color-accent-700)]"
                  >
                    WhatsApp: {WHATSAPP_NUMBER}
                  </a>
                ) : (
                  <span>WhatsApp: [ number, D2 ]</span>
                )}
              </li>
            )}
            <li>{LOCATION_LINE}</li>
          </ul>
        </div>
      </Container>

      {/* Legal */}
      <Container className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--color-divider)] py-6 text-[13px] text-muted-2">
        <span>
          © {year} {SITE_NAME}. All rights reserved.
        </span>
        <div className="flex gap-6">
          <Link
            href="/privacy"
            className="no-underline hover:text-[var(--color-accent-700)]"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="no-underline hover:text-[var(--color-accent-700)]"
          >
            Terms
          </Link>
        </div>
      </Container>
    </footer>
  );
}
