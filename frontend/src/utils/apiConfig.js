/**
 * REBELWEAR Centralized API & Backend URL Configuration
 *
 * Automatically normalizes API URLs, handles missing protocols (https://),
 * trailing slashes, and environment-based fallbacks.
 */

export const sanitizeUrl = (rawUrl) => {
  if (!rawUrl || typeof rawUrl !== "string") return "";
  let url = rawUrl.trim();

  // If protocol is missing and it's not a relative path starting with '/'
  if (!url.startsWith("http://") && !url.startsWith("https://") && !url.startsWith("/")) {
    url = `https://${url}`;
  }

  // Remove trailing slashes
  return url.replace(/\/+$/, "");
};

export const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;

  if (envUrl && envUrl.trim()) {
    let sanitized = sanitizeUrl(envUrl);
    // Ensure /api suffix exists on the API base URL
    if (!sanitized.endsWith("/api")) {
      sanitized = `${sanitized}/api`;
    }
    return sanitized;
  }

  // Check if running in local browser environment
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return "http://localhost:3001/api";
    }
  }

  // Production fallback to Vercel deployment
  return "https://rebelwear.vercel.app/api";
};

export const getBackendBaseUrl = () => {
  const envUrl = import.meta.env.VITE_BACKEND_URL;

  if (envUrl && envUrl.trim()) {
    let sanitized = sanitizeUrl(envUrl);
    // Remove /api if present on backend base URL
    return sanitized.replace(/\/api$/, "");
  }

  const apiUrl = getApiBaseUrl();
  return apiUrl.replace(/\/api$/, "");
};
