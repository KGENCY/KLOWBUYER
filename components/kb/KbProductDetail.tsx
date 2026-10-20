"use client";

import { useState } from "react";
import Link from "next/link";
import type { CatalogProduct } from "@/content/products";
import type { BrandProfile } from "@/content/brands";
import { brandById, productById } from "@/lib/data";
import { Gallery, Lock } from "@/components/ProductDetail";
import AskProduct from "@/components/AskProduct";
import { useSamples } from "@/components/SampleBox";
import { useRequest } from "@/components/RequestBrand";
import { DEMO_EMAIL, useBuyer } from "@/components/Buyer";
import VideoStrip from "./VideoStrip";
import KbProductCard from "./KbProductCard";
import { offPct, usd } from "./format";

const num = (n: number) => n.toLocaleString("en-US");

/**
 * Product page for a partner brand, as on klow.kr: photo and price-by-quantity side by side,
 * the brand's videos, what's in it, more from the brand, then reviews.
 * The 1-unit sample price is public; MOQ tiers open on sign-in.
 */
export default function KbProductDetail({ p, brand, siblings }: { p: CatalogProduct; brand: BrandProfile; siblings: CatalogProduct[] }) {
  const { has, toggle } = useSamples();
  const { openWith } = useRequest();
  const { buyer, signIn } = useBuyer();
  const signedIn = !!buyer;
  const added = has(p.id);
  const [asking, setAsking] = useState(false);

  const tiers = p.tiers?.length ? p.tiers : [{ min: 1, unit: p.samplePrice }, ...(p.moq ? [{ min: p.moq, unit: p.moqPrice }] : [])];
  const moq = p.moq ?? tiers[1]?.min ?? null;
  const [units, setUnits] = useState(moq ?? 1);
  const ti = tiers.reduce((at, t, i) => (units >= t.min ? i : at), 0);
  const unit = tiers[ti]?.unit ?? null;
  const setU = (n: number) => setUnits(Math.max(1, Math.min(99999, Math.floor(n) || 1)));
  const off = offPct(p);

  const shots = p.images.filter((i) => i.src).map((i) => ({ src: i.src!, alt: `${brand.name} ${p.name}` }));
  const specs = [
    !!p.keyActives?.length && { k: "Key actives", v: p.keyActives!.join(", ") },
    p.forText && { k: "For", v: p.forText },
    p.volume && p.volume !== "Set" && { k: "Size", v: p.volume },
    p.category === "Sets" && { k: "Type", v: "Set" },
    p.msrp != null && { k: "Retail price", v: `${usd(p.msrp)} suggested` },
    moq && { k: "Minimum order", v: `${num(moq)} units` },
    p.madeIn && { k: "Made in", v: p.madeIn },
    p.ingredients && { k: "Ingredients", v: p.ingredients, inci: true },
  ].filter((r): r is { k: string; v: string; inci?: boolean } => !!r);

  return (
    <article className="pdp">
      <div className="wrap">
        <div className="pdp__bar">
          <Link href={`/brands/${brand.slug}`} className="pdp__back">← All {brand.name}</Link>
        </div>

        <div className="pdp__top">
          {shots.length ? <Gallery shots={shots} /> : <figure className="gallery"><div className="gallery__main" /></figure>}

          <div className="pdp__info">
            <div className="pdp__title">
              <Link href={`/brands/${brand.slug}`} className="pdp__brand" title={`All products from ${brand.name}`}>
                {brand.logo && <img src={brand.logo} alt="" className="pdp__brandlogo" />}
                <span>{brand.name}</span>
              </Link>
              <h1 className="pdp__name">{p.name}</h1>
              {/* Retail price is public, like on the shelf; the deal is how far the sample sits below it */}
              {p.msrp != null && (
                <p className="pdp__msrp">
                  <span>Retail <b className="mono">{usd(p.msrp)}</b></span>
                  {off != null && off > 0 && <span className="card__off">Sample {off}% below retail</span>}
                </p>
              )}
            </div>

            <div className="pricing">
              <span className="eyebrow">Wholesale price by quantity</span>
              <ul className="pricing__tiers">
                {tiers.map((t, i) => {
                  const next = tiers[i + 1];
                  const open = signedIn || i === 0;
                  return (
                    <li
                      key={t.min}
                      className={`${i === 0 ? "is-sample" : ""} ${signedIn && i === ti ? "is-on" : ""}`}
                      onClick={signedIn ? () => setU(t.min) : undefined}
                    >
                      <span className="pricing__qty">
                        <span className="mono">{i === 0 ? "1" : `${num(t.min)}${next ? `–${num(next.min - 1)}` : "+"}`}</span>
                        <small>{i === 0 ? "sample · 1 per product" : t.min === moq ? "minimum order" : "units"}</small>
                      </span>
                      {open ? (
                        <span className="pricing__unit mono">{usd(t.unit)}<small>/ unit</small></span>
                      ) : (
                        // A placeholder, not the real figure blurred, so the price never reaches the page source.
                        <span className="pricing__unit pricing__unit--hidden mono" aria-label="Sign in to see the price">
                          <Lock /><span aria-hidden="true">$00.00</span><small>/ unit</small>
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>

              {signedIn ? (
                <div className="pricing__calc">
                  <label className="field">
                    <span className="eyebrow">Quantity</span>
                    <input type="number" min={1} value={units} onChange={(e) => setU(+e.target.value)} />
                  </label>
                  <div className="pricing__total">
                    <span className="muted small">{num(units)} × {usd(unit)}</span>
                    <b className="mono">{unit != null ? usd(units * unit) : "$[__]"}</b>
                  </div>
                </div>
              ) : (
                <p className="muted small">
                  Samples are 1 unit per product.{" "}
                  <button type="button" className="link" onClick={() => signIn(DEMO_EMAIL)}>Sign in</button>
                  {moq ? ` for prices from ${num(moq)} units.` : " for wholesale prices."}
                </p>
              )}

              <div className="pdp__cta">
                <button className="btn btn--solid" onClick={() => openWith(`${brand.name} — ${p.name}${signedIn ? ` · ${num(units)} units` : ""}`)}>
                  Request a quote
                </button>
                {p.samplePrice != null && (
                  <button className={`btn btn--ghost btn--plain ${added ? "is-added" : ""}`} onClick={() => toggle(p.id)} aria-pressed={added}>
                    {added ? "✓ In your sample box" : `Sample 1 unit · ${usd(p.samplePrice)}`}
                  </button>
                )}
              </div>
              <button type="button" className="pdp__ask" onClick={() => setAsking(true)}>
                <span>Need more detail? Ask the brand team directly.</span>
                <span className="pdp__ask-arrow mono">→</span>
              </button>
              <ul className="pdp__assure">
                <li>Ships from Korea with export documents</li>
                <li>Free shipping at any 5 samples</li>
              </ul>
            </div>
          </div>
        </div>

        {!!brand.youtube?.length && <VideoStrip videos={brand.youtube} brandName={brand.name} />}

        <section className="pdp__sec details">
          <div className="details__text">
            <span className="eyebrow">About the product</span>
            <p className="details__about">
              {p.about ?? `${p.keyActives?.length ? `Made with ${p.keyActives.slice(0, 2).join(" and ")}. ` : ""}Full ingredients, specifications and certifications come straight from ${brand.name}, on request.`}
            </p>
            {!p.about && <button type="button" className="link small details__ask" onClick={() => setAsking(true)}>Ask the brand team for the spec sheet →</button>}
          </div>
          <dl className="details__specs">
            {specs.map((s) => (
              <div key={s.k}><dt>{s.k}</dt><dd className={s.inci ? "details__inci" : undefined}>{s.v}</dd></div>
            ))}
          </dl>
        </section>

        {!!siblings.length && (
          <section className="pdp__sec">
            <div className="pdp__sechead">
              <span className="eyebrow">More from {brand.name}</span>
              <Link href={`/brands/${brand.slug}`} className="pdp__all">
                All {siblings.length + 1} products from {brand.name} <span className="mono">→</span>
              </Link>
            </div>
            <div className="grid">
              {siblings.slice(0, 4).map((s, i) => <KbProductCard key={s.id} p={s} brandName={brand.name} index={i} />)}
            </div>
          </section>
        )}

        {/* Kept quiet: no score summary, only what buyers wrote */}
        <section className="pdp__sec" id="reviews">
          <div className="pdp__sechead">
            <span className="eyebrow">Reviews</span>
            <div className="pdp__sechead-r"><p className="muted">Reviews from buyers who ordered {p.name}.</p></div>
          </div>
          <p className="muted">No reviews yet for {p.name}.</p>
        </section>
      </div>

      <AskProduct p={productById(p.id)} b={brandById(brand.slug)} open={asking} onClose={() => setAsking(false)} />
    </article>
  );
}
