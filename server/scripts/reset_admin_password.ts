import 'dotenv/config';
import pool from '../db';
import bcrypt from 'bcrypt';

async function run() {
  const email = process.env.DEFAULT_ADMIN_EMAIL || 'admin@shivaaomglobetrade.com';
  const pw = process.env.DEFAULT_ADMIN_PASSWORD || 'Admin@123';
  try {
    const hash = await bcrypt.hash(pw, 10);
    const [result]: any = await pool.execute('UPDATE admins SET password_hash = ?, password_changed_at = NULL, token_version = 0 WHERE email = ?', [hash, email]);
    console.log('Reset result:', result.affectedRows);
    await pool.end();
    process.exit(0);
  } catch (err) {
    console.error('Reset failed:', err);
    process.exit(1);
  }
}

run();
