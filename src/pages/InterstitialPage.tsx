import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useResale } from "@/context/ResaleContext";
import ProgressStepper from "@/components/ProgressStepper";
import CorrelationBadge from "@/components/CorrelationBadge";
import { Gift, ArrowRight, ArrowLeft, CreditCard, Package } from "lucide-react";

export default function InterstitialPage() {
  const navigate = useNavigate();
  const { product, corrId, setCurrentStep } = useResale();
  const [visible, setVisible] = useState(false);

  const netProceeds = (product.price * 0.85 * 0.9).toFixed(2);

  useEffect(() => {
    setCurrentStep(1);
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`min-h-screen bg-[#0A1931] transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}`}
    >
      <ProgressStepper />
      <CorrelationBadge />

      <div className="fixed inset-0 bg-gradient-to-br from-[#0A1931] via-[#0d1f3c] to-[#060f1f] pointer-events-none" />

      <div className="relative z-10 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Icon header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#F5A623]/10 border border-[#F5A623]/20 mb-6 shadow-lg shadow-[#F5A623]/10">
              <Gift className="w-8 h-8 text-[#F5A623]" />
            </div>
            <h1
              className="text-3xl sm:text-4xl font-black text-white mb-3"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Resell for a Gift Card
            </h1>
            <p className="text-white/50 text-base leading-relaxed max-w-md mx-auto">
              List your item on our marketplace and receive instant payment as a gift card — redeemable at any LUMINARY retailer.
            </p>
          </div>

          {/* Info Card */}
          <div className="bg-[#0d1f3c]/80 border border-white/10 rounded-2xl p-6 md:p-8 mb-6 shadow-xl ring-1 ring-yellow-400/5">
            <h3
              className="text-sm font-semibold text-[#F5A623] tracking-widest uppercase mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              How It Works
            </h3>
            <div className="space-y-4">
              {[
                { step: "01", title: "List on Marketplace", desc: "Your item is listed with your EON certificate for verified authenticity." },
                { step: "02", title: "Sale Confirmed", desc: "When a buyer purchases, the sale is confirmed and payment is processed." },
                { step: "03", title: "Receive Gift Card", desc: "Your net proceeds are instantly loaded onto a LUMINARY gift card." },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div
                    className="text-[#F5A623]/40 text-xs font-bold mt-0.5 w-6 shrink-0"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {item.step}
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold mb-0.5">{item.title}</div>
                    <div className="text-white/40 text-sm">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Row */}
          <div className="bg-[#0d1f3c]/80 border border-white/10 rounded-2xl p-5 mb-8 shadow-xl">
            <h3
              className="text-xs font-semibold text-white/40 tracking-widest uppercase mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Transaction Summary
            </h3>
            <div className="grid grid-cols-3 divide-x divide-white/10">
              <div className="flex flex-col items-center gap-1 px-3">
                <Package className="w-4 h-4 text-white/30 mb-1" />
                <div className="text-[10px] text-white/40 uppercase tracking-widest">Item</div>
                <div className="text-white text-sm font-semibold text-center leading-tight">{product.name}</div>
              </div>
              <div className="flex flex-col items-center gap-1 px-3">
                <Gift className="w-4 h-4 text-[#F5A623]/60 mb-1" />
                <div className="text-[10px] text-white/40 uppercase tracking-widest">Payout</div>
                <div className="text-[#F5A623] text-sm font-bold">${netProceeds}</div>
              </div>
              <div className="flex flex-col items-center gap-1 px-3">
                <CreditCard className="w-4 h-4 text-white/30 mb-1" />
                <div className="text-[10px] text-white/40 uppercase tracking-widest">Method</div>
                <div className="text-white text-sm font-semibold">Gift Card</div>
              </div>
            </div>
          </div>

          {/* Corr ID */}
          {corrId && (
            <div className="flex items-center gap-2 mb-8 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
              <div className="text-white/30 text-xs">Transaction ID:</div>
              <div
                className="text-[#F5A623]/70 text-xs tracking-widest"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {corrId}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 border border-white/10 bg-white/5 hover:bg-white/10 rounded-xl px-5 py-3.5 text-white/60 font-semibold transition-all duration-200"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
            <button
              onClick={() => navigate("/redirect")}
              className="flex-1 flex items-center justify-center gap-2 bg-[#F5A623] hover:bg-[#e8961a] rounded-xl py-3.5 text-[#0A1931] font-bold transition-all duration-200 shadow-lg shadow-[#F5A623]/20"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Proceed to Marketplace
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
