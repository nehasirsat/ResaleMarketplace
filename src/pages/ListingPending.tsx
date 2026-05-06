import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useResale } from "@/context/ResaleContext";
import { ArrowRight, RefreshCw, Gift, Clock, ShieldCheck } from "lucide-react";

export default function ListingPending() {
  const navigate = useNavigate();
  const { product, netProceeds, listingId, setCurrentStep } = useResale();
  const [checking, setChecking] = useState(false);
  const [pulse, setPulse] = useState(true);
  const [elapsed, setElapsed] = useState(0);

  const salePrice = product.price * 0.85;
  const net = netProceeds || (salePrice - salePrice * 0.1);
  const displayListingId = listingId || "LST-NEW";

  useEffect(() => {
    setCurrentStep(4);
    const pulseInterval = setInterval(() => setPulse((p) => !p), 1500);
    const elapsedInterval = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => { clearInterval(pulseInterval); clearInterval(elapsedInterval); };
  }, []);

  function formatElapsed(s: number) {
    if (s < 60) return `${s}s`;
    return `${Math.floor(s / 60)}m ${s % 60}s`;
  }

  function handleCheckStatus() {
    setChecking(true);
    setTimeout(() => navigate("/marketplace/sale-confirmation"), 1200);
  }

  return (
    <div className="min-h-screen bg-[#0A1931] text-white">
      <div className="fixed inset-0 bg-gradient-to-br from-[#0A1931] via-[#0d1f3c] to-[#060f1f] pointer-events-none" />

      <div className="relative z-10 pt-10 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto space-y-4">

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
              LUMINARY
            </h1>
            <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#F5A623] to-transparent mx-auto" />
          </div>

          {/* Active listing card */}
          <div className="bg-[#0d1f3c] border border-[#F5A623]/30 rounded-2xl p-6 shadow-xl shadow-[#F5A623]/5">
            {/* Status row */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full bg-amber-400 ${pulse ? "opacity-100" : "opacity-30"} transition-opacity duration-700`} />
                <span className="text-[#F5A623] text-xs font-bold tracking-widest uppercase">Active Listing</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/30 text-[11px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                <Clock className="w-3 h-3" />
                {formatElapsed(elapsed)}
              </div>
            </div>

            {/* Item info */}
            <div className="mb-5">
              <div className="text-white font-bold text-xl mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>
                {product.name}
              </div>
              <div className="text-white/35 text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {displayListingId}
              </div>
            </div>

            {/* Net proceeds highlight */}
            <div className="bg-[#F5A623]/10 border border-[#F5A623]/20 rounded-xl p-4 mb-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-amber-400/70 text-[11px] font-semibold uppercase tracking-wider mb-1">Net Proceeds</div>
                  <div className="text-[#F5A623] text-3xl font-bold">${net.toFixed(2)}</div>
                </div>
                <div className="text-right">
                  <div className="text-white/40 text-[11px] mb-1">Payout type</div>
                  <div className="flex items-center gap-1.5 text-amber-400 font-semibold text-sm">
                    <Gift className="w-4 h-4" />
                    Gift Card
                  </div>
                </div>
              </div>
            </div>

            {/* Check status button */}
            <button
              onClick={handleCheckStatus}
              disabled={checking}
              className="w-full flex items-center justify-center gap-2 bg-[#F5A623] hover:bg-[#e8961a] disabled:opacity-60 text-[#0A1931] font-bold py-3 rounded-xl transition-all text-sm"
            >
              {checking ? (
                <><RefreshCw className="w-4 h-4 animate-spin" /> Checking...</>
              ) : (
                <>Check Status <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </div>

          {/* Info cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#0d1f3c]/80 border border-white/5 rounded-xl p-4">
              <ShieldCheck className="w-5 h-5 text-blue-400 mb-2" />
              <div className="text-white text-sm font-semibold mb-0.5">Authenticated</div>
              <div className="text-white/40 text-xs">EON verified item, locked for sale</div>
            </div>
            <div className="bg-[#0d1f3c]/80 border border-white/5 rounded-xl p-4">
              <Gift className="w-5 h-5 text-amber-400 mb-2" />
              <div className="text-white text-sm font-semibold mb-0.5">Gift Card Payout</div>
              <div className="text-white/40 text-xs">Issued by LUMINARY on sale</div>
            </div>
          </div>

          <div className="text-center pt-2">
            <button onClick={() => navigate("/")} className="text-white/25 hover:text-white/50 text-sm transition">
              Back to Home
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
