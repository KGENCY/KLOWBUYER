import { t } from "@/content/sections";
import QuickInquiryForm from "@/components/conversion/QuickInquiryForm";
import MediaFrame from "@/components/media/MediaFrame";
import InfoTable from "@/components/section/InfoTable";
import { SectionAddons, SectionHead, type SectionProps } from "../parts";

/**
 * Label/value table (company facts, shipping terms…), with an inquiry form beside it when one is attached,
 * then an optional map and team placeholders.
 */
export default function CompanyInfoSection({ s, locale, page }: SectionProps) {
  const map = s.images?.[0];
  const form = s.addons?.find((a) => a.type === "inquiryForm");
  const mapFrame = s.map ? (
    <figure className="media">
      <div className="media__frame" style={{ aspectRatio: "4 / 3" }}>
        <iframe
          className="media__map"
          title={t(s.map.label, locale)}
          src={`https://www.google.com/maps?q=${encodeURIComponent(s.map.query)}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <figcaption className="media__cap">
        {t(s.map.label, locale)}
        <a className="link" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.map.query)}`} target="_blank" rel="noopener noreferrer" data-cta-id={`${page}_company_map`}>
          Open in Google Maps
        </a>
      </figcaption>
    </figure>
  ) : null;
  const side = form ? (
    <QuickInquiryForm
      id={form.anchor}
      ctaId={form.ctaId}
      title={form.title && t(form.title, locale)}
      lede={form.lede && t(form.lede, locale)}
      submitLabel={form.submitLabel && t(form.submitLabel, locale)}
    />
  ) : mapFrame ? (
    mapFrame
  ) : map ? (
    <MediaFrame src={map.src} alt={t(map.alt, locale)} caption={t(map.caption, locale)} fallback={map.fallback} ratio="4 / 3" />
  ) : null;

  return (
    <section id={s.id} className="section about-sec">
      <div className="wrap">
        <SectionHead s={s} locale={locale} />
        <div className={side ? "about-company" : ""}>
          <div className="about-company__main">
            <InfoTable rows={(s.items ?? []).map((it) => ({ key: it.key, label: t(it.title, locale), value: t(it.value, locale) }))} />
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
