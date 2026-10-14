import { t } from "@/content/sections";
import QuickInquiryForm from "@/components/conversion/QuickInquiryForm";
import MediaFrame from "@/components/media/MediaFrame";
import InfoTable from "@/components/section/InfoTable";
import { SectionAddons, SectionHead, type SectionProps } from "../parts";

/**
 * Label/value table (company facts, shipping terms…) with a map or image beside it,
 * optional team placeholders, and an inquiry form — beside the table (placement "side")
 * or in its own block at the bottom (placement "below", the default when there's a map/image).
 */
export default function CompanyInfoSection({ s, locale, page }: SectionProps) {
  const image = s.images?.[0];
  const form = s.addons?.find((a) => a.type === "inquiryForm");
  const formBeside = form && (form.placement === "side" || (!form.placement && !s.map && !image));

  const formView = form && (
    <QuickInquiryForm
      id={formBeside ? form.anchor : undefined}
      ctaId={form.ctaId}
      title={form.title && t(form.title, locale)}
      lede={form.lede && t(form.lede, locale)}
      submitLabel={form.submitLabel && t(form.submitLabel, locale)}
    />
  );

  const mapView = s.map ? (
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
  ) : image ? (
    <MediaFrame src={image.src} alt={t(image.alt, locale)} caption={t(image.caption, locale)} fallback={image.fallback} ratio={image.ratio ?? "4 / 3"} fit={image.fit} />
  ) : null;

  const side = formBeside ? formView : mapView;

  return (
    <section id={s.id} className="section about-sec">
      <div className="wrap">
        <SectionHead s={s} locale={locale} />
        <div className={side ? `about-company ${s.imageSide === "start" && !formBeside ? "about-company--media-start" : ""}` : ""}>
          <div className="about-company__main">
            {s.body && <p className="about-company__body">{t(s.body, locale)}</p>}
            <InfoTable rows={(s.items ?? []).map((it) => ({ key: it.key, label: t(it.title, locale), value: t(it.value, locale) }))} />
            {formBeside && mapView}
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
        {form && !formBeside && (
          <div id={form.anchor} className="about-contact about-split">
            <div>
              <span className="eyebrow about-label">{form.intro ? t(form.intro.label, locale) : "Contact"}</span>
              {form.intro && <p className="about-contact__text">{t(form.intro.text, locale)}</p>}
            </div>
            {formView}
          </div>
        )}
        <SectionAddons s={s} locale={locale} />
      </div>
    </section>
  );
}
