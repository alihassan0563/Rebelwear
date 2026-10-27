import { useEffect } from "react";
import ProductGallery from "../components/ProductGallery";

const BasketballUniforms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const products = [
    {
      title: "Professional Basketball uniform",
      price: "26.99",
      category: "Basketball Uniforms",
      description:
        "Complete basketball uniform set with jersey and shorts. Custom team colors and logos available.",
      images: [
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105306/rebelwear/streetwear-images/sportswear-images/basketball-uniform-1.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105307/rebelwear/streetwear-images/sportswear-images/basketball-uniform-2.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105308/rebelwear/streetwear-images/sportswear-images/basketball-uniform-3.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105309/rebelwear/streetwear-images/sportswear-images/basketball-uniform-4.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105310/rebelwear/streetwear-images/sportswear-images/basketball-uniform-5.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105311/rebelwear/streetwear-images/sportswear-images/basketball-uniform-6.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105312/rebelwear/streetwear-images/sportswear-images/basketball-uniform-7.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105313/rebelwear/streetwear-images/sportswear-images/basketball-uniform-8.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105314/rebelwear/streetwear-images/sportswear-images/basketball-uniform-9.jpg",
      ],
      badge: "Popular",
    },
    {
      title: "Elite Basketball Jersey",
      price: "13.99",
      category: "Basketball Uniforms",
      description:
        "Premium basketball uniform with moisture-wicking fabric and professional design.",
      images: [
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105299/rebelwear/streetwear-images/sportswear-images/basketball-jersey3.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105298/rebelwear/streetwear-images/sportswear-images/basketball-jersey2.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105297/rebelwear/streetwear-images/sportswear-images/basketball-jersey1.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105300/rebelwear/streetwear-images/sportswear-images/basketball-jersey4.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105301/rebelwear/streetwear-images/sportswear-images/basketball-jersey5.jpg",
      ],
      badge: "Premium",
    },
    {
      title: "Custom Team Basketball Kit",
      price: "139.99",
      category: "Basketball Uniforms",
      description:
        "Customizable basketball uniform kit for teams. Available in all sizes and colors.",
      images: [
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105305/rebelwear/streetwear-images/sportswear-images/basketball-kit4.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105303/rebelwear/streetwear-images/sportswear-images/basketball-kit2.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105304/rebelwear/streetwear-images/sportswear-images/basketball-kit3.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105302/rebelwear/streetwear-images/sportswear-images/basketball-kit1.jpg",
      ],
    },
  ];

  return (
    <div>
      <section className="relative min-h-[40vh] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white pt-24">
        <div className="container text-center">
          <h1 className="text-5xl font-black mb-8">Basketball Uniforms</h1>
          <p className="text-xl text-gray-300">
            Professional basketball jerseys and shorts.
          </p>
        </div>
      </section>
      <section className="py-24 bg-white">
        <div className="container">
          <h2 className="section-title mb-12">
            Basketball Uniforms Collection
          </h2>
          <ProductGallery products={products} />
        </div>
      </section>
    </div>
  );
};

export default BasketballUniforms;
