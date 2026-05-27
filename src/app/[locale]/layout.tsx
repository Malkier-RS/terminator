import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { locales, type Locale, isValidLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SetLang } from "@/components/SetLang";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isValidLocale(localeParam)) return {};

  const dict = await getDictionary(localeParam);
  const baseUrl = "https://terminatorfitness.mk";

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `/${localeParam}`,
      languages: {
        mk: "/mk",
        en: "/en",
      },
    },
    openGraph: {
      title: dict.meta.ogTitle,
      description: dict.meta.ogDescription,
      url: `${baseUrl}/${localeParam}`,
      siteName: "Terminator Fitness Club",
      locale: localeParam === "mk" ? "mk_MK" : "en_US",
      alternateLocale: localeParam === "mk" ? ["en_US"] : ["mk_MK"],
      type: "website",
      images: [
        {
          url: "/logo.jpg",
          width: 1200,
          height: 630,
          alt: dict.meta.ogTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.ogTitle,
      description: dict.meta.ogDescription,
      images: ["/logo.jpg"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;

  if (!isValidLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <SetLang locale={locale} />
      <Header locale={locale} dict={dict} />
      <main>{children}</main>
      <Footer dict={dict} locale={locale} />
    </>
  );
}
