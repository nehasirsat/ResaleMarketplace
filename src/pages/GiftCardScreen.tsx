import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useResale } from "@/context/ResaleContext";
import { issueGiftCard } from "@/lib/mockApi";
import { Gift, Copy, Check, Calendar, CreditCard, Tag, RefreshCw, Home, ShoppingBag } from "lucide-react";

export default function GiftCardScreen() {
  const navigate = useNavigate();
  const { giftCardData, setGiftCardData, netProceeds, product, setCurrentStep, orderDetails } = useResale();
  const [visible, setVisible] = useState(false);
  const [pulsing, setPulsing] = useState(true);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(!giftCardData);
  const [error, setError] = useState<string | null>(null);

  // Fall back to URL param if context is empty (coming from marketplace tab redirect)
  const searchParams = new URLSearchParams(window.location.search);
  const urlNetProceeds = searchParams.get('net_proceeds');
  const amount = netProceeds || (urlNetProceeds ? parseFloat(urlNetProceeds) : product.price * 0.765);

  async function fetchGiftCard() {
    setLoading(true);
    setError(null);
    try {
      const orderId = orderDetails?.orderId || `ORD-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      const data = await issueGiftCard(orderId, amount);
      setGiftCardData(data);
    } catch (e: any) {
      setError(e.message || "Failed to issue gift card.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setCurrentStep(6);
    const t = setTimeout(() => setVisible(true), 50);
    const pulseT = setTimeout(() => setPulsing(false), 2000);
    if (!giftCardData) fetchGiftCard();
    return () => {
      clearTimeout(t);
      clearTimeout(pulseT);
    };
  }, []);

  function handleCopy() {
    if (giftCardData?.code) {
      navigator.clipboard.writeText(giftCardData.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div
      className={`min-h-screen bg-[#0A1931] transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}`}
    >

      <div className="fixed inset-0 bg-gradient-to-br from-[#0A1931] via-[#0d1f3c] to-[#060f1f] pointer-events-none" />
      <div
        className="fixed inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle at 50% 30%, #F5A623 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 pt-10 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1
              className="text-3xl sm:text-4xl font-bold text-white mb-3"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Your Gift Card is Ready!
            </h1>
            <p className="text-white/50 text-base">
              Redeemable at any LUMINARY authorized retailer worldwide.
            </p>
          </div>

          {/* Gift Card */}
          <div className="mb-8">
            {loading ? (
              <div className="h-56 bg-[#0d1f3c]/60 border border-white/10 rounded-3xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-10 h-10 border-2 border-[#F5A623]/20 border-t-[#F5A623] rounded-full animate-spin mx-auto mb-3" />
                  <div className="text-white/40 text-sm">Issuing gift card...</div>
                </div>
              </div>
            ) : error ? (
              <div className="h-56 bg-red-950/30 border border-red-500/20 rounded-3xl flex flex-col items-center justify-center gap-4">
                <div className="text-red-400 text-sm">{error}</div>
                <button
                  onClick={fetchGiftCard}
                  className="flex items-center gap-2 bg-[#F5A623] hover:bg-[#e8961a] rounded-lg px-4 py-2 text-[#0A1931] font-bold text-sm transition-all"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  <RefreshCw className="w-4 h-4" />
                  Retry
                </button>
              </div>
            ) : (
              <div
                className={`relative overflow-hidden rounded-3xl shadow-2xl shadow-[#F5A623]/10 cursor-pointer select-none
                  ${pulsing ? "animate-pulse" : ""}
                `}
                style={{
                  background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 70%, #1a1a2e 100%)",
                  border: "1px solid rgba(245,166,35,0.2)",
                }}
              >
                {/* Decorative background */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-[#F5A623]/5" />
                  <div className="absolute -bottom-10 -left-10 w-64 h-64 rounded-full bg-blue-500/5" />
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#F5A623]/50 to-transparent" />
                </div>

                <div className="relative p-6 md:p-8">
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <div
                        className="text-[#F5A623] text-xs font-bold tracking-[0.3em] mb-1"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        LUMINARY
                      </div>
                      <div
                        className="text-white text-[10px] tracking-widest font-semibold"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        RESALE GIFT CARD
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-[#F5A623]/10 border border-[#F5A623]/20 flex items-center justify-center">
                      <Gift className="w-5 h-5 text-[#F5A623]" />
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-white text-[10px] tracking-widest mb-1 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      VALUE
                    </div>
                    <div className="text-3xl font-bold text-white">
                      ${amount.toFixed(2)} USD
                    </div>
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-white text-[10px] tracking-widest mb-1 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        CARD NUMBER
                      </div>
                      <div
                        className="text-white text-lg font-semibold tracking-widest"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {giftCardData?.code || "-- ---- ----"}
                      </div>
                    </div>
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 rounded-lg px-3 py-1.5 text-white/60 text-xs transition-all duration-200"
                    >
                      {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Details Panel */}
          {giftCardData && !loading && (
            <div className="bg-[#0d1f3c]/80 border border-white/10 rounded-2xl p-6 mb-6 shadow-xl">
              <h2
                className="text-xs font-semibold text-white tracking-widest uppercase mb-4"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Card Details
              </h2>
              <div className="space-y-3">
                {[
                  { icon: <CreditCard className="w-4 h-4" />, label: "Card Number", value: giftCardData.code },
                  { icon: <Tag className="w-4 h-4" />, label: "PIN", value: giftCardData.pin },
                  { icon: <Calendar className="w-4 h-4" />, label: "Valid Until", value: giftCardData.expiryDate },
                  { icon: <ShoppingBag className="w-4 h-4" />, label: "Redeemable At", value: "Any LUMINARY Retailer" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-3 px-4 bg-white/5 rounded-lg border border-white/5">
                    <div className="flex items-center gap-2 text-white">
                      {item.icon}
                      <span className="text-sm font-semibold">{item.label}</span>
                    </div>
                    <span
                      className="text-white text-sm font-semibold"
                      style={item.label === "Card Number" || item.label === "PIN" ? { fontFamily: "'JetBrains Mono', monospace" } : {}}
                    >
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* How to redeem */}
          <div className="bg-[#0d1f3c]/80 border border-white/10 rounded-2xl p-6 mb-8 shadow-xl">
            <h2
              className="text-xs font-semibold text-white tracking-widest uppercase mb-5"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              How to Redeem
            </h2>
            <div className="space-y-4">
              {[
                { step: "01", title: "Visit any LUMINARY retailer", desc: "In-store or online at luminary.com — your card works everywhere." },
                { step: "02", title: "Enter card number & PIN", desc: "Use the card number and PIN above at checkout to apply your balance." },
                { step: "03", title: "Enjoy your purchase", desc: "Balance never expires. Use it all at once or across multiple purchases." },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 items-start">
                  <div
                    className="text-[#F5A623]/40 text-xs font-bold mt-0.5 w-6 shrink-0"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {item.step}
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold mb-0.5">{item.title}</div>
                    <div className="text-white/40 text-xs leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Back to Shop */}
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center justify-center gap-2 border border-[#F5A623]/20 bg-[#F5A623]/5 hover:bg-[#F5A623]/10 rounded-xl py-3.5 text-[#F5A623] font-semibold transition-all duration-200"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <Home className="w-4 h-4" />
            Back to Shop
          </button>
        </div>
      </div>
    </div>
  );
}
