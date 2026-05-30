import 'dotenv/config';
import pool from '../db';

async function run() {
  try {
    await pool.execute("ALTER TABLE admins ADD COLUMN IF NOT EXISTS token_version INT NOT NULL DEFAULT 0");
    console.log('Migration applied: token_version column ensured');
    await pool.end();
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

run();
