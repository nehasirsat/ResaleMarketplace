import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useResale } from "@/context/ResaleContext";
import { Eye, EyeOff, Lock, ArrowLeft } from "lucide-react";

export default function CreateAccount() {
  const navigate = useNavigate();
  const { setCurrentStep } = useResale();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  // Get URL parameters
  const searchParams = new URLSearchParams(window.location.search);
  const corrId = searchParams.get('corr_id');
  const productId = searchParams.get('product_id');
  const sku = searchParams.get('sku');
  const netProceeds = searchParams.get('net_proceeds');
  const listingPrice = searchParams.get('listing_price');

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!agreeTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setCurrentStep(3);
    // Pass URL parameters to list-item page
    const params = new URLSearchParams();
    if (corrId) params.set('corr_id', corrId);
    if (productId) params.set('product_id', productId);
    if (sku) params.set('sku', sku);
    if (netProceeds) params.set('net_proceeds', netProceeds);
    if (listingPrice) params.set('listing_price', listingPrice);
    navigate(`/list-item?${params.toString()}`);
  }

  return (
    <div className="min-h-screen bg-slate-800 text-white">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900" />
      <div
        className="fixed inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 40%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 70% 60%, #8b5cf6 0%, transparent 40%)",
        }}
      />

      {/* Header */}
      <div className="relative z-10 px-6 py-4 border-b border-white/10 bg-slate-700/50 backdrop-blur-sm">
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
        <div className="w-full max-w-md bg-slate-700/80 border border-slate-600/50 rounded-2xl p-8 shadow-2xl shadow-black/50">

          {/* Back Button */}
          <button
            onClick={() => navigate("/marketplace-login")}
            className="flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Sign In
          </button>

          {/* Title */}
          <h1 className="text-3xl font-bold text-center mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
            Create Account
          </h1>
          <p className="text-center text-slate-400 mb-8 text-sm">
            Join ResaleHub to start selling
          </p>

          <form onSubmit={handleSignup} className="space-y-5">

            {/* Name */}
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Full Name</label>
              <input
                type="text"
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
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

            {/* Confirm Password */}
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2.5 pr-10 text-sm text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 text-xs text-slate-400">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="accent-blue-500 mt-0.5"
                required
              />
              <label>
                I agree to the{" "}
                <button type="button" className="text-blue-400 hover:underline">
                  Terms of Service
                </button>{" "}
                and{" "}
                <button type="button" className="text-blue-400 hover:underline">
                  Privacy Policy
                </button>
              </label>
            </div>

            {/* CTA */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl py-3 text-white font-bold transition shadow-lg shadow-blue-500/20 disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Create Account"}
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
              onClick={() => navigate("/marketplace-login")}
              className="w-full border border-blue-500/30 text-blue-400 py-2.5 rounded-xl hover:bg-blue-500/10 transition"
            >
              Already have an account? Sign In
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
