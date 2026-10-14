import { t } from "@/content/about";
import MediaFrame from "../MediaFrame";
import { SectionHead, type SectionProps } from "../parts";

/** Legal company facts as a label/value table, a map slot, and team placeholders. */
export default function CompanyInfoSection({ s, locale }: SectionProps) {
  const map = s.images?.[0];
  return (
    <section id={s.id} className="section about-sec">
      <div className="wrap">
        <SectionHead s={s} locale={locale} />
        <div className="about-company">
          <dl className="about-facts">
            {s.items?.map((it, i) => (
              <div key={it.key ?? i}>
                <dt>{t(it.title, locale)}</dt>
                <dd>{t(it.value, locale)}</dd>
              </div>
            ))}
          </dl>
          {map && (
            <MediaFrame src={map.src} alt={t(map.alt, locale)} caption={t(map.caption, locale)} fallback={map.fallback} ratio="4 / 3" />
          )}
        </div>
        {!!s.people?.length && (
          <ul className="about-team">
            {s.people.map((p, i) => (
              <li key={i}>
                <MediaFrame src={p.image.src} alt={t(p.image.alt, locale)} fallback={p.image.fallback} ratio="4 / 5" />
                <b>{t(p.name, locale)}</b>
                <span>{t(p.role, locale)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
