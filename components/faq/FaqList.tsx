import Link from "next/link";
import { t, type Locale } from "@/content/i18n";
import type { FaqItem } from "@/content/faq";

/** What the accordion needs — site FAQ items and brand FAQs both fit. */
export type FaqEntry = Pick<FaqItem, "id" | "question" | "answer" | "cta">;

/** DOM id of a question, so cards and links can open it: <details id="q-{id}">. */
export const faqAnchor = (id: string) => `q-${id}`;

/** Native <details> accordion: toggles without JS and keeps answers in the HTML for search engines. */
export default function FaqList({
  items,
  ctaPrefix,
  locale = "en",
  openFirst = true,
  openAll = false,
}: {
  items: FaqEntry[];
  ctaPrefix: string;
  locale?: Locale;
  openFirst?: boolean;
  /** Open every answer, e.g. while showing search results. */
  openAll?: boolean;
}) {
  return (
    <div className="about-faq">
      {items.map((f, i) => (
        <details key={`${f.id}-${openAll}`} id={faqAnchor(f.id)} open={openAll || (openFirst && i === 0)}>
          <summary>
            <h3>{t(f.question, locale)}</h3>
            <i aria-hidden />
          </summary>
          <div className="about-faq__a">
            <p>{t(f.answer, locale)}</p>
            {f.cta && (
              <Link href={f.cta.href} className="link small" data-cta-id={`${ctaPrefix}_${f.cta.ctaId}`}>
                {t(f.cta.label, locale)}
              </Link>
            )}
          </div>
        </details>
      ))}
    </div>
  );
}

/** FAQPage structured data for a set of questions. */
export function faqJsonLd(items: FaqEntry[], locale: Locale = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: t(f.question, locale),
      acceptedAnswer: { "@type": "Answer", text: t(f.answer, locale) },
    })),
  };
}
