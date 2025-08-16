import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ConsultationHistoryProfile from './pages/consultation-history-profile';
import ProductSearchBrowse from './pages/product-search-browse';
import LumiChatConsultationInterface from './pages/lumi-chat-consultation-interface';
import ProductRecommendationDetails from './pages/product-recommendation-details';
import UserRegistrationLogin from './pages/user-registration-login';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<ConsultationHistoryProfile />} />
        <Route path="/consultation-history-profile" element={<ConsultationHistoryProfile />} />
        <Route path="/product-search-browse" element={<ProductSearchBrowse />} />
        <Route path="/lumi-chat-consultation-interface" element={<LumiChatConsultationInterface />} />
        <Route path="/product-recommendation-details" element={<ProductRecommendationDetails />} />
        <Route path="/user-registration-login" element={<UserRegistrationLogin />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
