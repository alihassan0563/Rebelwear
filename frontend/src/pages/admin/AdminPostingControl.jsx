import { useState, useEffect } from "react";
import {
  Sliders,
  Eye,
  EyeOff,
  Package,
  Layers,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Search,
  ExternalLink,
} from "lucide-react";
import { adminApi } from "../../utils/adminApi";

const AdminPostingControl = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("all"); // all, products, categories
  const [filterStatus, setFilterStatus] = useState("all"); // all, published, draft
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState(null);

  const showToast = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        adminApi.getProducts(),
        adminApi.getCategories(),
      ]);

      if (prodRes.success) setProducts(prodRes.products || []);
      if (catRes.success) setCategories(catRes.categories || []);
    } catch (err) {
      console.error("Error fetching items for posting control:", err);
      showToast("Failed to load inventory for posting control", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Toggle product status
  const handleToggleProduct = async (productId, currentStatus) => {
    const newStatus = currentStatus === "published" ? "draft" : "published";
    try {
      const res = await adminApi.updateProductStatus(productId, newStatus);
      if (res.success) {
        setProducts((prev) =>
          prev.map((p) =>
            p._id === productId || p.id === productId ? { ...p, status: newStatus } : p
          )
        );
        showToast(
          `Product "${res.product?.title || ""}" is now ${
            newStatus === "published" ? "Live" : "Draft (Hidden)"
          }`
        );
      }
    } catch (err) {
      showToast("Error updating product posting status", "error");
    }
  };

  // Toggle category status
  const handleToggleCategory = async (catId, currentStatus) => {
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
          `Category "${res.category?.title || ""}" is now ${
            newStatus === "published" ? "Live" : "Draft (Hidden)"
          }`
        );
      }
    } catch (err) {
      showToast("Error updating category posting status", "error");
    }
  };

  // Prepare combined list of items
  const combinedItems = [
    ...products.map((p) => ({
      id: p._id || p.id,
      type: "Product",
      title: p.title,
      category: p.category,
      price: p.price,
      image: p.images?.[0] || "",
      status: p.status || "published",
      raw: p,
    })),
    ...categories.map((c) => ({
      id: c._id || c.id,
      type: "Category",
      title: c.title,
      category: c.parentType,
      price: null,
      image: c.image || "",
      status: c.status || "published",
      raw: c,
    })),
  ];

  // Filtering
  const filteredItems = combinedItems.filter((item) => {
    if (filterType === "products" && item.type !== "Product") return false;
    if (filterType === "categories" && item.type !== "Category") return false;
    if (filterStatus === "published" && item.status !== "published") return false;
    if (filterStatus === "draft" && item.status !== "draft") return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        (item.category && item.category.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const publishedCount = combinedItems.filter((i) => i.status === "published").length;
  const draftCount = combinedItems.filter((i) => i.status === "draft").length;

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

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-wide">Posting Control Center</h2>
          <p className="text-xs text-gray-400 mt-1">
            Centrally control which products and categories are live on the customer-facing storefront
          </p>
        </div>

        <button
          onClick={fetchData}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold uppercase tracking-wider text-gray-300 hover:text-white transition-all cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh Items</span>
        </button>
      </div>

      {/* Posting Status Overview Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#141414] border border-white/10 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Eye className="w-5 h-5" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-wider font-bold text-gray-400">Currently Live</p>
              <h3 className="text-2xl font-black text-white">{publishedCount}</h3>
            </div>
          </div>
          <span className="text-xs text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-500/10">
            Visible on store
          </span>
        </div>

        <div className="bg-[#141414] border border-white/10 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-neutral-800 text-gray-400">
              <EyeOff className="w-5 h-5" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-wider font-bold text-gray-400">Draft / Hidden</p>
              <h3 className="text-2xl font-black text-white">{draftCount}</h3>
            </div>
          </div>
          <span className="text-xs text-gray-400 font-semibold px-2 py-0.5 rounded bg-white/5">
            Hidden from store
          </span>
        </div>

        <div className="bg-[#141414] border border-white/10 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-orange-500/10 text-[#ff3d00]">
              <Sliders className="w-5 h-5" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-wider font-bold text-gray-400">Total Catalog Items</p>
              <h3 className="text-2xl font-black text-white">{combinedItems.length}</h3>
            </div>
          </div>
          <span className="text-xs text-[#ff3d00] font-semibold px-2 py-0.5 rounded bg-[#ff3d00]/10">
            Managed
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#141414] border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Type Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilterType("all")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              filterType === "all"
                ? "bg-[#ff3d00] text-white shadow-md shadow-[#ff3d00]/30"
                : "bg-white/5 text-gray-400 hover:text-white"
            }`}
          >
            All Items
          </button>
          <button
            onClick={() => setFilterType("products")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              filterType === "products"
                ? "bg-[#ff3d00] text-white shadow-md shadow-[#ff3d00]/30"
                : "bg-white/5 text-gray-400 hover:text-white"
            }`}
          >
            Products ({products.length})
          </button>
          <button
            onClick={() => setFilterType("categories")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              filterType === "categories"
                ? "bg-[#ff3d00] text-white shadow-md shadow-[#ff3d00]/30"
                : "bg-white/5 text-gray-400 hover:text-white"
            }`}
          >
            Categories ({categories.length})
          </button>

          <span className="w-px h-6 bg-white/10 mx-2 hidden sm:block"></span>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-black/60 border border-white/10 rounded-xl text-xs py-1.5 px-3 text-white focus:outline-none focus:border-[#ff3d00] cursor-pointer"
          >
            <option value="all">Any Status</option>
            <option value="published">Only Live (Published)</option>
            <option value="draft">Only Hidden (Drafts)</option>
          </select>
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search items by name..."
            className="w-full pl-10 pr-4 py-2 bg-black/50 border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff3d00]"
          />
        </div>
      </div>

      {/* Items List */}
      <div className="bg-[#141414] border border-white/10 rounded-3xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="py-20 text-center text-gray-400">
            <div className="inline-block w-8 h-8 border-2 border-[#ff3d00] border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-xs uppercase tracking-wider font-semibold">Loading items...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="py-20 text-center">
            <Sliders className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">No Items Matched</h3>
            <p className="text-gray-400 text-xs mt-1">
              Try adjusting your filter or search query.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-black/30 border-b border-white/10 text-gray-400 text-xs uppercase tracking-wider">
                <tr>
                  <th className="py-4 px-6 font-semibold">Item & Type</th>
                  <th className="py-4 px-4 font-semibold">Collection / Category</th>
                  <th className="py-4 px-4 font-semibold">Price</th>
                  <th className="py-4 px-4 font-semibold">Posting Status</th>
                  <th className="py-4 px-6 font-semibold text-right">Quick Toggle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredItems.map((item) => {
                  const isLive = item.status === "published";
                  const isProduct = item.type === "Product";

                  return (
                    <tr key={`${item.type}-${item.id}`} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-11 h-11 rounded-xl object-cover border border-white/10 flex-shrink-0"
                            />
                          ) : (
                            <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center text-lg flex-shrink-0">
                              {isProduct ? "👕" : "🏷️"}
                            </div>
                          )}
                          <div>
                            <span className="font-bold text-white block">{item.title}</span>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1 mt-0.5">
                              {isProduct ? <Package className="w-3 h-3 text-[#ff3d00]" /> : <Layers className="w-3 h-3 text-purple-400" />}
                              <span>{item.type}</span>
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 text-xs font-semibold text-gray-300">
                        {item.category || "--"}
                      </td>

                      <td className="py-4 px-4 text-xs font-bold text-white">
                        {item.price ? `$${item.price}` : <span className="text-gray-500 font-normal">N/A</span>}
                      </td>

                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                            isLive
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                              : "bg-neutral-800 text-gray-400 border border-white/10"
                          }`}
                        >
                          {isLive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                          <span>{isLive ? "Published (Live)" : "Draft (Hidden)"}</span>
                        </span>
                      </td>

                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() =>
                            isProduct
                              ? handleToggleProduct(item.id, item.status)
                              : handleToggleCategory(item.id, item.status)
                          }
                          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer ${
                            isLive
                              ? "bg-white/10 hover:bg-red-500/20 text-gray-300 hover:text-red-400 border border-white/10"
                              : "bg-[#ff3d00] hover:bg-[#e63700] text-white shadow-[#ff3d00]/30"
                          }`}
                        >
                          {isLive ? "Set to Draft" : "Publish to Store"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPostingControl;
