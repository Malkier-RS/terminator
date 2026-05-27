import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { GalleryGrid } from "@/components/GalleryGrid";
import { SectionHeading } from "@/components/ui";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isValidLocale(localeParam)) return {};

  const dict = await getDictionary(localeParam);

  return {
    title: dict.gallery.pageTitle,
    description: dict.gallery.pageDescription,
    openGraph: {
      title: dict.gallery.pageTitle,
      description: dict.gallery.pageDescription,
    },
  };
}

export default async function GalleryPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { locale: localeParam } = await params;
  const { category } = await searchParams;

  if (!isValidLocale(localeParam)) {
    notFound();
  }

  const dict = await getDictionary(localeParam);

  return (
    <div className="min-h-screen bg-brand-black pt-28 pb-20">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={dict.gallery.pageTitle}
          subtitle={dict.gallery.pageSubtitle}
        />
        <GalleryGrid dict={dict} initialCategory={category} />
      </div>
    </div>
  );
}
