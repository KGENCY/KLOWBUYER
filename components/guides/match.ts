import { t } from "@/content/i18n";
import { allBrands, brandProfile, type BrandProfile } from "@/content/brands";
import { catalogProduct, PRODUCTS, type CatalogProduct } from "@/content/products";
import type { Guide } from "@/content/guides";

const same = (a: string, b: string) => a.toLowerCase() === b.toLowerCase();
const partnersFirst = (a: BrandProfile, b: BrandProfile) => (a.type === b.type ? 0 : a.type === "partner" ? -1 : 1);

/** Brands that can be sold in a country now (it's in their readyMarkets), partner brands first. */
export const brandsForCountry = (code: string) =>
  allBrands().filter((b) => b.buyerInfo.readyMarkets.includes(code)).sort(partnersFirst);

/** Brands built around an ingredient (in heroIngredients or a product's hero ingredient), partners first. */
export const brandsForIngredient = (ingredient: string) =>
  allBrands()
    .filter((b) => b.heroIngredients.some((i) => same(i, ingredient)) || PRODUCTS.some((p) => p.brandSlug === b.slug && same(p.heroIngredient, ingredient)))
    .sort(partnersFirst);

/**
 * Brands a guide features: the hand-picked relatedBrands when set,
 * otherwise matched by country (import), ingredient (ingredient) or ingredients to watch (trend).
 */
export function guideBrands(g: Guide): BrandProfile[] {
  if (g.relatedBrands.length) return g.relatedBrands.map(brandProfile).filter((b): b is BrandProfile => !!b);
  if (g.type === "import") return brandsForCountry(g.countryCode);
  if (g.type === "ingredient") return brandsForIngredient(g.ingredient);
  const seen = new Set<string>();
  return g.ingredientsToWatch.flatMap((i) => brandsForIngredient(i.name)).filter((b) => !seen.has(b.slug) && !!seen.add(b.slug)).sort(partnersFirst);
}

/**
 * Products a guide features: relatedProducts when set; otherwise products of the matched brands —
 * for ingredient and trend guides, only those whose hero ingredient matches. Partner products first.
 */
export function guideProducts(g: Guide, limit = 8): CatalogProduct[] {
  if (g.relatedProducts.length) return g.relatedProducts.map(catalogProduct).filter((p): p is CatalogProduct => !!p);
  const brands = guideBrands(g);
  const ingredients = g.type === "ingredient" ? [g.ingredient] : g.type === "trend" ? g.ingredientsToWatch.map((i) => i.name) : null;
  return brands
    .flatMap((b) => PRODUCTS.filter((p) => p.brandSlug === b.slug && (!ingredients || ingredients.some((i) => same(i, p.heroIngredient)))))
    .slice(0, limit);
}

/** Rough reading time from all the text in a guide (200 words a minute, at least 1). */
export function readMinutes(g: Guide): number {
  const parts: string[] = [t(g.title), t(g.summary), ...g.sections.flatMap((s) => [t(s.heading), t(s.body), ...(s.items ?? []).map((i) => t(i))]), ...g.faq.flatMap((f) => [t(f.question), t(f.answer)])];
  if (g.type === "trend") parts.push(...g.highlights.map((h) => t(h)), ...g.rankings.map((r) => `${t(r.name)} ${t(r.note)}`), ...g.buyerTakeaways.map((x) => t(x)));
  if (g.type === "ingredient") parts.push(t(g.whatItIs), t(g.whyBuyersStock));
  const words = parts.join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** "1 October 2026" */
export const dateLabel = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
