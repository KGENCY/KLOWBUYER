/**
 * Shared content types for every page whose words and media live in content/.
 * Field names are meant to be read and written as-is by a future admin (plain JSON).
 */

export type Locale = "en" | "es" | "ru" | "ar";
export const RTL_LOCALES: Locale[] = ["ar"];

/** Translatable text. `en` is required and is the fallback for every other locale. */
export type LocalizedText = { en: string; es?: string; ru?: string; ar?: string };

/** Built-in SVG drawings shown wherever an image has no `src` yet. */
export type IllustrationName =
  | "warehouse"
  | "warehouse-shelves"
  | "inspection"
  | "packing"
  | "world-routes"
  | "product-bottle"
  | "document"
  | "brand-placeholder"
  | "location"
  | "portrait";

export interface MediaImage {
  /** Real photo URL. Leave empty to show the `fallback` drawing. */
  src?: string;
  alt: LocalizedText;
  caption?: LocalizedText;
  fallback: IllustrationName;
  /** CSS aspect-ratio for the frame, e.g. "16 / 10". Each section has its own default. */
  ratio?: string;
  /** "contain" shows the whole image (e.g. a map); default "cover" fills the frame. */
  fit?: "cover" | "contain";
}

export type VideoRatio = "16:9" | "9:16" | "1:1";

export interface MediaVideoItem {
  /** Video file URL. Without it the frame shows a placeholder and doesn't play. */
  src?: string;
  /** Still image shown before playing; without it an SVG placeholder is drawn. */
  poster?: string;
  ratio: VideoRatio;
  title?: LocalizedText;
}

/** A link that counts as a conversion action. `ctaId` is rendered as data-cta-id: [page]_[section]_[action]. */
export interface CtaLink {
  label: LocalizedText;
  href: string;
  ctaId: string;
}
