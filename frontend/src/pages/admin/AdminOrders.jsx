import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  RefreshCw,
  ShoppingBag,
  Eye,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  X,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { adminApi } from "../../utils/adminApi";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [updatingNotes, setUpdatingNotes] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [notification, setNotification] = useState(null);

  const showToast = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getOrders({
        status: statusFilter,
        search: searchQuery,
      });
      if (res.success) {
        setOrders(res.orders || []);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      showToast("Failed to load orders", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchOrders();
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await adminApi.updateOrderStatus(orderId, { status: newStatus });
      if (res.success) {
        setOrders((prev) =>
          prev.map((o) => ((o._id === orderId || o.id === orderId) ? res.order : o))
        );
        if (selectedOrder && (selectedOrder._id === orderId || selectedOrder.id === orderId)) {
          setSelectedOrder(res.order);
        }
        showToast(`Order status updated to ${newStatus}`);
      }
    } catch (err) {
      showToast("Failed to update status", "error");
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedOrder) return;
    setUpdatingNotes(true);
    try {
      const orderId = selectedOrder._id || selectedOrder.id;
      const res = await adminApi.updateOrderStatus(orderId, { adminNotes });
      if (res.success) {
        setOrders((prev) =>
          prev.map((o) => ((o._id === orderId || o.id === orderId) ? res.order : o))
        );
        setSelectedOrder(res.order);
        showToast("Admin notes saved successfully");
      }
    } catch (err) {
      showToast("Failed to save notes", "error");
    } finally {
      setUpdatingNotes(false);
    }
  };

  const handleDeleteOrder = async () => {
    if (!orderToDelete) return;
    const id = orderToDelete._id || orderToDelete.id;
    try {
      const res = await adminApi.deleteOrder(id);
      if (res.success) {
        setOrders((prev) => prev.filter((o) => o._id !== id && o.id !== id));
        if (selectedOrder && (selectedOrder._id === id || selectedOrder.id === id)) {
          setSelectedOrder(null);
        }
        showToast("Order removed successfully");
      }
    } catch (err) {
      showToast("Failed to delete order", "error");
    } finally {
      setOrderToDelete(null);
    }
  };

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

  const statusOptions = ["pending", "processing", "shipped", "delivered", "cancelled"];

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
          {notification.type === "error" ? <AlertTriangle className="w-5 h-5 text-red-400" /> : <CheckCircle className="w-5 h-5 text-emerald-400" />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-wide">Orders Management</h2>
          <p className="text-xs text-gray-400 mt-1">
            Track customer purchases, update shipping stages, and inspect order details
          </p>
        </div>

        <button
          onClick={fetchOrders}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold uppercase tracking-wider text-gray-300 hover:text-white transition-all cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#141414] border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Status Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {["all", "pending", "processing", "shipped", "delivered", "cancelled"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                statusFilter === st
                  ? "bg-[#ff3d00] text-white shadow-md shadow-[#ff3d00]/30"
                  : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="relative min-w-[260px]">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search customer, email, order #..."
            className="w-full pl-10 pr-4 py-2 bg-black/50 border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff3d00]"
          />
        </form>
      </div>

      {/* Orders Table */}
      <div className="bg-[#141414] border border-white/10 rounded-3xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="py-20 text-center text-gray-400">
            <div className="inline-block w-8 h-8 border-2 border-[#ff3d00] border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-xs uppercase tracking-wider font-semibold">Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="py-20 text-center">
            <ShoppingBag className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">No Orders Found</h3>
            <p className="text-gray-400 text-xs mt-1">
              {statusFilter !== "all"
                ? `No orders matching status "${statusFilter}". Try switching filter.`
                : "No customer orders have been received yet."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-black/30 border-b border-white/10 text-gray-400 text-xs uppercase tracking-wider">
                <tr>
                  <th className="py-4 px-6 font-semibold">Order</th>
                  <th className="py-4 px-4 font-semibold">Customer</th>
                  <th className="py-4 px-4 font-semibold">Product</th>
                  <th className="py-4 px-4 font-semibold">Size & Qty</th>
                  <th className="py-4 px-4 font-semibold">Total</th>
                  <th className="py-4 px-4 font-semibold">Status</th>
                  <th className="py-4 px-4 font-semibold">Date</th>
                  <th className="py-4 px-6 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {orders.map((order) => {
                  const id = order._id || order.id;
                  return (
                    <tr key={id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-6">
                        <span className="font-mono text-xs font-bold text-[#ff3d00]">
                          {order.orderNumber || id?.slice(-8)}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-bold text-white">{order.customerName}</div>
                        <div className="text-xs text-gray-400">{order.email}</div>
                        <div className="text-xs text-gray-500">{order.phone}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          {order.productImage ? (
                            <img
                              src={order.productImage}
                              alt={order.productName}
                              className="w-10 h-10 rounded-lg object-cover border border-white/10 flex-shrink-0"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-sm flex-shrink-0">
                              👕
                            </div>
                          )}
                          <div>
                            <span className="font-semibold text-white block max-w-[180px] truncate">
                              {order.productName}
                            </span>
                            <span className="text-xs text-gray-400">${order.price} each</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white/10 text-white mr-2">
                          {order.size}
                        </span>
                        <span className="text-xs text-gray-400">× {order.quantity}</span>
                      </td>
                      <td className="py-4 px-4 font-black text-white text-base">
                        ${order.totalPrice}
                      </td>
                      <td className="py-4 px-4">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(id, e.target.value)}
                          className="bg-black/80 border border-white/10 rounded-lg text-xs py-1 px-2.5 font-semibold text-white focus:outline-none focus:border-[#ff3d00] cursor-pointer"
                        >
                          {statusOptions.map((opt) => (
                            <option key={opt} value={opt} className="bg-[#141414]">
                              {opt.toUpperCase()}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-4 px-4 text-xs text-gray-400 whitespace-nowrap">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setSelectedOrder(order);
                              setAdminNotes(order.adminNotes || "");
                            }}
                            className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition-colors cursor-pointer"
                            title="View Full Order Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setOrderToDelete(order)}
                            className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                            title="Delete Order"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141414] border border-white/10 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl relative animate-scaleIn">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <span className="p-3 rounded-2xl bg-[#ff3d00]/10 text-[#ff3d00]">
                <ShoppingBag className="w-6 h-6" />
              </span>
              <div>
                <h3 className="text-xl font-black uppercase tracking-wide">
                  Order Details
                </h3>
                <p className="font-mono text-xs text-[#ff3d00]">
                  {selectedOrder.orderNumber || selectedOrder._id}
                </p>
              </div>
            </div>

            {/* Product Card Inside Modal */}
            <div className="bg-black/50 border border-white/10 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row items-center gap-4">
              {selectedOrder.productImage ? (
                <img
                  src={selectedOrder.productImage}
                  alt={selectedOrder.productName}
                  className="w-24 h-24 rounded-xl object-cover border border-white/10"
                />
              ) : (
                <div className="w-24 h-24 rounded-xl bg-white/5 flex items-center justify-center text-2xl">
                  👕
                </div>
              )}
              <div className="flex-grow space-y-1 text-center sm:text-left">
                <h4 className="text-lg font-bold text-white">{selectedOrder.productName}</h4>
                <p className="text-xs text-gray-400">Unit Price: ${selectedOrder.price}</p>
                <div className="flex items-center justify-center sm:justify-start gap-4 text-xs font-semibold text-gray-300 pt-1">
                  <span>Size: <strong className="text-white">{selectedOrder.size}</strong></span>
                  <span>Quantity: <strong className="text-white">{selectedOrder.quantity}</strong></span>
                  <span className="text-[#ff3d00] font-black text-sm">
                    Total: ${selectedOrder.totalPrice}
                  </span>
                </div>
              </div>
            </div>

            {/* Customer Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-black/30 border border-white/10 rounded-2xl p-4 space-y-3">
                <h5 className="text-xs uppercase tracking-wider font-bold text-gray-400">Customer Contact</h5>
                <p className="text-sm font-bold text-white">{selectedOrder.customerName}</p>
                <div className="flex items-center gap-2 text-xs text-gray-300">
                  <Mail className="w-4 h-4 text-[#ff3d00]" />
                  <a href={`mailto:${selectedOrder.email}`} className="hover:underline">
                    {selectedOrder.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-300">
                  <Phone className="w-4 h-4 text-[#ff3d00]" />
                  <a href={`tel:${selectedOrder.phone}`} className="hover:underline">
                    {selectedOrder.phone}
                  </a>
                </div>
              </div>

              <div className="bg-black/30 border border-white/10 rounded-2xl p-4 space-y-3">
                <h5 className="text-xs uppercase tracking-wider font-bold text-gray-400">Shipping Address</h5>
                <div className="flex items-start gap-2 text-xs text-gray-300">
                  <MapPin className="w-4 h-4 text-[#ff3d00] flex-shrink-0 mt-0.5" />
                  <p className="whitespace-pre-wrap leading-relaxed">{selectedOrder.address}</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400 pt-2 border-t border-white/5">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>Placed on: {new Date(selectedOrder.createdAt).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Status Change in Modal */}
            <div className="bg-black/30 border border-white/10 rounded-2xl p-4 mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Fulfillment Status</p>
                <div className="mt-1">{getStatusBadge(selectedOrder.status)}</div>
              </div>
              <select
                value={selectedOrder.status}
                onChange={(e) => handleStatusChange(selectedOrder._id || selectedOrder.id, e.target.value)}
                className="bg-black border border-white/20 rounded-xl px-4 py-2 text-xs font-bold uppercase text-white focus:outline-none focus:border-[#ff3d00] cursor-pointer"
              >
                {statusOptions.map((opt) => (
                  <option key={opt} value={opt} className="bg-[#141414]">
                    Change to {opt.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            {/* Admin Notes */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">
                Internal Admin Notes (tracking number, customer preferences, etc.)
              </label>
              <textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Add private fulfillment notes here..."
                rows={3}
                className="w-full p-3.5 bg-black/60 border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff3d00]"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleSaveNotes}
                  disabled={updatingNotes}
                  className="px-4 py-2 bg-[#ff3d00] hover:bg-[#e63700] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shadow-[#ff3d00]/30 cursor-pointer disabled:opacity-50"
                >
                  {updatingNotes ? "Saving..." : "Save Notes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {orderToDelete && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141414] border border-white/10 rounded-3xl max-w-md w-full p-6 text-center shadow-2xl animate-scaleIn">
            <div className="w-14 h-14 rounded-2xl bg-red-500/10 text-red-400 mx-auto mb-4 flex items-center justify-center">
              <Trash2 className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Delete Order Record?</h3>
            <p className="text-xs text-gray-400 mb-6">
              Are you sure you want to delete order{" "}
              <strong className="text-white font-mono">
                {orderToDelete.orderNumber || orderToDelete._id}
              </strong>{" "}
              from {orderToDelete.customerName}? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setOrderToDelete(null)}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold uppercase text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteOrder}
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

export default AdminOrders;
