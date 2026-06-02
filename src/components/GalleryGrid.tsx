"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { Dictionary } from "@/i18n/get-dictionary";
import {
  galleryCategories,
  type GalleryCategory,
  getGalleryImagesByCategory,
} from "@/lib/images";
import { cn } from "@/lib/utils";

type FilterCategory = GalleryCategory | "all";

interface GalleryGridProps {
  dict: Dictionary;
  initialCategory?: string;
}

export function GalleryGrid({ dict, initialCategory }: GalleryGridProps) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (
      initialCategory &&
      galleryCategories.includes(initialCategory as GalleryCategory)
    ) {
      setActiveFilter(initialCategory as GalleryCategory);
    }
  }, [initialCategory]);

  const filteredImages = getGalleryImagesByCategory(activeFilter);

  const openLightbox = (index: number) => setLightboxIndex(index);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goToPrevious = useCallback(() => {
    setLightboxIndex((current) =>
      current === null
        ? null
        : (current - 1 + filteredImages.length) % filteredImages.length
    );
  }, [filteredImages.length]);

  const goToNext = useCallback(() => {
    setLightboxIndex((current) =>
      current === null ? null : (current + 1) % filteredImages.length
    );
  }, [filteredImages.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") goToPrevious();
      if (event.key === "ArrowRight") goToNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, closeLightbox, goToPrevious, goToNext]);

  const filters: { key: FilterCategory; label: string }[] = [
    { key: "all", label: dict.gallery.filterAll },
    ...galleryCategories.map((category) => ({
      key: category,
      label: dict.gallery.categories[category],
    })),
  ];

  return (
    <>
      <div className="mb-10 flex flex-wrap justify-center gap-3">
        {filters.map((filter) => (
          <button
            key={filter.key}
            type="button"
            onClick={() => {
              setActiveFilter(filter.key);
              setLightboxIndex(null);
            }}
            className={cn(
              "rounded-sm px-5 py-2.5 text-xs font-semibold uppercase tracking-widest transition-all",
              activeFilter === filter.key
                ? "bg-brand-accent text-brand-black"
                : "border border-white/10 bg-brand-gray text-brand-light hover:border-brand-accent/50 hover:text-brand-white"
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <p className="mb-8 text-center text-sm text-brand-muted">
        {filteredImages.length} {dict.gallery.photoCount}
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredImages.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => openLightbox(index)}
            className="group block w-full overflow-hidden rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={image.src}
                alt={dict.gallery.categories[image.category]}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-brand-black/0 transition-colors group-hover:bg-brand-black/30" />
              <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-brand-black/90 to-transparent p-4 transition-transform duration-300 group-hover:translate-y-0">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
                  {dict.gallery.categories[image.category]}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {lightboxIndex !== null && filteredImages[lightboxIndex] && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-black/95 p-4 backdrop-blur-sm"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={dict.gallery.pageTitle}
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-24 z-10 flex h-10 w-10 items-center justify-center rounded-sm border border-white/20 text-brand-white transition-colors hover:border-brand-accent hover:text-brand-accent sm:top-8"
            aria-label={dict.gallery.close}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-sm border border-white/20 text-brand-white transition-colors hover:border-brand-accent hover:text-brand-accent"
            aria-label={dict.gallery.prev}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              goToNext();
            }}
            className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-sm border border-white/20 text-brand-white transition-colors hover:border-brand-accent hover:text-brand-accent"
            aria-label={dict.gallery.next}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div
            className="relative max-h-[80vh] w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm sm:aspect-[16/10]">
              <Image
                src={filteredImages[lightboxIndex].src}
                alt={dict.gallery.categories[filteredImages[lightboxIndex].category]}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="font-semibold uppercase tracking-widest text-brand-accent">
                {dict.gallery.categories[filteredImages[lightboxIndex].category]}
              </span>
              <span className="text-brand-muted">
                {lightboxIndex + 1} / {filteredImages.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
