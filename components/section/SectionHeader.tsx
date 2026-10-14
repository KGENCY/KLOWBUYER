/**
 * "01  LABEL" in mono caps, then the H2 with an optional grey second line, an optional badge and a description.
 * Plain strings in: translate before passing (see t() in content/i18n.ts).
 */
export default function SectionHeader({
  number,
  label,
  title,
  subtitle,
  description,
  badge,
  as: Heading = "h2",
}: {
  number?: string;
  label?: string;
  title?: string;
  /** Second line of the title, shown in grey. */
  subtitle?: string;
  description?: string;
  /** Short green tag under the title, e.g. "Samples ship free at 5 SKUs". */
  badge?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div className="about-head">
      {label && (
        <span className="eyebrow about-label">
          {number && <b>{number}</b>}
          {label}
        </span>
      )}
      {title && (
        <Heading className="h2">
          {title}
          {subtitle && <>{" "}<em>{subtitle}</em></>}
        </Heading>
      )}
      {badge && <span className="about-badge">{badge}</span>}
      {description && <p className="about-head__desc">{description}</p>}
    </div>
  );
}
