import { useEffect } from "react";
import ProductGallery from "../components/ProductGallery";

const BaseballUniforms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const products = [
    {
      title: "Professional Baseball Uniform",
      price: "39.99",
      category: "Baseball Uniforms",
      description:
        "Complete baseball uniform set with jersey and pants. Custom team colors and logos available.",
      images: [
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105294/rebelwear/streetwear-images/sportswear-images/baseball-uniform-1.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105294/rebelwear/streetwear-images/sportswear-images/baseball-uniform-2.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105295/rebelwear/streetwear-images/sportswear-images/baseball-uniform-3.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105296/rebelwear/streetwear-images/sportswear-images/baseball-uniform-4.jpg",
      ],
      badge: "Popular",
    },
    {
      title: "Elite Baseball Jersey",
      price: "19.99",
      category: "Baseball Uniforms",
      description:
        "Premium baseball uniform with breathable fabric and professional design.",
      images: [
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105288/rebelwear/streetwear-images/sportswear-images/baseball-jersey-1.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105289/rebelwear/streetwear-images/sportswear-images/baseball-jersey-2.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105290/rebelwear/streetwear-images/sportswear-images/baseball-jersey-3.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105291/rebelwear/streetwear-images/sportswear-images/baseball-jersey-4.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105292/rebelwear/streetwear-images/sportswear-images/baseball-jersey-5.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105293/rebelwear/streetwear-images/sportswear-images/baseball-jersey-6.jpg",
      ],
      badge: "Premium",
    },
  ];

  return (
    <div>
      <section className="relative min-h-[40vh] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white pt-24">
        <div className="container text-center">
          <h1 className="text-5xl font-black mb-8">Baseball Uniforms</h1>
          <p className="text-xl text-gray-300">
            Classic baseball jerseys and pants.
          </p>
        </div>
      </section>
      <section className="py-24 bg-white">
        <div className="container">
          <h2 className="section-title mb-12">Baseball Uniforms Collection</h2>
          <ProductGallery products={products} />
        </div>
      </section>
    </div>
  );
};

export default BaseballUniforms;
