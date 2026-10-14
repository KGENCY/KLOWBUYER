"use client";

import { useState } from "react";
import { t, type Locale } from "@/content/i18n";
import type { LeadMagnet } from "@/content/leadMagnets";
import { DocumentArt } from "@/components/media/Illustration";

/** Document thumbnail with the file format and the market it covers. */
function DocIcon({ format, tag }: { format: string; tag: string }) {
  return (
    <svg className="lead__doc" viewBox="0 0 64 80" aria-hidden>
      <DocumentArt format={format} tag={tag} />
    </svg>
  );
}

/** A free resource for an email. Design only: submitting shows the "sent" state. */
export default function LeadMagnetCard({
  magnet,
  ctaId,
  locale = "en",
  defaultState = "form",
}: {
  magnet: LeadMagnet;
  ctaId: string;
  locale?: Locale;
  /** "sent" opens on the success view — for design previews. */
  defaultState?: "form" | "sent";
}) {
  const [email, setEmail] = useState(defaultState === "sent" ? "buyer@company.com" : "");
  const [sent, setSent] = useState(defaultState === "sent");
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
