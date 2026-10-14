import { COUNTRIES } from "@/lib/buyer";
import { COUNTRY_GROUPS } from "@/components/conversion/options";
import { money } from "@/lib/data";
import { t } from "@/content/i18n";
import { catalogProduct, type CatalogProduct } from "@/content/products";
import type { BrandProfile } from "@/content/brands";

/** "$12.40", or "$[__]" while the price isn't set. */
export const priceText = (n: number | null) => (n == null ? "$[__]" : money(n));

const NAMES = new Map<string, string>([
  ...COUNTRIES.map((c) => [c.code, c.name] as const),
  ...COUNTRY_GROUPS.flatMap((g) => g.options.map((o) => [o.code, o.name] as const)),
]);
export const countryLabel = (code: string) => NAMES.get(code) ?? code;

export const productsFor = (b: BrandProfile): CatalogProduct[] =>
  b.productIds.map(catalogProduct).filter((p): p is CatalogProduct => !!p);

/** Lowest known sample price of a brand, for "Sample from $X". */
export const lowestSample = (b: BrandProfile) => {
  const known = productsFor(b).map((p) => p.samplePrice).filter((n): n is number => n != null);
  return known.length ? money(Math.min(...known)) : "$[__]";
};

/** Smallest known MOQ across the brand's products. */
export const lowestMoq = (b: BrandProfile) => {
  const known = productsFor(b).map((p) => p.moq).filter((n): n is number => n != null);
  return known.length ? String(Math.min(...known)) : "[__]";
};

/** data-cta-id prefix for a section: brand_[slug]_[section] */
export const brandPrefix = (slug: string, section: string) => `brand_${slug.replace(/-/g, "_")}_${section}`;

/** data-cta-id: brand_[slug]_[section]_[action] */
export const brandCta = (slug: string, section: string, action: string) =>
  `${brandPrefix(slug, section)}_${action.replace(/-/g, "_")}`;

export const tagline = (b: BrandProfile) => t(b.tagline);
