import type { Metadata } from "next";
import Link from "next/link";
import { t } from "@/content/i18n";
import { importGuides, ingredientGuides, latestTrend, monthLabel, trendGuides } from "@/content/guides";
import { DIFFICULTY_TEXT } from "@/content/shippingCountries";
import SectionHeader from "@/components/section/SectionHeader";
import ContextCTA from "@/components/conversion/ContextCTA";
import { PARTNER_SAMPLE_PRICE } from "@/content/products";
import NewsletterBlock from "@/components/guides/NewsletterBlock";
import { brandsForCountry, brandsForIngredient } from "@/components/guides/match";

export const metadata: Metadata = {
  title: "K-Beauty Import Guides, Trend Reports & Ingredient Guides | KLOW",
  description: "Country import guides for Korean cosmetics, the monthly Korea K-beauty trend report, and ingredient guides for wholesale buyers.",
  alternates: { canonical: "/guides" },
};

const firstSentence = (s: string) => s.split(/(?<=\.)\s/)[0];

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

/** Guides hub: import guides, trend reports and ingredient guides, each card ending in a read link. */
export default function GuidesHub() {
  const imports = importGuides();
  const latest = latestTrend();
  const past = trendGuides().slice(1, 6);
  const ingredients = ingredientGuides();

  return (
    <div className="about">
      <section className="about-hero">
        <div className="wrap about-hero__grid about-hero__grid--solo">
          <div>
            <span className="eyebrow eyebrow--accent about-hero__label">Guides</span>
            <h1 className="hero__title">Everything you need to import K-beauty.</h1>
            <p className="hero__lede">Country import guides, monthly Korea trend reports, and ingredient guides for buyers.</p>
          </div>
        </div>
      </section>

      {!!imports.length && (
        <section id="import" className="section about-sec">
          <div className="wrap">
            <SectionHeader number="01" label="Import guides" title="Import guides by country." />
            <ul className="ghub">
              {imports.map((g) => (
                <li key={g.slug}>
                  <Link href={`/guides/import/${g.slug}`} data-cta-id={`guides_hub_import_${g.slug.replace(/-/g, "_")}`}>
                    <span className="ghub__top">
                      <span className="ghub__name">{t(g.country)}</span>
                      <span className={`finder__level finder__level--${g.difficulty}`}>{t(DIFFICULTY_TEXT[g.difficulty])}</span>
                    </span>
                    <span className="ghub__line">Labels: {t(g.labelLanguage)}</span>
                    <span className="ghub__line">Ready brands: {brandsForCountry(g.countryCode).length}</span>
                    <span className="ghub__go">Read guide →</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {latest && (
        <section id="trends" className="section about-sec">
          <div className="wrap">
            <SectionHeader number="02" label="Trend reports" title="The Korea Trend Report." description="What’s selling in Korea each month — and what it means for buyers abroad." />
            <div className={past.length ? "gtrend" : ""}>
              <Link href={`/guides/trends/${latest.month}`} className="gtrend__latest" data-cta-id="guides_hub_trend_latest">
                <span className="eyebrow eyebrow--accent">Latest · {monthLabel(latest.month)}</span>
                <span className="gtrend__title">What’s selling in Korea — {monthLabel(latest.month)}</span>
                <ol className="glines glines--sm">{latest.highlights.map((h, i) => <li key={i}>{t(h)}</li>)}</ol>
                <span className="ghub__go">Read report →</span>
              </Link>
              {!!past.length && (
                <ul className="gtrend__past">
                  {past.map((g) => (
                    <li key={g.month}><Link href={`/guides/trends/${g.month}`} data-cta-id={`guides_hub_trend_${g.month.replace("-", "_")}`}>{monthLabel(g.month)} →</Link></li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      )}

      {!!ingredients.length && (
        <section id="ingredients" className="section about-sec">
          <div className="wrap">
            <SectionHeader number="03" label="Ingredients & categories" title="Ingredient guides for buyers." />
            <ul className="ghub">
              {ingredients.map((g) => (
                <li key={g.slug}>
                  <Link href={`/guides/ingredients/${g.slug}`} data-cta-id={`guides_hub_ingredient_${g.slug.replace(/-/g, "_")}`}>
                    <span className="ghub__name">{g.ingredient}</span>
                    <span className="ghub__line ghub__line--text">{firstSentence(t(g.whatItIs))}</span>
                    <span className="ghub__line">{plural(brandsForIngredient(g.ingredient).length, "brand")}</span>
                    <span className="ghub__go">Read guide →</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="section about-sec">
        <div className="wrap"><NewsletterBlock ctaId="guides_hub_newsletter" /></div>
      </section>

      <section className="about-final brands-bottom">
        <div className="wrap">
          <ContextCTA id="guides_hub_bottom" variant="sample" text={`Read enough? Sample partner brands at $${PARTNER_SAMPLE_PRICE} a unit, no MOQ.`} />
        </div>
      </section>
    </div>
  );
}
