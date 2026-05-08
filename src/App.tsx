import { Suspense, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ResaleProvider, useResale } from "@/context/ResaleContext";
import ProductPage from "@/pages/ProductPage";
import RedirectScreen from "@/pages/RedirectScreen";
import MarketplaceLogin from "@/pages/MarketplaceLogin";
import CreateAccount from "@/pages/CreateAccount";
import ItemListing from "@/pages/ItemListing";
import SaleConfirmation from "@/pages/SaleConfirmation";
import ListingPending from "@/pages/ListingPending";
import GiftCardScreen from "@/pages/GiftCardScreen";
import MyGiftCards from "@/pages/MyGiftCards";
import SaleStatus from "@/pages/SaleStatus";

import MarketplaceHome from "@/pages/MarketplaceHome";
import InterstitialPage from "@/pages/InterstitialPage";

function AppContent() {
  const navigate = useNavigate();
  const { setCorrId, setNetProceeds, setGiftCardData } = useResale();

  // Global message listener for cross-tab communication
  useEffect(() => {
    console.log('App: Setting up global message listener');
    console.log('App: Current window.name:', window.name);
    console.log('App: Current location:', window.location.href);
    
    const baseUrl = import.meta.env.VITE_BASE_URL || window.location.origin;
    
    function handleMessage(event: MessageEvent) {
      console.log('App: Received message:', event.data);
      console.log('App: Message origin:', event.origin);
      console.log('App: Window location origin:', window.location.origin);
      
      // Validate origin for security - accept both localhost and configured base URL
      const isValidOrigin = event.origin === window.location.origin || 
                           event.origin === baseUrl ||
                           event.origin === 'http://localhost:5173';
      
      if (!isValidOrigin) {
        console.warn('App: Rejected message from untrusted origin:', event.origin);
        return;
      }

      // Handle navigation request from marketplace
      if (event.data.type === 'NAVIGATE_TO_SALE_STATUS') {
        console.log('App: Handling NAVIGATE_TO_SALE_STATUS');
        if (event.data.corrId) {
          console.log('App: Navigating to /sale-status?corr_id=' + event.data.corrId);
          navigate(`/sale-status?corr_id=${event.data.corrId}`);
        }
      }

      // Handle GIFT_CARD_ISSUED message
      if (event.data.type === 'GIFT_CARD_ISSUED') {
        console.log('App: Handling GIFT_CARD_ISSUED');
        if (!event.data.giftCardData || !event.data.corrId) {
          console.error('App: Invalid GIFT_CARD_ISSUED message format:', event.data);
          return;
        }

        setGiftCardData(event.data.giftCardData);
        setCorrId(event.data.corrId);
        if (event.data.netProceeds) {
          setNetProceeds(event.data.netProceeds);
        }

        console.log('App: Gift card issued, updated context');
      }
    }

    window.addEventListener('message', handleMessage);
    console.log('App: Message listener attached');
    
    return () => {
      console.log('App: Removing global message listener');
      window.removeEventListener('message', handleMessage);
    };
  }, [navigate, setCorrId, setNetProceeds, setGiftCardData]);

  return (
    <Routes>
      {/* Brand-side routes */}
      <Route path="/" element={<MarketplaceHome />} />
      <Route path="/marketplace-login" element={<MarketplaceLogin />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/redirect" element={<RedirectScreen />} />
      <Route path="/sale-status" element={<SaleStatus />} />
      <Route path="/giftcard" element={<GiftCardScreen />} />
      <Route path="/my-giftcards" element={<MyGiftCards />} />
      <Route path="/past-orders" element={<ProductPage />} />
      <Route path="/resale/interstitial" element={<InterstitialPage />} />

      {/* Marketplace-side routes (post-login) */}
      <Route path="/marketplace/list-item" element={<ItemListing />} />
      <Route path="/marketplace/listing-pending" element={<ListingPending />} />
      <Route path="/marketplace/sale-confirmation" element={<SaleConfirmation />} />
    </Routes>
  );
}

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
        <AppContent />
      </ResaleProvider>
    </Suspense>
  );
}

export default App;
