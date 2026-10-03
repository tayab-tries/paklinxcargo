import { createClient } from '@supabase/supabase-js';

export interface DestinationCityData {
  id: string;
  countryId: string;
  name: string;
  slug: string;
  h1: string;
  seoTitle: string;
  seoDescription: string;
  introduction: string;
  overview?: string;
  preparationConsiderations?: string;
  deliveryCoverageNotes?: string;
  status: 'published' | 'draft' | 'review' | 'archived';
  isVerified: boolean;
  isIndexable: boolean;
}

export interface DestinationCountryData {
  id: string;
  name: string;
  slug: string;
  region: string;
  h1: string;
  seoTitle: string;
  seoDescription: string;
  introduction: string;
  shippingOverview?: string;
  customsGuidance?: string;
  supportedServices: string[];
  supportedOrigins: string[];
  cities: DestinationCityData[];
  faqs: Array<{ question: string; answer: string }>;
  status: 'published' | 'draft' | 'review' | 'archived';
  isVerified: boolean;
  isIndexable: boolean;
}

// ZERO seeded/default destination records in codebase
export const staticDestinations: DestinationCountryData[] = [];

export async function getPublishedDestinations(): Promise<DestinationCountryData[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

  if (supabaseUrl && publishableKey && !supabaseUrl.includes('your-supabase-project')) {
    try {
      const supabase = createClient(supabaseUrl, publishableKey);
      const { data } = await supabase
        .from('destination_countries')
        .select('*')
        .eq('is_active', true)
        .order('name', { ascending: true });

      if (data && data.length > 0) {
        return data.map((d) => ({
          id: d.id,
          name: d.name,
          slug: d.slug,
          region: d.region || 'Global',
          h1: d.h1 || `Cargo Services to ${d.name}`,
          seoTitle: d.meta_title || `Cargo to ${d.name}`,
          seoDescription: d.meta_description || `Cargo shipping to ${d.name}`,
          introduction: d.meta_description || `Cargo shipping to ${d.name}`,
          customsGuidance: d.customs_summary || '',
          supportedServices: ['air-freight', 'sea-cargo'],
          supportedOrigins: [],
          cities: [],
          faqs: [],
          status: 'published',
          isVerified: true,
          isIndexable: true,
        }));
      }
    } catch (err: unknown) {
      console.error('getPublishedDestinations fetch error:', err);
    }
  }

  return staticDestinations;
}

export async function getDestinationBySlug(slug: string): Promise<DestinationCountryData | undefined> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

  if (supabaseUrl && publishableKey && !supabaseUrl.includes('your-supabase-project')) {
    try {
      const supabase = createClient(supabaseUrl, publishableKey);
      const { data } = await supabase
        .from('destination_countries')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .maybeSingle();

      if (data) {
        return {
          id: data.id,
          name: data.name,
          slug: data.slug,
          region: data.region || 'Global',
          h1: data.h1 || `Cargo Services to ${data.name}`,
          seoTitle: data.meta_title || `Cargo to ${data.name}`,
          seoDescription: data.meta_description || `Cargo shipping to ${data.name}`,
          introduction: data.meta_description || `Cargo shipping to ${data.name}`,
          customsGuidance: data.customs_summary || '',
          supportedServices: ['air-freight', 'sea-cargo'],
          supportedOrigins: [],
          cities: [],
          faqs: [],
          status: 'published',
          isVerified: true,
          isIndexable: true,
        };
      }
    } catch (err: unknown) {
      console.error('getDestinationBySlug fetch error:', err);
    }
  }

  return staticDestinations.find((d) => d.slug === slug);
}

export function getPublishedStaticDestinations(): DestinationCountryData[] {
  return staticDestinations.filter(
    (dest) => dest.status === 'published' && dest.isVerified === true && dest.isIndexable === true
  );
}

export function getStaticDestinationBySlug(slug: string): DestinationCountryData | undefined {
  const dest = staticDestinations.find((d) => d.slug === slug);
  if (dest && dest.status === 'published' && dest.isVerified === true && dest.isIndexable === true) {
    return dest;
  }
  return undefined;
}

export function getStaticDestinationCity(
  countrySlug: string,
  citySlug: string
): { country: DestinationCountryData; city: DestinationCityData } | undefined {
  const country = getStaticDestinationBySlug(countrySlug);
  if (!country) return undefined;

  const city = country.cities.find((c) => c.slug === citySlug);
  if (
    city &&
    city.status === 'published' &&
    city.isVerified === true &&
    city.isIndexable === true
  ) {
    return { country, city };
  }
  return undefined;
}
