import { SiteConfig } from '@/types/config';

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const resolvedDomain = (rawSiteUrl && !rawSiteUrl.includes('workers.dev'))
  ? rawSiteUrl
  : "https://raahiinternational.com";

export const siteConfig: SiteConfig = {
  name: "Raahi International",
  legalName: "Raahi International",
  domain: resolvedDomain,
  tagline: "International Air & Sea Cargo Delivery",
  defaultSeo: {
    titleTemplate: "%s | Raahi International",
    defaultTitle: "Raahi International | Air & Sea Cargo Delivery from Pakistan",
    defaultDescription: "Send cargo with Raahi International. Door-to-door air cargo and sea cargo delivery from Pakistan to destinations worldwide.",
    defaultOgImage: "/images/og-default.jpg",
  },
};
