import pool from '../db';

async function migrate() {
  try {
    console.log('Starting CMS migration...');

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
    console.log('Created products table.');

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
    console.log('Created blog_posts table.');

    // Alter enquiries table if possible
    try {
      await pool.execute(`ALTER TABLE enquiries MODIFY status ENUM('New', 'Contacted', 'Closed') DEFAULT 'New'`);
      console.log('Altered enquiries table status enum.');
    } catch (e: any) {
      console.log('Enquiries table alter failed or already altered:', e.message);
    }

    console.log('Migration complete.');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    process.exit();
  }
}

migrate();