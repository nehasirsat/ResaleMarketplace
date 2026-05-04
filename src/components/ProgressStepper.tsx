import React from "react";
import { useResale } from "@/context/ResaleContext";
import { Check } from "lucide-react";

const STEPS = [
  { label: "Product" },
  { label: "Interstitial" },
  { label: "Redirect" },
  { label: "Login" },
  { label: "Listing" },
  { label: "Confirm" },
  { label: "Gift Card" },
];

export default function ProgressStepper() {
  const { currentStep } = useResale();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#060f1f]/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {STEPS.map((step, index) => {
            const isCompleted = index < currentStep;
            const isActive = index === currentStep;
            const isFuture = index > currentStep;

            return (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={`
                      w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300
                      ${isCompleted ? "bg-green-500 text-white shadow-[0_0_10px_rgba(34,197,94,0.4)]" : ""}
                      ${isActive ? "bg-[#F5A623] text-[#0A1931] shadow-[0_0_12px_rgba(245,166,35,0.5)] ring-2 ring-[#F5A623]/30" : ""}
                      ${isFuture ? "bg-white/10 text-white/30 border border-white/10" : ""}
                    `}
                  >
                    {isCompleted ? <Check className="w-3.5 h-3.5" /> : <span>{index + 1}</span>}
                  </div>
                  <span
                    className={`text-[9px] font-medium tracking-wide hidden sm:block transition-colors duration-300
                      ${isActive ? "text-[#F5A623]" : isCompleted ? "text-green-400" : "text-white/25"}
                    `}
                  >
                    {step.label.toUpperCase()}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <div className="flex-1 mx-1 h-[1px] relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/10" />
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-400 transition-all duration-500"
                      style={{ width: isCompleted ? "100%" : "0%" }}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
