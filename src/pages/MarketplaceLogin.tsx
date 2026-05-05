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
    <div className="min-h-screen bg-[#0A1931] text-white">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0A1931] via-[#0d1f3c] to-[#060f1f]" />

      {/* Header */}
      <div className="relative z-10 px-6 py-4 border-b border-white/10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-lg tracking-wide">LUMINARY</div>
          <div className="text-white/40 text-sm">Marketplace</div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center py-20 px-4">
        <div className="w-full max-w-md bg-[#0d1f3c]/80 border border-white/10 rounded-2xl p-8 shadow-2xl">

          {/* Title */}
          <h1 className="text-3xl font-black text-center mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
            Welcome Back
          </h1>
          <p className="text-center text-white/40 mb-8 text-sm">
            Sign in to continue your resale journey
          </p>

          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div>
              <label className="text-xs text-white/40 mb-1 block">Email</label>
              <input
                type="email"
                className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/20"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-xs text-white/40 mb-1 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2.5 pr-10 text-sm text-white outline-none focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/20"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="flex justify-between items-center text-xs text-white/40">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Remember me
              </label>
              <button className="hover:text-[#F5A623] transition">
                Forgot password?
              </button>
            </div>

            {/* CTA */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#F5A623] hover:bg-[#e8961a] rounded-xl py-3 text-[#0A1931] font-bold transition shadow-lg shadow-[#F5A623]/20"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            {/* Divider */}
            <div className="flex items-center">
              <div className="flex-grow border-t border-white/10" />
              <span className="mx-3 text-white/30 text-xs">or</span>
              <div className="flex-grow border-t border-white/10" />
            </div>

            {/* Secondary */}
            <button
              type="button"
              className="w-full border border-[#F5A623]/30 text-[#F5A623] py-2.5 rounded-xl hover:bg-[#F5A623]/10 transition"
            >
              Create Account
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}