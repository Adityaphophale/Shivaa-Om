import { Router } from 'express';
import pool from '../db';

const router = Router();

// Get all products (public only)
router.get('/', async (req, res) => {
  try {
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        category VARCHAR(100),
        image LONGTEXT,
        status ENUM('Active', 'Inactive') DEFAULT 'Active',
        origin VARCHAR(100),
        route VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    const [countRows]: any = await pool.execute('SELECT COUNT(*) as count FROM products');
    if (countRows[0].count === 0) {
      const { PRODUCTS } = await import('../../lib/content');
      for (const p of PRODUCTS) {
        const productSlug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        await pool.execute(
          `INSERT IGNORE INTO products (id, name, slug, description, category, image, status, origin, route) VALUES (?, ?, ?, ?, ?, ?, 'Active', ?, ?)`,
          [p.id, p.name, productSlug, p.desc, p.category, p.image || '', p.origin, p.route]
        );
      }
    }

    const { activeOnly } = req.query;
    let query = 'SELECT * FROM products ORDER BY created_at DESC';
    let params: any[] = [];
    if (activeOnly === 'true') {
      query = 'SELECT * FROM products WHERE status = ? ORDER BY created_at DESC';
      params = ['Active'];
    }
    const [rows]: any = await pool.execute(query, params);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get product by slug
router.get('/:slug', async (req, res) => {
  try {
    const [rows]: any = await pool.execute('SELECT * FROM products WHERE slug = ?', [req.params.slug]);
    if (rows.length === 0) return res.status(404).json({ error: 'Product not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
