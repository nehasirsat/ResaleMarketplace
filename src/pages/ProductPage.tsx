import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useResale } from "@/context/ResaleContext";
import { initiateResale, mockProducts, Product } from "@/lib/mockApi";
import {
  ShoppingCart,
  Tag,
  Shield,
  Star,
  Gift,
  ArrowRight,
  X,
  CreditCard,
  Package,
  Home,
  CalendarDays,
} from "lucide-react";

export default function ProductPage() {
  const navigate = useNavigate();
  const { product, setCorrId, setCurrentStep, setProduct } = useResale();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const netProceeds = selectedProduct 
    ? (selectedProduct.price * 0.85 * 0.9).toFixed(2)
    : (product.price * 0.85 * 0.9).toFixed(2);

  useEffect(() => {
    setCurrentStep(0);
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  function handleResellClick(prod: Product) {
    setSelectedProduct(prod);
    setShowModal(true);
    setTimeout(() => setModalVisible(true), 20);
  }

  function handleModalClose() {
    setModalVisible(false);
    setTimeout(() => {
      setShowModal(false);
      setSelectedProduct(null);
    }, 300);
  }

  async function handleConfirm() {
    if (!selectedProduct) return;
    setLoading(true);
    try {
      setProduct(selectedProduct);
      const id = await initiateResale(selectedProduct.id);
      setCorrId(id);
      setCurrentStep(1);
      navigate("/redirect");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={`min-h-screen bg-[#0A1931] transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}`}
    >
      {/* No ProgressStepper, no CorrelationBadge */}

      {/* Background texture */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0A1931] via-[#0d1f3c] to-[#060f1f] pointer-events-none" />
      <div
        className="fixed inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, #F5A623 0%, transparent 50%), radial-gradient(circle at 80% 20%, #1a3a6e 0%, transparent 40%)",
        }}
      />

      <div className="relative z-10 pt-0 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Shared Header */}
          <header className="flex justify-between items-center py-4 mb-8 border-b border-white/10">
            <div
              className="text-xl font-black tracking-tight text-white"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              LUMINARY
            </div>
            <div className="relative">
              <button
                onClick={() => navigate("/marketplace-home")}
                className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 hover:bg-white/10 transition text-white/60 hover:text-white"
              >
                <Home className="w-4 h-4" />
              </button>
            </div>
          </header>
          {/* Brand header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#F5A623]/10 border border-[#F5A623]/20 rounded-full px-4 py-1.5 mb-6">
              <Star className="w-3 h-3 text-[#F5A623] fill-[#F5A623]" />
              <span
                className="text-[#F5A623] text-xs font-semibold tracking-[0.2em]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                LIMITED EDITION COLLECTION
              </span>
              <Star className="w-3 h-3 text-[#F5A623] fill-[#F5A623]" />
            </div>
            <h1
              className="text-4xl sm:text-5xl font-bold text-white tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              LUMINARY
            </h1>
            <div className="mt-2 h-[2px] w-24 bg-gradient-to-r from-transparent via-[#F5A623] to-transparent mx-auto" />
          </div>

          {/* Past orders label */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px flex-1 bg-white/10 max-w-xs" />
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5">
              <Package className="w-3.5 h-3.5 text-[#F5A623]" />
              <span className="text-white/50 text-xs tracking-widest uppercase">Past Orders</span>
            </div>
            <div className="h-px flex-1 bg-white/10 max-w-xs" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-[#0d1f3c]/80 border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-yellow-400/10 hover:ring-yellow-400/20 transition-all duration-300 hover:scale-[1.02]"
              >
                {/* Image */}
                <div className="relative overflow-hidden bg-gradient-to-br from-[#0d1f3c] to-[#060f1f] h-64">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover opacity-90 mix-blend-luminosity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1931]/60 via-transparent to-transparent" />
                  {/* EON Badge */}
                  <div className="absolute bottom-3 right-3">
                    <div className="bg-[#0A1931]/90 backdrop-blur-sm border border-[#F5A623]/30 rounded-lg px-2 py-1.5 shadow-lg">
                      <div className="flex items-center gap-1.5">
                        <Shield className="w-3 h-3 text-[#F5A623]" />
                        <div
                          className="text-[9px] text-[#F5A623] font-bold tracking-widest"
                          style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          EON CERTIFIED
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  {/* Order meta */}
                  <div className="flex items-center gap-2 mb-3 text-white/30 text-xs">
                    <CalendarDays className="w-3 h-3" />
                    <span>Ordered 12 Jan 2024</span>
                  </div>
                  {/* SKU */}
                  <div className="inline-flex items-center gap-1.5 bg-[#F5A623]/10 border border-[#F5A623]/20 rounded px-2 py-1 mb-3">
                    <Tag className="w-3 h-3 text-[#F5A623]" />
                    <span
                      className="text-[#F5A623] text-[10px] font-medium tracking-widest"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {prod.sku}
                    </span>
                  </div>

                  <h2
                    className="text-xl font-bold text-white mb-2 leading-tight"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {prod.name}
                  </h2>

                  <p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-2">
                    {prod.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-semibold text-white tracking-widest" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      ${prod.price.toLocaleString()} USD
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    <button
                      disabled
                      className="w-full flex items-center justify-center gap-2 bg-white/5 border border-white/10 rounded-xl py-2.5 text-white/30 font-semibold cursor-not-allowed text-sm"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Buy Again
                    </button>
                    <button
                      onClick={() => handleResellClick(prod)}
                      className="w-full flex items-center justify-center gap-2 bg-[#F5A623] hover:bg-[#e8961a] active:bg-[#d4861a] rounded-xl py-2.5 text-[#0A1931] font-bold transition-all duration-200 shadow-lg shadow-[#F5A623]/20 hover:shadow-[#F5A623]/30 text-sm"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      <Tag className="w-4 h-4" />
                      Resell Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interstitial Modal */}
      {showModal && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-opacity duration-300 ${modalVisible ? "opacity-100" : "opacity-0"}`}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleModalClose}
          />

          {/* Modal Card */}
          <div className="relative z-10 w-full max-w-lg bg-[#0d1f3c] border border-white/10 rounded-2xl shadow-2xl shadow-black/60 ring-1 ring-yellow-400/10 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#F5A623]/10 border border-[#F5A623]/20">
                  <Gift className="w-5 h-5 text-[#F5A623]" />
                </div>
                <div>
                  <h2
                    className="text-xl font-bold text-white leading-tight"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    Resell for a Gift Card
                  </h2>
                  <p
                    className="text-white/40 text-xs mt-0.5"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Review your resale details before proceeding
                  </p>
                </div>
              </div>
              <button
                onClick={handleModalClose}
                className="text-white/30 hover:text-white/70 transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Item being resold */}
            <div className="px-6 py-4 bg-[#F5A623]/5 border-b border-white/10">
              <div
                className="text-[10px] text-[#F5A623]/60 uppercase tracking-widest mb-1"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                You are reselling
              </div>
              <div className="flex items-center gap-3">
                <img
                  src={selectedProduct?.image || product.image}
                  alt={selectedProduct?.name || product.name}
                  className="w-12 h-12 object-cover rounded-lg border border-white/10 opacity-80"
                />
                <div>
                  <div
                    className="text-white font-bold text-sm"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {selectedProduct?.name || product.name}
                  </div>
                  <div
                    className="text-white/40 text-xs"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {selectedProduct?.sku || product.sku}
                  </div>
                </div>
              </div>
            </div>

            {/* How it works */}
            <div className="px-6 py-4 border-b border-white/10">
              <p
                className="text-white/50 text-sm leading-relaxed"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                List your item on our partner marketplace and receive instant
                payment as a{" "}
                <span className="text-[#F5A623]">LUMINARY gift card</span> —
                redeemable at any retailer.
              </p>
            </div>

            {/* Summary row */}
            <div className="px-6 py-4 border-b border-white/10">
              <div className="grid grid-cols-3 divide-x divide-white/10">
                <div className="flex flex-col items-center gap-1 px-2">
                  <Package className="w-4 h-4 text-white/30 mb-1" />
                  <div
                    className="text-[10px] text-white/40 uppercase tracking-widest"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Item
                  </div>
                  <div className="text-white text-xs font-semibold text-center leading-tight">
                    {selectedProduct?.name || product.name}
                  </div>
                </div>
                <div className="flex flex-col items-center gap-1 px-2">
                  <Gift className="w-4 h-4 text-[#F5A623]/60 mb-1" />
                  <div
                    className="text-[10px] text-white/40 uppercase tracking-widest"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Payout
                  </div>
                  <div className="text-[#F5A623] text-sm font-bold">
                    ${netProceeds}
                  </div>
                </div>
                <div className="flex flex-col items-center gap-1 px-2">
                  <CreditCard className="w-4 h-4 text-white/30 mb-1" />
                  <div
                    className="text-[10px] text-white/40 uppercase tracking-widest"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Method
                  </div>
                  <div className="text-white text-xs font-semibold">
                    Gift Card
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 px-6 py-5">
              <button
                onClick={handleModalClose}
                className="flex items-center gap-2 border border-white/10 bg-white/5 hover:bg-white/10 rounded-xl px-5 py-3 text-white/60 font-semibold transition-all duration-200 text-sm"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 bg-[#F5A623] hover:bg-[#e8961a] rounded-xl py-3 text-[#0A1931] font-bold transition-all duration-200 shadow-lg shadow-[#F5A623]/20 disabled:opacity-60 text-sm"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#0A1931]/30 border-t-[#0A1931] rounded-full animate-spin" />
                    Initiating...
                  </>
                ) : (
                  <>
                    Proceed to Marketplace
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
