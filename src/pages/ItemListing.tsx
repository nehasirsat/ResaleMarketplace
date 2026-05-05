import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useResale } from "@/context/ResaleContext";
import { submitListing } from "@/lib/mockApi";
import { Shield, Lock, DollarSign, ImageIcon, Plus, X } from "lucide-react";

export default function ItemListing() {
  const navigate = useNavigate();
  const { product, corrId, setCurrentStep, setListingId, setNetProceeds, setCorrId } = useResale();

  const [price, setPrice] = useState(product.price.toString());
  const [loading, setLoading] = useState(false);
  const [extraPhotos, setExtraPhotos] = useState<string[]>([]);

  function handleAddPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file) => {
      const url = URL.createObjectURL(file);
      setExtraPhotos((prev) => [...prev, url]);
    });
    e.target.value = "";
  }

  function handleRemovePhoto(index: number) {
    setExtraPhotos((prev) => prev.filter((_, i) => i !== index));
  }

  // Get corr_id and listing price from URL parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const urlCorrId = searchParams.get('corr_id');
    const urlNetProceeds = searchParams.get('net_proceeds');
    const urlListingPrice = searchParams.get('listing_price');
    
    if (urlCorrId && !corrId) {
      setCorrId(urlCorrId);
    }
    
    if (urlNetProceeds) {
      setNetProceeds(parseFloat(urlNetProceeds));
    }
    
    // Set listing price from URL if available
    if (urlListingPrice) {
      setPrice(urlListingPrice);
    }
  }, []);

  useEffect(() => {
    setCurrentStep(4);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      // Use URL parameter corr_id if available
      const searchParams = new URLSearchParams(window.location.search);
      const urlCorrId = searchParams.get('corr_id');
      const urlNetProceeds = searchParams.get('net_proceeds');
      const finalCorrId = urlCorrId || corrId || "";
      
      const result = await submitListing(finalCorrId, parseFloat(price));
      setListingId(result.listingId);
      
      // Use net proceeds from URL if available, otherwise use the price
      if (urlNetProceeds) {
        setNetProceeds(parseFloat(urlNetProceeds));
      } else {
        setNetProceeds(parseFloat(price));
      }
      
      navigate("/listing-pending");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">

      {/* Background - Different gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950" />
      <div
        className="fixed inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 40%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 70% 60%, #8b5cf6 0%, transparent 40%)",
        }}
      />

      {/* Header - Marketplace branding */}
      <div className="relative z-10 px-6 py-4 border-b border-white/10 bg-slate-800/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Lock className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-white font-bold text-lg tracking-wide">ResaleHub</div>
              <div className="text-white/40 text-[10px]">Trusted Marketplace</div>
            </div>
          </div>
          <div className="text-white/40 text-sm">Partner Platform</div>
        </div>
      </div>

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
            <p className="text-slate-400 text-sm mt-1">
              Review your authenticated item details
            </p>
          </div>

          {/* Auth Banner */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-6 flex gap-3 items-start">
            <Shield className="text-blue-400 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-blue-400">
                Digital Authentication Active
              </p>
              <p className="text-xs text-slate-400">
                Verified data is locked and cannot be edited
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Card */}
            <div className="bg-slate-800/80 backdrop-blur border border-slate-700/50 rounded-2xl p-6 space-y-6 shadow-xl shadow-black/50">

              {/* Section Title */}
              <div className="text-xs text-slate-500 uppercase tracking-widest">
                Item Details
              </div>

              {/* Name */}
              <div>
                <label className="text-xs text-slate-400 flex gap-2 items-center">
                  Item Name <Lock size={12} />
                </label>
                <input
                  readOnly
                  value={product.name}
                  className="mt-1 w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-400"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-xs text-slate-400 flex gap-2 items-center">
                  Description <Lock size={12} />
                </label>
                <textarea
                  readOnly
                  value={product.description}
                  rows={3}
                  className="mt-1 w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-400 resize-none"
                />
              </div>

              {/* Images */}
              <div>
                <label className="text-xs text-slate-400 flex gap-2 items-center mb-2">
                  <ImageIcon className="w-4 h-4" />
                  Photos <Lock size={12} />
                </label>

                <div className="flex gap-3 flex-wrap">
                  {/* Main image - locked */}
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-slate-700 bg-slate-900/50">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover opacity-80"
                    />
                  </div>

                  {/* Extra photos */}
                  {extraPhotos.map((src, i) => (
                    <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden border border-slate-700 bg-slate-900/50 group">
                      <img src={src} alt="" className="w-full h-full object-cover opacity-80" />
                      <button
                        type="button"
                        onClick={() => handleRemovePhoto(i)}
                        className="absolute top-1 right-1 w-4 h-4 bg-black/70 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-2.5 h-2.5 text-white" />
                      </button>
                    </div>
                  ))}

                  {/* Add photo button */}
                  <label className="w-20 h-20 rounded-lg border border-dashed border-slate-600 bg-slate-900/30 hover:border-blue-500/50 hover:bg-blue-500/5 flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors">
                    <Plus className="w-5 h-5 text-slate-500" />
                    <span className="text-[9px] text-slate-500">Add Photo</span>
                    <input type="file" accept="image/*" multiple className="hidden" onChange={handleAddPhoto} />
                  </label>
                </div>
              </div>

              {/* Price Section */}
              <div className="border-t border-slate-700 pt-5">
                <label className="text-sm font-semibold text-white flex gap-2 items-center">
                  Listing Price
                  <Lock size={12} className="text-slate-400" />
                </label>

                <div className="relative mt-2">
                  <DollarSign
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={16}
                  />
                  <input
                    type="number"
                    value={price}
                    readOnly
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-400 font-semibold cursor-not-allowed"
                  />
                </div>
              </div>

            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 py-3.5 rounded-xl text-white font-bold transition-all duration-200 shadow-lg shadow-blue-500/20 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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