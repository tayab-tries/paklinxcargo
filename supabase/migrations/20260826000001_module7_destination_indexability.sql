-- Module 7: Destination Indexability and City Content Migration

-- 1. Country Indexability
ALTER TABLE destination_countries ADD COLUMN IF NOT EXISTS is_indexable BOOLEAN NOT NULL DEFAULT false;

-- 2. Destination City Content & Indexability Fields
ALTER TABLE destination_cities ADD COLUMN IF NOT EXISTS overview TEXT;
ALTER TABLE destination_cities ADD COLUMN IF NOT EXISTS preparation_considerations TEXT;
ALTER TABLE destination_cities ADD COLUMN IF NOT EXISTS delivery_coverage_notes TEXT;
ALTER TABLE destination_cities ADD COLUMN IF NOT EXISTS is_indexable BOOLEAN NOT NULL DEFAULT false;

-- 3. Optimized Indexes for Build-Time Static Export
CREATE INDEX IF NOT EXISTS idx_destination_countries_pub 
  ON destination_countries (status, is_verified, is_indexable);
CREATE INDEX IF NOT EXISTS idx_destination_cities_pub 
  ON destination_cities (country_id, status, is_verified, is_indexable);
