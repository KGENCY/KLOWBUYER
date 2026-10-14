import { type Locale } from "@/content/i18n";
import { faqsFor, type FaqCategory } from "@/content/faq";
import { SectionHead, type HeadFields } from "@/components/about/parts";
import FaqList, { faqJsonLd } from "./FaqList";

/**
 * One category of the shared FAQ as a page section, with its FAQPage JSON-LD.
 * Use it once per page so search engines see a single FAQPage.
 */
export default function FaqSection({
  category,
  id = "faq",
  head,
  ctaPrefix,
  locale = "en",
  withSchema = true,
}: {
  category: FaqCategory;
  id?: string;
  head: HeadFields;
  /** data-cta-id prefix for the inline answer links, e.g. "about_faq". */
  ctaPrefix: string;
  locale?: Locale;
  /** Output FAQPage JSON-LD. Keep true on the page that owns these questions; false on the FAQ hub. */
  withSchema?: boolean;
}) {
  const items = faqsFor(category);
  if (!items.length) return null;
  return (
    <section id={id} className="section about-sec">
      {withSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(items, locale)).replace(/</g, "\\u003c") }} />
      )}
      <div className="wrap about-split">
        <SectionHead s={head} locale={locale} />
        <FaqList items={items} ctaPrefix={ctaPrefix} locale={locale} />
      </div>
    </section>
  );
}
