import Link from "next/link";
import { t, type AboutLink, type AboutSection, type Locale } from "@/content/sections";
import ContextCTA from "@/components/conversion/ContextCTA";
import LeadMagnets from "@/components/conversion/LeadMagnets";
import SectionHeader from "@/components/section/SectionHeader";

/** `page` is the page's data-cta-id prefix, e.g. "about". */
export type SectionProps = { s: AboutSection; locale: Locale; page: string };

/** The fields a section heading needs, so non-About sections (e.g. the FAQ) can reuse it. */
export type HeadFields = Pick<AboutSection, "number" | "label" | "title" | "subtitle" | "badge">;

/** "01  WHO WE ARE" — mono label with the section number in green. */
export function SectionLabel({ s, locale }: { s: HeadFields; locale: Locale }) {
  if (!s.label) return null;
  return (
    <span className="eyebrow about-label">
      {s.number && <b>{s.number}</b>}
      {t(s.label, locale)}
    </span>
  );
}

/** Label + H2, with the subtitle as a grey second line (same pattern as the landing hero). */
export function SectionHead({ s, locale }: { s: HeadFields; locale: Locale }) {
  return (
    <SectionHeader
      number={s.number}
      label={s.label && t(s.label, locale)}
      title={s.title && t(s.title, locale)}
      subtitle={s.subtitle && t(s.subtitle, locale)}
      badge={s.badge && t(s.badge, locale)}
    />
  );
}

/** Primary links become the black arrow button, secondary ones an underlined text link. */
export function Links({ links, locale, className = "about-links", invert }: { links?: AboutLink[]; locale: Locale; className?: string; invert?: boolean }) {
  if (!links?.length) return null;
  return (
    <div className={className}>
      {links.map((l) => (
        <Link
          key={l.ctaId}
          href={l.href}
          className={l.variant === "primary" ? `btn ${invert ? "btn--invert" : "btn--solid"}` : "link small"}
          data-cta-id={l.ctaId}
        >
          {t(l.label, locale)}
        </Link>
      ))}
    </div>
  );
}

/** Context CTA bands and resource cards attached to a section, shown at its end. */
export function SectionAddons({ s, locale }: { s: AboutSection; locale: Locale }) {
  return (
    <>
      {s.addons?.map((a, i) => {
        if (a.type === "contextCta")
          return <ContextCTA key={i} id={a.ctaId} variant={a.variant} text={t(a.text, locale)} secondary={a.secondary} href={a.href} tone={a.tone} />;
        if (a.type === "leadMagnets")
          return <LeadMagnets key={i} ids={a.ids} ctaPrefix={a.ctaPrefix} title={a.title && t(a.title, locale)} locale={locale} />;
        return null; // inquiry forms and country pickers are placed by the section itself
      })}
    </>
  );
}
