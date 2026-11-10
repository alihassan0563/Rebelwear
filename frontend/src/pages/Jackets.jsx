import { useEffect } from 'react'
import ProductGallery from '../components/ProductGallery'
import SEO from '../components/SEO'

const Jackets = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const products = [
    {
      title: 'Bike Jacket',
      price: '89.00',
      category: 'Streetwear',
      slug: 'bike-jacket',
      description: 'Street-ready motorcycle inspired jacket with rugged weatherproof shell, metal zippers, and bold industrial design.',
      images: [
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105180/rebelwear/streetwear-images/bikejacket.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105181/rebelwear/streetwear-images/bikejacket1.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105182/rebelwear/streetwear-images/bikejacket2.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105182/rebelwear/streetwear-images/bikejacket3.jpg',
      ],
      badge: 'Hot',
    },
    {
      title: 'Premium Jacket Collection',
      price: '79.00',
      category: 'Streetwear',
      slug: 'premium-jacket',
      description: 'Modern outerwear for every season. Weather-resistant shell with breathable lining and urban streetwear cut.',
      images: [
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105228/rebelwear/streetwear-images/jacket1.avif',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105229/rebelwear/streetwear-images/jacket2.avif',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105230/rebelwear/streetwear-images/jacket3.avif',
      ],
    },
    {
      title: 'Puffer Jacket',
      price: '99.00',
      category: 'Streetwear',
      slug: 'puffer-jacket',
      description: 'Thermal insulated winter puffer jacket. High loft insulation, matte weather-proof shell, and oversized boxy drape.',
      images: [
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105254/rebelwear/streetwear-images/puffer1.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105255/rebelwear/streetwear-images/puffer2.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105256/rebelwear/streetwear-images/puffer3.jpg',
      ],
    },
    {
      title: 'Varsity Jacket',
      price: '95.00',
      category: 'Streetwear',
      slug: 'varsity-jacket',
      description: 'Classic athletic varsity silhouette with wool-blend body, faux leather sleeves, and chenille patch embroidery.',
      images: [
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105351/rebelwear/streetwear-images/versity1.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105354/rebelwear/streetwear-images/versity2.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105355/rebelwear/streetwear-images/versity3.jpg',
      ],
      badge: 'Popular',
    },
    {
      title: 'Windbreaker',
      price: '69.00',
      category: 'Streetwear',
      slug: 'windbreaker',
      description: 'Ultra-lightweight ripstop nylon windbreaker jacket with hooded storm flap and reflective brand accents.',
      images: [
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105367/rebelwear/streetwear-images/wind1.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105367/rebelwear/streetwear-images/wind2.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105368/rebelwear/streetwear-images/wind3.jpg',
      ],
    },
  ]

  const jacketsSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://rebelwearstore.netlify.app/jackets#breadcrumb',
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
            'name': 'Jackets',
            'item': 'https://rebelwearstore.netlify.app/jackets'
          }
        ]
      },
      {
        '@type': 'CollectionPage',
        '@id': 'https://rebelwearstore.netlify.app/jackets#collection',
        'name': 'Custom Streetwear Jackets & Outerwear | REBELWEAR',
        'description': 'Manufacturer of streetwear jackets including varsity letterman jackets, winter puffers, biker jackets, and windbreakers.',
        'url': 'https://rebelwearstore.netlify.app/jackets'
      }
    ]
  };

  return (
    <div>
      <SEO
        title="Custom Streetwear Jackets, Puffers & Varsity Outerwear | REBELWEAR"
        description="Shop custom streetwear jackets by REBELWEAR. Biker jackets, thermal winter puffers, classic varsity jackets, and lightweight windbreakers. Premium outerwear with custom embroidery."
        keywords="streetwear jackets, custom puffer jacket, varsity jackets manufacturer, streetwear outerwear, biker jackets, wholesale outerwear"
        canonical="https://rebelwearstore.netlify.app/jackets"
        schema={jacketsSchema}
      />

      <section className="relative min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-black/85 to-gray-900/90"></div>
        <div className="container relative z-10 text-center max-w-4xl px-5">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 border border-secondary/40 text-secondary text-xs sm:text-sm font-bold uppercase tracking-widest mb-4">
            Heavy-Duty Outerwear Atelier
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-4 tracking-wider uppercase bg-gradient-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent">
            Custom Streetwear Jackets
          </h1>
          <p className="text-xl sm:text-2xl font-light mb-4 text-gray-300">
            Street-Ready Outerwear with Uncompromising Attitude
          </p>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            From thermal winter puffers and heavy-duty bike jackets to classic wool varsity jackets and rainproof windbreakers. Built to shield you against the elements in style.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container">
          <div className="flex justify-between items-end mb-12 flex-wrap gap-4">
            <div>
              <h2 className="section-title text-left !mb-2">Jackets Lineup</h2>
              <p className="text-neutral-500 text-sm">Select outerwear models for custom embroidery, patches, or bulk quotes.</p>
            </div>
            <span className="text-xs font-mono text-neutral-400">Showing {products.length} Jackets</span>
          </div>
          <ProductGallery products={products} />
        </div>
      </section>
    </div>
  )
}

export default Jackets
