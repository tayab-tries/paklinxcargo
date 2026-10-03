export interface Service {
  id?: string;
  slug: string;
  title: string;
  name: string;
  short_description: string;
  full_description?: string;
  category?: string;
  quoteCargoType?: string;
  features?: string[];
  use_cases?: string[];
  technical_info?: string;
  seo?: {
    title: string;
    description: string;
  };
}
