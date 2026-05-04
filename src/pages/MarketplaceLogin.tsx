import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useResale } from "@/context/ResaleContext";
import { LogIn, UserPlus, Eye, EyeOff, Shield, ChevronRight } from "lucide-react";

export default function MarketplaceLogin() {
  const navigate = useNavigate();
  const { setCurrentStep } = useResale();
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCurrentStep(3);
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  function validate() {
    const e: typeof errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) e.email = "Email is required";
    else if (!emailRegex.test(email)) e.email = "Please enter a valid email address";
    if (!password) e.password = "Password is required";
    return e;
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    setCurrentStep(4);
    navigate("/list-item");
  }

  return (
    <div
      className={`min-h-screen bg-gray-100 transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}`}
    >

      {/* Marketplace Header */}
      <div className="bg-white border-b border-gray-200 pt-16">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <span className="text-white text-xs font-black">M</span>
              </div>
              <div>
                <div className="text-sm font-bold text-gray-900">Luminary Marketplace</div>
                <div className="text-[10px] text-gray-400">Third-party resale platform</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-green-600 text-xs bg-green-50 border border-green-200 rounded-full px-3 py-1">
              <Shield className="w-3 h-3" />
              <span className="font-medium">Secure</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 pt-8 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1 text-xs text-gray-400 mb-6">
            <span>Marketplace</span>
            <ChevronRight className="w-3 h-3" />
            <span>Sign In</span>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
            <div className="mb-6">
              <h1
                className="text-2xl font-bold text-gray-900 mb-1"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Sign in to your account
              </h1>
              <p className="text-gray-500 text-sm">
                Log in to list your item on the marketplace
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email address
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  placeholder="you@example.com"
                  className={`w-full border rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-200
                    ${errors.email
                      ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200"
                      : "border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    }`}
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                    <span>⚠</span> {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                    }}
                    placeholder="Enter your password"
                    className={`w-full border rounded-lg px-3 py-2.5 pr-10 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-200
                      ${errors.password
                        ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200"
                        : "border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      }`}
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                    <span>⚠</span> {errors.password}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 w-4 h-4" />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <button type="button" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 rounded-lg py-2.5 text-white font-semibold transition-all duration-200 shadow-sm"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </>
                )}
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400 hover:bg-gray-50 rounded-lg py-2.5 text-gray-700 font-medium transition-all duration-200 text-sm"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <UserPlus className="w-4 h-4" />
                Create Account
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            By signing in, you agree to the Luminary Marketplace{" "}
            <button className="text-blue-500 hover:underline">Terms of Service</button>
          </p>
        </div>
      </div>
    </div>
  );
}
