import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Category from "../models/Category.js";
import { getDbStatus } from "../config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, "..", "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const ordersFile = path.join(dataDir, "orders.json");
const productsFile = path.join(dataDir, "products.json");
const categoriesFile = path.join(dataDir, "categories.json");

// Helper to read JSON
const readJson = (file, defaultData = []) => {
  try {
    if (!fs.existsSync(file)) {
      fs.writeFileSync(file, JSON.stringify(defaultData, null, 2));
      return defaultData;
    }
    const content = fs.readFileSync(file, "utf8");
    return JSON.parse(content || "[]");
  } catch (err) {
    console.error(`Error reading ${file}:`, err);
    return defaultData;
  }
};

// Helper to write JSON
const writeJson = (file, data) => {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(`Error writing ${file}:`, err);
  }
};

// Seed initial default categories if empty
const defaultCategories = [
  {
    title: "Hoodies",
    slug: "hoodies",
    parentType: "Streetwear",
    description: "Warm, bold, and made to stand out.",
    image: "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105223/rebelwear/streetwear-images/h12.jpg",
    link: "/hoodies",
    status: "published",
    displayOrder: 1,
  },
  {
    title: "T-Shirts",
    slug: "tshirts",
    parentType: "Streetwear",
    description: "Premium cotton tees with bold graphics.",
    image: "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105266/rebelwear/streetwear-images/sh3.jpg",
    link: "/tshirts",
    status: "published",
    displayOrder: 2,
  },
  {
    title: "Sweatshirts",
    slug: "sweatshirts",
    parentType: "Streetwear",
    description: "Cozy layers with street-ready style.",
    image: "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105334/rebelwear/streetwear-images/sweatshirt3.jpg",
    link: "/sweatshirts",
    status: "published",
    displayOrder: 3,
  },
  {
    title: "Tracksuits",
    slug: "tracksuits",
    parentType: "Streetwear",
    description: "Built for motion. Born for rebels.",
    image: "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105228/rebelwear/streetwear-images/hoodiecol.jpg",
    link: "/tracksuits",
    status: "published",
    displayOrder: 4,
  },
  {
    title: "Jackets",
    slug: "jackets",
    parentType: "Streetwear",
    description: "Street-ready outerwear with attitude.",
    image: "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105229/rebelwear/streetwear-images/jacket2.avif",
    link: "/jackets",
    status: "published",
    displayOrder: 5,
  },
  {
    title: "Accessories",
    slug: "accessories",
    parentType: "Streetwear",
    description: "Complete your look with our accessories.",
    image: "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105170/rebelwear/streetwear-images/accessories.jpg",
    link: "/accessories",
    status: "published",
    displayOrder: 6,
  },
  {
    title: "Basketball Uniforms",
    slug: "basketball-uniforms",
    parentType: "Sportswear",
    description: "Professional basketball jerseys and shorts designed for peak performance.",
    image: "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105308/rebelwear/streetwear-images/sportswear-images/basketball-uniform-3.jpg",
    link: "/basketball-uniforms",
    badge: "Popular",
    status: "published",
    displayOrder: 7,
  },
  {
    title: "Baseball Uniforms",
    slug: "baseball-uniforms",
    parentType: "Sportswear",
    description: "Classic baseball jerseys and pants with custom team branding.",
    image: "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105294/rebelwear/streetwear-images/sportswear-images/baseball-uniform-2.jpg",
    link: "/baseball-uniforms",
    badge: "Best Seller",
    status: "published",
    displayOrder: 8,
  },
  {
    title: "American Football Uniforms",
    slug: "football-uniforms",
    parentType: "Sportswear",
    description: "Durable football jerseys designed to withstand the toughest gridiron action.",
    image: "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105274/rebelwear/streetwear-images/sportswear-images/american-football-uniform-7.jpg",
    link: "/football-uniforms",
    badge: "New",
    status: "published",
    displayOrder: 9,
  },
  {
    title: "Soccer Uniforms",
    slug: "soccer-uniforms",
    parentType: "Sportswear",
    description: "Lightweight soccer jerseys and shorts built for speed and agility.",
    image: "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105321/rebelwear/streetwear-images/sportswear-images/soccer-jersey-8.jpg",
    link: "/soccer-uniforms",
    status: "published",
    displayOrder: 10,
  },
  {
    title: "Uniform Accessories",
    slug: "uniform-accessories",
    parentType: "Sportswear",
    description: "Complete your team's look with professional sports accessories.",
    image: "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105330/rebelwear/streetwear-images/sportswear-images/sport-accessory.webp",
    link: "/uniform-accessories",
    status: "published",
    displayOrder: 11,
  },
  {
    title: "Boxing Uniforms",
    slug: "boxing-uniforms",
    parentType: "Sportswear",
    description: "Professional boxing shorts and robes.",
    image: "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105167/rebelwear/rebelwear.jpg",
    link: "/boxing-uniforms",
    status: "published",
    displayOrder: 12,
  },
];

// Seed initial default products
const defaultProducts = [
  {
    title: "Classic Hoodie",
    slug: "classic-hoodie",
    price: "34.99",
    category: "Hoodies",
    parentCollection: "Streetwear",
    description: "Timeless style with premium comfort. Clean design, everyday comfort.",
    images: [
      "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105192/rebelwear/streetwear-images/classichoodie1.jpg",
      "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105193/rebelwear/streetwear-images/classichoodie2.jpg",
      "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105194/rebelwear/streetwear-images/classichoodie3.jpg",
    ],
    badge: "Popular",
    sizes: ["S", "M", "L", "XL", "XXL"],
    status: "published",
    isFeatured: true,
  },
  {
    title: "Oversize Hoodie",
    slug: "oversize-hoodie",
    price: "29.99",
    category: "Hoodies",
    parentCollection: "Streetwear",
    description: "Relaxed fit for ultimate comfort. Street-ready silhouette.",
    images: [
      "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105231/rebelwear/streetwear-images/oversizehoodie1.jpg",
      "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105233/rebelwear/streetwear-images/oversizehoodie2.jpg",
    ],
    badge: "Hot",
    sizes: ["S", "M", "L", "XL"],
    status: "published",
    isFeatured: true,
  },
  {
    title: "Rebel Hoodie",
    slug: "rebel-hoodie",
    price: "29.99",
    category: "Hoodies",
    parentCollection: "Streetwear",
    description: "Warm, bold, and made to stand out. Premium cotton blend with custom graphics.",
    images: [
      "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105222/rebelwear/streetwear-images/h11.jpg",
      "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105223/rebelwear/streetwear-images/h12.jpg",
    ],
    badge: "New",
    sizes: ["S", "M", "L", "XL", "XXL"],
    status: "published",
    isFeatured: true,
  },
  {
    title: "Custom Team Uniforms",
    slug: "custom-team-uniforms",
    price: "65.00",
    category: "Basketball Uniforms",
    parentCollection: "Sportswear",
    description: "Professional team uniforms with custom designs. Built for performance and durability.",
    images: [
      "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105308/rebelwear/streetwear-images/sportswear-images/basketball-uniform-3.jpg",
    ],
    badge: "Popular",
    sizes: ["S", "M", "L", "XL", "XXL"],
    status: "published",
    isFeatured: true,
  },
  {
    title: "Street Graphic Tee",
    slug: "street-graphic-tee",
    price: "24.99",
    category: "T-Shirts",
    parentCollection: "Streetwear",
    description: "Bold graphic tees with premium fabric quality.",
    images: [
      "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105265/rebelwear/streetwear-images/sh1.jpg",
      "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105266/rebelwear/streetwear-images/sh3.jpg",
    ],
    badge: "New",
    sizes: ["S", "M", "L", "XL"],
    status: "published",
    isFeatured: true,
  },
];

// Initialize local json stores if needed
if (!fs.existsSync(categoriesFile)) {
  writeJson(
    categoriesFile,
    defaultCategories.map((c, i) => ({
      _id: "cat_" + (i + 1),
      ...c,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }))
  );
}

if (!fs.existsSync(productsFile)) {
  writeJson(
    productsFile,
    defaultProducts.map((p, i) => ({
      _id: "prod_" + (i + 1),
      ...p,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }))
  );
}

if (!fs.existsSync(ordersFile)) {
  writeJson(ordersFile, []);
}

const isMongoActive = () => {
  return mongoose.connection.readyState === 1;
};

// ---------------- ORDERS ---------------- //

export const saveOrder = async (orderData) => {
  if (isMongoActive()) {
    const order = new Order(orderData);
    return await order.save();
  } else {
    const orders = readJson(ordersFile);
    const newOrder = {
      _id: "ord_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
      orderNumber:
        "RW-" + Date.now().toString(36).toUpperCase() + "-" + Math.floor(1000 + Math.random() * 9000),
      ...orderData,
      status: orderData.status || "pending",
      adminNotes: orderData.adminNotes || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    orders.unshift(newOrder);
    writeJson(ordersFile, orders);
    return newOrder;
  }
};

export const getAllOrders = async ({ status, search } = {}) => {
  if (isMongoActive()) {
    const query = {};
    if (status && status !== "all") query.status = status;
    if (search) {
      query.$or = [
        { customerName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { productName: { $regex: search, $options: "i" } },
        { orderNumber: { $regex: search, $options: "i" } },
      ];
    }
    return await Order.find(query).sort({ createdAt: -1 });
  } else {
    let orders = readJson(ordersFile);
    if (status && status !== "all") {
      orders = orders.filter((o) => o.status === status);
    }
    if (search) {
      const q = search.toLowerCase();
      orders = orders.filter(
        (o) =>
          (o.customerName && o.customerName.toLowerCase().includes(q)) ||
          (o.email && o.email.toLowerCase().includes(q)) ||
          (o.phone && o.phone.toLowerCase().includes(q)) ||
          (o.productName && o.productName.toLowerCase().includes(q)) ||
          (o.orderNumber && o.orderNumber.toLowerCase().includes(q))
      );
    }
    return orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
};

export const updateOrderStatus = async (id, { status, adminNotes }) => {
  if (isMongoActive()) {
    const update = {};
    if (status) update.status = status;
    if (adminNotes !== undefined) update.adminNotes = adminNotes;
    return await Order.findByIdAndUpdate(id, update, { new: true });
  } else {
    const orders = readJson(ordersFile);
    const index = orders.findIndex((o) => o._id === id || o.id === id);
    if (index === -1) return null;
    if (status) orders[index].status = status;
    if (adminNotes !== undefined) orders[index].adminNotes = adminNotes;
    orders[index].updatedAt = new Date().toISOString();
    writeJson(ordersFile, orders);
    return orders[index];
  }
};

export const deleteOrder = async (id) => {
  if (isMongoActive()) {
    return await Order.findByIdAndDelete(id);
  } else {
    let orders = readJson(ordersFile);
    const initialLen = orders.length;
    orders = orders.filter((o) => o._id !== id && o.id !== id);
    writeJson(ordersFile, orders);
    return orders.length < initialLen;
  }
};

// ---------------- PRODUCTS ---------------- //

export const getAllProducts = async ({ category, status, search, includeUnpublished = true } = {}) => {
  if (isMongoActive()) {
    const query = {};
    if (!includeUnpublished) {
      query.status = "published";
    } else if (status && status !== "all") {
      query.status = status;
    }
    if (category && category !== "all") query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }
    return await Product.find(query).sort({ createdAt: -1 });
  } else {
    let products = readJson(productsFile);
    if (!includeUnpublished) {
      products = products.filter((p) => p.status === "published");
    } else if (status && status !== "all") {
      products = products.filter((p) => p.status === status);
    }
    if (category && category !== "all") {
      products = products.filter(
        (p) => p.category?.toLowerCase() === category.toLowerCase()
      );
    }
    if (search) {
      const q = search.toLowerCase();
      products = products.filter(
        (p) =>
          (p.title && p.title.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q)) ||
          (p.category && p.category.toLowerCase().includes(q))
      );
    }
    return products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
};

export const createProduct = async (data) => {
  const slug =
    data.slug ||
    data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  if (isMongoActive()) {
    const product = new Product({ ...data, slug });
    return await product.save();
  } else {
    const products = readJson(productsFile);
    const newProduct = {
      _id: "prod_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
      ...data,
      slug,
      status: data.status || "published",
      isFeatured: Boolean(data.isFeatured),
      images: Array.isArray(data.images) ? data.images : (data.images ? [data.images] : []),
      sizes: data.sizes || ["XS", "S", "M", "L", "XL", "XXL"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    products.unshift(newProduct);
    writeJson(productsFile, products);
    return newProduct;
  }
};

export const updateProduct = async (id, data) => {
  if (isMongoActive()) {
    return await Product.findByIdAndUpdate(id, data, { new: true });
  } else {
    const products = readJson(productsFile);
    const index = products.findIndex((p) => p._id === id || p.id === id);
    if (index === -1) return null;
    products[index] = {
      ...products[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    writeJson(productsFile, products);
    return products[index];
  }
};

export const deleteProduct = async (id) => {
  if (isMongoActive()) {
    return await Product.findByIdAndDelete(id);
  } else {
    let products = readJson(productsFile);
    const initialLen = products.length;
    products = products.filter((p) => p._id !== id && p.id !== id);
    writeJson(productsFile, products);
    return products.length < initialLen;
  }
};

// ---------------- CATEGORIES ---------------- //

export const getAllCategories = async ({ includeUnpublished = true } = {}) => {
  if (isMongoActive()) {
    const query = includeUnpublished ? {} : { status: "published" };
    return await Category.find(query).sort({ displayOrder: 1, createdAt: 1 });
  } else {
    let categories = readJson(categoriesFile);
    if (!includeUnpublished) {
      categories = categories.filter((c) => c.status === "published");
    }
    return categories.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  }
};

export const createCategory = async (data) => {
  const slug =
    data.slug ||
    data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  if (isMongoActive()) {
    const category = new Category({ ...data, slug });
    return await category.save();
  } else {
    const categories = readJson(categoriesFile);
    const newCategory = {
      _id: "cat_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
      ...data,
      slug,
      status: data.status || "published",
      link: data.link || `/${slug}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    categories.push(newCategory);
    writeJson(categoriesFile, categories);
    return newCategory;
  }
};

export const updateCategory = async (id, data) => {
  if (isMongoActive()) {
    return await Category.findByIdAndUpdate(id, data, { new: true });
  } else {
    const categories = readJson(categoriesFile);
    const index = categories.findIndex((c) => c._id === id || c.id === id);
    if (index === -1) return null;
    categories[index] = {
      ...categories[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    writeJson(categoriesFile, categories);
    return categories[index];
  }
};

export const deleteCategory = async (id) => {
  if (isMongoActive()) {
    return await Category.findByIdAndDelete(id);
  } else {
    let categories = readJson(categoriesFile);
    const initialLen = categories.length;
    categories = categories.filter((c) => c._id !== id && c.id !== id);
    writeJson(categoriesFile, categories);
    return categories.length < initialLen;
  }
};

// ---------------- DASHBOARD STATS ---------------- //

export const getDashboardStats = async () => {
  const orders = await getAllOrders();
  const products = await getAllProducts({ includeUnpublished: true });
  const categories = await getAllCategories({ includeUnpublished: true });

  const totalRevenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + (parseFloat(o.totalPrice) || 0), 0);

  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const processingOrders = orders.filter((o) => o.status === "processing").length;
  const deliveredOrders = orders.filter((o) => o.status === "delivered").length;
  const publishedProducts = products.filter((p) => p.status === "published").length;
  const draftProducts = products.filter((p) => p.status === "draft").length;

  return {
    ordersCount: orders.length,
    pendingOrders,
    processingOrders,
    deliveredOrders,
    totalRevenue: totalRevenue.toFixed(2),
    productsCount: products.length,
    publishedProducts,
    draftProducts,
    categoriesCount: categories.length,
    dbStatus: getDbStatus(),
  };
};
