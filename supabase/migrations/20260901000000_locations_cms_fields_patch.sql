-- Migration: Add missing Location CMS columns to public.locations
-- Resolves schema cache error: "Could not find the 'content_blocks' column of 'locations'"

ALTER TABLE public.locations
  ADD COLUMN IF NOT EXISTS meta_title TEXT,
  ADD COLUMN IF NOT EXISTS meta_description TEXT,
  ADD COLUMN IF NOT EXISTS hub_address TEXT,
  ADD COLUMN IF NOT EXISTS phone_local TEXT,
  ADD COLUMN IF NOT EXISTS email_local TEXT,
  ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS services_offered JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS verified_branches JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS content_blocks JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS faqs JSONB DEFAULT '[]'::jsonb;
