"use client";

import { useState } from "react";
import Link from "next/link";
import InfoTable from "@/components/section/InfoTable";
import QuickInquiryForm from "@/components/conversion/QuickInquiryForm";

export type FinderCountry = {
  code: string;
  name: string;
  method: string;
  days: string;
  labels: string;
  registration: string;
  difficulty?: { key: string; label: string };
  guideHref?: string;
};

/**
 * "Where are you shipping to?" — picking a market reveals its summary with a quote button and,
 * when a guide exists, a link to it. "Other" shows a short inquiry form instead.
 * Design only: the choice isn't stored or sent anywhere.
 */
export default function CountryFinder({
  countries,
  label,
  placeholder,
  quoteLabel,
  quoteHref,
  guideLabel,
  emptyText,
  otherTitle,
  otherLede,
  ctaPrefix,
}: {
  countries: FinderCountry[];
  label: string;
  placeholder: string;
  /** "{country}" is replaced with the chosen country's name. */
  quoteLabel: string;
  quoteHref: string;
  guideLabel: string;
  emptyText: string;
  otherTitle: string;
  otherLede: string;
  ctaPrefix: string;
}) {
  const [code, setCode] = useState("");
  const c = countries.find((x) => x.code === code);
  const fill = (s: string) => s.replace("{country}", c?.name ?? "");

  return (
    <div className="finder about-split">
      <label className="field finder__pick">
        <span className="eyebrow">{label}</span>
        <select value={code} onChange={(e) => setCode(e.target.value)} data-cta-id={`${ctaPrefix}_select`}>
          <option value="" disabled>{placeholder}</option>
          {countries.map((x) => <option key={x.code} value={x.code}>{x.name}</option>)}
        </select>
      </label>

      <div className="finder__out" aria-live="polite">
        {!c && <p className="finder__empty">{emptyText}</p>}
        {c && c.code === "OTHER" && (
          <QuickInquiryForm key="other" ctaId={`${ctaPrefix}_inquiry`} title={otherTitle} lede={otherLede} compact />
        )}
        {c && c.code !== "OTHER" && (
          <div key={c.code} className="finder__card">
            <div className="finder__head">
              <h3>{c.name}</h3>
              {c.difficulty && <span className={`finder__level finder__level--${c.difficulty.key}`}>{c.difficulty.label}</span>}
            </div>
            <InfoTable rows={[
              { key: "method", label: "Recommended method", value: c.method },
              { key: "days", label: "Estimated delivery", value: c.days },
              { key: "labels", label: "Local-language labels", value: c.labels },
              { key: "registration", label: "Registration", value: c.registration },
            ]} />
            <div className="about-links finder__act">
              <Link href={quoteHref} className="btn btn--solid" data-cta-id={`${ctaPrefix}_quote`}>{fill(quoteLabel)}</Link>
              {c.guideHref && (
                <Link href={c.guideHref} className="link small" data-cta-id={`${ctaPrefix}_guide`}>{fill(guideLabel)}</Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
