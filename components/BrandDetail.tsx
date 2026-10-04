"use client";

import Link from "next/link";
import { Brand, Region, productsOf } from "@/lib/data";
import ProductCard from "./ProductCard";
import { useSamples } from "./SampleBox";
import { useRequest } from "./RequestBrand";

/* ────────────────────────────────────────────────────────────────
   Brand page: the brand's terms once, then only its products.
   ──────────────────────────────────────────────────────────────── */

const REGION: Record<Region, string> = { us: "US", ca: "Canada", uk: "UK", eu: "EU", gcc: "GCC", sea: "SE Asia", au: "Australia", latam: "LatAm" };

export default function BrandDetail({ b }: { b: Brand }) {
  const products = productsOf(b.id);
  const { has, addMany, setOpen } = useSamples();
  const { openWith } = useRequest();
  const allIn = products.every((p) => has(p.id));

  return (
    <article className="brand">
      <div className="wrap">
        <div className="pdp__bar">
          <Link href="/#collection" className="pdp__back">← Collection</Link>
          <span className={`eyebrow tier ${b.tier === "gem" ? "tier--gem" : ""}`}>{b.tier === "icon" ? "K-Beauty icon" : "Hidden gem"}</span>
        </div>

        <header className="brand__head">
          <div className="brand__id">
            <h1 className="brand__name">{b.name}</h1>
            <p className="brand__tagline">{b.tagline}</p>
            <p className="support" title={b.support.join(", ")}><i aria-hidden="true" />Marketing support available from {b.name}.</p>
          </div>

          <dl className="brand__facts">
            <div><dt>From</dt><dd>{b.city}, Korea · est. {b.founded}</dd></div>
            <div><dt>Opening order</dt><dd>{b.moq} units per SKU</dd></div>
            <div><dt>Dispatch</dt><dd>{b.leadDays} business days</dd></div>
            <div><dt>Avg. retail multiple</dt><dd>{b.margin.toFixed(1)}× wholesale</dd></div>
            <div><dt>Export documents</dt><dd>{b.docs.map((r) => REGION[r]).join(", ")}</dd></div>
            {b.exclusiveOpen.length > 0 && <div><dt>Exclusivity open</dt><dd>{b.exclusiveOpen.map((r) => REGION[r]).join(", ")}</dd></div>}
          </dl>

          <div className="brand__cta">
            <button className={`btn ${allIn ? "btn--ghost" : "btn--solid"}`} onClick={() => (allIn ? setOpen(true) : addMany(products.map((p) => p.id)))}>
              {allIn ? "Range is in your sample box" : `Sample the range · ${products.length} units`}
            </button>
            <button className="btn btn--ghost btn--plain" onClick={() => openWith(`${b.name} — wholesale terms`)}>Ask the brand team</button>
          </div>
        </header>

        <section className="brand__products">
          <div className="pdp__sechead">
            <span className="eyebrow">{products.length} {products.length === 1 ? "product" : "products"} from {b.name}</span>
            <p className="muted">Every product samples from 1 unit at the wholesale price.</p>
          </div>
          <div className="grid">
            {products.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
          </div>
        </section>
      </div>
    </article>
  );
}
