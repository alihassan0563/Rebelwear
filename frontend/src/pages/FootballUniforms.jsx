import { useEffect } from "react";
import ProductGallery from "../components/ProductGallery";

const FootballUniforms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const products = [
    {
      title: "Professional Football Uniform",
      price: "59.99",
      category: "American Football Uniforms",
      description:
        "Complete football uniform set with jersey and pants. Custom team colors and logos available.",
      images: [
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105268/rebelwear/streetwear-images/sportswear-images/american-football-uniform-10.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105267/rebelwear/streetwear-images/sportswear-images/american-football-uniform-1.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105269/rebelwear/streetwear-images/sportswear-images/american-football-uniform-2.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105270/rebelwear/streetwear-images/sportswear-images/american-football-uniform-3.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105271/rebelwear/streetwear-images/sportswear-images/american-football-uniform-4.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105272/rebelwear/streetwear-images/sportswear-images/american-football-uniform-5.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105273/rebelwear/streetwear-images/sportswear-images/american-football-uniform-6.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105274/rebelwear/streetwear-images/sportswear-images/american-football-uniform-7.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105275/rebelwear/streetwear-images/sportswear-images/american-football-uniform-8.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105275/rebelwear/streetwear-images/sportswear-images/american-football-uniform-9.jpg",
      ],
      badge: "Popular",
    },
    {
      title: "Elite Football Jersey",
      price: "39.99",
      category: "American Football Uniforms",
      description:
        "Premium football uniform with quick-dry fabric and professional design.",
      images: [
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105278/rebelwear/streetwear-images/sportswear-images/american-jersey-2.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105276/rebelwear/streetwear-images/sportswear-images/american-jersey-1.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105279/rebelwear/streetwear-images/sportswear-images/american-jersey-3.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105280/rebelwear/streetwear-images/sportswear-images/american-jersey-4.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105281/rebelwear/streetwear-images/sportswear-images/american-jersey-5.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105282/rebelwear/streetwear-images/sportswear-images/american-jersey-6.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105283/rebelwear/streetwear-images/sportswear-images/american-jersey-7.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105283/rebelwear/streetwear-images/sportswear-images/american-jersey-8.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105284/rebelwear/streetwear-images/sportswear-images/american-jersey-9.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105277/rebelwear/streetwear-images/sportswear-images/american-jersey-10.jpg",
      ],
      badge: "Premium",
    },
    {
      title: "Custom Team Football Kit",
      price: "149.99",
      category: "American Football Uniforms",
      description:
        "Customizable football uniform kit for teams. Available in all sizes and colors.",
      images: [
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105287/rebelwear/streetwear-images/sportswear-images/american-kit-3.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105285/rebelwear/streetwear-images/sportswear-images/american-kit-1.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105286/rebelwear/streetwear-images/sportswear-images/american-kit-2.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105287/rebelwear/streetwear-images/sportswear-images/american-kit-4.jpg",
      ],
    },
  ];

  return (
    <div>
      <section className="relative min-h-[40vh] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white pt-24">
        <div className="container text-center">
          <h1 className="text-5xl font-black mb-8">
            American Football Uniforms
          </h1>
          <p className="text-xl text-gray-300">
            Durable football jerseys for the gridiron.
          </p>
        </div>
      </section>
      <section className="py-24 bg-white">
        <div className="container">
          <h2 className="section-title mb-12">
            American Football Uniforms Collection
          </h2>
          <ProductGallery products={products} />
        </div>
      </section>
    </div>
  );
};

export default FootballUniforms;
