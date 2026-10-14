"use client";

import Link from "next/link";
import { useSamples } from "@/components/SampleBox";
import MediaFrame from "@/components/media/MediaFrame";

export type SimilarCard = {
  slug: string;
  name: string;
  image: { src?: string; alt: string; fallback: "brand-placeholder" | "product-bottle" };
  onlyOnKlow: boolean;
  /** "Similar to Anua's Heartleaf 77% Soothing Toner" */
  similarTo: string;
  badges: string[];
  product?: { id: string; name: string; sample: string; msrp: string };
};

/**
 * Partner brands next to a major brand: large image-led cards that scroll sideways on mobile.
 * "Add sample" puts the partner's hero product in the sample box (partners sample from 1 unit).
 */
export default function SimilarBrands({ cards, ctaPrefix }: { cards: SimilarCard[]; ctaPrefix: string }) {
  const { has, toggle } = useSamples();
  return (
    <ul className="sim">
      {cards.map((c) => {
        const added = c.product ? has(c.product.id) : false;
        return (
          <li key={c.slug} className="sim__card">
            <MediaFrame src={c.image.src} alt={c.image.alt} fallback={c.image.fallback} ratio="4 / 3" />
            <div className="sim__body">
              <h3 className="sim__name">
                {c.name}
                {c.onlyOnKlow && <em className="menu__badge">Only on KLOW</em>}
              </h3>
              <p className="sim__to">{c.similarTo}</p>
              {!!c.badges.length && (
                <ul className="sim__badges">
                  {c.badges.map((b) => <li key={b}>{b}</li>)}
                </ul>
              )}
              {c.product && (
                <div className="sim__product">
                  <span className="sim__pname">{c.product.name}</span>
                  <span className="sim__prices">
                    <b>{c.product.sample}</b> sample · <span>{c.product.msrp}</span> MSRP
                  </span>
                </div>
              )}
              <div className="sim__act">
                <Link href={`/brands/${c.slug}`} className="btn btn--solid btn--sm" data-cta-id={`${ctaPrefix}_${c.slug.replace(/-/g, "_")}_view`}>
                  View brand
                </Link>
                {c.product && (
                  <button
                    type="button"
                    className="link small"
                    aria-pressed={added}
                    onClick={() => toggle(c.product!.id)}
                    data-cta-id={`${ctaPrefix}_${c.slug.replace(/-/g, "_")}_sample`}
                  >
                    {added ? "Sample added ✓" : "Add sample"}
                  </button>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
