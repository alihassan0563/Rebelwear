import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
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
      default: "Streetwear",
    },
    parentCategory: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    coverImage: {
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
    isPublished: {
      type: Boolean,
      default: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.title = ret.title || ret.name || "Unnamed Category";
        ret.name = ret.name || ret.title || "Unnamed Category";
        ret.image = ret.image || ret.coverImage || "";
        ret.coverImage = ret.coverImage || ret.image || "";
        ret.parentType = ret.parentType || ret.parentCategory || "Streetwear";
        return ret;
      },
    },
    toObject: {
      transform: function (doc, ret) {
        ret.title = ret.title || ret.name || "Unnamed Category";
        ret.name = ret.name || ret.title || "Unnamed Category";
        ret.image = ret.image || ret.coverImage || "";
        ret.coverImage = ret.coverImage || ret.image || "";
        ret.parentType = ret.parentType || ret.parentCategory || "Streetwear";
        return ret;
      },
    },
  }
);

categorySchema.pre("save", function (next) {
  if (!this.title && this.name) {
    this.title = this.name;
  }
  if (!this.name && this.title) {
    this.name = this.title;
  }
  if (!this.image && this.coverImage) {
    this.image = this.coverImage;
  }
  next();
});

const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);
export default Category;
