import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/dev/'],
    },
    sitemap: 'https://raahiinternational.com/sitemap.xml',
  };
}
