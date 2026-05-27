import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/i18n/get-dictionary";
import { Button, SectionHeading } from "@/components/ui";
import {
  galleryCategories,
  galleryCategoryCovers,
  getGalleryCount,
  type GalleryCategory,
} from "@/lib/images";

interface GalleryPreviewProps {
  dict: Dictionary;
  locale: string;
}

export function GalleryPreview({ dict, locale }: GalleryPreviewProps) {
  return (
    <section id="gallery" className="section-padding bg-brand-dark">
      <div className="container-max">
        <SectionHeading
          title={dict.gallery.title}
          subtitle={dict.gallery.subtitle}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {galleryCategories.map((category) => (
            <Link
              key={category}
              href={`/${locale}/gallery?category=${category}`}
              className="group relative aspect-[3/4] overflow-hidden rounded-sm"
            >
              <Image
                src={galleryCategoryCovers[category as GalleryCategory]}
                alt={dict.gallery.categories[category]}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-brand-black/20 transition-opacity group-hover:via-brand-black/50" />
              <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-center">
                <h3 className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-wider text-brand-white sm:text-3xl">
                  {dict.gallery.categories[category]}
                </h3>
                <p className="mt-2 text-sm text-brand-muted">
                  {getGalleryCount(category)} {dict.gallery.photoCount}
                </p>
                <span className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent opacity-0 transition-opacity group-hover:opacity-100">
                  {dict.gallery.explore}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button href={`/${locale}/gallery`} variant="primary" size="lg">
            {dict.gallery.viewAll}
          </Button>
        </div>
      </div>
    </section>
  );
}
