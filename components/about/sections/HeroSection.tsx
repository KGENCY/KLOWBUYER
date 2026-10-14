import { t } from "@/content/sections";
import MediaFrame from "@/components/media/MediaFrame";
import { Links, type SectionProps } from "../parts";

/** The page's only H1. Reuses the landing hero's title, lede and CTA styles. */
export default function HeroSection({ s, locale }: SectionProps) {
  const img = s.images?.[0];
  return (
    <section id={s.id} className="about-hero">
      <div className={`wrap about-hero__grid ${img ? "" : "about-hero__grid--solo"}`}>
        <div>
          <span className="eyebrow eyebrow--accent about-hero__label">{t(s.label, locale)}</span>
          {s.subtitleInHeading === false ? (
            // H1 is exactly the title; the grey line keeps the same look but sits outside it.
            <div className="hero__title">
              <h1>{t(s.title, locale)}</h1>
              {s.subtitle && <p><em>{t(s.subtitle, locale)}</em></p>}
            </div>
          ) : (
            <h1 className="hero__title">
              {t(s.title, locale)}
              {s.subtitle && <>{" "}<em>{t(s.subtitle, locale)}</em></>}
            </h1>
          )}
          <p className="hero__lede">{t(s.body, locale)}</p>
          <Links links={s.links} locale={locale} className="hero__cta" />
        </div>
        {img && (
          <MediaFrame
            src={img.src}
            alt={t(img.alt, locale)}
            caption={t(img.caption, locale)}
            fallback={img.fallback}
            ratio={img.ratio ?? "4 / 4.6"}
            fit={img.fit}
            priority
          />
        )}
      </div>
    </section>
  );
}
