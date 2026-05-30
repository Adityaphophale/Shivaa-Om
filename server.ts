import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './server/routes/auth';
import enquiryRoutes from './server/routes/enquiries';
import productRoutes from './server/routes/products';
import blogRoutes from './server/routes/blogs';
import dashboardRoutes from './server/routes/dashboard';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3001;

  app.use(express.json({ limit: '50mb' }));
  app.use(cookieParser());

  // API routes
  app.use('/api/auth', authRoutes);
  app.use('/api/enquiries', enquiryRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/blogs', blogRoutes);
  app.use('/api/dashboard', dashboardRoutes);

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", company: "Shivaa Om Globe Trade Pvt. Ltd." });
  });

  // Example API for inquiries summary (only for server-side demo if needed)
  app.get("/api/stats", (req, res) => {
    res.json({
      activeMarkets: ["India", "Africa", "China"],
      productCategories: 5,
      responseRate: "99%"
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // In Express v4, use app.get('*', ...)
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
