"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FREE_SHIPPING_SKUS, money, productById } from "@/lib/data";
import { COUNTRIES, countryName, loadCheckout, saveCheckout } from "@/lib/buyer";
import { DEMO_EMAIL, useBuyer } from "./Buyer";

/* ────────────────────────────────────────────────────────────────
   First visit: ask where the buyer is from, then show the opening
   offer — any product from 1 unit at wholesale, free shipping at
   five SKUs. Shown once per browser; /?welcome=1 reopens it.
   Design only: every market reads in English for now.
   ──────────────────────────────────────────────────────────────── */

const KEY = "klow.welcome";
const QUIET_ROUTES = ["/checkout", "/signup", "/signin"];
const EXAMPLE = "p01"; // the product used to make the offer concrete

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
    if (again || (!seen && !QUIET_ROUTES.some((r) => path.startsWith(r)))) {
      setStep("where");
      setOpen(true);
    }
    // Only on first load; route changes don't reopen it.
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

  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return COUNTRIES.filter((c) => !t || c.name.toLowerCase().includes(t) || c.code.toLowerCase() === t);
  }, [q]);

  const remember = (c: string | null) => {
    try { localStorage.setItem(KEY, JSON.stringify({ country: c, at: Date.now() })); } catch {}
    if (c) saveCheckout({ ...loadCheckout(), country: c }); // pre-fills ship-to at checkout
  };
  const close = () => { remember(country); setOpen(false); };
  const pick = (c: string | null) => { setCountry(c); setStep("offer"); };
  const start = () => { close(); router.push("/#collection"); };

  if (!open) return null;
  const ex = productById(EXAMPLE);
  const where = country ? countryName(country) : null;

  return (
    <div className="welcome" role="dialog" aria-modal="true" aria-labelledby="welcome-title">
      <div className="welcome__scrim" onClick={close} />
      <div className="welcome__win">
        <button className="welcome__x" onClick={close} aria-label="Close">×</button>

        {step === "where" ? (
          <div className="welcome__step" key="where">
            <span className="eyebrow">Welcome to KLOW Wholesale</span>
            <h2 id="welcome-title" className="welcome__h">Where are you buying from?</h2>
            <p className="muted">We&rsquo;ll set shipping, documents and the site language for your market.</p>

            <input className="welcome__search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search your country" aria-label="Search your country" autoFocus />
            <ul className="welcome__countries">
              {list.map((c) => (
                <li key={c.code}>
                  <button type="button" onClick={() => pick(c.code)}>
                    <span className="mono">{c.code}</span>{c.name}
                  </button>
                </li>
              ))}
              {list.length === 0 && <li className="muted small welcome__none">No match. Continue below and we&rsquo;ll ship to you case by case.</li>}
            </ul>
            <button type="button" className="link small welcome__skip" onClick={() => pick(null)}>My country isn&rsquo;t listed — continue in English</button>
          </div>
        ) : (
          <div className="welcome__step" key="offer">
            <div className="welcome__where">
              <span className="mono">{country ?? "—"}</span>
              <span>{where ?? "International"} · English</span>
              <button type="button" className="link small" onClick={() => setStep("where")}>Change</button>
            </div>

            <span className="eyebrow eyebrow--accent">Our opening offer</span>
            <h2 id="welcome-title" className="welcome__h">Sample any product from just 1 unit, at wholesale price.</h2>

            <div className="welcome__perks">
              <div>
                <b className="mono">1 unit</b>
                <p>No MOQ to sample. You pay wholesale, never retail.</p>
              </div>
              <div>
                <b className="mono">{FREE_SHIPPING_SKUS}+ SKUs</b>
                <p>Free shipping from Seoul{where ? ` to ${where}` : ""}.</p>
              </div>
            </div>

            {/* Five slots: the fifth sample is where shipping turns free */}
            <ol className="welcome__slots" aria-label={`Free shipping at ${FREE_SHIPPING_SKUS} samples`}>
              {Array.from({ length: FREE_SHIPPING_SKUS }, (_, i) => (
                <li key={i} className={i === FREE_SHIPPING_SKUS - 1 ? "is-free" : ""}>
                  <span className="mono">{i + 1}</span>
                  {i === FREE_SHIPPING_SKUS - 1 && <em>Free shipping</em>}
                </li>
              ))}
            </ol>

            <p className="welcome__ex small">
              <span className="muted">For example:</span> {ex.name} — <b className="mono">{money(ex.sample)}</b> a sample <span className="muted">· retails at {money(ex.msrp)}</span>
            </p>

            <button className="btn btn--solid btn--block" onClick={start}>Start sampling</button>
            {!buyer && (
              <p className="muted small welcome__in">
                Already a registered buyer? <button type="button" className="link" onClick={() => { signIn(DEMO_EMAIL); close(); }}>Sign in</button>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
