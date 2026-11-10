import { useEffect } from "react";
import ProductGallery from "../components/ProductGallery";
import SEO from "../components/SEO";

const SoccerUniforms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const products = [
    {
      title: "Professional Soccer Uniform",
      price: "29.99",
      category: "Soccer Uniforms",
      slug: "professional-soccer-uniform",
      description:
        "Complete soccer uniform set with match jersey and ergonomic shorts. Sublimated team colors, numbers, and sponsor badges.",
      images: [
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105326/rebelwear/streetwear-images/sportswear-images/soccer-uniform-3.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105325/rebelwear/streetwear-images/sportswear-images/soccer-uniform-2.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105324/rebelwear/streetwear-images/sportswear-images/soccer-uniform-1.jpg",
      ],
      badge: "Popular",
    },
    {
      title: "Elite Soccer Jersey",
      price: "29.99",
      category: "Soccer Uniforms",
      slug: "elite-soccer-jersey",
      description:
        "Premium aerodynamic match jersey with laser-cut ventilation zones, flatlock seams, and sweat-expelling microfibers.",
      images: [
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105321/rebelwear/streetwear-images/sportswear-images/soccer-jersey-8.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105315/rebelwear/streetwear-images/sportswear-images/soccer-jersey-1.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105316/rebelwear/streetwear-images/sportswear-images/soccer-jersey-2.jpg",
      ],
      badge: "Premium",
    },
    {
      title: "Custom Team Soccer Kit",
      price: "169.99",
      category: "Soccer Uniforms",
      slug: "custom-soccer-kit",
      description:
        "Complete team package including home and away jerseys, matching shorts, and technical soccer socks for full rosters.",
      images: [
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105322/rebelwear/streetwear-images/sportswear-images/soccer-kit-1.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105323/rebelwear/streetwear-images/soccer-kit-2.jpg",
      ],
    },
  ];

  const soccerSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://rebelwearstore.netlify.app/soccer-uniforms#breadcrumb',
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
            'name': 'Soccer Uniforms',
            'item': 'https://rebelwearstore.netlify.app/soccer-uniforms'
          }
        ]
      },
      {
        '@type': 'CollectionPage',
        '@id': 'https://rebelwearstore.netlify.app/soccer-uniforms#collection',
        'name': 'Custom Soccer Uniforms & Sublimated Football Kits | REBELWEAR',
        'description': 'Manufacturer of custom soccer uniforms, match jerseys, team kits, and sublimated athletic apparel.',
        'url': 'https://rebelwearstore.netlify.app/soccer-uniforms'
      }
    ]
  };

  return (
    <div>
      <SEO
        title="Custom Soccer Uniforms & Sublimated Football Kits | REBELWEAR"
        description="Shop custom soccer uniforms and match kits by REBELWEAR. Ultra-lightweight aeromesh, anti-fade dye sublimation, player numbers, club crests, and worldwide team delivery."
        keywords="custom soccer uniforms, soccer jerseys, sublimated football kit, team soccer kits, youth soccer jerseys"
        canonical="https://rebelwearstore.netlify.app/soccer-uniforms"
        schema={soccerSchema}
      />

      <section className="relative min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-black/85 to-gray-900/90"></div>
        <div className="container relative z-10 text-center max-w-4xl px-5">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 border border-secondary/40 text-secondary text-xs sm:text-sm font-bold uppercase tracking-widest mb-4">
            Pitch Performance Gear
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-4 tracking-wider uppercase bg-gradient-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent">
            Custom Soccer Uniforms
          </h1>
          <p className="text-xl sm:text-2xl font-light mb-4 text-gray-300">
            Lightweight Match Jerseys & High-Ventilation Shorts
          </p>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Built for pitch agility and sustained sprint endurance with moisture-expelling microfibers, zero-weight sublimated club crests, and reinforced seams.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container">
          <div className="flex justify-between items-end mb-12 flex-wrap gap-4">
            <div>
              <h2 className="section-title text-left !mb-2">Soccer Uniform Lineup</h2>
              <p className="text-neutral-500 text-sm">Pro match uniforms, individual jerseys, and full team kits.</p>
            </div>
            <span className="text-xs font-mono text-neutral-400">Showing {products.length} Packages</span>
          </div>
          <ProductGallery products={products} />
        </div>
      </section>
    </div>
  );
};

export default SoccerUniforms;
