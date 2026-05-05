import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ResaleProvider } from "@/context/ResaleContext";
import ProductPage from "@/pages/ProductPage";
import RedirectScreen from "@/pages/RedirectScreen";
import MarketplaceLogin from "@/pages/MarketplaceLogin";
import CreateAccount from "@/pages/CreateAccount";
import ItemListing from "@/pages/ItemListing";
import SaleConfirmation from "@/pages/SaleConfirmation";
import ListingPending from "@/pages/ListingPending";
import GiftCardScreen from "@/pages/GiftCardScreen";
import SaleStatus from "@/pages/SaleStatus";

import MarketplaceHome from "@/pages/MarketplaceHome";

function App() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0A1931] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#F5A623]/20 border-t-[#F5A623] rounded-full animate-spin" />
        </div>
      }
    >
      <ResaleProvider>
        <Routes>
          <Route path="/" element={<MarketplaceHome />} />
          <Route path="/marketplace-login" element={<MarketplaceLogin />} />
          <Route path="/past-orders" element={<ProductPage />} />
          <Route path="/redirect" element={<RedirectScreen />} />
          <Route path="/sale-status" element={<SaleStatus />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/list-item" element={<ItemListing />} />
          <Route path="/sale-confirmation" element={<SaleConfirmation />} />
          <Route path="/listing-pending" element={<ListingPending />} />
          <Route path="/giftcard" element={<GiftCardScreen />} />
        </Routes>
      </ResaleProvider>
    </Suspense>
  );
}

export default App;
