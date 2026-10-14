import { t } from "@/content/i18n";
import { brandHref, brandProfile } from "@/content/brands";
import type { CatalogProduct } from "@/content/products";
import { priceText } from "@/components/brand/format";
import type { PickCard } from "./ProductPicks";

/** Shape catalog products for <ProductPicks> (server side). */
export const pickCards = (products: CatalogProduct[]): PickCard[] =>
  products.flatMap((p) => {
    const b = brandProfile(p.brandSlug);
    if (!b) return [];
    return [{
      id: p.id,
      name: p.name,
      brandName: b.name,
      brandHref: brandHref(b),
      sampleable: b.flags.sampleFromOne,
      onlyOnKlow: b.flags.onlyOnKlow,
      volume: p.volume,
      heroIngredient: p.heroIngredient,
      image: { src: p.images[0]?.src, alt: p.images[0] ? t(p.images[0].alt) : `${b.name} ${p.name}`, fallback: p.images[0]?.fallback ?? "product-bottle" },
      sample: priceText(p.samplePrice),
      msrp: priceText(p.msrp),
      moq: priceText(p.moqPrice),
      moqUnits: p.moq != null ? String(p.moq) : "[__]",
    }];
  });
