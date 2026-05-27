export const galleryCategories = [
  "equipment",
  "atmosphere",
  "interior",
  "training",
] as const;

export type GalleryCategory = (typeof galleryCategories)[number];

const categoryImageCounts: Record<GalleryCategory, number> = {
  equipment: 10,
  atmosphere: 8,
  interior: 10,
  training: 9,
};

function buildCategoryImages(category: GalleryCategory, count: number) {
  return Array.from({ length: count }, (_, index) => ({
    id: `${category}-${index + 1}`,
    src: `/images/gallery/${category}/${String(index + 1).padStart(2, "0")}.jpg`,
    category,
  }));
}

export const galleryImages = galleryCategories.flatMap((category) =>
  buildCategoryImages(category, categoryImageCounts[category])
);

export const galleryCategoryCovers: Record<GalleryCategory, string> = {
  equipment: "/images/gallery/equipment/01.jpg",
  atmosphere: "/images/gallery/atmosphere/01.jpg",
  interior: "/images/gallery/interior/01.jpg",
  training: "/images/gallery/training/01.jpg",
};

export const siteImages = {
  logo: "/logo.jpg",
  hero: "/images/hero/hero-main.jpg",
  about: "/images/about/about-main.jpg",
  locations: {
    aerodrom: "/images/locations/aerodrom/cover.jpg",
    "novo-lisiche": "/images/locations/novo-lisiche/cover.jpg",
    hrom: "/images/locations/hrom/cover.jpg",
    superium: "/images/locations/superium/cover.jpg",
  },
  gallery: galleryImages,
  galleryCovers: galleryCategoryCovers,
} as const;

export function getGalleryImagesByCategory(category: GalleryCategory | "all") {
  if (category === "all") return galleryImages;
  return galleryImages.filter((image) => image.category === category);
}

export function getGalleryCount(category: GalleryCategory) {
  return categoryImageCounts[category];
}
