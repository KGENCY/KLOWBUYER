"use client";

import { useState } from "react";
import { BUSINESS_TYPES, COUNTRY_GROUPS } from "./options";

/**
 * Three-field inquiry: email, country, business type. WhatsApp stays folded away until asked for.
 * Design only: submitting just flips to the success view.
 */
export default function QuickInquiryForm({
  ctaId,
  id,
  title = "Ask our team",
  lede = "Tell us where you sell. A real person replies, usually the same day.",
  submitLabel = "Get a reply within 24h",
  children,
  defaultState = "form",
}: {
  ctaId: string;
  /** Anchor id so other pages can link straight to this form. */
  id?: string;
  title?: string;
  lede?: string;
  submitLabel?: string;
  /** Extra fields (e.g. products and quantities for a quote), placed after business type. */
  children?: React.ReactNode;
  /** "sent" opens on the success view — for design previews. */
  defaultState?: "form" | "sent";
}) {
  const [email, setEmail] = useState(defaultState === "sent" ? "buyer@company.com" : "");
  const [withWa, setWithWa] = useState(false);
  const [sent, setSent] = useState(defaultState === "sent");

  if (sent) {
    return (
      <div id={id} className="qform qform--sent" aria-live="polite">
        <span className="sent__mark">✓</span>
        <h3>Thanks — we&rsquo;ll reply within 24h.</h3>
        <p className="muted">We&rsquo;ll write to <b>{email}</b> on the next business day (KST) at the latest.</p>
        <button className="link small" onClick={() => setSent(false)} data-cta-id={`${ctaId}_again`}>Send another question</button>
      </div>
    );
  }

  return (
    <form
      id={id}
      className="qform"
      data-cta-id={ctaId}
      onSubmit={(e) => { e.preventDefault(); setSent(true); }}
    >
      <div className="qform__head">
        <h3>{title}</h3>
        {lede && <p className="muted">{lede}</p>}
      </div>
      <label className="field">
        <span className="eyebrow">Email</span>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" autoComplete="email" />
      </label>
      <div className="fields fields--2">
        <label className="field">
          <span className="eyebrow">Country</span>
          <select defaultValue="">
            <option value="" disabled>Select</option>
            {COUNTRY_GROUPS.map((g) => (
              <optgroup key={g.label} label={g.label}>
                {g.options.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
              </optgroup>
            ))}
          </select>
        </label>
        <label className="field">
          <span className="eyebrow">Business type</span>
          <select defaultValue="">
            <option value="" disabled>Select</option>
            {BUSINESS_TYPES.map((b) => <option key={b}>{b}</option>)}
          </select>
        </label>
      </div>
      {children}
      {withWa ? (
        <label className="field">
          <span className="eyebrow">WhatsApp (optional)</span>
          <input type="tel" placeholder="+52 55 0000 0000" autoComplete="tel" autoFocus />
        </label>
      ) : (
        <button type="button" className="qform__more" onClick={() => setWithWa(true)} data-cta-id={`${ctaId}_add_whatsapp`}>
          <i aria-hidden>+</i> Add WhatsApp (optional)
        </button>
      )}
      <button type="submit" className="btn btn--solid btn--block" data-cta-id={`${ctaId}_submit`}>{submitLabel}</button>
      <p className="qform__note">No spam. We reply in English, Spanish, Russian or Arabic.</p>
    </form>
  );
}
