import { cache } from 'react';
import { draftMode } from 'next/headers';
import { client } from './client';
import { isSanityConfigured, readToken } from '../env';
import {
  HOMEPAGE_FULL_QUERY,
  SITE_SETTINGS_QUERY,
  SERVICES_LIST_QUERY,
  SERVICE_BY_SLUG_QUERY,
  LOCATIONS_LIST_QUERY,
  LOCATION_BY_SLUG_QUERY,
  DESTINATIONS_LIST_QUERY,
  DESTINATION_BY_SLUG_QUERY,
  DESTINATION_CITY_BY_SLUGS_QUERY,
  GUIDES_LIST_QUERY,
  GUIDE_BY_SLUG_QUERY,
  ABOUT_PAGE_QUERY,
  CARGO_PRICING_QUERY,
} from './queries';

export interface SanityCta {
  label?: string;
  href?: string;
}

export interface SanitySiteSettings {
  businessName?: string;
  shortDescription?: string;
  phone?: string;
  whatsappNumber?: string;
  email?: string;
  address?: string;
  operatingHours?: string;
  logo?: string;
  logoDark?: string;
  logoLight?: string;
  navigationItems?: { label: string; href: string }[];
  primaryCta?: SanityCta;
  footerDescription?: string;
  footerGroups?: { title: string; links: { label: string; href: string }[] }[];
  copyrightText?: string;
  defaultSeoTitle?: string;
  defaultSeoDescription?: string;
  defaultSocialImage?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    tiktok?: string;
  };
}

export interface SanityServiceCard {
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  featureBullets?: string[];
  cta?: SanityCta;
}

export interface SanityHomepageData {
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    socialImage?: string;
  };
  hero?: {
    eyebrow?: string;
    heading?: string;
    highlightedHeading?: string;
    description?: string;
    primaryCta?: SanityCta;
    secondaryCta?: SanityCta;
    heroImage?: string;
    heroImageAlt?: string;
  };
  heroFeatureChips?: { label: string; icon?: string }[];
  quickQuote?: {
    heading?: string;
    description?: string;
    ctaText?: string;
  };
  trustMetrics?: { value?: string; label: string }[];
  registrations?: {
    heading?: string;
    items?: { name: string; logo?: string; altText?: string }[];
  };
  trustedMarket?: {
    heading?: string;
    items?: { companyName: string; logo?: string; altText?: string }[];
  };
  whatCanYouSend?: {
    badge?: string;
    heading?: string;
    description?: string;
    items?: { title: string; description?: string; badgeText?: string; iconName?: string }[];
  };
  servicesOverview?: {
    badge?: string;
    heading?: string;
    description?: string;
    airCargo?: SanityServiceCard;
    seaCargo?: SanityServiceCard;
  };
  popularDestinations?: {
    badge?: string;
    heading?: string;
    description?: string;
    destinations?: { name: string; countryCode?: string; flagImage?: string; shortText?: string; href?: string }[];
  };
  pickupCities?: {
    badge?: string;
    heading?: string;
    description?: string;
    cities?: { name: string; href?: string }[];
  };
  howItWorks?: {
    badge?: string;
    heading?: string;
    description?: string;
    steps?: { stepNumber?: string; title: string; subtitle?: string; description?: string }[];
  };
  testimonials?: {
    badge?: string;
    heading?: string;
    description?: string;
    items?: { name: string; location?: string; quote: string; rating?: number; image?: string; caption?: string }[];
  };
  faq?: {
    badge?: string;
    heading?: string;
    description?: string;
    items?: { question: string; answer: string }[];
  };
  finalCta?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    primaryCta?: SanityCta;
    secondaryCta?: SanityCta;
  };
  mobileBottomCta?: {
    callLabel?: string;
    whatsappLabel?: string;
    quoteLabel?: string;
  };
}

export interface SanityServiceDocument {
  _id?: string;
  title: string;
  slug: string;
  name: string;
  shortDescription: string;
  category: 'core' | 'specialized';
  quoteCargoType?: string;
  iconName?: string;
  sortOrder?: number;
  heroImage?: string;
  heroImageAlt?: string;
  serviceOverview?: string;
  targetAudience?: string[];
  keyConsiderations?: string[];
  body?: unknown[];
  processSteps?: { stepNumber?: string; title: string; subtitle?: string; description?: string }[];
  faq?: { question: string; answer: string }[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    socialImage?: string;
  };
}

export interface SanityLocationDocument {
  _id?: string;
  name: string;
  slug: string;
  province: string;
  h1: string;
  introduction: string;
  sortOrder?: number;
  serviceAvailable?: boolean;
  collectionAvailable?: boolean;
  hasPhysicalBranch?: boolean;
  branchAddress?: string;
  localCoverageText?: string;
  supportedServices?: string[];
  faqs?: { question: string; answer: string }[];
  sections?: Array<{
    title: string;
    content: string;
    list?: string[];
    links?: Array<{ label: string; href: string }>;
  }>;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    socialImage?: string;
  };
}

export interface SanityDestinationCitySummary {
  _id?: string;
  name: string;
  slug: string;
  h1?: string;
  introduction?: string;
  overview?: string;
  preparationConsiderations?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

export interface SanityDestinationCountryDocument {
  _id?: string;
  name: string;
  slug: string;
  region: string;
  h1: string;
  introduction: string;
  shippingOverview?: string;
  customsGuidance?: string;
  sortOrder?: number;
  heroImage?: string;
  heroImageAlt?: string;
  supportedServices?: string[];
  supportedOrigins?: string[];
  cities?: SanityDestinationCitySummary[];
  faqs?: { question: string; answer: string }[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    socialImage?: string;
  };
}

export interface SanityDestinationCityDocument {
  _id?: string;
  name: string;
  slug: string;
  h1: string;
  introduction: string;
  overview?: string;
  preparationConsiderations?: string;
  sortOrder?: number;
  heroImage?: string;
  heroImageAlt?: string;
  country?: SanityDestinationCountryDocument;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    socialImage?: string;
  };
}

export interface SanityGuideDocument {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  category: 'shipping-guides' | 'cargo-rates' | 'customs-documentation' | 'packing-guides' | 'destinations-guide' | 'cargo-types';
  authorName: string;
  publishedAt: string;
  updatedAt?: string;
  readingTimeMinutes: number;
  isFeatured?: boolean;
  containsRegulatoryClaims?: boolean;
  verificationNotes?: string;
  contentMarkdown?: string;
  body?: unknown[];
  supportedServices?: string[];
  supportedOrigins?: string[];
  supportedDestinations?: string[];
  faqs?: { question: string; answer: string }[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    socialImage?: string;
  };
}

async function isDraftEnabled(): Promise<boolean> {
  try {
    return (await draftMode()).isEnabled;
  } catch {
    return false;
  }
}

export const getSanitySiteSettingsData = cache(async function getSanitySiteSettingsData(options?: { stega?: boolean }): Promise<SanitySiteSettings | null> {
  if (!isSanityConfigured) return null;
  try {
    const isDraft = await isDraftEnabled();
    const fetchClient = isDraft && readToken ? client.withConfig({ token: readToken }) : client;
    return await fetchClient.fetch(SITE_SETTINGS_QUERY, {}, { stega: options?.stega ?? isDraft });
  } catch (error) {
    console.warn('[Sanity] getSanitySiteSettingsData fetch error, using fallbacks:', error);
    return null;
  }
});

export const getSanityHomepageData = cache(async function getSanityHomepageData(options?: { stega?: boolean }): Promise<SanityHomepageData | null> {
  if (!isSanityConfigured) return null;
  try {
    const isDraft = await isDraftEnabled();
    const fetchClient = isDraft && readToken ? client.withConfig({ token: readToken }) : client;
    return await fetchClient.fetch(HOMEPAGE_FULL_QUERY, {}, { stega: options?.stega ?? isDraft });
  } catch (error) {
    console.warn('[Sanity] getSanityHomepageData fetch error, using fallbacks:', error);
    return null;
  }
});

export const getSanityServicesList = cache(async function getSanityServicesList(options?: { stega?: boolean }): Promise<SanityServiceDocument[]> {
  if (!isSanityConfigured) return [];
  try {
    const isDraft = await isDraftEnabled();
    const fetchClient = isDraft && readToken ? client.withConfig({ token: readToken }) : client;
    const data = await fetchClient.fetch<SanityServiceDocument[]>(SERVICES_LIST_QUERY, {}, { stega: options?.stega ?? isDraft });
    return data || [];
  } catch (error) {
    console.warn('[Sanity] getSanityServicesList fetch error, using fallbacks:', error);
    return [];
  }
});

export const getSanityServiceBySlug = cache(async function getSanityServiceBySlug(slug: string, options?: { stega?: boolean }): Promise<SanityServiceDocument | null> {
  if (!isSanityConfigured) return null;
  try {
    const isDraft = await isDraftEnabled();
    const fetchClient = isDraft && readToken ? client.withConfig({ token: readToken }) : client;
    return await fetchClient.fetch<SanityServiceDocument>(SERVICE_BY_SLUG_QUERY, { slug }, { stega: options?.stega ?? isDraft });
  } catch (error) {
    console.warn(`[Sanity] getSanityServiceBySlug fetch error for slug ${slug}, using fallbacks:`, error);
    return null;
  }
});

export const getSanityLocationsList = cache(async function getSanityLocationsList(options?: { stega?: boolean }): Promise<SanityLocationDocument[]> {
  if (!isSanityConfigured) return [];
  try {
    const isDraft = await isDraftEnabled();
    const fetchClient = isDraft && readToken ? client.withConfig({ token: readToken }) : client;
    const data = await fetchClient.fetch<SanityLocationDocument[]>(LOCATIONS_LIST_QUERY, {}, { stega: options?.stega ?? isDraft });
    return data || [];
  } catch (error) {
    console.warn('[Sanity] getSanityLocationsList fetch error, using fallbacks:', error);
    return [];
  }
});

export const getSanityLocationBySlug = cache(async function getSanityLocationBySlug(slug: string, options?: { stega?: boolean }): Promise<SanityLocationDocument | null> {
  if (!isSanityConfigured) return null;
  try {
    const isDraft = await isDraftEnabled();
    const fetchClient = isDraft && readToken ? client.withConfig({ token: readToken }) : client;
    return await fetchClient.fetch<SanityLocationDocument>(LOCATION_BY_SLUG_QUERY, { slug }, { stega: options?.stega ?? isDraft });
  } catch (error) {
    console.warn(`[Sanity] getSanityLocationBySlug fetch error for slug ${slug}, using fallbacks:`, error);
    return null;
  }
});

export async function getSanityDestinationsList(options?: { stega?: boolean }): Promise<SanityDestinationCountryDocument[]> {
  if (!isSanityConfigured) return [];
  try {
    const isDraft = await isDraftEnabled();
    const fetchClient = isDraft && readToken ? client.withConfig({ token: readToken }) : client;
    const data = await fetchClient.fetch<SanityDestinationCountryDocument[]>(DESTINATIONS_LIST_QUERY, {}, { stega: options?.stega ?? isDraft });
    return data || [];
  } catch (error) {
    console.warn('[Sanity] getSanityDestinationsList fetch error, using fallbacks:', error);
    return [];
  }
}

export async function getSanityDestinationBySlug(slug: string, options?: { stega?: boolean }): Promise<SanityDestinationCountryDocument | null> {
  if (!isSanityConfigured) return null;
  try {
    const isDraft = await isDraftEnabled();
    const fetchClient = isDraft && readToken ? client.withConfig({ token: readToken }) : client;
    return await fetchClient.fetch<SanityDestinationCountryDocument>(DESTINATION_BY_SLUG_QUERY, { slug }, { stega: options?.stega ?? isDraft });
  } catch (error) {
    console.warn(`[Sanity] getSanityDestinationBySlug fetch error for slug ${slug}, using fallbacks:`, error);
    return null;
  }
}

export async function getSanityDestinationCityBySlugs(
  countrySlug: string,
  citySlug: string,
  options?: { stega?: boolean }
): Promise<SanityDestinationCityDocument | null> {
  if (!isSanityConfigured) return null;
  try {
    const isDraft = await isDraftEnabled();
    const fetchClient = isDraft && readToken ? client.withConfig({ token: readToken }) : client;
    return await fetchClient.fetch<SanityDestinationCityDocument>(
      DESTINATION_CITY_BY_SLUGS_QUERY,
      { countrySlug, citySlug },
      { stega: options?.stega ?? isDraft }
    );
  } catch (error) {
    console.warn(`[Sanity] getSanityDestinationCityBySlugs fetch error for ${countrySlug}/${citySlug}, using fallbacks:`, error);
    return null;
  }
}

export async function getSanityGuidesList(options?: { stega?: boolean }): Promise<SanityGuideDocument[]> {
  if (!isSanityConfigured) return [];
  try {
    const isDraft = await isDraftEnabled();
    const fetchClient = isDraft && readToken ? client.withConfig({ token: readToken }) : client;
    const data = await fetchClient.fetch<SanityGuideDocument[]>(GUIDES_LIST_QUERY, {}, { stega: options?.stega ?? isDraft });
    return data || [];
  } catch (error) {
    console.warn('[Sanity] getSanityGuidesList fetch error, using fallbacks:', error);
    return [];
  }
}

export async function getSanityGuideBySlug(slug: string, options?: { stega?: boolean }): Promise<SanityGuideDocument | null> {
  if (!isSanityConfigured) return null;
  try {
    const isDraft = await isDraftEnabled();
    const fetchClient = isDraft && readToken ? client.withConfig({ token: readToken }) : client;
    return await fetchClient.fetch<SanityGuideDocument>(GUIDE_BY_SLUG_QUERY, { slug }, { stega: options?.stega ?? isDraft });
  } catch (error) {
    console.warn(`[Sanity] getSanityGuideBySlug fetch error for slug ${slug}, using fallbacks:`, error);
    return null;
  }
}

export interface SanityAboutPageDocument {
  title?: string;
  subtitle?: string;
  intro?: string;
  heroImage?: string;
  body?: unknown[];
  cta?: {
    title?: string;
    description?: string;
    quoteLabel?: string;
    quoteHref?: string;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    socialImage?: string;
  };
}

export async function getSanityAboutPageData(options?: { stega?: boolean }): Promise<SanityAboutPageDocument | null> {
  if (!isSanityConfigured) return null;
  try {
    const isDraft = await isDraftEnabled();
    const fetchClient = isDraft && readToken ? client.withConfig({ token: readToken }) : client;
    return await fetchClient.fetch<SanityAboutPageDocument>(ABOUT_PAGE_QUERY, {}, { stega: options?.stega ?? isDraft });
  } catch (error) {
    console.warn('[Sanity] getSanityAboutPageData fetch error, using fallbacks:', error);
    return null;
  }
}

export interface SanityCargoRateItem {
  country: string;
  flag?: string;
  rate: string;
  deliveryTime: string;
  sortOrder?: number;
  quoteHref?: string;
}

export interface SanityCargoComparisonRow {
  feature: string;
  airValue: string;
  seaValue: string;
  airBadge?: string;
  seaBadge?: string;
  sortOrder?: number;
}

export interface SanityCargoPricingData {
  hero?: {
    eyebrow?: string;
    heading?: string;
    subheading?: string;
    introParagraph?: string;
    airBadgeTitle?: string;
    airMinWeightText?: string;
    seaBadgeTitle?: string;
    seaMinWeightText?: string;
  };
  airCargoSection?: {
    title?: string;
    subtitle?: string;
    minWeightBadge?: string;
    rates?: SanityCargoRateItem[];
  };
  seaCargoSection?: {
    title?: string;
    subtitle?: string;
    minWeightBadge?: string;
    rates?: SanityCargoRateItem[];
    disclaimer?: string;
  };
  quickComparison?: {
    title?: string;
    subtitle?: string;
    rows?: SanityCargoComparisonRow[];
  };
  decisionGuidance?: {
    title?: string;
    airTitle?: string;
    airPoints?: string[];
    seaTitle?: string;
    seaPoints?: string[];
  };
  doorToDoor?: {
    badge?: string;
    title?: string;
    description?: string;
    workflowSteps?: string[];
  };
  faqs?: { question: string; answer: string }[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    socialImage?: string;
  };
}

export async function getSanityCargoPricingData(options?: { stega?: boolean }): Promise<SanityCargoPricingData | null> {
  if (!isSanityConfigured) return null;
  try {
    const isDraft = await isDraftEnabled();
    const fetchClient = isDraft && readToken ? client.withConfig({ token: readToken }) : client;
    return await fetchClient.fetch<SanityCargoPricingData>(CARGO_PRICING_QUERY, {}, { stega: options?.stega ?? isDraft });
  } catch (error) {
    console.warn('[Sanity] getSanityCargoPricingData fetch error, using fallbacks:', error);
    return null;
  }
}

