import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import mongoose from "mongoose";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const MONGODB_URI = process.env.MONGODB_URI;

function extractArray(content, varName) {
  const start = content.indexOf(`const ${varName} = [`);
  if (start === -1) return [];
  let depth = 0;
  for (let i = start; i < content.length; i++) {
    if (content[i] === "[") depth++;
    else if (content[i] === "]") {
      depth--;
      if (depth === 0) {
        const slice = content.slice(start + `const ${varName} = `.length, i + 1);
        return eval(slice);
      }
    }
  }
  return [];
}

const frontendPagesDir = path.join(__dirname, "..", "..", "frontend", "src", "pages");

// 1. The 13 Real Categories from Streetwear & Uniforms
const realCategories = [
  // Streetwear
  {
    title: "Hoodies",
    name: "Hoodies",
    slug: "hoodies",
    parentType: "Streetwear",
    description: "Warm, bold, and made to stand out. Heavyweight cotton and oversized silhouettes.",
    image: "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105223/rebelwear/streetwear-images/h12.jpg",
    coverImage: "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105223/rebelwear/streetwear-images/h12.jpg",
    link: "/hoodies",
    badge: "Popular",
    status: "published",
    isPublished: true,
    displayOrder: 1,
  },
  {
    title: "T-Shirts",
    name: "T-Shirts",
    slug: "tshirts",
    parentType: "Streetwear",
    description: "Premium heavyweight cotton tees with high-density graphics and drop shoulders.",
    image: "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105266/rebelwear/streetwear-images/sh3.jpg",
    coverImage: "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105266/rebelwear/streetwear-images/sh3.jpg",
    link: "/tshirts",
    badge: "Best Seller",
    status: "published",
    isPublished: true,
    displayOrder: 2,
  },
  {
    title: "Sweatshirts",
    name: "Sweatshirts",
    slug: "sweatshirts",
    parentType: "Streetwear",
    description: "Cozy layers with street-ready style. Crewnecks, half-zips, and plush fleece.",
    image: "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105334/rebelwear/streetwear-images/sweatshirt3.jpg",
    coverImage: "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105334/rebelwear/streetwear-images/sweatshirt3.jpg",
    link: "/sweatshirts",
    badge: "",
    status: "published",
    isPublished: true,
    displayOrder: 3,
  },
  {
    title: "Tracksuits",
    name: "Tracksuits",
    slug: "tracksuits",
    parentType: "Streetwear",
    description: "Built for motion. Born for rebels. Tailored jogger sets and track jackets.",
    image: "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105228/rebelwear/streetwear-images/hoodiecol.jpg",
    coverImage: "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105228/rebelwear/streetwear-images/hoodiecol.jpg",
    link: "/tracksuits",
    badge: "",
    status: "published",
    isPublished: true,
    displayOrder: 4,
  },
  {
    title: "Jackets",
    name: "Jackets",
    slug: "jackets",
    parentType: "Streetwear",
    description: "Street-ready outerwear with attitude. Puffer jackets, biker outerwear, and windbreakers.",
    image: "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105229/rebelwear/streetwear-images/jacket2.avif",
    coverImage: "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105229/rebelwear/streetwear-images/jacket2.avif",
    link: "/jackets",
    badge: "Hot",
    status: "published",
    isPublished: true,
    displayOrder: 5,
  },
  {
    title: "Accessories",
    name: "Accessories",
    slug: "accessories",
    parentType: "Streetwear",
    description: "Complete your rebellious aesthetic with custom beanies, caps, and urban essentials.",
    image: "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105170/rebelwear/streetwear-images/accessories.jpg",
    coverImage: "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105170/rebelwear/streetwear-images/accessories.jpg",
    link: "/accessories",
    badge: "",
    status: "published",
    isPublished: true,
    displayOrder: 6,
  },
  // Sportswear / Uniforms
  {
    title: "Basketball Uniforms",
    name: "Basketball Uniforms",
    slug: "basketball-uniforms",
    parentType: "Sportswear",
    description: "Professional basketball jerseys and shorts designed for peak performance and full court mobility.",
    image: "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105308/rebelwear/streetwear-images/sportswear-images/basketball-uniform-3.jpg",
    coverImage: "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105308/rebelwear/streetwear-images/sportswear-images/basketball-uniform-3.jpg",
    link: "/basketball-uniforms",
    badge: "Popular",
    status: "published",
    isPublished: true,
    displayOrder: 7,
  },
  {
    title: "Baseball Uniforms",
    name: "Baseball Uniforms",
    slug: "baseball-uniforms",
    parentType: "Sportswear",
    description: "Classic button-down baseball jerseys and double-knee reinforced pants with team branding.",
    image: "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105294/rebelwear/streetwear-images/sportswear-images/baseball-uniform-2.jpg",
    coverImage: "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105294/rebelwear/streetwear-images/sportswear-images/baseball-uniform-2.jpg",
    link: "/baseball-uniforms",
    badge: "Best Seller",
    status: "published",
    isPublished: true,
    displayOrder: 8,
  },
  {
    title: "American Football Uniforms",
    name: "American Football Uniforms",
    slug: "football-uniforms",
    parentType: "Sportswear",
    description: "Heavy-duty football jerseys and game pants engineered to withstand gridiron impact.",
    image: "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105274/rebelwear/streetwear-images/sportswear-images/american-football-uniform-7.jpg",
    coverImage: "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105274/rebelwear/streetwear-images/sportswear-images/american-football-uniform-7.jpg",
    link: "/football-uniforms",
    badge: "New",
    status: "published",
    isPublished: true,
    displayOrder: 9,
  },
  {
    title: "Soccer Uniforms",
    name: "Soccer Uniforms",
    slug: "soccer-uniforms",
    parentType: "Sportswear",
    description: "Aerodynamic soccer jerseys and athletic shorts built for speed, agility, and ventilation.",
    image: "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105321/rebelwear/streetwear-images/sportswear-images/soccer-jersey-8.jpg",
    coverImage: "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105321/rebelwear/streetwear-images/sportswear-images/soccer-jersey-8.jpg",
    link: "/soccer-uniforms",
    badge: "",
    status: "published",
    isPublished: true,
    displayOrder: 10,
  },
  {
    title: "Hockey Uniforms",
    name: "Hockey Uniforms",
    slug: "hockey-uniforms",
    parentType: "Sportswear",
    description: "Pro-weight hockey jerseys with reinforced elbows and breathable fighting-strap construction.",
    image: "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105169/rebelwear/sports-1.avif",
    coverImage: "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105169/rebelwear/sports-1.avif",
    link: "/hockey-uniforms",
    badge: "New",
    status: "published",
    isPublished: true,
    displayOrder: 11,
  },
  {
    title: "Boxing Uniforms & Gear",
    name: "Boxing Uniforms & Gear",
    slug: "boxing-uniforms",
    parentType: "Sportswear",
    description: "Custom satin fight robes, boxing trunks, and corner apparel tailored for championship fighters.",
    image: "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105167/rebelwear/rebelwear.jpg",
    coverImage: "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105167/rebelwear/rebelwear.jpg",
    link: "/boxing-uniforms",
    badge: "",
    status: "published",
    isPublished: true,
    displayOrder: 12,
  },
  {
    title: "Uniform Accessories",
    name: "Uniform Accessories",
    slug: "uniform-accessories",
    parentType: "Sportswear",
    description: "Complete your team setup with sports beanies, compression sleeves, socks, and duffels.",
    image: "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105330/rebelwear/streetwear-images/sportswear-images/sport-accessory.webp",
    coverImage: "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105330/rebelwear/streetwear-images/sportswear-images/sport-accessory.webp",
    link: "/uniform-accessories",
    badge: "",
    status: "published",
    isPublished: true,
    displayOrder: 13,
  },
];

// 2. Extract all 48 real products from category pages
const pageConfigs = [
  { page: "Hoodies.jsx", category: "Hoodies", parentCollection: "Streetwear" },
  { page: "Tshirts.jsx", category: "T-Shirts", parentCollection: "Streetwear" },
  { page: "Sweatshirts.jsx", category: "Sweatshirts", parentCollection: "Streetwear" },
  { page: "Tracksuits.jsx", category: "Tracksuits", parentCollection: "Streetwear" },
  { page: "Jackets.jsx", category: "Jackets", parentCollection: "Streetwear" },
  { page: "Accessories.jsx", category: "Accessories", parentCollection: "Streetwear" },
  { page: "BasketballUniforms.jsx", category: "Basketball Uniforms", parentCollection: "Sportswear" },
  { page: "BaseballUniforms.jsx", category: "Baseball Uniforms", parentCollection: "Sportswear" },
  { page: "FootballUniforms.jsx", category: "American Football Uniforms", parentCollection: "Sportswear" },
  { page: "SoccerUniforms.jsx", category: "Soccer Uniforms", parentCollection: "Sportswear" },
  { page: "HockeyUniforms.jsx", category: "Hockey Uniforms", parentCollection: "Sportswear" },
  { page: "BoxingUniforms.jsx", category: "Boxing Uniforms & Gear", parentCollection: "Sportswear" },
  { page: "UniformAccessories.jsx", category: "Uniform Accessories", parentCollection: "Sportswear" },
];

const allProducts = [];
const slugCounts = {};

pageConfigs.forEach((cfg) => {
  const filePath = path.join(frontendPagesDir, cfg.page);
  const content = fs.readFileSync(filePath, "utf8");
  const prods = extractArray(content, "products");
  prods.forEach((p) => {
    let slug = p.slug || p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    if (slugCounts[slug]) {
      slugCounts[slug]++;
      slug = `${slug}-${slugCounts[slug]}`;
    } else {
      slugCounts[slug] = 1;
    }

    allProducts.push({
      title: p.title,
      name: p.title,
      slug: slug,
      price: (p.price || "29.99").toString().replace("$", ""),
      category: cfg.category,
      parentCollection: cfg.parentCollection,
      description: p.description || "",
      images: p.images || [],
      badge: p.badge || "",
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      status: "published",
      isPublished: true,
      isFeatured: Boolean(p.badge),
      stockStatus: "in_stock",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  });
});

console.log(`📦 Prepared ${realCategories.length} categories and ${allProducts.length} products.`);

// 3. Write to local JSON files for offline fallback & serverless stability
const dataDir = path.join(__dirname, "..", "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

fs.writeFileSync(
  path.join(dataDir, "categories.json"),
  JSON.stringify(
    realCategories.map((c, i) => ({
      _id: `cat_${i + 1}`,
      ...c,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })),
    null,
    2
  )
);
console.log("✅ backend/data/categories.json updated.");

fs.writeFileSync(
  path.join(dataDir, "products.json"),
  JSON.stringify(
    allProducts.map((p, i) => ({
      _id: `prod_${i + 1}`,
      ...p,
    })),
    null,
    2
  )
);
console.log("✅ backend/data/products.json updated.");

// 4. Seed MongoDB Atlas database
async function seedMongoDB() {
  if (!MONGODB_URI) {
    console.warn("⚠️ No MONGODB_URI in .env, skipping Atlas seed.");
    return;
  }

  try {
    console.log("🔌 Connecting to MongoDB Atlas...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB Atlas.");

    const db = mongoose.connection.db;

    // Remove legacy unrelated categories
    await db.collection("categories").deleteMany({});
    console.log("🧹 Cleared old categories collection.");

    // Insert all 13 REBELWEAR categories
    const catInsertResult = await db.collection("categories").insertMany(realCategories);
    console.log(`✅ Inserted ${catInsertResult.insertedCount} categories into MongoDB.`);

    // Remove old products collection
    await db.collection("products").deleteMany({});
    console.log("🧹 Cleared old products collection.");

    // Insert all 48 REBELWEAR products
    const prodInsertResult = await db.collection("products").insertMany(allProducts);
    console.log(`✅ Inserted ${prodInsertResult.insertedCount} products into MongoDB.`);

    await mongoose.disconnect();
    console.log("🎉 MongoDB Atlas seed completed successfully!");
  } catch (err) {
    console.error("❌ MongoDB seed error:", err.message);
  }
}

seedMongoDB();

