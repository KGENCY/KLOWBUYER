"use client";

import { useState } from "react";
import { BUSINESS_TYPES, COUNTRY_GROUPS } from "@/components/conversion/options";

/** Light newsletter sign-up for the trend report. Design only: submitting shows the confirmation. */
export default function NewsletterBlock({
  ctaId,
  title = "Get the monthly Korea Trend Report",
  lede = "What’s selling in Korea, ingredients to watch and what to sample next — one email a month.",
}: {
  ctaId: string;
  title?: string;
  lede?: string;
}) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <div className="nblock">
      <div className="nblock__text">
        <span className="eyebrow eyebrow--accent">Newsletter</span>
        <h2>{title}</h2>
        <p>{lede}</p>
      </div>
      {sent ? (
        <p className="nblock__sent" aria-live="polite"><i aria-hidden>✓</i> Subscribed. The next report goes to <b>{email}</b>.</p>
      ) : (
        <form className="nblock__form" data-cta-id={ctaId} onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
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
                  <optgroup key={g.label} label={g.label}>{g.options.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}</optgroup>
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
          <button type="submit" className="btn btn--solid" data-cta-id={`${ctaId}_submit`}>Subscribe</button>
        </form>
      )}
    </div>
  );
}
