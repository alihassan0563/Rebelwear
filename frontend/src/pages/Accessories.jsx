import { useEffect } from 'react'
import ProductGallery from '../components/ProductGallery'
import SEO from '../components/SEO'

const Accessories = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const products = [
    {
      title: 'Streetwear Glasses',
      price: '29.00',
      category: 'Accessories',
      slug: 'streetwear-glasses',
      description: 'Bold acetate and metal frame eyewear engineered to accent your urban look. UV400 protective lenses.',
      images: [
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105211/rebelwear/streetwear-images/glasses1.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105212/rebelwear/streetwear-images/glasses2.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105213/rebelwear/streetwear-images/glasses3.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105214/rebelwear/streetwear-images/glasses4.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105215/rebelwear/streetwear-images/glasses5.jpg',
      ],
    },
    {
      title: 'Cap and Hats',
      price: '22.00',
      category: 'Accessories',
      slug: 'caps-and-hats',
      description: 'Headwear that defines your rebellious style. Custom 3D puff embroidery, snapback and strapback closures available.',
      images: [
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105188/rebelwear/streetwear-images/cap1.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105189/rebelwear/streetwear-images/cap2.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105190/rebelwear/streetwear-images/cap3.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105190/rebelwear/streetwear-images/cap4.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105191/rebelwear/streetwear-images/cap5.jpg',
      ],
    },
    {
      title: 'Beanies',
      price: '15.00',
      category: 'Accessories',
      slug: 'beanies',
      description: 'Warm, ribbed knit acrylic and wool-blend beanies. Snug adjustable cuff with woven brand label or embroidery.',
      images: [
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105179/rebelwear/streetwear-images/benies6.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105175/rebelwear/streetwear-images/benies2.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105176/rebelwear/streetwear-images/benies3.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105177/rebelwear/streetwear-images/benies4.jpg',
      ],
    },
    {
      title: 'Other Accessories',
      price: '25.00',
      category: 'Accessories',
      slug: 'other-accessories',
      description: 'Tactical nylon belts, socks, duffel bags, and hardware accessories to complete your streetwear aesthetic.',
      images: [
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105171/rebelwear/streetwear-images/belt1.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105172/rebelwear/streetwear-images/belt2.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105173/rebelwear/streetwear-images/belt3.jpg',
      ],
    },
  ]

  const accessoriesSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://rebelwearstore.netlify.app/accessories#breadcrumb',
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
            'name': 'Accessories',
            'item': 'https://rebelwearstore.netlify.app/accessories'
          }
        ]
      },
      {
        '@type': 'CollectionPage',
        '@id': 'https://rebelwearstore.netlify.app/accessories#collection',
        'name': 'Streetwear Accessories, Custom Hats & Beanies | REBELWEAR',
        'description': 'Manufacturer of custom streetwear accessories including embroidered snapbacks, dad hats, ribbed beanies, belts, and eyewear.',
        'url': 'https://rebelwearstore.netlify.app/accessories'
      }
    ]
  };

  return (
    <div>
      <SEO
        title="Streetwear Accessories, Custom Hats & Beanies | REBELWEAR"
        description="Shop custom streetwear accessories by REBELWEAR. Embroidered snapbacks, dad hats, winter beanies, tactical belts, and urban sunglasses with custom private labeling."
        keywords="streetwear accessories, custom hats, embroidered beanies, tactical streetwear belt, sunglasses wholesale"
        canonical="https://rebelwearstore.netlify.app/accessories"
        schema={accessoriesSchema}
      />

      <section className="relative min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-black/85 to-gray-900/90"></div>
        <div className="container relative z-10 text-center max-w-4xl px-5">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 border border-secondary/40 text-secondary text-xs sm:text-sm font-bold uppercase tracking-widest mb-4">
            Urban Details & Gear
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-4 tracking-wider uppercase bg-gradient-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent">
            Streetwear Accessories
          </h1>
          <p className="text-xl sm:text-2xl font-light mb-4 text-gray-300">
            Complete Your Look with Rebellious Urban Essentials
          </p>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            From 3D embroidered caps and cozy knit beanies to tactical belts and statement eyewear. Built to accent your brand with high-end finishing touches.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container">
          <div className="flex justify-between items-end mb-12 flex-wrap gap-4">
            <div>
              <h2 className="section-title text-left !mb-2">Accessories Lineup</h2>
              <p className="text-neutral-500 text-sm">Select items for direct ordering or request custom branding embroidery.</p>
            </div>
            <span className="text-xs font-mono text-neutral-400">Showing {products.length} Products</span>
          </div>
          <ProductGallery products={products} />
        </div>
      </section>
    </div>
  )
}

export default Accessories
