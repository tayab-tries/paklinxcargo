-- Module 9: Safe Existing Quotes Table Reconciliation Script

-- 1. Create table if missing from earlier architecture
CREATE TABLE IF NOT EXISTS quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_name TEXT NOT NULL,
  sender_phone TEXT,
  sender_email TEXT,
  origin_city TEXT NOT NULL,
  destination_country TEXT NOT NULL,
  cargo_type TEXT NOT NULL,
  estimated_weight_kg NUMERIC NOT NULL,
  cargo_description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Add missing columns with safe defaults/nullable state where appropriate
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS quote_reference TEXT;
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS contact_preference TEXT DEFAULT 'whatsapp';
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS length_cm INT;
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS width_cm INT;
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS height_cm INT;
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS package_count INT DEFAULT 1;
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS destination_city TEXT;
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS additional_notes TEXT;
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS source_page TEXT;
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS utm_source TEXT;
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS utm_medium TEXT;
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS utm_campaign TEXT;
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS internal_notes TEXT;
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS assigned_admin_id UUID REFERENCES auth.users(id);
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS admin_notification_status TEXT DEFAULT 'pending';
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS customer_notification_status TEXT DEFAULT 'pending';
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS email_attempt_count INT DEFAULT 0;
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS email_error_metadata JSONB DEFAULT '{}'::jsonb;
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- 3. PL/pgSQL Data Migration & Normalization for Legacy Rows
DO $$
DECLARE
  rec RECORD;
BEGIN
  -- A. Generate collision-free references for existing rows using full UUID
  FOR rec IN SELECT id FROM quotes WHERE quote_reference IS NULL LOOP
    UPDATE quotes 
    SET quote_reference = 'QTE-LEGACY-' || REPLACE(rec.id::text, '-', '')
    WHERE id = rec.id;
  END LOOP;

  -- B. Normalize legacy NULL default values
  UPDATE quotes SET contact_preference = 'whatsapp' WHERE contact_preference IS NULL;
  UPDATE quotes SET package_count = 1 WHERE package_count IS NULL;
  UPDATE quotes SET email_attempt_count = 0 WHERE email_attempt_count IS NULL;
  UPDATE quotes SET admin_notification_status = 'pending' WHERE admin_notification_status IS NULL;
  UPDATE quotes SET customer_notification_status = 'pending' WHERE customer_notification_status IS NULL;
  UPDATE quotes SET status = 'new' WHERE status IS NULL;
END $$;

-- 4. Enforce Final Constraints Idempotently
ALTER TABLE quotes ALTER COLUMN quote_reference SET NOT NULL;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'unique_quote_reference'
  ) THEN
    ALTER TABLE quotes ADD CONSTRAINT unique_quote_reference UNIQUE (quote_reference);
  END IF;
END $$;

-- 5. Add Indexes & RLS Security (0 Public SELECT/INSERT/UPDATE Access)
CREATE INDEX IF NOT EXISTS idx_quotes_status ON quotes (status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quotes_ref ON quotes (quote_reference);

ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admin All Access quotes" ON quotes;
CREATE POLICY "Admin All Access quotes" ON quotes FOR ALL USING (is_active_admin());
