import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useResale } from "@/context/ResaleContext";
import StepperTimeline, { TimelineStep, StepStatus } from "@/components/StepperTimeline";
import { CheckCircle2, Package, Tag, CreditCard, Gift, ArrowRight, ExternalLink } from "lucide-react";

export default function SaleConfirmation() {
  const navigate = useNavigate();
  const { product, netProceeds, corrId, setCurrentStep, setOrderDetails } = useResale();
  const [visible, setVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [allDone, setAllDone] = useState(false);
  const orderId = useRef(`ORD-${Math.random().toString(36).substring(2, 10).toUpperCase()}`).current;

  const salePrice = product.price * 0.85;
  const net = netProceeds || salePrice;

  // Build steps dynamically based on activeStep
  const stepDefs = [
    { label: "Item Listed",       icon: <Package  className="w-4 h-4" /> },
    { label: "Sale Confirmed",    icon: <Tag      className="w-4 h-4" /> },
    { label: "Payment Processed", icon: <CreditCard className="w-4 h-4" /> },
    { label: "Gift Card Issued",  icon: <Gift     className="w-4 h-4" /> },
  ];

  const steps: TimelineStep[] = stepDefs.map((s, i) => ({
    ...s,
    status: (i < activeStep ? "complete" : i === activeStep ? "active" : "pending") as StepStatus,
  }));

  useEffect(() => {
    setCurrentStep(5);
    const t = setTimeout(() => setVisible(true), 50);

    // Step through each step with 800ms hold, then advance
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setActiveStep(1), 800));   // step 1 active
    timers.push(setTimeout(() => setActiveStep(2), 1600));  // step 2 active — show order summary
    timers.push(setTimeout(() => setActiveStep(3), 2400));  // step 3 active
    timers.push(setTimeout(() => {
      setActiveStep(4);
      setAllDone(true);
    }, 3200));

    const baseUrl = import.meta.env.VITE_BASE_URL || window.location.origin;
    
    if (window.opener) {
      window.opener.postMessage({ type: 'SALE_COMPLETED', corrId, netProceeds: net }, baseUrl);
    }

    return () => { clearTimeout(t); timers.forEach(clearTimeout); };
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

  // corrId from URL or context
  const urlCorrId = new URLSearchParams(window.location.search).get('corr_id');
  const finalCorrId = urlCorrId || corrId;

  function handleReturnToBrand() {
    console.log('handleReturnToBrand called');
    console.log('window.opener exists:', !!window.opener);
    console.log('window.opener.closed:', window.opener ? window.opener.closed : 'N/A');
    
    const baseUrl = import.meta.env.VITE_BASE_URL || window.location.origin;
    
    // If opened in a new window from the brand page
    if (window.opener && !window.opener.closed) {
      console.log('Opening new brand tab');
      
      // Open a new tab with the sale-status page with completed status
      const newBrandTab = window.open(
        `${baseUrl}/sale-status?corr_id=${corrId}&completed=true`,
        '_blank'
      );
      
      // Send gift card data to the new tab once it loads
      if (newBrandTab) {
        // Wait a bit for the new tab to load, then send the data
        setTimeout(() => {
          newBrandTab.postMessage({
            type: 'SALE_COMPLETED',
            corrId: corrId,
            netProceeds: net
          }, baseUrl);
        }, 1000);
        
        newBrandTab.focus();
      }
    } else {
      // If not opened in a new window, navigate within the same window
      console.log('No opener, navigating in same window');
      navigate(`/sale-status?corr_id=${corrId}`);
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
        <div className="max-w-2xl mx-auto space-y-6">

          {/* Processing Status — always visible first */}
          <div className="bg-slate-700/80 border border-slate-600/50 rounded-2xl p-6 shadow-xl">
            <h2
              className="text-xs font-semibold text-white tracking-widest uppercase mb-5"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Processing Status
            </h2>
            <StepperTimeline steps={steps} />
          </div>

          {/* Order summary — appears when Sale Confirmed step hits (step >= 2) */}
          <div className={`transition-all duration-500 ${activeStep >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 border-2 border-green-500/30 mb-3 shadow-lg shadow-green-500/10">
                <CheckCircle2 className="w-8 h-8 text-green-400" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>
                Sale Confirmed!
              </h1>
              <p className="text-white/50 text-sm">Your item has been sold and payment is being processed.</p>
            </div>

            <div className="bg-slate-700/80 border border-slate-600/50 rounded-2xl p-6 shadow-xl ring-1 ring-blue-400/10">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm font-semibold text-white tracking-widest uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Order Summary
                </h2>
                <span className="text-[10px] text-green-400/70 tracking-widest" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {orderId}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                {[
                  { label: "Item", value: product.name },
                  { label: "Buyer", value: "Anonymous Buyer" },
                ].map((item) => (
                  <div key={item.label} className="bg-white/5 rounded-xl p-4">
                    <div className="text-white/50 text-xs mb-1 font-semibold">{item.label}</div>
                    <div className="text-white text-sm font-semibold truncate">{item.value}</div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <div className="text-blue-400 text-xs mb-1 font-semibold">Net Proceeds</div>
                  <div className="text-blue-400 text-xl font-bold">${net.toFixed(2)}</div>
                </div>
                <div className="text-right">
                  <div className="text-white/50 text-xs mb-1 font-semibold">Paid via</div>
                  <div className="text-white text-sm font-semibold">Gift Card</div>
                </div>
              </div>
            </div>
          </div>

          {/* Return to brand — appears only after Gift Card step completes */}
          <div className={`transition-all duration-500 ${allDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
            <div className="bg-[#F5A623]/10 border border-[#F5A623]/20 rounded-xl p-4 mb-4 text-center">
              <p className="text-white/60 text-sm">
                Your gift card is being issued by <span className="text-[#F5A623] font-semibold">LUMINARY</span>. Return to the brand page to view it.
              </p>
            </div>
            <button
              onClick={handleReturnToBrand}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#F5A623] to-[#e8961a] hover:from-[#e8961a] hover:to-[#d4851a] rounded-xl py-4 text-[#0A1931] font-bold text-lg transition-all duration-200 shadow-lg shadow-[#F5A623]/20"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <ExternalLink className="w-5 h-5" />
              Return to Brand Page
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Spinner while processing */}
          {!allDone && (
            <div className="text-center text-white/30 text-sm flex items-center justify-center gap-2">
              <div className="w-3 h-3 border border-white/20 border-t-blue-400/50 rounded-full animate-spin" />
              Processing...
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
