import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useResale } from "@/context/ResaleContext";
import { initiateResale, mockProducts, Product } from "@/lib/mockApi";
import {
  ShoppingCart,
  Tag,
  Shield,
  Star,
  Package,
  Home,
  CalendarDays,
} from "lucide-react";

export default function ProductPage() {
  const navigate = useNavigate();
  const { setCorrId, setCurrentStep, setProduct } = useResale();
  const [visible, setVisible] = useState(false);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  useEffect(() => {
    setCurrentStep(0);
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  async function handleResellClick(prod: Product) {
    setLoadingId(prod.id);
    try {
      setProduct(prod);
      const { correlation_id, interstitial_url } = await initiateResale(
        "user_123",
        prod.id
      );
      setCorrId(correlation_id);
      setCurrentStep(1);
      navigate(interstitial_url);
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <div
      className={`min-h-screen bg-[#0A1931] transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="fixed inset-0 bg-gradient-to-br from-[#0A1931] via-[#0d1f3c] to-[#060f1f] pointer-events-none" />
      <div
        className="fixed inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, #F5A623 0%, transparent 50%), radial-gradient(circle at 80% 20%, #1a3a6e 0%, transparent 40%)",
        }}
      />

      <div className="relative z-10 pt-0 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          <header className="flex justify-between items-center py-4 mb-8 border-b border-white/10">
            <div className="text-xl font-black tracking-tight text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
              LUMINARY
            </div>
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 hover:bg-white/10 transition text-white/60 hover:text-white"
            >
              <Home className="w-4 h-4" />
            </button>
          </header>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#F5A623]/10 border border-[#F5A623]/20 rounded-full px-4 py-1.5 mb-6">
              <Star className="w-3 h-3 text-[#F5A623] fill-[#F5A623]" />
              <span className="text-[#F5A623] text-xs font-semibold tracking-[0.2em]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                LIMITED EDITION COLLECTION
              </span>
              <Star className="w-3 h-3 text-[#F5A623] fill-[#F5A623]" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
              LUMINARY
            </h1>
            <div className="mt-2 h-[2px] w-24 bg-gradient-to-r from-transparent via-[#F5A623] to-transparent mx-auto" />
          </div>

          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px flex-1 bg-white/10 max-w-xs" />
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5">
              <Package className="w-3.5 h-3.5 text-[#F5A623]" />
              <span className="text-white/50 text-xs tracking-widest uppercase">Past Orders</span>
            </div>
            <div className="h-px flex-1 bg-white/10 max-w-xs" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-[#0d1f3c]/80 border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-yellow-400/10 hover:ring-yellow-400/20 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="relative overflow-hidden bg-slate-900/80 h-64 flex items-center justify-center">
                  <img src={prod.image} alt={prod.name} className="max-h-64 w-full object-contain" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1931]/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 right-3">
                    <div className="bg-[#0A1931]/90 backdrop-blur-sm border border-[#F5A623]/30 rounded-lg px-2 py-1.5 shadow-lg">
                      <div className="flex items-center gap-1.5">
                        <Shield className="w-3 h-3 text-[#F5A623]" />
                        <div className="text-[9px] text-[#F5A623] font-bold tracking-widest" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                          EON CERTIFIED
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3 text-white/30 text-xs">
                    <CalendarDays className="w-3 h-3" />
                    <span>Ordered 12 Jan 2024</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 bg-[#F5A623]/10 border border-[#F5A623]/20 rounded px-2 py-1 mb-3">
                    <Tag className="w-3 h-3 text-[#F5A623]" />
                    <span className="text-[#F5A623] text-[10px] font-medium tracking-widest" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {prod.sku}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-2 leading-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
                    {prod.name}
                  </h2>
                  <p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-2">{prod.description}</p>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-semibold text-white tracking-widest" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      ${prod.price.toLocaleString()} USD
                    </span>
                  </div>
                  <div className="space-y-2">
                    <button
                      disabled
                      className="w-full flex items-center justify-center gap-2 bg-white/5 border border-white/10 rounded-xl py-2.5 text-white/30 font-semibold cursor-not-allowed text-sm"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Buy Again
                    </button>
                    <button
                      onClick={() => handleResellClick(prod)}
                      disabled={loadingId === prod.id}
                      className="w-full flex items-center justify-center gap-2 bg-[#F5A623] hover:bg-[#e8961a] active:bg-[#d4861a] disabled:opacity-60 rounded-xl py-2.5 text-[#0A1931] font-bold transition-all duration-200 shadow-lg shadow-[#F5A623]/20 text-sm"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {loadingId === prod.id ? (
                        <div className="w-4 h-4 border-2 border-[#0A1931]/30 border-t-[#0A1931] rounded-full animate-spin" />
                      ) : (
                        <><Tag className="w-4 h-4" /> Resell Now</>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
