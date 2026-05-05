import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useResale } from "@/context/ResaleContext";
import { AlertTriangle, RefreshCw, Lock } from "lucide-react";

const REDIRECT_URL = "https://marketplace.luminary-resale.io/auth";
const PROGRESS_DURATION = 2500;

export default function RedirectScreen() {
  const navigate = useNavigate();
  const { corrId, product, setCurrentStep } = useResale();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timedOut, setTimedOut] = useState(false);
  const [done, setDone] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startRef = useRef<number>(Date.now());

  useEffect(() => {
    setCurrentStep(2);
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  function startProgress() {
    setProgress(0);
    setDone(false);
    setTimedOut(false);
    startRef.current = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startRef.current;
      const pct = Math.min((elapsed / PROGRESS_DURATION) * 100, 100);
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(intervalRef.current!);
        setDone(true);
      }
    }, 30);

    timeoutRef.current = setTimeout(() => {
      if (!done) {
        clearInterval(intervalRef.current!);
        setTimedOut(true);
      }
    }, 5000);
  }

  useEffect(() => {
    startProgress();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (done) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      const t = setTimeout(() => {
        setCurrentStep(3);
        // Navigate to marketplace login with URL parameters
        navigate(`/marketplace-login?${urlParams.toString()}`);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [done]);

  const netProceeds = (product.price * 0.85 * 0.9).toFixed(2);

  const urlParams = new URLSearchParams({
    corr_id: corrId || "pending",
    product_id: product.id,
    sku: product.sku,
    net_proceeds: netProceeds,
    listing_price: netProceeds,
    return_url: window.location.origin + "/sale-confirmation",
    ts: new Date().toISOString(),
  });

  const redirectUrl = `${REDIRECT_URL}?${urlParams.toString()}`;

  return (
    <div
      className={`min-h-screen bg-[#0A1931] flex flex-col transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}`}
    >

      <div className="fixed inset-0 bg-gradient-to-br from-[#0A1931] via-[#0d1f3c] to-[#060f1f] pointer-events-none" />

      <div className="relative z-10 flex-1 flex items-center justify-center px-4 pt-4">
        <div className="w-full max-w-lg">
          {timedOut ? (
            /* Fallback Error Card */
            <div className="bg-red-950/30 border border-red-500/20 rounded-2xl p-8 text-center shadow-xl">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 mb-6">
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
              <h2
                className="text-2xl font-black text-white mb-2"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Connection Timeout
              </h2>
              <p className="text-white/50 text-sm mb-6">
                The redirect took too long. Please try again.
              </p>
              <button
                onClick={() => startProgress()}
                className="inline-flex items-center gap-2 bg-[#F5A623] hover:bg-[#e8961a] rounded-xl px-6 py-3 text-[#0A1931] font-bold transition-all duration-200"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <RefreshCw className="w-4 h-4" />
                Retry
              </button>
            </div>
          ) : (
            /* Loading State */
            <div className="text-center">
              {/* Spinner */}
              <div className="relative inline-flex items-center justify-center w-20 h-20 mb-8">
                <div className="absolute inset-0 rounded-full border-2 border-white/5" />
                <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#F5A623] animate-spin" />
                <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-[#F5A623]/40 animate-spin" style={{ animationDuration: "1.5s", animationDirection: "reverse" }} />
                <Lock className="w-7 h-7 text-[#F5A623]" />
              </div>

              <h2
                className="text-2xl sm:text-3xl font-black text-white mb-2"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Redirecting Securely
              </h2>
              <p className="text-white/40 text-sm mb-8">
                Establishing secure connection to marketplace...
              </p>

              {/* Progress Bar */}
              <div className="bg-white/5 rounded-full h-1.5 w-full overflow-hidden mb-2">
                <div
                  className="h-full bg-gradient-to-r from-[#F5A623] to-yellow-300 rounded-full transition-all duration-75"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="text-right text-white/30 text-xs">
                {Math.round(progress)}%
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
