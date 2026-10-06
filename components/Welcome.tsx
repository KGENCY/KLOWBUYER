"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FREE_SHIPPING_SKUS, PRODUCTS, SAMPLE_SHIPPING_FEE, brandById, money, productById } from "@/lib/data";
import { COUNTRIES, countryName, loadCheckout, saveCheckout } from "@/lib/buyer";
import { photoPos, photoSrc } from "./Photo";
import { DEMO_EMAIL, useBuyer } from "./Buyer";

/* ────────────────────────────────────────────────────────────────
   First visit: ask where the buyer ships to, then sell the opening
   offer: any product from 1 unit at wholesale, and free shipping
   once five SKUs are in the box. /?welcome=1 reopens it.
   Design only: every market reads in English for now.
   ──────────────────────────────────────────────────────────────── */

/** DESIGN PREVIEW: set to false before launch.
 *  While true, the modal opens on every page load so it can be reviewed; afterwards it shows once per browser. */
const DESIGN_PREVIEW = true;

const KEY = "klow.welcome";
const QUIET_ROUTES = ["/checkout", "/signup", "/signin"];
const POPULAR = ["US", "GB", "DE", "FR", "CA", "AU", "AE", "SG", "JP", "NL", "ES", "MY"]; // 4 × 3 tiles fill the column exactly
const BOX = ["p01", "p05", "p11", "p03", "p15"]; // the example sample box, one per brand
const EXAMPLE = "p01";

const flag = (code: string) => `https://flagcdn.com/w80/${code.toLowerCase()}.png`;
const SHORT: Record<string, string> = { AE: "UAE" }; // keeps every tile to two lines

export default function Welcome() {
  const path = usePathname();
  const router = useRouter();
  const { buyer, signIn } = useBuyer();
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState<string | null>(null);
  const [step, setStep] = useState<"where" | "offer">("where");
  const [q, setQ] = useState("");

  useEffect(() => {
    const again = new URLSearchParams(window.location.search).get("welcome") === "1";
    let seen = false;
    try { seen = !!localStorage.getItem(KEY); } catch {}
    if (again || ((DESIGN_PREVIEW || !seen) && !QUIET_ROUTES.some((r) => path.startsWith(r)))) setOpen(true);
    // First load only; route changes never reopen it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", esc);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", esc); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const others = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return [];
    return COUNTRIES.filter((c) => c.name.toLowerCase().includes(t) || c.code.toLowerCase() === t).slice(0, 5);
  }, [q]);

  const remember = (c: string | null) => {
    try { localStorage.setItem(KEY, JSON.stringify({ country: c, at: Date.now() })); } catch {}
    if (c) saveCheckout({ ...loadCheckout(), country: c }); // pre-fills ship-to at checkout
  };
  const close = () => { remember(country); setOpen(false); };
  const pick = (c: string | null) => { setCountry(c); setQ(""); setStep("offer"); };
  const go = (href: string) => { close(); router.push(href); };

  if (!open) return null;

  return (
    <div className="wel" role="dialog" aria-modal="true" aria-labelledby="wel-title">
      <div className="wel__scrim" onClick={close} />
      <div className={`wel__win wel__win--${step}`}>
        <button className="wel__x" onClick={close} aria-label="Close">×</button>
        {step === "where"
          ? <Where onPick={pick} q={q} setQ={setQ} others={others} />
          : <Offer country={country} onChange={() => setStep("where")} onStart={() => go("/#collection")} onMatch={() => go("/match")} onSignIn={buyer ? undefined : () => { signIn(DEMO_EMAIL); close(); }} />}
      </div>
    </div>
  );
}

/* ── Step 1: where to ship ── */

const ROWS = 3;
const shuffle = <T,>(xs: T[]) => {
  const a = xs.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};

/** Every listed product, shuffled into three rows that drift right, left, right. Each row is doubled so the loop is seamless. */
function Reel() {
  const [rows] = useState(() => {
    const all = shuffle(PRODUCTS);
    return Array.from({ length: ROWS }, (_, r) => all.filter((_, i) => i % ROWS === r));
  });
  return (
    <div className="wel__reel" aria-hidden="true">
      {rows.map((row, r) => (
        <div key={r} className={`wel__row ${r % 2 === 0 ? "wel__row--right" : "wel__row--left"}`} style={{ animationDuration: `${[46, 54, 50][r]}s` }}>
          {[...row, ...row].map((p, i) => (
            <figure key={`${p.id}-${i}`} className="wel__card">
              <img src={photoSrc(p)} alt="" style={{ objectPosition: photoPos(p) }} loading="eager" decoding="async" />
              <figcaption className="mono">{money(p.sample)}</figcaption>
            </figure>
          ))}
        </div>
      ))}
    </div>
  );
}

function Where({ onPick, q, setQ, others }: { onPick: (c: string | null) => void; q: string; setQ: (s: string) => void; others: typeof COUNTRIES }) {
  return (
    <div className="wel__grid" key="where">
      <div className="wel__visual">
        <Reel />
      </div>

      <div className="wel__body">
        <span className="eyebrow">Welcome to KLOW Wholesale</span>
        <h2 id="wel-title" className="wel__h">Where should we ship your samples?</h2>
        <p className="wel__sub">Pick your market. Shipping, documents and language follow.</p>

        <ul className="wel__flags">
          {POPULAR.map((code) => (
            <li key={code}>
              <button type="button" onClick={() => onPick(code)}>
                <img src={flag(code)} alt="" loading="eager" />
                <span>{SHORT[code] ?? countryName(code)}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="wel__other">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Another country? Type to search" aria-label="Search your country" />
          {others.length > 0 && (
            <ul className="wel__results">
              {others.map((c) => (
                <li key={c.code}>
                  <button type="button" onClick={() => onPick(c.code)}><img src={flag(c.code)} alt="" />{c.name}</button>
                </li>
              ))}
            </ul>
          )}
          {q.trim() && others.length === 0 && <p className="muted small wel__none">No match. Continue below and we&rsquo;ll quote shipping for you.</p>}
        </div>

        <button type="button" className="wel__skip" onClick={() => onPick(null)}>Not listed? Continue in English <span className="mono">→</span></button>
      </div>
    </div>
  );
}

/* ── Step 2: the offer ── */

function Offer({ country, onChange, onStart, onMatch, onSignIn }: { country: string | null; onChange: () => void; onStart: () => void; onMatch: () => void; onSignIn?: () => void }) {
  const box = BOX.map(productById);
  const sampleTotal = box.reduce((s, p) => s + p.sample, 0);
  const retailTotal = box.reduce((s, p) => s + p.msrp, 0);
  const ex = productById(EXAMPLE);
  const off = Math.round((1 - ex.sample / ex.msrp) * 100);
  const where = country ? countryName(country) : "you";

  return (
    <div className="wel__grid" key="offer">
      {/* The sample box filling up, one product at a time, until shipping turns free */}
      <div className="wel__box" aria-label={`Example: ${FREE_SHIPPING_SKUS} samples, free shipping`}>
        <span className="wel__tag wel__tag--dark mono">Your first sample box</span>
        <ul className="wel__slots">
          {box.map((p, i) => (
            <li key={p.id} style={{ animationDelay: `${300 + i * 380}ms` }}>
              <img src={photoSrc(p)} alt="" style={{ objectPosition: photoPos(p) }} />
              <span className="wel__slot-n mono">{i + 1}</span>
              <div className="wel__slot-meta">
                <span>{brandById(p.brandId).name}</span>
                <b className="mono">{money(p.sample)}</b>
              </div>
            </li>
          ))}
        </ul>

        <div className="wel__ship">
          <div className="wel__bar"><i /></div>
          <div className="wel__ship-row">
            <span>Shipping to {country ? countryName(country) : "your market"}</span>
            <span className="wel__fee mono"><s>{money(SAMPLE_SHIPPING_FEE)}</s><b>Free</b></span>
          </div>
        </div>

        <dl className="wel__sum">
          <div><dt>{FREE_SHIPPING_SKUS} samples</dt><dd className="mono">{money(sampleTotal)}</dd></div>
          <div><dt>Retail value</dt><dd className="mono">{money(retailTotal)}</dd></div>
        </dl>
      </div>

      <div className="wel__body">
        <div className="wel__where">
          {country ? <img src={flag(country)} alt="" /> : <span className="wel__globe mono">—</span>}
          <span>Shipping to <b>{country ? countryName(country) : "International"}</b> · English</span>
          <button type="button" className="link small" onClick={onChange}>Change</button>
        </div>

        <span className="eyebrow eyebrow--accent">Opening offer</span>
        <h2 id="wel-title" className="wel__h wel__h--big">Start with one unit.<br /><em>Get five shipped free.</em></h2>

        <ol className="wel__perks">
          <li>
            <span className="mono">01</span>
            <p><b>Any product from just 1 unit, at wholesale price.</b> No MOQ, no case packs, no retail markup.</p>
          </li>
          <li>
            <span className="mono">05</span>
            <p><b>Five SKUs and shipping is on us</b>, from Seoul to {where}.</p>
          </li>
        </ol>

        <div className="wel__proof">
          <img src={photoSrc(ex)} alt="" style={{ objectPosition: photoPos(ex) }} />
          <div>
            <span className="muted small">{brandById(ex.brandId).name} {ex.name}</span>
            <p><b className="mono">{money(ex.sample)}</b> <s className="mono muted">{money(ex.msrp)} retail</s></p>
          </div>
          <span className="wel__off mono">−{off}%</span>
        </div>

        <button className="btn btn--solid btn--block wel__cta" onClick={onStart}>Start sampling</button>
        <div className="wel__alt">
          <button type="button" className="link small" onClick={onMatch}>Not sure where to start? Get matched to brands</button>
          {onSignIn && <span className="small muted">Registered buyer? <button type="button" className="link" onClick={onSignIn}>Sign in</button></span>}
        </div>
      </div>
    </div>
  );
}
