import { useEffect } from "react";
import ProductGallery from "../components/ProductGallery";
import SEO from "../components/SEO";

const Hoodies = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const products = [
    {
      title: "Classic Hoodie",
      price: "34.99",
      category: "Streetwear",
      slug: "classic-hoodie",
      description:
        "Timeless style with premium comfort. Clean design, everyday comfort crafted from 450 GSM combed cotton.",
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
      slug: "oversize-hoodie",
      description: "Relaxed drop-shoulder fit for ultimate comfort. Contemporary boxy street-ready silhouette.",
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
      badge: "Hot",
    },
    {
      title: "Pullover Hoodie",
      price: "29.99",
      category: "Streetwear",
      slug: "pullover-hoodie",
      description:
        "Classic pullover design with comfortable fit, kangaroo pocket, and premium brushed fleece lining.",
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
      slug: "zip-hoodie",
      description:
        "Versatile zip-up design with metal zipper hardware and cozy brushed cotton interior for effortless layering.",
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
      slug: "rebel-hoodie",
      description:
        "Warm, bold, and made to stand out. Premium cotton blend with high-density signature graphic print.",
      images: [
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105222/rebelwear/streetwear-images/h11.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105223/rebelwear/streetwear-images/h12.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105223/rebelwear/streetwear-images/hoo1.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105224/rebelwear/streetwear-images/hoo2.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105226/rebelwear/streetwear-images/hoodi2.avif",
      ],
      badge: "New",
    },
    {
      title: "Custom Hoodie",
      price: "Custom Quote",
      category: "Special Orders",
      slug: "custom-hoodie",
      description:
        "Your design, our manufacturing precision. Contact us for custom GSM weights, embroidery, puff print, and private labeling.",
      images: ["https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105210/rebelwear/streetwear-images/customhoodie.webp"],
    },
  ];

  const hoodiesSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://rebelwearstore.netlify.app/hoodies#breadcrumb',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': 'https://rebelwearstore.netlify.app'
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Streetwear',
            'item': 'https://rebelwearstore.netlify.app/streetwear'
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': 'Hoodies',
            'item': 'https://rebelwearstore.netlify.app/hoodies'
          }
        ]
      },
      {
        '@type': 'CollectionPage',
        '@id': 'https://rebelwearstore.netlify.app/hoodies#collection',
        'name': 'Custom Streetwear Hoodies & Oversized Hoodies | REBELWEAR',
        'description': 'Heavyweight streetwear hoodies including oversized drop shoulder silhouettes, classic pullovers, zip hoodies, and custom branded designs.',
        'url': 'https://rebelwearstore.netlify.app/hoodies'
      }
    ]
  };

  return (
    <div>
      <SEO
        title="Custom Streetwear Hoodies & Oversized Hoodies | REBELWEAR"
        description="Shop custom streetwear hoodies by REBELWEAR. Heavyweight 450 GSM fleece, oversized drop-shoulder hoodies, pullovers, and custom zip hoodies with global shipping."
        keywords="custom hoodies, streetwear hoodies, oversized hoodies, heavyweight hoodie manufacturer, custom pullover hoodie, wholesale hoodies"
        canonical="https://rebelwearstore.netlify.app/hoodies"
        schema={hoodiesSchema}
      />

      <section className="relative min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-black/85 to-gray-900/90"></div>
        <div className="container relative z-10 text-center max-w-4xl px-5">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 border border-secondary/40 text-secondary text-xs sm:text-sm font-bold uppercase tracking-widest mb-4">
            Heavyweight Fleece Collection
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-4 tracking-wider uppercase bg-gradient-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent">
            Custom Streetwear Hoodies
          </h1>
          <p className="text-xl sm:text-2xl font-light mb-4 text-gray-300">
            Warm, Bold, and Engineered to Stand Out
          </p>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Crafted from high-density 450 GSM combed cotton. Pre-shrunk, drop-shoulder silhouettes, and double-needle stitching tailored for everyday street style and custom private labeling.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container">
          <div className="flex justify-between items-end mb-12 flex-wrap gap-4">
            <div>
              <h2 className="section-title text-left !mb-2">Hoodies Lineup</h2>
              <p className="text-neutral-500 text-sm">Select an item to customize size, colorways, or order in bulk batches.</p>
            </div>
            <span className="text-xs font-mono text-neutral-400">Showing {products.length} Designs</span>
          </div>
          <ProductGallery products={products} />
        </div>
      </section>
    </div>
  );
};

export default Hoodies;
