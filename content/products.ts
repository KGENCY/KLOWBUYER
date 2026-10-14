/**
 * Products on the brand pages (/brands/[slug] and /brands/[slug]/wholesale).
 * Prices are `null` until confirmed — pages show "$[__]" and skip the margin %.
 * Margin % is never stored: pages compute it as (msrp − samplePrice) / msrp.
 *
 * Product names for partner brands are sample data until the real line-ups are in.
 */
import type { MediaImage } from "@/types/content";

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

  /* Partner: AIRMOOD */
  item("airmood-heartleaf-toner", "airmood", "AIRMOOD", "Heartleaf Calming Toner", "200 ml", "Heartleaf"),
  item("airmood-cica-cream", "airmood", "AIRMOOD", "Cica Barrier Cream", "50 ml", "Centella"),
  item("airmood-cleansing-oil", "airmood", "AIRMOOD", "Heartleaf Mild Cleansing Oil", "200 ml", "Heartleaf", "Cleansing"),
  item("airmood-sun-fluid", "airmood", "AIRMOOD", "Soothing Sun Fluid SPF50+", "50 ml", "Centella", "Sun Care"),

  /* Partner: INYOE */
  item("inyoe-snail-essence", "inyoe", "INYOE", "Snail Repair Essence", "120 ml", "Snail mucin"),
  item("inyoe-niacinamide-serum", "inyoe", "INYOE", "Niacinamide Glow Serum", "30 ml", "Niacinamide"),
  item("inyoe-gel-cleanser", "inyoe", "INYOE", "Low pH Gel Cleanser", "150 ml", "BHA", "Cleansing"),

  /* Partner: [PARTNER 03] */
  item("partner-03-retinal-serum", "partner-03", "[PARTNER 03]", "Retinal Night Serum", "30 ml", "Retinal"),
  item("partner-03-peptide-cream", "partner-03", "[PARTNER 03]", "Peptide Firming Cream", "50 ml", "Peptides"),
  item("partner-03-pdrn-ampoule", "partner-03", "[PARTNER 03]", "PDRN Recovery Ampoule", "30 ml", "PDRN"),
];

export const catalogProduct = (id: string) => PRODUCTS.find((p) => p.id === id);
export const productsOfBrand = (slug: string) => PRODUCTS.filter((p) => p.brandSlug === slug);

/** Buyer margin at MSRP vs the sample price, or null while either price is unknown. */
export const marginPct = (p: Pick<CatalogProduct, "msrp" | "samplePrice">) =>
  p.msrp && p.samplePrice != null ? Math.round(((p.msrp - p.samplePrice) / p.msrp) * 100) : null;
