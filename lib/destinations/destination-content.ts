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

// Static fallback destinations for offline / unconfigured database mode
export const staticDestinations: DestinationCountryData[] = [
  {
    id: 'dest-saudi-arabia',
    name: 'Saudi Arabia',
    slug: 'saudi-arabia',
    region: 'Middle East',
    h1: 'Cargo Shipping to Saudi Arabia from Pakistan',
    seoTitle: 'Cargo Shipping to Saudi Arabia from Pakistan | Air & Sea Freight',
    seoDescription: 'Reliable air cargo and sea freight services from Pakistan to Saudi Arabia. Door-to-door delivery across Riyadh, Jeddah, Dammam, and Medina.',
    introduction: 'Paklinx Cargo provides reliable door-to-door and airport-to-airport shipping services from Pakistan to major cities across the Kingdom of Saudi Arabia.',
    shippingOverview: 'Scheduled air cargo flights and direct ocean freight routes connect Pakistan hubs with Saudi Arabian ports and logistics centers.',
    customsGuidance: 'Saudi customs regulations require standard commercial invoices, certificates of origin, and SASO compliance where applicable. Personal effects require passenger identification.',
    supportedServices: ['air-freight', 'sea-cargo', 'door-to-door', 'excess-baggage'],
    supportedOrigins: ['lahore', 'karachi', 'islamabad', 'rawalpindi', 'multan', 'faisalabad', 'peshawar', 'sialkot', 'gujranwala'],
    cities: [
      {
        id: 'city-riyadh',
        countryId: 'dest-saudi-arabia',
        name: 'Riyadh',
        slug: 'riyadh',
        h1: 'Cargo Shipping to Riyadh from Pakistan',
        seoTitle: 'Cargo to Riyadh from Pakistan',
        seoDescription: 'Fast air cargo and door delivery services to Riyadh from Pakistan.',
        introduction: 'Direct delivery and customs handling for personal and commercial cargo arriving in Riyadh.',
        status: 'published',
        isVerified: true,
        isIndexable: true,
      },
      {
        id: 'city-jeddah',
        countryId: 'dest-saudi-arabia',
        name: 'Jeddah',
        slug: 'jeddah',
        h1: 'Cargo Shipping to Jeddah from Pakistan',
        seoTitle: 'Cargo to Jeddah from Pakistan',
        seoDescription: 'Air freight and sea shipping to Jeddah gateway ports from Pakistan.',
        introduction: 'Efficient sea cargo and air freight clearance through Jeddah Islamic Port and King Abdulaziz Airport.',
        status: 'published',
        isVerified: true,
        isIndexable: true,
      },
    ],
    faqs: [
      {
        question: 'What is the transit time for air cargo to Saudi Arabia?',
        answer: 'Air cargo from Pakistan typically arrives in Saudi Arabia within 3 to 6 business days depending on customs processing.',
      },
      {
        question: 'Can I send personal effects and household luggage to Saudi Arabia?',
        answer: 'Yes, personal luggage, household items, and gifts can be shipped with door delivery across major Saudi cities.',
      },
    ],
    status: 'published',
    isVerified: true,
    isIndexable: true,
  },
  {
    id: 'dest-uae',
    name: 'United Arab Emirates',
    slug: 'uae',
    region: 'Middle East',
    h1: 'Cargo Shipping to UAE from Pakistan',
    seoTitle: 'Cargo Shipping to UAE from Pakistan | Air & Sea Freight',
    seoDescription: 'Fast door-to-door air freight and ocean cargo from Pakistan to Dubai, Abu Dhabi, and Sharjah.',
    introduction: 'Regular daily air freight connections and maritime container services linking Pakistan with all Emirates.',
    shippingOverview: 'Rapid transit via direct airline schedules to Dubai (DXB) and Sharjah (SHJ), plus ocean consolidation via Jebel Ali Port.',
    customsGuidance: 'UAE customs clearance requires commercial invoices and packing lists. Personal baggage requires consignee Emirates ID or passport.',
    supportedServices: ['air-freight', 'sea-cargo', 'door-to-door', 'commercial-cargo'],
    supportedOrigins: ['lahore', 'karachi', 'islamabad', 'rawalpindi', 'multan', 'faisalabad', 'peshawar', 'sialkot', 'gujranwala'],
    cities: [
      {
        id: 'city-dubai',
        countryId: 'dest-uae',
        name: 'Dubai',
        slug: 'dubai',
        h1: 'Cargo Shipping to Dubai from Pakistan',
        seoTitle: 'Cargo to Dubai from Pakistan',
        seoDescription: 'Express air cargo and sea freight delivery to Dubai.',
        introduction: 'Full coverage across Dubai for commercial goods, retail stock, and personal baggage.',
        status: 'published',
        isVerified: true,
        isIndexable: true,
      },
    ],
    faqs: [
      {
        question: 'How fast is express air cargo from Pakistan to Dubai?',
        answer: 'Express air shipments typically clear and deliver within 2 to 4 business days.',
      },
    ],
    status: 'published',
    isVerified: true,
    isIndexable: true,
  },
  {
    id: 'dest-uk',
    name: 'United Kingdom',
    slug: 'uk',
    region: 'Europe',
    h1: 'Cargo Shipping to the United Kingdom from Pakistan',
    seoTitle: 'Cargo Shipping to UK from Pakistan | Air & Sea Freight',
    seoDescription: 'Door-to-door air freight and sea cargo services to London, Manchester, Birmingham, and throughout the UK.',
    introduction: 'Complete logistics and customs brokerage services connecting Pakistani exporters and families with UK destinations.',
    shippingOverview: 'Scheduled airline services to London Heathrow, Manchester, and Birmingham airports, plus maritime shipping to Felixstowe and Southampton.',
    customsGuidance: 'HMRC customs filings, ToR (Transfer of Residence) declarations for personal goods, and standard EORI procedures for commercial trade.',
    supportedServices: ['air-freight', 'sea-cargo', 'excess-baggage', 'commercial-cargo'],
    supportedOrigins: ['lahore', 'karachi', 'islamabad', 'rawalpindi', 'multan', 'faisalabad', 'peshawar', 'sialkot', 'gujranwala'],
    cities: [],
    faqs: [
      {
        question: 'Do you deliver cargo to residential addresses in the UK?',
        answer: 'Yes, full door-to-door delivery with tail-lift unloading is available across all UK postcodes.',
      },
    ],
    status: 'published',
    isVerified: true,
    isIndexable: true,
  },
  {
    id: 'dest-usa',
    name: 'United States',
    slug: 'usa',
    region: 'North America',
    h1: 'Cargo Shipping to the United States from Pakistan',
    seoTitle: 'Cargo Shipping to USA from Pakistan | Air & Sea Freight',
    seoDescription: 'Air freight and container sea shipping to New York, Chicago, Houston, Los Angeles, and nationwide across the US.',
    introduction: 'Nationwide cargo transport connecting Pakistan origin hubs with major logistics centers across the United States.',
    shippingOverview: 'Intermodal air and sea freight routes with customs clearance and interstate distribution across all 50 states.',
    customsGuidance: 'US Customs and Border Protection (CBP) filings, ISF (10+2) ocean security filings, and FDA clearance where applicable.',
    supportedServices: ['air-freight', 'sea-cargo', 'commercial-cargo'],
    supportedOrigins: ['lahore', 'karachi', 'islamabad', 'rawalpindi', 'multan', 'faisalabad', 'peshawar', 'sialkot', 'gujranwala'],
    cities: [],
    faqs: [
      {
        question: 'What is the average transit time for cargo to the USA?',
        answer: 'Air cargo arrives in 5 to 9 business days; ocean container freight averages 28 to 38 days depending on port of entry.',
      },
    ],
    status: 'published',
    isVerified: true,
    isIndexable: true,
  },
  {
    id: 'dest-canada',
    name: 'Canada',
    slug: 'canada',
    region: 'North America',
    h1: 'Cargo Shipping to Canada from Pakistan',
    seoTitle: 'Cargo Shipping to Canada from Pakistan | Air & Sea Freight',
    seoDescription: 'Professional air freight and ocean cargo shipping to Toronto, Vancouver, Montreal, and Calgary.',
    introduction: 'Seamless shipping solutions for commercial freight and personal household relocation cargo to Canada.',
    shippingOverview: 'Direct air links to Toronto Pearson (YYZ) and Vancouver (YVR) with bonded warehousing and nationwide intermodal forwarding.',
    customsGuidance: 'CBSA clearance procedures with BSF186 accounting documents for personal effects and commercial B3 accounting for trade goods.',
    supportedServices: ['air-freight', 'sea-cargo', 'excess-baggage'],
    supportedOrigins: ['lahore', 'karachi', 'islamabad', 'rawalpindi', 'multan', 'faisalabad', 'peshawar', 'sialkot', 'gujranwala'],
    cities: [],
    faqs: [
      {
        question: 'Can you deliver door-to-door in Toronto and Vancouver?',
        answer: 'Yes, door-to-door delivery is provided across the Greater Toronto Area, Metro Vancouver, and surrounding provinces.',
      },
    ],
    status: 'published',
    isVerified: true,
    isIndexable: true,
  },
];

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
