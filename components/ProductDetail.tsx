"use client";

import { useState } from "react";
import Link from "next/link";
import { FREE_SHIPPING_SKUS, PRODUCTS, Product, brandById, money, productsOf } from "@/lib/data";
import { REGION_DOC, REGION_NAME, Review, detailOf, multiple, ratingSummary, reviewsOf, tierFor } from "@/lib/detail";
import Photo from "./Photo";
import ProductCard from "./ProductCard";
import { Progress, shippingNote, useSamples } from "./SampleBox";
import { useRequest } from "./RequestBrand";

const pct = (n: number) => `${Math.round(n)}%`;
const x = (n: number) => `${n.toFixed(2)}×`;
const num = (n: number) => n.toLocaleString("en-US");

export default function ProductDetail({ p }: { p: Product }) {
  const b = brandById(p.brandId);
  const d = detailOf(p);
  const reviews = reviewsOf(p);
  const sum = ratingSummary(reviews);
  const siblings = productsOf(b.id).filter((s) => s.id !== p.id);
  const pairs = PRODUCTS.filter((s) => s.brandId !== b.id && s.category === p.category).slice(0, 4);

  const { has, toggle, items } = useSamples();
  const { openWith } = useRequest();
  const added = has(p.id);

  const [units, setUnits] = useState(b.moq);
  const tier = tierFor(d.tiers, units);
  const subtotal = units * tier.unit;
  const revenue = units * p.msrp;
  const margin = (p.msrp - tier.unit) / p.msrp;

  const quote = () => openWith(`${b.name} — ${p.name} · ${num(units)} units`);
  const setU = (n: number) => setUnits(Math.max(1, Math.min(99999, Math.floor(n) || 1)));

  return (
    <article className="pdp">
      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/#collection">Collection</Link>
          <span>/</span>
          <Link href="/#collection">{p.category}</Link>
          <span>/</span>
          <Link href="/#brands">{b.name}</Link>
        </nav>

        {/* ── Top: one photo, one column of facts ── */}
        <div className="pdp__top">
          <figure className="pdp__photo">
            {p.badge && <span className={`card__badge ${p.badge === "Hidden gem" ? "card__badge--gem" : ""}`}>{p.badge}</span>}
            <Photo p={p} priority sizes="(max-width: 860px) 100vw, 50vw" />
          </figure>

          <div className="pdp__info">
            <span className="eyebrow">
              <span className={`tier ${b.tier === "gem" ? "tier--gem" : ""}`}>{b.name}</span> · {p.category} · {p.size}
            </span>
            <h1 className="pdp__name">{p.name}</h1>
            <p className="pdp__about">{d.about}</p>
            <p className="pdp__claims">{d.claims.join("  ·  ")}</p>

            <dl className="pdp__price">
              <div><dt>Wholesale</dt><dd>{money(p.wholesale)}<small>per unit, from 1</small></dd></div>
              <div><dt>MSRP</dt><dd>{money(p.msrp)}<small>suggested retail</small></dd></div>
              <div><dt>Multiple</dt><dd>{x(multiple(p.msrp, p.wholesale))}<small>{pct(margin * 100)} gross margin</small></dd></div>
            </dl>

            <div className="pdp__cta">
              <button className={`btn ${added ? "btn--ghost" : "btn--solid"} btn--plain pdp__sample`} onClick={() => toggle(p.id)} aria-pressed={added}>
                {added ? <><i className="pdp__tick">✓</i> In your sample box <em>Remove</em></> : <>Sample 1 unit <em>{money(p.wholesale)} wholesale</em></>}
              </button>
              <button className="btn btn--ghost" onClick={quote}>Request a wholesale quote</button>
            </div>
            <p className="pdp__shipnote">
              <Progress count={items.length} />
              <span>{shippingNote(items.length)}. {items.length}/{FREE_SHIPPING_SKUS} SKUs in your box.</span>
            </p>

            <ul className="pdp__stats">
              <li><b>{b.moq} units</b><span>MOQ per SKU after sampling</span></li>
              <li><b>{d.logistics.leadWeeks}</b><span>Lead time from PO</span></li>
              <li><b>{pct(d.signals.reorderRate)}</b><span>of buyers reorder this SKU</span></li>
            </ul>
          </div>
        </div>

        {/* ── Pricing by volume ── */}
        <section className="pdp__sec" id="pricing">
          <div className="pdp__sechead">
            <div>
              <span className="eyebrow">Pricing by volume</span>
              <h2 className="h3">Unit price steps down with quantity.</h2>
            </div>
            <p className="muted">All prices FOB Seoul, USD. Sample price equals the opening-order price: what you test is what you pay.</p>
          </div>

          <div className="pdp__pricing">
            <table className="tiers">
              <thead>
                <tr><th>Tier</th><th>From</th><th>Unit price</th><th>vs. sample</th><th>Multiple at MSRP</th><th>Line total at minimum</th></tr>
              </thead>
              <tbody>
                {d.tiers.map((t) => (
                  <tr key={t.label} className={t === tier ? "is-on" : ""} onClick={() => setU(t.minUnits)}>
                    <td><span className="tiers__label">{t.label}</span>{t === tier && <span className="tiers__pin">Your tier</span>}</td>
                    <td className="mono">{num(t.minUnits)} {t.minUnits === 1 ? "unit" : "units"}</td>
                    <td className="mono tiers__unit">{money(t.unit)}</td>
                    <td className="mono">{t.off ? `−${t.off}%` : "—"}</td>
                    <td className="mono">{x(multiple(p.msrp, t.unit))}</td>
                    <td className="mono">{money(t.unit * t.minUnits)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <aside className="calc">
              <span className="eyebrow">Estimate an order</span>
              <div className="calc__qty">
                <button onClick={() => setU(units - b.moq)} aria-label={`Decrease by ${b.moq}`}>−</button>
                <input
                  type="number"
                  min={1}
                  value={units}
                  onChange={(e) => setU(Number(e.target.value))}
                  aria-label="Units"
                />
                <button onClick={() => setU(units + b.moq)} aria-label={`Increase by ${b.moq}`}>+</button>
              </div>
              <div className="calc__presets">
                {d.tiers.slice(1).map((t) => (
                  <button key={t.label} className={units === t.minUnits ? "is-on" : ""} onClick={() => setU(t.minUnits)}>{num(t.minUnits)}</button>
                ))}
              </div>
              <dl className="calc__rows">
                <div><dt>Tier</dt><dd>{tier.label}</dd></div>
                <div><dt>Unit price</dt><dd className="mono">{money(tier.unit)}</dd></div>
                <div><dt>Cartons</dt><dd className="mono">{Math.ceil(units / d.logistics.cartonUnits)} × {d.logistics.cartonUnits}</dd></div>
                <div className="calc__total"><dt>Order subtotal</dt><dd className="mono">{money(subtotal)}</dd></div>
                <div><dt>Revenue at MSRP</dt><dd className="mono">{money(revenue)}</dd></div>
                <div><dt>Gross margin</dt><dd className="mono">{money(revenue - subtotal)} <span className="muted">({pct(margin * 100)})</span></dd></div>
              </dl>
              <button className="btn btn--solid btn--block" onClick={quote}>Request quote for {num(units)} units</button>
              <p className="muted small">Shipping, duties and payment terms confirmed in the quote. Net 30 available after the second order.</p>
            </aside>
          </div>
        </section>

        {/* ── Trade terms · documentation · formula ── */}
        <section className="pdp__sec pdp__facts">
          <div className="facts">
            <h3 className="facts__h">Trade terms &amp; logistics</h3>
            <dl>
              <Fact k="Minimum order" v={`${b.moq} units per SKU`} />
              <Fact k="Inner case" v={`${d.logistics.casePack} units`} />
              <Fact k="Master carton" v={`${d.logistics.cartonUnits} units`} />
              <Fact k="Carton size" v={`${d.logistics.cartonCm} cm · ${d.logistics.cartonKg} kg`} />
              <Fact k="Availability" v={d.logistics.readiness} />
              <Fact k="Lead time" v={`${d.logistics.leadWeeks} after PO`} />
              <Fact k="Incoterms" v="FOB Seoul · EXW on request" />
              <Fact k="Payment" v="T/T in advance · Net 30 from 2nd order" />
              <Fact k="Origin" v={d.logistics.origin} />
              <Fact k="HS code" v={d.logistics.hsCode} />
              <Fact k="Shelf life" v={`${d.logistics.shelfMonths} months · PAO ${d.logistics.paoMonths}M`} />
            </dl>
          </div>

          <div className="facts">
            <h3 className="facts__h">Documentation</h3>
            <p className="facts__p">Registered and ready to ship into these markets. Documents are prepared before your first wholesale order.</p>
            <ul className="docs">
              {d.registered.map((r) => (
                <li key={r}><i /><span>{REGION_NAME[r]}</span><small>{REGION_DOC[r]}</small></li>
              ))}
            </ul>
            <span className="eyebrow facts__sub">Certifications &amp; testing</span>
            <ul className="chips">
              {d.certs.map((c) => <li key={c}>{c}</li>)}
            </ul>
            {b.exclusiveOpen.length > 0 && (
              <p className="facts__p facts__excl">
                <b>Exclusivity open</b> in {b.exclusiveOpen.map((r) => REGION_NAME[r]).join(", ")}. Ask in your quote.
              </p>
            )}
          </div>

          <div className="facts">
            <h3 className="facts__h">Formula</h3>
            <span className="eyebrow facts__sub facts__sub--first">Key actives</span>
            <ul className="actives">
              {d.actives.map((a) => <li key={a}>{a}</li>)}
            </ul>
            <span className="eyebrow facts__sub">INCI (abridged)</span>
            <p className="facts__inci">{d.inci}</p>
            <p className="facts__p">Full INCI, MSDS and stability data available with the quote. On market since {d.launched}.</p>
          </div>
        </section>

        {/* ── Support + signals ── */}
        <section className="pdp__sec pdp__support">
          <div className="support">
            <span className="eyebrow">Marketing support from {b.name}</span>
            <ul className="support__list">
              {b.support.map((s) => (
                <li key={s}><b>{s}</b><span>{SUPPORT[s] ?? ""}</span></li>
              ))}
            </ul>
          </div>
          <div className="signals">
            <span className="eyebrow">Buyer signals</span>
            <ul>
              <li><b>{pct(d.signals.reorderRate)}</b><span>reorder within 90 days</span></li>
              <li><b>{num(d.signals.firstOrder)}</b><span>units, median first order</span></li>
              <li><b>{d.signals.topChannels.join(" · ")}</b><span>channels where it sells best</span></li>
            </ul>
          </div>
        </section>

        {/* ── More from the brand ── */}
        <section className="pdp__sec">
          <div className="pdp__sechead">
            <div>
              <span className="eyebrow">More from {b.name}</span>
              <h2 className="h3">{b.tagline}.</h2>
            </div>
            <Link href="/#brands" className="link small">All brands</Link>
          </div>
          <div className="brandrow">
            <div className="brandrow__card">
              <span className={`eyebrow tier ${b.tier === "gem" ? "tier--gem" : ""}`}>{b.tier === "icon" ? "K-Beauty icon" : "Hidden gem"}</span>
              <h3 className="serif">{b.name}</h3>
              <dl className="brandrow__meta">
                <div><dt>Based in</dt><dd>{b.city} · est. {b.founded}</dd></div>
                <div><dt>MOQ</dt><dd>{b.moq} units / SKU</dd></div>
                <div><dt>Avg. multiple</dt><dd>{b.margin.toFixed(1)}×</dd></div>
                <div><dt>Sells through</dt><dd>{b.channels.slice(0, 3).map(label).join(", ")}</dd></div>
              </dl>
              <button className="btn btn--ghost" onClick={() => openWith(`${b.name} — full line sheet`)}>Request the line sheet</button>
            </div>
            <div className="brandrow__grid">
              {siblings.map((s, i) => <ProductCard key={s.id} p={s} index={i} />)}
            </div>
          </div>

          {pairs.length > 0 && (
            <div className="pairs">
              <div className="pairs__head">
                <span className="eyebrow">Pairs well in a sample box</span>
                <p className="muted small">Other {p.category.toLowerCase()} buyers test alongside this one. Reach {FREE_SHIPPING_SKUS} SKUs and shipping is complimentary.</p>
              </div>
              <div className="grid">
                {pairs.map((s, i) => <ProductCard key={s.id} p={s} index={i} />)}
              </div>
            </div>
          )}
        </section>

        {/* ── Buyer reviews ── */}
        <section className="pdp__sec reviews" id="reviews">
          <div className="pdp__sechead">
            <div>
              <span className="eyebrow">Buyer reviews</span>
              <h2 className="h3">What buyers saw after ordering.</h2>
            </div>
            <p className="muted">Only buyers with a verified wholesale order can review. Reorders are counted from KLOW purchase records.</p>
          </div>

          <div className="reviews__grid">
            <aside className="reviews__sum">
              <div className="reviews__avg">
                <b>{sum.avg.toFixed(1)}</b>
                <div>
                  <Squares n={Math.round(sum.avg)} />
                  <span className="muted small">{sum.count} verified {sum.count === 1 ? "review" : "reviews"} · {sum.reorders} reordered</span>
                </div>
              </div>
              <ul className="reviews__dist">
                {sum.dist.map((row) => (
                  <li key={row.n}>
                    <span className="mono">{row.n}</span>
                    <i><b style={{ width: sum.count ? `${(row.count / sum.count) * 100}%` : 0 }} /></i>
                    <span className="mono muted">{row.count}</span>
                  </li>
                ))}
              </ul>
              <ul className="reviews__tags">
                {Array.from(new Set(reviews.flatMap((r) => r.tags))).map((t) => <li key={t}>{t}</li>)}
              </ul>
            </aside>

            <ul className="reviews__list">
              {reviews.map((r) => <ReviewItem key={r.id} r={r} />)}
            </ul>
          </div>
        </section>
      </div>
    </article>
  );
}

/* ───────────── Pieces ───────────── */

const SUPPORT: Record<string, string> = {
  Imagery: "Product and lifestyle photography in 1:1 and 4:5, white-background cut-outs, ready for marketplaces.",
  "Launch content": "Launch kit with copy, claims sheet and short-form video for the first 30 days.",
  "Ad co-funding": "Matched paid-media budget on the first two orders, settled against the invoice.",
  "Influencer seeding": "Seeding units allocated to your market's creators at no charge.",
  "Retail displays": "Counter displays and testers shipped with the opening order.",
  "Staff training": "Live training for your team plus a protocol deck for treatment rooms.",
  "Protocol guides": "Step-by-step professional protocols for in-room use and retail follow-up.",
};

const label = (c: string) =>
  ({ distributor: "distributors", online: "online retail", marketplace: "marketplaces", store: "boutiques", salon: "salons" } as Record<string, string>)[c] ?? c;

function Fact({ k, v }: { k: string; v: string }) {
  return <div className="fact"><dt>{k}</dt><dd>{v}</dd></div>;
}

function Squares({ n }: { n: number }) {
  return (
    <span className="squares" aria-label={`${n} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => <i key={i} className={i < n ? "on" : ""} />)}
    </span>
  );
}

function ReviewItem({ r }: { r: Review }) {
  const date = new Date(r.date).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  return (
    <li className="review">
      <div className="review__head">
        <Squares n={r.rating} />
        <span className="review__verified"><i />Verified order · {num(r.units)} units{r.reorders > 1 ? ` · ${r.reorders} reorders` : ""}</span>
        <span className="muted small review__date">{date}</span>
      </div>
      <h3 className="review__title">{r.title}</h3>
      <p className="review__text">{r.text}</p>
      <div className="review__foot">
        <span><b>{r.company}</b> · {r.buyer} · {r.country}</span>
        <ul className="review__tags">{r.tags.map((t) => <li key={t}>{t}</li>)}</ul>
      </div>
    </li>
  );
}
