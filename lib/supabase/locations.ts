export interface Location {
  id?: string;
  slug: string;
  name: string;
  province?: string;
  description?: string;
  service_available: boolean;
  collection_available: boolean;
  has_physical_branch: boolean;
  branch_address?: string;
  faqs?: Array<{ question: string; answer: string }>;
}
