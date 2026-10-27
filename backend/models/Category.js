import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
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
    parentType: {
      type: String,
      enum: ["Streetwear", "Sportswear", "Accessories", "Special Orders", "Other"],
      default: "Streetwear",
    },
    description: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      default: "",
    },
    badge: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["published", "draft", "hidden"],
      default: "published",
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);
export default Category;
