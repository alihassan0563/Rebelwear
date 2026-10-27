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

export default router;
