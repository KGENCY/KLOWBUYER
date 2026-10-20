"use client";

import { useState } from "react";
import type { CatalogProduct } from "@/content/products";
import { useSamples } from "@/components/SampleBox";
import { SAMPLE_PRICE } from "@/lib/data";
import KbProductCard from "./KbProductCard";

/** A brand's products in the klow.kr grid, with category tabs once the line-up spans more than one. */
export function KbBrandProducts({ products, brandName }: { products: CatalogProduct[]; brandName: string }) {
  const cats = [...new Set(products.map((p) => p.category))];
  const [cat, setCat] = useState<string | null>(null);
  const shown = cat ? products.filter((p) => p.category === cat) : products;
  return (
    <section id="products" className="brand__products">
      <div className="pdp__sechead">
        <span className="eyebrow">{products.length} products from {brandName}</span>
        <p className="muted">Every product: ${SAMPLE_PRICE} for 1 unit · free shipping at any 5 products.</p>
      </div>
      {cats.length > 1 && (
        <div className="kbtabs" role="tablist" aria-label="Filter by category">
          {[null, ...cats].map((c) => (
            <button key={c ?? "all"} type="button" role="tab" aria-selected={cat === c} className={cat === c ? "is-on" : ""} onClick={() => setCat(c)}>
              {c ?? "All"} <span className="mono">{c ? products.filter((p) => p.category === c).length : products.length}</span>
            </button>
          ))}
        </div>
      )}
      <div className="grid">
        {shown.map((p, i) => <KbProductCard key={p.id} p={p} brandName={brandName} index={i} />)}
      </div>
    </section>
  );
}

/** "Sample the range · 4 units": puts every product of the brand in the sample box and opens it. */
export function SampleRangeButton({ ids }: { ids: string[] }) {
  const { has, addMany, setOpen } = useSamples();
  const all = ids.length > 0 && ids.every(has);
  return (
    <button
      type="button"
      className={`btn ${all ? "btn--ghost" : "btn--solid"}`}
      onClick={() => { addMany(ids); setOpen(true); }}
    >
      {all ? "Range in your sample box" : `Sample the range · ${ids.length} ${ids.length === 1 ? "unit" : "units"}`}
    </button>
  );
}
