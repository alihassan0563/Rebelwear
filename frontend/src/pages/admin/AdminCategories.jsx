import { useState, useEffect } from "react";
import {
  Layers,
  Plus,
  Eye,
  EyeOff,
  Edit3,
  Trash2,
  Upload,
  CheckCircle,
  AlertTriangle,
  X,
  ExternalLink,
} from "lucide-react";
import { adminApi } from "../../utils/adminApi";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    parentType: "Streetwear",
    description: "",
    image: "",
    link: "",
    badge: "",
    status: "published",
  });

  const showToast = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getCategories();
      if (res.success) {
        setCategories(res.categories || []);
      }
    } catch (err) {
      console.error("Error loading categories:", err);
      showToast("Failed to load categories", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openAddModal = () => {
    setIsEditing(false);
    setCurrentCategoryId(null);
    setFormData({
      title: "",
      slug: "",
      parentType: "Streetwear",
      description: "",
      image: "",
      link: "",
      badge: "",
      status: "published",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (category) => {
    setIsEditing(true);
    setCurrentCategoryId(category._id || category.id);
    setFormData({
      title: category.title || "",
      slug: category.slug || "",
      parentType: category.parentType || "Streetwear",
      description: category.description || "",
      image: category.image || "",
      link: category.link || "",
      badge: category.badge || "",
      status: category.status || "published",
    });
    setIsModalOpen(true);
  };

  // Auto-generate slug from title
  const handleTitleChange = (e) => {
    const val = e.target.value;
    const autoSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: isEditing ? prev.slug : autoSlug,
      link: isEditing ? prev.link : `/${autoSlug}`,
    }));
  };

  // Toggle category posting status
  const handleToggleStatus = async (catId, currentStatus) => {
    const newStatus = currentStatus === "published" ? "draft" : "published";
    try {
      const res = await adminApi.updateCategoryStatus(catId, newStatus);
      if (res.success) {
        setCategories((prev) =>
          prev.map((c) =>
            c._id === catId || c.id === catId ? { ...c, status: newStatus } : c
          )
        );
        showToast(
          `Category is now ${newStatus === "published" ? "Live" : "Draft (Hidden)"}`
        );
      }
    } catch (err) {
      showToast("Failed to update category status", "error");
    }
  };

  // Upload category cover image to Cloudinary
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const res = await adminApi.uploadImage(file);
      if (res.success && res.url) {
        setFormData((prev) => ({ ...prev, image: res.url }));
        showToast("Category cover uploaded to Cloudinary!");
      } else {
        showToast(res.message || "Upload failed", "error");
      }
    } catch (err) {
      showToast("Error uploading image to Cloudinary", "error");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      showToast("Category title is required", "error");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        title: formData.title.trim(),
        slug:
          formData.slug.trim() ||
          formData.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-"),
        parentType: formData.parentType,
        description: formData.description.trim(),
        image: formData.image.trim(),
        link: formData.link.trim() || `/${formData.slug}`,
        badge: formData.badge.trim(),
        status: formData.status,
      };

      if (isEditing) {
        const res = await adminApi.updateCategory(currentCategoryId, payload);
        if (res.success) {
          setCategories((prev) =>
            prev.map((c) =>
              c._id === currentCategoryId || c.id === currentCategoryId
                ? res.category
                : c
            )
          );
          showToast("Category updated successfully");
          setIsModalOpen(false);
        }
      } else {
        const res = await adminApi.createCategory(payload);
        if (res.success) {
          setCategories((prev) => [...prev, res.category]);
          showToast("Category created successfully");
          setIsModalOpen(false);
        }
      }
    } catch (err) {
      showToast("Failed to save category", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteCategory = async () => {
    if (!categoryToDelete) return;
    const id = categoryToDelete._id || categoryToDelete.id;
    try {
      const res = await adminApi.deleteCategory(id);
      if (res.success) {
        setCategories((prev) => prev.filter((c) => c._id !== id && c.id !== id));
        showToast("Category deleted successfully");
      }
    } catch (err) {
      showToast("Failed to delete category", "error");
    } finally {
      setCategoryToDelete(null);
    }
  };

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
          <h2 className="text-2xl font-black uppercase tracking-wide">Category Management</h2>
          <p className="text-xs text-gray-400 mt-1">
            Organize collections, define navigation categories, and control live visibility
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#ff3d00] hover:bg-[#e63700] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-[#ff3d00]/30 hover:-translate-y-0.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Categories Grid */}
      {loading ? (
        <div className="py-20 text-center text-gray-400 bg-[#141414] border border-white/10 rounded-3xl">
          <div className="inline-block w-8 h-8 border-2 border-[#ff3d00] border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-xs uppercase tracking-wider font-semibold">Loading categories...</p>
        </div>
      ) : categories.length === 0 ? (
        <div className="py-20 text-center bg-[#141414] border border-white/10 rounded-3xl">
          <Layers className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white">No Categories Created</h3>
          <p className="text-gray-400 text-xs mt-1">
            Click "+ Add New Category" to start building your collection structure.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const id = category._id || category.id;
            const isLive = category.status === "published";

            return (
              <div
                key={id}
                className="bg-[#141414] border border-white/10 rounded-3xl overflow-hidden shadow-xl flex flex-col group transition-all hover:-translate-y-1 hover:border-white/20"
              >
                {/* Cover Image */}
                <div className="h-48 bg-black relative overflow-hidden">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl bg-white/5">
                      🏷️
                    </div>
                  )}

                  {/* Posting Status Pill */}
                  <div className="absolute top-3 left-3 z-10">
                    <button
                      onClick={() => handleToggleStatus(id, category.status)}
                      title="Toggle posting status"
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

                  {category.badge && (
                    <span className="absolute top-3 right-3 bg-[#ff3d00] text-white text-xs font-black uppercase px-2.5 py-0.5 rounded-full z-10 shadow-md">
                      {category.badge}
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs uppercase tracking-wider font-semibold text-[#ff3d00]">
                      {category.parentType}
                    </span>
                    <span className="text-xs font-mono text-gray-500">
                      /{category.slug}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">{category.title}</h3>

                  <p className="text-xs text-gray-400 line-clamp-2 mb-4 flex-grow">
                    {category.description || "No description provided."}
                  </p>

                  {/* Bottom Actions */}
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    <button
                      onClick={() => handleToggleStatus(id, category.status)}
                      className="text-xs font-semibold text-gray-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      {isLive ? "Hide from Store" : "Publish to Store"}
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(category)}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition-colors cursor-pointer"
                        title="Edit Category"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setCategoryToDelete(category)}
                        className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                        title="Delete Category"
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

      {/* Add / Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141414] border border-white/10 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl relative animate-scaleIn">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <span className="p-3 rounded-2xl bg-[#ff3d00]/10 text-[#ff3d00]">
                <Layers className="w-6 h-6" />
              </span>
              <div>
                <h3 className="text-xl font-black uppercase tracking-wide">
                  {isEditing ? "Edit Category" : "Add New Category"}
                </h3>
                <p className="text-xs text-gray-400">
                  Configure storefront collection details and cover media
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                    Category Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={handleTitleChange}
                    placeholder="e.g. Cargo Pants"
                    className="w-full p-3 bg-black/50 border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff3d00]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g. cargo-pants"
                    className="w-full p-3 bg-black/50 border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff3d00]"
                  />
                </div>
              </div>

              {/* Parent Collection & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                    Parent Collection
                  </label>
                  <select
                    value={formData.parentType}
                    onChange={(e) => setFormData({ ...formData, parentType: e.target.value })}
                    className="w-full p-3 bg-black/50 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#ff3d00]"
                  >
                    <option value="Streetwear">Streetwear</option>
                    <option value="Sportswear">Sportswear / Uniforms</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Special Orders">Special Orders</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                    Badge (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="e.g. Popular, New"
                    className="w-full p-3 bg-black/50 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#ff3d00]"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Short tagline or collection summary..."
                  className="w-full p-3 bg-black/50 border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff3d00]"
                />
              </div>

              {/* Cover Image Upload / URL */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                  Cover Image
                </label>
                <div className="flex flex-col sm:flex-row gap-2 mb-2">
                  <label className="flex items-center justify-center gap-2 p-2.5 bg-white/5 hover:bg-white/10 border border-dashed border-white/20 rounded-xl cursor-pointer text-xs font-bold uppercase text-gray-300 hover:text-white">
                    <Upload className="w-4 h-4 text-[#ff3d00]" />
                    <span>{uploadingImage ? "Uploading..." : "Upload from PC"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploadingImage}
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="Or enter Cloudinary/image URL..."
                    className="flex-grow p-2.5 bg-black/50 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#ff3d00]"
                  />
                </div>
                {formData.image && (
                  <div className="h-28 w-full rounded-xl overflow-hidden border border-white/10">
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                  Posting Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full p-2.5 bg-black/50 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#ff3d00]"
                >
                  <option value="published">Published (Visible on site)</option>
                  <option value="draft">Draft (Hidden from site)</option>
                </select>
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
                  {submitting ? "Saving..." : isEditing ? "Save Changes" : "Create Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Category Confirmation Modal */}
      {categoryToDelete && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141414] border border-white/10 rounded-3xl max-w-md w-full p-6 text-center shadow-2xl animate-scaleIn">
            <div className="w-14 h-14 rounded-2xl bg-red-500/10 text-red-400 mx-auto mb-4 flex items-center justify-center">
              <Trash2 className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Delete Category?</h3>
            <p className="text-xs text-gray-400 mb-6">
              Are you sure you want to delete <strong className="text-white">{categoryToDelete.title}</strong>? Products assigned to this category will not be deleted, but the category listing will be removed.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setCategoryToDelete(null)}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold uppercase text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteCategory}
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

export default AdminCategories;
