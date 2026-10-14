export type Locale = "en" | "es" | "ru" | "ar";
export const RTL_LOCALES: Locale[] = ["ar"];

/** A text field that can be translated. `en` is required and is the fallback for every other locale. */
export type Localized = { en: string } & Partial<Record<Exclude<Locale, "en">, string>>;

/** Picks the text for a locale, falling back to English. */
export function t(text: Localized | undefined, locale: Locale = "en"): string {
  if (!text) return "";
  return text[locale] ?? text.en;
}
