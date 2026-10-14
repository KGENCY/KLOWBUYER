import { t } from "@/content/sections";
import QuickInquiryForm from "@/components/conversion/QuickInquiryForm";
import ContextCTA from "@/components/conversion/ContextCTA";
import { SectionAddons, SectionHead, type SectionProps } from "../parts";

/** A pitch with bullet points on one side and the quick inquiry form (from the inquiryForm addon) on the other. */
export default function InquirySection({ s, locale }: SectionProps) {
  const form = s.addons?.find((a) => a.type === "inquiryForm");
  const band = s.addons?.find((a) => a.type === "contextCta");
  return (
    <section id={s.id} className="section about-sec about-inquiry">
      <div className="wrap about-split">
        {band ? (
          <ContextCTA id={band.ctaId} variant={band.variant} text={t(band.text, locale)} secondary={band.secondary} href={band.href} tone={band.tone} />
        ) : (
        <div>
          <SectionHead s={s} locale={locale} />
          {s.body && <p className="about-regions__body">{t(s.body, locale)}</p>}
          {!!s.items?.length && (
            <ul className="about-ticks">
              {s.items.map((it, i) => <li key={it.key ?? i}>{t(it.title, locale)}</li>)}
            </ul>
          )}
        </div>
        )}
        {form && (
          <QuickInquiryForm
            id={form.anchor}
            ctaId={form.ctaId}
            title={form.title && t(form.title, locale)}
            lede={form.lede && t(form.lede, locale)}
            submitLabel={form.submitLabel && t(form.submitLabel, locale)}
          />
        )}
      </div>
      {s.addons?.some((a) => a.type !== "inquiryForm" && a.type !== "contextCta") && (
        <div className="wrap"><SectionAddons s={s} locale={locale} /></div>
      )}
    </section>
  );
}
