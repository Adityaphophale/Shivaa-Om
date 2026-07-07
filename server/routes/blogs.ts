import { Router } from 'express';
import { POSTS } from '../../lib/content';

const router = Router();

// Map POSTS to match the schema previously returned from the database
const mappedBlogs = POSTS.map(b => {
  const postSlug = b.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  let publishDateStr = '';
  try {
    publishDateStr = new Date(b.date).toISOString().split('T')[0];
  } catch (e) {
    publishDateStr = b.date;
  }
  return {
    id: b.id,
    title: b.title,
    slug: postSlug,
    content: b.excerpt,
    featured_image: '',
    meta_title: b.title,
    meta_description: b.excerpt,
    status: 'Published',
    publish_date: publishDateStr,
    author: b.author,
    category: b.category
  };
});

// Get all blog posts
router.get('/', (req, res) => {
  try {
    const { publishedOnly } = req.query;
    let blogs = mappedBlogs;
    if (publishedOnly === 'true') {
      blogs = mappedBlogs.filter(b => b.status === 'Published');
    }
    // Sort by publish_date DESC
    const sorted = [...blogs].sort((a, b) => {
      return new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime();
    });
    res.json(sorted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get blog post by slug
router.get('/:slug', (req, res) => {
  try {
    const post = mappedBlogs.find(b => b.slug === req.params.slug);
    if (!post) return res.status(404).json({ error: 'Blog post not found' });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
