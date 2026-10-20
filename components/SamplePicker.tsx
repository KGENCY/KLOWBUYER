"use client";

import { useState } from "react";
import { FREE_SHIPPING_SKUS, MAX_SAMPLE_SKUS, SAMPLE_PRODUCTS, brandById } from "@/lib/data";
import { BENEFITS, PARTNER_SAMPLE_PRICE, type Benefit } from "@/content/products";
import ProductCard from "./ProductCard";

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9\s]/g, " ");

/** Filters that actually have products: brands in first-seen order, benefits in BENEFITS order. */
const BRAND_IDS = [...new Set(SAMPLE_PRODUCTS.map((p) => p.brandId))];
const BENEFIT_TABS = BENEFITS
  .map((b) => ({ b, n: SAMPLE_PRODUCTS.filter((p) => p.benefits?.includes(b)).length }))
  .filter((x) => x.n);

/** Every partner-brand product, filterable by key benefit and brand, each one addable to the sample box. */
export default function SamplePicker() {
  const [brand, setBrand] = useState("");
  const [benefit, setBenefit] = useState<Benefit | "">("");
  const [q, setQ] = useState("");

  const tokens = norm(q).split(/\s+/).filter(Boolean);
  const list = SAMPLE_PRODUCTS.filter((p) => {
    if (brand && p.brandId !== brand) return false;
    if (benefit && !p.benefits?.includes(benefit)) return false;
    const hay = norm([p.name, brandById(p.brandId).name, p.category, p.size, ...(p.benefits ?? [])].join(" "));
    return tokens.every((t) => hay.includes(t));
  });

  return (
    <section className="section samples">
      <div className="wrap">
        <header className="samples__head">
          <span className="eyebrow eyebrow--accent">No MOQ · Every sample ${PARTNER_SAMPLE_PRICE}</span>
          <h1 className="samples__title">Find the next Korean bestseller <em>before anyone else stocks it.</em></h1>
          <p className="samples__lede">
            Rising Korean brands we work with directly.<br />
            Try any product for ${PARTNER_SAMPLE_PRICE} &mdash; whatever it retails for.
          </p>
          <ul className="samples__facts">
            <li><b>${PARTNER_SAMPLE_PRICE}</b><span>Any product, 1 unit</span></li>
            <li><b>{MAX_SAMPLE_SKUS}</b><span>Products per order</span></li>
            <li><b>{FREE_SHIPPING_SKUS}+</b><span>Ships free</span></li>
          </ul>
        </header>

        <div className="tabsrow">
          <div className="tabs" role="group" aria-label="Key benefit">
            <button className={!benefit ? "is-on" : ""} aria-pressed={!benefit} onClick={() => setBenefit("")}>
              All products <sup>{SAMPLE_PRODUCTS.length}</sup>
            </button>
            {BENEFIT_TABS.map(({ b, n }) => (
              <button key={b} className={benefit === b ? "is-on" : ""} aria-pressed={benefit === b} onClick={() => setBenefit(benefit === b ? "" : b)}>
                {b} <sup>{n}</sup>
              </button>
            ))}
          </div>

          <label className="search">
            <svg className="search__icon" width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
              <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products" aria-label="Search products" autoComplete="off" />
            {q && <button type="button" className="search__clear" onClick={() => setQ("")} aria-label="Clear search">×</button>}
          </label>
        </div>

        <div className="tabs samples__brands" role="group" aria-label="Brand">
          <button className={!brand ? "is-on" : ""} aria-pressed={!brand} onClick={() => setBrand("")}>All brands</button>
          {BRAND_IDS.map((id) => (
            <button key={id} className={brand === id ? "is-on" : ""} aria-pressed={brand === id} onClick={() => setBrand(brand === id ? "" : id)}>{brandById(id).name}</button>
          ))}
        </div>

        {list.length ? (
          <div className="grid" key={`${brand}|${benefit}|${q}`}>
            {list.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
          </div>
        ) : (
          <div className="empty" role="status">
            <span className="eyebrow">No match</span>
            <p className="muted">Nothing fits these filters yet.</p>
            <button className="link small" onClick={() => { setBrand(""); setBenefit(""); setQ(""); }}>Clear filters</button>
          </div>
        )}
      </div>
    </section>
  );
}
