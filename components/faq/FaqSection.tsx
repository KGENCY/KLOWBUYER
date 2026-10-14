import { t, type Locale } from "@/content/i18n";
import { faqsFor, type FaqCategory, type FaqItem } from "@/content/faq";
import type { HeadFields } from "@/components/about/parts";
import SectionHeader from "@/components/section/SectionHeader";
import FaqList, { faqJsonLd } from "./FaqList";

/**
 * One category of the shared FAQ as a page section.
 * withSchema (default true) outputs its FAQPage JSON-LD — keep it on the page that owns the questions,
 * turn it off where questions are only collected (the /faq hub).
 */
export default function FaqSection({
  category,
  id = "faq",
  head,
  description,
  ctaPrefix,
  locale = "en",
  withSchema = true,
  items,
  openAll,
  footer,
}: {
  category: FaqCategory;
  id?: string;
  head: HeadFields;
  /** Line under the heading. */
  description?: string;
  /** data-cta-id prefix for the inline answer links, e.g. "about_faq". */
  ctaPrefix: string;
  locale?: Locale;
  withSchema?: boolean;
  /** Pre-filtered questions (e.g. search results). Defaults to every question in the category. */
  items?: FaqItem[];
  openAll?: boolean;
  /** Shown under the list, e.g. "More about shipping →". */
  footer?: React.ReactNode;
}) {
  const list = items ?? faqsFor(category);
  if (!list.length) return null;
  return (
    <section id={id} className="section about-sec">
      {withSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(list, locale)).replace(/</g, "\\u003c") }} />
      )}
      <div className="wrap about-split">
        <div className="faq-cat__head">
          <SectionHeader
            number={head.number}
            label={head.label && t(head.label, locale)}
            title={head.title && t(head.title, locale)}
            subtitle={head.subtitle && t(head.subtitle, locale)}
            description={description}
          />
          {footer}
        </div>
        <FaqList items={list} ctaPrefix={ctaPrefix} locale={locale} openFirst={!openAll} openAll={openAll} />
      </div>
    </section>
  );
}
