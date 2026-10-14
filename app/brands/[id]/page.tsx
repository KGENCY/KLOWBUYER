import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BrandDetail from "@/components/BrandDetail";
import ComingSoon, { comingSoonMetadata } from "@/components/ComingSoon";
import { MENU_PARTNER_SLUGS } from "@/content/navigation";
import { BRANDS, productsOf } from "@/lib/data";

type Params = Promise<{ id: string }>;

export function generateStaticParams() {
  return BRANDS.map((b) => ({ id: b.id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
  const b = BRANDS.find((x) => x.id === id);
  if (!b) return MENU_PARTNER_SLUGS.includes(id) ? comingSoonMetadata(`/brands/${id}`) : {};
  return {
    title: `${b.name} · KLOW Wholesale`,
    description: `${b.tagline}. ${productsOf(b.id).length} products from ${b.name}, ${b.city}: wholesale pricing, MOQ ${b.moq} units, dispatch in ${b.leadDays} days.`,
  };
}

export default async function BrandPage({ params }: { params: Params }) {
  const { id } = await params;
  const b = BRANDS.find((x) => x.id === id);
  // Partner brands already in the menu but not yet in the catalog get a placeholder, not a 404.
  if (!b && MENU_PARTNER_SLUGS.includes(id)) return <ComingSoon path={`/brands/${id}`} />;
  if (!b) notFound();
  return <BrandDetail b={b} />;
}
