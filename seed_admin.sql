-- Seed admin placeholder. This file creates a default admin record if needed.
-- For security, it's recommended to use the provided server/scripts/create_default_admin.ts
-- which will hash the password using bcrypt. If you want a SQL-only seed, replace
-- the PASSWORD_HASH_PLACEHOLDER with a bcrypt hash computed externally.

USE shivaaomglobetrade;

INSERT INTO admins (email, password_hash)
VALUES ('admin@shivaaomglobetrade.com', 'PASSWORD_HASH_PLACEHOLDER')
ON DUPLICATE KEY UPDATE email = VALUES(email);

-- To create a usable admin, either run server/scripts/create_default_admin.ts
-- or replace PASSWORD_HASH_PLACEHOLDER with a bcrypt hash for your chosen password.
