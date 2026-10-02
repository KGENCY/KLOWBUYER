"use client";

import { useState } from "react";
import { CATEGORIES, Category, FREE_SHIPPING_SKUS, PRODUCTS, brandById } from "@/lib/data";
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

export default function Collection() {
  const [cat, setCat] = useState<Category | "All">("All");
  const [q, setQ] = useState("");
  const { items } = useSamples();
  const { openWith } = useRequest();

  const searching = q.trim().length > 0;
  const list = searching ? matches(q) : cat === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat);

  const pick = (c: Category | "All") => { setCat(c); setQ(""); };
  const type = (v: string) => { setQ(v); if (v.trim()) setCat("All"); };

  return (
    <section id="collection" className="section">
      <div className="wrap">
        <div className="section__head">
          <div>
            <span className="eyebrow">The collection</span>
            <h2 className="h2">Every product, sampled<br />at the price you&rsquo;ll pay.</h2>
          </div>
          <div className="rule-note">
            <Progress count={items.length} />
            <p>
              <b>One unit, wholesale price.</b> Build a box of {FREE_SHIPPING_SKUS} SKUs and shipping is on us.
              <span className="muted"> {items.length ? shippingNote(items.length) + "." : ""}</span>
            </p>
          </div>
        </div>

        <div className="tabsrow">
          <div className="tabs" role="tablist">
            {(["All", ...CATEGORIES] as const).map((c) => (
              <button key={c} role="tab" aria-selected={!searching && cat === c} className={!searching && cat === c ? "is-on" : ""} onClick={() => pick(c)}>
                {c}
              </button>
            ))}
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

        {list.length ? (
          <div className="grid" key={searching ? "q:" + q : cat}>
            {list.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
          </div>
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
