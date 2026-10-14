import { t } from "@/content/sections";
import { brandById, productById } from "@/lib/data";
import LockedPriceLive from "@/components/conversion/LockedPriceLive";
import { SectionAddons, SectionHead, type SectionProps } from "../parts";

/**
 * How pricing works, with one real product as the example.
 * `items[].key` is a product id; its sample price is public and its MOQ price locked until sign-in.
 */
export default function PricingSection({ s, locale, page }: SectionProps) {
  const examples = (s.items ?? []).map((it) => it.key && productById(it.key)).filter((p) => !!p);
  return (
    <section id={s.id} className="section about-sec">
      <div className="wrap">
        <div className="about-split">
          <div>
            <SectionHead s={s} locale={locale} />
            {s.body && <p className="about-regions__body">{t(s.body, locale)}</p>}
          </div>
          <div className="about-pricing">
            {examples.map((p) => {
              const b = brandById(p.brandId);
              return (
                <div key={p.id} className="about-pricing__card">
                  <span className="eyebrow">Example · {b.name}</span>
                  <h3>{p.name} <small>{p.size}</small></h3>
                  <LockedPriceLive sample={p.sample} moq={p.wholesale} moqUnits={b.moq} ctaId={`${page}_pricing_signin`} next={`/products/${p.id}`} />
                </div>
              );
            })}
          </div>
        </div>
        <SectionAddons s={s} locale={locale} />
      </div>
    </section>
  );
}
