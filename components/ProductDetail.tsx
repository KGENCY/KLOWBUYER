"use client";

import { useState } from "react";
import Link from "next/link";
import { Product, brandById, money, productsOf } from "@/lib/data";
import { Review, avgRating, certsOf, copyOf, initials, reviewsOf, tierIndexFor, tiersFor } from "@/lib/detail";
import Photo from "./Photo";
import ProductCard from "./ProductCard";
import { useSamples } from "./SampleBox";
import { useRequest } from "./RequestBrand";

const num = (n: number) => n.toLocaleString("en-US");

export default function ProductDetail({ p }: { p: Product }) {
  const b = brandById(p.brandId);
  const copy = copyOf(p);
  const certs = certsOf(p);
  const tiers = tiersFor(p, b);
  const reviews = reviewsOf(p);
  const siblings = productsOf(b.id).filter((s) => s.id !== p.id);

  const { has, toggle } = useSamples();
  const { openWith } = useRequest();
  const added = has(p.id);

  const [units, setUnits] = useState(b.moq);
  const ti = tierIndexFor(tiers, units);
  const tier = tiers[ti];
  const total = units * tier.unit;
  const setU = (n: number) => setUnits(Math.max(1, Math.min(99999, Math.floor(n) || 1)));
  const quote = () => openWith(`${b.name} — ${p.name} · ${num(units)} units`);

  return (
    <article className="pdp">
      <div className="wrap">
        <Link href="/#collection" className="pdp__back">← Collection</Link>

        {/* ── Photo · pricing ── */}
        <div className="pdp__top">
          <figure className="pdp__photo">
            <Photo p={p} priority sizes="(max-width: 860px) 100vw, 50vw" />
          </figure>

          <div className="pdp__info">
            <span className="eyebrow">{b.name} · {p.size}</span>
            <h1 className="pdp__name">{p.name}</h1>
            <p className="pdp__msrp">MSRP {money(p.msrp)} · {(p.msrp / p.wholesale).toFixed(1)}× at wholesale</p>

            <ul className="certs" aria-label="Certifications">
              {certs.map((c) => (
                <li key={c.code}><b>{c.code}</b><span>{c.note}</span></li>
              ))}
            </ul>

            <div className="pricing">
              <span className="eyebrow">Wholesale price by quantity</span>
              <ul className="pricing__tiers">
                {tiers.map((t, i) => (
                  <li key={t.minUnits} className={i === ti ? "is-on" : ""} onClick={() => setU(t.minUnits)}>
                    <span className="pricing__qty">
                      <span className="mono">{num(t.minUnits)}{i < tiers.length - 1 ? `–${num(tiers[i + 1].minUnits - 1)}` : "+"}</span>
                      <small>{i === 0 ? "sample" : i === 1 ? "minimum order" : "units"}</small>
                    </span>
                    <span className="pricing__unit mono">{money(t.unit)}<small>/ unit</small></span>
                  </li>
                ))}
              </ul>

              <div className="pricing__calc">
                <div className="qty">
                  <button onClick={() => setU(units - 1)} aria-label="Decrease">−</button>
                  <input type="number" min={1} value={units} onChange={(e) => setU(Number(e.target.value))} aria-label="Units" />
                  <button onClick={() => setU(units + 1)} aria-label="Increase">+</button>
                </div>
                <div className="pricing__total">
                  <span className="muted small">{num(units)} × {money(tier.unit)}</span>
                  <b className="mono">{money(total)}</b>
                </div>
              </div>

              <div className="pdp__cta">
                <button className="btn btn--solid" onClick={quote}>Request a quote</button>
                <button className={`btn btn--ghost btn--plain ${added ? "is-added" : ""}`} onClick={() => toggle(p.id)} aria-pressed={added}>
                  {added ? "In your sample box" : "Sample 1 unit"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Product details ── */}
        <section className="pdp__sec details">
          <div className="details__text">
            <span className="eyebrow">About the product</span>
            <p className="details__about">{copy.about}</p>
            <ul className="details__claims">
              {copy.claims.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </div>
          <dl className="details__specs">
            <div><dt>Key actives</dt><dd>{copy.actives.join(", ")}</dd></div>
            <div><dt>For</dt><dd>{copy.use}</dd></div>
            <div><dt>Size</dt><dd>{p.size}</dd></div>
            <div><dt>Shelf life</dt><dd>{copy.shelfMonths} months unopened</dd></div>
            <div><dt>Made in</dt><dd>{b.city}, Korea · on market since {copy.launched}</dd></div>
            <div><dt>Ingredients</dt><dd className="details__inci">{copy.inci}</dd></div>
          </dl>
        </section>

        {/* ── More from the brand ── */}
        {siblings.length > 0 && (
          <section className="pdp__sec">
            <div className="pdp__sechead">
              <span className="eyebrow">More from {b.name}</span>
              <p className="muted">{b.tagline}</p>
            </div>
            <div className="grid">
              {siblings.map((s, i) => <ProductCard key={s.id} p={s} index={i} />)}
            </div>
          </section>
        )}

        {/* ── Buyer reviews ── */}
        <section className="pdp__sec">
          <div className="pdp__sechead">
            <span className="eyebrow">Buyer reviews</span>
            <p className="muted"><Squares n={Math.round(avgRating(reviews))} /> {avgRating(reviews).toFixed(1)} · {reviews.length} verified {reviews.length === 1 ? "order" : "orders"}</p>
          </div>
          <ul className="reviews">
            {reviews.map((r) => <ReviewItem key={r.id} r={r} />)}
          </ul>
        </section>
      </div>
    </article>
  );
}

function Squares({ n }: { n: number }) {
  return (
    <span className="squares" aria-label={`${n} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => <i key={i} className={i < n ? "on" : ""} />)}
    </span>
  );
}

function ReviewItem({ r }: { r: Review }) {
  const date = new Date(r.date).toLocaleDateString("en-US", { month: "long", year: "numeric" });
  return (
    <li className="review">
      <div className="review__who">
        <span className="review__avatar" aria-hidden="true">{initials(r.name)}</span>
        <div>
          <b>{r.name}</b>
          <span>{r.role}, {r.company}</span>
          <span className="muted">{r.country}</span>
        </div>
      </div>
      <div className="review__body">
        <div className="review__head">
          <Squares n={r.rating} />
          <span className="review__verified">Verified order · {num(r.units)} units</span>
          <span className="muted small">{date}</span>
        </div>
        <h3 className="review__title">{r.title}</h3>
        <p className="review__text">{r.text}</p>
        {r.photos.length > 0 && (
          <ul className="review__photos">
            {r.photos.map((src) => (
              <li key={src}><img src={src} alt="" loading="lazy" /></li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}
