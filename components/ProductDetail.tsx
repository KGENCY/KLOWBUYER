"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Product, brandById, money, productsOf } from "@/lib/data";
import { LANGS, Review, Shot, certsOf, copyOf, photosOf, reviewsOf, tierIndexFor, tiersFor, translateReview } from "@/lib/detail";
import { photoPos } from "./Photo";
import ProductCard from "./ProductCard";
import AskProduct from "./AskProduct";
import { useSamples } from "./SampleBox";
import { useRequest } from "./RequestBrand";
import { DEMO_EMAIL, useBuyer } from "./Buyer";

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
  const { buyer, signIn } = useBuyer();
  const signedIn = !!buyer;
  const added = has(p.id);
  const [asking, setAsking] = useState(false);
  const [lang, setLang] = useState<string | null>(null); // review translation
  const [askFirst, setAskFirst] = useState<string | undefined>();
  // /products/p01?ask=1 opens the question thread; ?ask=<question> opens it and asks that question (used from emails and the account page).
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const l = sp.get("lang"); // ?lang=ko shows reviews translated
    if (l && LANGS.some((x) => x.code === l)) setLang(l);
    const q = sp.get("ask");
    if (q === null) return;
    if (q && q !== "1") setAskFirst(q);
    setAsking(true);
  }, []);

  const [units, setUnits] = useState(b.moq);
  const ti = tierIndexFor(tiers, units);
  const tier = tiers[ti];
  const total = units * tier.unit;
  const setU = (n: number) => setUnits(Math.max(1, Math.min(99999, Math.floor(n) || 1)));
  const quote = () => openWith(`${b.name} — ${p.name} · ${num(units)} units`);

  return (
    <article className="pdp">
      <div className="wrap">
        {/* One line across both columns: the way back on the left, the brand over the product on the right */}
        <div className="pdp__bar">
          <Link href="/#collection" className="pdp__back">← Collection</Link>
          <Link href={`/brands/${b.id}`} className="pdp__brand eyebrow" title={`All products from ${b.name}`}>{b.name} →</Link>
        </div>

        {/* ── Photo · pricing ── */}
        <div className="pdp__top">
          <Gallery shots={photosOf(p, `${b.name} ${p.name}`, photoPos(p))} />

          <div className="pdp__info">
            <h1 className="pdp__name">{p.name}</h1>
            {/* The consumer shelf price, entered per product at listing — public, unlike the wholesale tiers */}
            <p className="msrp">
              <span className="msrp__k eyebrow">MSRP</span>
              <b className="mono">{money(p.msrp)}</b>
              <span className="muted">Suggested retail price</span>
              {signedIn && <span className="msrp__margin mono">{(p.msrp / tiers[1].unit).toFixed(1)}× at MOQ price</span>}
            </p>
            {/* What the brand does for the buyer, before any number */}
            <p className="support" title={b.support.join(", ")}><i aria-hidden="true" />Marketing support available from {b.name}.</p>

            {/* Badges fill the column edge to edge: one row of n up to 5, two balanced rows beyond. Mobile narrows to 2–3 per row. */}
            <ul
              className="certs"
              aria-label="Certifications"
              style={{ "--n": certs.length <= 5 ? certs.length : Math.ceil(certs.length / 2), "--nm": certs.length <= 3 ? certs.length : certs.length === 4 ? 2 : 3 } as React.CSSProperties}
            >
              {certs.map((c) => (
                <li key={c.code}><b>{c.code}</b><span>{c.note}</span></li>
              ))}
            </ul>

            <div className="pricing">
              <span className="eyebrow">Wholesale price by quantity</span>
              <ul className={`pricing__tiers ${signedIn ? "" : "is-locked"}`}>
                {tiers.map((t, i) => (
                  <li key={t.minUnits} className={signedIn && i === ti ? "is-on" : ""} onClick={signedIn ? () => setU(t.minUnits) : undefined}>
                    <span className="pricing__qty">
                      <span className="mono">{num(t.minUnits)}{i < tiers.length - 1 ? `–${num(tiers[i + 1].minUnits - 1)}` : "+"}</span>
                      <small>{i === 0 ? "sample" : i === 1 ? "minimum order" : "units"}</small>
                    </span>
                    {signedIn ? (
                      <span className="pricing__unit mono">{money(t.unit)}<small>/ unit</small></span>
                    ) : (
                      // A placeholder, not the real figure blurred, so the price never reaches the page source.
                      <span className="pricing__unit pricing__unit--hidden mono" aria-label="Sign in to see the price">
                        <Lock /><span aria-hidden="true">$00.00</span><small>/ unit</small>
                      </span>
                    )}
                  </li>
                ))}
              </ul>

              {!signedIn ? (
                <div className="gate">
                  <b className="gate__title">Wholesale prices are for registered buyers.</b>
                  <ul className="gate__list">
                    <li>See the unit price at every quantity</li>
                    <li>Order directly at MOQ — no quote round-trip</li>
                    <li>Sample from 1 unit at wholesale price</li>
                  </ul>
                  <div className="pdp__cta">
                    <Link href={`/signup?next=${encodeURIComponent(`/products/${p.id}`)}`} className="btn btn--solid">Create a buyer account</Link>
                    <button className="btn btn--ghost btn--plain" onClick={() => signIn(DEMO_EMAIL)}>Sign in</button>
                  </div>
                  <span className="muted small">Free for businesses. Takes about two minutes.</span>
                </div>
              ) : (<>
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
              </>)}

              <button type="button" className="pdp__ask" onClick={() => setAsking(true)}>
                <span>Need more detail? Ask the brand team directly.</span>
                <span className="pdp__ask-arrow mono">→</span>
              </button>
            </div>
          </div>
        </div>

        <AskProduct p={p} b={b} open={asking} first={askFirst} onClose={() => setAsking(false)} />

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
              <Link href={`/brands/${b.id}`} className="pdp__all">All {siblings.length + 1} products from {b.name} <span className="mono">→</span></Link>
            </div>
            <div className="grid">
              {siblings.map((s, i) => <ProductCard key={s.id} p={s} index={i} />)}
            </div>
          </section>
        )}

        {/* ── Buyer reviews ── */}
        <section className="pdp__sec" id="reviews">
          <div className="pdp__sechead">
            <span className="eyebrow">Buyer reviews</span>
            <div className="pdp__sechead-r">
              <p className="muted">Reviews from verified buyers who ordered through KLOW.</p>
              <Translate lang={lang} onChange={setLang} />
            </div>
          </div>

          <ul className="reviews">
            {reviews.map((r) => <ReviewItem key={r.id} r={r} lang={lang} />)}
          </ul>
        </section>
      </div>
    </article>
  );
}

const SLIDE_MS = 3000;

/** Main photo with the brand's other shots beneath it. Advances every 3 s; pauses while hovered. */
function Gallery({ shots }: { shots: Shot[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tick, setTick] = useState(0); // restarts the timer when the buyer picks a shot

  useEffect(() => {
    if (paused || shots.length < 2) return;
    const t = setInterval(() => setI((x) => (x + 1) % shots.length), SLIDE_MS);
    return () => clearInterval(t);
  }, [paused, shots.length, tick]);

  const pick = (n: number) => { setI(n); setTick((t) => t + 1); };
  const cur = shots[i] ?? shots[0];

  return (
    <figure className="gallery" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="gallery__main">
        <img key={cur.src} src={cur.src} alt={cur.alt} style={{ objectPosition: cur.pos ?? "50% 50%" }} loading="eager" decoding="async" sizes="(max-width: 860px) 100vw, 50vw" />
        {shots.length > 1 && (
          <span className="gallery__count mono" aria-live="polite">{String(i + 1).padStart(2, "0")} / {String(shots.length).padStart(2, "0")}</span>
        )}
      </div>
      {shots.length > 1 && (
        <ul className="gallery__thumbs" aria-label="Product photos">
          {shots.map((s, n) => (
            <li key={s.src}>
              <button type="button" className={n === i ? "is-on" : ""} onClick={() => pick(n)} aria-label={s.alt} aria-current={n === i}>
                <img src={s.src} alt="" style={{ objectPosition: s.pos ?? "50% 50%" }} loading="lazy" decoding="async" />
                {n === i && !paused && <i className="gallery__timer" key={`${n}-${tick}`} style={{ animationDuration: `${SLIDE_MS}ms` }} />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </figure>
  );
}

function Lock() {
  return (
    <svg className="lock" width="11" height="13" viewBox="0 0 11 13" aria-hidden="true">
      <rect x="0.75" y="5.75" width="9.5" height="6.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2.75 5.75V3.5a2.75 2.75 0 0 1 5.5 0v2.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/** Five stars, filled to a fraction. */
function Stars({ value }: { value: number }) {
  const pct = Math.max(0, Math.min(5, value)) / 5 * 100;
  return (
    <span className="stars" role="img" aria-label={`${value.toFixed(1)} out of 5`}>
      <span aria-hidden="true">★★★★★</span>
      <span className="stars__on" aria-hidden="true" style={{ width: `${pct}%` }}>★★★★★</span>
    </span>
  );
}

/** "Translate" with a language menu; once picked it reads "Translated to X · Show original". */
function Translate({ lang, onChange }: { lang: string | null; onChange: (l: string | null) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const away = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", away);
    return () => document.removeEventListener("mousedown", away);
  }, [open]);
  const current = LANGS.find((l) => l.code === lang);

  return (
    <div className="translate" ref={ref}>
      {current ? (
        <span className="translate__on">
          Translated to <b>{current.label}</b>
          <button type="button" className="link" onClick={() => onChange(null)}>Show original</button>
        </span>
      ) : (
        <button type="button" className="translate__btn" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-haspopup="listbox">
          <span className="translate__icon" aria-hidden="true">文A</span>Translate
        </button>
      )}
      {open && (
        <ul className="translate__menu" role="listbox" aria-label="Translate reviews to">
          {LANGS.map((l) => (
            <li key={l.code}>
              <button type="button" role="option" aria-selected={lang === l.code} onClick={() => { onChange(l.code); setOpen(false); }}>{l.label}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ReviewItem({ r, lang }: { r: Review; lang: string | null }) {
  const date = new Date(r.date).toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const t = lang ? translateReview(r, lang) : null;
  const langLabel = LANGS.find((l) => l.code === lang)?.label;
  return (
    <li className="review">
      <div className="review__side">
        <div className="review__score">
          <Stars value={r.rating} />
          <b className="mono">{r.rating}.0</b>
        </div>
        <span className="review__verified">✓ Verified order</span>
        <ul className="review__meta">
          <li>{r.business}</li>
          <li>{r.country}</li>
          <li>{num(r.units)} units{r.orders > 1 ? ` · ordered ${r.orders}×` : ""}</li>
        </ul>
      </div>
      <div className="review__body">
        <h3 className="review__title" lang={t ? lang! : "en"}>{t ? t.title : r.title}</h3>
        <p className="review__text" lang={t ? lang! : "en"}>{t ? t.text : r.text}</p>
        {lang && (
          <span className="review__xl muted small">
            {t ? "Translated from English" : `${langLabel} translation isn't connected yet · showing the original`}
          </span>
        )}
        {r.photos.length > 0 && (
          <ul className="review__photos">
            {r.photos.map((src) => (
              <li key={src}><img src={src} alt="" loading="lazy" /></li>
            ))}
          </ul>
        )}
        <time className="review__date muted small" dateTime={r.date}>{date}</time>
      </div>
    </li>
  );
}
