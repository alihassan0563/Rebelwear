import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { cld } from '../utils/cloudinary'
import SEO from '../components/SEO'

const Streetwear = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const categories = [
    {
      title: 'Hoodies',
      description: 'Warm, bold, and made to stand out. Heavyweight cotton and oversized silhouettes.',
      image: 'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105223/rebelwear/streetwear-images/h12.jpg',
      link: '/hoodies',
    },
    {
      title: 'T-Shirts',
      description: 'Premium heavyweight cotton tees with high-density graphics and drop shoulders.',
      image: 'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105266/rebelwear/streetwear-images/sh3.jpg',
      link: '/tshirts',
    },
    {
      title: 'Sweatshirts',
      description: 'Cozy layers with street-ready style. Crewnecks, half-zips, and plush fleece.',
      image: 'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105334/rebelwear/streetwear-images/sweatshirt3.jpg',
      link: '/sweatshirts',
    },
    {
      title: 'Tracksuits',
      description: 'Built for motion. Born for rebels. Tailored jogger sets and track jackets.',
      image: 'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105228/rebelwear/streetwear-images/hoodiecol.jpg',
      link: '/tracksuits',
    },
    {
      title: 'Jackets',
      description: 'Street-ready outerwear with attitude. Puffer jackets, biker outerwear, and windbreakers.',
      image: 'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105229/rebelwear/streetwear-images/jacket2.avif',
      link: '/jackets',
    },
    {
      title: 'Accessories',
      description: 'Complete your rebellious aesthetic with custom beanies, caps, and urban essentials.',
      image: 'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105170/rebelwear/streetwear-images/accessories.jpg',
      link: '/accessories',
    },
  ]

  const streetwearSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://rebelwearstore.netlify.app/streetwear#breadcrumb',
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
            'name': 'Streetwear Collection',
            'item': 'https://rebelwearstore.netlify.app/streetwear'
          }
        ]
      },
      {
        '@type': 'CollectionPage',
        '@id': 'https://rebelwearstore.netlify.app/streetwear#collection',
        'name': 'Custom Streetwear Clothing Collection | REBELWEAR',
        'description': 'Premium streetwear manufacturer providing custom heavyweight hoodies, graphic t-shirts, tracksuits, and jackets with global shipping.',
        'url': 'https://rebelwearstore.netlify.app/streetwear',
        'mainEntity': {
          '@type': 'ItemList',
          'itemListElement': categories.map((cat, idx) => ({
            '@type': 'ListItem',
            'position': idx + 1,
            'name': cat.title,
            'url': `https://rebelwearstore.netlify.app${cat.link}`
          }))
        }
      }
    ]
  }

  return (
    <div>
      <SEO
        title="Custom Streetwear Clothing Collection | REBELWEAR"
        description="Explore REBELWEAR custom streetwear apparel. Heavyweight 450 GSM hoodies, oversized graphic tees, fleece tracksuits, and urban outerwear. Bespoke manufacturing and worldwide delivery."
        keywords="streetwear collection, custom streetwear manufacturer, oversized hoodies, graphic tees wholesale, streetwear brand factory"
        canonical="https://rebelwearstore.netlify.app/streetwear"
        schema={streetwearSchema}
      />

      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-black/85 to-gray-900/90"></div>
        <div className="container relative z-10 text-center max-w-4xl px-5">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 border border-secondary/40 text-secondary text-xs sm:text-sm font-bold uppercase tracking-widest mb-4">
            Custom Urban Apparel Atelier
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black mb-4 tracking-wider uppercase bg-gradient-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent">
            STREETWEAR COLLECTION
          </h1>
          <p className="text-xl sm:text-2xl font-light mb-4 text-gray-300">Bold Designs That Break the Mold</p>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Premium heavyweight fabrics meet raw urban aesthetics. Express your rebellious spirit with our custom
            cut-and-sew streetwear designed for those who dare to be different.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-title">Shop by Streetwear Category</h2>
            <p className="text-neutral-600 text-lg">
              Explore our full catalog of custom streetwear staples. Available in individual orders and bulk wholesale batches with complete brand customization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={category.link}
                className="bg-bg-light rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group border border-neutral-100 flex flex-col"
              >
                <div className="h-72 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
                  <img
                    src={cld(category.image, 600)}
                    alt={`${category.title} - Streetwear Collection REBELWEAR`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold mb-3 text-neutral-900 group-hover:text-secondary transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-text-light mb-6 flex-grow leading-relaxed">{category.description}</p>
                  <span className="text-secondary font-bold group-hover:translate-x-2 inline-flex items-center gap-2 transition-transform text-sm uppercase tracking-wider">
                    <span>Explore Collection</span>
                    <span>→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* SEO Content Enrichment & Manufacturing Authority */}
          <div className="mt-24 p-8 sm:p-12 rounded-3xl bg-neutral-900 text-white border border-neutral-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
              <div>
                <h3 className="text-lg font-bold uppercase tracking-wider text-secondary mb-2">Heavyweight GSM Fabrics</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  We use custom-milled 380–500 GSM combed cotton fleece, French terry, and organic ringspun jersey for heavyweight durability and silhouette retention.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold uppercase tracking-wider text-secondary mb-2">Advanced Print & Embroidery</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  From high-density 3D puff screen printing to chenille embroidery and DTG sublimation, our atelier delivers retail-grade precision.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold uppercase tracking-wider text-secondary mb-2">Bespoke Private Label</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Custom woven neck labels, hangtags, metal hardware, and polybag packaging for streetwear clothing lines launching worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Streetwear
