"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const KEY = "klow.exitIntent";
/** Never interrupt someone mid-checkout or mid-sign-up. */
const QUIET_ROUTES = ["/checkout", "/signup", "/signin"];

/**
 * Desktop only: when the pointer leaves through the top of the window, offer the price list once per session.
 * Stays out of the way of the welcome modal and any open drawer. Design only: the email isn't sent.
 */
export default function ExitIntentModal() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (QUIET_ROUTES.some((r) => path.startsWith(r))) return;
    if (!window.matchMedia("(min-width: 861px) and (hover: hover) and (pointer: fine)").matches) return;
    try { if (sessionStorage.getItem(KEY)) return; } catch {}

    const onOut = (e: MouseEvent) => {
      if (e.relatedTarget || e.clientY > 0) return;
      if (document.querySelector(".wel, .scrim.is-on, .pg")) return;
      try { sessionStorage.setItem(KEY, "1"); } catch {}
      setOpen(true);
      document.removeEventListener("mouseout", onOut);
    };
    document.addEventListener("mouseout", onOut);
    return () => document.removeEventListener("mouseout", onOut);
  }, [path]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;
  return (
    <div className="exit" role="dialog" aria-modal="true" aria-labelledby="exit-title">
      <div className="exit__scrim" onClick={() => setOpen(false)} />
      <div className="exit__win">
        <button className="exit__x" onClick={() => setOpen(false)} aria-label="Close" data-cta-id="exit_pricelist_close">×</button>
        <span className="eyebrow eyebrow--accent">Wholesale price list</span>
        {sent ? (
          <div className="exit__sent" aria-live="polite">
            <h2 id="exit-title" className="exit__title">On its way.</h2>
            <p className="muted">The price list is heading to <b>{email}</b>. Sample prices and MOQ prices for every product, in one sheet.</p>
            <button className="btn btn--solid" onClick={() => setOpen(false)} data-cta-id="exit_pricelist_done">Keep browsing</button>
          </div>
        ) : (
          <>
            <h2 id="exit-title" className="exit__title">Before you go — get our wholesale price list.</h2>
            <p className="muted">Sample and MOQ prices for the full collection. One email, no follow-up spam.</p>
            <form className="exit__form" data-cta-id="exit_pricelist" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <input type="email" required autoFocus value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Work email" aria-label="Work email" />
              <button type="submit" className="btn btn--solid" data-cta-id="exit_pricelist_submit">Send the price list</button>
            </form>
            <button className="link small exit__skip" onClick={() => setOpen(false)} data-cta-id="exit_pricelist_dismiss">No thanks</button>
          </>
        )}
      </div>
    </div>
  );
}
