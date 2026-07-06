import express from "express";
import dotenv from 'dotenv';
import productRoutes from '../server/routes/products';
import blogRoutes from '../server/routes/blogs';

dotenv.config();

const app = express();

app.use(express.json({ limit: '50mb' }));

// API routes
app.use('/api/products', productRoutes);
app.use('/api/blogs', blogRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", company: "Shivaa Om Globe Trade Pvt. Ltd." });
});

app.get("/api/stats", (req, res) => {
  res.json({
    activeMarkets: ["India", "Africa", "China"],
    productCategories: 5,
    responseRate: "99%"
  });
});

export default app;
