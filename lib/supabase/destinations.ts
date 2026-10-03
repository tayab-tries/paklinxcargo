export interface Destination {
  id?: string;
  slug?: string;
  country_code: string;
  country_name: string;
  region?: string;
  overview?: string;
  customs_info?: string;
  faqs?: Array<{ question: string; answer: string }>;
}
