"use client";

import { useState } from "react";
import Link from "next/link";
import LockedPrice from "@/components/conversion/LockedPrice";

export type WayCard = {
  key: string;
  number: string;
  name: string;
  tag: string;
  rows: { label: string; value: string }[];
  price?: { sample: string; moq: string; moqUnits: string };
  cta: { label: string; href: string; ctaId: string };
  highlight?: string;
};

/**
 * Side-by-side ways to buy. The highlighted card (most buyers) gets a green label and a heavier frame.
 * The switch at the bottom previews the price block as a signed-in buyer — for design review only.
 */
export default function OrderWays({ cards, toggleLabel, ctaPrefix }: { cards: WayCard[]; toggleLabel: string; ctaPrefix: string }) {
  const [preview, setPreview] = useState(false);
  return (
    <div className="ways">
      <ol className="ways__grid">
        {cards.map((c) => (
          <li key={c.key} className={`ways__card ${c.highlight ? "is-featured" : ""}`}>
            {c.highlight && <span className="ways__flag">{c.highlight}</span>}
            <span className="ways__n">{c.number}</span>
            <h3>{c.name}</h3>
            <span className="ways__tag">{c.tag}</span>
            <dl className="ways__rows">
              {c.rows.map((r) => (
                <div key={r.label}>
                  <dt>{r.label}</dt>
                  <dd>{r.value}</dd>
                </div>
              ))}
            </dl>
            {c.price && (
              <LockedPrice
                sample={c.price.sample}
                moq={c.price.moq}
                moqUnits={c.price.moqUnits}
                isLoggedIn={preview}
                ctaId={`${ctaPrefix}_${c.key}_signin`}
              />
            )}
            <Link href={c.cta.href} className={`btn ${c.highlight ? "btn--solid" : "btn--ghost"} ways__cta`} data-cta-id={c.cta.ctaId}>
              {c.cta.label}
            </Link>
          </li>
        ))}
      </ol>
      <label className="check ways__toggle">
        <input type="checkbox" checked={preview} onChange={(e) => setPreview(e.target.checked)} data-cta-id={`${ctaPrefix}_preview`} />
        <i aria-hidden />
        <span>{toggleLabel}</span>
      </label>
    </div>
  );
}
