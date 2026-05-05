import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  ChevronDown,
  ShoppingBag,
  Star,
  TrendingUp,
  Shield,
  ArrowRight,
  Sparkles,
  Gift,
} from "lucide-react";

const products = [
  {
    id: 1,
    name: "Luminary Chronograph X1",
    price: "$1,200",
    originalPrice: "$2,450",
    discount: "-51%",
    condition: "EON Certified",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
    seller: "watch_vault",
    rating: 4.9,
  },
  {
    id: 2,
    name: "Stellar Diver Pro",
    price: "$950",
    originalPrice: "$3,200",
    discount: "-70%",
    condition: "Excellent",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400&q=80",
    seller: "luxury_resale",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Heritage Automatic",
    price: "$2,100",
    originalPrice: "$4,800",
    discount: "-56%",
    condition: "NWT",
    image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=400&q=80",
    seller: "timepiece_co",
    rating: 5.0,
  },
  {
    id: 4,
    name: "Aviator GMT",
    price: "$1,400",
    originalPrice: "$2,850",
    discount: "-51%",
    condition: "Excellent",
    image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=400&q=80",
    seller: "pilot_watches",
    rating: 4.7,
  },
  {
    id: 5,
    name: "Moonphase Elite",
    price: "$2,800",
    originalPrice: "$5,500",
    discount: "-49%",
    condition: "EON Certified",
    image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&q=80",
    seller: "elite_horology",
    rating: 4.9,
  },
  {
    id: 6,
    name: "Sport Titanium",
    price: "$1,750",
    originalPrice: "$3,600",
    discount: "-51%",
    condition: "NWT",
    image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=400&q=80",
    seller: "sport_luxe",
    rating: 4.6,
  },
];

const categories = [
  { label: "Chronographs", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80", trend: "+25%" },
  { label: "Dive Watches", image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400&q=80", trend: "+18%" },
  { label: "Vintage", image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=400&q=80", trend: "+32%" },
  { label: "GMT / Pilot", image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=400&q=80", trend: "+12%" },
];

const conditionColor: Record<string, string> = {
  "EON Certified": "bg-[#F5A623]/20 text-[#F5A623] border border-[#F5A623]/30",
  "Excellent": "bg-purple-500/20 text-purple-300 border border-purple-500/30",
  "NWT": "bg-green-500/20 text-green-300 border border-green-500/30",
};

export default function MarketplaceHome() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A1931] text-white">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0A1931] via-[#0d1f3c] to-[#060f1f] pointer-events-none" />

      {/* Header */}
      <header className="relative z-50 px-6 py-4 border-b border-white/10 bg-[#0A1931]/80 backdrop-blur-sm sticky top-0">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div
            className="text-xl font-black tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            LUMINARY
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-white/60">
            {["Browse", "Collections", "Trending", "Sell"].map((item) => (
              <button
                key={item}
                className="hover:text-[#F5A623] transition-colors"
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">

            {/* User menu */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#F5A623]/30 rounded-full p-2 transition"
                aria-label="User menu"
              >
                <User className="w-5 h-5 text-white/70" />
                <ChevronDown className={`w-3.5 h-3.5 text-white/40 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-48 bg-[#0d1f3c] border border-white/10 rounded-xl shadow-xl shadow-black/40 z-[100]">
                  <button
                    onClick={() => { setOpen(false); navigate("/past-orders"); }}
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#F5A623] pointer-events-none" />
                    <span className="pointer-events-none">My Orders</span>
                  </button>
                  <button
                    onClick={() => navigate("/giftcard")}
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition"
                  >
                    <Gift className="w-4 h-4 text-[#F5A623] pointer-events-none" />
                    Gift Cards
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </header>

      <div className="relative z-10">

        {/* Hero */}
        <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#F5A623]/10 border border-[#F5A623]/20 rounded-full px-4 py-1.5 mb-6">
              <Sparkles className="w-3 h-3 text-[#F5A623]" />
              <span className="text-[#F5A623] text-xs font-semibold tracking-[0.2em]">
                AUTHENTICATED RESALE MARKETPLACE
              </span>
            </div>
            <h1
              className="text-5xl font-black leading-tight mb-6"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Discover <span className="text-[#F5A623]">LUMINARY</span>
              <br />Preloved Timepieces
            </h1>
            <p className="text-white/50 text-lg leading-relaxed mb-8 max-w-md">
              Verified authentic watches from trusted sellers. Every piece EON-certified with full buyer protection.
            </p>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 bg-[#F5A623] hover:bg-[#e8961a] text-[#0A1931] font-bold px-6 py-3 rounded-xl transition shadow-lg shadow-[#F5A623]/20">
                Shop Now <ArrowRight className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-xl transition">
                View Collections
              </button>
            </div>
          </div>

          {/* Hero image grid */}
          <div className="relative grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden h-52 shadow-xl rotate-2 hover:rotate-0 transition-transform duration-300">
                <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80" className="w-full h-full object-cover opacity-90" alt="" />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="rounded-2xl overflow-hidden h-52 shadow-xl -rotate-2 hover:rotate-0 transition-transform duration-300">
                <img src="https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600&q=80" className="w-full h-full object-cover opacity-90" alt="" />
              </div>
            </div>
            <div className="absolute -top-3 -left-3 bg-[#0d1f3c] border border-white/10 rounded-full px-4 py-1.5 shadow-lg">
              <span className="text-sm font-semibold text-white">Up to 70% off</span>
            </div>
            <div className="absolute -bottom-3 -right-3 bg-[#F5A623] rounded-full px-4 py-1.5 shadow-lg">
              <span className="text-sm font-bold text-[#0A1931]">Buyer Protected</span>
            </div>
          </div>
        </section>

        {/* Trending Categories */}
        <section className="bg-[#0d1f3c]/50 py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-black" style={{ fontFamily: "'Syne', sans-serif" }}>
                Trending Categories
              </h2>
              <p className="text-white/40 text-sm mt-1">Most popular styles this week</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((cat) => (
                <div
                  key={cat.label}
                  className="relative rounded-2xl overflow-hidden h-48 cursor-pointer group border border-white/10 hover:border-[#F5A623]/30 transition"
                >
                  <img src={cat.image} alt={cat.label} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1931]/80 via-transparent to-transparent" />
                  <div className="absolute top-3 right-3">
                    <span className="flex items-center gap-1 bg-green-500/20 border border-green-500/30 text-green-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      <TrendingUp className="w-2.5 h-2.5" />{cat.trend}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <p className="text-white font-bold text-sm" style={{ fontFamily: "'Syne', sans-serif" }}>{cat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* New Arrivals */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-2xl font-black" style={{ fontFamily: "'Syne', sans-serif" }}>New Arrivals</h2>
                <p className="text-white/40 text-sm mt-1">Fresh finds from the marketplace</p>
              </div>
              <button className="flex items-center gap-2 text-sm text-white/50 hover:text-[#F5A623] transition border border-white/10 hover:border-[#F5A623]/30 px-4 py-2 rounded-xl">
                View All <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#0d1f3c]/80 border border-white/10 rounded-2xl overflow-hidden hover:border-[#F5A623]/20 hover:scale-[1.02] transition-all duration-300 shadow-xl shadow-black/30"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-90" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1931]/60 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${conditionColor[item.condition] ?? "bg-white/10 text-white/60"}`}>
                        {item.condition}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="bg-[#F5A623]/90 text-[#0A1931] text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {item.discount}
                      </span>
                    </div>
                    {/* EON badge */}
                    <div className="absolute bottom-3 right-3 bg-[#0A1931]/90 border border-[#F5A623]/30 rounded-lg px-2 py-1">
                      <div className="flex items-center gap-1">
                        <Shield className="w-3 h-3 text-[#F5A623]" />
                        <span className="text-[9px] text-[#F5A623] font-bold tracking-widest">EON</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-white mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-1 mb-3">
                      <Star className="w-3 h-3 fill-[#F5A623] text-[#F5A623]" />
                      <span className="text-xs text-white/40">{item.rating} ({item.seller})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-black text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
                          {item.price}
                        </span>
                        <span className="text-xs text-white/30 line-through">{item.originalPrice}</span>
                      </div>
                      <button className="bg-[#F5A623]/10 hover:bg-[#F5A623] border border-[#F5A623]/30 hover:border-[#F5A623] text-[#F5A623] hover:text-[#0A1931] text-xs font-bold px-3 py-1.5 rounded-lg transition">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why section */}
        <section className="bg-[#0d1f3c]/50 py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-black mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
                Why Shop LUMINARY Preloved?
              </h2>
              <p className="text-white/40 text-sm">Authentic pieces, verified sellers, and peace of mind</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: <Star className="w-6 h-6 text-[#F5A623]" />, title: "Authentic Items", desc: "Every item is EON-verified with detailed condition photos and provenance tracking." },
                { icon: <Shield className="w-6 h-6 text-[#F5A623]" />, title: "Buyer Protection", desc: "Full marketplace buyer protection on every purchase, no questions asked." },
                { icon: <TrendingUp className="w-6 h-6 text-[#F5A623]" />, title: "Great Prices", desc: "Pre-loved luxury at up to 70% off retail. Resell anytime with EON certification." },
              ].map((item) => (
                <div key={item.title} className="bg-[#0d1f3c]/80 border border-white/10 rounded-2xl p-6 text-center hover:border-[#F5A623]/20 transition">
                  <div className="w-12 h-12 mx-auto mb-4 bg-[#F5A623]/10 border border-[#F5A623]/20 rounded-xl flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-white mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>{item.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
