"use client";

import { useEffect, useRef, useState } from "react";
import { CATEGORIES, Category, FREE_SHIPPING_SKUS, PRODUCTS, SHELVES, Shelf, brandById, shelfProducts } from "@/lib/data";
import ProductCard from "./ProductCard";
import { Progress, shippingNote, useSamples } from "./SampleBox";
import { useRequest } from "./RequestBrand";

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9\s]/g, " ");

function matches(q: string) {
  const tokens = norm(q).split(/\s+/).filter(Boolean);
  if (!tokens.length) return PRODUCTS;
  return PRODUCTS.filter((p) => {
    const b = brandById(p.brandId);
    const hay = norm([p.name, b.name, b.tagline, p.category, p.size, p.badge ?? "", ...p.lines].join(" "));
    return tokens.every((t) => hay.includes(t));
  });
}

type View = "Curated" | "All" | Category;
const VIEWS: View[] = ["Curated", "All", ...CATEGORIES];
const SHELF_DATA = SHELVES.map((s) => ({ s, list: shelfProducts(s) })).filter((x) => x.list.length);

type ShelfItem = (typeof SHELF_DATA)[number];

/** Bands that actually have products, and the shelf list narrowed to the selected one. */
function banded({ s, list }: ShelfItem, band: string | undefined) {
  const bands = (s.bands ?? []).map((b) => ({ ...b, n: list.filter(b.test).length })).filter((b) => b.n);
  const on = bands.find((b) => b.id === band);
  return { bands, on, list: on ? list.filter(on.test) : list };
}

function ShelfHead({ s, n, bands, on, onBand }: {
  s: Shelf; n: number; bands: ReturnType<typeof banded>["bands"]; on?: string; onBand: (id?: string) => void;
}) {
  return (
    <div className="shelf__head">
      <span className="shelf__n">{String(n).padStart(2, "0")}</span>
      <div className="shelf__t">
        <h3>{s.title}</h3>
        <p>{s.lede}</p>
        {bands.length > 0 && (
          <div className="bands" role="group" aria-label={`${s.title} filter`}>
            <button className={!on ? "is-on" : ""} aria-pressed={!on} onClick={() => onBand()}>
              <b>All</b>
            </button>
            {bands.map((b) => (
              <button key={b.id} className={on === b.id ? "is-on" : ""} aria-pressed={on === b.id} onClick={() => onBand(b.id)}>
                <b>{b.label}</b>
                {b.note && <small>{b.note}</small>}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/** Lets other sections (e.g. the brand wall) open the collection filtered to one brand. */
export const BRAND_EVENT = "klow:brand";
export const showBrand = (brandId: string) => window.dispatchEvent(new CustomEvent(BRAND_EVENT, { detail: brandId }));

export default function Collection() {
  const [view, setView] = useState<View>("Curated");
  const [shelf, setShelf] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [brand, setBrand] = useState<string | null>(null);
  const [bandOf, setBandOf] = useState<Record<string, string | undefined>>({});
  const { items } = useSamples();
  const { openWith } = useRequest();
  const top = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const on = (e: Event) => {
      setBrand((e as CustomEvent<string>).detail); setShelf(null); setQ("");
      requestAnimationFrame(() => top.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    };
    window.addEventListener(BRAND_EVENT, on);
    return () => window.removeEventListener(BRAND_EVENT, on);
  }, []);

  const searching = q.trim().length > 0;
  const branded = !searching && brand ? brandById(brand) : null;
  const focused = !searching && !branded && view === "Curated" && shelf ? SHELF_DATA.findIndex((x) => x.s.id === shelf) : -1;

  const toTop = () => top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  const pick = (v: View) => { setView(v); setShelf(null); setQ(""); setBrand(null); };
  const type = (v: string) => { setQ(v); if (v.trim()) { setView("All"); setShelf(null); setBrand(null); } };
  const openShelf = (id: string) => { setShelf(id); toTop(); };
  const closeShelf = () => { setShelf(null); toTop(); };
  const shelfHead = (x: ShelfItem, n: number) => {
    const { bands, on } = banded(x, bandOf[x.s.id]);
    return <ShelfHead s={x.s} n={n} bands={bands} on={on?.id} onBand={(id) => setBandOf((m) => ({ ...m, [x.s.id]: id }))} />;
  };

  const flat = searching ? matches(q) : branded ? PRODUCTS.filter((p) => p.brandId === branded.id) : view === "All" ? PRODUCTS : view === "Curated" ? null : PRODUCTS.filter((p) => p.category === view);

  return (
    <section id="collection" className="section">
      <div className="wrap">
        <div className="section__head">
          <div>
            <span className="eyebrow">The collection</span>
            <h2 className="h2">Every sample at wholesale price.<br />Reorder what sells.</h2>
          </div>
          <div className="rule-note">
            <Progress count={items.length} />
            <p>
              <b>One unit, wholesale price.</b> No minimum to sample, and the unit price drops further once you reorder at MOQ. Reach {FREE_SHIPPING_SKUS} SKUs and shipping is on us.
              <span className="muted"> {items.length ? shippingNote(items.length) + "." : ""}</span>
            </p>
          </div>
        </div>

        <div className="tabsrow" ref={top}>
          <div className="tabs" role="tablist">
            {VIEWS.map((v) => {
              const on = !searching && !branded && view === v;
              return (
                <button key={v} role="tab" aria-selected={on} className={on ? "is-on" : ""} onClick={() => pick(v)}>
                  {v === "All" ? "All products" : v}
                </button>
              );
            })}
          </div>

          <label className="search">
            <svg className="search__icon" width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
              <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              value={q}
              onChange={(e) => type(e.target.value)}
              placeholder="Search brands or products"
              aria-label="Search brands or products"
              autoComplete="off"
            />
            {searching && (
              <button type="button" className="search__clear" onClick={() => setQ("")} aria-label="Clear search">×</button>
            )}
          </label>
        </div>

        {focused >= 0 ? (
          <div className="shelf shelf--open" key={"shelf:" + shelf}>
            <button className="shelf__back" onClick={closeShelf}><span>←</span>All curated shelves</button>
            {shelfHead(SHELF_DATA[focused], focused + 1)}
            <div className="grid" key={bandOf[shelf!] ?? "all"}>
              {banded(SHELF_DATA[focused], bandOf[shelf!]).list.map((p, i) => <ProductCard key={p.id} p={p} index={i} tag={SHELF_DATA[focused].s.tag?.(p)} />)}
            </div>
          </div>
        ) : flat === null ? (
          <div className="shelves">
            {SHELF_DATA.map((x, i) => {
              const { s } = x;
              const { list } = banded(x, bandOf[s.id]);
              return (
                <div className={`shelf shelf--${s.preview}`} key={s.id} id={`shelf-${s.id}`}>
                  {shelfHead(x, i + 1)}
                  <div className="grid grid--shelf" key={bandOf[s.id] ?? "all"}>
                    {list.slice(0, s.preview).map((p, j) => <ProductCard key={p.id} p={p} index={j} tag={s.tag?.(p)} />)}
                  </div>
                  {list.length > s.preview && (
                    <button className="shelf__all" onClick={() => openShelf(s.id)}>View all<span>→</span></button>
                  )}
                </div>
              );
            })}
          </div>
        ) : flat.length ? (
          <>
          {branded && (
            <div className="shelf__head shelf__head--brand">
              <div className="shelf__t">
                <span className="eyebrow">{branded.tier === "icon" ? "K-Beauty icon" : "Hidden gem"} · {branded.city}</span>
                <h3>{branded.name}</h3>
                <p>{branded.tagline}</p>
              </div>
              <button className="shelf__back" onClick={() => setBrand(null)}><span>×</span>Clear brand</button>
            </div>
          )}
          <div className="grid" key={searching ? "q:" + q : branded ? "b:" + branded.id : view}>
            {flat.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
          </div>
          </>
        ) : (
          <div className="empty" role="status">
            <span className="eyebrow">Not in the collection yet</span>
            <h3 className="serif">We don&rsquo;t carry &ldquo;{q.trim()}&rdquo; — yet.</h3>
            <p className="muted">Our Seoul team can contact the brand directly and bring it into your sample box.</p>
            <button className="btn btn--solid" onClick={() => openWith(q.trim())}>Request &ldquo;{q.trim()}&rdquo; from Korea</button>
            <button className="link small muted" onClick={() => setQ("")}>Clear search</button>
          </div>
        )}
      </div>
    </section>
  );
}
