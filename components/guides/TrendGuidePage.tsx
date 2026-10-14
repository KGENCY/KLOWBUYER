import Link from "next/link";
import { t } from "@/content/i18n";
import { ingredientGuides, monthLabel, trendGuides, type TrendGuide } from "@/content/guides";
import { catalogProduct } from "@/content/products";
import { brandHref, brandProfile } from "@/content/brands";
import MediaFrame from "@/components/media/MediaFrame";
import SampleToggle from "./SampleToggle";
import ArticleLayout from "./ArticleLayout";
import GuideJsonLd from "./GuideJsonLd";
import ProductPicks from "./ProductPicks";
import { pickCards } from "./pickCards";
import { relatedGuides } from "./related";
import { dateLabel, guideProducts, readMinutes } from "./match";

/** /guides/trends/[YYYY-MM] — the month in Korea, ending in the products we carry from it. */
export default function TrendGuidePage({ guide }: { guide: TrendGuide }) {
  const month = monthLabel(guide.month);
  const p = `guide_trend_${guide.month.replace(/-/g, "_")}`;
  const available = pickCards(guideProducts(guide));
  const ingredientLinks = new Map(ingredientGuides().map((g) => [g.ingredient.toLowerCase(), `/guides/ingredients/${g.slug}`]));
  const past = trendGuides().filter((g) => g.month !== guide.month).slice(0, 3);
  const crumbs = [
    { label: "Guides", href: "/guides" },
    { label: "Trend reports", href: "/guides#trends" },
    { label: month, href: `/guides/trends/${guide.month}` },
  ];
  const toc = [
    { id: "lines", label: "This month in 3 lines" },
    { id: "rising", label: "What’s rising in Korea" },
    { id: "ingredients", label: "Ingredients to watch" },
    { id: "takeaways", label: "What it means for buyers" },
    ...(available.length ? [{ id: "available", label: "Available on KLOW" }] : []),
  ];

  return (
    <>
      <GuideJsonLd guide={guide} headline={`What’s selling in Korea — ${month}`} crumbs={crumbs} />
      <ArticleLayout
        crumbs={crumbs}
        label={`Korea Trend Report · ${month}`}
        title={`What’s selling in Korea — ${month}`}
        summary={t(guide.summary)}
        meta={`Updated ${dateLabel(guide.updatedAt)} · ${readMinutes(guide)} min read`}
        toc={toc}
        cta={{ title: "Seen something you want?", text: "Partner-brand products from this report sample from 1 unit at wholesale price.", label: "Sample this month’s trends", href: "#available", ctaId: `${p}_sidebar_sample` }}
        related={relatedGuides(guide)}
        ctaPrefix={p}
        newsletterCtaId={`${p}_newsletter`}
      >
        <section id="lines" className="gsec">
          <h2>This month in 3 lines</h2>
          <ol className="glines">{guide.highlights.map((h, i) => <li key={i}>{t(h)}</li>)}</ol>
        </section>

        <section id="rising" className="gsec">
          <h2>What’s rising in Korea</h2>
          <ol className="grank">
            {guide.rankings.map((r) => {
              const product = r.productId ? catalogProduct(r.productId) : undefined;
              const brand = product && brandProfile(product.brandSlug);
              const id = product?.id.replace(/-/g, "_");
              return (
                <li key={r.rank} className={product ? "has-product" : ""}>
                  <span className="grank__n">{String(r.rank).padStart(2, "0")}</span>
                  <div>
                    <h3>{t(r.name)}</h3>
                    <p>{t(r.note)}</p>
                    {product && brand && (
                      <div className="grank__act">
                        <span className="grank__badge">Available on KLOW</span>
                        {brand.flags.sampleFromOne ? (
                          <SampleToggle id={product.id} ctaId={`${p}_rising_${id}_sample`} />
                        ) : (
                          <Link href={`${brandHref(brand)}#quote`} className="link small" data-cta-id={`${p}_rising_${id}_quote`}>Wholesale quote →</Link>
                        )}
                      </div>
                    )}
                  </div>
                  {product && (
                    <MediaFrame src={product.images[0]?.src} alt={product.images[0] ? t(product.images[0].alt) : t(r.name)} fallback={product.images[0]?.fallback ?? "product-bottle"} ratio="1 / 1" className="grank__img" />
                  )}
                </li>
              );
            })}
          </ol>
        </section>

        <section id="ingredients" className="gsec">
          <h2>Ingredients to watch</h2>
          <ul className="gingr">
            {guide.ingredientsToWatch.map((i) => {
              const href = ingredientLinks.get(i.name.toLowerCase());
              return (
                <li key={i.name}>
                  {href ? <Link href={href} className="gingr__chip" data-cta-id={`${p}_ingredient_${i.name.toLowerCase()}`}>{i.name} →</Link> : <span className="gingr__chip">{i.name}</span>}
                  <p>{t(i.note)}</p>
                </li>
              );
            })}
          </ul>
        </section>

        <section id="takeaways" className="gsec">
          <h2>What it means for buyers</h2>
          <ul className="gtake">{guide.buyerTakeaways.map((x, i) => <li key={i}>{t(x)}</li>)}</ul>
        </section>

        {!!available.length && (
          <section id="available" className="gsec gsec--wide">
            <h2>Available on KLOW</h2>
            <p>Products from this month’s categories and ingredients that we carry. Partner brands sample from 1 unit.</p>
            <ProductPicks products={available} ctaPrefix={`${p}_available`} />
          </section>
        )}

        {!!past.length && (
          <section className="gsec">
            <h2>Past reports</h2>
            <ul className="glist">
              {past.map((g) => <li key={g.month}><Link href={`/guides/trends/${g.month}`} className="link" data-cta-id={`${p}_past_${g.month.replace("-", "_")}`}>{monthLabel(g.month)}</Link></li>)}
            </ul>
          </section>
        )}
      </ArticleLayout>
    </>
  );
}
