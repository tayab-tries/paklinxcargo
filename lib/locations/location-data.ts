export interface LocationSection {
  title: string;
  content: string;
  list?: string[];
  links?: Array<{ label: string; href: string }>;
}

export interface CityLocationRecord {
  id: string;
  name: string;
  slug: string;
  province: string;
  h1: string;
  seoTitle: string;
  seoDescription: string;
  primaryKeyword: string;
  introduction: string;
  localCoverageText: string;
  supportedServices: string[];
  supportedDestinations: string[];
  serviceAvailable: boolean;
  collectionAvailable: boolean;
  hasPhysicalBranch: boolean;
  branchAddress?: string;
  sections: LocationSection[];
  faqs: Array<{ question: string; answer: string }>;
}

export const CITY_LOCATIONS_DATA: CityLocationRecord[] = [];
