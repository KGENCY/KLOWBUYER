import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BrandDetail from "@/components/BrandDetail";
import PartnerBrandPage from "@/components/brand/PartnerBrandPage";
import { brandProfile, brandsOfType } from "@/content/brands";
import { t } from "@/content/i18n";
import { BRANDS, productsOf } from "@/lib/data";

type Params = Promise<{ id: string }>;

/** A partner brand from content/brands.ts (major brands live at /brands/[slug]/wholesale). */
const partner = (id: string) => {
  const b = brandProfile(id);
  return b?.type === "partner" ? b : undefined;
};

export function generateStaticParams() {
  return [...brandsOfType("partner").map((b) => ({ id: b.slug })), ...BRANDS.map((b) => ({ id: b.id }))];
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
  const p = partner(id);
  if (p) {
    const category = p.category[0] ?? "Beauty";
    return {
      title: p.seo?.title ? t(p.seo.title) : `${p.name} – Korean ${category} Brand | Wholesale Samples from 1 Unit – KLOW`,
      description: p.seo?.description
        ? t(p.seo.description)
        : `${p.name}: ${t(p.tagline)} Sample from 1 unit at wholesale price, ships from Korea with export documents.`,
      alternates: { canonical: `/brands/${p.slug}` },
    };
  }
  const b = BRANDS.find((x) => x.id === id);
  if (!b) return {};
  return {
    title: `${b.name} · KLOW Wholesale`,
    description: `${b.tagline}. ${productsOf(b.id).length} products from ${b.name}, ${b.city}: wholesale pricing, MOQ ${b.moq} units, dispatch in ${b.leadDays} days.`,
  };
}

/** Partner brand page → existing catalog brand page → 404. */
export default async function BrandPage({ params }: { params: Params }) {
  const { id } = await params;
  const p = partner(id);
  if (p) return <PartnerBrandPage brand={p} />;
  const b = BRANDS.find((x) => x.id === id);
  if (!b) notFound();
  return <BrandDetail b={b} />;
}
