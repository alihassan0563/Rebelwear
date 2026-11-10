import express from "express";
import {
  getAllProducts,
  getAllCategories,
} from "../services/storageService.js";

const router = express.Router();

// Get published products
router.get("/products", async (req, res) => {
  try {
    const { category, search } = req.query;
    const products = await getAllProducts({
      category,
      search,
      includeUnpublished: false,
    });
    res.json({ success: true, products });
  } catch (error) {
    console.error("Error fetching public products:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single product by slug or id
router.get("/products/:slug", async (req, res) => {
  try {
    const products = await getAllProducts({ includeUnpublished: false });
    const product = products.find(
      (p) => p.slug === req.params.slug || p._id === req.params.slug
    );
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get published categories
router.get("/categories", async (req, res) => {
  try {
    const categories = await getAllCategories({ includeUnpublished: false });
    res.json({ success: true, categories });
  } catch (error) {
    console.error("Error fetching public categories:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Dynamic XML Sitemap endpoint for search engines
router.get("/sitemap.xml", async (req, res) => {
  try {
    const siteUrl = (process.env.FRONTEND_URL || "https://rebelwearstore.netlify.app").replace(/\/$/, "");
    const products = await getAllProducts({ includeUnpublished: false });
    const categories = await getAllCategories({ includeUnpublished: false });
    const today = new Date().toISOString().split("T")[0];

    const staticRoutes = [
      { path: "", priority: "1.0", changefreq: "daily" },
      { path: "/streetwear", priority: "0.9", changefreq: "weekly" },
      { path: "/uniforms", priority: "0.9", changefreq: "weekly" },
      { path: "/about", priority: "0.7", changefreq: "monthly" },
      { path: "/hoodies", priority: "0.85", changefreq: "weekly" },
      { path: "/tshirts", priority: "0.85", changefreq: "weekly" },
      { path: "/tracksuits", priority: "0.85", changefreq: "weekly" },
      { path: "/jackets", priority: "0.85", changefreq: "weekly" },
      { path: "/sweatshirts", priority: "0.85", changefreq: "weekly" },
      { path: "/accessories", priority: "0.75", changefreq: "weekly" },
      { path: "/basketball-uniforms", priority: "0.85", changefreq: "weekly" },
      { path: "/baseball-uniforms", priority: "0.85", changefreq: "weekly" },
      { path: "/football-uniforms", priority: "0.85", changefreq: "weekly" },
      { path: "/soccer-uniforms", priority: "0.85", changefreq: "weekly" },
      { path: "/hockey-uniforms", priority: "0.75", changefreq: "weekly" },
      { path: "/boxing-uniforms", priority: "0.75", changefreq: "weekly" },
      { path: "/uniform-accessories", priority: "0.70", changefreq: "weekly" },
    ];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    staticRoutes.forEach((route) => {
      xml += `  <url>\n    <loc>${siteUrl}${route.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${route.changefreq}</changefreq>\n    <priority>${route.priority}</priority>\n  </url>\n`;
    });

    categories.forEach((cat) => {
      if (cat.link && !staticRoutes.some((r) => r.path === cat.link)) {
        xml += `  <url>\n    <loc>${siteUrl}${cat.link}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.80</priority>\n  </url>\n`;
      }
    });

    products.forEach((prod) => {
      if (prod.slug) {
        const prodDate = prod.updatedAt ? new Date(prod.updatedAt).toISOString().split("T")[0] : today;
        xml += `  <url>\n    <loc>${siteUrl}/product/${encodeURIComponent(prod.slug)}</loc>\n    <lastmod>${prodDate}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.80</priority>\n  </url>\n`;
      }
    });

    xml += `</urlset>`;

    res.header("Content-Type", "application/xml");
    res.send(xml);
  } catch (error) {
    console.error("Error generating sitemap:", error);
    res.status(500).send("Error generating sitemap");
  }
});

export default router;
