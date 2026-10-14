import { t } from "@/content/sections";
import { SectionAddons, SectionLabel, type SectionProps } from "../parts";

/** Big statement on one side, explanation on the other, then a row of figures. */
export default function SplitSection({ s, locale }: SectionProps) {
  return (
    <section id={s.id} className="section about-sec">
      <div className="wrap">
        <SectionLabel s={s} locale={locale} />
        <div className="about-split">
          <h2 className="h2 about-split__title">{t(s.title, locale)}</h2>
          <p className="about-split__body">{t(s.body, locale)}</p>
        </div>
        {!!s.items?.length && (
          <dl className="about-stats">
            {s.items.map((it, i) => (
              <div key={it.key ?? i}>
                <dt>{t(it.title, locale)}</dt>
                <dd>{t(it.value, locale)}</dd>
              </div>
            ))}
          </dl>
        )}
        <SectionAddons s={s} locale={locale} />
      </div>
    </section>
  );
}
