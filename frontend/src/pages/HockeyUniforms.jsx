import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import ProductGallery from '../components/ProductGallery'

const HockeyUniforms = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const products = [
    {
      title: 'Pro Ice Hockey Jersey',
      price: '54.99',
      category: 'Hockey Uniforms',
      slug: 'pro-ice-hockey-jersey',
      description: 'Pro-weight air-knit polyester hockey sweater with double-reinforced elbows, ventilated underarm gussets, and lace-up neck option.',
      images: [
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105169/rebelwear/sports-1.avif',
      ],
      badge: 'Pro Grade',
    },
    {
      title: 'Sublimated Team Hockey Jersey',
      price: '44.99',
      category: 'Hockey Uniforms',
      slug: 'sublimated-team-hockey-jersey',
      description: 'Full dye-sublimated hockey jersey with anti-fade team graphics, player numbers, and tackle twill embroidery options.',
      images: [
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105304/rebelwear/streetwear-images/sportswear-images/basketball-kit3.jpg',
      ],
      badge: 'Popular',
    },
    {
      title: 'Custom Hockey Shell & Socks Kit',
      price: '89.99',
      category: 'Hockey Uniforms',
      slug: 'custom-hockey-shell-kit',
      description: 'Coordinated ice hockey game package including sublimated jersey, heavy-duty pant shell, and pro-ribbed socks.',
      images: [
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105169/rebelwear/sports-1.avif',
      ],
    },
  ]

  const hockeySchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://rebelwearstore.netlify.app/hockey-uniforms#breadcrumb',
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
            'name': 'Hockey Uniforms',
            'item': 'https://rebelwearstore.netlify.app/hockey-uniforms'
          }
        ]
      },
      {
        '@type': 'CollectionPage',
        '@id': 'https://rebelwearstore.netlify.app/hockey-uniforms#collection',
        'name': 'Custom Hockey Jerseys & Ice Hockey Uniforms | REBELWEAR',
        'description': 'Manufacturer of custom ice hockey jerseys, sublimated team sweaters, pant shells, and pro hockey apparel.',
        'url': 'https://rebelwearstore.netlify.app/hockey-uniforms'
      }
    ]
  };

  return (
    <div>
      <SEO
        title="Custom Hockey Jerseys & Ice Hockey Uniforms | REBELWEAR"
        description="Shop custom ice hockey jerseys and team sweaters by REBELWEAR. Heavy-duty pro-weight air-knit polyester, reinforced elbows, fight straps, and full dye sublimation."
        keywords="custom hockey jerseys, ice hockey uniforms, sublimated hockey sweaters, hockey team apparel, roller hockey jerseys"
        canonical="https://rebelwearstore.netlify.app/hockey-uniforms"
        schema={hockeySchema}
      />

      <section className="relative min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-black/85 to-gray-900/90"></div>
        <div className="container relative z-10 text-center max-w-4xl px-5">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 border border-secondary/40 text-secondary text-xs sm:text-sm font-bold uppercase tracking-widest mb-4">
            Rink Performance Sweaters
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-4 tracking-wider uppercase bg-gradient-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent">
            Custom Hockey Uniforms
          </h1>
          <p className="text-xl sm:text-2xl font-light mb-4 text-gray-300">
            Professional Pro-Weight Ice Hockey Jerseys & Team Kits
          </p>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Engineered with heavy-duty snag-resistant air-knit polyester, double-layer elbow reinforcements, authentic fight straps, and fade-proof digital sublimation.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container">
          <div className="flex justify-between items-end mb-12 flex-wrap gap-4">
            <div>
              <h2 className="section-title text-left !mb-2">Hockey Uniform Lineup</h2>
              <p className="text-neutral-500 text-sm">Custom sweaters, pro shells, and complete tournament team uniforms.</p>
            </div>
            <span className="text-xs font-mono text-neutral-400">Showing {products.length} Packages</span>
          </div>

          <ProductGallery products={products} />

          {/* Detailed Hockey Specifications Section */}
          <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-neutral-900 text-white border border-neutral-800">
            <h3 className="text-2xl font-bold uppercase mb-6 text-center text-secondary">
              Ice & Roller Hockey Technical Specs
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
              <div className="space-y-2">
                <h4 className="font-bold text-white text-base">Pro Air-Knit Poly (300 GSM)</h4>
                <p className="text-neutral-400 leading-relaxed">
                  Heavy-gauge mesh knit engineered to withstand abrasive board contact and stick snags without tearing.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-white text-base">Double-Needle Reinforcements</h4>
                <p className="text-neutral-400 leading-relaxed">
                  Two layers of fabric on shoulders and elbows designed to accommodate standard hockey pad thickness.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-white text-base">Full Team Customization</h4>
                <p className="text-neutral-400 leading-relaxed">
                  Sublimated crests, multi-color sleeve stripes, captain C/A patches, and stitched tackle twill letters.
                </p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Link to="/#contact" className="btn-primary inline-block">
                Request Custom Hockey Team Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HockeyUniforms
