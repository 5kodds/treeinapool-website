import { Accordion, type AccordionItem } from "@/components/ui/Accordion";
import { Kicker } from "@/components/ui/Kicker";

/**
 * FAQ block plus its FAQPage structured data. Rendered on every page that
 * has questions mapped to it, so no page is a dead end.
 */
export function FaqSection({
  items,
  page,
  title = "Frequently asked",
}: {
  items: readonly AccordionItem[];
  page: string;
  title?: string;
}) {
  if (items.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <Kicker>{title}</Kicker>
      <Accordion items={items} page={page} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
