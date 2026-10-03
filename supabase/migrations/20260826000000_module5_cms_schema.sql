-- Module 5: CMS / Admin Content Architecture Schema Migration

-- 1. Security Definer Functions (Non-recursive admin checks)
CREATE OR REPLACE FUNCTION is_active_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM admin_profiles
    WHERE id = auth.uid() AND is_active = true
  );
$$;

CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM admin_profiles
    WHERE id = auth.uid() AND role = 'admin' AND is_active = true
  );
$$;

-- 2. Admin Profiles
CREATE TABLE IF NOT EXISTS admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'editor', -- 'admin' | 'editor'
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Business Settings
CREATE TABLE IF NOT EXISTS business_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_name TEXT NOT NULL,
  legal_name TEXT,
  phone_primary TEXT,
  whatsapp_number TEXT,
  email_info TEXT,
  operating_hours TEXT,
  verified_offices JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Pakistan Locations (Origin Cities)
CREATE TABLE IF NOT EXISTS locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  province TEXT NOT NULL,
  h1 TEXT NOT NULL,
  seo_title TEXT NOT NULL,
  seo_description TEXT NOT NULL,
  introduction TEXT NOT NULL,
  has_physical_branch BOOLEAN NOT NULL DEFAULT false,
  branch_address TEXT,
  local_coverage_text TEXT,
  status TEXT NOT NULL DEFAULT 'draft', -- 'draft' | 'review' | 'published' | 'archived'
  is_verified BOOLEAN NOT NULL DEFAULT false,
  is_indexable BOOLEAN NOT NULL DEFAULT true,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Destination Countries
CREATE TABLE IF NOT EXISTS destination_countries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  region TEXT NOT NULL,
  h1 TEXT NOT NULL,
  seo_title TEXT NOT NULL,
  seo_description TEXT NOT NULL,
  introduction TEXT NOT NULL,
  shipping_overview TEXT,
  customs_guidance TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  is_verified BOOLEAN NOT NULL DEFAULT false,
  is_indexable BOOLEAN NOT NULL DEFAULT true,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Destination Cities (Sub-Destinations)
CREATE TABLE IF NOT EXISTS destination_cities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country_id UUID NOT NULL REFERENCES destination_countries(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  h1 TEXT NOT NULL,
  seo_title TEXT NOT NULL,
  seo_description TEXT NOT NULL,
  introduction TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  is_verified BOOLEAN NOT NULL DEFAULT false,
  is_indexable BOOLEAN NOT NULL DEFAULT true,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_country_city_slug UNIQUE (country_id, slug)
);

-- 7. Articles & Guides
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content_markdown TEXT NOT NULL,
  cover_image_url TEXT,
  cover_image_alt TEXT,
  category TEXT NOT NULL,
  author_name TEXT NOT NULL DEFAULT 'Logistics Editorial Team',
  seo_title TEXT NOT NULL,
  seo_description TEXT NOT NULL,
  canonical_url TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  is_verified BOOLEAN NOT NULL DEFAULT false,
  is_indexable BOOLEAN NOT NULL DEFAULT true,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. Normalized Join Tables (Zero TEXT[] Blobs)
CREATE TABLE IF NOT EXISTS location_services (
  location_id UUID REFERENCES locations(id) ON DELETE CASCADE,
  service_slug TEXT NOT NULL,
  PRIMARY KEY (location_id, service_slug)
);

CREATE TABLE IF NOT EXISTS location_destinations (
  location_id UUID REFERENCES locations(id) ON DELETE CASCADE,
  destination_country_id UUID REFERENCES destination_countries(id) ON DELETE CASCADE,
  PRIMARY KEY (location_id, destination_country_id)
);

CREATE TABLE IF NOT EXISTS destination_services (
  destination_country_id UUID REFERENCES destination_countries(id) ON DELETE CASCADE,
  service_slug TEXT NOT NULL,
  PRIMARY KEY (destination_country_id, service_slug)
);

CREATE TABLE IF NOT EXISTS destination_locations (
  destination_country_id UUID REFERENCES destination_countries(id) ON DELETE CASCADE,
  location_id UUID REFERENCES locations(id) ON DELETE CASCADE,
  PRIMARY KEY (destination_country_id, location_id)
);

CREATE TABLE IF NOT EXISTS article_services (
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  service_slug TEXT NOT NULL,
  PRIMARY KEY (article_id, service_slug)
);

CREATE TABLE IF NOT EXISTS article_locations (
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  location_id UUID REFERENCES locations(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, location_id)
);

CREATE TABLE IF NOT EXISTS article_destinations (
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  destination_country_id UUID REFERENCES destination_countries(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, destination_country_id)
);

-- 9. FAQs
CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  entity_type TEXT NOT NULL DEFAULT 'general',
  entity_slug TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'published',
  is_verified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. Authoritative 301 Redirects
CREATE TABLE IF NOT EXISTS redirects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_path TEXT NOT NULL UNIQUE,
  target_path TEXT NOT NULL,
  status_code INT NOT NULL DEFAULT 301,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. Media Asset Metadata
CREATE TABLE IF NOT EXISTS media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL UNIQUE,
  public_url TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  size_bytes INT NOT NULL,
  alt_text TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. Content Revisions
CREATE TABLE IF NOT EXISTS content_revisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  version_number INT NOT NULL,
  snapshot_data JSONB NOT NULL,
  created_by UUID REFERENCES auth.users(id),
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 13. Audit Logs
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Row Level Security (RLS) Policies
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE destination_countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE destination_cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE redirects ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_revisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Admin access policies using is_active_admin()
CREATE POLICY "Admin All Access admin_profiles" ON admin_profiles FOR ALL USING (is_active_admin());
CREATE POLICY "Admin All Access business_settings" ON business_settings FOR ALL USING (is_active_admin());
CREATE POLICY "Admin All Access locations" ON locations FOR ALL USING (is_active_admin());
CREATE POLICY "Admin All Access destination_countries" ON destination_countries FOR ALL USING (is_active_admin());
CREATE POLICY "Admin All Access destination_cities" ON destination_cities FOR ALL USING (is_active_admin());
CREATE POLICY "Admin All Access articles" ON articles FOR ALL USING (is_active_admin());
CREATE POLICY "Admin All Access faqs" ON faqs FOR ALL USING (is_active_admin());
CREATE POLICY "Admin All Access redirects" ON redirects FOR ALL USING (is_active_admin());
CREATE POLICY "Admin All Access media" ON media FOR ALL USING (is_active_admin());
CREATE POLICY "Admin All Access content_revisions" ON content_revisions FOR ALL USING (is_active_admin());
CREATE POLICY "Admin All Access audit_logs" ON audit_logs FOR ALL USING (is_active_admin());
