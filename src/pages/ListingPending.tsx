import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useResale } from "@/context/ResaleContext";
import { Clock, CheckCircle2, ArrowRight, RefreshCw, XCircle } from "lucide-react";

const DUMMY_LISTINGS = [
  { id: "LST-AX9K2M", item: "Luminary Chronograph X1", price: "$2,082.50", net: "$1,874.25", status: "sold", time: "Jan 12, 2025" },
  { id: "LST-BQ7R4N", item: "Stellar Diver Pro",        price: "$2,720.00", net: "$2,448.00", status: "sold", time: "Feb 3, 2025"  },
  { id: "LST-CW3T8P", item: "Heritage Automatic",       price: "$4,080.00", net: "$3,672.00", status: "sold", time: "Feb 28, 2025" },
  { id: "LST-DM5V1Q", item: "Aviator GMT",              price: "$2,422.50", net: "$2,180.25", status: "sold", time: "Mar 15, 2025" },
  { id: "LST-EN2J6R", item: "Moonphase Elite",          price: "$4,675.00", net: "$4,207.50", status: "sold", time: "Apr 1, 2025"  },
  { id: "LST-FP8K3S", item: "Sport Titanium",           price: "$3,060.00", net: "$2,754.00", status: "cancelled", time: "Apr 20, 2025" },
  { id: "LST-GR4L9T", item: "Luminary Chronograph X1", price: "$2,100.00", net: "$1,890.00", status: "sold", time: "Apr 30, 2025" },
];

const statusConfig = {
  sold:      { label: "Sold",      icon: CheckCircle2, color: "text-green-400",  bg: "bg-green-500/10",  border: "border-green-500/20"  },
  cancelled: { label: "Cancelled", icon: XCircle,      color: "text-red-400",    bg: "bg-red-500/10",    border: "border-red-500/20"    },
  pending:   { label: "Pending",   icon: Clock,        color: "text-amber-400",  bg: "bg-amber-500/10",  border: "border-amber-500/20"  },
};

export default function ListingPending() {
  const navigate = useNavigate();
  const { product, netProceeds, listingId, setCurrentStep } = useResale();
  const [checking, setChecking] = useState(false);
  const [pulse, setPulse] = useState(true);

  const net = netProceeds || product.price * 0.85;
  const displayListingId = listingId || "LST-NEW";

  useEffect(() => {
    setCurrentStep(4);
    const interval = setInterval(() => setPulse((p) => !p), 1500);
    return () => clearInterval(interval);
  }, []);

  function handleCheckStatus() {
    setChecking(true);
    setTimeout(() => navigate("/sale-confirmation"), 1200);
  }

  return (
    <div className="min-h-screen bg-[#0A1931] text-white">
      <div className="fixed inset-0 bg-gradient-to-br from-[#0A1931] via-[#0d1f3c] to-[#060f1f] pointer-events-none" />

      <div className="relative z-10 pt-10 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
              LUMINARY
            </h1>
            <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#F5A623] to-transparent mx-auto mb-6" />
            <p className="text-white/40 text-sm">Your listing history</p>
          </div>

          {/* Listing history feed */}
          <div className="bg-[#0d1f3c]/80 border border-white/10 rounded-2xl overflow-hidden shadow-xl mb-6">

            {/* Past listings — non-clickable */}
            {DUMMY_LISTINGS.map((listing) => {
              const cfg = statusConfig[listing.status as keyof typeof statusConfig];
              const Icon = cfg.icon;
              return (
                <div key={listing.id} className="flex items-center justify-between px-5 py-4 border-b border-white/5 opacity-60">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${cfg.bg}`}>
                      <Icon className={`w-4 h-4 ${cfg.color}`} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-white text-sm font-medium truncate">{listing.item}</div>
                      <div className="text-white/30 text-[10px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        {listing.id} · {listing.time}
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <div className="text-white text-sm font-semibold">{listing.net}</div>
                    <div className={`text-[10px] font-medium ${cfg.color}`}>{cfg.label}</div>
                  </div>
                </div>
              );
            })}

            {/* YOUR new listing — highlighted, with Check Status */}
            <div className="px-5 py-4 bg-[#F5A623]/5 border-t-2 border-[#F5A623]/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-amber-500/10 relative">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span className={`absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-amber-400 border-2 border-[#0d1f3c] ${pulse ? "opacity-100" : "opacity-0"} transition-opacity duration-700`} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-white text-sm font-bold truncate">{product.name}</div>
                    <div className="text-white/40 text-[10px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {displayListingId} · Just now
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                  <div className="text-right">
                    <div className="text-[#F5A623] text-sm font-bold">${net.toFixed(2)}</div>
                    <div className="text-amber-400 text-[10px] font-medium">Pending</div>
                  </div>
                  <button
                    onClick={handleCheckStatus}
                    disabled={checking}
                    className="flex items-center gap-1.5 bg-[#F5A623] hover:bg-[#e8961a] disabled:opacity-60 text-[#0A1931] text-xs font-bold px-3 py-2 rounded-lg transition-all"
                  >
                    {checking ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <>
                        Check Status
                        <ArrowRight className="w-3 h-3" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

          </div>

          <div className="text-center">
            <button onClick={() => navigate("/")} className="text-white/30 hover:text-white/60 text-sm transition">
              Back to Home
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
