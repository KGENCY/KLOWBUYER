/**
 * Shared page schema for the About group (/about, /shipping, /ordering-payment).
 *
 * A page is a list of typed sections. Components only read this shape, so an admin can later
 * CRUD the JSON without touching code: the renderer shows `enabled` sections sorted by `order`.
 */
import type { Localized } from "./i18n";
import type { CtaVariant } from "./cta";
import type { FaqCategory } from "./faq";

export { t, RTL_LOCALES, type Locale, type Localized } from "./i18n";

/** Name of the built-in SVG drawn when an image has no `src` yet. */
export type Fallback = "warehouse" | "shelves" | "inspection" | "packing" | "worldMap" | "location" | "portrait";

export interface AboutImage {
  /** Real photo URL. Leave empty to show the `fallback` illustration. */
  src?: string;
  alt: Localized;
  caption?: Localized;
  fallback: Fallback;
}

export interface AboutItem {
  /** Stable machine key, used where other code needs to find a specific row (e.g. JSON-LD, data-cta-id). */
  key?: string;
  title: Localized;
  description?: Localized;
  /** Big figure (stats) or the value cell (label/value tables). */
  value?: Localized;
  /** related: where the card goes. */
  href?: string;
}

export interface AboutLink {
  label: Localized;
  href: string;
  variant: "primary" | "secondary";
  /** Analytics hook, rendered as data-cta-id. */
  ctaId: string;
}

export interface AboutPerson {
  name: Localized;
  role: Localized;
  image: AboutImage;
}

/** Conversion blocks attached to a section; rendered at the section's end (inquiry forms beside its content). */
export type AboutAddon =
  | { type: "contextCta"; variant: CtaVariant; text: Localized; ctaId: string; secondary?: CtaVariant | false }
  | { type: "leadMagnets"; ids: string[]; title?: Localized; ctaPrefix: string }
  | { type: "inquiryForm"; ctaId: string; anchor?: string; title?: Localized; lede?: Localized; submitLabel?: Localized };

export type SectionType =
  | "hero" | "split" | "grid" | "gallery" | "regions" | "steps"
  | "companyInfo" | "facts" | "pricing" | "inquiry" | "faq" | "cta" | "related";

export interface AboutSection {
  /** Also the anchor id on the page (e.g. /about#company). */
  id: string;
  type: SectionType;
  enabled: boolean;
  order: number;
  /** Shown before the label, e.g. "01". */
  number?: string;
  label?: Localized;
  title?: Localized;
  /** Second line of the title, shown in grey. */
  subtitle?: Localized;
  body?: Localized;
  items?: AboutItem[];
  images?: AboutImage[];
  links?: AboutLink[];
  /** grid: column count on desktop. */
  columns?: 3 | 4;
  /** grid: partner brand names shown as a row of muted text logos. */
  logos?: Localized[];
  /** companyInfo: team placeholders. */
  people?: AboutPerson[];
  /** faq: which category of content/faq.ts to show. */
  faqCategory?: FaqCategory;
  addons?: AboutAddon[];
}

export interface AboutPage {
  seo: { title: Localized; description: Localized };
  /** Prefix for every data-cta-id on the page, e.g. "about". */
  ctaPrefix: string;
  sections: AboutSection[];
}
