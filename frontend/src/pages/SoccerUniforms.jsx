import { useEffect } from "react";
import ProductGallery from "../components/ProductGallery";

const SoccerUniforms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const products = [
    {
      title: "Professional Soccer Uniform",
      price: "29.99",
      category: "Soccer Uniforms",
      description:
        "Complete soccer uniform set with jersey and shorts. Custom team colors and logos available.",
      images: [
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105326/rebelwear/streetwear-images/sportswear-images/soccer-uniform-3.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105325/rebelwear/streetwear-images/sportswear-images/soccer-uniform-2.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105324/rebelwear/streetwear-images/sportswear-images/soccer-uniform-1.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105327/rebelwear/streetwear-images/sportswear-images/soccer-uniform-4.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105328/rebelwear/streetwear-images/sportswear-images/soccer-uniform-5.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105329/rebelwear/streetwear-images/sportswear-images/soccer-uniform-6.jpg",
      ],
      badge: "Popular",
    },
    {
      title: "Elite Soccer Jersey",
      price: "29.99",
      category: "Soccer Uniforms",
      description:
        "Premium soccer uniform with weather-resistant fabric and professional design.",
      images: [
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105321/rebelwear/streetwear-images/sportswear-images/soccer-jersey-8.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105315/rebelwear/streetwear-images/sportswear-images/soccer-jersey-1.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105316/rebelwear/streetwear-images/sportswear-images/soccer-jersey-2.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105317/rebelwear/streetwear-images/sportswear-images/soccer-jersey-3.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105318/rebelwear/streetwear-images/sportswear-images/soccer-jersey-4.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105319/rebelwear/streetwear-images/sportswear-images/soccer-jersey-5.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105319/rebelwear/streetwear-images/sportswear-images/soccer-jersey-6.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105320/rebelwear/streetwear-images/sportswear-images/soccer-jersey-7.jpg",
      ],
      badge: "Premium",
    },
    {
      title: "Custom Team Soccer Kit",
      price: "169.99",
      category: "Soccer Uniforms",
      description:
        "Customizable soccer uniform kit for teams. Available in all sizes and colors.",
      images: [
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105322/rebelwear/streetwear-images/sportswear-images/soccer-kit-1.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105323/rebelwear/streetwear-images/sportswear-images/soccer-kit-2.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105323/rebelwear/streetwear-images/sportswear-images/soccer-kit-3.jpg",
      ],
    },
  ];

  return (
    <div>
      <section className="relative min-h-[40vh] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white pt-24">
        <div className="container text-center">
          <h1 className="text-5xl font-black mb-8">Soccer Uniforms</h1>
          <p className="text-xl text-gray-300">
            Lightweight soccer jerseys and shorts.
          </p>
        </div>
      </section>
      <section className="py-24 bg-white">
        <div className="container">
          <h2 className="section-title mb-12">Soccer Uniforms Collection</h2>
          <ProductGallery products={products} />
        </div>
      </section>
    </div>
  );
};

export default SoccerUniforms;
