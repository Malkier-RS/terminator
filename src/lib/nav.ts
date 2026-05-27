import type { Locale } from "@/i18n/config";

type NavKey = "home" | "about" | "locations" | "pricing" | "gallery" | "contact";

export function getNavHref(locale: Locale | string, key: NavKey): string {
  if (key === "home") return `/${locale}#home`;
  return `/${locale}#${key}`;
}
