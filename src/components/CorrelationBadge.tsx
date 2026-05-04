import React from "react";
import { useResale } from "@/context/ResaleContext";
import { Link2 } from "lucide-react";

interface CorrelationBadgeProps {
  hidden?: boolean;
}

export default function CorrelationBadge({ hidden = false }: CorrelationBadgeProps) {
  const { corrId } = useResale();

  if (hidden || !corrId) return null;

  return (
    <div className="fixed top-14 right-4 z-50">
      <div className="flex items-center gap-1.5 bg-[#0A1931]/90 backdrop-blur-md border border-[#F5A623]/20 rounded-full px-3 py-1.5 shadow-lg">
        <Link2 className="w-3 h-3 text-[#F5A623]" />
        <span
          className="text-[10px] text-[#F5A623]/80 tracking-widest"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {corrId}
        </span>
      </div>
    </div>
  );
}
