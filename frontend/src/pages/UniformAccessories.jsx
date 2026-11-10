import { useEffect } from 'react'
import ProductGallery from '../components/ProductGallery'
import SEO from '../components/SEO'

const UniformAccessories = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  const products = [
    {
      title: 'Pro Team Athletic Socks',
      price: '12.00',
      category: 'Uniform Accessories',
      slug: 'team-athletic-socks',
      description: 'High-performance cushioned athletic socks with arch compression, heel reinforcement, and moisture-wicking yarns.',
      images: [
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105330/rebelwear/streetwear-images/sportswear-images/sport-accessory.webp',
      ],
    },
    {
      title: 'Sports Performance Eyewear',
      price: '35.00',
      category: 'Uniform Accessories',
      slug: 'sports-performance-eyewear',
      description: 'Protective impact-resistant sports glasses designed for athlete safety, anti-slip temple grips, and visual clarity.',
      images: [
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105211/rebelwear/streetwear-images/glasses1.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105212/rebelwear/streetwear-images/glasses2.jpg',
      ],
    },
    {
      title: 'Heavy-Duty Team Gear Bag',
      price: '45.00',
      category: 'Uniform Accessories',
      slug: 'team-gear-bag',
      description: 'Weather-resistant ripstop nylon duffel bag engineered to hold complete athlete equipment, cleats, and jerseys.',
      images: [
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105330/rebelwear/streetwear-images/sportswear-images/sport-accessory.webp',
      ],
    },
    {
      title: 'Custom Embroidered Team Caps',
      price: '20.00',
      category: 'Uniform Accessories',
      slug: 'team-caps',
      description: 'Pro-style moisture-wicking team caps with 3D raised embroidery, moisture sweatband, and structured crown.',
      images: [
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105188/rebelwear/streetwear-images/cap1.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105189/rebelwear/streetwear-images/cap2.jpg',
      ],
    },
  ]

  const accessoriesSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://rebelwearstore.netlify.app/uniform-accessories#breadcrumb',
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
            'name': 'Uniform Accessories',
            'item': 'https://rebelwearstore.netlify.app/uniform-accessories'
          }
        ]
      },
      {
        '@type': 'CollectionPage',
        '@id': 'https://rebelwearstore.netlify.app/uniform-accessories#collection',
        'name': 'Custom Team Uniform Accessories, Bags & Headwear | REBELWEAR',
        'description': 'Manufacturer of team athletic accessories including compression socks, team gear duffels, embroidered caps, and protective eyewear.',
        'url': 'https://rebelwearstore.netlify.app/uniform-accessories'
      }
    ]
  };

  return (
    <div>
      <SEO
        title="Custom Team Uniform Accessories, Bags & Headwear | REBELWEAR"
        description="Shop custom athletic team accessories by REBELWEAR. High-performance compression socks, team duffel gear bags, protective sports eyewear, and embroidered team caps."
        keywords="team uniform accessories, athletic team socks, custom sports bags, team caps embroidered, sports gear wholesale"
        canonical="https://rebelwearstore.netlify.app/uniform-accessories"
        schema={accessoriesSchema}
      />

      <section className="relative min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-black/85 to-gray-900/90"></div>
        <div className="container relative z-10 text-center max-w-4xl px-5">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 border border-secondary/40 text-secondary text-xs sm:text-sm font-bold uppercase tracking-widest mb-4">
            Team Sideline Essentials
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-4 tracking-wider uppercase bg-gradient-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent">
            Uniform Accessories
          </h1>
          <p className="text-xl sm:text-2xl font-light mb-4 text-gray-300">
            Professional Sports Gear & Team Sideline Essentials
          </p>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Equip your entire roster with matching team duffel bags, custom moisture-wicking athletic socks, embroidered sideline caps, and protective athletic eyewear.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container">
          <div className="flex justify-between items-end mb-12 flex-wrap gap-4">
            <div>
              <h2 className="section-title text-left !mb-2">Accessories Lineup</h2>
              <p className="text-neutral-500 text-sm">Select items for direct customization and full team batch orders.</p>
            </div>
            <span className="text-xs font-mono text-neutral-400">Showing {products.length} Products</span>
          </div>
          <ProductGallery products={products} />
        </div>
      </section>
    </div>
  )
}

export default UniformAccessories
