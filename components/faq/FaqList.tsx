import Link from "next/link";
import { t, type Locale } from "@/content/i18n";
import type { FaqItem } from "@/content/faq";

/** Native <details> accordion: toggles without JS and keeps answers in the HTML for search engines. */
export default function FaqList({ items, ctaPrefix, locale = "en", openFirst = true }: { items: FaqItem[]; ctaPrefix: string; locale?: Locale; openFirst?: boolean }) {
  return (
    <div className="about-faq">
      {items.map((f, i) => (
        <details key={f.id} open={openFirst && i === 0}>
          <summary>
            <h3>{t(f.question, locale)}</h3>
            <i aria-hidden />
          </summary>
          <div className="about-faq__a">
            <p>{t(f.answer, locale)}</p>
            {f.cta && (
              <Link href={f.cta.href} className="link small" data-cta-id={`${ctaPrefix}_${f.id.replace(/-/g, "_")}`}>
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
export function faqJsonLd(items: FaqItem[], locale: Locale = "en") {
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
