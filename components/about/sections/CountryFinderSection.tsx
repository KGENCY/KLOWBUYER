import { t } from "@/content/sections";
import { DIFFICULTY_TEXT, LABEL_SUPPORT_TEXT, shippingCountries } from "@/content/shippingCountries";
import { importGuide } from "@/content/guides";
import CountryFinder from "../CountryFinder";
import { SectionAddons, SectionHead, type SectionProps } from "../parts";

/** Section wrapper for the country picker; country records come from content/shippingCountries.ts. */
export default function CountryFinderSection({ s, locale, page }: SectionProps) {
  const f = s.finder;
  if (!f) return null;
  const countries = shippingCountries().map((c) => ({
    code: c.code,
    name: t(c.name, locale),
    method: t(c.recommendedMethod, locale),
    days: t(c.deliveryDays, locale),
    labels: c.labelSupport === "supported" && c.labelLanguage
      ? `${t(LABEL_SUPPORT_TEXT.supported, locale)} — ${t(c.labelLanguage, locale)}`
      : t(LABEL_SUPPORT_TEXT[c.labelSupport], locale),
    registration: t(c.registrationSummary, locale),
    difficulty: c.difficulty && { key: c.difficulty, label: t(DIFFICULTY_TEXT[c.difficulty], locale) },
    // Only link guides that exist (e.g. Colombia has a slug but no guide yet).
    guideHref: c.guideSlug && importGuide(c.guideSlug) ? `/guides/import/${c.guideSlug}` : undefined,
  }));
  return (
    <section id={s.id} className="section about-sec">
      <div className="wrap">
        <SectionHead s={s} locale={locale} />
        <CountryFinder
          countries={countries}
          label={t(f.label, locale)}
          placeholder={t(f.placeholder, locale)}
          quoteLabel={t(f.quoteLabel, locale)}
          quoteHref={f.quoteHref}
          guideLabel={t(f.guideLabel, locale)}
          emptyText={t(f.emptyText, locale)}
          otherTitle={t(f.otherTitle, locale)}
          otherLede={t(f.otherLede, locale)}
          ctaPrefix={`${page}_country`}
        />
        <SectionAddons s={s} locale={locale} />
      </div>
    </section>
  );
}
