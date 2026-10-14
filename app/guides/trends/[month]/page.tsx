import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { t } from "@/content/i18n";
import { latestTrend, monthLabel, trendGuide, trendGuides } from "@/content/guides";
import TrendGuidePage from "@/components/guides/TrendGuidePage";

type Params = Promise<{ month: string }>;

/** Old / friendly URLs that mean "the newest report". */
const LATEST_ALIASES = ["latest", "korea-trend-report"];

export function generateStaticParams() {
  return trendGuides().map((g) => ({ month: g.month }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const g = trendGuide((await params).month);
  if (!g) return {};
  return {
    title: g.seo.title ? t(g.seo.title) : `Korea K-Beauty Trend Report – ${monthLabel(g.month)} | KLOW`,
    description: t(g.seo.description),
    alternates: { canonical: `/guides/trends/${g.month}` },
  };
}

export default async function Page({ params }: { params: Params }) {
  const { month } = await params;
  const latest = latestTrend();
  if (LATEST_ALIASES.includes(month) && latest) redirect(`/guides/trends/${latest.month}`);
  const g = trendGuide(month);
  if (!g) notFound();
  return <TrendGuidePage guide={g} />;
}
