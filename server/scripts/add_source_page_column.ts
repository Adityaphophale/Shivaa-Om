import 'dotenv/config';
import pool from '../db';

async function run() {
  try {
    // The correct table name used in server/routes/enquiries.ts
    const tableName = 'enquiries'; 
    
    await pool.execute(`ALTER TABLE ${tableName} ADD COLUMN IF NOT EXISTS source_page VARCHAR(255) NULL`);
    console.log(`Migration applied: source_page column ensured on table ${tableName}`);
    await pool.end();
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

run();