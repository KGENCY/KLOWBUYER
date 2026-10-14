import type { Metadata } from "next";
import ComingSoon, { comingSoonMetadata, comingSoonTitle } from "@/components/ComingSoon";
import MajorBrandPage from "@/components/brand/MajorBrandPage";
import { brandProfile, brandsOfType } from "@/content/brands";
import { t } from "@/content/i18n";

type Params = Promise<{ id: string }>;

const majorBrand = (id: string) => {
  const b = brandProfile(id);
  return b?.type === "major" ? b : undefined;
};

export function generateStaticParams() {
  return brandsOfType("major").map((b) => ({ id: b.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
  const b = majorBrand(id);
  if (!b) return comingSoonMetadata(`/brands/${id}/wholesale`, `${comingSoonTitle(`/brands/${id}/wholesale`)} wholesale`);
  const title = b.seo?.title ? t(b.seo.title) : `${b.name} Wholesale | Bulk Price & MOQ from Korea – KLOW`;
  const description = b.seo?.description
    ? t(b.seo.description)
    : `${b.name} bulk prices and MOQ, shipped from our Korean warehouse to [N]+ countries. Request a wholesale quote and get pricing within 24h.`;
  return { title, description, alternates: { canonical: `/brands/${b.slug}/wholesale` } };
}

/** Major-brand wholesale page; brands in the menu without data yet get the placeholder. */
export default async function Page({ params }: { params: Params }) {
  const { id } = await params;
  const b = majorBrand(id);
  if (b) return <MajorBrandPage brand={b} />;
  return <ComingSoon path={`/brands/${id}/wholesale`} title={`${comingSoonTitle(`/brands/${id}/wholesale`)} wholesale`} />;
}
