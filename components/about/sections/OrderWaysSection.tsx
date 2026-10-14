import { t } from "@/content/sections";
import OrderWays from "../OrderWays";
import { SectionAddons, SectionHead, type SectionProps } from "../parts";

/** "Three ways to order" — card data comes from the section's `ways`. */
export default function OrderWaysSection({ s, locale, page }: SectionProps) {
  const cards = (s.ways ?? []).map((w, i) => ({
    key: w.key,
    number: String(i + 1).padStart(2, "0"),
    name: t(w.name, locale),
    tag: t(w.tag, locale),
    rows: w.rows.map((r) => ({ label: t(r.label, locale), value: t(r.value, locale) })),
    price: w.price,
    cta: { label: t(w.cta.label, locale), href: w.cta.href, ctaId: w.cta.ctaId },
    highlight: w.highlight && t(w.highlight, locale),
  }));
  return (
    <section id={s.id} className="section about-sec">
      <div className="wrap">
        <SectionHead s={s} locale={locale} />
        <OrderWays cards={cards} toggleLabel={t(s.previewToggle, locale) || "Preview as signed-in buyer"} ctaPrefix={`${page}_${s.id}`} />
        <SectionAddons s={s} locale={locale} />
      </div>
    </section>
  );
}
