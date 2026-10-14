import type { Localized } from "./i18n";

/**
 * Downloadable resources offered in exchange for an email.
 * Pages pick them by `id`; the files themselves don't exist yet (UI only).
 */
export interface LeadMagnet {
  id: string;
  title: Localized;
  description: Localized;
  format: "PDF" | "XLSX";
  /** Short mono tag on the thumbnail, e.g. the market it covers. */
  tag: Localized;
  enabled: boolean;
}

export const LEAD_MAGNETS: LeadMagnet[] = [
  {
    id: "mexico-import-checklist",
    title: { en: "Mexico import checklist" },
    description: { en: "COFEPRIS labelling, the documents customs asks for, and what to prepare before your first order." },
    format: "PDF",
    tag: { en: "Mexico" },
    enabled: true,
  },
  {
    id: "eaeu-document-pack",
    title: { en: "Central Asia (EAEU) document pack" },
    description: { en: "EAC declarations, Russian labels and the paperwork for Kazakhstan, Uzbekistan and Kyrgyzstan." },
    format: "PDF",
    tag: { en: "EAEU" },
    enabled: true,
  },
  {
    id: "gcc-labelling-guide",
    title: { en: "UAE & GCC labelling guide" },
    description: { en: "Arabic label requirements and product registration steps for the UAE, Saudi Arabia and the Gulf." },
    format: "PDF",
    tag: { en: "GCC" },
    enabled: true,
  },
  {
    id: "uae-registration-guide",
    title: { en: "UAE registration guide" },
    description: { en: "How cosmetics are registered for sale in the UAE, what the importer files, and the Arabic label rules." },
    format: "PDF",
    tag: { en: "UAE" },
    enabled: true,
  },
  {
    id: "brand-catalog",
    title: { en: "KLOW brand catalog" },
    description: { en: "Every brand we supply, with hero products, MSRP and the markets each one is cleared for." },
    format: "PDF",
    tag: { en: "Catalog" },
    enabled: true,
  },
  {
    id: "wholesale-price-list",
    title: { en: "Wholesale price list" },
    description: { en: "Sample and MOQ prices for the full collection, updated [MONTH YEAR]." },
    format: "XLSX",
    tag: { en: "Prices" },
    enabled: true,
  },
];

export const leadMagnetsById = (ids: string[]) =>
  ids.map((id) => LEAD_MAGNETS.find((m) => m.id === id && m.enabled)).filter((m): m is LeadMagnet => !!m);
