import Image from "next/image";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { siteImages } from "@/lib/images";
import { getNavHref } from "@/lib/nav";

interface FooterProps {
  dict: Dictionary;
  locale: Locale;
}

export function Footer({ dict, locale }: FooterProps) {
  return (
    <footer className="border-t border-white/5 bg-brand-dark">
      <div className="container-max px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <div className="flex items-center gap-4">
            <Image
              src={siteImages.logo}
              alt="Terminator Fitness"
              width={40}
              height={40}
              className="rounded-sm object-cover"
            />
            <div>
              <p className="font-[family-name:var(--font-display)] text-lg uppercase tracking-wider text-brand-white">
                Terminator Fitness
              </p>
              <p className="text-sm text-brand-accent">{dict.footer.tagline}</p>
            </div>
          </div>

          <nav className="flex flex-wrap justify-center gap-6">
            {(["home", "about", "locations", "pricing", "gallery", "contact"] as const).map(
              (key) => (
                <a
                  key={key}
                  href={getNavHref(locale, key)}
                  className="text-xs uppercase tracking-widest text-brand-muted transition-colors hover:text-brand-accent"
                >
                  {dict.nav[key]}
                </a>
              )
            )}
          </nav>
        </div>

        <div className="mt-8 border-t border-white/5 pt-8 text-center text-sm text-brand-muted">
          {dict.footer.rights}
        </div>
      </div>
    </footer>
  );
}
