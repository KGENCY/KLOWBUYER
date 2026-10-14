"use client";

import { useSamples } from "@/components/SampleBox";
import MediaFrame from "@/components/media/MediaFrame";
import type { IllustrationName } from "@/types/content";

export type PartnerProductCard = {
  id: string;
  name: string;
  volume: string;
  heroIngredient: string;
  image: { src?: string; alt: string; fallback: IllustrationName };
  sample: string;
  msrp: string;
  margin: number | null;
};

/** Hero products with sample price, MSRP and margin; "Add to sample box" uses the site's sample box. */
export default function PartnerProducts({ products, ctaPrefix }: { products: PartnerProductCard[]; ctaPrefix: string }) {
  const { has, toggle } = useSamples();
  return (
    <ul className="bgrid">
      {products.map((p) => {
        const added = has(p.id);
        return (
          <li key={p.id} className={`bcard ${added ? "is-on" : ""}`}>
            <MediaFrame src={p.image.src} alt={p.image.alt} fallback={p.image.fallback} ratio="4 / 5" />
            <div className="bcard__body">
              <span className="eyebrow">{p.heroIngredient}</span>
              <h3>{p.name}</h3>
              <span className="bcard__meta">{p.volume}</span>
              <dl className="bcard__prices">
                <div><dt>Sample · 1 unit</dt><dd>{p.sample}</dd></div>
                <div><dt>MSRP</dt><dd>{p.msrp}</dd></div>
              </dl>
              <span className="bcard__margin">{p.margin ?? "[__]"}% margin at MSRP</span>
              <button
                type="button"
                className={`btn ${added ? "btn--solid" : "btn--ghost"} btn--sm bcard__add`}
                aria-pressed={added}
                onClick={() => toggle(p.id)}
                data-cta-id={`${ctaPrefix}_${p.id.replace(/-/g, "_")}_sample`}
              >
                {added ? "In your sample box ✓" : "Add to sample box"}
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
