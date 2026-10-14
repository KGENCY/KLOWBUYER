import type { BrandProfile } from "@/content/brands";
import { productsFor } from "./format";

/**
 * Brand + its products as structured data. An offer is only included when its price is known:
 * the sample price for partner brands, the MOQ price for major brands (which aren't sampled).
 */
export default function BrandJsonLd({ brand }: { brand: BrandProfile }) {
  const graph = [
    { "@type": "Brand", name: brand.name, description: brand.tagline.en },
    ...productsFor(brand).map((p) => {
      const price = brand.flags.sampleFromOne ? p.samplePrice : p.moqPrice;
      return {
        "@type": "Product",
        name: `${brand.name} ${p.name}`,
        brand: { "@type": "Brand", name: brand.name },
        category: p.category,
        description: `${p.name}, ${p.volume}. Key ingredient: ${p.heroIngredient}.`,
        ...(price != null && {
          offers: {
            "@type": "Offer",
            price: price.toFixed(2),
            priceCurrency: "USD",
            availability: p.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          },
        }),
      };
    }),
  ];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c") }}
    />
  );
}
