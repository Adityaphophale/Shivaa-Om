import { Router } from 'express';
import pool from '../db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  try {
    const [rows]: any = await pool.execute('SELECT id, email, password_hash, token_version FROM admins WHERE email = ?', [email]);
    const admin = rows[0];
    if (!admin) return res.status(401).json({ error: 'Invalid credentials' });
    const match = await bcrypt.compare(password, admin.password_hash);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });
    const secret = process.env.JWT_SECRET || 'change-me';
    const tokenPayload: any = { id: admin.id, email: admin.email, token_version: admin.token_version || 0 };
    const token = jwt.sign(tokenPayload, secret, { expiresIn: '8h' });
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 8 * 60 * 60 * 1000,
    });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ success: true });
});

router.get('/me', requireAuth, async (req: any, res) => {
  res.json({ authenticated: true, id: req.admin?.id, email: req.admin?.email });
});

router.post('/change-password', requireAuth, async (req: any, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body || {};
  if (!currentPassword || !newPassword || !confirmPassword) return res.status(400).json({ error: 'All fields required' });
  if (newPassword !== confirmPassword) return res.status(400).json({ error: 'New password and confirm password do not match' });
  if (newPassword.length < 8) return res.status(400).json({ error: 'New password must be at least 8 characters' });
  try {
    const adminId = req.admin?.id;
    const [rows]: any = await pool.execute('SELECT password_hash FROM admins WHERE id = ?', [adminId]);
    const admin = rows[0];
    if (!admin) return res.status(404).json({ error: 'Admin not found' });
    const match = await bcrypt.compare(currentPassword, admin.password_hash);
    if (!match) return res.status(401).json({ error: 'Current password is incorrect' });
    const hash = await bcrypt.hash(newPassword, 10);
    await pool.execute('UPDATE admins SET password_hash = ?, password_changed_at = CURRENT_TIMESTAMP, token_version = token_version + 1 WHERE id = ?', [hash, adminId]);
    // Force logout by clearing token cookie
    res.clearCookie('token');
    res.json({ success: true, message: 'Password changed; please log in again' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;

