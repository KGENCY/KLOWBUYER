"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { brandById, money, productById } from "@/lib/data";
import { countryName, loadCheckout, totals } from "@/lib/buyer";
import { useSamples } from "./SampleBox";
import { useBuyer } from "./Buyer";
import Photo from "./Photo";

const CONSENTS = [
  { k: "terms", label: "I agree to the Terms of Service and the sample programme conditions.", note: "One unit per SKU, billed at wholesale. Samples are for business evaluation, not resale." },
  { k: "privacy", label: "I agree to the collection and use of my personal information.", note: "Name, company, contact and delivery details — used to fulfil this request." },
  { k: "transfer", label: "I consent to the cross-border transfer of my data to Korea.", note: "Shared with the brands and the Seoul fulfilment centre to ship your parcel." },
  { k: "refund", label: "I understand the refund and customs policy.", note: "Refund in full if a brand cannot supply. Import duties in your country, if any, are yours." },
] as const;

type ConsentKey = (typeof CONSENTS)[number]["k"];

export default function Payment() {
  const { items, clear } = useSamples();
  const { buyer, ready, placeOrder } = useBuyer();
  const router = useRouter();
  const [agree, setAgree] = useState<Record<ConsentKey, boolean>>({ terms: false, privacy: false, transfer: false, refund: false });
  const [pg, setPg] = useState(false);
  const paid = useRef(false);
  const [dest, setDest] = useState<{ country?: string; note?: string }>({});

  useEffect(() => { setDest(loadCheckout()); }, []);

  // Guards — unless we have just paid and are on our way out.
  useEffect(() => {
    if (!ready || paid.current) return;
    if (!buyer) router.replace("/signup?next=/checkout/pay");
    else if (!items.length) router.replace("/checkout");
  }, [ready, buyer, items.length, router]);

  if (!ready || !buyer || !items.length) return <div className="page wrap" />;

  const t = totals(items);
  const allAgreed = CONSENTS.every((c) => agree[c.k]);
  const country = dest.country ?? buyer.country;

  const onPaid = (card: string) => {
    paid.current = true;
    const order = placeOrder(items, { country, company: buyer.company, name: buyer.name, note: dest.note }, card);
    router.replace(`/checkout/complete?order=${order.id}`);
    clear();
  };

  return (
    <div className="page wrap">
      <header className="page__head">
        <span className="eyebrow">Sample box · Step 2 of 2</span>
        <h1 className="h2">Confirm and pay</h1>
        <p className="muted">Secure card payment in USD through Eximbay. Nothing is charged until every brand confirms stock.</p>
      </header>

      <div className="split">
        <section className="split__main">
          <div className="block">
            <div className="block__head">
              <h2 className="serif">Ship to</h2>
              <Link href="/account" className="link small">Edit</Link>
            </div>
            <dl className="kv kv--3">
              <div><dt>Company</dt><dd>{buyer.company}</dd></div>
              <div><dt>Recipient</dt><dd>{buyer.name}<br /><span className="muted small">{buyer.dial} {buyer.phone}</span></dd></div>
              <div><dt>Destination</dt><dd>{countryName(country)}<br /><span className="muted small">Full address confirmed by e-mail before dispatch</span></dd></div>
            </dl>
            {dest.note && <p className="muted small block__foot">Note to brands: “{dest.note}”</p>}
          </div>

          <div className="block">
            <div className="block__head">
              <h2 className="serif">Samples <sup className="mono">{items.length}</sup></h2>
              <Link href="/checkout" className="link small">Change</Link>
            </div>
            <ul className="lines lines--compact">
              {items.map((id) => {
                const p = productById(id);
                return (
                  <li key={id} className="line">
                    <div className="line__thumb"><Photo p={p} sizes="56px" /></div>
                    <div className="line__info">
                      <span className="eyebrow">{brandById(p.brandId).name}</span>
                      <span className="line__name">{p.name}</span>
                    </div>
                    <div className="line__price"><span className="mono">{money(p.sample)}</span></div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="block">
            <div className="block__head"><h2 className="serif">Agreements</h2></div>
            <ul className="consents">
              {CONSENTS.map((c) => (
                <li key={c.k}>
                  <label className="check check--lg">
                    <input type="checkbox" checked={agree[c.k]} onChange={(e) => setAgree((a) => ({ ...a, [c.k]: e.target.checked }))} />
                    <i />
                    <span>
                      <b>{c.label}</b>
                      <small className="muted">{c.note}</small>
                    </span>
                  </label>
                </li>
              ))}
            </ul>
            <button type="button" className="link small muted" onClick={() => setAgree({ terms: true, privacy: true, transfer: true, refund: true })}>Agree to all</button>
          </div>

          <div className="block">
            <div className="block__head"><h2 className="serif">Payment method</h2></div>
            <div className="paymethod">
              <div className="paymethod__brand">
                <span className="pglogo">eximbay</span>
                <span className="muted small">Secure checkout · PCI DSS Level 1</span>
              </div>
              <ul className="paymethod__cards">
                {["VISA", "Mastercard", "AMEX", "JCB", "UnionPay", "PayPal", "Alipay+"].map((c) => <li key={c}>{c}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <aside className="summary">
          <span className="eyebrow">Total due</span>
          <div className="summary__rows">
            <div className="row"><span>Samples at wholesale</span><span>{money(t.subtotal)}</span></div>
            <div className="row"><span>Shipping from Seoul</span><span>{t.free ? "Complimentary" : money(t.shipping)}</span></div>
            <div className="row row--total"><span>Total</span><span>{money(t.total)} <small>USD</small></span></div>
          </div>
          <button className="btn btn--solid btn--block" disabled={!allAgreed} onClick={() => setPg(true)}>
            Pay {money(t.total)}
          </button>
          {!allAgreed && <p className="muted small center">Accept the four agreements above to pay.</p>}
          <ul className="summary__notes">
            <li>Charged by <b>KLOW Wholesale</b> via Eximbay, Seoul.</li>
            <li>Card statement shows <span className="mono">EXIMBAY*KLOW</span>.</li>
            <li>3-D Secure may ask your bank to confirm.</li>
          </ul>
        </aside>
      </div>

      {pg && <EximbayModal amount={t.total} email={buyer.email} onClose={() => setPg(false)} onPaid={onPaid} />}
    </div>
  );
}

/* ───────────── Eximbay-style payment window (mock) ───────────── */

const fmtCard = (v: string) => v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
const fmtExp = (v: string) => { const d = v.replace(/\D/g, "").slice(0, 4); return d.length > 2 ? `${d.slice(0, 2)} / ${d.slice(2)}` : d; };

function EximbayModal({ amount, email, onClose, onPaid }: { amount: number; email: string; onClose: () => void; onPaid: (card: string) => void }) {
  const [tab, setTab] = useState<"card" | "paypal" | "alipay">("card");
  const [card, setCard] = useState("");
  const [exp, setExp] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");
  const [phase, setPhase] = useState<"form" | "auth" | "ok">("form");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" && phase === "form") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, phase]);

  const ok = tab !== "card" || (card.replace(/\s/g, "").length === 16 && exp.replace(/\D/g, "").length === 4 && cvc.length >= 3 && name.trim());

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!ok) return;
    setPhase("auth");
    const masked = tab === "card" ? `${brandOf(card)} •••• ${card.replace(/\s/g, "").slice(-4)}` : tab === "paypal" ? "PayPal" : "Alipay+";
    setTimeout(() => { setPhase("ok"); setTimeout(() => onPaid(masked), 700); }, 1600);
  };

  return (
    <div className="pg" role="dialog" aria-modal aria-label="Eximbay secure payment">
      <div className="pg__scrim" onClick={phase === "form" ? onClose : undefined} />
      <div className="pg__win">
        <header className="pg__head">
          <span className="pglogo pglogo--light">eximbay</span>
          <span className="pg__secure">🔒 Secure payment</span>
          {phase === "form" && <button className="pg__close" onClick={onClose} aria-label="Close">×</button>}
        </header>

        <div className="pg__merchant">
          <div>
            <span className="pg__k">Merchant</span>
            <b>KLOW Wholesale</b>
          </div>
          <div>
            <span className="pg__k">Amount</span>
            <b className="mono">USD {amount.toFixed(2)}</b>
          </div>
          <div>
            <span className="pg__k">Receipt to</span>
            <b className="pg__email">{email}</b>
          </div>
        </div>

        {phase === "form" ? (
          <form className="pg__body" onSubmit={submit}>
            <div className="pg__tabs" role="tablist">
              {([["card", "Credit / Debit card"], ["paypal", "PayPal"], ["alipay", "Alipay+"]] as const).map(([k, l]) => (
                <button key={k} type="button" role="tab" aria-selected={tab === k} className={tab === k ? "is-on" : ""} onClick={() => setTab(k)}>{l}</button>
              ))}
            </div>

            {tab === "card" ? (
              <div className="pg__fields">
                <label className="pg__field pg__field--full">
                  <span>Card number</span>
                  <div className="pg__cardin">
                    <input value={card} onChange={(e) => setCard(fmtCard(e.target.value))} placeholder="0000 0000 0000 0000" inputMode="numeric" autoComplete="cc-number" autoFocus />
                    <em>{brandOf(card)}</em>
                  </div>
                </label>
                <label className="pg__field">
                  <span>Expiry (MM / YY)</span>
                  <input value={exp} onChange={(e) => setExp(fmtExp(e.target.value))} placeholder="MM / YY" inputMode="numeric" autoComplete="cc-exp" />
                </label>
                <label className="pg__field">
                  <span>Security code</span>
                  <input value={cvc} onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))} placeholder="CVC" inputMode="numeric" autoComplete="cc-csc" />
                </label>
                <label className="pg__field pg__field--full">
                  <span>Name on card</span>
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="JANE PARK" autoComplete="cc-name" />
                </label>
              </div>
            ) : (
              <div className="pg__redirect">
                <p>You will be redirected to <b>{tab === "paypal" ? "PayPal" : "Alipay+"}</b> to approve <b className="mono">USD {amount.toFixed(2)}</b>, then returned to KLOW.</p>
              </div>
            )}

            <button type="submit" className="pg__pay" disabled={!ok}>
              {tab === "card" ? `Pay USD ${amount.toFixed(2)}` : `Continue to ${tab === "paypal" ? "PayPal" : "Alipay+"}`}
            </button>
            <p className="pg__fine">Your card details are encrypted and sent directly to Eximbay. KLOW never sees or stores them. For this mock-up, any 16-digit number works.</p>
          </form>
        ) : (
          <div className="pg__body pg__status">
            {phase === "auth" ? (
              <>
                <span className="dots"><i /><i /><i /></span>
                <h4>Authorizing with your bank…</h4>
                <p className="muted small">3-D Secure · do not close this window</p>
              </>
            ) : (
              <>
                <span className="sent__mark">✓</span>
                <h4>Payment approved</h4>
                <p className="muted small">Returning you to KLOW Wholesale</p>
              </>
            )}
          </div>
        )}

        <footer className="pg__foot">
          <span>PCI DSS · 3-D Secure 2.0</span>
          <span>© Eximbay Co., Ltd.</span>
        </footer>
      </div>
    </div>
  );
}

function brandOf(card: string) {
  const d = card.replace(/\s/g, "");
  if (/^4/.test(d)) return "Visa";
  if (/^5[1-5]/.test(d) || /^2[2-7]/.test(d)) return "Mastercard";
  if (/^3[47]/.test(d)) return "Amex";
  if (/^35/.test(d)) return "JCB";
  if (/^62/.test(d)) return "UnionPay";
  return d ? "Card" : "";
}
