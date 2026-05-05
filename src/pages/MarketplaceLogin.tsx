import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useResale } from "@/context/ResaleContext";
import { Eye, EyeOff, Lock } from "lucide-react";

export default function MarketplaceLogin() {
  const navigate = useNavigate();
  const { setCurrentStep } = useResale();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCurrentStep(3);
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    navigate("/list-item");
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Background - Different gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950" />
      <div
        className="fixed inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 40%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 70% 60%, #8b5cf6 0%, transparent 40%)",
        }}
      />

      {/* Header - Different branding */}
      <div className="relative z-10 px-6 py-4 border-b border-white/10 bg-slate-800/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Lock className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-white font-bold text-lg tracking-wide">ResaleHub</div>
              <div className="text-white/40 text-[10px]">Trusted Marketplace</div>
            </div>
          </div>
          <div className="text-white/40 text-sm">Partner Platform</div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center py-20 px-4">
        <div className="w-full max-w-md bg-slate-800/80 border border-slate-700/50 rounded-2xl p-8 shadow-2xl shadow-black/50">

          {/* Title */}
          <h1 className="text-3xl font-black text-center mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
            Welcome Back
          </h1>
          <p className="text-center text-slate-400 mb-8 text-sm">
            Sign in to continue your resale journey
          </p>

          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Email</label>
              <input
                type="email"
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2.5 pr-10 text-sm text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="flex justify-between items-center text-xs text-slate-400">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="accent-blue-500"
                />
                Remember me
              </label>
              <button className="hover:text-blue-400 transition">
                Forgot password?
              </button>
            </div>

            {/* CTA */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl py-3 text-white font-bold transition shadow-lg shadow-blue-500/20"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            {/* Divider */}
            <div className="flex items-center">
              <div className="flex-grow border-t border-slate-700" />
              <span className="mx-3 text-slate-500 text-xs">or</span>
              <div className="flex-grow border-t border-slate-700" />
            </div>

            {/* Secondary */}
            <button
              type="button"
              className="w-full border border-blue-500/30 text-blue-400 py-2.5 rounded-xl hover:bg-blue-500/10 transition"
            >
              Create Account
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}