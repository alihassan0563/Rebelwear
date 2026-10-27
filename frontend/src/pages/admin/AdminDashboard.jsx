import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Layers,
  Sliders,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Database,
  Menu,
  X,
} from "lucide-react";
import AdminLogin from "./AdminLogin";
import AdminOverview from "./AdminOverview";
import AdminOrders from "./AdminOrders";
import AdminProducts from "./AdminProducts";
import AdminCategories from "./AdminCategories";
import AdminPostingControl from "./AdminPostingControl";
import { adminApi } from "../../utils/adminApi";

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [dbStatus, setDbStatus] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Verify stored token on initial load
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = adminApi.getAuthToken();
      if (!token) {
        setIsAuthenticated(false);
        setCheckingAuth(false);
        return;
      }

      try {
        const res = await adminApi.verify();
        if (res.success) {
          setIsAuthenticated(true);
          setDbStatus(res.dbStatus);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogout = () => {
    adminApi.logout();
    setIsAuthenticated(false);
  };

  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "orders", label: "Orders", icon: ShoppingBag },
    { id: "products", label: "Products", icon: Package },
    { id: "categories", label: "Categories", icon: Layers },
    { id: "posting", label: "Posting Control", icon: Sliders },
  ];

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="inline-block w-10 h-10 border-3 border-[#ff3d00] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs uppercase tracking-widest font-bold text-gray-400">
            Checking Admin Credentials...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans">
      {/* Top Admin Bar */}
      <header className="sticky top-0 z-40 bg-[#121212]/95 backdrop-blur-md border-b border-white/10 px-4 md:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo & Badge */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-[#ff3d00] flex items-center justify-center font-black text-white shadow-md shadow-[#ff3d00]/30 group-hover:scale-105 transition-transform">
                RW
              </div>
              <div>
                <span className="font-black text-lg tracking-wider uppercase">
                  <span className="text-[#ff3d00]">REBEL</span>WEAR
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block -mt-1">
                  Admin Panel
                </span>
              </div>
            </Link>

            {/* DB Indicator Pill */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs ml-4">
              <Database className="w-3.5 h-3.5 text-[#ff3d00]" />
              <span className="text-gray-400">Storage:</span>
              <span className="font-semibold text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Active
              </span>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-black/40 p-1 rounded-2xl border border-white/5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#ff3d00] text-white shadow-md shadow-[#ff3d00]/30"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick Actions (Store link & Logout) */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white transition-colors"
              title="Open customer storefront in new tab"
            >
              <span>View Store</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              title="Sign Out of Admin Panel"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-white/5 text-gray-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2 border-t border-white/10 mt-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-left transition-all ${
                    isActive
                      ? "bg-[#ff3d00] text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            <div className="pt-2">
              <Link
                to="/"
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-gray-300"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open Storefront</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Admin View Container */}
      <main className="flex-grow max-w-7xl w-full mx-auto p-4 md:p-8">
        {activeTab === "overview" && <AdminOverview setActiveTab={setActiveTab} />}
        {activeTab === "orders" && <AdminOrders />}
        {activeTab === "products" && <AdminProducts />}
        {activeTab === "categories" && <AdminCategories />}
        {activeTab === "posting" && <AdminPostingControl />}
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-white/10 py-6 px-4 text-center text-xs text-gray-500">
        <p>REBELWEAR Admin Command Suite &copy; {new Date().getFullYear()}. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminDashboard;
