import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useResale } from "@/context/ResaleContext";
import { CheckCircle2, Clock, ExternalLink } from "lucide-react";

export default function SaleStatus() {
  const navigate = useNavigate();
  const { setCurrentStep, giftCardData } = useResale();
  const [checking, setChecking] = useState(true);
  const [saleCompleted, setSaleCompleted] = useState(false);

  // Get corr_id from URL
  const searchParams = new URLSearchParams(window.location.search);
  const corrId = searchParams.get('corr_id');

  useEffect(() => {
    setCurrentStep(3);
  }, []);

  // Poll for sale completion (simulated - in real app, this would check backend)
  useEffect(() => {
    // Listen for messages from marketplace tab
    const handleMessage = (event: MessageEvent) => {
      // Verify origin for security
      if (event.origin !== window.location.origin) return;
      
      if (event.data.type === 'SALE_COMPLETED' && event.data.corrId === corrId) {
        setSaleCompleted(true);
        setChecking(false);
      }
    };

    window.addEventListener('message', handleMessage);

    // Fallback: Poll backend for sale status
    const pollInterval = setInterval(() => {
      // In a real app, you would make an API call to check the status by corr_id
      // const response = await fetch(`/api/sale-status/${corrId}`);
      // const data = await response.json();
      // if (data.completed) {
      //   setSaleCompleted(true);
      //   setChecking(false);
      //   clearInterval(pollInterval);
      // }
    }, 3000); // Check every 3 seconds

    return () => {
      window.removeEventListener('message', handleMessage);
      clearInterval(pollInterval);
    };
  }, [corrId]);

  function handleViewGiftCard() {
    // In production, fetch gift card data by corr_id before navigating
    navigate("/giftcard");
  }

  return (
    <div className="min-h-screen bg-[#0A1931]">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0A1931] via-[#0d1f3c] to-[#060f1f] pointer-events-none" />

      <div className="relative z-10 pt-10 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-10">
            <h1
              className="text-3xl sm:text-4xl font-bold text-white mb-3"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              LUMINARY
            </h1>
            <div className="mt-2 h-[2px] w-24 bg-gradient-to-r from-transparent via-[#F5A623] to-transparent mx-auto mb-8" />
          </div>

          {/* Status Card */}
          <div className="bg-[#0d1f3c]/80 border border-white/10 rounded-2xl p-8 shadow-xl text-center">
            
            {checking && !saleCompleted && (
              <>
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-500/10 border-2 border-blue-500/30 mb-6">
                  <Clock className="w-10 h-10 text-blue-400 animate-pulse" />
                </div>
                <h2
                  className="text-2xl font-bold text-white mb-3"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Waiting for Sale Completion
                </h2>
                <p className="text-white/50 text-base mb-6">
                  Complete your sale on the marketplace tab. We'll automatically detect when it's done.
                </p>
                
                {/* Correlation ID */}
                <div className="bg-white/5 rounded-xl p-4 mb-6">
                  <div className="text-white/40 text-xs mb-1">Transaction ID</div>
                  <div
                    className="text-white text-sm font-semibold"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {corrId}
                  </div>
                </div>

                {/* Instructions */}
                <div className="bg-[#F5A623]/10 border border-[#F5A623]/20 rounded-xl p-4 text-left">
                  <div className="flex items-start gap-3">
                    <ExternalLink className="w-5 h-5 text-[#F5A623] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-white/70 leading-relaxed">
                        <strong className="text-[#F5A623]">Marketplace tab opened:</strong> Complete your listing and sale process there. This page will automatically update when your sale is complete.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {saleCompleted && (
              <>
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 border-2 border-green-500/30 mb-6 animate-bounce">
                  <CheckCircle2 className="w-10 h-10 text-green-400" />
                </div>
                <h2
                  className="text-2xl font-bold text-white mb-3"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Sale Completed!
                </h2>
                <p className="text-white/50 text-base mb-6">
                  Your item has been sold successfully. Your gift card is ready!
                </p>

                <button
                  onClick={handleViewGiftCard}
                  className="w-full flex items-center justify-center gap-2 bg-[#F5A623] hover:bg-[#e8961a] rounded-xl py-4 text-[#0A1931] font-bold text-lg transition-all duration-200 shadow-lg shadow-[#F5A623]/20"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  View Gift Card
                </button>
              </>
            )}

          </div>

          {/* Back to Home */}
          <div className="text-center mt-6">
            <button
              onClick={() => navigate("/")}
              className="text-white/40 hover:text-white/70 text-sm transition"
            >
              Back to Home
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
