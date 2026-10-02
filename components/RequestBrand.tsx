"use client";

import { createContext, useContext, useEffect, useState, ReactNode, FormEvent } from "react";

interface Ctx {
  open: boolean;
  openWith: (query?: string) => void;
  close: () => void;
}

const RequestCtx = createContext<Ctx | null>(null);
export const useRequest = () => useContext(RequestCtx)!;

const KEY = "klow.requests";

export function RequestProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [prefill, setPrefill] = useState("");

  const value: Ctx = {
    open,
    openWith: (q = "") => { setPrefill(q); setOpen(true); },
    close: () => setOpen(false),
  };

  return (
    <RequestCtx.Provider value={value}>
      {children}
      <RequestDrawer open={open} prefill={prefill} onClose={() => setOpen(false)} />
    </RequestCtx.Provider>
  );
}

function RequestDrawer({ open, prefill, onClose }: { open: boolean; prefill: string; onClose: () => void }) {
  const [brand, setBrand] = useState("");
  const [detail, setDetail] = useState("");
  const [market, setMarket] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  // Each time the drawer opens, start from the search query (or a blank form).
  useEffect(() => {
    if (!open) return;
    setBrand(prefill);
    setDetail("");
    setSent(false);
  }, [open, prefill]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!brand.trim() || !email.trim()) return;
    try {
      const prev = JSON.parse(localStorage.getItem(KEY) ?? "[]");
      localStorage.setItem(KEY, JSON.stringify([...(Array.isArray(prev) ? prev : []), { brand, detail, market, email, at: Date.now() }]));
    } catch {}
    setSent(true);
  };

  return (
    <>
      <div className={`scrim ${open ? "is-on" : ""}`} onClick={onClose} />
      <aside className={`drawer ${open ? "is-on" : ""}`} aria-hidden={!open} aria-label="Request a brand">
        <header className="drawer__head">
          <div>
            <span className="eyebrow">Request a brand</span>
            <h3 className="serif">Not in our collection yet?</h3>
          </div>
          <button className="link" onClick={onClose}>Close</button>
        </header>

        {sent ? (
          <div className="drawer__body sent">
            <span className="sent__mark">✓</span>
            <h4 className="serif">Request received.</h4>
            <p className="muted">
              Our Seoul team will contact <b>{brand}</b> directly and come back to you at <b>{email}</b> within two business days with wholesale terms and sample availability.
            </p>
            <button className="btn btn--ghost" onClick={onClose}>Back to the collection</button>
          </div>
        ) : (
          <form className="drawer__body form" onSubmit={submit}>
            <p className="form__lede">
              Tell us what you&rsquo;re looking for. We reach out to the brand in Korea, negotiate wholesale terms on your behalf, and bring samples into your box.
            </p>

            <label className="field">
              <span className="eyebrow">Brand or product *</span>
              <input value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="e.g. Anua, Beauty of Joseon, Torriden…" required autoFocus />
            </label>

            <label className="field">
              <span className="eyebrow">What do you need?</span>
              <textarea value={detail} onChange={(e) => setDetail(e.target.value)} placeholder="Specific products, estimated quantity, target launch date…" rows={4} />
            </label>

            <label className="field">
              <span className="eyebrow">Your business &amp; market</span>
              <input value={market} onChange={(e) => setMarket(e.target.value)} placeholder="e.g. Online retailer, United States" />
            </label>

            <label className="field">
              <span className="eyebrow">Work email *</span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" required />
            </label>

            <div className="form__foot">
              <button type="submit" className="btn btn--solid btn--block" disabled={!brand.trim() || !email.trim()}>Send request to Korea</button>
              <p className="muted small center">No commitment. We reply within two business days.</p>
            </div>
          </form>
        )}
      </aside>
    </>
  );
}
