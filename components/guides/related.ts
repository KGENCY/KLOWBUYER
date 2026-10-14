import { t } from "@/content/i18n";
import { GUIDES, guideHref, monthLabel, type Guide } from "@/content/guides";
import type { RelatedGuide } from "./ArticleLayout";

const TYPE_LABEL = { import: "Import guide", trend: "Trend report", ingredient: "Ingredient guide" } as const;

export const guideCardTitle = (g: Guide) => (g.type === "trend" ? `Korea Trend Report – ${monthLabel(g.month)}` : t(g.title));

/** Three other guides: same type first, then the rest. */
export function relatedGuides(current: Guide, limit = 3): RelatedGuide[] {
  const others = GUIDES.filter((g) => g.enabled && g.slug !== current.slug);
  const ordered = [...others.filter((g) => g.type === current.type), ...others.filter((g) => g.type !== current.type)];
  return ordered.slice(0, limit).map((g) => ({
    key: `${g.type}_${g.slug.replace(/-/g, "_")}`,
    href: guideHref(g),
    label: TYPE_LABEL[g.type],
    title: guideCardTitle(g),
    summary: t(g.summary),
  }));
}
