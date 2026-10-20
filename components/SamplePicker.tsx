"use client";

import { useState } from "react";
import { FREE_SHIPPING_SKUS, MAX_SAMPLE_SKUS, SAMPLE_PRODUCTS, brandById } from "@/lib/data";
import { PARTNER_SAMPLE_PRICE } from "@/content/products";
import ProductCard from "./ProductCard";

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9\s]/g, " ");

/** Filters that actually have products, in first-seen order. */
const BRAND_IDS = [...new Set(SAMPLE_PRODUCTS.map((p) => p.brandId))];
const CATEGORY_LIST = [...new Set(SAMPLE_PRODUCTS.map((p) => p.category))];

/** Every partner-brand product, filterable by brand and category, each one addable to the sample box. */
export default function SamplePicker() {
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [q, setQ] = useState("");

  const tokens = norm(q).split(/\s+/).filter(Boolean);
  const list = SAMPLE_PRODUCTS.filter((p) => {
    if (brand && p.brandId !== brand) return false;
    if (category && p.category !== category) return false;
    const hay = norm([p.name, brandById(p.brandId).name, p.category, p.size].join(" "));
    return tokens.every((t) => hay.includes(t));
  });

  return (
    <section className="section samples">
      <div className="wrap">
        <div className="section__head">
          <div>
            <span className="eyebrow">Sample box</span>
            <h1 className="h2">No MOQ.<br />Every sample ${PARTNER_SAMPLE_PRICE}.</h1>
          </div>
          <div className="rule-note">
            <p>
              <b>Find the next Korean bestseller before anyone else stocks it.</b> Rising brands we work with directly &mdash; try any product for ${PARTNER_SAMPLE_PRICE}, whatever it retails for. Mix up to {MAX_SAMPLE_SKUS} per order; {FREE_SHIPPING_SKUS} or more ship free.
            </p>
          </div>
        </div>

        <div className="tabsrow">
          <div className="tabs" role="group" aria-label="Category">
            <button className={!category ? "is-on" : ""} aria-pressed={!category} onClick={() => setCategory("")}>All products</button>
            {CATEGORY_LIST.map((c) => (
              <button key={c} className={category === c ? "is-on" : ""} aria-pressed={category === c} onClick={() => setCategory(category === c ? "" : c)}>{c}</button>
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
          <div className="grid" key={`${brand}|${category}|${q}`}>
            {list.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
          </div>
        ) : (
          <div className="empty" role="status">
            <span className="eyebrow">No match</span>
            <p className="muted">Nothing fits these filters yet.</p>
            <button className="link small" onClick={() => { setBrand(""); setCategory(""); setQ(""); }}>Clear filters</button>
          </div>
        )}
      </div>
    </section>
  );
}
