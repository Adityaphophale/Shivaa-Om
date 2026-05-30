import { Router } from 'express';
import pool from '../db';
import { requireAuth } from '../middleware/auth';

const router = Router();

async function getSafeCount(tableName: string) {
  try {
    const [result]: any = await pool.execute(`SELECT COUNT(*) as total FROM ${tableName}`);
    return result[0].total;
  } catch (err: any) {
    return 0; // Return 0 if the table doesn't exist yet
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
        message TEXT NOT NULL,
        status ENUM('New', 'Contacted', 'Closed') DEFAULT 'New',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
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

    const totalInquiries = await getSafeCount('enquiries');
    const totalProducts = await getSafeCount('products');
    const totalBlogs = await getSafeCount('blog_posts');
    const recentEnquiries = await getSafeRecentEnquiries();

    res.json({
      totalInquiries,
      totalProducts,
      totalBlogs,
      recentEnquiries
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;