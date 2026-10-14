import { t } from "@/content/i18n";
import type { Guide } from "@/content/guides";
import { faqJsonLd } from "@/components/faq/FaqList";

/** Article + BreadcrumbList (+ FAQPage when the guide has questions). */
export default function GuideJsonLd({ guide, headline, crumbs }: { guide: Guide; headline: string; crumbs: { label: string; href: string }[] }) {
  const graph: object[] = [
    {
      "@type": "Article",
      headline,
      description: t(guide.seo.description),
      datePublished: guide.publishedAt,
      dateModified: guide.updatedAt,
      author: { "@type": "Organization", name: "KLOW" },
      publisher: { "@type": "Organization", name: "KLOW" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, item: c.href })),
    },
  ];
  if (guide.faq.length) {
    const { "@context": _ctx, ...faq } = faqJsonLd(guide.faq.map((f, i) => ({ id: `${guide.slug}-${i}`, question: f.question, answer: f.answer })));
    graph.push(faq);
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c") }}
    />
  );
}
