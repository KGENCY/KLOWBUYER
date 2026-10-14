import Link from "next/link";
import { CTA_FALLBACK, CTA_TARGETS, type CtaVariant } from "./options";

/**
 * The band that closes a section: a sentence, the main button, and the next-best action as a text link.
 * data-cta-id is `${id}_${variant}` for the button and `${id}_${fallback}` for the link.
 */
export default function ContextCTA({
  id,
  variant,
  text,
  secondary,
}: {
  id: string;
  variant: CtaVariant;
  text: string;
  /** Override the text link; pass `false` to hide it. */
  secondary?: CtaVariant | false;
}) {
  const main = CTA_TARGETS[variant];
  const alt = secondary === false ? null : (secondary ?? CTA_FALLBACK[variant]);
  return (
    <div className={`ccta ccta--${variant}`}>
      <p className="ccta__text">{text}</p>
      <div className="ccta__act">
        <Link href={main.href} className="btn btn--solid" data-cta-id={`${id}_${variant}`}>{main.label}</Link>
        {alt && <Link href={CTA_TARGETS[alt].href} className="link small" data-cta-id={`${id}_${alt}`}>{CTA_TARGETS[alt].label}</Link>}
      </div>
    </div>
  );
}
