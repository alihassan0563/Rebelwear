import { useEffect } from "react";
import ProductGallery from "../components/ProductGallery";

const Hoodies = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const products = [
    {
      title: "Classic Hoodie",
      price: "34.99",
      category: "Streetwear",
      description:
        "Timeless style with premium comfort. Clean design, everyday comfort.",
      images: [
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105192/rebelwear/streetwear-images/classichoodie1.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105193/rebelwear/streetwear-images/classichoodie2.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105194/rebelwear/streetwear-images/classichoodie3.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105195/rebelwear/streetwear-images/classichoodie4.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105196/rebelwear/streetwear-images/classichoodie6.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105208/rebelwear/streetwear-images/classsichoodie5.jpg",
      ],
      badge: "Popular",
    },
    {
      title: "Oversize Hoodie",
      price: "29.99",
      category: "Streetwear",
      description: "Relaxed fit for ultimate comfort. Street-ready silhouette.",
      images: [
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105231/rebelwear/streetwear-images/oversizehoodie1.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105233/rebelwear/streetwear-images/oversizehoodie2.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105233/rebelwear/streetwear-images/oversizehoodie3.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105234/rebelwear/streetwear-images/oversizehoodie4.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105235/rebelwear/streetwear-images/oversizehoodie5.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105236/rebelwear/streetwear-images/oversizehoodie6.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105237/rebelwear/streetwear-images/oversizehoodie7.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105238/rebelwear/streetwear-images/oversizehoodie8.jpg",
      ],
    },
    {
      title: "Pullover Hoodie",
      price: "29.99",
      category: "Streetwear",
      description:
        "Classic pullover design with comfortable fit and premium quality.",
      images: [
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105259/rebelwear/streetwear-images/pulloverhoodie1.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105260/rebelwear/streetwear-images/pulloverhoodie2.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105261/rebelwear/streetwear-images/pulloverhoodie3.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105261/rebelwear/streetwear-images/pulloverhoodie4.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105263/rebelwear/streetwear-images/pulloverhoodie5.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105264/rebelwear/streetwear-images/pulloverhoodie6.jpg",
      ],
    },
    {
      title: "Zip Hoodie",
      price: "29.99",
      category: "Streetwear",
      description:
        "Versatile zip-up design. Functional zip with soft fleece interior.",
      images: [
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105368/rebelwear/streetwear-images/ziphoodie1.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105369/rebelwear/streetwear-images/ziphoodie2.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105370/rebelwear/streetwear-images/ziphoodie3.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105370/rebelwear/streetwear-images/ziphoodie4.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105371/rebelwear/streetwear-images/ziphoodie5.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105372/rebelwear/streetwear-images/ziphoodie6.jpg",
      ],
    },
    {
      title: "Rebel Hoodie",
      price: "29.99",
      category: "Streetwear",
      description:
        "Warm, bold, and made to stand out. Premium cotton blend with custom graphics.",
      images: [
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105222/rebelwear/streetwear-images/h11.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105223/rebelwear/streetwear-images/h12.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105223/rebelwear/streetwear-images/hoo1.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105224/rebelwear/streetwear-images/hoo2.jpg",
        // 'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105225/rebelwear/streetwear-images/hood3.avif',
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105226/rebelwear/streetwear-images/hoodi2.avif",
        // 'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105227/rebelwear/streetwear-images/hoodie1.avif',
      ],
      badge: "New",
    },
    {
      title: "Custom Hoodie",
      price: "Custom Quote",
      category: "Special Orders",
      description:
        "Your design, our quality. Have a unique design in mind? Contact us for personalized solutions.",
      images: ["https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105210/rebelwear/streetwear-images/customhoodie.webp"],
    },
  ];

  return (
    <div>
      <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-gray-900/90"></div>
        <div className="container relative z-10 text-center max-w-4xl px-5">
          <h1 className="text-2xl md:text-7xl   font-bold mb-4 tracking-wider uppercase bg-gradient-to-r from-white to-secondary bg-clip-text text-transparent">
            Hoodies
          </h1>
          <p className="text-xl font-light mb-4 text-gray-300">
            Warm, bold, and made to stand out.
          </p>
        </div>
      </section>
      <section className="py-24 bg-white">
        <div className="container">
          <h2 className="section-title mb-12">Hoodies Collection</h2>
          <ProductGallery products={products} />
        </div>
      </section>
    </div>
  );
};

export default Hoodies;
