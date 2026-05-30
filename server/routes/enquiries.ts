import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import pool from '../db';
import { requireAuth } from '../middleware/auth';

const router = Router();

// Public endpoint to submit enquiry
router.post(
  '/',
  body('full_name').isString().isLength({ min: 1 }),
  body('email').isEmail(),
  body('message').isString().isLength({ min: 1 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { full_name, organization, email, phone, product_interest, message, source_page } = req.body;
    console.log("Enquiry received:", req.body);

    try {
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
          status ENUM('New','Contacted','Closed') DEFAULT 'New',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Note: frontend sends 'country' in POST payload as well. Included it here to avoid data loss.
      const { country } = req.body;

      const [result]: any = await pool.execute(
        `INSERT INTO enquiries (full_name, organization, email, phone, country, product_interest, message, source_page) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [full_name, organization || null, email, phone || null, country || null, product_interest || null, message, source_page || null]
      );

      res.status(201).json({ success: true, message: 'Enquiry saved successfully.', id: result.insertId });
    } catch (error: any) {
      console.error("Database save failed:", error);
      res.status(500).json({ error: 'Database save failed', details: error.message });
    }
  }
);

// Admin endpoints for Enquiries
router.get('/', requireAuth, async (req, res) => {
  try {
    const [rows]: any = await pool.execute('SELECT * FROM enquiries ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const [rows]: any = await pool.execute('SELECT * FROM enquiries WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Enquiry not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id/status', requireAuth, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!['New', 'Contacted', 'Closed'].includes(status)) return res.status(400).json({ error: 'Invalid status' });
  try {
    await pool.execute('UPDATE enquiries SET status = ? WHERE id = ?', [status, id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.execute('DELETE FROM enquiries WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
