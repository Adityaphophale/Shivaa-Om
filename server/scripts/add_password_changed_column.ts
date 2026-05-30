import 'dotenv/config';
import pool from '../db';

async function run() {
  try {
    await pool.execute("ALTER TABLE admins ADD COLUMN IF NOT EXISTS password_changed_at TIMESTAMP NULL DEFAULT NULL");
    console.log('Migration applied: password_changed_at column ensured');
    await pool.end();
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

run();
