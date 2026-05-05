import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useResale } from "@/context/ResaleContext";
import { issueGiftCard } from "@/lib/mockApi";
import StepperTimeline, { TimelineStep } from "@/components/StepperTimeline";
import { CheckCircle2, Package, Tag, CreditCard, Gift, ArrowRight } from "lucide-react";

export default function SaleConfirmation() {
  const navigate = useNavigate();
  const { product, netProceeds, corrId, listingId, setCurrentStep, setGiftCardData, setOrderDetails } = useResale();
  const [visible, setVisible] = useState(false);
  const [step4Done, setStep4Done] = useState(false);
  const [giftCardLoading, setGiftCardLoading] = useState(false);

  const orderId = `ORD-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
  const salePrice = product.price * 0.85;
  const net = netProceeds || salePrice;

  const steps: TimelineStep[] = [
    { label: "Item Listed", status: "complete", icon: <Package className="w-4 h-4" /> },
    { label: "Sale Confirmed", status: "complete", icon: <Tag className="w-4 h-4" /> },
    { label: "Payment Processed", status: "complete", icon: <CreditCard className="w-4 h-4" /> },
    { label: "Gift Card Issued", status: step4Done ? "complete" : "active", icon: <Gift className="w-4 h-4" /> },
  ];

  useEffect(() => {
    setCurrentStep(5);
    const t = setTimeout(() => setVisible(true), 50);
    const step4T = setTimeout(() => setStep4Done(true), 2000);
    
    // Notify brand site that sale is complete (for cross-tab communication)
    if (window.opener) {
      window.opener.postMessage({
        type: 'SALE_COMPLETED',
        corrId: corrId,
        netProceeds: net
      }, window.location.origin);
    }
    
    return () => {
      clearTimeout(t);
      clearTimeout(step4T);
    };
  }, []);

  useEffect(() => {
    if (netProceeds > 0) {
      setOrderDetails({
        orderId,
        salePrice,
        platformFee: 0,
        netProceeds: net,
        giftCardCode: "",
        giftCardAmount: net,
        buyerName: "Anonymous Buyer",
        saleDate: new Date().toISOString(),
      });
    }
  }, []);

  async function handleViewGiftCard() {
    setGiftCardLoading(true);
    try {
      const data = await issueGiftCard(orderId, net);
      setGiftCardData(data);
      
      // Send gift card data to brand site (opener window)
      if (window.opener) {
        window.opener.postMessage({
          type: 'GIFT_CARD_ISSUED',
          corrId: corrId,
          giftCardData: data,
          netProceeds: net
        }, window.location.origin);
      }
      
      setCurrentStep(6);
      navigate("/giftcard");
    } catch {
      // Navigation will handle retry
    } finally {
      setGiftCardLoading(false);
    }
  }

  return (
    <div
      className={`min-h-screen bg-slate-800 transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}`}
    >

      <div className="fixed inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 pointer-events-none" />
      <div
        className="fixed inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 40%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 70% 60%, #8b5cf6 0%, transparent 40%)",
        }}
      />

      <div className="relative z-10 pt-10 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 border-2 border-green-500/30 mb-6 shadow-lg shadow-green-500/10 animate-bounce">
              <CheckCircle2 className="w-10 h-10 text-green-400" />
            </div>
            <h1
              className="text-3xl sm:text-4xl font-bold text-white mb-3"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Sale Confirmed!
            </h1>
            <p className="text-white/50 text-base">
              Your item has been sold and payment is being processed.
            </p>
          </div>

          {/* Order Summary Grid */}
          <div className="bg-slate-700/80 border border-slate-600/50 rounded-2xl p-6 md:p-8 mb-6 shadow-xl ring-1 ring-blue-400/10">
            <div className="flex items-center justify-between mb-5">
              <h2
                className="text-sm font-semibold text-white tracking-widest uppercase"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Order Summary
              </h2>
              <span
                className="text-[10px] text-green-400/70 tracking-widest"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {orderId}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                { label: "Item", value: product.name },
                { label: "Buyer", value: "Anonymous Buyer" },
              ].map((item) => (
                <div key={item.label} className="bg-white/5 rounded-xl p-4">
                  <div className="text-white text-xs mb-1 font-semibold">{item.label}</div>
                  <div className="text-white text-sm font-semibold truncate">{item.value}</div>
                </div>
              ))}
            </div>

            {/* Net Proceeds */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex items-center justify-between">
              <div>
                <div className="text-blue-400 text-xs mb-1 font-semibold">Net Proceeds</div>
                <div className="text-blue-400 text-xl font-bold">
                  ${net.toFixed(2)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-white text-xs mb-1 font-semibold">Paid via</div>
                <div className="text-white text-sm font-semibold">Gift Card</div>
              </div>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="bg-slate-700/80 border border-slate-600/50 rounded-2xl p-6 mb-8 shadow-xl">
            <h2
              className="text-xs font-semibold text-white tracking-widest uppercase mb-5"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Processing Status
            </h2>
            <StepperTimeline steps={steps} />
          </div>

          {/* Gift Card CTA */}
          {step4Done && (
            <div
              className="animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
              <button
                onClick={handleViewGiftCard}
                disabled={giftCardLoading}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-60 rounded-xl py-4 text-white font-bold text-lg transition-all duration-200 shadow-lg shadow-blue-500/20"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {giftCardLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Issuing Gift Card...
                  </>
                ) : (
                  <>
                    <Gift className="w-5 h-5" />
                    View Gift Card
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          )}

          {!step4Done && (
            <div className="text-center text-white/30 text-sm flex items-center justify-center gap-2">
              <div className="w-3 h-3 border border-white/20 border-t-blue-400/50 rounded-full animate-spin" />
              Processing your gift card...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
