import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Gift, Copy, Check, Calendar, CreditCard, Home, ShoppingBag, Package } from "lucide-react";

// Mock gift cards data
const mockGiftCards = [
  {
    code: "GC-8K2M-9PLN-4WX7",
    pin: "7392",
    expiryDate: "December 2027",
    amount: 3672.00,
    productName: "Luminary Chronograph X1",
    issuedDate: "2026-04-15",
    corrId: "CORR-001"
  },
  {
    code: "GC-5TH3-6QRP-2YZ9",
    pin: "4851",
    expiryDate: "January 2028",
    amount: 2890.50,
    productName: "Stellar Diver Pro",
    issuedDate: "2026-03-22",
    corrId: "CORR-002"
  },
  {
    code: "GC-1NV7-8KLM-3BC5",
    pin: "6204",
    expiryDate: "November 2027",
    amount: 4536.75,
    productName: "Heritage Automatic",
    issuedDate: "2026-02-10",
    corrId: "CORR-003"
  },
  {
    code: "GC-9XF4-2DGH-7MN1",
    pin: "3947",
    expiryDate: "October 2027",
    amount: 3128.25,
    productName: "Aviator GMT",
    issuedDate: "2026-01-18",
    corrId: "CORR-004"
  }
];

export default function MyGiftCards() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  function handleCopy(code: string, index: number) {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  }

  const giftCards = mockGiftCards;
  const hasGiftCards = giftCards.length > 0;

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
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1
              className="text-3xl sm:text-4xl font-bold text-white mb-3"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              My Gift Cards
            </h1>
            <p className="text-white/50 text-base">
              You have {giftCards.length} gift card{giftCards.length > 1 ? 's' : ''} available
            </p>
          </div>

          {/* Gift Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {giftCards.map((card, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-3xl shadow-2xl shadow-[#F5A623]/10"
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

                <div className="relative p-6">
                  <div className="flex items-start justify-between mb-6">
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
                    <div className="text-2xl font-bold text-white">
                      ${card.amount.toFixed(2)} USD
                    </div>
                  </div>

                  <div className="flex items-end justify-between">
                    <div className="flex-1">
                      <div className="text-white text-[10px] tracking-widest mb-1 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        CARD NUMBER
                      </div>
                      <div
                        className="text-white text-base font-semibold tracking-widest"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {card.code}
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy(card.code, index)}
                      className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 rounded-lg px-3 py-1.5 text-white/60 text-xs transition-all duration-200"
                    >
                      {copiedIndex === index ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                      {copiedIndex === index ? "Copied!" : "Copy"}
                    </button>
                  </div>

                  {/* Product name */}
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 text-white/40 text-xs">
                      <Package className="w-3 h-3" />
                      <span>{card.productName}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Card Details Section - Show for most recent card */}
          {hasGiftCards && giftCards[giftCards.length - 1] && (
            <div className="bg-[#0d1f3c]/80 border border-white/10 rounded-2xl p-6 mb-8 shadow-xl">
              <h2
                className="text-xs font-semibold text-white tracking-widest uppercase mb-4"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Latest Card Details
              </h2>
              <div className="space-y-3">
                {[
                  { icon: <CreditCard className="w-4 h-4" />, label: "Card Number", value: giftCards[giftCards.length - 1].code },
                  { icon: <Gift className="w-4 h-4" />, label: "PIN", value: giftCards[giftCards.length - 1].pin },
                  { icon: <Calendar className="w-4 h-4" />, label: "Valid Until", value: giftCards[giftCards.length - 1].expiryDate },
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
