import express from "express";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from '../server/routes/auth';
import productRoutes from '../server/routes/products';
import blogRoutes from '../server/routes/blogs';
import dashboardRoutes from '../server/routes/dashboard';

dotenv.config();

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/dashboard', dashboardRoutes);

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
