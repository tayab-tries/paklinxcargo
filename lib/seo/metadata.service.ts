import { Metadata } from 'next';
import { siteConfig } from '@/config/site.config';

export interface PageSeoOptions {
  title: string;
  description?: string;
  path?: string;
  ogImage?: string;
  noindex?: boolean;
}

export function constructMetadata({
  title,
  description = siteConfig.defaultSeo.defaultDescription,
  path = '',
  ogImage = siteConfig.defaultSeo.defaultOgImage,
  noindex = false,
}: PageSeoOptions): Metadata {
  const relativePath = path ? (path.startsWith('/') ? path : `/${path}`) : '/';
  const fullTitle = siteConfig.defaultSeo.titleTemplate.replace('%s', title);

  return {
    metadataBase: new URL('https://raahiinternational.com'),
    title: fullTitle,
    description,
    verification: {
      google: 'google4aea07eb5eec62b9',
    },
    icons: {
      icon: [
        { url: '/favicon.ico' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    },
    alternates: {
      canonical: relativePath,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: relativePath,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage.startsWith('http') ? ogImage : `https://raahiinternational.com${ogImage}`,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage.startsWith('http') ? ogImage : `https://raahiinternational.com${ogImage}`],
    },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
  };
}
