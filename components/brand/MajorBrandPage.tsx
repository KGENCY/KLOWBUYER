import Link from "next/link";
import { t } from "@/content/i18n";
import { similarPartners, type BrandProfile } from "@/content/brands";
import { marginPct } from "@/content/products";
import { shippingCountries } from "@/content/shippingCountries";
import SectionHeader from "@/components/section/SectionHeader";
import InfoTable from "@/components/section/InfoTable";
import ContextCTA from "@/components/conversion/ContextCTA";
import MajorOrder from "./MajorOrder";
import SimilarBrands, { type SimilarCard } from "./SimilarBrands";
import BrandFaq from "./BrandFaq";
import BrandJsonLd from "./BrandJsonLd";
import { brandCta, brandPrefix, countryLabel, lowestMoq, priceText, productsFor } from "./format";

/** Partner cards for a major brand, with the comparison worked out from the data. */
function similarCards(major: BrandProfile): SimilarCard[] {
  const majorProducts = productsFor(major);
  return similarPartners(major).map((p) => {
    const products = productsFor(p);
    const shared = p.heroIngredients.find((i) => major.heroIngredients.includes(i));
    // Show the partner product that shares the ingredient, so the comparison lines up.
    const hero = products.find((x) => shared && x.heroIngredient === shared) ?? products[0];
    const twin = majorProducts.find((mp) => shared && mp.heroIngredient === shared) ?? majorProducts[0];
    const margin = hero ? marginPct(hero) : null;
    return {
      slug: p.slug,
      name: p.name,
      image: { src: p.images[0]?.src, alt: t(p.images[0]?.alt) || `${p.name} K-beauty products`, fallback: p.images[0]?.fallback === "product-bottle" ? "product-bottle" : "brand-placeholder" },
      onlyOnKlow: p.flags.onlyOnKlow,
      similarTo: twin ? `Similar to ${major.name}’s ${twin.name}` : `Similar to ${major.name}`,
      badges: [
        ...(shared ? [`Same ${shared.toLowerCase()} line`] : []),
        `Margin ${margin ?? "[__]"}%`,
        ...(p.flags.exclusiveOpen ? ["Exclusive open"] : []),
        "Sample from 1 unit",
      ],
      product: hero && { id: hero.id, name: hero.name, sample: priceText(hero.samplePrice), msrp: priceText(hero.msrp) },
    };
  });
}

/**
 * /brands/[slug]/wholesale for a well-known brand sold at MOQ (no single-unit samples).
 * Order: bestsellers → quote → where it sells → similar partner brands (which DO sample from 1 unit) → why KLOW → FAQ.
 * Sections without data are left out.
 */
export default function MajorBrandPage({ brand }: { brand: BrandProfile }) {
  const products = productsFor(brand);
  const cards = similarCards(brand);
  const ready = brand.buyerInfo.readyMarkets;
  const focus = shippingCountries().filter((c) => c.code !== "OTHER" && !ready.includes(c.code));
  const markets = [
    ...ready.map((code) => ({ code, status: "Ready" })),
    ...focus.map((c) => ({ code: c.code, status: c.labelSupport === "supported" ? "Label support" : "Contact us" })),
  ];
  const label = brand.flags.official ? "Authorized wholesale" : "Brand wholesale";

  return (
    <div className="about brand-page">
      <BrandJsonLd brand={brand} />

      {/* Hero */}
      <section className="about-hero">
        <div className="wrap about-hero__grid">
          <div>
            <span className="eyebrow eyebrow--accent about-hero__label">{label}</span>
            <h1 className="hero__title">{brand.name} wholesale, shipped from Korea.</h1>
            <p className="hero__lede">{t(brand.tagline)}</p>
            <div className="hero__cta">
              <a href="#quote" className="btn btn--solid" data-cta-id={brandCta(brand.slug, "hero", "quote")}>Request bulk quote</a>
              {!!cards.length && (
                <a href="#similar" className="link small" data-cta-id={brandCta(brand.slug, "hero", "similar")}>
                  Want to test first? Sample similar brands from 1 unit
                </a>
              )}
            </div>
          </div>
          <div className="brand-facts">
            <span className="brand-facts__mark" aria-hidden>{brand.name}</span>
            <InfoTable rows={[
              { key: "moq", label: "Minimum order", value: `MOQ ${lowestMoq(brand)} units per SKU` },
              { key: "samples", label: "Samples", value: "Not available — sold at MOQ" },
              { key: "price", label: "Wholesale price", value: "Sign in to see" },
              { key: "ships", label: "Ships to", value: "[N] countries" },
              ...(brand.dispatchDays ? [{ key: "dispatch", label: "Dispatch", value: `${brand.dispatchDays} business days` }] : []),
            ]} />
          </div>
        </div>
      </section>

      {!!products.length && <MajorOrder slug={brand.slug} brandName={brand.name} products={products} />}

      {/* Where you can sell it */}
      {!!markets.length && (
        <section id="markets" className="section about-sec">
          <div className="wrap">
            <SectionHeader number="03" label="Where you can sell it" title={`${brand.name} markets.`} description="Ready = registrations in place to sell now. Label support = we prepare local-language labels; registration may be needed." />
            <div className="about-table-wrap" tabIndex={0} role="region" aria-label={`${brand.name} markets`}>
              <table className="about-table">
                <thead><tr><th scope="col">Country</th><th scope="col">Status</th></tr></thead>
                <tbody>
                  {markets.map((m) => (
                    <tr key={m.code}>
                      <th scope="row">{countryLabel(m.code)}</th>
                      <td><span className={`mstatus mstatus--${m.status.replace(/\s+/g, "-").toLowerCase()}`}>{m.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="about-links">
              <Link href="/shipping" className="link small" data-cta-id={brandCta(brand.slug, "markets", "shipping")}>See shipping options →</Link>
            </div>
          </div>
        </section>
      )}

      {/* Similar partner brands */}
      {!!cards.length && (
        <section id="similar" className="section about-sec sim-section">
          <div className="wrap">
            <SectionHeader
              number="04"
              label="Similar Korean brands"
              title={`If you stock ${brand.name}, buyers also sample these`}
              description="Under-the-radar Korean brands with similar formulas — sample from 1 unit, often with better margins and exclusive territories."
            />
            <SimilarBrands cards={cards} ctaPrefix={brandPrefix(brand.slug, "similar")} />
          </div>
        </section>
      )}

      {/* Why KLOW */}
      <section className="section about-sec">
        <div className="wrap">
          <SectionHeader number="05" label="Why KLOW" title={`Why buy ${brand.name} through KLOW`} />
          <ol className="about-cards about-cards--3">
            <li><span className="about-cards__n">01</span><h3>Authentic &amp; inspected</h3><p>Genuine stock, checked for expiry and packaging in our Korean warehouse before export. Proof of supply on request.</p></li>
            <li><span className="about-cards__n">02</span><h3>Clear MOQ pricing</h3><p>Sign in to see {brand.name} prices at MOQ and the volume tiers below them. Quotes within 24 hours.</p></li>
            <li><span className="about-cards__n">03</span><h3>Export documents &amp; local labels</h3><p>Commercial invoice, packing list and C/O with every order; Spanish, Russian and Arabic labels where needed.</p></li>
          </ol>
        </div>
      </section>

      {!!brand.faq.length && (
        <section id="faq" className="section about-sec">
          <div className="wrap about-split">
            <BrandFaq brand={brand} title={`${brand.name} wholesale questions.`} ctaPrefix={brandPrefix(brand.slug, "faq")} />
          </div>
        </section>
      )}

      <section className="about-final">
        <div className="wrap">
          <ContextCTA
            id={brandPrefix(brand.slug, "final")}
            variant="signup"
            tone="dark"
            text={`Create a buyer account to see ${brand.name} bulk pricing.`}
            secondary="quote"
            secondaryHref="#quote"
          />
        </div>
      </section>
    </div>
  );
}
