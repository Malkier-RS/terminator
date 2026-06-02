"use client";

import Image from "next/image";
import { useEffect } from "react";
import type { Dictionary, LocationItem } from "@/i18n/get-dictionary";
import { siteImages } from "@/lib/images";
import { LocationAmenityIcon } from "./LocationAmenityIcon";

interface LocationDetailModalProps {
  location: LocationItem;
  dict: Dictionary;
  onClose: () => void;
}

export function LocationDetailModal({
  location,
  dict,
  onClose,
}: LocationDetailModalProps) {
  const imageSrc =
    siteImages.locations[location.id as keyof typeof siteImages.locations];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-brand-black/90 p-4 backdrop-blur-sm sm:items-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="location-modal-title"
    >
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-sm bg-brand-dark"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-sm border border-white/10 text-brand-white transition-colors hover:border-brand-accent hover:text-brand-accent"
          aria-label={dict.locations.closeDetails}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative aspect-[16/9] w-full">
          <Image
            src={imageSrc}
            alt={location.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 672px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/30 to-transparent" />
        </div>

        <div className="p-6 sm:p-8">
          <h3
            id="location-modal-title"
            className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-wide text-brand-white sm:text-3xl"
          >
            {location.name}
          </h3>

          {location.extendedDescription && (
            <p className="mt-4 leading-relaxed text-brand-light/90">
              {location.extendedDescription}
            </p>
          )}

          {location.highlights && location.highlights.length > 0 && (
            <ul className="mt-4 space-y-2">
              {location.highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-brand-muted"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-accent" />
                  {item}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
              {dict.locations.amenitiesTitle}
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {location.amenities.map((amenity) => (
                <div
                  key={amenity}
                  className="flex flex-col items-center gap-2 rounded-sm border border-white/5 bg-brand-gray px-3 py-4 text-center transition-colors hover:border-brand-accent/30"
                >
                  <span className="text-brand-accent">
                    <LocationAmenityIcon amenity={amenity} />
                  </span>
                  <span className="text-xs leading-snug text-brand-light">
                    {dict.locations.amenityLabels[amenity]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 space-y-4 border-t border-white/5 pt-6 text-sm">
            <p className="text-brand-light">{location.address}</p>
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
            {location.phone && (
              <a
                href={`tel:${location.phone.replace(/\s/g, "")}`}
                className="inline-block text-brand-accent transition-colors hover:text-brand-accent-hover"
              >
                {location.phone}
              </a>
            )}
          </div>

          {location.mapUrl && (
            <a
              href={location.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-brand-accent transition-colors hover:text-brand-white"
            >
              {dict.locations.viewOnMap}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
      </div>
    </div>
  );
}
