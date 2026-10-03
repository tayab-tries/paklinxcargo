import { CargoType } from '@/types/quote';

export interface ServiceConfigItem {
  slug: string;
  name: string;
  h1: string;
  shortDescription: string;
  enabled: boolean;                  // Single source of truth for publication
  isVerified: boolean;               // Single source of truth for business verification
  quoteCargoType?: CargoType;        // Explicit enum mapping
  contentPath: string;
  iconName: 'Package' | 'Plane' | 'Ship' | 'Truck' | 'FileText' | 'Building2' | 'Luggage';
  category: 'core' | 'specialized';
  relatedServices: string[];         // Slugs of related services
  relatedDestinations: string[];     // Slugs of target destinations
  relatedLocations: string[];        // Slugs of target origin cities
  seo: {
    title: string;
    description: string;
  };
}

export const servicesRegistry: ServiceConfigItem[] = [
  {
    slug: 'air-freight',
    name: 'Air Cargo',
    h1: 'Air Cargo Shipping with Door-to-Door Delivery',
    shortDescription: 'Air cargo shipping with door-to-door delivery.',
    enabled: true,
    isVerified: true,
    quoteCargoType: 'air_freight',
    contentPath: 'content/services/air-freight.mdx',
    iconName: 'Plane',
    category: 'core',
    relatedServices: ['sea-cargo', 'excess-baggage'],
    relatedDestinations: ['uk', 'uae', 'usa', 'canada', 'ksa'],
    relatedLocations: ['lahore', 'karachi', 'islamabad', 'rawalpindi'],
    seo: {
      title: 'Air Cargo Shipping Services Pakistan',
      description: 'Air cargo shipping with door-to-door delivery originating from Pakistan export hubs to international destinations.',
    },
  },
  {
    slug: 'sea-cargo',
    name: 'Sea Cargo',
    h1: 'Sea Cargo Shipping with Door-to-Door Delivery',
    shortDescription: 'Sea cargo shipping with door-to-door delivery.',
    enabled: true,
    isVerified: true,
    quoteCargoType: 'sea_cargo',
    contentPath: 'content/services/sea-cargo.mdx',
    iconName: 'Ship',
    category: 'core',
    relatedServices: ['air-freight', 'commercial-cargo'],
    relatedDestinations: ['uk', 'uae', 'usa', 'canada', 'ksa'],
    relatedLocations: ['karachi', 'lahore'],
    seo: {
      title: 'Sea Cargo Shipping Services Pakistan',
      description: 'Sea cargo shipping with door-to-door delivery from Pakistan for ocean freight requirements.',
    },
  },
  {
    slug: 'door-to-door',
    name: 'Door-to-Door Delivery',
    h1: 'Door-to-Door Cargo Shipping Services',
    shortDescription: 'Integrated door-to-door cargo delivery via Air Cargo and Sea Cargo modes.',
    enabled: false, // REMOVED AS STANDALONE SERVICE CARD (Integrated into Air & Sea Cargo)
    isVerified: false,
    quoteCargoType: 'door_to_door',
    contentPath: 'content/services/door-to-door.mdx',
    iconName: 'Truck',
    category: 'core',
    relatedServices: ['air-freight', 'sea-cargo'],
    relatedDestinations: ['uk', 'uae', 'usa', 'canada', 'ksa'],
    relatedLocations: ['lahore', 'karachi', 'islamabad', 'rawalpindi'],
    seo: {
      title: 'Door to Door International Shipping Pakistan',
      description: 'Door-to-door cargo delivery options available on Air Cargo and Sea Cargo from Pakistan.',
    },
  },
  {
    slug: 'commercial-cargo',
    name: 'Commercial Cargo',
    h1: 'Commercial Cargo & Trade Shipping Services',
    shortDescription: 'Commercial cargo shipping for exporters, trade shipments, and commercial goods.',
    enabled: true,
    isVerified: true,
    quoteCargoType: 'commercial_freight',
    contentPath: 'content/services/commercial-cargo.mdx',
    iconName: 'Building2',
    category: 'specialized',
    relatedServices: ['sea-cargo', 'air-freight'],
    relatedDestinations: ['uk', 'uae', 'usa', 'canada', 'ksa'],
    relatedLocations: ['lahore', 'karachi', 'sialkot', 'faisalabad'],
    seo: {
      title: 'Commercial Cargo & B2B Shipping Pakistan',
      description: 'Commercial cargo shipping for exporters and trade shipments from Pakistan to international markets.',
    },
  },
  {
    slug: 'excess-baggage',
    name: 'Excess Baggage',
    h1: 'Excess Baggage & Personal Belongings Shipping',
    shortDescription: 'Baggage shipping for personal belongings, travelers, students, and relocating families.',
    enabled: true,
    isVerified: true,
    quoteCargoType: 'excess_baggage',
    contentPath: 'content/services/excess-baggage.mdx',
    iconName: 'Luggage',
    category: 'specialized',
    relatedServices: ['air-freight', 'sea-cargo'],
    relatedDestinations: ['uk', 'uae', 'usa', 'canada', 'ksa'],
    relatedLocations: ['lahore', 'karachi', 'islamabad'],
    seo: {
      title: 'Excess Baggage International Shipping Pakistan',
      description: 'Baggage shipping solutions for personal belongings and relocation cargo from Pakistan worldwide.',
    },
  },
];

export function getEnabledServices(): ServiceConfigItem[] {
  return servicesRegistry.filter((s) => s.enabled === true && s.isVerified === true);
}
