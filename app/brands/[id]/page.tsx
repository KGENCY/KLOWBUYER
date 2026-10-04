import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BrandDetail from "@/components/BrandDetail";
import { BRANDS, productsOf } from "@/lib/data";

type Params = Promise<{ id: string }>;

export function generateStaticParams() {
  return BRANDS.map((b) => ({ id: b.id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
  const b = BRANDS.find((x) => x.id === id);
  if (!b) return {};
  return {
    title: `${b.name} · KLOW Wholesale`,
    description: `${b.tagline}. ${productsOf(b.id).length} products from ${b.name}, ${b.city}: wholesale pricing, MOQ ${b.moq} units, dispatch in ${b.leadDays} days.`,
  };
}

export default async function BrandPage({ params }: { params: Params }) {
  const { id } = await params;
  const b = BRANDS.find((x) => x.id === id);
  if (!b) notFound();
  return <BrandDetail b={b} />;
}
