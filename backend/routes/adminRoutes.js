import express from "express";
import crypto from "crypto";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import {
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getDashboardStats,
} from "../services/storageService.js";
import { getDbStatus } from "../config/db.js";

const router = express.Router();

// Memory multer storage for immediate Cloudinary stream/upload
const uploadMemory = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

// Admin Authentication Middleware
const getAdminPassword = () => process.env.ADMIN_PASSWORD || "rebelwear2026!";

// Simple token generator based on current secret
const createAdminToken = () => {
  const secret = getAdminPassword();
  const timestamp = Date.now();
  const hash = crypto
    .createHmac("sha256", secret)
    .update(`admin-session-${timestamp}`)
    .digest("hex");
  return `RW_AUTH_${timestamp}_${hash}`;
};

const verifyAdminToken = (token) => {
  if (!token || !token.startsWith("RW_AUTH_")) return false;
  const parts = token.split("_");
  if (parts.length !== 4) return false;
  const timestamp = parseInt(parts[2], 10);
  const hash = parts[3];
  // 7 days token validity
  if (isNaN(timestamp) || Date.now() - timestamp > 7 * 24 * 60 * 60 * 1000) {
    return false;
  }
  const expectedHash = crypto
    .createHmac("sha256", getAdminPassword())
    .update(`admin-session-${timestamp}`)
    .digest("hex");
  return hash === expectedHash;
};

export const adminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Admin authorization required. Please log in.",
    });
  }

  const token = authHeader.split(" ")[1];
  if (!verifyAdminToken(token)) {
    return res.status(401).json({
      success: false,
      message: "Session expired or invalid token. Please log in again.",
    });
  }

  next();
};

// ---------------- AUTH ROUTES ---------------- //

router.post("/login", (req, res) => {
  const { password } = req.body;
  const configuredPassword = getAdminPassword();

  if (!password || password !== configuredPassword) {
    return res.status(401).json({
      success: false,
      message: "Invalid admin password. Please try again.",
    });
  }

  const token = createAdminToken();
  res.json({
    success: true,
    message: "Admin login successful",
    token,
  });
});

router.get("/verify", adminAuth, (req, res) => {
  res.json({
    success: true,
    message: "Admin session is valid",
    dbStatus: getDbStatus(),
  });
});

// ---------------- DASHBOARD & DB STATS ---------------- //

router.get("/stats", adminAuth, async (req, res) => {
  try {
    const stats = await getDashboardStats();
    res.json({ success: true, stats });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/db-status", adminAuth, (req, res) => {
  res.json({
    success: true,
    dbStatus: getDbStatus(),
  });
});

// ---------------- ORDERS ---------------- //

router.get("/orders", adminAuth, async (req, res) => {
  try {
    const { status, search } = req.query;
    const orders = await getAllOrders({ status, search });
    res.json({ success: true, orders, count: orders.length });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.patch("/orders/:id", adminAuth, async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    const updated = await updateOrderStatus(req.params.id, {
      status,
      adminNotes,
    });
    if (!updated) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    res.json({
      success: true,
      message: "Order updated successfully",
      order: updated,
    });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete("/orders/:id", adminAuth, async (req, res) => {
  try {
    const deleted = await deleteOrder(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    res.json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ---------------- PRODUCTS ---------------- //

router.get("/products", adminAuth, async (req, res) => {
  try {
    const { category, status, search } = req.query;
    const products = await getAllProducts({
      category,
      status,
      search,
      includeUnpublished: true,
    });
    res.json({ success: true, products, count: products.length });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/products", adminAuth, async (req, res) => {
  try {
    const {
      title,
      price,
      category,
      parentCollection,
      description,
      images,
      badge,
      sizes,
      status,
      isFeatured,
      stockStatus,
    } = req.body;

    if (!title || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "Title, Price, and Category are required",
      });
    }

    const newProduct = await createProduct({
      title,
      price,
      category,
      parentCollection: parentCollection || "Streetwear",
      description: description || "",
      images: images || [],
      badge: badge || "",
      sizes: sizes || ["XS", "S", "M", "L", "XL", "XXL"],
      status: status || "published",
      isFeatured: Boolean(isFeatured),
      stockStatus: stockStatus || "in_stock",
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put("/products/:id", adminAuth, async (req, res) => {
  try {
    const updated = await updateProduct(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.json({
      success: true,
      message: "Product updated successfully",
      product: updated,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Control Posting Status (Publish / Draft / Hidden)
router.patch("/products/:id/status", adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    if (!["published", "draft", "hidden"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Allowed values: published, draft, hidden",
      });
    }

    const updated = await updateProduct(req.params.id, { status });
    if (!updated) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.json({
      success: true,
      message: `Product status updated to ${status}`,
      product: updated,
    });
  } catch (error) {
    console.error("Error updating product posting status:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete("/products/:id", adminAuth, async (req, res) => {
  try {
    const deleted = await deleteProduct(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ---------------- CATEGORIES ---------------- //

router.get("/categories", adminAuth, async (req, res) => {
  try {
    const categories = await getAllCategories({ includeUnpublished: true });
    res.json({ success: true, categories, count: categories.length });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/categories", adminAuth, async (req, res) => {
  try {
    const { title, slug, parentType, description, image, link, badge, status } =
      req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Category Title is required",
      });
    }

    const newCategory = await createCategory({
      title,
      slug,
      parentType: parentType || "Streetwear",
      description: description || "",
      image: image || "",
      link: link || "",
      badge: badge || "",
      status: status || "published",
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put("/categories/:id", adminAuth, async (req, res) => {
  try {
    const updated = await updateCategory(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    res.json({
      success: true,
      message: "Category updated successfully",
      category: updated,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Control Category Posting Status
router.patch("/categories/:id/status", adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    if (!["published", "draft", "hidden"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Allowed values: published, draft, hidden",
      });
    }

    const updated = await updateCategory(req.params.id, { status });
    if (!updated) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    res.json({
      success: true,
      message: `Category status updated to ${status}`,
      category: updated,
    });
  } catch (error) {
    console.error("Error updating category posting status:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete("/categories/:id", adminAuth, async (req, res) => {
  try {
    const deleted = await deleteCategory(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    res.json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ---------------- CLOUDINARY DIRECT IMAGE UPLOAD ---------------- //

router.post(
  "/upload",
  adminAuth,
  uploadMemory.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No image file provided for upload",
        });
      }

      // Convert buffer to base64 data URI
      const base64Data = req.file.buffer.toString("base64");
      const dataUri = `data:${req.file.mimetype};base64,${base64Data}`;

      const uploadResult = await cloudinary.uploader.upload(dataUri, {
        folder: "rebelwear/products",
        resource_type: "image",
      });

      res.json({
        success: true,
        message: "Image uploaded successfully to Cloudinary",
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        width: uploadResult.width,
        height: uploadResult.height,
        format: uploadResult.format,
      });
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      res.status(500).json({
        success: false,
        message: `Image upload failed: ${error.message}`,
      });
    }
  }
);

export default router;
