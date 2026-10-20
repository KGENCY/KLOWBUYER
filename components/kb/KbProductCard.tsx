"use client";

import Link from "next/link";
import type { CatalogProduct } from "@/content/products";
import { useSamples } from "@/components/SampleBox";
import { offPct, usd } from "./format";

/**
 * Product card from klow.kr: photo with a "Sample 1 unit" bar that slides up on hover,
 * then retail price, the KLOW buyer sample price and how far below retail it is.
 */
export default function KbProductCard({ p, brandName, index = 0 }: { p: CatalogProduct; brandName: string; index?: number }) {
  const { has, toggle } = useSamples();
  const added = has(p.id);
  const href = `/products/${p.id}`;
  const img = p.images[0];
  const off = offPct(p);
  return (
    <article className={`card ${added ? "is-added" : ""}`} style={{ animationDelay: `${Math.min(index, 7) * 60}ms` }}>
      <div className="card__frame">
        {p.category === "Sets" && <span className="card__badge">Set</span>}
        <Link className="card__link" href={href} aria-label={`${brandName} ${p.name} — pricing, terms and details`}>
          {img?.src ? (
            <img className="photo" src={img.src} alt={`${brandName} ${p.name}`} loading={index < 4 ? "eager" : "lazy"} decoding="async" />
          ) : (
            <span className="kbcard__ph" aria-hidden="true">{brandName}</span>
          )}
        </Link>
        {p.samplePrice != null && (
          <button className="card__sample" aria-pressed={added} onClick={() => toggle(p.id)}>
            <span>{added ? "In your sample box" : "Sample 1 unit"}</span>
            <span>{added ? "Remove" : <>{usd(p.samplePrice)} <em>wholesale</em></>}</span>
          </button>
        )}
      </div>
      <div className="card__body">
        <span className="eyebrow">{brandName}{p.volume && p.volume !== "Set" ? ` · ${p.volume}` : ""}</span>
        <h3 className="card__name" title={p.name}><Link href={href}>{p.name}</Link></h3>
        <div className="card__deal">
          {p.msrp != null && <span className="card__was">Retail price <span className="card__was-v">{usd(p.msrp)}</span></span>}
          <span className="card__kbs">KLOW Buyer Sample</span>
          <span className="card__now">
            <b>{usd(p.samplePrice)}</b>
            {off != null && off > 0 && <span className="card__off">{off}% off</span>}
          </span>
        </div>
      </div>
    </article>
  );
}
