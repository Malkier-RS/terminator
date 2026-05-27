"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import { localeNames, locales } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/utils";
import { siteImages } from "@/lib/images";
import { getNavHref } from "@/lib/nav";
import { Button } from "@/components/ui";

interface HeaderProps {
  locale: Locale;
  dict: Dictionary;
}

const navSections = [
  { key: "home" as const },
  { key: "about" as const },
  { key: "locations" as const },
  { key: "pricing" as const },
  { key: "gallery" as const },
  { key: "contact" as const },
];

export function Header({ locale, dict }: HeaderProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const getLocalizedPath = (targetLocale: Locale) => {
    const segments = pathname.split("/");
    segments[1] = targetLocale;
    return segments.join("/") || `/${targetLocale}`;
  };

  const navHref = (key: (typeof navSections)[number]["key"]) =>
    getNavHref(locale, key);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-brand-black/95 backdrop-blur-md border-b border-white/5 shadow-lg"
          : "bg-transparent"
      )}
    >
      <div className="container-max flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href={navHref("home")} className="flex items-center gap-3 group">
          <Image
            src={siteImages.logo}
            alt="Terminator Fitness"
            width={48}
            height={48}
            className="rounded-sm object-cover transition-transform group-hover:scale-105"
          />
          <span className="hidden font-[family-name:var(--font-display)] text-lg uppercase tracking-wider text-brand-white sm:block lg:text-xl">
            Terminator
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {navSections.map(({ key }) => (
            <a
              key={key}
              href={navHref(key)}
              className="text-sm uppercase tracking-widest text-brand-light/80 transition-colors hover:text-brand-accent"
            >
              {dict.nav[key]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex items-center rounded-sm border border-white/10 bg-brand-dark/50 p-0.5">
            {locales.map((loc) => (
              <Link
                key={loc}
                href={getLocalizedPath(loc)}
                className={cn(
                  "px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all rounded-sm",
                  locale === loc
                    ? "bg-brand-accent text-brand-black"
                    : "text-brand-muted hover:text-brand-white"
                )}
              >
                {localeNames[loc]}
              </Link>
            ))}
          </div>

          <Button
            href={navHref("contact")}
            variant="primary"
            size="sm"
            className="hidden sm:inline-flex"
          >
            {dict.hero.ctaJoin}
          </Button>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={isMobileOpen}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/10 lg:hidden"
          >
            <span className="relative h-4 w-5">
              <span
                className={cn(
                  "absolute left-0 h-0.5 w-5 bg-brand-white transition-all duration-300",
                  isMobileOpen ? "top-2 rotate-45" : "top-0"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-2 h-0.5 w-5 bg-brand-white transition-all duration-300",
                  isMobileOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-0.5 w-5 bg-brand-white transition-all duration-300",
                  isMobileOpen ? "top-2 -rotate-45" : "top-4"
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        className={cn(
          "fixed inset-0 top-[72px] z-40 bg-brand-black/98 backdrop-blur-lg transition-all duration-300 lg:hidden",
          isMobileOpen
            ? "visible opacity-100"
            : "invisible opacity-0 pointer-events-none"
        )}
      >
        <nav className="flex flex-col items-center gap-6 px-6 py-12">
          {navSections.map(({ key }) => (
            <a
              key={key}
              href={navHref(key)}
              onClick={() => setIsMobileOpen(false)}
              className="font-[family-name:var(--font-display)] text-3xl uppercase tracking-wider text-brand-white transition-colors hover:text-brand-accent"
            >
              {dict.nav[key]}
            </a>
          ))}
          <Button
            href={navHref("contact")}
            variant="primary"
            size="lg"
            className="mt-4"
            onClick={() => setIsMobileOpen(false)}
          >
            {dict.hero.ctaJoin}
          </Button>
        </nav>
      </div>
    </header>
  );
}
