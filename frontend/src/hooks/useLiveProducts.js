import { useState, useEffect } from "react";
import { getApiBaseUrl } from "../utils/apiConfig";

/**
 * useLiveProducts - Hook to load live products from the backend API
 * with instant fallback to the static prerendered catalog.
 *
 * @param {string} categoryName - Category name or identifier (e.g. "Hoodies", "T-Shirts")
 * @param {Array} initialProducts - Initial static product list
 * @returns {Array} - Array of products (live if available, initial otherwise)
 */
export const useLiveProducts = (categoryName, initialProducts = []) => {
  const [products, setProducts] = useState(initialProducts);

  useEffect(() => {
    let isMounted = true;

    const fetchCategoryProducts = async () => {
      try {
        const apiBase = getApiBaseUrl();
        const res = await fetch(
          `${apiBase}/products?category=${encodeURIComponent(categoryName)}`
        );
        if (res.ok) {
          const data = await res.json();
          if (
            isMounted &&
            data.success &&
            Array.isArray(data.products) &&
            data.products.length > 0
          ) {
            setProducts(data.products);
          }
        }
      } catch (err) {
        // Silently preserve initialProducts on network failure or offline mode
      }
    };

    fetchCategoryProducts();

    return () => {
      isMounted = false;
    };
  }, [categoryName]);

  return products;
};

export default useLiveProducts;

