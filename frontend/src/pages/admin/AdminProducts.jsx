import { useState, useEffect } from "react";
import {
  Package,
  Plus,
  Search,
  Filter,
  Eye,
  EyeOff,
  Edit3,
  Trash2,
  Upload,
  CheckCircle,
  AlertTriangle,
  X,
  Image as ImageIcon,
  Sparkles,
} from "lucide-react";
import { adminApi } from "../../utils/adminApi";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [notification, setNotification] = useState(null);

  // Form Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    parentCollection: "Streetwear",
    description: "",
    images: [],
    badge: "",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    status: "published",
    isFeatured: false,
    newImageUrl: "",
  });

  const showToast = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const fetchProductsAndCategories = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        adminApi.getProducts({
          category: categoryFilter,
          status: statusFilter,
          search: searchQuery,
        }),
        adminApi.getCategories(),
      ]);

      if (prodRes.success) {
        setProducts(prodRes.products || []);
      }
      if (catRes.success) {
        setCategories(catRes.categories || []);
      }
    } catch (err) {
      console.error("Error loading products:", err);
      showToast("Failed to load products", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsAndCategories();
  }, [categoryFilter, statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProductsAndCategories();
  };

  const openAddModal = () => {
    setIsEditing(false);
    setCurrentProductId(null);
    setFormData({
      title: "",
      price: "",
      category: categories[0]?.title || "Hoodies",
      parentCollection: "Streetwear",
      description: "",
      images: [],
      badge: "",
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      status: "published",
      isFeatured: false,
      newImageUrl: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setIsEditing(true);
    setCurrentProductId(product._id || product.id);
    setFormData({
      title: product.title || "",
      price: product.price || "",
      category: product.category || "",
      parentCollection: product.parentCollection || "Streetwear",
      description: product.description || "",
      images: product.images || [],
      badge: product.badge || "",
      sizes: product.sizes || ["XS", "S", "M", "L", "XL", "XXL"],
      status: product.status || "published",
      isFeatured: Boolean(product.isFeatured),
      newImageUrl: "",
    });
    setIsModalOpen(true);
  };

  // Toggle Posting status directly
  const handleToggleStatus = async (productId, currentStatus) => {
    const newStatus = currentStatus === "published" ? "draft" : "published";
    try {
      const res = await adminApi.updateProductStatus(productId, newStatus);
      if (res.success) {
        setProducts((prev) =>
          prev.map((p) =>
            p._id === productId || p.id === productId
              ? { ...p, status: newStatus }
              : p
          )
        );
        showToast(
          `Product is now ${newStatus === "published" ? "Live on Store" : "Draft (Hidden)"}`
        );
      }
    } catch (err) {
      showToast("Failed to update status", "error");
    }
  };

  // Handle Cloudinary Image Upload
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const res = await adminApi.uploadImage(file);
      if (res.success && res.url) {
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, res.url],
        }));
        showToast("Image uploaded to Cloudinary successfully!");
      } else {
        showToast(res.message || "Upload failed", "error");
      }
    } catch (err) {
      showToast("Error uploading image to Cloudinary", "error");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleAddImageUrl = () => {
    if (!formData.newImageUrl.trim()) return;
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, prev.newImageUrl.trim()],
      newImageUrl: "",
    }));
  };

  const handleRemoveImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  const handleSizeToggle = (size) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.price.trim() || !formData.category.trim()) {
      showToast("Please provide Title, Price, and Category", "error");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        title: formData.title.trim(),
        price: formData.price.trim(),
        category: formData.category.trim(),
        parentCollection: formData.parentCollection,
        description: formData.description.trim(),
        images: formData.images,
        badge: formData.badge.trim(),
        sizes: formData.sizes,
        status: formData.status,
        isFeatured: formData.isFeatured,
      };

      if (isEditing) {
        const res = await adminApi.updateProduct(currentProductId, payload);
        if (res.success) {
          setProducts((prev) =>
            prev.map((p) =>
              p._id === currentProductId || p.id === currentProductId
                ? res.product
                : p
            )
          );
          showToast("Product updated successfully");
          setIsModalOpen(false);
        }
      } else {
        const res = await adminApi.createProduct(payload);
        if (res.success) {
          setProducts((prev) => [res.product, ...prev]);
          showToast("New product created and saved successfully");
          setIsModalOpen(false);
        }
      }
    } catch (err) {
      showToast("Failed to save product", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!productToDelete) return;
    const id = productToDelete._id || productToDelete.id;
    try {
      const res = await adminApi.deleteProduct(id);
      if (res.success) {
        setProducts((prev) => prev.filter((p) => p._id !== id && p.id !== id));
        showToast("Product removed successfully");
      }
    } catch (err) {
      showToast("Failed to delete product", "error");
    } finally {
      setProductToDelete(null);
    }
  };

  const allAvailableSizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-semibold border ${
            notification.type === "error"
              ? "bg-red-950/90 border-red-500/40 text-red-200"
              : "bg-neutral-900/95 border-emerald-500/40 text-emerald-300"
          }`}
        >
          {notification.type === "error" ? (
            <AlertTriangle className="w-5 h-5 text-red-400" />
          ) : (
            <CheckCircle className="w-5 h-5 text-emerald-400" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Header and Add Button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-wide">Products & Inventory</h2>
          <p className="text-xs text-gray-400 mt-1">
            Create items, upload photos to Cloudinary, and toggle posting visibility
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#ff3d00] hover:bg-[#e63700] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-[#ff3d00]/30 hover:-translate-y-0.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#141414] border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-black/60 border border-white/10 rounded-xl text-xs py-2 px-3 text-white focus:outline-none focus:border-[#ff3d00] cursor-pointer"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.title}>
                {c.title}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-black/60 border border-white/10 rounded-xl text-xs py-2 px-3 text-white focus:outline-none focus:border-[#ff3d00] cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published (Live)</option>
            <option value="draft">Draft (Hidden)</option>
          </select>
        </div>

        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="relative min-w-[260px]">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search product title or desc..."
            className="w-full pl-10 pr-4 py-2 bg-black/50 border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff3d00]"
          />
        </form>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="py-20 text-center text-gray-400 bg-[#141414] border border-white/10 rounded-3xl">
          <div className="inline-block w-8 h-8 border-2 border-[#ff3d00] border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-xs uppercase tracking-wider font-semibold">Loading catalog...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="py-20 text-center bg-[#141414] border border-white/10 rounded-3xl">
          <Package className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white">No Products Found</h3>
          <p className="text-gray-400 text-xs mt-1">
            Click "+ Add New Product" to publish your first apparel item.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => {
            const id = product._id || product.id;
            const isLive = product.status === "published";
            const mainImage = product.images?.[0] || "";

            return (
              <div
                key={id}
                className="bg-[#141414] border border-white/10 rounded-3xl overflow-hidden shadow-xl flex flex-col group transition-all hover:-translate-y-1 hover:border-white/20"
              >
                {/* Image & Badges */}
                <div className="h-56 bg-black relative overflow-hidden">
                  {mainImage ? (
                    <img
                      src={mainImage}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl bg-white/5">
                      👕
                    </div>
                  )}

                  {/* Posting Status Pill */}
                  <div className="absolute top-3 left-3 z-10">
                    <button
                      onClick={() => handleToggleStatus(id, product.status)}
                      title="Click to toggle posting status"
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md cursor-pointer ${
                        isLive
                          ? "bg-emerald-500/90 text-white hover:bg-emerald-600"
                          : "bg-neutral-800/90 text-gray-300 hover:bg-neutral-700 border border-white/20"
                      }`}
                    >
                      {isLive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      <span>{isLive ? "Live" : "Draft"}</span>
                    </button>
                  </div>

                  {product.badge && (
                    <span className="absolute top-3 right-3 bg-[#ff3d00] text-white text-xs font-black uppercase px-2.5 py-0.5 rounded-full z-10 shadow-md">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <span className="text-xs uppercase tracking-wider font-semibold text-[#ff3d00]">
                      {product.category}
                    </span>
                    <span className="text-base font-black text-white">${product.price}</span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 line-clamp-1">
                    {product.title}
                  </h3>

                  <p className="text-xs text-gray-400 line-clamp-2 mb-4 flex-grow">
                    {product.description || "No description provided."}
                  </p>

                  {/* Sizes */}
                  {product.sizes?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {product.sizes.map((s) => (
                        <span
                          key={s}
                          className="px-1.5 py-0.5 rounded bg-white/5 text-[10px] text-gray-300 font-mono"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    <button
                      onClick={() => handleToggleStatus(id, product.status)}
                      className="text-xs font-semibold text-gray-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      {isLive ? "Unpublish" : "Publish"}
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(product)}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition-colors cursor-pointer"
                        title="Edit Product"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setProductToDelete(product)}
                        className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141414] border border-white/10 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl relative animate-scaleIn">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <span className="p-3 rounded-2xl bg-[#ff3d00]/10 text-[#ff3d00]">
                <Package className="w-6 h-6" />
              </span>
              <div>
                <h3 className="text-xl font-black uppercase tracking-wide">
                  {isEditing ? "Edit Product" : "Add New Product"}
                </h3>
                <p className="text-xs text-gray-400">
                  Configure apparel details, upload media, and manage posting status
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Title & Price */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Rebel Tactical Hoodie"
                    className="w-full p-3 bg-black/50 border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff3d00]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                    Price ($) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="e.g. 45.00"
                    className="w-full p-3 bg-black/50 border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff3d00]"
                  />
                </div>
              </div>

              {/* Category & Collection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                    Category *
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full p-3 bg-black/50 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#ff3d00]"
                    >
                      {categories.map((c) => (
                        <option key={c.slug} value={c.title}>
                          {c.title}
                        </option>
                      ))}
                      <option value="Custom">Custom / Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                    Parent Collection
                  </label>
                  <select
                    value={formData.parentCollection}
                    onChange={(e) => setFormData({ ...formData, parentCollection: e.target.value })}
                    className="w-full p-3 bg-black/50 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#ff3d00]"
                  >
                    <option value="Streetwear">Streetwear</option>
                    <option value="Sportswear">Sportswear / Uniforms</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Special Orders">Special Orders</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe fabric, cut, design details..."
                  className="w-full p-3 bg-black/50 border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff3d00]"
                />
              </div>

              {/* Image Upload & Management */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                  Product Images
                </label>

                {/* Cloudinary Upload Button */}
                <div className="flex flex-col sm:flex-row gap-3 mb-3">
                  <label className="flex-1 flex items-center justify-center gap-2 p-3 bg-white/5 hover:bg-white/10 border border-dashed border-white/20 rounded-xl cursor-pointer transition-colors text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-white">
                    <Upload className={`w-4 h-4 text-[#ff3d00] ${uploadingImage ? "animate-bounce" : ""}`} />
                    <span>{uploadingImage ? "Uploading to Cloudinary..." : "Upload from Computer"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploadingImage}
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>

                  {/* Or Image URL */}
                  <div className="flex-1 flex gap-2">
                    <input
                      type="url"
                      value={formData.newImageUrl}
                      onChange={(e) => setFormData({ ...formData, newImageUrl: e.target.value })}
                      placeholder="Or paste image URL..."
                      className="flex-grow p-3 bg-black/50 border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff3d00]"
                    />
                    <button
                      type="button"
                      onClick={handleAddImageUrl}
                      className="px-4 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold uppercase text-white transition-colors cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Image Previews */}
                {formData.images.length > 0 && (
                  <div className="flex flex-wrap gap-3 p-3 bg-black/40 border border-white/10 rounded-2xl">
                    {formData.images.map((img, idx) => (
                      <div key={idx} className="relative group w-20 h-20 rounded-xl overflow-hidden border border-white/10">
                        <img src={img} alt="Preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Sizes Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                  Available Sizes
                </label>
                <div className="flex flex-wrap gap-2">
                  {allAvailableSizes.map((sz) => {
                    const isSelected = formData.sizes.includes(sz);
                    return (
                      <button
                        type="button"
                        key={sz}
                        onClick={() => handleSizeToggle(sz)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#ff3d00] text-white shadow-md shadow-[#ff3d00]/30"
                            : "bg-black/50 border border-white/10 text-gray-400 hover:text-white"
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Badge & Posting Status & Featured */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-white/5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                    Badge (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="e.g. Popular, New, Hot"
                    className="w-full p-2.5 bg-black/50 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#ff3d00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                    Posting Status *
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full p-2.5 bg-black/50 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#ff3d00]"
                  >
                    <option value="published">Published (Live on store)</option>
                    <option value="draft">Draft (Hidden from store)</option>
                  </select>
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-300">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="w-4 h-4 rounded text-[#ff3d00] focus:ring-0 cursor-pointer"
                    />
                    <span>Feature on Homepage</span>
                  </label>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold uppercase text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 bg-[#ff3d00] hover:bg-[#e63700] rounded-xl text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-[#ff3d00]/30 transition-all cursor-pointer disabled:opacity-50"
                >
                  {submitting ? "Saving..." : isEditing ? "Save Changes" : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Product Confirmation Modal */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141414] border border-white/10 rounded-3xl max-w-md w-full p-6 text-center shadow-2xl animate-scaleIn">
            <div className="w-14 h-14 rounded-2xl bg-red-500/10 text-red-400 mx-auto mb-4 flex items-center justify-center">
              <Trash2 className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Delete Product?</h3>
            <p className="text-xs text-gray-400 mb-6">
              Are you sure you want to delete <strong className="text-white">{productToDelete.title}</strong>? This item will be removed permanently from your catalog.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setProductToDelete(null)}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold uppercase text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProduct}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-bold uppercase text-white transition-colors cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
