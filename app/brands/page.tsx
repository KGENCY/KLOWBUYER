import type { Metadata } from "next";
import { t } from "@/content/i18n";
import { brandsPage as P } from "@/content/brandsPage";
import { allBrands } from "@/content/brands";
import InfoTable from "@/components/section/InfoTable";
import BrandsIndex, { type BrandFilter } from "@/components/brand/BrandsIndex";
import { brandCards, categoryChips, ingredientChips } from "@/components/brand/brandCards";

export const metadata: Metadata = {
  title: t(P.seo.title),
  description: t(P.seo.description),
  // Filtered views (?filter=, ?category=…) all point search engines at the one list.
  alternates: { canonical: "/brands" },
};

type Search = Promise<{ filter?: string; category?: string; ingredient?: string }>;

export default async function BrandsPage({ searchParams }: { searchParams: Search }) {
  const sp = await searchParams;
  const filter: BrandFilter = sp.filter === "popular" || sp.filter === "new" ? sp.filter : "all";
  const brands = allBrands();
  const categories = categoryChips();
  const ingredients = ingredientChips();

  return (
    <div className="about">
      <section className="about-hero bhero">
        <div className="wrap about-hero__grid">
          <div>
            <span className="eyebrow eyebrow--accent about-hero__label">{t(P.hero.label)}</span>
            <h1 className="hero__title">
              {t(P.hero.title)} <em>{t(P.hero.subtitle)}</em>
            </h1>
          </div>
          <InfoTable rows={[
            { key: "brands", label: t(P.hero.facts.brands), value: String(brands.length) },
            { key: "only", label: t(P.hero.facts.onlyOnKlow), value: String(brands.filter((b) => b.flags.onlyOnKlow).length) },
            { key: "sample", label: t(P.hero.facts.sampleFrom), value: t(P.hero.facts.sampleValue) },
          ]} />
        </div>
      </section>

      <BrandsIndex
        cards={brandCards()}
        categories={categories}
        ingredients={ingredients}
        initial={{
          filter,
          category: categories.some((c) => c.slug === sp.category) ? sp.category! : "",
          ingredient: ingredients.includes(sp.ingredient ?? "") ? sp.ingredient! : "",
        }}
      />
    </div>
  );
}
