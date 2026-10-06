"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FREE_SHIPPING_SKUS, brandById, money, productById } from "@/lib/data";
import { COUNTRIES, loadCheckout, saveCheckout, totals } from "@/lib/buyer";
import { Progress, shippingNote, useSamples } from "./SampleBox";
import { useBuyer } from "./Buyer";
import Photo from "./Photo";

export default function Checkout() {
  const { items, toggle } = useSamples();
  const { buyer, ready } = useBuyer();
  const router = useRouter();
  const [country, setCountry] = useState("US");
  const [note, setNote] = useState("");
  const [hydrated, setHydrated] = useState(false);

  // Restore a destination picked earlier, else default to the buyer's country.
  useEffect(() => {
    if (!ready) return;
    const saved = loadCheckout();
    setCountry(saved.country ?? buyer?.country ?? "US");
    setNote(saved.note ?? "");
    setHydrated(true);
  }, [ready, buyer]);

  useEffect(() => {
    if (hydrated) saveCheckout({ country, note });
  }, [country, note, hydrated]);

  const n = items.length;
  const t = totals(items);
  const brands = Array.from(new Set(items.map((id) => productById(id).brandId)));

  const next = () => router.push(buyer ? "/checkout/pay" : "/signup?next=/checkout/pay");

  if (!n) {
    return (
      <div className="page wrap">
        <div className="empty">
          <span className="eyebrow">Sample box</span>
          <h3 className="serif">Your sample box is empty.</h3>
          <p className="muted">Pick any product from the collection — a single unit, billed at wholesale price. Five SKUs ship free.</p>
          <Link href="/#collection" className="btn btn--solid">Browse the collection</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page wrap">
      <header className="page__head">
        <span className="eyebrow">Sample box · Step 1 of 2</span>
        <h1 className="h2">Review your samples</h1>
        <p className="muted">One unit of each, at the wholesale price. We pack everything together in Seoul and ship it as one parcel.</p>
      </header>

      <div className="split">
        <section className="split__main">
          <div className="block">
            <div className="block__head">
              <h2 className="serif">Products <sup className="mono">{n}</sup></h2>
              <Link href="/#collection" className="link small">Add more</Link>
            </div>
            <ul className="lines">
              {items.map((id) => {
                const p = productById(id);
                const b = brandById(p.brandId);
                return (
                  <li key={id} className="line">
                    <div className="line__thumb"><Photo p={p} sizes="88px" /></div>
                    <div className="line__info">
                      <span className="eyebrow">{b.name}</span>
                      <span className="line__name">{p.name}</span>
                      <span className="muted small">1 unit · {p.size} · MSRP {money(p.msrp)}</span>
                    </div>
                    <div className="line__price">
                      <span className="mono">{money(p.sample)}</span>
                      <button className="link small" onClick={() => toggle(id)}>Remove</button>
                    </div>
                  </li>
                );
              })}
            </ul>
            <p className="muted small block__foot">
              {brands.length} {brands.length === 1 ? "brand" : "brands"} · each brand confirms stock before we pack.
            </p>
          </div>

          <div className="block">
            <div className="block__head">
              <h2 className="serif">Ship to</h2>
            </div>
            <div className="fields fields--2">
              <label className="field">
                <span className="eyebrow">Destination country *</span>
                <select value={country} onChange={(e) => setCountry(e.target.value)}>
                  {COUNTRIES.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
                </select>
              </label>
              <div className="field">
                <span className="eyebrow">Full address</span>
                <p className="field__static muted">
                  {buyer ? <>Taken from your buyer profile — <Link href="/account" className="link">edit</Link>.</> : "Collected after buyer verification on the next step."}
                </p>
              </div>
            </div>
            <label className="field">
              <span className="eyebrow">Note to the brands</span>
              <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} placeholder="Shade preferences, retail context, launch timing…" />
            </label>
          </div>
        </section>

        <aside className="summary">
          <span className="eyebrow">Order summary</span>
          <div className="summary__ship">
            <Progress count={n} />
            <p>{shippingNote(n)}</p>
          </div>
          <div className="summary__rows">
            <div className="row"><span>{n} {n === 1 ? "sample" : "samples"} at wholesale</span><span>{money(t.subtotal)}</span></div>
            <div className="row"><span>Shipping from Seoul</span><span>{t.free ? "Complimentary" : money(t.shipping)}</span></div>
            <div className="row row--total"><span>Total</span><span>{money(t.total)} <small>USD</small></span></div>
          </div>
          <button className="btn btn--solid btn--block" onClick={next}>
            {buyer ? "Continue to payment" : "Verify & pay"}
          </button>
          <ul className="summary__notes">
            <li>Billed in USD via Eximbay secure checkout.</li>
            <li>{buyer ? `Signed in as ${buyer.company}.` : "First time? Buyer verification takes about two minutes."}</li>
            <li>Any {FREE_SHIPPING_SKUS} SKUs ship free.</li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
