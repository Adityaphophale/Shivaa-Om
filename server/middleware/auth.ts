import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import pool from '../db';

declare global {
  namespace Express {
    interface Request {
      admin?: { id: number; email: string };
    }
  }
}

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    const secret = process.env.JWT_SECRET || 'change-me';
    const payload = jwt.verify(token, secret) as any;
    // check password_changed_at to force logout after password change
    (async () => {
      try {
        const [rows]: any = await pool.execute('SELECT password_changed_at, token_version FROM admins WHERE id = ?', [payload.id]);
        const admin = rows[0];
        if (admin) {
          // token_version check
          const tokenVersion = payload.token_version || 0;
          const adminTokenVersion = admin.token_version || 0;
          console.log('Auth check token_version:', { tokenVersion, adminTokenVersion });
          if (tokenVersion !== adminTokenVersion) {
            console.log('Token version mismatch, rejecting');
            return res.status(401).json({ error: 'Unauthorized' });
          }
        }
        req.admin = { id: payload.id, email: payload.email };
        next();
      } catch (err) {
        console.error('Auth DB check error', err);
        return res.status(401).json({ error: 'Unauthorized' });
      }
    })();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};
