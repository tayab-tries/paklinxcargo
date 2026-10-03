-- ============================================================================
-- CARGO LOGISTICS & SHIPPING - UNIFIED COMPREHENSIVE PRODUCTION SCHEMA
-- Complete database schema for Supabase deployment
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ----------------------------------------------------------------------------
-- 1. SECURITY DEFINER HELPER FUNCTIONS
-- ----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.admin_profiles 
    WHERE id = auth.uid() 
      AND role IN ('admin', 'editor')
  );
$$;

CREATE OR REPLACE FUNCTION public.is_active_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.admin_profiles 
    WHERE id = auth.uid() 
      AND is_active = true
      AND role IN ('admin', 'editor')
  );
$$;

-- ----------------------------------------------------------------------------
-- 2. ADMIN PROFILES & USER ROLES
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'editor', 'viewer')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 3. GLOBAL BUSINESS SETTINGS
-- ----------------------------------------------------------------------------

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

-- ----------------------------------------------------------------------------
-- 4. PAKISTAN LOCATIONS (ORIGIN CITIES)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  province TEXT NOT NULL,
  h1 TEXT NOT NULL,
  meta_title TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  hub_address TEXT,
  phone_local TEXT,
  email_local TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  services_offered JSONB DEFAULT '[]'::jsonb,
  verified_branches JSONB DEFAULT '[]'::jsonb,
  content_blocks JSONB DEFAULT '[]'::jsonb,
  faqs JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 5. INTERNATIONAL DESTINATION COUNTRIES & CITIES
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS destination_countries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  iso_code TEXT NOT NULL UNIQUE,
  h1 TEXT NOT NULL,
  meta_title TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  customs_summary TEXT,
  prohibited_items JSONB DEFAULT '[]'::jsonb,
  required_docs JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS destination_cities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country_id UUID NOT NULL REFERENCES destination_countries(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  h1 TEXT NOT NULL,
  meta_title TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  transit_time_air TEXT,
  transit_time_sea TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(country_id, slug)
);

-- ----------------------------------------------------------------------------
-- 6. CMS ARTICLES & GUIDES
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  meta_title TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  excerpt TEXT,
  content_markdown TEXT NOT NULL,
  category TEXT NOT NULL,
  reading_time_minutes INT DEFAULT 5,
  is_published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 7. FREQUENTLY ASKED QUESTIONS (FAQS)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  display_order INT DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 8. CMS REDIRECTS (301 PERMANENT REDIRECTS)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS redirects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_path TEXT NOT NULL UNIQUE,
  target_path TEXT NOT NULL,
  status_code INT NOT NULL DEFAULT 301 CHECK (status_code IN (301, 302, 307, 308)),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 9. MEDIA & ASSET LIBRARY
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL UNIQUE,
  file_size INT NOT NULL,
  mime_type TEXT NOT NULL,
  alt_text TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 10. CONTENT REVISIONS & HISTORICAL SNAPSHOTS
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS content_revisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  version_number INT NOT NULL,
  snapshot_data JSONB NOT NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(entity_type, entity_id, version_number)
);

-- ----------------------------------------------------------------------------
-- 11. AUDIT LOGS
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 12. SHIPMENT QUOTE REQUESTS
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_reference TEXT UNIQUE NOT NULL,
  sender_name TEXT NOT NULL,
  sender_phone TEXT,
  sender_email TEXT,
  contact_preference TEXT NOT NULL DEFAULT 'whatsapp',
  origin_city TEXT NOT NULL,
  destination_country TEXT NOT NULL,
  destination_city TEXT,
  cargo_type TEXT NOT NULL,
  estimated_weight_kg NUMERIC NOT NULL,
  package_count INT DEFAULT 1,
  length_cm INT,
  width_cm INT,
  height_cm INT,
  cargo_description TEXT NOT NULL,
  additional_notes TEXT,
  source_page TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  internal_notes TEXT,
  assigned_admin_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  admin_notification_status TEXT DEFAULT 'pending',
  customer_notification_status TEXT DEFAULT 'pending',
  email_attempt_count INT DEFAULT 0,
  email_error_metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 13. NO-CODE HOMEPAGE DYNAMIC BLOCKS
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS homepage_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  block_key TEXT NOT NULL UNIQUE,
  block_title TEXT NOT NULL,
  block_subtitle TEXT,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  display_order INT NOT NULL DEFAULT 0,
  is_enabled BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 14. NO-CODE SITE NAVIGATION MENUS
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS site_navigation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_location TEXT NOT NULL CHECK (menu_location IN ('header', 'footer', 'topbar')),
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(menu_location)
);

-- ----------------------------------------------------------------------------
-- 15. NO-CODE DYNAMIC CMS PAGES
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS cms_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  meta_title TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  content_markdown TEXT NOT NULL,
  sections JSONB DEFAULT '[]'::jsonb,
  is_published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 16. COMPANY CREDENTIALS & CERTIFICATIONS
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS credentials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  issuing_authority TEXT NOT NULL,
  license_number TEXT,
  verification_url TEXT,
  badge_image_url TEXT,
  display_order INT DEFAULT 0,
  is_verified BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- INDEXES FOR FAST SEARCH & PERFORMANCE
-- ----------------------------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_locations_slug ON locations(slug);
CREATE INDEX IF NOT EXISTS idx_destination_countries_slug ON destination_countries(slug);
CREATE INDEX IF NOT EXISTS idx_destination_cities_slug ON destination_cities(slug);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_cms_pages_slug ON cms_pages(slug);
CREATE INDEX IF NOT EXISTS idx_content_revisions_lookup ON content_revisions(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON quotes(created_at DESC);

-- ----------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ----------------------------------------------------------------------------

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
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_navigation ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE credentials ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if re-running script
DROP POLICY IF EXISTS "Admin All Access admin_profiles" ON admin_profiles;
DROP POLICY IF EXISTS "Admin All Access business_settings" ON business_settings;
DROP POLICY IF EXISTS "Admin All Access locations" ON locations;
DROP POLICY IF EXISTS "Admin All Access destination_countries" ON destination_countries;
DROP POLICY IF EXISTS "Admin All Access destination_cities" ON destination_cities;
DROP POLICY IF EXISTS "Admin All Access articles" ON articles;
DROP POLICY IF EXISTS "Admin All Access faqs" ON faqs;
DROP POLICY IF EXISTS "Admin All Access redirects" ON redirects;
DROP POLICY IF EXISTS "Admin All Access media" ON media;
DROP POLICY IF EXISTS "Admin All Access content_revisions" ON content_revisions;
DROP POLICY IF EXISTS "Admin All Access audit_logs" ON audit_logs;
DROP POLICY IF EXISTS "Admin All Access quotes" ON quotes;
DROP POLICY IF EXISTS "Admin All Access homepage_blocks" ON homepage_blocks;
DROP POLICY IF EXISTS "Admin All Access site_navigation" ON site_navigation;
DROP POLICY IF EXISTS "Admin All Access cms_pages" ON cms_pages;
DROP POLICY IF EXISTS "Admin All Access credentials" ON credentials;

DROP POLICY IF EXISTS "Public Read business_settings" ON business_settings;
DROP POLICY IF EXISTS "Public Read locations" ON locations;
DROP POLICY IF EXISTS "Public Read destination_countries" ON destination_countries;
DROP POLICY IF EXISTS "Public Read destination_cities" ON destination_cities;
DROP POLICY IF EXISTS "Public Read articles" ON articles;
DROP POLICY IF EXISTS "Public Read faqs" ON faqs;
DROP POLICY IF EXISTS "Public Read homepage_blocks" ON homepage_blocks;
DROP POLICY IF EXISTS "Public Read site_navigation" ON site_navigation;
DROP POLICY IF EXISTS "Public Read cms_pages" ON cms_pages;
DROP POLICY IF EXISTS "Public Read credentials" ON credentials;

-- Active Admin access policies
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
CREATE POLICY "Admin All Access quotes" ON quotes FOR ALL USING (is_active_admin());
CREATE POLICY "Admin All Access homepage_blocks" ON homepage_blocks FOR ALL USING (is_active_admin());
CREATE POLICY "Admin All Access site_navigation" ON site_navigation FOR ALL USING (is_active_admin());
CREATE POLICY "Admin All Access cms_pages" ON cms_pages FOR ALL USING (is_active_admin());
CREATE POLICY "Admin All Access credentials" ON credentials FOR ALL USING (is_active_admin());

-- Public Read Access Policies (allows static build page generation & public visitors to read published CMS content)
CREATE POLICY "Public Read business_settings" ON business_settings FOR SELECT USING (true);
CREATE POLICY "Public Read locations" ON locations FOR SELECT USING (true);
CREATE POLICY "Public Read destination_countries" ON destination_countries FOR SELECT USING (true);
CREATE POLICY "Public Read destination_cities" ON destination_cities FOR SELECT USING (true);
CREATE POLICY "Public Read articles" ON articles FOR SELECT USING (true);
CREATE POLICY "Public Read faqs" ON faqs FOR SELECT USING (true);
CREATE POLICY "Public Read homepage_blocks" ON homepage_blocks FOR SELECT USING (true);
CREATE POLICY "Public Read site_navigation" ON site_navigation FOR SELECT USING (true);
CREATE POLICY "Public Read cms_pages" ON cms_pages FOR SELECT USING (true);
CREATE POLICY "Public Read credentials" ON credentials FOR SELECT USING (true);
