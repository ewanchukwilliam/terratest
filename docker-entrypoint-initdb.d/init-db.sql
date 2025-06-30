-- Create additional database for testing if needed
-- This file is automatically executed when the PostgreSQL container starts for the first time

-- The main database 'terratest_db' is already created via environment variables
-- Additional setup can be added here if needed

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- You can add more initialization SQL here if needed