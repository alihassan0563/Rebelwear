import { useEffect } from 'react'
import ProductGallery from '../components/ProductGallery'
import SEO from '../components/SEO'

const Sweatshirts = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  const products = [
    {
      title: 'Crewneck Sweatshirt',
      price: '45.00',
      category: 'Streetwear',
      slug: 'crewneck-sweatshirt',
      description: 'Classic comfort in premium fabric. Soft 420 GSM brushed fleece interior, coverstitched seams, and clean street design.',
      images: [
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105333/rebelwear/streetwear-images/sweatshirt2.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105332/rebelwear/streetwear-images/sweatshirt1.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105334/rebelwear/streetwear-images/sweatshirt3.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105334/rebelwear/streetwear-images/sweatshirt4.jpg',
      ],
      badge: 'Bestseller',
    },
    {
      title: 'Half Zip Sweatshirt',
      price: '49.00',
      category: 'Streetwear',
      slug: 'half-zip-sweatshirt',
      description: 'Versatile quarter-zip collar design with antique silver zipper hardware. Minimalist aesthetic, maximum layering warmth.',
      images: [
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105373/rebelwear/streetwear-images/zipsweat1.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105374/rebelwear/streetwear-images/zipsweat2.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105375/rebelwear/streetwear-images/zipsweat3.jpg',
      ],
    },
    {
      title: 'Premium Sweatshirt',
      price: '45.00',
      category: 'Streetwear',
      slug: 'premium-sweatshirt',
      description: 'Cozy heavyweight layers engineered with drop-shoulder silhouette and rib-knit cuffs that do not lose elasticity.',
      images: [
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105331/rebelwear/streetwear-images/sweat1.jpg'
      ],
    },
  ]

  const sweatshirtsSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://rebelwearstore.netlify.app/sweatshirts#breadcrumb',
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
            'name': 'Sweatshirts',
            'item': 'https://rebelwearstore.netlify.app/sweatshirts'
          }
        ]
      },
      {
        '@type': 'CollectionPage',
        '@id': 'https://rebelwearstore.netlify.app/sweatshirts#collection',
        'name': 'Custom Crewneck Sweatshirts & Pullovers | REBELWEAR',
        'description': 'Manufacturer of custom heavyweight crewneck sweatshirts, quarter-zip pullovers, and fleece layers.',
        'url': 'https://rebelwearstore.netlify.app/sweatshirts'
      }
    ]
  };

  return (
    <div>
      <SEO
        title="Custom Crewneck Sweatshirts & Pullovers | REBELWEAR"
        description="Shop custom crewneck sweatshirts and half-zip fleece pullovers by REBELWEAR. 420 GSM brushed cotton fleece, minimal street-ready aesthetic, and bulk wholesale options."
        keywords="crewneck sweatshirts, custom sweatshirts, half zip sweatshirt, fleece pullovers manufacturer, wholesale sweatshirts, streetwear fleece"
        canonical="https://rebelwearstore.netlify.app/sweatshirts"
        schema={sweatshirtsSchema}
      />

      <section className="relative min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-black/85 to-gray-900/90"></div>
        <div className="container relative z-10 text-center max-w-4xl px-5">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 border border-secondary/40 text-secondary text-xs sm:text-sm font-bold uppercase tracking-widest mb-4">
            Brushed Fleece Essentials
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-4 tracking-wider uppercase bg-gradient-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent">
            Custom Streetwear Sweatshirts
          </h1>
          <p className="text-xl sm:text-2xl font-light mb-4 text-gray-300">
            Cozy Heavyweight Layers with Street-Ready Clean Aesthetics
          </p>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Tailored crewneck pullovers and quarter-zip fleece sweaters engineered from 420 GSM anti-pill combed cotton fleece.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container">
          <div className="flex justify-between items-end mb-12 flex-wrap gap-4">
            <div>
              <h2 className="section-title text-left !mb-2">Sweatshirts Lineup</h2>
              <p className="text-neutral-500 text-sm">Select an item to choose sizes or customize with your brand artwork.</p>
            </div>
            <span className="text-xs font-mono text-neutral-400">Showing {products.length} Sweatshirts</span>
          </div>
          <ProductGallery products={products} />
        </div>
      </section>
    </div>
  )
}

export default Sweatshirts
