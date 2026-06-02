"use client";

import Image from "next/image";
import { useState } from "react";
import type { Dictionary, LocationItem } from "@/i18n/get-dictionary";
import { siteImages } from "@/lib/images";
import { LocationDetailModal } from "./LocationDetailModal";

interface LocationCardProps {
  location: LocationItem;
  dict: Dictionary;
}

export function LocationCard({ location, dict }: LocationCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const imageSrc =
    siteImages.locations[location.id as keyof typeof siteImages.locations];

  return (
    <>
      <article className="card-glow group overflow-hidden rounded-sm bg-brand-gray transition-all duration-300 hover:-translate-y-1">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-gray"
        >
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={imageSrc}
              alt={location.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/30 to-transparent" />
            <h3 className="absolute bottom-4 left-4 right-4 font-[family-name:var(--font-display)] text-xl uppercase tracking-wide text-brand-white sm:text-2xl">
              {location.name}
            </h3>
          </div>

          <div className="p-6">
            {location.description && (
              <p className="mb-4 line-clamp-2 text-brand-muted">
                {location.description}
              </p>
            )}

            <p className="mb-2 line-clamp-1 text-sm text-brand-light">
              {location.address}
            </p>

            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent transition-colors group-hover:text-brand-white">
              {dict.locations.viewDetails}
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </div>
        </button>
      </article>

      {isOpen && (
        <LocationDetailModal
          location={location}
          dict={dict}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
