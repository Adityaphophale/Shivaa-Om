import 'dotenv/config';
import { createPool } from 'mysql2/promise';

async function run() {
  const pool = createPool({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'shivaaomglobetrade',
    connectionLimit: 5,
  });

  try {
    const [rows] = await pool.query('SELECT DATABASE() AS db, NOW() AS now');
    console.log('DB check OK:', rows);
    await pool.end();
    process.exit(0);
  } catch (err) {
    console.error('DB check failed:', err);
    process.exit(1);
  }
}

run();
