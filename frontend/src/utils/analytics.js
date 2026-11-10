import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Google Analytics 4 Measurement ID configured via environment variables (.env)
// Never hardcode API keys or secrets in frontend bundles
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

/**
 * Initialize Google Analytics 4 script asynchronously if a Measurement ID is provided.
 */
export const initGA = () => {
  if (typeof window === "undefined" || !GA_MEASUREMENT_ID) {
    return;
  }

  // Avoid duplicate injection
  if (document.getElementById("ga-script")) return;

  const script = document.createElement("script");
  script.id = "ga-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID, {
    send_page_view: false, // Managed manually on route change for SPA accuracy
  });
};

/**
 * Track virtual page views for Single Page Applications (SPA).
 */
export const trackPageView = (path, title) => {
  if (typeof window === "undefined" || !window.gtag || !GA_MEASUREMENT_ID) return;

  window.gtag("event", "page_view", {
    page_title: title || document.title,
    page_location: window.location.href,
    page_path: path || window.location.pathname,
  });
};

/**
 * Track custom events (e.g. clicks, interactions, submissions).
 */
export const trackEvent = (action, params = {}) => {
  if (typeof window === "undefined" || !window.gtag || !GA_MEASUREMENT_ID) {
    // Development fallback log
    if (import.meta.env.DEV) {
      console.log(`[GA Event] ${action}:`, params);
    }
    return;
  }

  window.gtag("event", action, params);
};

/**
 * Track e-commerce and conversion events
 */
export const trackProductView = (product) => {
  if (!product) return;
  trackEvent("view_item", {
    currency: "USD",
    value: parseFloat(product.price) || 0,
    items: [
      {
        item_id: product.slug || product._id || product.title,
        item_name: product.title,
        item_category: product.category,
        price: parseFloat(product.price) || 0,
      },
    ],
  });
};

export const trackBeginCheckout = (product, size, quantity = 1) => {
  if (!product) return;
  trackEvent("begin_checkout", {
    currency: "USD",
    value: (parseFloat(product.price) || 0) * quantity,
    items: [
      {
        item_id: product.slug || product.title,
        item_name: product.title,
        item_category: product.category,
        item_variant: size,
        quantity: quantity,
        price: parseFloat(product.price) || 0,
      },
    ],
  });
};

export const trackOrderCompleted = (orderData) => {
  if (!orderData) return;
  trackEvent("purchase", {
    transaction_id: `ord_${Date.now()}`,
    currency: "USD",
    value: parseFloat(orderData.price) || 0,
    items: [
      {
        item_name: orderData.productName,
        item_variant: orderData.size,
        quantity: orderData.quantity,
      },
    ],
  });
};

export const trackContactInquiry = (inquiryType) => {
  trackEvent("generate_lead", {
    event_category: "Contact",
    event_label: inquiryType,
  });
};

/**
 * React hook to automatically track SPA page views across route changes.
 */
export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    initGA();
    trackPageView(location.pathname + location.search);
  }, [location]);
};
