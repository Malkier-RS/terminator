import type { Locale } from "./config";

export type Dictionary = {
  meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };
  nav: {
    home: string;
    about: string;
    locations: string;
    pricing: string;
    gallery: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    intro: string;
    ctaJoin: string;
    ctaLocations: string;
    ctaPricing: string;
    ctaContact: string;
  };
  highlights: {
    equipment: { title: string; description: string };
    atmosphere: { title: string; description: string };
    locations: { title: string; description: string };
  };
  about: {
    title: string;
    story: string;
    missionLabel: string;
    mission: string;
    stats: {
      locations: string;
      members: string;
      years: string;
    };
  };
  locations: {
    title: string;
    subtitle: string;
    viewOnMap: string;
    workingHours: string;
    phone: string;
    items: Array<{
      id: string;
      name: string;
      address: string;
      hours: string[];
      phone?: string;
      description?: string;
      mapUrl?: string;
    }>;
  };
  pricing: {
    title: string;
    subtitle: string;
    monthly: string;
    monthlyPlans: Array<{ location: string; price: string }>;
    dayPass: string;
    dayPassPrice: string;
    personalTraining: string;
    personalTrainingNote: string;
    cta: string;
  };
  gallery: {
    title: string;
    subtitle: string;
    viewAll: string;
    explore: string;
    photoCount: string;
    pageTitle: string;
    pageSubtitle: string;
    pageDescription: string;
    filterAll: string;
    close: string;
    prev: string;
    next: string;
    categories: {
      equipment: string;
      interior: string;
      training: string;
      atmosphere: string;
    };
  };
  contact: {
    title: string;
    subtitle: string;
    phone: string;
    email: string;
    instagramAccounts: Array<{
      name: string;
      handle: string;
      url: string;
    }>;
    facebook: string;
    facebookUrl: string;
    followUs: string;
    form: {
      name: string;
      email: string;
      phone: string;
      message: string;
      submit: string;
      success: string;
      error: string;
    };
  };
  footer: {
    tagline: string;
    rights: string;
  };
};

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  mk: () => import("@/locales/mk.json").then((module) => module.default),
  en: () => import("@/locales/en.json").then((module) => module.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
