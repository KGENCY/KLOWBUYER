import { t } from "@/content/sections";
import Illustration from "@/components/media/Illustration";
import { SectionAddons, SectionHead, type SectionProps } from "../parts";

/** Target markets as a ruled list, over a faint dot map with routes out of Korea. */
export default function RegionsSection({ s, locale }: SectionProps) {
  const map = s.images?.[0];
  return (
    <section id={s.id} className="section about-sec about-regions">
      {map && (
        <div className="about-regions__map">
          {map.src ? <img src={map.src} alt={t(map.alt, locale)} loading="lazy" /> : <Illustration name={map.fallback} title={t(map.alt, locale)} fit="contain" />}
        </div>
      )}
      <div className="wrap about-split">
        <div>
          <SectionHead s={s} locale={locale} />
          <p className="about-regions__body">{t(s.body, locale)}</p>
        </div>
        <ul className="about-regions__list">
          {s.items?.map((it, i) => (
            <li key={i}>
              <h3>{t(it.title, locale)}</h3>
              <span>{t(it.description, locale)}</span>
            </li>
          ))}
        </ul>
      </div>
      {!!s.addons?.length && (
        <div className="wrap">
          <SectionAddons s={s} locale={locale} />
        </div>
      )}
    </section>
  );
}
