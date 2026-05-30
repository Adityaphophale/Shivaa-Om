import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import apiApp from "./api/index";

async function startServer() {
  // Use the exported Express app from api/index.ts
  const app = apiApp;
  const PORT = parseInt(process.env.PORT as string, 10) || 3001;

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
