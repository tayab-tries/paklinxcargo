import { SiteConfig } from '@/types/config';

export const siteConfig: SiteConfig = {
  name: "Paklinx Cargo",
  legalName: "Paklinx Cargo",
  domain: process.env.NEXT_PUBLIC_SITE_URL || "https://paklinxcargo.com",
  tagline: "International Air & Sea Cargo Delivery",
  defaultSeo: {
    titleTemplate: "%s | Paklinx Cargo",
    defaultTitle: "Paklinx Cargo | Air & Sea Cargo Delivery from Pakistan",
    defaultDescription: "Send cargo with Paklinx Cargo. Door-to-door air cargo and sea cargo delivery from Pakistan to destinations worldwide.",
    defaultOgImage: "/images/og-default.jpg",
  },
};
