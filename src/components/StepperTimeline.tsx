import React from "react";
import { Check, Package, Tag, CreditCard, Gift } from "lucide-react";

export type StepStatus = "complete" | "active" | "pending";

export interface TimelineStep {
  label: string;
  status: StepStatus;
  icon?: React.ReactNode;
}

interface StepperTimelineProps {
  steps?: TimelineStep[];
}

const defaultSteps: TimelineStep[] = [
  { label: "Item Listed", status: "complete", icon: <Package className="w-4 h-4" /> },
  { label: "Sale Confirmed", status: "complete", icon: <Tag className="w-4 h-4" /> },
  { label: "Payment Processed", status: "active", icon: <CreditCard className="w-4 h-4" /> },
  { label: "Gift Card Issued", status: "pending", icon: <Gift className="w-4 h-4" /> },
];

export default function StepperTimeline({ steps = defaultSteps }: StepperTimelineProps) {
  return (
    <div className="flex items-center justify-between w-full">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center gap-2 flex-shrink-0">
            <div
              className={`
                w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500
                ${step.status === "complete" ? "bg-green-500/20 border border-green-500/50 text-green-400 shadow-[0_0_12px_rgba(34,197,94,0.2)]" : ""}
                ${step.status === "active" ? "bg-[#F5A623]/20 border border-[#F5A623]/50 text-[#F5A623] shadow-[0_0_12px_rgba(245,166,35,0.25)]" : ""}
                ${step.status === "pending" ? "bg-white/5 border border-white/10 text-white/30" : ""}
              `}
            >
              {step.status === "complete" ? (
                <Check className="w-4 h-4" />
              ) : (
                step.icon || <span className="text-xs font-bold">{index + 1}</span>
              )}
            </div>
            <span
              className={`text-xs font-medium text-center transition-colors duration-300 max-w-[70px]
                ${step.status === "complete" ? "text-green-400" : ""}
                ${step.status === "active" ? "text-[#F5A623]" : ""}
                ${step.status === "pending" ? "text-white/30" : ""}
              `}
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className="flex-1 mx-2 h-[1px] relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10" />
              <div
                className="absolute inset-0 bg-green-500 transition-all duration-700"
                style={{ width: step.status === "complete" ? "100%" : "0%" }}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
