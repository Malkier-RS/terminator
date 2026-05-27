import Image from "next/image";
import type { Dictionary } from "@/i18n/get-dictionary";
import { SectionHeading } from "@/components/ui";
import { siteImages } from "@/lib/images";

interface LocationsProps {
  dict: Dictionary;
}

export function Locations({ dict }: LocationsProps) {
  return (
    <section id="locations" className="section-padding bg-brand-dark">
      <div className="container-max">
        <SectionHeading
          title={dict.locations.title}
          subtitle={dict.locations.subtitle}
        />

        <div className="grid gap-8 md:grid-cols-2">
          {dict.locations.items.map((location) => (
            <article
              key={location.id}
              className="card-glow group overflow-hidden rounded-sm bg-brand-gray transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={
                    siteImages.locations[
                      location.id as keyof typeof siteImages.locations
                    ]
                  }
                  alt={location.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/20 to-transparent" />
                <h3 className="absolute bottom-4 left-4 right-4 font-[family-name:var(--font-display)] text-xl uppercase tracking-wide text-brand-white sm:text-2xl">
                  {location.name}
                </h3>
              </div>

              <div className="p-6">
                {location.description && (
                  <p className="mb-4 text-brand-muted">{location.description}</p>
                )}

                <div className="space-y-4 text-sm">
                  <div className="flex gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                    </svg>
                    <span className="text-brand-light">{location.address}</span>
                  </div>

                  <div className="flex gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <p className="mb-1 font-semibold text-brand-white">
                        {dict.locations.workingHours}
                      </p>
                      {location.hours.map((hour) => (
                        <p key={hour} className="text-brand-muted">
                          {hour}
                        </p>
                      ))}
                    </div>
                  </div>

                  {location.phone && (
                    <div className="flex gap-3">
                      <svg
                        className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <div>
                        <p className="mb-1 font-semibold text-brand-white">
                          {dict.locations.phone}
                        </p>
                        <a
                          href={`tel:${location.phone.replace(/\s/g, "")}`}
                          className="text-brand-accent transition-colors hover:text-brand-accent-hover"
                        >
                          {location.phone}
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {location.mapUrl && (
                  <a
                    href={location.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-brand-accent transition-colors hover:text-brand-accent-hover"
                  >
                    {dict.locations.viewOnMap}
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
