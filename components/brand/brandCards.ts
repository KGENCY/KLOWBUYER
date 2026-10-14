import { t } from "@/content/i18n";
import { allBrands, brandHref, type BrandProfile } from "@/content/brands";
import { CATEGORY_ORDER } from "@/content/brandsPage";
import type { IllustrationName } from "@/types/content";
import { lowestSample, productsFor } from "./format";

/** Plain, serializable brand data for the /brands list (worked out on the server). */
export type BrandCardData = {
  slug: string;
  type: "major" | "partner";
  name: string;
  tagline: string;
  href: string;
  image: { src?: string; alt: string; fallback: IllustrationName };
  ingredients: string[];
  /** Category slugs, e.g. "sun-care". */
  categories: string[];
  onlyOnKlow: boolean;
  exclusiveOpen: boolean;
  sampleFrom: string;
  productCount: number;
  /** A–Z index letter, or "#" for names that don't start with a letter. */
  letter: string;
};

export const categorySlug = (label: string) => label.toLowerCase().replace(/\s+/g, "-");
/** "Sun Care" → "Sun care" for chips. */
export const categoryLabel = (label: string) => label.charAt(0) + label.slice(1).toLowerCase();

/** A brand's categories: its own plus those of its products. */
const categoriesOf = (b: BrandProfile) => Array.from(new Set([...b.category, ...productsFor(b).map((p) => p.category)]));

export function brandCards(): BrandCardData[] {
  return allBrands().map((b) => {
    const first = b.name.trim().charAt(0).toUpperCase();
    return {
      slug: b.slug,
      type: b.type,
      name: b.name,
      tagline: t(b.tagline),
      href: brandHref(b),
      image: b.images[0]
        ? { src: b.images[0].src, alt: t(b.images[0].alt), fallback: b.images[0].fallback }
        : { alt: `${b.name} K-beauty products, wholesale from Korea`, fallback: b.type === "major" ? "product-bottle" : "brand-placeholder" },
      ingredients: b.heroIngredients.slice(0, 2),
      categories: categoriesOf(b).map(categorySlug),
      onlyOnKlow: b.flags.onlyOnKlow,
      exclusiveOpen: b.flags.exclusiveOpen,
      sampleFrom: b.flags.sampleFromOne ? lowestSample(b) : "",
      productCount: productsFor(b).length,
      letter: /[A-Z]/.test(first) ? first : "#",
    };
  });
}

/** Category chips present in the data, in CATEGORY_ORDER first. */
export function categoryChips(): { slug: string; label: string }[] {
  const present = Array.from(new Set(allBrands().flatMap(categoriesOf)));
  const ordered = [...CATEGORY_ORDER.filter((c) => present.includes(c)), ...present.filter((c) => !CATEGORY_ORDER.includes(c)).sort()];
  return ordered.map((c) => ({ slug: categorySlug(c), label: categoryLabel(c) }));
}

/** Most common hero ingredients across brands, top `limit`. */
export function ingredientChips(limit = 8): string[] {
  const count = new Map<string, number>();
  for (const b of allBrands()) for (const i of b.heroIngredients) count.set(i, (count.get(i) ?? 0) + 1);
  return Array.from(count.entries()).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, limit).map(([i]) => i);
}
