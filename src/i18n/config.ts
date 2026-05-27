export const locales = ["mk", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "mk";

export const localeNames: Record<Locale, string> = {
  mk: "MK",
  en: "EN",
};

export const localeLabels: Record<Locale, string> = {
  mk: "Македонски",
  en: "English",
};

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
