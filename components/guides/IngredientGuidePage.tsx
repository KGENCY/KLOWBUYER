import Link from "next/link";
import { t } from "@/content/i18n";
import type { IngredientGuide } from "@/content/guides";
import { brandHref } from "@/content/brands";
import { marginPct, PRODUCTS } from "@/content/products";
import MediaFrame from "@/components/media/MediaFrame";
import ContextCTA from "@/components/conversion/ContextCTA";
import { priceText } from "@/components/brand/format";
import ArticleLayout from "./ArticleLayout";
import GuideJsonLd from "./GuideJsonLd";
import ProductPicks from "./ProductPicks";
import LockedCell from "./LockedCell";
import { pickCards } from "./pickCards";
import { relatedGuides } from "./related";
import { dateLabel, guideBrands, readMinutes } from "./match";

const same = (a: string, b: string) => a.toLowerCase() === b.toLowerCase();

/** /guides/ingredients/[slug] — what it is, who sells it, and partner brands with the same ingredient. */
export default function IngredientGuidePage({ guide }: { guide: IngredientGuide }) {
  const ing = guide.ingredient;
  const p = `guide_ingredient_${guide.slug.replace(/-/g, "_")}`;
  const brands = guideBrands(guide);
  const majors = brands.filter((b) => b.type === "major");
  const partners = brands.filter((b) => b.type === "partner");
  const heroOf = (slug: string) => PRODUCTS.find((x) => x.brandSlug === slug && same(x.heroIngredient, ing)) ?? PRODUCTS.find((x) => x.brandSlug === slug);
  const popular = pickCards(majors.flatMap((b) => PRODUCTS.filter((x) => x.brandSlug === b.slug && same(x.heroIngredient, ing))));
  const crumbs = [
    { label: "Guides", href: "/guides" },
    { label: "Ingredients & categories", href: "/guides#ingredients" },
    { label: ing, href: `/guides/ingredients/${guide.slug}` },
  ];
  const toc = [
    { id: "what", label: "What it is" },
    { id: "why", label: "Why buyers stock it" },
    ...(popular.length ? [{ id: "popular", label: "Popular products" }] : []),
    ...(partners.length ? [{ id: "discover", label: `New brands with ${ing}` }] : []),
    ...(brands.length ? [{ id: "compare", label: "Compare" }] : []),
    ...(guide.faq.length ? [{ id: "faq", label: "FAQ" }] : []),
  ];

  return (
    <>
      <GuideJsonLd guide={guide} headline={t(guide.title)} crumbs={crumbs} />
      <ArticleLayout
        crumbs={crumbs}
        label={`Ingredient guide${guide.aliases.length ? ` · ${guide.aliases.join(" · ")}` : ""}`}
        title={t(guide.title)}
        summary={t(guide.summary)}
        meta={`Updated ${dateLabel(guide.updatedAt)} · ${readMinutes(guide)} min read`}
        toc={toc}
        cta={{ title: `${ing} prices`, text: `Sign in to see MOQ prices for every ${ing} product in one table.`, label: `Compare ${ing} prices`, href: `/signup?next=/guides/ingredients/${guide.slug}`, ctaId: `${p}_sidebar_signup` }}
        related={relatedGuides(guide)}
        ctaPrefix={p}
        newsletterCtaId={`${p}_newsletter`}
      >
        <section id="what" className="gsec">
          <h2>What it is</h2>
          <p>{t(guide.whatItIs)}</p>
        </section>
        <section id="why" className="gsec">
          <h2>Why buyers stock it</h2>
          <p>{t(guide.whyBuyersStock)}</p>
        </section>

        {!!popular.length && (
          <section id="popular" className="gsec gsec--wide">
            <h2>Popular products</h2>
            <p>Bestselling {ing} products from well-known Korean brands, sold at MOQ.</p>
            <ProductPicks products={popular} ctaPrefix={`${p}_popular`} />
          </section>
        )}

        {!!partners.length && (
          <section id="discover" className="gsec gsec--wide gsec--tint">
            <h2>Discover new brands with {ing}</h2>
            <p>Same ingredient, smaller Korean brands — sample from 1 unit, often with better margins and exclusive territories.</p>
            <ul className="gbrands">
              {partners.map((b) => {
                const hero = heroOf(b.slug);
                return (
                  <li key={b.slug}>
                    <Link href={brandHref(b)} data-cta-id={`${p}_discover_${b.slug.replace(/-/g, "_")}`}>
                      <MediaFrame src={b.images[0]?.src} alt={b.images[0] ? t(b.images[0].alt) : b.name} fallback={b.images[0]?.fallback ?? "brand-placeholder"} ratio="4 / 3" />
                      <span className="gbrands__name">{b.name}{b.flags.onlyOnKlow && <em className="menu__badge">Only on KLOW</em>}</span>
                      {hero && <span className="gbrands__hero">{hero.name} · sample {priceText(hero.samplePrice)}</span>}
                      <span className="gbrands__go">View brand →</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {!!brands.length && (
          <section id="compare" className="gsec gsec--wide">
            <h2>Compare {ing} products</h2>
            <div className="about-table-wrap" tabIndex={0} role="region" aria-label={`Compare ${ing} products`}>
              <table className="about-table gcompare">
                <thead>
                  <tr><th scope="col">Brand</th><th scope="col">Hero product</th><th scope="col">Sample price</th><th scope="col">MSRP</th><th scope="col">Margin</th><th scope="col">MOQ price</th></tr>
                </thead>
                <tbody>
                  {brands.map((b) => {
                    const hero = heroOf(b.slug);
                    const m = hero ? marginPct(hero) : null;
                    return (
                      <tr key={b.slug}>
                        <th scope="row">
                          <Link href={brandHref(b)} className="gcompare__brand">{b.name}</Link>
                          {b.flags.onlyOnKlow && <em className="menu__badge">Only on KLOW</em>}
                        </th>
                        <td>{hero?.name ?? "—"}</td>
                        <td className="mono">{b.flags.sampleFromOne ? priceText(hero?.samplePrice ?? null) : "MOQ only"}</td>
                        <td className="mono">{priceText(hero?.msrp ?? null)}</td>
                        <td className="mono">{b.flags.sampleFromOne ? `${m ?? "[__]"}%` : "—"}</td>
                        <td><LockedCell value={priceText(hero?.moqPrice ?? null)} /></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="about-footnote">Margin = (MSRP − sample price) / MSRP. MOQ prices show to signed-in buyers.</p>
          </section>
        )}

        {!!guide.faq.length && (
          <section id="faq" className="gsec">
            <h2>FAQ</h2>
            <div className="about-faq">
              {guide.faq.map((f, i) => (
                <details key={i} open={i === 0}>
                  <summary><h3>{t(f.question)}</h3><i aria-hidden /></summary>
                  <div className="about-faq__a"><p>{t(f.answer)}</p></div>
                </details>
              ))}
            </div>
          </section>
        )}

        <div className="gsec">
          <ContextCTA id={p} variant="sample" text={`Sample ${ing} from 1 unit — partner brands.`} href={partners[0] ? brandHref(partners[0]) : "/#collection"} />
        </div>
      </ArticleLayout>
    </>
  );
}
