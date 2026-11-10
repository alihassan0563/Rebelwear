import { useEffect } from "react";
import ProductGallery from "../components/ProductGallery";
import SEO from "../components/SEO";

const BaseballUniforms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const products = [
    {
      title: "Professional Baseball Uniform",
      price: "39.99",
      category: "Baseball Uniforms",
      slug: "professional-baseball-uniform",
      description:
        "Complete baseball uniform set with button-front jersey and double-knee sliding pants. Custom team colors, script font lettering, and numbers.",
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
      slug: "elite-baseball-jersey",
      description:
        "Premium button-down baseball jersey with pro-weight moisture-wicking warp knit fabric and athletic sleeve piping.",
      images: [
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105288/rebelwear/streetwear-images/sportswear-images/baseball-jersey-1.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105289/rebelwear/streetwear-images/sportswear-images/baseball-jersey-2.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105290/rebelwear/streetwear-images/sportswear-images/baseball-jersey-3.jpg",
      ],
      badge: "Premium",
    },
  ];

  const baseballSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://rebelwearstore.netlify.app/baseball-uniforms#breadcrumb',
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
            'name': 'Baseball Uniforms',
            'item': 'https://rebelwearstore.netlify.app/baseball-uniforms'
          }
        ]
      },
      {
        '@type': 'CollectionPage',
        '@id': 'https://rebelwearstore.netlify.app/baseball-uniforms#collection',
        'name': 'Custom Baseball Uniforms & Button-Down Jerseys | REBELWEAR',
        'description': 'Manufacturer of custom baseball uniforms, button-down team jerseys, sliding pants, and team hats.',
        'url': 'https://rebelwearstore.netlify.app/baseball-uniforms'
      }
    ]
  };

  return (
    <div>
      <SEO
        title="Custom Baseball Uniforms & Button-Down Jerseys | REBELWEAR"
        description="Shop custom baseball uniforms and button-down jerseys by REBELWEAR. Heavy-duty breathable warp knit, reinforced sliding pants, custom team crests, and youth/adult sizing."
        keywords="custom baseball uniforms, baseball jerseys, button down baseball jerseys, custom baseball pants, team baseball apparel"
        canonical="https://rebelwearstore.netlify.app/baseball-uniforms"
        schema={baseballSchema}
      />

      <section className="relative min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-black/85 to-gray-900/90"></div>
        <div className="container relative z-10 text-center max-w-4xl px-5">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 border border-secondary/40 text-secondary text-xs sm:text-sm font-bold uppercase tracking-widest mb-4">
            Diamond Heritage Uniforms
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-4 tracking-wider uppercase bg-gradient-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent">
            Custom Baseball Uniforms
          </h1>
          <p className="text-xl sm:text-2xl font-light mb-4 text-gray-300">
            Classic Button-Down Baseball Jerseys & Reinforced Game Pants
          </p>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Crafted for peak diamond performance with heavy-duty warp-knit poly, double-reinforced sliding knees, and tackle-twill or sublimated script typography.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container">
          <div className="flex justify-between items-end mb-12 flex-wrap gap-4">
            <div>
              <h2 className="section-title text-left !mb-2">Baseball Uniform Lineup</h2>
              <p className="text-neutral-500 text-sm">Full uniform sets and individual button-down game jerseys.</p>
            </div>
            <span className="text-xs font-mono text-neutral-400">Showing {products.length} Packages</span>
          </div>
          <ProductGallery products={products} />
        </div>
      </section>
    </div>
  );
};

export default BaseballUniforms;
