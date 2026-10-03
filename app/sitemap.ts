import { MetadataRoute } from 'next';
import { getEnabledServices } from '@/config/services.config';
import { getPublishedLocations } from '@/lib/locations/location-content';
import {
  getSanityLocationsList,
  getSanityDestinationsList,
  getSanityGuidesList,
} from '@/sanity/lib/fetch';
import { getPublishedDestinations } from '@/lib/destinations/destination-content';
import { getPublishedStaticArticles } from '@/lib/guides/guide-content';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://raahiinternational.com';

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

  // 2. Dynamically map ONLY published location hubs from Sanity
  const sanityLocations = await getSanityLocationsList();
  const fallbackLocations = await getPublishedLocations();
  const activeLocations = sanityLocations.length > 0 ? sanityLocations : fallbackLocations;
  const locationRoutes = activeLocations.map((l) => `/locations/${l.slug}`);

  // 3. Dynamically map ONLY published & verified destination countries & cities from Sanity
  const sanityDestinations = await getSanityDestinationsList();
  const fallbackDestinations = await getPublishedDestinations();
  const activeDestinations = sanityDestinations.length > 0 ? sanityDestinations : fallbackDestinations;
  const destinationRoutes: string[] = [];

  for (const country of activeDestinations) {
    if (country.slug) {
      destinationRoutes.push(`/destinations/${country.slug}`);
    }
    if (country.cities && country.cities.length > 0) {
      for (const city of country.cities) {
        if (city.slug) {
          destinationRoutes.push(`/destinations/${country.slug}/${city.slug}`);
        }
      }
    }
  }

  // 4. Dynamically map ONLY published & verified educational guides from Sanity (excluding redirected guides)
  const sanityGuides = await getSanityGuidesList();
  const fallbackArticles = getPublishedStaticArticles();
  const activeGuides = sanityGuides.length > 0 ? sanityGuides : fallbackArticles;
  const guideRoutes = activeGuides
    .filter((a) => a.slug && a.slug !== 'air-vs-sea-cargo')
    .map((a) => `/guides/${a.slug}`);

  // Deduplicate all generated routes to guarantee clean unique entries
  const allRoutes = Array.from(
    new Set([
      ...staticRoutes,
      ...serviceRoutes,
      ...locationRoutes,
      ...destinationRoutes,
      ...guideRoutes,
    ])
  );

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
