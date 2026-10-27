import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    price: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    parentCollection: {
      type: String,
      enum: ["Streetwear", "Sportswear", "Accessories", "Special Orders", "Other"],
      default: "Streetwear",
    },
    description: {
      type: String,
      default: "",
    },
    images: {
      type: [String],
      default: [],
    },
    badge: {
      type: String,
      default: "",
    },
    sizes: {
      type: [String],
      default: ["XS", "S", "M", "L", "XL", "XXL"],
    },
    status: {
      type: String,
      enum: ["published", "draft", "hidden"],
      default: "published",
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    stockStatus: {
      type: String,
      enum: ["in_stock", "low_stock", "out_of_stock", "pre_order"],
      default: "in_stock",
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
