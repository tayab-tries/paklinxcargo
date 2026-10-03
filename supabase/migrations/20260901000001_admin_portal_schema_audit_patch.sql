-- Migration: Admin Portal Schema Audit Patch
-- Ensures all columns referenced by admin portal server actions exist on Supabase tables with safe default values

-- 1. Destination Countries Table Patch
ALTER TABLE public.destination_countries
  ADD COLUMN IF NOT EXISTS iso_code TEXT,
  ADD COLUMN IF NOT EXISTS meta_title TEXT,
  ADD COLUMN IF NOT EXISTS meta_description TEXT,
  ADD COLUMN IF NOT EXISTS customs_summary TEXT,
  ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS prohibited_items JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS required_docs JSONB DEFAULT '[]'::jsonb;

-- 2. Articles Table Patch
ALTER TABLE public.articles
  ADD COLUMN IF NOT EXISTS meta_title TEXT,
  ADD COLUMN IF NOT EXISTS meta_description TEXT,
  ADD COLUMN IF NOT EXISTS reading_time_minutes INT NOT NULL DEFAULT 5,
  ADD COLUMN IF NOT EXISTS is_published BOOLEAN NOT NULL DEFAULT true;

-- 3. FAQs Table Patch
ALTER TABLE public.faqs
  ADD COLUMN IF NOT EXISTS category TEXT NOT NULL DEFAULT 'general',
  ADD COLUMN IF NOT EXISTS display_order INT NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS is_published BOOLEAN NOT NULL DEFAULT true;

-- 4. Credentials Table Patch
ALTER TABLE public.credentials
  ADD COLUMN IF NOT EXISTS title TEXT,
  ADD COLUMN IF NOT EXISTS issuing_authority TEXT,
  ADD COLUMN IF NOT EXISTS license_number TEXT,
  ADD COLUMN IF NOT EXISTS badge_image_url TEXT,
  ADD COLUMN IF NOT EXISTS display_order INT NOT NULL DEFAULT 0;

-- 5. Homepage Blocks Table Patch (Dual Column Support)
ALTER TABLE public.homepage_blocks
  ADD COLUMN IF NOT EXISTS block_key TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS block_title TEXT,
  ADD COLUMN IF NOT EXISTS display_order INT NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS is_enabled BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS content JSONB DEFAULT '{}'::jsonb;

-- 6. CMS Pages Table Patch
ALTER TABLE public.cms_pages
  ADD COLUMN IF NOT EXISTS meta_title TEXT,
  ADD COLUMN IF NOT EXISTS meta_description TEXT,
  ADD COLUMN IF NOT EXISTS content_markdown TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS is_published BOOLEAN NOT NULL DEFAULT true;

-- 7. Site Navigation Table Patch
ALTER TABLE public.site_navigation
  ADD COLUMN IF NOT EXISTS menu_location TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS items JSONB DEFAULT '[]'::jsonb;
