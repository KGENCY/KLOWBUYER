import type { BrandProfile } from "@/content/brands";
import SectionHeader from "@/components/section/SectionHeader";
import FaqList, { faqJsonLd, type FaqEntry } from "@/components/faq/FaqList";

export const brandFaqEntries = (b: BrandProfile): FaqEntry[] =>
  b.faq.map((f, i) => ({ id: `${b.slug}-${i}`, question: f.question, answer: f.answer }));

/** The brand's own questions in the site's accordion, with their FAQPage JSON-LD. Renders nothing without questions. */
export default function BrandFaq({ brand, title, ctaPrefix, aside }: { brand: BrandProfile; title: string; ctaPrefix: string; aside?: React.ReactNode }) {
  const items = brandFaqEntries(brand);
  if (!items.length && !aside) return null;
  return (
    <>
      {!!items.length && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(items)).replace(/</g, "\\u003c") }} />
      )}
      <div className="faq-cat__head">
        <SectionHeader label="FAQ" title={title} />
        {aside}
      </div>
      {!!items.length && <FaqList items={items} ctaPrefix={ctaPrefix} />}
    </>
  );
}
