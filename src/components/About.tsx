import Image from "next/image";
import type { Dictionary } from "@/i18n/get-dictionary";
import { SectionHeading, Stat } from "@/components/ui";
import { siteImages } from "@/lib/images";

interface AboutProps {
  dict: Dictionary;
}

export function About({ dict }: AboutProps) {
  return (
    <section id="about" className="section-padding bg-brand-black">
      <div className="container-max">
        <SectionHeading title={dict.about.title} align="left" />

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-lg leading-relaxed text-brand-light/90 sm:text-xl">
              {dict.about.story}
            </p>
            <div className="mt-8 rounded-sm border border-brand-accent/20 bg-brand-dark p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
                {dict.about.missionLabel}
              </p>
              <p className="mt-3 text-lg text-brand-white">{dict.about.mission}</p>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
            <Image
              src={siteImages.about}
              alt="Terminator Fitness Club interior"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 to-transparent" />
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-10 border-t border-white/5 pt-16 sm:grid-cols-3">
          <Stat value="4" label={dict.about.stats.locations} />
          <Stat value="200+" label={dict.about.stats.members} />
          <Stat value="27" label={dict.about.stats.years} />
        </div>
      </div>
    </section>
  );
}
