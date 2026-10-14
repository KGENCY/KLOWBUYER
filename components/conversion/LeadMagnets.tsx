import type { Locale } from "@/content/i18n";
import { leadMagnetsById } from "@/content/leadMagnets";
import LeadMagnetCard from "./LeadMagnetCard";

/** A row of resource cards. Each card's data-cta-id is `${ctaPrefix}_${magnet.id}`. */
export default function LeadMagnets({ ids, ctaPrefix, title = "Free resources", locale = "en" }: { ids: string[]; ctaPrefix: string; title?: string; locale?: Locale }) {
  const list = leadMagnetsById(ids);
  if (!list.length) return null;
  return (
    <div className="leads">
      <span className="eyebrow">{title}</span>
      <div className={`leads__grid leads__grid--${Math.min(list.length, 3)}`}>
        {list.map((m) => <LeadMagnetCard key={m.id} magnet={m} ctaId={`${ctaPrefix}_${m.id.replace(/-/g, "_")}`} locale={locale} />)}
      </div>
    </div>
  );
}
