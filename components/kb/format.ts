import type { CatalogProduct } from "@/content/products";

/** "$11.50" — klow.kr prints the currency; lib/data money() does not. */
export const usd = (n: number | null | undefined) => (n == null || !Number.isFinite(n) ? "$[__]" : `$${n.toFixed(2)}`);

/** % below retail at the 1-unit sample price, or null while either price is unknown. */
export const offPct = (p: Pick<CatalogProduct, "msrp" | "samplePrice">) =>
  p.msrp && p.samplePrice != null ? Math.round((1 - p.samplePrice / p.msrp) * 100) : null;
