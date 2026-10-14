"use client";

import { useState } from "react";
import { COUNTRY_GROUPS } from "@/components/conversion/options";

/** Footer sign-up for the monthly trend report. Design only: submitting just shows the confirmation. */
export default function NewsletterForm({ ctaId, title, note }: { ctaId: string; title: string; note: string }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <div className="news">
      <p className="news__title">{title}</p>
      {sent ? (
        <p className="news__sent" aria-live="polite"><i aria-hidden>✓</i> Subscribed. The next report goes to <b>{email}</b>.</p>
      ) : (
        <form className="news__form" data-cta-id="footer_newsletter" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
          <label className="sr-only" htmlFor="news-email">Email</label>
          <input id="news-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Work email" autoComplete="email" />
          <label className="sr-only" htmlFor="news-country">Country</label>
          <select id="news-country" defaultValue="">
            <option value="" disabled>Country</option>
            {COUNTRY_GROUPS.map((g) => (
              <optgroup key={g.label} label={g.label}>
                {g.options.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
              </optgroup>
            ))}
          </select>
          <button type="submit" className="btn btn--invert" data-cta-id={ctaId}>Subscribe</button>
        </form>
      )}
      <p className="news__note">{note}</p>
    </div>
  );
}
