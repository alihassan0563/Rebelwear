import { useEffect } from 'react'
import ProductGallery from '../components/ProductGallery'
import SEO from '../components/SEO'

const Tshirts = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const products = [
    {
      title: 'Graphic Tee',
      price: '23.00',
      category: 'Streetwear',
      slug: 'graphic-tee',
      description: 'Sharp urban prints on 240 GSM combed cotton. High density screen-printed graphics built to endure daily wear.',
      images: [
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105216/rebelwear/streetwear-images/graphictee1.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105217/rebelwear/streetwear-images/graphictee2.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105218/rebelwear/streetwear-images/graphictee3.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105218/rebelwear/streetwear-images/graphictee4.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105220/rebelwear/streetwear-images/graphictee5.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105221/rebelwear/streetwear-images/graphictee6.jpg',
      ],
      badge: 'Hot',
    },
    {
      title: 'Plain T-Shirt',
      price: '19.00',
      category: 'Streetwear',
      slug: 'plain-tshirt',
      description: 'Classic luxury blank tees crafted from organic ringspun cotton. Ideal foundation for minimalist everyday wear.',
      images: [
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105244/rebelwear/streetwear-images/plaintshirt1.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105245/rebelwear/streetwear-images/plaintshirt2.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105246/rebelwear/streetwear-images/plaintshirt3.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105247/rebelwear/streetwear-images/plaintshirt4.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105247/rebelwear/streetwear-images/plaintshirt5.jpg',
      ],
    },
    {
      title: 'Polo Shirt',
      price: '23.00',
      category: 'Streetwear',
      slug: 'polo-shirt',
      description: 'Elevated casual collar tee with breathable pique knit cotton, custom button placket, and clean street branding.',
      images: [
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105248/rebelwear/streetwear-images/poloshirt1.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105249/rebelwear/streetwear-images/poloshirt2.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105250/rebelwear/streetwear-images/poloshirt3.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105251/rebelwear/streetwear-images/poloshirt4.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105252/rebelwear/streetwear-images/poloshirt5.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105252/rebelwear/streetwear-images/poloshirt6.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105253/rebelwear/streetwear-images/poloshirt7.jpg',
      ],
    },
    {
      title: 'Vintage Tee',
      price: '25.00',
      category: 'Streetwear',
      slug: 'vintage-tee',
      description: 'Acid-washed retro aesthetic with buttery-soft handfeel and distress-washed vintage finish.',
      images: [
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105361/rebelwear/streetwear-images/vintagetee1.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105362/rebelwear/streetwear-images/vintagetee2.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105363/rebelwear/streetwear-images/vintagetee3.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105364/rebelwear/streetwear-images/vintagetee4.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105365/rebelwear/streetwear-images/vintagetee5.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105366/rebelwear/streetwear-images/vintagetee6.jpg',
      ],
    },
    {
      title: 'Street Tee Collection',
      price: '23.00',
      category: 'Streetwear',
      slug: 'street-tees',
      description: 'Bold oversized graphics, drop shoulders, and reinforced collar ribbing that resists sagging.',
      images: [
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105265/rebelwear/streetwear-images/sh1.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105265/rebelwear/streetwear-images/sh2.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105266/rebelwear/streetwear-images/sh3.jpg',
      ],
      badge: 'New',
    },
  ]

  const tshirtsSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://rebelwearstore.netlify.app/tshirts#breadcrumb',
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
            'name': 'T-Shirts',
            'item': 'https://rebelwearstore.netlify.app/tshirts'
          }
        ]
      },
      {
        '@type': 'CollectionPage',
        '@id': 'https://rebelwearstore.netlify.app/tshirts#collection',
        'name': 'Custom Graphic T-Shirts & Heavyweight Street Tees | REBELWEAR',
        'description': 'Manufacturer of premium streetwear t-shirts, graphic tees, blank wholesale tees, polo shirts, and vintage wash tees.',
        'url': 'https://rebelwearstore.netlify.app/tshirts'
      }
    ]
  };

  return (
    <div>
      <SEO
        title="Custom Graphic T-Shirts & Heavyweight Street Tees | REBELWEAR"
        description="Shop custom graphic t-shirts and heavyweight streetwear tees by REBELWEAR. 240 GSM organic cotton, vintage acid washes, oversized boxy fits, and custom wholesale manufacturing."
        keywords="graphic t-shirts, streetwear tees, custom t-shirt manufacturer, heavyweight blank t-shirts, vintage wash tees, wholesale t-shirts"
        canonical="https://rebelwearstore.netlify.app/tshirts"
        schema={tshirtsSchema}
      />

      <section className="relative min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-black/85 to-gray-900/90"></div>
        <div className="container relative z-10 text-center max-w-4xl px-5">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 border border-secondary/40 text-secondary text-xs sm:text-sm font-bold uppercase tracking-widest mb-4">
            Heavyweight Combed Cotton
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-4 tracking-wider uppercase bg-gradient-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent">
            Custom Streetwear T-Shirts
          </h1>
          <p className="text-xl sm:text-2xl font-light mb-4 text-gray-300">
            Premium Heavyweight Cotton with High-Definition Graphics
          </p>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Milled from 240 GSM organic ringspun cotton with high-density collars and pre-shrunk construction for zero shrinkage and maximum comfort.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container">
          <div className="flex justify-between items-end mb-12 flex-wrap gap-4">
            <div>
              <h2 className="section-title text-left !mb-2">T-Shirts Lineup</h2>
              <p className="text-neutral-500 text-sm">Choose from graphic tees, vintage washed tees, polos, and blanks.</p>
            </div>
            <span className="text-xs font-mono text-neutral-400">Showing {products.length} Designs</span>
          </div>
          <ProductGallery products={products} />
        </div>
      </section>
    </div>
  )
}

export default Tshirts
