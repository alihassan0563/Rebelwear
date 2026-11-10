import { useEffect } from "react";
import ProductGallery from "../components/ProductGallery";
import SEO from "../components/SEO";

const BasketballUniforms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const products = [
    {
      title: "Professional Basketball Uniform",
      price: "26.99",
      category: "Basketball Uniforms",
      slug: "professional-basketball-uniform",
      description:
        "Complete basketball uniform set with sublimated jersey and athletic shorts. Custom team colors, player names, and numbers.",
      images: [
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105306/rebelwear/streetwear-images/sportswear-images/basketball-uniform-1.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105307/rebelwear/streetwear-images/sportswear-images/basketball-uniform-2.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105308/rebelwear/streetwear-images/sportswear-images/basketball-uniform-3.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105309/rebelwear/streetwear-images/sportswear-images/basketball-uniform-4.jpg",
      ],
      badge: "Popular",
    },
    {
      title: "Elite Basketball Jersey",
      price: "13.99",
      category: "Basketball Uniforms",
      slug: "elite-basketball-jersey",
      description:
        "Premium basketball game jersey with micro-mesh ventilation, anti-cling cut, and reinforced armholes.",
      images: [
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105299/rebelwear/streetwear-images/sportswear-images/basketball-jersey3.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105298/rebelwear/streetwear-images/sportswear-images/basketball-jersey2.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105297/rebelwear/streetwear-images/sportswear-images/basketball-jersey1.jpg",
      ],
      badge: "Premium",
    },
    {
      title: "Custom Team Basketball Kit",
      price: "139.99",
      category: "Basketball Uniforms",
      slug: "custom-team-uniforms",
      description:
        "Full tournament basketball kit including home and away reversible jerseys, warm-up shooter shirts, and game shorts.",
      images: [
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105305/rebelwear/streetwear-images/sportswear-images/basketball-kit4.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105303/rebelwear/streetwear-images/sportswear-images/basketball-kit2.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105304/rebelwear/streetwear-images/sportswear-images/basketball-kit3.jpg",
      ],
    },
  ];

  const basketballSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://rebelwearstore.netlify.app/basketball-uniforms#breadcrumb',
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
            'name': 'Team Uniforms',
            'item': 'https://rebelwearstore.netlify.app/uniforms'
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': 'Basketball Uniforms',
            'item': 'https://rebelwearstore.netlify.app/basketball-uniforms'
          }
        ]
      },
      {
        '@type': 'CollectionPage',
        '@id': 'https://rebelwearstore.netlify.app/basketball-uniforms#collection',
        'name': 'Custom Basketball Uniforms & Team Reversible Jerseys | REBELWEAR',
        'description': 'Manufacturer of custom basketball uniforms, sublimated basketball jerseys, shorts, and full team roster kits.',
        'url': 'https://rebelwearstore.netlify.app/basketball-uniforms'
      }
    ]
  };

  return (
    <div>
      <SEO
        title="Custom Basketball Uniforms & Team Reversible Jerseys | REBELWEAR"
        description="Shop custom basketball uniforms and sublimated team jerseys by REBELWEAR. Breathable DryTech mesh, reversible jerseys, custom numbers and roster printing with worldwide delivery."
        keywords="custom basketball uniforms, basketball jerseys, sublimated basketball kit, custom basketball shorts, youth basketball uniforms"
        canonical="https://rebelwearstore.netlify.app/basketball-uniforms"
        schema={basketballSchema}
      />

      <section className="relative min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-black/85 to-gray-900/90"></div>
        <div className="container relative z-10 text-center max-w-4xl px-5">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 border border-secondary/40 text-secondary text-xs sm:text-sm font-bold uppercase tracking-widest mb-4">
            Court Championship Gear
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-4 tracking-wider uppercase bg-gradient-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent">
            Custom Basketball Uniforms
          </h1>
          <p className="text-xl sm:text-2xl font-light mb-4 text-gray-300">
            Professional Basketball Jerseys & High-Mobility Shorts
          </p>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Engineered with moisture-wicking micro-mesh, anti-fade heat-set dye sublimation, and athletic tailored armholes that eliminate chafing during intense full-court play.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container">
          <div className="flex justify-between items-end mb-12 flex-wrap gap-4">
            <div>
              <h2 className="section-title text-left !mb-2">Basketball Uniform Lineup</h2>
              <p className="text-neutral-500 text-sm">Custom team kits, game jerseys, and matching tournament shorts.</p>
            </div>
            <span className="text-xs font-mono text-neutral-400">Showing {products.length} Packages</span>
          </div>
          <ProductGallery products={products} />
        </div>
      </section>
    </div>
  );
};

export default BasketballUniforms;
