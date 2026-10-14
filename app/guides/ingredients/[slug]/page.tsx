import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { t } from "@/content/i18n";
import { ingredientGuide, ingredientGuides } from "@/content/guides";
import IngredientGuidePage from "@/components/guides/IngredientGuidePage";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return ingredientGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const g = ingredientGuide((await params).slug);
  if (!g) return {};
  return {
    title: g.seo.title ? t(g.seo.title) : `${g.ingredient} Skincare Wholesale: Korean Brands & Bestsellers | KLOW`,
    description: t(g.seo.description),
    alternates: { canonical: `/guides/ingredients/${g.slug}` },
  };
}

export default async function Page({ params }: { params: Params }) {
  const g = ingredientGuide((await params).slug);
  if (!g) notFound();
  return <IngredientGuidePage guide={g} />;
}
