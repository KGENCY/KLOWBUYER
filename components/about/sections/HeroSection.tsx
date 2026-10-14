import { t } from "@/content/sections";
import MediaFrame from "../MediaFrame";
import CountryFinder from "../CountryFinder";
import { Links, type SectionProps } from "../parts";

/** The page's only H1. Reuses the landing hero's title, lede and CTA styles. */
export default function HeroSection({ s, locale }: SectionProps) {
  const img = s.images?.[0];
  return (
    <section id={s.id} className="about-hero">
      <div className={`wrap about-hero__grid ${img ? "" : "about-hero__grid--solo"}`}>
        <div>
          <span className="eyebrow eyebrow--accent about-hero__label">{t(s.label, locale)}</span>
          <h1 className="hero__title">
            {t(s.title, locale)}
            {s.subtitle && <>{" "}<em>{t(s.subtitle, locale)}</em></>}
          </h1>
          <p className="hero__lede">{t(s.body, locale)}</p>
          <Links links={s.links} locale={locale} className="hero__cta" />
          {s.addons?.map((a, i) => a.type === "countryFinder" && (
            <CountryFinder
              key={i}
              label={t(a.label, locale)}
              placeholder={t(a.placeholder, locale)}
              quoteLabel={t(a.quoteLabel, locale)}
              quoteHref={a.quoteHref}
              ctaPrefix={a.ctaPrefix}
              destinations={a.destinations.map((d) => ({
                code: d.code,
                name: t(d.name, locale),
                method: t(d.method, locale),
                days: t(d.days, locale),
                labels: t(d.labels, locale),
                registration: t(d.registration, locale),
              }))}
            />
          ))}
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
