import { Router } from 'express';
import pool from '../db';
import { requireAuth } from '../middleware/auth';

const router = Router();

async function getSafeStatusCount(status: string | null) {
  try {
    let query = 'SELECT COUNT(*) as total FROM enquiries';
    let params: any[] = [];
    if (status) {
        query += ' WHERE status = ?';
        params.push(status);
    }
    const [result]: any = await pool.execute(query, params);
    return result[0].total;
  } catch (err: any) {
    return 0;
  }
}

async function getSafeRecentEnquiries() {
  try {
    const [result]: any = await pool.execute('SELECT * FROM enquiries ORDER BY created_at DESC LIMIT 5');
    return result;
  } catch (err: any) {
    return [];
  }
}

router.get('/', requireAuth, async (req, res) => {
  try {
    // Ensure all dashboard-related tables exist to prevent crashes
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS enquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        organization VARCHAR(255),
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        country VARCHAR(100),
        product_interest VARCHAR(255),
        message TEXT,
        source_page VARCHAR(255),
        status ENUM('New', 'Contacted', 'Closed') DEFAULT 'New',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const totalInquiries = await getSafeStatusCount(null);
    const newInquiries = await getSafeStatusCount('New');
    const contactedInquiries = await getSafeStatusCount('Contacted');
    const closedInquiries = await getSafeStatusCount('Closed');
    const recentEnquiries = await getSafeRecentEnquiries();

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