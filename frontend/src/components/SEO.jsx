import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://rebelwearstore.netlify.app";
const DEFAULT_IMAGE = "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105167/rebelwear/rebelwear.jpg";

/**
 * High-performance, zero-dependency SEO & Structured Data Head Manager for React Vite SPAs.
 * Dynamically synchronizes document title, canonical, meta descriptions, robots, OG/Twitter tags,
 * and JSON-LD schema into the document head on every route transition.
 */
const SEO = ({
  title,
  description,
  keywords,
  canonical,
  image = DEFAULT_IMAGE,
  type = "website",
  noIndex = false,
  schema = null,
}) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const canonicalUrl = canonical || `${BASE_URL}${currentPath === "/" ? "" : currentPath}`;
  const fullTitle = title
    ? (title.includes("REBELWEAR") ? title : `${title} | REBELWEAR`)
    : "REBELWEAR | Premium Streetwear & Custom Team Uniforms Manufacturer";

  const metaDesc =
    description ||
    "REBELWEAR is an international manufacturer of premium heavyweight streetwear, graphic tees, hoodies, and custom athletic team uniforms. Worldwide delivery with bespoke design services.";

  useEffect(() => {
    // 1. Update Title
    document.title = fullTitle;

    // Helper to get or create a meta tag
    const setMetaTag = (attribute, name, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attribute, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Helper to get or create a link tag
    const setLinkTag = (rel, href) => {
      if (!href) return;
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", rel);
        document.head.appendChild(el);
      }
      el.setAttribute("href", href);
    };

    // 2. Core Meta
    setMetaTag("name", "description", metaDesc);
    if (keywords) {
      setMetaTag("name", "keywords", keywords);
    }
    setMetaTag(
      "name",
      "robots",
      noIndex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    );

    // 3. Canonical Link
    setLinkTag("canonical", canonicalUrl);

    // 4. Open Graph Tags
    setMetaTag("property", "og:title", fullTitle);
    setMetaTag("property", "og:description", metaDesc);
    setMetaTag("property", "og:url", canonicalUrl);
    setMetaTag("property", "og:image", image);
    setMetaTag("property", "og:type", type);
    setMetaTag("property", "og:site_name", "REBELWEAR");

    // 5. Twitter Card Tags
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", fullTitle);
    setMetaTag("name", "twitter:description", metaDesc);
    setMetaTag("name", "twitter:image", image);

    // 6. JSON-LD Dynamic Schema Injection
    let schemaScript = document.getElementById("rebelwear-dynamic-schema");
    if (schema) {
      if (!schemaScript) {
        schemaScript = document.createElement("script");
        schemaScript.id = "rebelwear-dynamic-schema";
        schemaScript.type = "application/ld+json";
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(schema);
    } else if (schemaScript) {
      schemaScript.remove();
    }

    return () => {
      // Optional cleanup on component unmount
    };
  }, [fullTitle, metaDesc, keywords, canonicalUrl, image, type, noIndex, schema]);

  return null;
};

export default SEO;
