import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product, OrderDetails, mockProduct } from "@/lib/mockApi";

interface ResaleContextType {
  corrId: string | null;
  setCorrId: (id: string) => void;
  product: Product;
  netProceeds: number;
  setNetProceeds: (amount: number) => void;
  orderDetails: OrderDetails | null;
  setOrderDetails: (details: OrderDetails) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  giftCardData: { code: string; pin: string; expiryDate: string } | null;
  setGiftCardData: (data: { code: string; pin: string; expiryDate: string }) => void;
  listingId: string | null;
  setListingId: (id: string) => void;
}

const ResaleContext = createContext<ResaleContextType | null>(null);

export function ResaleProvider({ children }: { children: ReactNode }) {
  const [corrId, setCorrId] = useState<string | null>(null);
  const [netProceeds, setNetProceeds] = useState<number>(0);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [giftCardData, setGiftCardData] = useState<{
    code: string;
    pin: string;
    expiryDate: string;
  } | null>(null);
  const [listingId, setListingId] = useState<string | null>(null);

  return (
    <ResaleContext.Provider
      value={{
        corrId,
        setCorrId,
        product: mockProduct,
        netProceeds,
        setNetProceeds,
        orderDetails,
        setOrderDetails,
        currentStep,
        setCurrentStep,
        giftCardData,
        setGiftCardData,
        listingId,
        setListingId,
      }}
    >
      {children}
    </ResaleContext.Provider>
  );
}

export function useResale() {
  const ctx = useContext(ResaleContext);
  if (!ctx) throw new Error("useResale must be used within ResaleProvider");
  return ctx;
}
