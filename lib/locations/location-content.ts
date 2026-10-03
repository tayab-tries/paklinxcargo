import { createClient } from '@supabase/supabase-js';
import { CITY_LOCATIONS_DATA, CityLocationRecord } from './location-data';
import { getSanityLocationsList, getSanityLocationBySlug } from '@/sanity/lib/fetch';

export interface LocationData {
  id: string;
  name: string;
  slug: string;
  province: string;
  h1: string;
  seoTitle: string;
  seoDescription: string;
  introduction: string;
  serviceAvailable: boolean;
  collectionAvailable: boolean;
  hasPhysicalBranch: boolean;
  branchAddress?: string;
  localCoverageText: string;
  supportedServices: string[];
  supportedDestinations: string[];
  status: 'published' | 'draft' | 'review' | 'archived';
  isVerified: boolean;
  isIndexable: boolean;
  faqs: Array<{ question: string; answer: string }>;
  sections?: Array<{
    title: string;
    content: string;
    list?: string[];
    links?: Array<{ label: string; href: string }>;
  }>;
}

function mapCityRecordToLocationData(city: CityLocationRecord): LocationData {
  return {
    id: city.id,
    name: city.name,
    slug: city.slug,
    province: city.province,
    h1: city.h1,
    seoTitle: city.seoTitle,
    seoDescription: city.seoDescription,
    introduction: city.introduction,
    serviceAvailable: city.serviceAvailable,
    collectionAvailable: city.collectionAvailable,
    hasPhysicalBranch: city.hasPhysicalBranch,
    branchAddress: city.branchAddress,
    localCoverageText: city.localCoverageText,
    supportedServices: city.supportedServices,
    supportedDestinations: city.supportedDestinations,
    status: 'published',
    isVerified: true,
    isIndexable: true,
    faqs: city.faqs,
    sections: city.sections,
  };
}

export const staticLocations: LocationData[] = CITY_LOCATIONS_DATA.map(mapCityRecordToLocationData);

export async function getPublishedLocations(): Promise<LocationData[]> {
  try {
    const sanityDocs = await getSanityLocationsList();
    if (sanityDocs && sanityDocs.length > 0) {
      return sanityDocs.map((doc) => ({
        id: doc._id || doc.slug,
        name: doc.name,
        slug: doc.slug,
        province: doc.province || 'Pakistan',
        h1: doc.h1 || `Cargo Services in ${doc.name}`,
        seoTitle: doc.seo?.metaTitle || `Cargo Shipping ${doc.name}`,
        seoDescription: doc.seo?.metaDescription || `Cargo shipping in ${doc.name}`,
        introduction: doc.introduction || `Cargo shipping in ${doc.name}`,
        serviceAvailable: doc.serviceAvailable ?? true,
        collectionAvailable: doc.collectionAvailable ?? true,
        hasPhysicalBranch: doc.hasPhysicalBranch ?? false,
        branchAddress: doc.branchAddress || '',
        localCoverageText: doc.localCoverageText || '',
        supportedServices: doc.supportedServices || ['air-freight', 'sea-cargo'],
        supportedDestinations: [],
        status: 'published',
        isVerified: true,
        isIndexable: true,
        faqs: doc.faqs || [],
        sections: doc.sections,
      }));
    }
  } catch (err) {
    console.warn('getPublishedLocations Sanity fetch error, falling back:', err);
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

  if (supabaseUrl && publishableKey && !supabaseUrl.includes('your-supabase-project')) {
    try {
      const supabase = createClient(supabaseUrl, publishableKey);
      const { data } = await supabase
        .from('locations')
        .select('*')
        .eq('is_active', true)
        .order('name', { ascending: true });

      if (data && data.length > 0) {
        return data.map((b) => {
          const match = staticLocations.find((l) => l.slug === b.slug);
          return {
            id: b.id,
            name: b.name,
            slug: b.slug,
            province: b.province || match?.province || 'Pakistan',
            h1: match?.h1 || b.h1 || `Cargo Services in ${b.name}`,
            seoTitle: match?.seoTitle || b.meta_title || `Cargo Shipping ${b.name}`,
            seoDescription: match?.seoDescription || b.meta_description || `Cargo shipping in ${b.name}`,
            introduction: match?.introduction || b.meta_description || `Cargo shipping in ${b.name}`,
            serviceAvailable: true,
            collectionAvailable: true,
            hasPhysicalBranch: match?.hasPhysicalBranch || false,
            branchAddress: b.hub_address || match?.branchAddress || '',
            localCoverageText: match?.localCoverageText || b.hub_address || '',
            supportedServices: match?.supportedServices || ['air-freight', 'sea-cargo'],
            supportedDestinations: match?.supportedDestinations || [],
            status: 'published',
            isVerified: true,
            isIndexable: true,
            faqs: match?.faqs || b.faqs || [],
            sections: match?.sections,
          };
        });
      }
    } catch (err: unknown) {
      console.error('getPublishedLocations Supabase fetch error:', err);
    }
  }

  return staticLocations;
}

export async function getLocationBySlug(slug: string): Promise<LocationData | undefined> {
  try {
    const sanityDoc = await getSanityLocationBySlug(slug);
    if (sanityDoc) {
      return {
        id: sanityDoc._id || sanityDoc.slug,
        name: sanityDoc.name,
        slug: sanityDoc.slug,
        province: sanityDoc.province || 'Pakistan',
        h1: sanityDoc.h1 || `Cargo Services in ${sanityDoc.name}`,
        seoTitle: sanityDoc.seo?.metaTitle || `Cargo Shipping ${sanityDoc.name}`,
        seoDescription: sanityDoc.seo?.metaDescription || `Cargo shipping in ${sanityDoc.name}`,
        introduction: sanityDoc.introduction || `Cargo shipping in ${sanityDoc.name}`,
        serviceAvailable: sanityDoc.serviceAvailable ?? true,
        collectionAvailable: sanityDoc.collectionAvailable ?? true,
        hasPhysicalBranch: sanityDoc.hasPhysicalBranch ?? false,
        branchAddress: sanityDoc.branchAddress || '',
        localCoverageText: sanityDoc.localCoverageText || '',
        supportedServices: sanityDoc.supportedServices || ['air-freight', 'sea-cargo'],
        supportedDestinations: [],
        status: 'published',
        isVerified: true,
        isIndexable: true,
        faqs: sanityDoc.faqs || [],
        sections: sanityDoc.sections,
      };
    }
  } catch (err) {
    console.warn(`getLocationBySlug Sanity fetch error for ${slug}, falling back:`, err);
  }

  const match = staticLocations.find((l) => l.slug === slug);
  if (match) return match;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

  if (supabaseUrl && publishableKey && !supabaseUrl.includes('your-supabase-project')) {
    try {
      const supabase = createClient(supabaseUrl, publishableKey);
      const { data } = await supabase
        .from('locations')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .maybeSingle();

      if (data) {
        return {
          id: data.id,
          name: data.name,
          slug: data.slug,
          province: data.province || 'Pakistan',
          h1: data.h1 || `Cargo Services in ${data.name}`,
          seoTitle: data.meta_title || `Cargo Shipping ${data.name}`,
          seoDescription: data.meta_description || `Cargo shipping in ${data.name}`,
          introduction: data.meta_description || `Cargo shipping in ${data.name}`,
          serviceAvailable: true,
          collectionAvailable: true,
          hasPhysicalBranch: false,
          branchAddress: data.hub_address || '',
          localCoverageText: data.hub_address || '',
          supportedServices: ['air-freight', 'sea-cargo'],
          supportedDestinations: [],
          status: 'published',
          isVerified: true,
          isIndexable: true,
          faqs: data.faqs || [],
        };
      }
    } catch (err: unknown) {
      console.error('getLocationBySlug Supabase fetch error:', err);
    }
  }

  return undefined;
}

export function getPublishedStaticLocations(): LocationData[] {
  return staticLocations;
}

export function getStaticLocationBySlug(slug: string): LocationData | undefined {
  return staticLocations.find((l) => l.slug === slug);
}
