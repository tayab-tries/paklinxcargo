-- Module 10A: No-Code CMS / Content Management Expansion Migration

-- 1. Homepage Blocks (Controlled block-based homepage content)
CREATE TABLE IF NOT EXISTS homepage_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  block_type TEXT NOT NULL, -- 'hero' | 'quick_quote' | 'services' | 'locations' | 'destinations' | 'process' | 'trust' | 'guides' | 'faq' | 'cta'
  sort_order INT NOT NULL DEFAULT 0,
  enabled BOOLEAN NOT NULL DEFAULT true,
  content_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Site Navigation Manager
CREATE TABLE IF NOT EXISTS site_navigation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  nav_location TEXT NOT NULL DEFAULT 'header', -- 'header' | 'footer' | 'topbar'
  sort_order INT NOT NULL DEFAULT 0,
  enabled BOOLEAN NOT NULL DEFAULT true,
  parent_id UUID REFERENCES site_navigation(id) ON DELETE CASCADE,
  open_in_new_tab BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Controlled CMS Pages
CREATE TABLE IF NOT EXISTS cms_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'draft', -- 'draft' | 'review' | 'published' | 'archived'
  is_verified BOOLEAN NOT NULL DEFAULT false,
  is_indexable BOOLEAN NOT NULL DEFAULT true,
  seo_title TEXT NOT NULL,
  seo_description TEXT NOT NULL,
  canonical_url TEXT,
  blocks JSONB NOT NULL DEFAULT '[]'::jsonb,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Verified Business Credentials & Certifications
CREATE TABLE IF NOT EXISTS credentials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  credential_type TEXT NOT NULL DEFAULT 'certification', -- 'registration' | 'certification' | 'association' | 'membership' | 'carrier_network' | 'other'
  logo_url TEXT,
  description TEXT,
  verification_url TEXT,
  is_verified BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE homepage_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_navigation ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE credentials ENABLE ROW LEVEL SECURITY;

-- Policies for Active Admin Access
CREATE POLICY "Admin All Access homepage_blocks" ON homepage_blocks FOR ALL USING (is_active_admin());
CREATE POLICY "Admin All Access site_navigation" ON site_navigation FOR ALL USING (is_active_admin());
CREATE POLICY "Admin All Access cms_pages" ON cms_pages FOR ALL USING (is_active_admin());
CREATE POLICY "Admin All Access credentials" ON credentials FOR ALL USING (is_active_admin());
