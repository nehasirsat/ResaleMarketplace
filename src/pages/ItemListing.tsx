import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useResale } from "@/context/ResaleContext";
import { submitListing } from "@/lib/mockApi";
import { Shield, Tag, ChevronRight, Lock, DollarSign, ImageIcon } from "lucide-react";

export default function ItemListing() {
  const navigate = useNavigate();
  const { product, corrId, setCurrentStep, setListingId, setNetProceeds } = useResale();
  const [visible, setVisible] = useState(false);
  const [price, setPrice] = useState(product.price.toString());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCurrentStep(4);
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await submitListing(corrId || "", parseFloat(price));
      setListingId(result.listingId);
      const net = parseFloat(price) * 0.85 * 0.9;
      setNetProceeds(net);
      setCurrentStep(5);
      navigate("/sale-confirmation");
    } finally {
      setLoading(false);
    }
  }

  const thumbnails = [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=60",
    "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=200&q=60",
    "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=200&q=60",
  ];

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
                <div className="text-[10px] text-gray-400">List your item</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-green-600 text-xs bg-green-50 border border-green-200 rounded-full px-3 py-1">
              <Shield className="w-3 h-3" />
              <span className="font-medium">EON Verified</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 pt-6 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1 text-xs text-gray-400 mb-6">
            <span>Marketplace</span>
            <ChevronRight className="w-3 h-3" />
            <span>My Listings</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-700">Create Listing</span>
          </div>

          {/* EON Metadata Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 border border-blue-200 flex items-center justify-center shrink-0">
                <Shield className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <div className="text-sm font-semibold text-blue-900 mb-0.5">
                  EON Digital Authentication Active
                </div>
                <div className="text-xs text-blue-600 mb-2">
                  Item details have been pre-filled from your EON digital certificate. Authenticated fields are locked.
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Name", "Description", "Category", "Images", "Certificate"].map((f) => (
                    <span
                      key={f}
                      className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 text-[10px] font-medium rounded px-2 py-0.5"
                    >
                      <Lock className="w-2.5 h-2.5" />
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-4">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                <h2
                  className="text-base font-bold text-gray-900"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Item Details
                </h2>
              </div>
              <div className="p-6 space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                    Item Name
                    <Lock className="w-3 h-3 text-gray-400" />
                  </label>
                  <input
                    readOnly
                    value={product.name}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-500 bg-gray-50 cursor-not-allowed"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                    Description
                    <Lock className="w-3 h-3 text-gray-400" />
                  </label>
                  <textarea
                    readOnly
                    value={product.description}
                    rows={3}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-500 bg-gray-50 cursor-not-allowed resize-none"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                    Category
                    <Lock className="w-3 h-3 text-gray-400" />
                  </label>
                  <input
                    readOnly
                    value="Luxury Watches / Timepieces"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-500 bg-gray-50 cursor-not-allowed"
                  />
                </div>

                {/* Images */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5" />
                    Photos
                    <Lock className="w-3 h-3 text-gray-400" />
                  </label>
                  <div className="flex gap-3">
                    {thumbnails.map((src, i) => (
                      <div
                        key={i}
                        className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-100"
                      >
                        <img src={src} alt="" className="w-full h-full object-cover opacity-70" />
                        {i === 0 && (
                          <div className="absolute bottom-0 left-0 right-0 bg-blue-600/80 text-white text-[9px] font-bold text-center py-0.5">
                            MAIN
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price — Editable */}
                <div className="border-t border-gray-100 pt-5">
                  <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                    Listing Price
                    <span className="text-blue-600 ml-1 text-xs font-normal">(Editable)</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      min="1"
                      step="0.01"
                      className="w-full border border-blue-300 rounded-lg pl-9 pr-3 py-2.5 text-sm text-gray-900 bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 font-semibold"
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                    <span>Platform fee: 15%</span>
                    <span className="font-semibold text-green-600">
                      Est. payout: ${(parseFloat(price || "0") * 0.765).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 rounded-xl py-3.5 text-white font-semibold transition-all duration-200 shadow-sm"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting Listing...
                </>
              ) : (
                <>
                  <Tag className="w-4 h-4" />
                  Submit Listing
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
