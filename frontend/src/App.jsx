import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { usePageTracking } from "./utils/analytics";

// Code-split storefront & admin pages for optimal Core Web Vitals and PageSpeed scores
const Streetwear = lazy(() => import("./pages/Streetwear"));
const Uniforms = lazy(() => import("./pages/Uniforms"));
const Hoodies = lazy(() => import("./pages/Hoodies"));
const Tshirts = lazy(() => import("./pages/Tshirts"));
const Tracksuits = lazy(() => import("./pages/Tracksuits"));
const Jackets = lazy(() => import("./pages/Jackets"));
const Sweatshirts = lazy(() => import("./pages/Sweatshirts"));
const Accessories = lazy(() => import("./pages/Accessories"));
const UniformAccessories = lazy(() => import("./pages/UniformAccessories"));
const BasketballUniforms = lazy(() => import("./pages/BasketballUniforms"));
const FootballUniforms = lazy(() => import("./pages/FootballUniforms"));
const SoccerUniforms = lazy(() => import("./pages/SoccerUniforms"));
const BaseballUniforms = lazy(() => import("./pages/BaseballUniforms"));
const HockeyUniforms = lazy(() => import("./pages/HockeyUniforms"));
const BoxingUniforms = lazy(() => import("./pages/BoxingUniforms"));
const About = lazy(() => import("./pages/About"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const OrderPage = lazy(() => import("./pages/OrderPage"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Minimal branded loading fallback to prevent CLS (Cumulative Layout Shift)
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center bg-black/5" aria-hidden="true">
    <div className="w-8 h-8 border-3 border-[#ff3d00] border-t-transparent rounded-full animate-spin" />
  </div>
);

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  // Record virtual page views on route change for SPA accuracy in Google Analytics 4
  usePageTracking();

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdmin && <Navbar />}
      <main className="flex-grow">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Admin Command Suite (Restricted / Disallowed in robots.txt) */}
            <Route path="/admin" element={<AdminDashboard />} />

            {/* Core Storefront Hubs */}
            <Route path="/" element={<Home />} />
            <Route path="/streetwear" element={<Streetwear />} />
            <Route path="/uniforms" element={<Uniforms />} />
            <Route path="/about" element={<About />} />

            {/* Streetwear Categories */}
            <Route path="/hoodies" element={<Hoodies />} />
            <Route path="/tshirts" element={<Tshirts />} />
            <Route path="/tracksuits" element={<Tracksuits />} />
            <Route path="/jackets" element={<Jackets />} />
            <Route path="/sweatshirts" element={<Sweatshirts />} />
            <Route path="/accessories" element={<Accessories />} />

            {/* Sportswear Uniform Categories */}
            <Route path="/basketball-uniforms" element={<BasketballUniforms />} />
            <Route path="/football-uniforms" element={<FootballUniforms />} />
            <Route path="/soccer-uniforms" element={<SoccerUniforms />} />
            <Route path="/baseball-uniforms" element={<BaseballUniforms />} />
            <Route path="/hockey-uniforms" element={<HockeyUniforms />} />
            <Route path="/boxing-uniforms" element={<BoxingUniforms />} />
            <Route path="/uniform-accessories" element={<UniformAccessories />} />

            {/* Dynamic Product & Checkout Routes */}
            <Route path="/product/:slug" element={<ProductDetail />} />
            <Route path="/order/:productSlug/:imageIndex" element={<OrderPage />} />

            {/* 404 Catch-All Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      {!isAdmin && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
