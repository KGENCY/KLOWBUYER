import type { Locale, LocalizedText } from "@/types/content";

export { RTL_LOCALES, type Locale, type LocalizedText } from "@/types/content";

/** Older name for LocalizedText, kept so existing content files read the same. */
export type Localized = LocalizedText;

/** The site's current locale. Fixed to English until translations exist. */
export const DEFAULT_LOCALE: Locale = "en";

/** Picks the text for a locale, falling back to English. */
export function t(text: LocalizedText | undefined, locale: Locale = DEFAULT_LOCALE): string {
  if (!text) return "";
  return text[locale] ?? text.en;
}
