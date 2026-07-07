import { Router } from 'express';
import { PRODUCTS } from '../../lib/content';

const router = Router();

// Map PRODUCTS to match the schema previously returned from the database
const mappedProducts = PRODUCTS.map(p => ({
  id: p.id,
  name: p.name,
  slug: p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
  description: p.desc,
  category: p.category,
  image: p.image || '',
  status: 'Active',
  origin: p.origin,
  route: p.route
}));

// Get all products (public only)
router.get('/', (req, res) => {
  try {
    const { activeOnly } = req.query;
    if (activeOnly === 'true') {
      const activeProducts = mappedProducts.filter(p => p.status === 'Active');
      return res.json(activeProducts);
    }
    res.json(mappedProducts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get product by slug
router.get('/:slug', (req, res) => {
  try {
    const product = mappedProducts.find(p => p.slug === req.params.slug);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
