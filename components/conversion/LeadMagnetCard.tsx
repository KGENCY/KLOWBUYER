"use client";

import { useState } from "react";
import { t, type Locale } from "@/content/i18n";
import type { LeadMagnet } from "@/content/leadMagnets";

/** Flat document thumbnail: folded corner, text lines, and a format tag. */
function DocIcon({ format, tag }: { format: string; tag: string }) {
  return (
    <svg className="lead__doc" viewBox="0 0 64 80" aria-hidden>
      <path d="M2 2h44l16 16v60H2z" fill="#f6f5f1" stroke="#a9a293" strokeWidth="1.5" />
      <path d="M46 2v16h16" fill="#e3e1da" stroke="#a9a293" strokeWidth="1.5" />
      {[30, 38, 46, 54].map((y, i) => <rect key={y} x="10" y={y} width={i % 2 ? 30 : 42} height="3" fill="#cfc8ba" />)}
      <rect x="10" y="10" width="26" height="12" fill="#2c4a3c" />
      <text x="23" y="19" textAnchor="middle" fontSize="7.5" fill="#e9efe9" style={{ fontFamily: "var(--mono)", letterSpacing: ".04em" }}>{format}</text>
      <text x="10" y="70" fontSize="7" fill="#6f7169" style={{ fontFamily: "var(--mono)", letterSpacing: ".06em", textTransform: "uppercase" }}>{tag}</text>
    </svg>
  );
}

/** A free resource for an email. Design only: submitting shows the "sent" state. */
export default function LeadMagnetCard({ magnet, ctaId, locale = "en" }: { magnet: LeadMagnet; ctaId: string; locale?: Locale }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <article className="lead">
      <div className="lead__top">
        <DocIcon format={magnet.format} tag={t(magnet.tag, locale)} />
        <div>
          <span className="eyebrow eyebrow--accent">Free {magnet.format}</span>
          <h3>{t(magnet.title, locale)}</h3>
        </div>
      </div>
      <p className="lead__desc">{t(magnet.description, locale)}</p>
      {sent ? (
        <p className="lead__sent" aria-live="polite"><i aria-hidden>✓</i> Sent to <b>{email}</b>. Check your inbox.</p>
      ) : (
        <form className="lead__form" data-cta-id={ctaId} onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Work email" aria-label={`Email for ${t(magnet.title, locale)}`} />
          <button type="submit" className="btn btn--solid btn--sm" data-cta-id={`${ctaId}_submit`}>Send me the {magnet.format === "PDF" ? "PDF" : "file"}</button>
        </form>
      )}
    </article>
  );
}
