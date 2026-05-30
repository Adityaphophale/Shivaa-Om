import { Router } from 'express';
import pool from '../db';
import { requireAuth } from '../middleware/auth';

const router = Router();

function generateSlug(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

router.get('/', async (req, res) => {
  try {
    // Ensure table exists to prevent crashes
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        content LONGTEXT,
        featured_image LONGTEXT,
        meta_title VARCHAR(255),
        meta_description TEXT,
        status ENUM('Draft', 'Published') DEFAULT 'Draft',
        publish_date DATE,
        author VARCHAR(100),
        category VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Auto-seed static blogs if database is empty
    const [countRows]: any = await pool.execute('SELECT COUNT(*) as count FROM blog_posts');
    if (countRows[0].count === 0) {
      const { POSTS } = await import('../../lib/content');
      for (const b of POSTS) {
        const postSlug = b.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        const publishDate = new Date(b.date).toISOString().split('T')[0];
        await pool.execute(
          `INSERT IGNORE INTO blog_posts (id, title, slug, content, meta_description, status, publish_date, author, category) VALUES (?, ?, ?, ?, ?, 'Published', ?, ?, ?)`,
          [b.id, b.title, postSlug, b.excerpt, b.excerpt, publishDate, b.author, b.category]
        );
      }
    }

    const { publishedOnly } = req.query;
    let query = 'SELECT * FROM blog_posts ORDER BY publish_date DESC, created_at DESC';
    let params: any[] = [];
    if (publishedOnly === 'true') {
      query = 'SELECT * FROM blog_posts WHERE status = ? ORDER BY publish_date DESC, created_at DESC';
      params = ['Published'];
    }
    const [rows]: any = await pool.execute(query, params);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const [rows]: any = await pool.execute('SELECT * FROM blog_posts WHERE slug = ?', [req.params.slug]);
    if (rows.length === 0) return res.status(404).json({ error: 'Blog post not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', requireAuth, async (req, res) => {
  try {
    const { title, content, featured_image, meta_title, meta_description, status, publish_date, author, category } = req.body;
    let slug = generateSlug(title);
    
    const [existing]: any = await pool.execute('SELECT id FROM blog_posts WHERE slug = ?', [slug]);
    if (existing.length > 0) {
      slug = `${slug}-${Date.now()}`;
    }

    const [result]: any = await pool.execute(
      `INSERT INTO blog_posts (title, slug, content, featured_image, meta_title, meta_description, status, publish_date, author, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, slug, content || '', featured_image || '', meta_title || '', meta_description || '', status || 'Draft', publish_date || new Date().toISOString().split('T')[0], author || '', category || '']
    );
    res.status(201).json({ success: true, id: result.insertId, slug });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', requireAuth, async (req, res) => {
  try {
    const { title, content, featured_image, meta_title, meta_description, status, publish_date, author, category } = req.body;
    let slug = generateSlug(title);
    
    const [existing]: any = await pool.execute('SELECT id FROM blog_posts WHERE slug = ? AND id != ?', [slug, req.params.id]);
    if (existing.length > 0) {
      slug = `${slug}-${Date.now()}`;
    }

    await pool.execute(
      `UPDATE blog_posts SET title=?, slug=?, content=?, featured_image=?, meta_title=?, meta_description=?, status=?, publish_date=?, author=?, category=? WHERE id=?`,
      [title, slug, content || '', featured_image || '', meta_title || '', meta_description || '', status || 'Draft', publish_date || new Date().toISOString().split('T')[0], author || '', category || '', req.params.id]
    );
    res.json({ success: true, slug });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await pool.execute('DELETE FROM blog_posts WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;