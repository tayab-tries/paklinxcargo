-- Migration: Cleanup all seeded/default locations, destination cities, destination countries, and door-to-door services
-- Ensures zero seeded/default location and destination records remain in the Supabase production database.

-- 1. Delete child destination cities (foreign key safety)
DELETE FROM public.destination_cities;

-- 2. Delete parent destination countries
DELETE FROM public.destination_countries;

-- 3. Delete origin locations
DELETE FROM public.locations;

-- 4. Safely remove door-to-door services if stored in services table
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'services') THEN
    DELETE FROM public.services WHERE slug = 'door-to-door' OR slug = 'door_to_door';
  END IF;
END $$;
