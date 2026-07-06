import { Router } from 'express';
import pool from '../db';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.get('/', requireAuth, async (req, res) => {
  try {
    // Dashboard stats - enquiries have been moved to WhatsApp
    const totalInquiries = 0;
    const newInquiries = 0;
    const contactedInquiries = 0;
    const closedInquiries = 0;
    const recentEnquiries: any[] = [];

    res.json({
      totalInquiries,
      newInquiries,
      contactedInquiries,
      closedInquiries,
      recentEnquiries
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;