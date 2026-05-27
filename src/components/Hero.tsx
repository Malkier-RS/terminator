import Image from "next/image";
import type { Dictionary } from "@/i18n/get-dictionary";
import { Button } from "@/components/ui";
import { siteImages } from "@/lib/images";

interface HeroProps {
  dict: Dictionary;
  locale: string;
}

export function Hero({ dict, locale }: HeroProps) {
  const navHref = (id: string) => `/${locale}#${id}`;

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          src={siteImages.hero}
          alt="Terminator Fitness Club"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="gradient-overlay absolute inset-0" />
        <div className="absolute inset-0 bg-brand-black/40" />
      </div>

      <div className="absolute inset-0 opacity-20">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
          }}
        />
      </div>

      <div className="container-max relative z-10 px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <div className="max-w-4xl animate-fade-in-up">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-brand-accent">
            {dict.hero.subtitle}
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-4xl leading-tight uppercase tracking-wide text-brand-white sm:text-5xl md:text-6xl lg:text-7xl">
            {dict.hero.title}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-brand-light/90 sm:text-xl">
            {dict.hero.intro}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href={navHref("contact")} variant="primary" size="lg">
              {dict.hero.ctaJoin}
            </Button>
            <Button href={navHref("locations")} variant="outline" size="lg">
              {dict.hero.ctaLocations}
            </Button>
            <Button href={navHref("pricing")} variant="ghost" size="lg">
              {dict.hero.ctaPricing}
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a
          href={navHref("about")}
          className="flex flex-col items-center gap-2 text-brand-muted transition-colors hover:text-brand-accent"
          aria-label="Scroll down"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
