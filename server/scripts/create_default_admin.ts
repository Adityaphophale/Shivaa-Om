import pool from '../db';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

async function run() {
  const email = process.env.DEFAULT_ADMIN_EMAIL || 'admin@shivaaomglobetrade.com';
  const password = process.env.DEFAULT_ADMIN_PASSWORD || 'Admin@123';
  const hash = await bcrypt.hash(password, 10);
  try {
    await pool.execute(
      'INSERT INTO admins (email, password_hash) VALUES (?, ?) ON DUPLICATE KEY UPDATE password_hash=VALUES(password_hash)',
      [email, hash]
    );
    console.log('Default admin ensured:', email);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
