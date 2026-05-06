import { useNavigate } from "react-router-dom";
import { Gift, Calendar, ArrowRight, ChevronLeft } from "lucide-react";

const mockGiftCards = [
  {
    id: "GC-001",
    code: "LUM-4821-9034",
    pin: "7823",
    amount: 892.5,
    issuedDate: "Jan 12, 2026",
    expiryDate: "Jan 12, 2028",
    status: "active",
  },
  {
    id: "GC-002",
    code: "LUM-7743-2210",
    pin: "4491",
    amount: 1240.0,
    issuedDate: "Mar 3, 2026",
    expiryDate: "Mar 3, 2028",
    status: "active",
  },
  {
    id: "GC-003",
    code: "LUM-3356-8801",
    pin: "9912",
    amount: 450.75,
    issuedDate: "Nov 20, 2025",
    expiryDate: "Nov 20, 2027",
    status: "redeemed",
  },
];

export default function GiftCardList() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A1931] text-white">
      <div className="fixed inset-0 bg-gradient-to-br from-[#0A1931] via-[#0d1f3c] to-[#060f1f] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 px-6 py-4 border-b border-white/10 bg-[#0A1931]/80 backdrop-blur-sm sticky top-0">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-white/50 hover:text-white transition text-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
          <h1 className="text-lg font-black" style={{ fontFamily: "'Syne', sans-serif" }}>
            My Gift Cards
          </h1>
        </div>
      </header>

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-10 space-y-4">
        {mockGiftCards.map((card) => (
          <button
            key={card.id}
            onClick={() => navigate(`/giftcard/${card.id}`, { state: { card } })}
            className="w-full text-left bg-[#0d1f3c]/80 border border-white/10 hover:border-[#F5A623]/30 rounded-2xl p-5 transition-all duration-200 hover:scale-[1.01] shadow-xl shadow-black/20 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#F5A623]/10 border border-[#F5A623]/20 flex items-center justify-center shrink-0">
                  <Gift className="w-5 h-5 text-[#F5A623]" />
                </div>
                <div>
                  <div
                    className="text-white font-bold text-sm tracking-widest mb-1"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {card.code}
                  </div>
                  <div className="text-2xl font-black text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
                    ${card.amount.toFixed(2)}
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-[#F5A623] transition-colors" />
            </div>

            <div className="mt-4 flex items-center gap-6 text-xs text-white/40">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                Issued: {card.issuedDate}
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                Expires: {card.expiryDate}
              </div>
              <span
                className={`ml-auto px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  card.status === "active"
                    ? "bg-green-500/15 text-green-400 border border-green-500/20"
                    : "bg-white/5 text-white/30 border border-white/10"
                }`}
              >
                {card.status}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
