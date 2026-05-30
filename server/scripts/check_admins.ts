import pool from '../db';
import dotenv from 'dotenv';

dotenv.config();

async function run() {
  try {
    const [rows]: any = await pool.execute('SELECT id, email, password_hash, created_at FROM admins');
    console.log('Admins rows:', rows.length);
    console.table(rows);
  } catch (err) {
    console.error('Error querying admins:', err);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

run();
