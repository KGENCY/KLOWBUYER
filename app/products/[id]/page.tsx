import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import { PRODUCTS, brandById } from "@/lib/data";

type Params = Promise<{ id: string }>;

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
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
  const p = PRODUCTS.find((x) => x.id === id);
  if (!p) notFound();
  return <ProductDetail p={p} />;
}
