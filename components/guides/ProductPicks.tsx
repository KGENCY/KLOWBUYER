"use client";

import Link from "next/link";
import { useBuyer } from "@/components/Buyer";
import { useSamples } from "@/components/SampleBox";
import MediaFrame from "@/components/media/MediaFrame";
import LockedPrice from "@/components/conversion/LockedPrice";
import type { IllustrationName } from "@/types/content";

export type PickCard = {
  id: string;
  name: string;
  brandName: string;
  brandHref: string;
  /** Partner brands sample from 1 unit; major brands are sold at MOQ only. */
  sampleable: boolean;
  onlyOnKlow: boolean;
  volume: string;
  heroIngredient: string;
  image: { src?: string; alt: string; fallback: IllustrationName };
  sample: string;
  msrp: string;
  moq: string;
  moqUnits: string;
};

/**
 * Product grid for guides. Partner products: sample price + "Add to sample box".
 * Major-brand products: MSRP + locked wholesale price + a link to request a quote (no single-unit samples).
 */
export default function ProductPicks({ products, ctaPrefix }: { products: PickCard[]; ctaPrefix: string }) {
  const { buyer } = useBuyer();
  const { has, toggle } = useSamples();
  return (
    <ul className="bgrid picks">
      {products.map((p) => {
        const added = has(p.id);
        const id = p.id.replace(/-/g, "_");
        return (
          <li key={p.id} className={`bcard ${added ? "is-on" : ""}`}>
            <MediaFrame src={p.image.src} alt={p.image.alt} fallback={p.image.fallback} ratio="4 / 3" />
            <div className="bcard__body">
              <span className="picks__brand">
                <Link href={p.brandHref}>{p.brandName}</Link>
                {p.onlyOnKlow && <em className="menu__badge">Only on KLOW</em>}
              </span>
              <h3>{p.name}</h3>
              <span className="bcard__meta">{p.volume} · {p.heroIngredient}</span>
              {p.sampleable ? (
                <LockedPrice sample={p.sample} moq={p.moq} moqUnits={p.moqUnits} isLoggedIn={!!buyer} ctaId={`${ctaPrefix}_${id}_signin`} />
              ) : (
                <LockedPrice sample={p.msrp} moq={p.moq} moqUnits={p.moqUnits} isLoggedIn={!!buyer} ctaId={`${ctaPrefix}_${id}_signin`} publicLabel="MSRP" publicNote="" lockedLabel="Wholesale" />
              )}
              {p.sampleable ? (
                <button type="button" className={`btn ${added ? "btn--solid" : "btn--ghost"} btn--sm bcard__add`} aria-pressed={added} onClick={() => toggle(p.id)} data-cta-id={`${ctaPrefix}_${id}_sample`}>
                  {added ? "In your sample box ✓" : "Add to sample box"}
                </button>
              ) : (
                <Link href={`${p.brandHref}#quote`} className="btn btn--ghost btn--sm bcard__add" data-cta-id={`${ctaPrefix}_${id}_quote`}>
                  Wholesale quote
                </Link>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
