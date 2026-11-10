import { useEffect } from 'react'
import ProductGallery from '../components/ProductGallery'
import SEO from '../components/SEO'

const Tracksuits = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const products = [
    {
      title: 'Classic Track',
      price: '89.00',
      category: 'Streetwear',
      slug: 'classic-track',
      description: 'Timeless tracksuit set with tailored track jacket and tapered joggers. Built for motion, born for rebels.',
      images: [
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105197/rebelwear/streetwear-images/classictrack1.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105201/rebelwear/streetwear-images/classictrack2.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105202/rebelwear/streetwear-images/classictrack3.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105203/rebelwear/streetwear-images/classictrack4.jpg',
      ],
      badge: 'Popular',
    },
    {
      title: 'Performance Track',
      price: '95.00',
      category: 'Streetwear',
      slug: 'performance-track',
      description: 'Engineered moisture-wicking poly-spandex blend. Functional athletic styling meets raw urban streetwear aesthetic.',
      images: [
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105239/rebelwear/streetwear-images/performancetrack1.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105240/rebelwear/streetwear-images/performancetrack2.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105241/rebelwear/streetwear-images/performancetrack3.jpg',
      ],
    },
    {
      title: 'Sweatsuit',
      price: '85.00',
      category: 'Streetwear',
      slug: 'sweatsuit',
      description: 'Plush brushed fleece hoodie and matching sweatpants set. Cozy heavyweight layers for winter street style.',
      images: [
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105337/rebelwear/streetwear-images/sweatsuit1.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105337/rebelwear/streetwear-images/sweatsuit2.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105338/rebelwear/streetwear-images/sweatsuit3.jpg',
      ],
    },
    {
      title: 'Premium Track Collection',
      price: '99.00',
      category: 'Streetwear',
      slug: 'premium-track',
      description: 'Custom cut-and-sew two-piece tracksuit with contrasting stripe paneling and zipped pockets.',
      images: [
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105346/rebelwear/streetwear-images/tra1.avif',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105347/rebelwear/streetwear-images/tra2.avif',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105348/rebelwear/streetwear-images/tra3.avif',
      ],
      badge: 'New',
    },
  ]

  const tracksuitsSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://rebelwearstore.netlify.app/tracksuits#breadcrumb',
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
            'name': 'Tracksuits',
            'item': 'https://rebelwearstore.netlify.app/tracksuits'
          }
        ]
      },
      {
        '@type': 'CollectionPage',
        '@id': 'https://rebelwearstore.netlify.app/tracksuits#collection',
        'name': 'Custom Streetwear Tracksuits & Sweatsuits | REBELWEAR',
        'description': 'Manufacturer of custom streetwear tracksuits, fleece jogger sets, and athletic warmup suits.',
        'url': 'https://rebelwearstore.netlify.app/tracksuits'
      }
    ]
  };

  return (
    <div>
      <SEO
        title="Custom Streetwear Tracksuits & Sweatsuits | REBELWEAR"
        description="Shop custom streetwear tracksuits and heavyweight fleece sweatsuits by REBELWEAR. Tailored joggers, full-zip track jackets, and custom colorways for teams and urban brands."
        keywords="custom tracksuits, streetwear sweatsuits, custom jogger set, athletic warmup suit, tracksuit manufacturer wholesale"
        canonical="https://rebelwearstore.netlify.app/tracksuits"
        schema={tracksuitsSchema}
      />

      <section className="relative min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-black/85 to-gray-900/90"></div>
        <div className="container relative z-10 text-center max-w-4xl px-5">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 border border-secondary/40 text-secondary text-xs sm:text-sm font-bold uppercase tracking-widest mb-4">
            Athletic Street Uniforms
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-4 tracking-wider uppercase bg-gradient-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent">
            Custom Streetwear Tracksuits
          </h1>
          <p className="text-xl sm:text-2xl font-light mb-4 text-gray-300">
            Built for Motion. Born to Stand Out.
          </p>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Coordinated two-piece sets combining full-zip jackets and tapered joggers. Premium french terry and performance tricot fabrics.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container">
          <div className="flex justify-between items-end mb-12 flex-wrap gap-4">
            <div>
              <h2 className="section-title text-left !mb-2">Tracksuits Lineup</h2>
              <p className="text-neutral-500 text-sm">Full matching sets available for individual purchase and private label production.</p>
            </div>
            <span className="text-xs font-mono text-neutral-400">Showing {products.length} Sets</span>
          </div>
          <ProductGallery products={products} />
        </div>
      </section>
    </div>
  )
}

export default Tracksuits
