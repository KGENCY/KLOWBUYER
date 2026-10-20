/**
 * Products on the brand pages (/brands/[slug] and /brands/[slug]/wholesale).
 * Prices are `null` until confirmed — pages show "$[__]" and skip the margin %.
 * Margin % is never stored: pages compute it as (msrp − samplePrice) / msrp.
 *
 * Partner brand line-ups, photos and prices are the real ones from klow.kr (content/klowCatalog.ts).
 */
import type { MediaImage } from "@/types/content";
import { KLOW_BRANDS, KLOW_PRODUCTS } from "./klowCatalog";

export interface CatalogProduct {
  id: string;
  brandSlug: string;
  name: string;
  volume: string;
  heroIngredient: string;
  category: string;
  /** 1-unit sample price (partner brands only; major brands aren't sampled). */
  samplePrice: number | null;
  msrp: number | null;
  /** Unit price at MOQ — shown to signed-in buyers only. */
  moqPrice: number | null;
  moq: number | null;
  inStock: boolean;
  images: MediaImage[];
  /** Wholesale unit price by minimum quantity; the first row is the 1-unit sample. */
  tiers?: { min: number; unit: number | null }[];
  about?: string | null;
  keyActives?: string[];
  /** Skin type / use, e.g. "Dehydrated skin, all skin types". */
  forText?: string | null;
  madeIn?: string | null;
  /** Full INCI list. */
  ingredients?: string | null;
}

const bottle = (alt: string): MediaImage[] => [{ alt: { en: alt }, fallback: "product-bottle" }];

const item = (
  id: string,
  brandSlug: string,
  brandName: string,
  name: string,
  volume: string,
  heroIngredient: string,
  category = "Skincare",
): CatalogProduct => ({
  id, brandSlug, name, volume, heroIngredient, category,
  samplePrice: null, msrp: null, moqPrice: null, moq: null,
  inStock: true,
  images: bottle(`${brandName} ${name} ${volume}, K-beauty wholesale from Korea`),
});

export const PRODUCTS: CatalogProduct[] = [
  /* Major: Anua */
  item("anua-heartleaf-toner", "anua", "Anua", "Heartleaf 77% Soothing Toner", "250 ml", "Heartleaf"),
  item("anua-cleansing-oil", "anua", "Anua", "Heartleaf Pore Control Cleansing Oil", "200 ml", "Heartleaf", "Cleansing"),
  item("anua-peach-serum", "anua", "Anua", "Peach 70% Niacinamide Serum", "30 ml", "Niacinamide"),
  item("anua-cleansing-foam", "anua", "Anua", "Heartleaf Quercetinol Pore Deep Cleansing Foam", "150 ml", "Heartleaf", "Cleansing"),

  /* Major: COSRX */
  item("cosrx-snail-essence", "cosrx", "COSRX", "Advanced Snail 96 Mucin Power Essence", "100 ml", "Snail mucin"),
  item("cosrx-gel-cleanser", "cosrx", "COSRX", "Low pH Good Morning Gel Cleanser", "150 ml", "BHA", "Cleansing"),
  item("cosrx-retinol-cream", "cosrx", "COSRX", "The Retinol 0.1 Cream", "20 ml", "Retinol"),
  item("cosrx-snail-cream", "cosrx", "COSRX", "Advanced Snail 92 All in One Cream", "100 g", "Snail mucin"),

  /* Major: Beauty of Joseon */
  item("boj-relief-sun", "beauty-of-joseon", "Beauty of Joseon", "Relief Sun: Rice + Probiotics SPF50+ PA++++", "50 ml", "Rice", "Sun Care"),
  item("boj-glow-serum", "beauty-of-joseon", "Beauty of Joseon", "Glow Serum: Propolis + Niacinamide", "30 ml", "Propolis"),
  item("boj-dynasty-cream", "beauty-of-joseon", "Beauty of Joseon", "Dynasty Cream", "50 ml", "Rice"),
  item("boj-ginseng-cleansing-oil", "beauty-of-joseon", "Beauty of Joseon", "Ginseng Cleansing Oil", "210 ml", "Ginseng", "Cleansing"),

  /* Major: Torriden */
  item("torriden-divein-serum", "torriden", "Torriden", "DIVE-IN Low Molecular Hyaluronic Acid Serum", "50 ml", "Hyaluronic acid"),
  item("torriden-divein-toner", "torriden", "Torriden", "DIVE-IN Low Molecular Hyaluronic Acid Toner", "300 ml", "Hyaluronic acid"),
  item("torriden-divein-cream", "torriden", "Torriden", "DIVE-IN Low Molecular Hyaluronic Acid Soothing Cream", "100 ml", "Hyaluronic acid"),
  item("torriden-divein-sun", "torriden", "Torriden", "DIVE-IN Watery Moisture Sun Cream SPF50+ PA++++", "60 ml", "Hyaluronic acid", "Sun Care"),


  /* Partner brands — real line-ups from klow.kr */
  ...KLOW_PRODUCTS.map((k): CatalogProduct => {
    const brandName = KLOW_BRANDS.find((b) => b.slug === k.brandSlug)?.name ?? k.brandSlug;
    return {
      id: k.id,
      brandSlug: k.brandSlug,
      name: k.name,
      volume: k.volume,
      heroIngredient: k.heroIngredient,
      category: k.category,
      samplePrice: k.samplePrice,
      msrp: k.msrp,
      moqPrice: k.moqPrice,
      moq: k.moq,
      inStock: true,
      images: k.images.length
        ? k.images.map((src, i) => ({ src, alt: { en: `${brandName} ${k.name}${i ? ` — photo ${i + 1}` : ""}, K-beauty wholesale from Korea` }, fallback: "product-bottle" as const }))
        : bottle(`${brandName} ${k.name}, K-beauty wholesale from Korea`),
      tiers: k.tiers,
      about: k.about,
      keyActives: k.keyActives,
      forText: k.forText,
      madeIn: k.madeIn,
      ingredients: k.ingredients,
    };
  }),
];

export const catalogProduct = (id: string) => PRODUCTS.find((p) => p.id === id);
export const productsOfBrand = (slug: string) => PRODUCTS.filter((p) => p.brandSlug === slug);

/** Buyer margin at MSRP vs the sample price, or null while either price is unknown. */
export const marginPct = (p: Pick<CatalogProduct, "msrp" | "samplePrice">) =>
  p.msrp && p.samplePrice != null ? Math.round(((p.msrp - p.samplePrice) / p.msrp) * 100) : null;
