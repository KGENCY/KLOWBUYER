import { t } from "@/content/sections";
import QuickInquiryForm from "@/components/conversion/QuickInquiryForm";
import MediaFrame from "../MediaFrame";
import { SectionAddons, SectionHead, type SectionProps } from "../parts";

/**
 * Label/value table (company facts, shipping terms…), with an inquiry form beside it when one is attached,
 * then an optional map and team placeholders.
 */
export default function CompanyInfoSection({ s, locale }: SectionProps) {
  const map = s.images?.[0];
  const form = s.addons?.find((a) => a.type === "inquiryForm");
  const side = form ? (
    <QuickInquiryForm
      id={form.anchor}
      ctaId={form.ctaId}
      title={form.title && t(form.title, locale)}
      lede={form.lede && t(form.lede, locale)}
      submitLabel={form.submitLabel && t(form.submitLabel, locale)}
    />
  ) : map ? (
    <MediaFrame src={map.src} alt={t(map.alt, locale)} caption={t(map.caption, locale)} fallback={map.fallback} ratio="4 / 3" />
  ) : null;

  return (
    <section id={s.id} className="section about-sec">
      <div className="wrap">
        <SectionHead s={s} locale={locale} />
        <div className={side ? "about-company" : ""}>
          <div className="about-company__main">
            <dl className="about-facts">
              {s.items?.map((it, i) => (
                <div key={it.key ?? i}>
                  <dt>{t(it.title, locale)}</dt>
                  <dd>{t(it.value, locale)}</dd>
                </div>
              ))}
            </dl>
            {form && map && (
              <MediaFrame src={map.src} alt={t(map.alt, locale)} caption={t(map.caption, locale)} fallback={map.fallback} ratio="16 / 7" />
            )}
          </div>
          {side && <div className="about-company__side">{side}</div>}
        </div>
        {!!s.people?.length && (
          <ul className="about-team">
            {s.people.map((p, i) => (
              <li key={i}>
                <MediaFrame src={p.image.src} alt={t(p.image.alt, locale)} fallback={p.image.fallback} ratio="4 / 5" />
                <b>{t(p.name, locale)}</b>
                <span>{t(p.role, locale)}</span>
              </li>
            ))}
          </ul>
        )}
        <SectionAddons s={s} locale={locale} />
      </div>
    </section>
  );
}
