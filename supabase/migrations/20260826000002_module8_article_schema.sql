-- Module 8: Article Schema Migration for Long-Tail SEO Engine

-- 1. Explicit Verification & Indexability Flags
ALTER TABLE articles ADD COLUMN IF NOT EXISTS is_verified BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE articles ADD COLUMN IF NOT EXISTS is_indexable BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE articles ADD COLUMN IF NOT EXISTS contains_regulatory_claims BOOLEAN NOT NULL DEFAULT false;

-- 2. Search Intent & Editorial Topic Fields
ALTER TABLE articles ADD COLUMN IF NOT EXISTS search_intent TEXT NOT NULL DEFAULT 'informational';
-- 'informational' | 'commercial-investigation' | 'transactional-support'

ALTER TABLE articles ADD COLUMN IF NOT EXISTS primary_topic TEXT;
ALTER TABLE articles ADD COLUMN IF NOT EXISTS target_entity_slug TEXT;
ALTER TABLE articles ADD COLUMN IF NOT EXISTS reading_time_minutes INT NOT NULL DEFAULT 5;
ALTER TABLE articles ADD COLUMN IF NOT EXISTS verification_notes TEXT;
ALTER TABLE articles ADD COLUMN IF NOT EXISTS reference_urls TEXT;

-- 3. Optimized Build Export Index
CREATE INDEX IF NOT EXISTS idx_articles_pub_export 
  ON articles (status, is_verified, is_indexable, published_at DESC);
