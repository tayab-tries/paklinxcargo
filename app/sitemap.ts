import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site.config';
import { getEnabledServices } from '@/config/services.config';
import { getPublishedLocations } from '@/lib/locations/location-content';
import { getPublishedDestinations } from '@/lib/destinations/destination-content';
import { getPublishedStaticArticles } from '@/lib/guides/guide-content';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.domain;

  const staticRoutes = [
    '',
    '/about',
    '/cargo-services',
    '/services',
    '/destinations',
    '/locations',
    '/quote',
    '/track',
    '/guides',
  ];

  // 1. Dynamically map ONLY enabled & verified non-redirected services
  const enabledServices = getEnabledServices();
  const serviceRoutes = enabledServices
    .filter((s) => s.slug !== 'air-freight' && s.slug !== 'sea-cargo' && s.slug !== 'door-to-door')
    .map((s) => `/services/${s.slug}`);

  // 2. Dynamically map ONLY published & verified location hubs
  const publishedLocations = await getPublishedLocations();
  const locationRoutes = publishedLocations.map((l) => `/locations/${l.slug}`);

  // 3. Dynamically map ONLY published & verified destination countries & cities
  const publishedDestinations = await getPublishedDestinations();
  const destinationRoutes: string[] = [];

  for (const country of publishedDestinations) {
    destinationRoutes.push(`/destinations/${country.slug}`);
    for (const city of country.cities) {
      if (city.status === 'published' && city.isVerified === true && city.isIndexable === true) {
        destinationRoutes.push(`/destinations/${country.slug}/${city.slug}`);
      }
    }
  }

  // 4. Dynamically map ONLY published & verified educational guides
  const publishedArticles = getPublishedStaticArticles();
  const guideRoutes = publishedArticles.map((a) => `/guides/${a.slug}`);

  const allRoutes = [
    ...staticRoutes,
    ...serviceRoutes,
    ...locationRoutes,
    ...destinationRoutes,
    ...guideRoutes,
  ];

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority:
      route === ''
        ? 1.0
        : route.startsWith('/services/')
        ? 0.9
        : route.startsWith('/destinations/')
        ? 0.88
        : route.startsWith('/locations/')
        ? 0.85
        : route.startsWith('/guides/')
        ? 0.75
        : 0.8,
  }));
}
