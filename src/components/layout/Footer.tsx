import Link from "next/link";
import { CONTACT_EMAIL, NAV_ITEMS, SHOW_WHATSAPP, SITE_NAME, WHATSAPP_NUMBER } from "@/lib/site";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-divider)]">
      <Container className="flex flex-wrap gap-x-14 gap-y-6 py-10 text-sm leading-6 text-muted">
        <span className="mr-auto font-[family-name:var(--font-heading)] text-lg font-semibold uppercase text-[var(--color-text)]">
          {SITE_NAME}
        </span>
        <div className="flex flex-col gap-1.5">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-[var(--color-accent-700)]">
              {item.name}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-1.5">
          <Link href="/contact" className="hover:text-[var(--color-accent-700)]">
            Book a call
          </Link>
          <Link href="/contact" className="hover:text-[var(--color-accent-700)]">
            Contact
          </Link>
        </div>
        <div className="flex flex-col gap-1.5">
          <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-[var(--color-accent-700)]">
            {CONTACT_EMAIL}
          </a>
          {SHOW_WHATSAPP && (
            <span>WhatsApp{WHATSAPP_NUMBER ? `: ${WHATSAPP_NUMBER}` : " (coming soon)"}</span>
          )}
          <span>LinkedIn</span>
        </div>
      </Container>
    </footer>
  );
}
