import { useState, useEffect } from "react";
import {
  ShoppingBag,
  DollarSign,
  Package,
  Layers,
  Clock,
  CheckCircle2,
  Database,
  ArrowUpRight,
  TrendingUp,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { adminApi } from "../../utils/adminApi";

const AdminOverview = ({ setActiveTab }) => {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOverviewData = async () => {
    setLoading(true);
    try {
      const [statsRes, ordersRes] = await Promise.all([
        adminApi.getStats(),
        adminApi.getOrders(),
      ]);

      if (statsRes.success) {
        setStats(statsRes.stats);
      }
      if (ordersRes.success) {
        setRecentOrders((ordersRes.orders || []).slice(0, 5));
      }
    } catch (err) {
      console.error("Error loading overview data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverviewData();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <span className="px-2.5 py-1 text-xs rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold uppercase">Pending</span>;
      case "processing":
        return <span className="px-2.5 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-semibold uppercase">Processing</span>;
      case "shipped":
        return <span className="px-2.5 py-1 text-xs rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 font-semibold uppercase">Shipped</span>;
      case "delivered":
        return <span className="px-2.5 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold uppercase">Delivered</span>;
      case "cancelled":
        return <span className="px-2.5 py-1 text-xs rounded-full bg-red-500/10 text-red-400 border border-red-500/20 font-semibold uppercase">Cancelled</span>;
      default:
        return <span className="px-2.5 py-1 text-xs rounded-full bg-gray-500/10 text-gray-400 border border-gray-500/20 font-semibold uppercase">{status}</span>;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#181818] via-[#141414] to-[#1a1210] border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-[#ff3d00]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff3d00]/15 text-[#ff3d00] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" /> REBELWEAR HQ
          </span>
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wide">
            Store Performance Dashboard
          </h2>
          <p className="text-gray-400 text-sm mt-1 max-w-xl">
            Monitor real-time customer orders, manage catalog inventory, organize categories, and toggle live posting visibility.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setActiveTab("products")}
            className="px-5 py-2.5 bg-[#ff3d00] hover:bg-[#e63700] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-[#ff3d00]/30 hover:-translate-y-0.5 cursor-pointer"
          >
            + Add Product
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            className="px-5 py-2.5 bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-wider rounded-xl border border-white/10 transition-all hover:-translate-y-0.5 cursor-pointer"
          >
            + Add Category
          </button>
        </div>
      </div>

      {/* Database Status Alert Banner */}
      <div className="bg-[#141414] border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl ${stats?.dbStatus?.connected ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"}`}>
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold">Storage Status:</span>
              {stats?.dbStatus?.connected ? (
                <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Connected to MongoDB Atlas
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs text-amber-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  Active (Persistent Local Storage)
                </span>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              {stats?.dbStatus?.connected
                ? "Your MongoDB database is actively synchronizing orders, products, and categories."
                : "Using local JSON database fallback. To connect Atlas directly, paste MONGODB_URI in backend/.env."}
            </p>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Orders */}
        <div
          onClick={() => setActiveTab("orders")}
          className="bg-[#141414] border border-white/10 hover:border-[#ff3d00]/50 rounded-2xl p-6 transition-all hover:-translate-y-1 cursor-pointer group"
        >
          <div className="flex justify-between items-start mb-4">
            <span className="p-3 rounded-xl bg-orange-500/10 text-[#ff3d00] group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-6 h-6" />
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
              {stats ? `${stats.pendingOrders} Pending` : "..."}
            </span>
          </div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Orders</p>
          <h3 className="text-3xl font-black mt-1 text-white">
            {stats ? stats.ordersCount : "--"}
          </h3>
          <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
            <span>Manage customer orders</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#ff3d00]" />
          </p>
        </div>

        {/* Revenue */}
        <div className="bg-[#141414] border border-white/10 rounded-2xl p-6">
          <div className="flex justify-between items-start mb-4">
            <span className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
              <DollarSign className="w-6 h-6" />
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Active Sales
            </span>
          </div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Revenue</p>
          <h3 className="text-3xl font-black mt-1 text-white">
            ${stats ? stats.totalRevenue : "0.00"}
          </h3>
          <p className="text-xs text-gray-500 mt-2">From completed & processing orders</p>
        </div>

        {/* Products */}
        <div
          onClick={() => setActiveTab("products")}
          className="bg-[#141414] border border-white/10 hover:border-[#ff3d00]/50 rounded-2xl p-6 transition-all hover:-translate-y-1 cursor-pointer group"
        >
          <div className="flex justify-between items-start mb-4">
            <span className="p-3 rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
              <Package className="w-6 h-6" />
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {stats ? `${stats.publishedProducts} Live` : "..."}
            </span>
          </div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Catalog Products</p>
          <h3 className="text-3xl font-black mt-1 text-white">
            {stats ? stats.productsCount : "--"}
          </h3>
          <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
            <span>{stats?.draftProducts || 0} drafts in backlog</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#ff3d00]" />
          </p>
        </div>

        {/* Categories */}
        <div
          onClick={() => setActiveTab("categories")}
          className="bg-[#141414] border border-white/10 hover:border-[#ff3d00]/50 rounded-2xl p-6 transition-all hover:-translate-y-1 cursor-pointer group"
        >
          <div className="flex justify-between items-start mb-4">
            <span className="p-3 rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
              Collections
            </span>
          </div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Store Categories</p>
          <h3 className="text-3xl font-black mt-1 text-white">
            {stats ? stats.categoriesCount : "--"}
          </h3>
          <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
            <span>View & add categories</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#ff3d00]" />
          </p>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-[#141414] border border-white/10 rounded-3xl p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-bold uppercase tracking-wide">Recent Customer Orders</h3>
            <p className="text-xs text-gray-400 mt-1">Latest purchases placed across REBELWEAR storefront</p>
          </div>
          <button
            onClick={() => setActiveTab("orders")}
            className="text-xs font-bold text-[#ff3d00] hover:text-white uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>View All Orders</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {loading ? (
          <div className="py-12 text-center text-gray-400">
            <div className="inline-block w-6 h-6 border-2 border-[#ff3d00] border-t-transparent rounded-full animate-spin mb-2"></div>
            <p className="text-xs uppercase tracking-wider">Loading orders...</p>
          </div>
        ) : recentOrders.length === 0 ? (
          <div className="py-12 text-center border border-dashed border-white/10 rounded-2xl">
            <ShoppingBag className="w-10 h-10 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400 text-sm font-medium">No orders received yet.</p>
            <p className="text-gray-500 text-xs mt-1">
              New customer orders submitted via product pages will automatically appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="pb-3 font-semibold">Order ID</th>
                  <th className="pb-3 font-semibold">Customer</th>
                  <th className="pb-3 font-semibold">Product</th>
                  <th className="pb-3 font-semibold">Qty & Size</th>
                  <th className="pb-3 font-semibold">Total</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentOrders.map((order) => (
                  <tr key={order._id || order.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 font-mono font-medium text-xs text-[#ff3d00]">
                      {order.orderNumber || order._id?.slice(-8)}
                    </td>
                    <td className="py-4">
                      <div className="font-semibold text-white">{order.customerName}</div>
                      <div className="text-xs text-gray-400">{order.email}</div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        {order.productImage ? (
                          <img
                            src={order.productImage}
                            alt={order.productName}
                            className="w-9 h-9 rounded-lg object-cover border border-white/10"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-xs">
                            👕
                          </div>
                        )}
                        <span className="font-medium text-white truncate max-w-[180px]">
                          {order.productName}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 text-gray-300">
                      {order.quantity} × <span className="font-semibold text-white">{order.size}</span>
                    </td>
                    <td className="py-4 font-bold text-white">
                      ${order.totalPrice}
                    </td>
                    <td className="py-4">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="py-4 text-right text-xs text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOverview;
