import { useState } from "react";
import { KeyRound, Lock, Eye, EyeOff, AlertCircle, ArrowRight, ShieldCheck } from "lucide-react";
import { adminApi } from "../../utils/adminApi";

const AdminLogin = ({ onLoginSuccess }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password.trim()) {
      setError("Please enter the admin password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await adminApi.login(password);
      if (res.success) {
        onLoginSuccess();
      } else {
        setError(res.message || "Invalid password. Access denied.");
      }
    } catch (err) {
      setError("Unable to connect to the backend server. Ensure backend is running on port 3000.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#ff3d00]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#ff3d00]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md bg-[#141414] border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative z-10 backdrop-blur-xl">
        {/* Brand header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ff3d00] to-[#b32b00] text-white shadow-lg shadow-[#ff3d00]/30 mb-4">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black tracking-wider uppercase">
            <span className="text-[#ff3d00]">REBEL</span>WEAR
          </h1>
          <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold mt-1">
            Admin Command Center
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-red-400 text-sm animate-fadeIn">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-wider font-bold text-gray-300 mb-2">
              Admin Passcode
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password..."
                className="w-full pl-12 pr-12 py-3.5 bg-black/60 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#ff3d00] focus:ring-1 focus:ring-[#ff3d00] transition-all text-sm"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-[#ff3d00] to-[#e63700] hover:from-[#e63700] hover:to-[#cc3100] text-white font-bold rounded-xl uppercase tracking-wider text-sm transition-all shadow-lg shadow-[#ff3d00]/30 hover:shadow-[#ff3d00]/50 hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
          >
            {loading ? (
              <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <span>Access Admin Panel</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-xs text-gray-500">
            Default passcode configured: <span className="text-gray-400 font-mono">rebelwear2026!</span>
            <br />
            You can customize it anytime in <span className="text-[#ff3d00]">backend/.env</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
