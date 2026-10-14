import { t } from "@/content/sections";
import { Links, SectionAddons, SectionHead, type SectionProps } from "../parts";

/** Numbered boxes in 3 or 4 columns, with an optional row of partner logos and a link below. */
export default function GridSection({ s, locale }: SectionProps) {
  return (
    <section id={s.id} className="section about-sec">
      <div className="wrap">
        <SectionHead s={s} locale={locale} />
        <ol className={`about-cards about-cards--${s.columns ?? 3}`}>
          {s.items?.map((it, i) => (
            <li key={i}>
              <span className="about-cards__n">{String(i + 1).padStart(2, "0")}</span>
              <h3>{t(it.title, locale)}</h3>
              {it.description && <p>{t(it.description, locale)}</p>}
            </li>
          ))}
        </ol>
        {!!s.logos?.length && (
          <ul className="about-logos" aria-label="Partner brands">
            {s.logos.map((l, i) => <li key={i}>{t(l, locale)}</li>)}
          </ul>
        )}
        <Links links={s.links} locale={locale} />
        <SectionAddons s={s} locale={locale} />
      </div>
    </section>
  );
}
