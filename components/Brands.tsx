"use client";

import { useState } from "react";
import Link from "next/link";
import { BRANDS, money, productsOf } from "@/lib/data";
import BrandLogo from "./BrandLogo";
import Photo from "./Photo";
import { showBrand } from "./Collection";
import { useSamples } from "./SampleBox";
import { useBuyer } from "./Buyer";

export default function Brands() {
  const [id, setId] = useState(BRANDS[0].id);
  const { has, toggle } = useSamples();
  const signedIn = !!useBuyer().buyer;
  const b = BRANDS.find((x) => x.id === id)!;
  const products = productsOf(b.id);

  return (
    <div className="brands__grid" data-reveal>
      <ul className="logowall" role="tablist" aria-label="Brands">
        {BRANDS.map((x) => (
          <li key={x.id}>
            <button role="tab" aria-selected={x.id === id} className={x.id === id ? "is-on" : ""} onClick={() => setId(x.id)}>
              <i className={x.tier === "gem" ? "gem" : ""} aria-hidden="true" />
              <BrandLogo b={x} />
            </button>
          </li>
        ))}
      </ul>

      <div className="bpanel" key={b.id}>
        <div className="bpanel__head">
          <span className={`eyebrow tier ${b.tier === "gem" ? "tier--gem" : ""}`}>{b.tier === "icon" ? "K-Beauty icon" : "Hidden gem"}</span>
          <h3 className="bpanel__name"><Link href={`/brands/${b.id}`}>{b.name}</Link></h3>
          <p className="muted">{b.tagline}</p>
          <Link href={`/brands/${b.id}`} className="link small" aria-label={`${b.name} — brand page`}>View brand page →</Link>
        </div>
        <dl className="bpanel__meta">
          <div><dt>Based in</dt><dd>{b.city} · est. {b.founded}</dd></div>
          <div><dt>Sample</dt><dd>From 1 unit, wholesale</dd></div>
          <div><dt>Reorder MOQ</dt><dd>{b.moq} units / SKU</dd></div>
          <div><dt>Marketing support</dt><dd>{b.support.join(" · ")}</dd></div>
        </dl>
        <ul className="bpanel__products">
          {products.slice(0, 2).map((p) => (
            <li key={p.id} className={has(p.id) ? "is-added" : ""}>
              <div className="bpanel__img"><Photo p={p} sizes="120px" /></div>
              <div className="bpanel__p">
                <span>{p.name}</span>
                {signedIn
                  ? <span className="mono small">{money(p.wholesale)} <em className="muted">wholesale</em></span>
                  : <span className="mono small">{money(p.wholesale)} <em className="muted">sample · MSRP {money(p.msrp)}</em></span>}
                <button className="link small" onClick={() => toggle(p.id)}>{has(p.id) ? "In your sample box — remove" : "Sample 1 unit"}</button>
              </div>
            </li>
          ))}
        </ul>
        <button className="btn btn--ghost btn--block" onClick={() => showBrand(b.id)}>Shop all {b.name}</button>
      </div>
    </div>
  );
}
