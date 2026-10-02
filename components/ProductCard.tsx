"use client";

import Link from "next/link";
import { Product, brandById, money } from "@/lib/data";
import Photo from "./Photo";
import { useSamples } from "./SampleBox";

export default function ProductCard({ p, index = 0 }: { p: Product; index?: number }) {
  const { has, toggle } = useSamples();
  const b = brandById(p.brandId);
  const added = has(p.id);
  const href = `/products/${p.id}`;

  return (
    <article className={`card ${added ? "is-added" : ""}`} style={{ animationDelay: `${(index % 8) * 50}ms` }}>
      <div className="card__frame">
        {p.badge && <span className={`card__badge ${p.badge === "Hidden gem" ? "card__badge--gem" : ""}`}>{p.badge}</span>}
        {/* The photo opens the detail page; the sample button is a sibling, never nested inside the link. */}
        <Link href={href} className="card__link" aria-label={`${b.name} ${p.name} — pricing, terms and reviews`}>
          <Photo p={p} sizes="(max-width: 860px) 50vw, 25vw" />
        </Link>
        <button className="card__sample" onClick={() => toggle(p.id)} aria-pressed={added}>
          {added ? (
            <><span>In your sample box</span><span>Remove</span></>
          ) : (
            <><span>Sample 1 unit</span><span>{money(p.wholesale)} <em>wholesale</em></span></>
          )}
        </button>
      </div>
      <div className="card__body">
        <span className="eyebrow">{b.name} · {p.size}</span>
        <h3 className="card__name"><Link href={href}>{p.name}</Link></h3>
        <div className="card__price">
          <span className="card__ws">{money(p.wholesale)}</span>
          <span className="card__msrp">MSRP {money(p.msrp)}</span>
        </div>
        <div className="card__support" title={`Marketing support from ${b.name}: ${b.support.join(", ")}`}>
          <span className="card__support-k"><i />Marketing support</span>
          <span className="card__support-v">{b.support.join(" · ")}</span>
        </div>
      </div>
    </article>
  );
}
