import 'dotenv/config';

async function run() {
  const BASE = process.env.API_BASE || 'http://localhost:3001';
  const email = process.env.DEFAULT_ADMIN_EMAIL || 'admin@shivaaomglobetrade.com';
  const password = process.env.DEFAULT_ADMIN_PASSWORD || 'Admin@123';
  const newPassword = process.env.TEST_NEW_PASSWORD || 'NewAdmin@123';

  console.log('API BASE:', BASE);

  // Login
  const loginRes = await fetch(`${BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  console.log('Login status:', loginRes.status);
  const setCookie = loginRes.headers.get('set-cookie') || loginRes.headers.get('Set-Cookie');
  console.log('Set-Cookie header:', setCookie);
  const loginBody = await loginRes.text();
  console.log('Login body:', loginBody);

  if (!setCookie) {
    console.error('No cookie set; cannot proceed');
    process.exit(1);
  }

  const cookie = setCookie.split(';')[0];

  // Change password
  const changeRes = await fetch(`${BASE}/api/auth/change-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: cookie },
    body: JSON.stringify({ currentPassword: password, newPassword, confirmPassword: newPassword }),
  });
  console.log('Change-password status:', changeRes.status);
  const changeBody = await changeRes.text();
  console.log('Change-body:', changeBody);

  // Verify logout (me)
  const meRes = await fetch(`${BASE}/api/auth/me`, {
    method: 'GET',
    headers: { Cookie: cookie },
  });
  console.log('/me status after change:', meRes.status);
  const meBody = await meRes.text();
  console.log('/me body after change:', meBody);

  // Try login with new password
  const reloginRes = await fetch(`${BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password: newPassword }),
  });
  console.log('Re-login with new password status:', reloginRes.status);
  console.log('Re-login body:', await reloginRes.text());

}

run().catch(err => { console.error(err); process.exit(1); });
