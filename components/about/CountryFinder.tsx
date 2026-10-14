"use client";

import { useState } from "react";
import Link from "next/link";

type Dest = { code: string; name: string; method: string; days: string; labels: string; registration: string };

/**
 * "Where are you shipping to?" — picking a market reveals a summary card with a quote link for it.
 * Design only: the choice isn't stored or sent anywhere.
 */
export default function CountryFinder({
  label,
  placeholder,
  quoteLabel,
  quoteHref,
  ctaPrefix,
  destinations,
}: {
  label: string;
  placeholder: string;
  /** "{country}" is replaced with the chosen market's name. */
  quoteLabel: string;
  quoteHref: string;
  ctaPrefix: string;
  destinations: Dest[];
}) {
  const [code, setCode] = useState("");
  const d = destinations.find((x) => x.code === code);
  return (
    <div className="finder">
      <label className="field">
        <span className="eyebrow">{label}</span>
        <select value={code} onChange={(e) => setCode(e.target.value)} data-cta-id={`${ctaPrefix}_select`}>
          <option value="" disabled>{placeholder}</option>
          {destinations.map((x) => <option key={x.code} value={x.code}>{x.name}</option>)}
        </select>
      </label>
      {d && (
        <div key={d.code} className="finder__card" aria-live="polite">
          <dl>
            <div><dt>Recommended</dt><dd>{d.method}</dd></div>
            <div><dt>Transit time</dt><dd>{d.days}</dd></div>
            <div><dt>Labels</dt><dd>{d.labels}</dd></div>
            <div><dt>Local registration</dt><dd>{d.registration}</dd></div>
          </dl>
          <Link href={quoteHref} className="btn btn--solid btn--sm" data-cta-id={`${ctaPrefix}_quote`}>
            {quoteLabel.replace("{country}", d.code === "OTHER" ? "your market" : d.name)}
          </Link>
        </div>
      )}
    </div>
  );
}
