import Link from "next/link";
import { t } from "@/content/sections";
import { SectionLabel, type SectionProps } from "../parts";

/** Cards pointing to the other pages of the About group. */
export default function RelatedSection({ s, locale, page }: SectionProps) {
  return (
    <section id={s.id} className="about-related">
      <div className="wrap">
        <SectionLabel s={s} locale={locale} />
        <ul className="about-related__grid">
          {s.items?.map((it, i) => (
            <li key={it.key ?? i}>
              <Link href={it.href ?? "#"} data-cta-id={`${page}_related_${it.key ?? i}`}>
                <h2>{t(it.title, locale)}</h2>
                {it.description && <p>{t(it.description, locale)}</p>}
                <span className="about-related__go" aria-hidden>→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
