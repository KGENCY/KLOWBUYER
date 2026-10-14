"use client";

import { useState } from "react";
import type { CatalogProduct } from "@/content/products";
import { useBuyer } from "@/components/Buyer";
import MediaFrame from "@/components/media/MediaFrame";
import LockedPrice from "@/components/conversion/LockedPrice";
import QuickInquiryForm from "@/components/conversion/QuickInquiryForm";
import SectionHeader from "@/components/section/SectionHeader";
import { brandCta, priceText } from "./format";

const QUANTITIES = ["Under 100", "100–500", "500–2,000", "2,000+"];

/**
 * Bestsellers + quick quote for a brand sold at MOQ. "Add to quote" on a product ticks it in the form below,
 * so the buyer leaves with the products already chosen. MSRP is public; the MOQ price shows to signed-in buyers.
 */
export default function MajorOrder({ slug, brandName, products }: { slug: string; brandName: string; products: CatalogProduct[] }) {
  const { buyer } = useBuyer();
  const [picked, setPicked] = useState<string[]>([]);
  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  return (
    <>
      <section id="bestsellers" className="section about-sec">
        <div className="wrap">
          <SectionHeader
            number="01"
            label="Bestsellers"
            title={`${brandName} at wholesale.`}
            subtitle="Sold at MOQ."
            description={`MSRP is public; your price at MOQ shows once you sign in. Add products to your quote and we’ll price them for your market.`}
          />
          <ul className="bgrid">
            {products.map((p) => {
              const on = picked.includes(p.id);
              return (
                <li key={p.id} className={`bcard ${on ? "is-on" : ""}`}>
                  <MediaFrame src={p.images[0]?.src} alt={p.images[0]?.alt.en ?? p.name} fallback={p.images[0]?.fallback ?? "product-bottle"} ratio="4 / 5" />
                  <div className="bcard__body">
                    <span className="eyebrow">{p.heroIngredient}</span>
                    <h3>{p.name}</h3>
                    <span className="bcard__meta">
                      {p.volume}
                      {p.inStock && <em className="bcard__stock">In stock</em>}
                    </span>
                    <LockedPrice
                      sample={priceText(p.msrp)}
                      moq={priceText(p.moqPrice)}
                      moqUnits={p.moq ?? "[__]"}
                      isLoggedIn={!!buyer}
                      ctaId={brandCta(slug, "bestsellers", `${p.id}_signin`)}
                      next={`/brands/${slug}/wholesale`}
                      publicLabel="MSRP"
                      publicNote=""
                      lockedLabel="Wholesale"
                    />
                    <button
                      type="button"
                      className={`btn ${on ? "btn--solid" : "btn--ghost"} btn--sm bcard__add`}
                      aria-pressed={on}
                      onClick={() => toggle(p.id)}
                      data-cta-id={brandCta(slug, "bestsellers", `${p.id}_quote`)}
                    >
                      {on ? "Added to quote ✓" : "Add to quote"}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section id="quote" className="section about-sec about-inquiry">
        <div className="wrap about-split">
          <div>
            <SectionHeader
              number="02"
              label="Quick quote"
              title={`Get ${brandName} bulk pricing for your market within 24h.`}
              description="Pick the products and a rough quantity. We reply with unit prices at MOQ, lead time and shipping to your country."
            />
          </div>
          <QuickInquiryForm ctaId={brandCta(slug, "quote", "form")} title={`${brandName} bulk quote`} lede="" submitLabel="Get my quote within 24h">
            <fieldset className="field qform__products">
              <legend className="eyebrow">Products</legend>
              {products.map((p) => (
                <label key={p.id} className="check">
                  <input type="checkbox" checked={picked.includes(p.id)} onChange={() => toggle(p.id)} />
                  <i aria-hidden />
                  <span>{p.name} <small className="muted">{p.volume}</small></span>
                </label>
              ))}
            </fieldset>
            <label className="field">
              <span className="eyebrow">Estimated quantity</span>
              <select defaultValue="" data-cta-id={brandCta(slug, "quote", "quantity")}>
                <option value="" disabled>Select</option>
                {QUANTITIES.map((q) => <option key={q}>{q} units</option>)}
              </select>
            </label>
          </QuickInquiryForm>
        </div>
      </section>
    </>
  );
}
