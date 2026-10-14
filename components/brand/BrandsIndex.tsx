"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { t } from "@/content/i18n";
import { brandsPage as P } from "@/content/brandsPage";
import { leadMagnetsById } from "@/content/leadMagnets";
import MediaFrame from "@/components/media/MediaFrame";
import ContextCTA from "@/components/conversion/ContextCTA";
import LeadMagnetCard from "@/components/conversion/LeadMagnetCard";
import QuickInquiryForm from "@/components/conversion/QuickInquiryForm";
import SectionHeader from "@/components/section/SectionHeader";
import { useRequest } from "@/components/RequestBrand";
import type { BrandCardData } from "./brandCards";

export type BrandFilter = "all" | "popular" | "new";
const TABS: BrandFilter[] = ["all", "popular", "new"];
const LETTERS = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ", "#"];
const SIGNUP_AT = 8;
const CATALOG_AT = 16;

const sortName = (a: BrandCardData, b: BrandCardData) =>
  (a.letter === "#" ? 1 : 0) - (b.letter === "#" ? 1 : 0) || a.name.localeCompare(b.name);

/**
 * /brands: tabs, category / ingredient chips and search filter the grid on the page.
 * Tabs and chips are mirrored in the URL (?filter=&category=&ingredient=) so links like
 * /brands?filter=new open the right view; the page's canonical stays /brands.
 */
export default function BrandsIndex({
  cards,
  categories,
  ingredients,
  initial,
}: {
  cards: BrandCardData[];
  categories: { slug: string; label: string }[];
  ingredients: string[];
  initial: { filter: BrandFilter; category: string; ingredient: string };
}) {
  const router = useRouter();
  const { openWith } = useRequest();
  const [filter, setFilter] = useState<BrandFilter>(initial.filter);
  const [category, setCategory] = useState(initial.category);
  const [ingredient, setIngredient] = useState(initial.ingredient);
  const [q, setQ] = useState("");
  const [sheet, setSheet] = useState(false);

  // Keep the URL in step with the tab and chips.
  useEffect(() => {
    const qs = new URLSearchParams();
    if (filter !== "all") qs.set("filter", filter);
    if (category) qs.set("category", category);
    if (ingredient) qs.set("ingredient", ingredient);
    const next = `/brands${qs.size ? `?${qs}` : ""}`;
    if (next !== `${window.location.pathname}${window.location.search}`) router.replace(next, { scroll: false });
  }, [filter, category, ingredient, router]);

  useEffect(() => {
    if (!sheet) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSheet(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sheet]);

  const query = q.trim().toLowerCase();
  const visible = useMemo(
    () =>
      cards
        .filter((c) => filter === "all" || (filter === "popular" ? c.type === "major" : c.type === "partner"))
        .filter((c) => !category || c.categories.includes(category))
        .filter((c) => !ingredient || c.ingredients.includes(ingredient))
        .filter((c) => !query || `${c.name} ${c.tagline} ${c.ingredients.join(" ")}`.toLowerCase().includes(query))
        .sort(sortName),
    [cards, filter, category, ingredient, query],
  );
  const letters = new Set(visible.map((c) => c.letter));
  const firstOfLetter = new Map<string, string>();
  visible.forEach((c) => !firstOfLetter.has(c.letter) && firstOfLetter.set(c.letter, c.slug));
  const discover = cards.filter((c) => c.onlyOnKlow).sort(sortName);
  const active = [
    ...(category ? [{ key: "category", label: categories.find((c) => c.slug === category)?.label ?? category, clear: () => setCategory("") }] : []),
    ...(ingredient ? [{ key: "ingredient", label: ingredient, clear: () => setIngredient("") }] : []),
    ...(query ? [{ key: "q", label: `“${q.trim()}”`, clear: () => setQ("") }] : []),
  ];
  const clearAll = () => { setCategory(""); setIngredient(""); setQ(""); };
  const [catalog] = leadMagnetsById(["brand-catalog"]);

  const chips = (
    <>
      <div className="bfilter__group">
        <span className="eyebrow">{t(P.filters.category)}</span>
        <div className="bfilter__chips">
          {categories.map((c) => (
            <button key={c.slug} type="button" aria-pressed={category === c.slug} onClick={() => setCategory(category === c.slug ? "" : c.slug)} data-cta-id={`brands_filter_category_${c.slug.replace(/-/g, "_")}`}>
              {c.label}
            </button>
          ))}
        </div>
      </div>
      <div className="bfilter__group" id="ingredients">
        <span className="eyebrow">{t(P.filters.ingredient)}</span>
        <div className="bfilter__chips">
          {ingredients.map((i) => (
            <button key={i} type="button" aria-pressed={ingredient === i} onClick={() => setIngredient(ingredient === i ? "" : i)} data-cta-id={`brands_filter_ingredient_${i.toLowerCase().replace(/\W+/g, "_")}`}>
              {i}
            </button>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Filter bar */}
      <div className="bfilter">
        <div className="wrap">
          <div className="bfilter__top">
            <div className="bfilter__tabs" role="tablist" aria-label="Brand type">
              {TABS.map((f) => (
                <button key={f} type="button" role="tab" aria-selected={filter === f} onClick={() => setFilter(f)} data-cta-id={`brands_filter_tab_${f}`}>
                  {t(P.tabs[f])}
                </button>
              ))}
            </div>
            <div className="bfilter__search">
              <label className="sr-only" htmlFor="brand-search">{t(P.filters.search)}</label>
              <input id="brand-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t(P.filters.search)} autoComplete="off" data-cta-id="brands_filter_search" />
            </div>
            <button type="button" className="bfilter__open" onClick={() => setSheet(true)} aria-expanded={sheet} aria-controls="brand-filter-sheet" data-cta-id="brands_filter_open">
              {t(P.filters.open)}{(category || ingredient) && <b>{[category, ingredient].filter(Boolean).length}</b>}
            </button>
          </div>
          <div className="bfilter__body">{chips}</div>
          <div className="bfilter__foot">
            <nav className="az" aria-label="Jump to letter">
              {LETTERS.map((l) =>
                letters.has(l) ? (
                  <a key={l} href={`#brand-${firstOfLetter.get(l)}`} data-cta-id={`brands_az_${l === "#" ? "other" : l.toLowerCase()}`}>{l}</a>
                ) : (
                  <span key={l} aria-disabled="true">{l}</span>
                ),
              )}
            </nav>
            {!!active.length && (
              <div className="bfilter__active" aria-live="polite">
                {active.map((a) => (
                  <button key={a.key} type="button" onClick={a.clear} aria-label={`Remove filter ${a.label}`}>{a.label} <i aria-hidden>×</i></button>
                ))}
                <button type="button" className="link small" onClick={clearAll} data-cta-id="brands_filter_clear">{t(P.filters.clear)}</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile: chips in a bottom sheet */}
      <div id="brand-filter-sheet" className={`bsheet ${sheet ? "is-on" : ""}`} role="dialog" aria-modal="true" aria-label={t(P.filters.open)} inert={!sheet}>
        <div className="bsheet__scrim" onClick={() => setSheet(false)} />
        <div className="bsheet__panel">
          <div className="bsheet__head">
            <span>{t(P.filters.open)}</span>
            <button type="button" onClick={() => setSheet(false)} aria-label="Close filters">×</button>
          </div>
          {chips}
          <div className="bsheet__foot">
            <button type="button" className="link small" onClick={clearAll}>{t(P.filters.clear)}</button>
            <button type="button" className="btn btn--solid" onClick={() => setSheet(false)}>
              {visible.length === 1 ? t(P.filters.showOne) : t(P.filters.show).replace("{n}", String(visible.length))}
            </button>
          </div>
        </div>
      </div>

      {/* Only on KLOW strip (All tab, nothing filtered) */}
      {filter === "all" && !active.length && !!discover.length && (
        <section className="section about-sec bdiscover">
          <div className="wrap">
            <SectionHeader label={t(P.discover.title)} title={t(P.discover.title)} description={t(P.discover.body)} />
            <ul className="bdiscover__row">
              {discover.map((c) => (
                <li key={c.slug}>
                  <Link href={c.href} data-cta-id={`brands_discover_${c.slug.replace(/-/g, "_")}`}>
                    <MediaFrame src={c.image.src} alt={c.image.alt} fallback={c.image.fallback} ratio="4 / 5" />
                    <span className="bdiscover__name">{c.name}</span>
                    <span className="bdiscover__price">{t(P.card.sampleFrom)} {c.sampleFrom}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Grid */}
      <section className="section about-sec bindex">
        <div className="wrap">
          {visible.length ? (
            <ul className={`bindex__grid bindex__grid--${filter}`}>
              {visible.map((c, i) => (
                <Fragment key={c.slug}>
                  <li id={`brand-${c.slug}`} className={`bc bc--${c.type}`}>
                    {c.type === "partner" ? (
                      <Link href={c.href} className="bc__link" data-cta-id={`brands_grid_${c.slug.replace(/-/g, "_")}`}>
                        <MediaFrame src={c.image.src} alt={c.image.alt} fallback={c.image.fallback} ratio="4 / 5" />
                        <span className="bc__body">
                          <span className="bc__badges">
                            {c.onlyOnKlow && <em>Only on KLOW</em>}
                            {c.exclusiveOpen && <em>Exclusive open</em>}
                          </span>
                          <span className="bc__name">{c.name}</span>
                          <span className="bc__tagline">{c.tagline}</span>
                          <span className="bc__tags">{c.ingredients.map((x) => <i key={x}>{x}</i>)}</span>
                          <span className="bc__foot">
                            <b>{t(P.card.sampleFrom)} {c.sampleFrom}</b>
                            <span>{t(P.card.view)}</span>
                          </span>
                        </span>
                      </Link>
                    ) : (
                      <Link href={c.href} className="bc__link" data-cta-id={`brands_grid_${c.slug.replace(/-/g, "_")}`}>
                        <span className="bc__mark">{c.name}</span>
                        <span className="bc__meta">
                          {c.categories.map((s) => s.replace(/-/g, " ")).join(" · ")} · {t(P.card.products).replace("{n}", String(c.productCount))}
                        </span>
                        <span className="bc__foot"><span>{t(P.card.wholesale)}</span></span>
                      </Link>
                    )}
                  </li>
                  {/* Sign-up band after the 8th card (or after the last, when there are fewer) */}
                  {i + 1 === Math.min(SIGNUP_AT, visible.length) && (
                    <li className="bindex__wide">
                      <ContextCTA id="brands_grid" variant="signup" text={t(P.gridSignup)} />
                    </li>
                  )}
                  {/* Catalog download after the 16th, once there are that many */}
                  {i + 1 === CATALOG_AT && catalog && (
                    <li className="bindex__wide bindex__catalog">
                      <LeadMagnetCard magnet={catalog} ctaId="brands_grid_catalog" />
                    </li>
                  )}
                </Fragment>
              ))}
            </ul>
          ) : (
            <div className="bindex__empty about-split">
              <div>
                <h2 className="h2">{t(P.empty.title)}</h2>
                <button type="button" className="link" onClick={() => openWith(q.trim())} data-cta-id="brands_empty_request">{t(P.empty.request)}</button>
              </div>
              <QuickInquiryForm ctaId="brands_empty_inquiry" title={t(P.empty.formTitle)} lede={t(P.empty.formLede)} compact />
            </div>
          )}
        </div>
      </section>

      {/* Bottom */}
      <section className="about-final brands-bottom">
        <div className="wrap">
          <div className="ccta ccta--inquiry ccta--light">
            <p className="ccta__text">{t(P.bottom.text)}</p>
            <div className="ccta__act">
              <button type="button" className="btn btn--solid" onClick={() => openWith()} data-cta-id="brands_bottom_request">{t(P.bottom.request)}</button>
              <Link href="/about#contact" className="link small" data-cta-id="brands_bottom_inquiry">{t(P.bottom.ask)}</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
