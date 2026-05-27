import { notFound } from "next/navigation";
import { isValidLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { Hero } from "@/components/Hero";
import { Highlights } from "@/components/Highlights";
import { About } from "@/components/About";
import { Locations } from "@/components/Locations";
import { Pricing } from "@/components/Pricing";
import { GalleryPreview } from "@/components/GalleryPreview";
import { Contact } from "@/components/Contact";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;

  if (!isValidLocale(localeParam)) {
    notFound();
  }

  const dict = await getDictionary(localeParam);

  return (
    <>
      <Hero dict={dict} locale={localeParam} />
      <Highlights dict={dict} />
      <About dict={dict} />
      <Locations dict={dict} />
      <Pricing dict={dict} locale={localeParam} />
      <GalleryPreview dict={dict} locale={localeParam} />
      <Contact dict={dict} />
    </>
  );
}
