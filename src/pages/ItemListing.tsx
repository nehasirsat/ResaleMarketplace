import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useResale } from "@/context/ResaleContext";
import { submitListing } from "@/lib/mockApi";
import { Shield, Lock, DollarSign, ImageIcon } from "lucide-react";

export default function ItemListing() {
  const navigate = useNavigate();
  const { product, corrId, setCurrentStep, setListingId, setNetProceeds } = useResale();

  const [price, setPrice] = useState(product.price.toString());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCurrentStep(4);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await submitListing(corrId || "", parseFloat(price));
      setListingId(result.listingId);
      setNetProceeds(parseFloat(price) * 0.765);
      navigate("/sale-confirmation");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0A1931] text-white">

      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0A1931] via-[#0d1f3c] to-[#060f1f]" />

      <div className="relative z-10 px-4 py-10">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="mb-8">
            <h1
              className="text-3xl font-black tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Create Listing
            </h1>
            <p className="text-white/40 text-sm mt-1">
              Review your authenticated item details
            </p>
          </div>

          {/* Auth Banner */}
          <div className="bg-[#F5A623]/10 border border-[#F5A623]/20 rounded-xl p-4 mb-6 flex gap-3 items-start">
            <Shield className="text-[#F5A623] mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-[#F5A623]">
                Digital Authentication Active
              </p>
              <p className="text-xs text-white/40">
                Verified data is locked and cannot be edited
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Card */}
            <div className="bg-[#0d1f3c]/80 backdrop-blur border border-white/10 rounded-2xl p-6 space-y-6 shadow-xl">

              {/* Section Title */}
              <div className="text-xs text-white/30 uppercase tracking-widest">
                Item Details
              </div>

              {/* Name */}
              <div>
                <label className="text-xs text-white/40 flex gap-2 items-center">
                  Item Name <Lock size={12} />
                </label>
                <input
                  readOnly
                  value={product.name}
                  className="mt-1 w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/50"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-xs text-white/40 flex gap-2 items-center">
                  Description <Lock size={12} />
                </label>
                <textarea
                  readOnly
                  value={product.description}
                  rows={3}
                  className="mt-1 w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/50 resize-none"
                />
              </div>

              {/* Images */}
              <div>
                <label className="text-xs text-white/40 flex gap-2 items-center mb-2">
                  <ImageIcon className="w-4 h-4" />
                  Photos <Lock size={12} />
                </label>

                <div className="flex gap-3">
                  {[
                    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=60",
                    "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=200&q=60",
                    "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=200&q=60",
                  ].map((src, i) => (
                    <div
                      key={i}
                      className="relative w-20 h-20 rounded-lg overflow-hidden border border-white/10 bg-black/30"
                    >
                      <img
                        src={src}
                        alt=""
                        className="w-full h-full object-cover opacity-80"
                      />

                      {/* MAIN TAG */}
                      {i === 0 && (
                        <div className="absolute bottom-0 left-0 right-0 bg-[#F5A623]/90 text-[#0A1931] text-[9px] font-bold text-center py-0.5">
                          MAIN
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Section */}
              <div className="border-t border-white/10 pt-5">
                <label className="text-sm font-semibold text-white">
                  Listing Price
                  <span className="ml-2 text-xs text-[#F5A623]">(Editable)</span>
                </label>

                <div className="relative mt-2">
                  <DollarSign
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
                    size={16}
                  />
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-black/40 border border-white/10 rounded-lg text-white font-semibold outline-none focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/20 transition"
                  />
                </div>

                {/* Fee + Payout */}
                <div className="flex justify-between mt-3 text-xs">
                  <span className="text-white/40">Platform fee: 23.5%</span>
                  <span className="text-[#F5A623] font-semibold">
                    Est. payout: ${(parseFloat(price || "0") * 0.765).toFixed(2)}
                  </span>
                </div>
              </div>

            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#F5A623] hover:bg-[#e8961a] py-3.5 rounded-xl text-[#0A1931] font-bold transition-all duration-200 shadow-lg shadow-[#F5A623]/20 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#0A1931]/30 border-t-[#0A1931] rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Listing"
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}