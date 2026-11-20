import { useState, useEffect } from "react";
import { getApiBaseUrl } from "../utils/apiConfig";

/**
 * useLiveCategories - Hook to load live categories from the backend API
 * with instant fallback to the initial static category list.
 *
 * @param {string} parentType - "Streetwear" or "Sportswear" (optional filter)
 * @param {Array} initialCategories - Initial static categories list
 * @returns {Array} - Array of categories (live if available, initial otherwise)
 */
export const useLiveCategories = (parentType, initialCategories = []) => {
  const [categories, setCategories] = useState(initialCategories);

  useEffect(() => {
    let isMounted = true;

    const fetchCategories = async () => {
      try {
        const apiBase = getApiBaseUrl();
        const res = await fetch(`${apiBase}/categories`);
        if (res.ok) {
          const data = await res.json();
          if (
            isMounted &&
            data.success &&
            Array.isArray(data.categories) &&
            data.categories.length > 0
          ) {
            const filtered = parentType
              ? data.categories.filter(
                  (c) =>
                    c.parentType?.toLowerCase() === parentType.toLowerCase()
                )
              : data.categories;

            if (filtered.length > 0) {
              setCategories(filtered);
            }
          }
        }
      } catch (err) {
        // Silently preserve initialCategories on network failure or offline mode
      }
    };

    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, [parentType]);

  return categories;
};

export default useLiveCategories;

