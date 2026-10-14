import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { t } from "@/content/i18n";
import { importGuide, importGuides } from "@/content/guides";
import ImportGuidePage from "@/components/guides/ImportGuidePage";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return importGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const g = importGuide((await params).slug);
  if (!g) return {};
  const country = t(g.country);
  return {
    title: g.seo.title ? t(g.seo.title) : `How to Import Korean Cosmetics to ${country} (${g.updatedAt.slice(0, 4)} Guide) | KLOW`,
    description: t(g.seo.description),
    alternates: { canonical: `/guides/import/${g.slug}` },
  };
}

export default async function Page({ params }: { params: Params }) {
  const g = importGuide((await params).slug);
  if (!g) notFound();
  return <ImportGuidePage guide={g} />;
}
