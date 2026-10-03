export const cargoTypes = [
  'air_freight',
  'sea_cargo',
  'door_to_door',
  'commercial_freight',
  'excess_baggage',
] as const;

export type CargoType = (typeof cargoTypes)[number];

export interface BreadcrumbItem {
  label: string;
  url: string;
}

export interface ProcessStepItem {
  title: string;
  description: string;
}

export interface ServiceMdxFrontmatter {
  title: string;
  description: string;
  slug: string;
  canonical?: string;
  publishedAt?: string;
  updatedAt?: string;
  author?: string;
  type: 'service';
  serviceOverview: string;
  targetAudience: string[];
  processSteps: ProcessStepItem[];
  keyConsiderations: string[];
  faq?: Array<{ question: string; answer: string }>;
}

export interface ServiceMdxData {
  frontmatter: ServiceMdxFrontmatter;
  content: string;
}
