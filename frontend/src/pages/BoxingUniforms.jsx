import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import ProductGallery from '../components/ProductGallery'

const BoxingUniforms = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const products = [
    {
      title: 'Pro Boxing Fight Trunks',
      price: '39.99',
      category: 'Boxing Uniforms',
      slug: 'pro-boxing-fight-trunks',
      description: 'High-sheen heavy satin fight shorts with 4-inch elastic waistband, side mobility slits, and custom name embroidery.',
      images: [
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105330/rebelwear/streetwear-images/sportswear-images/sport-accessory.webp',
      ],
      badge: 'Bestseller',
    },
    {
      title: 'Championship Boxing Robe',
      price: '69.99',
      category: 'Boxing Uniforms',
      slug: 'championship-boxing-robe',
      description: 'Full-length hooded ring entrance robe crafted from premium satin with contrast piping, deep pockets, and custom back embroidery.',
      images: [
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105167/rebelwear/rebelwear.jpg',
      ],
      badge: 'Popular',
    },
    {
      title: 'Corner Team Track Jacket & Shirt',
      price: '59.99',
      category: 'Boxing Uniforms',
      slug: 'corner-team-jacket',
      description: 'Full-zip cornerman warm-up jacket and matching dry-fit technical cornerman t-shirt for trainers and cutmen.',
      images: [
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105197/rebelwear/streetwear-images/classictrack1.jpg',
      ],
    },
  ]

  const boxingSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://rebelwearstore.netlify.app/boxing-uniforms#breadcrumb',
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
            'name': 'Boxing Uniforms',
            'item': 'https://rebelwearstore.netlify.app/boxing-uniforms'
          }
        ]
      },
      {
        '@type': 'CollectionPage',
        '@id': 'https://rebelwearstore.netlify.app/boxing-uniforms#collection',
        'name': 'Custom Boxing Uniforms, Fight Robes & Trunks | REBELWEAR',
        'description': 'Manufacturer of custom boxing apparel including satin ring walk robes, competition trunks, corner team jackets, and combat sports gear.',
        'url': 'https://rebelwearstore.netlify.app/boxing-uniforms'
      }
    ]
  };

  return (
    <div>
      <SEO
        title="Custom Boxing Uniforms, Fight Robes & Trunks | REBELWEAR"
        description="Shop custom boxing apparel by REBELWEAR. Luxury satin fight robes, custom embroidered competition trunks, and corner team apparel for amateur and professional fighters."
        keywords="custom boxing uniforms, boxing trunks, custom boxing robe, fight shorts, cornerman jackets, boxing gear manufacturer"
        canonical="https://rebelwearstore.netlify.app/boxing-uniforms"
        schema={boxingSchema}
      />

      <section className="relative min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-black/85 to-gray-900/90"></div>
        <div className="container relative z-10 text-center max-w-4xl px-5">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 border border-secondary/40 text-secondary text-xs sm:text-sm font-bold uppercase tracking-widest mb-4">
            Combat Championship Atelier
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-4 tracking-wider uppercase bg-gradient-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent">
            Custom Boxing Uniforms
          </h1>
          <p className="text-xl sm:text-2xl font-light mb-4 text-gray-300">
            Professional Satin Fight Robes, Competition Trunks & Corner Gear
          </p>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Tailored for professional and amateur fighters. Luxury high-sheen satin, secure non-slip elastic waistbands, and custom embroidered fighter branding.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container">
          <div className="flex justify-between items-end mb-12 flex-wrap gap-4">
            <div>
              <h2 className="section-title text-left !mb-2">Boxing Lineup & Ring Gear</h2>
              <p className="text-neutral-500 text-sm">Custom trunks, walkout robes, and matching cornerman kits.</p>
            </div>
            <span className="text-xs font-mono text-neutral-400">Showing {products.length} Packages</span>
          </div>

          <ProductGallery products={products} />

          {/* Detailed Boxing Specifications */}
          <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-neutral-900 text-white border border-neutral-800">
            <h3 className="text-2xl font-bold uppercase mb-6 text-center text-secondary">
              Combat Sports Craftsmanship Standards
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
              <div className="space-y-2">
                <h4 className="font-bold text-white text-base">Heavyweight Lustrous Satin</h4>
                <p className="text-neutral-400 leading-relaxed">
                  Smooth, low-friction luxury satin with anti-tear stitching that stands out under bright arena spotlights.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-white text-base">4-Inch Ergonomic Waistband</h4>
                <p className="text-neutral-400 leading-relaxed">
                  Multi-channel elastic band that secures the protective cup firmly in place without restricting torso rotation.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-white text-base">Intricate Stitched Lettering</h4>
                <p className="text-neutral-400 leading-relaxed">
                  Custom fight nicknames, sponsor patches, national flags, and metallic thread embroidery.
                </p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Link to="/#contact" className="btn-primary inline-block">
                Start Custom Fighter Order
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BoxingUniforms
