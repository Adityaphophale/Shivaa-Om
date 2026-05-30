import 'dotenv/config';

const BASE = process.env.API_BASE || 'http://localhost:3001';

async function run() {
  const url = `${BASE}/api/auth/login`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: process.env.DEFAULT_ADMIN_EMAIL || 'admin@shivaaomglobetrade.com', password: process.env.DEFAULT_ADMIN_PASSWORD || 'Admin@123' }),
  });
  console.log('POST', url);
  console.log('Status:', res.status);
  console.log('Headers:', Object.fromEntries(res.headers.entries()));
  const text = await res.text();
  console.log('Body:', text);
}

run().catch(err => { console.error(err); process.exit(1); });
