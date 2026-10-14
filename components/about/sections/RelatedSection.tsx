import { t } from "@/content/sections";
import RelatedPageCards from "@/components/section/RelatedPageCards";
import { SectionLabel, type SectionProps } from "../parts";

/** Cards pointing to the other pages of the About group. */
export default function RelatedSection({ s, locale, page }: SectionProps) {
  return (
    <section id={s.id} className="about-related">
      <div className="wrap">
        <SectionLabel s={s} locale={locale} />
        <RelatedPageCards
          ctaPrefix={`${page}_related`}
          cards={(s.items ?? []).map((it, i) => ({
            key: it.key ?? String(i),
            href: it.href ?? "#",
            title: t(it.title, locale),
            description: it.description && t(it.description, locale),
          }))}
        />
      </div>
    </section>
  );
}
