export interface Article {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category?: string;
  reading_time_minutes?: number;
  author_name?: string;
  published_at?: string;
}
