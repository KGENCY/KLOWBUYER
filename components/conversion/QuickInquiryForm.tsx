"use client";

import { useEffect, useState } from "react";
import { BUSINESS_TYPES, COUNTRY_GROUPS } from "./options";

const TYPE_EVENT = "klow:inquiry-type";

/** Preselect the inquiry type of the form on this page (e.g. from an "Ask about exclusivity" link). */
export function selectInquiryType(type: string) {
  window.dispatchEvent(new CustomEvent(TYPE_EVENT, { detail: type }));
}

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
  compact,
  inquiryTypes,
  defaultInquiryType = "",
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
  /** Email + country only (no business type, no WhatsApp) — for small in-page prompts. */
  compact?: boolean;
  /** Adds a "What's it about?" select with these options. */
  inquiryTypes?: string[];
  defaultInquiryType?: string;
}) {
  const [email, setEmail] = useState(defaultState === "sent" ? "buyer@company.com" : "");
  const [withWa, setWithWa] = useState(false);
  const [sent, setSent] = useState(defaultState === "sent");
  const [type, setType] = useState(defaultInquiryType);

  useEffect(() => {
    if (!inquiryTypes) return;
    const onType = (e: Event) => setType((e as CustomEvent<string>).detail);
    window.addEventListener(TYPE_EVENT, onType);
    return () => window.removeEventListener(TYPE_EVENT, onType);
  }, [inquiryTypes]);

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
      className={`qform ${compact ? "qform--compact" : ""}`}
      data-cta-id={ctaId}
      onSubmit={(e) => { e.preventDefault(); setSent(true); }}
    >
      <div className="qform__head">
        <h3>{title}</h3>
        {lede && <p className="muted">{lede}</p>}
      </div>
      {inquiryTypes && (
        <label className="field">
          <span className="eyebrow">What’s it about?</span>
          <select value={type} onChange={(e) => setType(e.target.value)} data-cta-id={`${ctaId}_type`}>
            <option value="" disabled>Select</option>
            {inquiryTypes.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </label>
      )}
      <label className="field">
        <span className="eyebrow">Email</span>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" autoComplete="email" />
      </label>
      <div className={compact ? "fields" : "fields fields--2"}>
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
        {!compact && <label className="field">
          <span className="eyebrow">Business type</span>
          <select defaultValue="">
            <option value="" disabled>Select</option>
            {BUSINESS_TYPES.map((b) => <option key={b}>{b}</option>)}
          </select>
        </label>}
      </div>
      {children}
      {compact ? null : withWa ? (
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
