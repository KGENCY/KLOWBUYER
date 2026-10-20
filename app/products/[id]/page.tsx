import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import KbProductDetail from "@/components/kb/KbProductDetail";
import { PRODUCTS, brandById } from "@/lib/data";
import { PARTNER_SAMPLE_PRICE, PRODUCTS as CATALOG, catalogProduct, productsOfBrand } from "@/content/products";
import { brandProfile } from "@/content/brands";

type Params = Promise<{ id: string }>;

/** A partner brand's product (content/products.ts), shown in the klow.kr layout. */
const partnerProduct = (id: string) => {
  const p = catalogProduct(id);
  const brand = p && brandProfile(p.brandSlug);
  return p && brand?.type === "partner" ? { p, brand } : null;
};

export function generateStaticParams() {
  return [
    ...PRODUCTS.map((p) => ({ id: p.id })),
    ...CATALOG.filter((p) => partnerProduct(p.id)).map((p) => ({ id: p.id })),
  ];
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
  const partner = partnerProduct(id);
  if (partner) {
    const { p, brand } = partner;
    return {
      title: `${p.name} — ${brand.name} wholesale · KLOW Wholesale`,
      description: `${brand.name} ${p.name} wholesale from Korea. Sample 1 unit at $${PARTNER_SAMPLE_PRICE}, then order from ${p.moq ?? "[__]"} units, with export documents.`,
    };
  }
  const p = PRODUCTS.find((x) => x.id === id);
  if (!p) return {};
  const b = brandById(p.brandId);
  return {
    title: `${p.name} — ${b.name} · KLOW Wholesale`,
    description: `Wholesale pricing by volume, trade terms, documentation and buyer reviews for ${b.name} ${p.name}.`,
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { id } = await params;
  const partner = partnerProduct(id);
  if (partner) {
    const { p, brand } = partner;
    const siblings = productsOfBrand(brand.slug).filter((s) => s.id !== p.id);
    return (
      <div className="kb">
        <KbProductDetail p={p} brand={brand} siblings={siblings} />
      </div>
    );
  }
  const p = PRODUCTS.find((x) => x.id === id);
  if (!p) notFound();
  return <ProductDetail p={p} />;
}
