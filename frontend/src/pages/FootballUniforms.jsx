import { useEffect } from "react";
import ProductGallery from "../components/ProductGallery";
import SEO from "../components/SEO";

const FootballUniforms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const products = [
    {
      title: "Professional Football Uniform",
      price: "59.99",
      category: "American Football Uniforms",
      slug: "professional-football-uniform",
      description:
        "Complete football uniform set with heavy-duty 4-way stretch jersey and integrated pad pants. Custom team colors and tackle-twill numbering.",
      images: [
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105268/rebelwear/streetwear-images/sportswear-images/american-football-uniform-10.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105267/rebelwear/streetwear-images/sportswear-images/american-football-uniform-1.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105269/rebelwear/streetwear-images/sportswear-images/american-football-uniform-2.jpg",
      ],
      badge: "Popular",
    },
    {
      title: "Elite Football Jersey",
      price: "39.99",
      category: "American Football Uniforms",
      slug: "elite-football-jersey",
      description:
        "Premium game jersey with reinforced double-ply dazzle shoulders, stretch mesh body panels, and elastic sleeve cuffs.",
      images: [
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105278/rebelwear/streetwear-images/sportswear-images/american-jersey-2.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105276/rebelwear/streetwear-images/sportswear-images/american-jersey-1.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105279/rebelwear/streetwear-images/sportswear-images/american-jersey-3.jpg",
      ],
      badge: "Premium",
    },
    {
      title: "Custom Team Football Kit",
      price: "149.99",
      category: "American Football Uniforms",
      slug: "custom-football-kit",
      description:
        "Full team football tournament kit including home and away game jerseys, practice mesh pinnies, and compression game pants.",
      images: [
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105287/rebelwear/streetwear-images/sportswear-images/american-kit-3.jpg",
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105285/rebelwear/streetwear-images/sportswear-images/american-kit-1.jpg",
      ],
    },
  ];

  const footballSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://rebelwearstore.netlify.app/football-uniforms#breadcrumb',
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
            'name': 'American Football Uniforms',
            'item': 'https://rebelwearstore.netlify.app/football-uniforms'
          }
        ]
      },
      {
        '@type': 'CollectionPage',
        '@id': 'https://rebelwearstore.netlify.app/football-uniforms#collection',
        'name': 'Custom American Football Uniforms & Jerseys | REBELWEAR',
        'description': 'Manufacturer of custom American football uniforms, sublimated game jerseys, pants, and team kits.',
        'url': 'https://rebelwearstore.netlify.app/football-uniforms'
      }
    ]
  };

  return (
    <div>
      <SEO
        title="Custom American Football Uniforms & Jerseys | REBELWEAR"
        description="Shop custom American football uniforms and game jerseys by REBELWEAR. Heavyweight spandex mesh, double-ply dazzle shoulders, pad-ready pants, and full team roster customization."
        keywords="custom football uniforms, football jerseys, sublimated football kit, youth football uniforms, custom gridiron jerseys"
        canonical="https://rebelwearstore.netlify.app/football-uniforms"
        schema={footballSchema}
      />

      <section className="relative min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-black/85 to-gray-900/90"></div>
        <div className="container relative z-10 text-center max-w-4xl px-5">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 border border-secondary/40 text-secondary text-xs sm:text-sm font-bold uppercase tracking-widest mb-4">
            Gridiron Battle Gear
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-4 tracking-wider uppercase bg-gradient-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent">
            Custom Football Uniforms
          </h1>
          <p className="text-xl sm:text-2xl font-light mb-4 text-gray-300">
            Durable Game Jerseys & Reinforced Pants for Gridiron Impact
          </p>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Engineered with high-tensile 4-way stretch spandex mesh, reinforced double-ply cowls, and pad-ready tailored pants built for the hardest hits.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container">
          <div className="flex justify-between items-end mb-12 flex-wrap gap-4">
            <div>
              <h2 className="section-title text-left !mb-2">Football Uniform Lineup</h2>
              <p className="text-neutral-500 text-sm">Full game uniforms, single jerseys, and tournament kits.</p>
            </div>
            <span className="text-xs font-mono text-neutral-400">Showing {products.length} Packages</span>
          </div>
          <ProductGallery products={products} />
        </div>
      </section>
    </div>
  );
};

export default FootballUniforms;
