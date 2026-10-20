"use client";

import { useState } from "react";
import Link from "next/link";
import { useBuyer } from "@/components/Buyer";
import { useSamples } from "@/components/SampleBox";
import { SAMPLE_PRICE } from "@/lib/data";

/**
 * Deep-green sample block. Signed out: sign in / create an account. Signed in: add the hero products.
 * The switch previews the signed-in view without signing in (design review only).
 */
export default function SampleBlock({
  slug,
  brandName,
  products,
  ctaPrefix,
}: {
  slug: string;
  brandName: string;
  products: { id: string; name: string; sample: string }[];
  ctaPrefix: string;
}) {
  const { buyer } = useBuyer();
  const { has, toggle } = useSamples();
  const [preview, setPreview] = useState(false);
  const signedIn = !!buyer || preview;
  const next = encodeURIComponent(`/brands/${slug}`);

  return (
    <div className="sblock">
      <div className="sblock__text">
        <span className="eyebrow">No MOQ</span>
        <h2>Sample {brandName} at ${SAMPLE_PRICE} a unit.</h2>
        <p>1 unit of each product, once. Mix any 5 products across brands and shipping is on us.</p>
      </div>
      <div className="sblock__act">
        {signedIn ? (
          <ul className="sblock__list">
            {products.map((p) => {
              const added = has(p.id);
              return (
                <li key={p.id}>
                  <span>{p.name} <small>{p.sample}</small></span>
                  <button type="button" className="btn btn--invert btn--sm" aria-pressed={added} onClick={() => toggle(p.id)} data-cta-id={`${ctaPrefix}_${p.id.replace(/-/g, "_")}_sample`}>
                    {added ? "Added ✓" : "Add to sample box"}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="sblock__auth">
            <Link href={`/signin?next=${next}`} className="btn btn--invert" data-cta-id={`${ctaPrefix}_signin`}>Sign in to order samples</Link>
            <Link href={`/signup?next=${next}`} className="link small" data-cta-id={`${ctaPrefix}_signup`}>Create a buyer account</Link>
          </div>
        )}
        {!buyer && (
          <label className="check sblock__toggle">
            <input type="checkbox" checked={preview} onChange={(e) => setPreview(e.target.checked)} data-cta-id={`${ctaPrefix}_preview`} />
            <i aria-hidden />
            <span>Preview as signed-in buyer</span>
          </label>
        )}
      </div>
    </div>
  );
}
