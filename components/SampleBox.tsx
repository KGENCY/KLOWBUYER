"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FREE_SHIPPING_SKUS, MAX_SAMPLE_SKUS, SAMPLE_PRICE, SAMPLE_SHIPPING_FEE, brandById, money, productById } from "@/lib/data";
import Photo from "./Photo";
import { useBuyer } from "./Buyer";

interface Ctx {
  items: string[];
  has: (id: string) => boolean;
  /** Already ordered as a sample by this buyer — each product can be sampled once. */
  sampled: (id: string) => boolean;
  /** The box holds MAX_SAMPLE_SKUS products, the most one order can take. */
  full: boolean;
  /** Why the last add was refused, shown briefly in the bottom bar. */
  notice: string;
  toggle: (id: string) => void;
  addMany: (ids: string[]) => void;
  clear: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
}

/** Routes where the fixed bottom bar would sit on top of its own checkout. */
const QUIET_ROUTES = ["/checkout", "/signup", "/signin"];

const SampleCtx = createContext<Ctx | null>(null);
export const useSamples = () => useContext(SampleCtx)!;

const KEY = "klow.samples";

export function SampleProvider({ children }: { children: ReactNode }) {
  const { buyer, orders } = useBuyer();
  const [saved, setItems] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const done = new Set(buyer ? orders.flatMap((o) => o.items) : []);
  // Drop ids that no longer resolve (a box saved before the catalog changed) or that this buyer has already sampled.
  const items = saved.filter((id) => !!productById(id) && !done.has(id)).slice(0, MAX_SAMPLE_SKUS);
  const full = items.length >= MAX_SAMPLE_SKUS;

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(""), 4500);
    return () => clearTimeout(t);
  }, [notice]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) ?? "[]");
      if (Array.isArray(saved)) setItems(saved);
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(saved.filter((id) => !!productById(id)))); } catch {}
  }, [saved]);

  const value: Ctx = {
    items,
    has: (id) => items.includes(id),
    sampled: (id) => done.has(id),
    full,
    notice,
    toggle: (id) => {
      if (items.includes(id)) return setItems(items.filter((x) => x !== id));
      if (done.has(id)) return setNotice("You've already sampled this product. Reorder it at MOQ.");
      if (full) return setNotice(`One order holds up to ${MAX_SAMPLE_SKUS} products. Check out this box, then start the next one.`);
      setItems([...items, id]);
    },
    addMany: (ids) => {
      const fresh = ids.filter((i) => !items.includes(i) && !done.has(i));
      const room = MAX_SAMPLE_SKUS - items.length;
      if (fresh.length > room) setNotice(`Added ${Math.max(room, 0)} — one order holds up to ${MAX_SAMPLE_SKUS} products.`);
      setItems([...items, ...fresh.slice(0, Math.max(room, 0))]);
    },
    clear: () => setItems([]),
    open,
    setOpen,
  };

  return (
    <SampleCtx.Provider value={value}>
      {children}
      <SampleBar />
      <SampleDrawer />
    </SampleCtx.Provider>
  );
}

export function Progress({ count, light }: { count: number; light?: boolean }) {
  return (
    <span className={`progress ${light ? "progress--light" : ""}`} aria-label={`${Math.min(count, FREE_SHIPPING_SKUS)} of ${FREE_SHIPPING_SKUS} SKUs`}>
      {Array.from({ length: FREE_SHIPPING_SKUS }).map((_, i) => (
        <i key={i} className={i < count ? "on" : ""} />
      ))}
    </span>
  );
}

export function shippingNote(count: number) {
  const left = FREE_SHIPPING_SKUS - count;
  if (left > 0) return `Add ${left} more product${left > 1 ? "s" : ""} for free shipping`;
  return count >= MAX_SAMPLE_SKUS ? `Free shipping · box full (${MAX_SAMPLE_SKUS} per order)` : "Free shipping unlocked";
}

function SampleBar() {
  const { items, notice, setOpen } = useSamples();
  const pathname = usePathname();
  const quiet = QUIET_ROUTES.some((r) => pathname.startsWith(r));
  const n = items.length;
  const subtotal = items.reduce((s, id) => s + productById(id).sample, 0);
  const on = (n || notice) && !quiet;
  return (
    <div className={`samplebar ${on ? "is-on" : ""}`} aria-hidden={!on}>
      {notice && <p className="samplebar__notice" role="status">{notice}</p>}
      <div className="samplebar__in">
        <div className="samplebar__l">
          <span className="eyebrow eyebrow--light">Sample box</span>
          <Progress count={n} light />
          <span className="samplebar__msg">
            <b>{n} / {MAX_SAMPLE_SKUS} products</b>
            <span>{shippingNote(n)}</span>
          </span>
        </div>
        <div className="samplebar__r">
          <span className="samplebar__sum">{money(subtotal)} <small>at wholesale</small></span>
          <button className="btn btn--invert" onClick={() => setOpen(true)}>Review box</button>
        </div>
      </div>
    </div>
  );
}

function SampleDrawer() {
  const { items, toggle, open, setOpen } = useSamples();
  const router = useRouter();
  const n = items.length;
  const subtotal = items.reduce((s, id) => s + productById(id).sample, 0);
  const free = n >= FREE_SHIPPING_SKUS;

  return (
    <>
      <div className={`scrim ${open ? "is-on" : ""}`} onClick={() => setOpen(false)} />
      <aside className={`drawer ${open ? "is-on" : ""}`} aria-hidden={!open}>
        <header className="drawer__head">
          <div>
            <span className="eyebrow">Your sample box</span>
            <h3 className="serif">{n} {n === 1 ? "product" : "products"}</h3>
          </div>
          <button className="link" onClick={() => setOpen(false)}>Close</button>
        </header>

        <div className="drawer__ship">
          <Progress count={n} />
          <p>{shippingNote(n)}</p>
        </div>

        <ul className="drawer__list">
          {items.length === 0 && <li className="muted drawer__empty">Pick any product — a single unit at ${SAMPLE_PRICE}.</li>}
          {items.map((id) => {
            const p = productById(id);
            const b = brandById(p.brandId);
            return (
              <li key={id} className="drawer__item">
                <div className="drawer__thumb"><Photo p={p} sizes="72px" /></div>
                <div className="drawer__info">
                  <span className="eyebrow">{b.name}</span>
                  <span>{p.name}</span>
                  <span className="muted small">1 unit · {p.size}</span>
                </div>
                <div className="drawer__price">
                  <span>{money(p.sample)}</span>
                  <button className="link small" onClick={() => toggle(id)}>Remove</button>
                </div>
              </li>
            );
          })}
        </ul>

        <footer className="drawer__foot">
          <div className="row"><span>Samples at wholesale</span><span>{money(subtotal)}</span></div>
          <div className="row"><span>Shipping from Seoul</span><span>{free ? "Complimentary" : money(SAMPLE_SHIPPING_FEE)}</span></div>
          <div className="row row--total"><span>Total</span><span>{money(subtotal + (free || !n ? 0 : SAMPLE_SHIPPING_FEE))}</span></div>
          <button
            className="btn btn--solid btn--block"
            disabled={!n}
            onClick={() => { setOpen(false); router.push("/checkout"); }}
          >
            Request samples
          </button>
          <p className="muted small center">One unit per product, once per buyer. Up to {MAX_SAMPLE_SKUS} products per order — {FREE_SHIPPING_SKUS} or more ship free.</p>
        </footer>
      </aside>
    </>
  );
}
