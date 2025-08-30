-- Breathship Database Reset Script
-- Use this script to completely reset your database
-- WARNING: This will delete all existing data!

-- Drop all tables
DROP TABLE IF EXISTS testimonials CASCADE;
DROP TABLE IF EXISTS sessions CASCADE;
DROP TABLE IF EXISTS blogs CASCADE;
DROP TABLE IF EXISTS content CASCADE;

-- Drop trigger function
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- Now run the main database_schema.sql script to recreate everything
