import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ImageSlider from '../components/ImageSlider'
import SEO from '../components/SEO'
import { getApiBaseUrl } from '../utils/apiConfig'
import { trackProductView, trackBeginCheckout } from '../utils/analytics'

// Comprehensive product database covering featured & core items
const STATIC_PRODUCTS = {
  'classic-hoodie': {
    title: 'Classic Streetwear Hoodie',
    slug: 'classic-hoodie',
    price: '34.99',
    category: 'Hoodies',
    parentCollection: 'Streetwear',
    categoryLink: '/hoodies',
    description: 'Timeless streetwear hoodie crafted from ultra-dense 450 GSM combed cotton. Built for everyday comfort, drop shoulders, and double-needle reinforced stitching.',
    images: [
      'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105192/rebelwear/streetwear-images/classichoodie1.jpg',
      'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105193/rebelwear/streetwear-images/classichoodie2.jpg',
      'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105194/rebelwear/streetwear-images/classichoodie3.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    features: ['100% Combed Heavy Cotton (450 GSM)', 'Double-Lined Hood with Tonal Drawcords', 'Pre-Shrunk Anti-Pill Fabric', 'Custom Bulk Embroidery & Screen Print Available']
  },
  'oversize-hoodie': {
    title: 'Oversized Streetwear Hoodie',
    slug: 'oversize-hoodie',
    price: '29.99',
    category: 'Hoodies',
    parentCollection: 'Streetwear',
    categoryLink: '/hoodies',
    description: 'Relaxed drop-shoulder silhouette with street-ready drape. Engineered for urban aesthetics, unmatched comfort, and custom printing.',
    images: [
      'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105231/rebelwear/streetwear-images/oversizehoodie1.jpg',
      'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105233/rebelwear/streetwear-images/oversizehoodie2.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    features: ['Heavyweight French Terry', 'Relaxed Boxy Fit', 'Seamless Kangaroo Pocket', 'Worldwide Custom Batch Delivery']
  },
  'rebel-hoodie': {
    title: 'Rebel Signature Graphic Hoodie',
    slug: 'rebel-hoodie',
    price: '29.99',
    category: 'Hoodies',
    parentCollection: 'Streetwear',
    categoryLink: '/hoodies',
    description: 'Bold signature graphic print on ultra-plush fleece. High definition screen printed artwork that will not fade or crack with washing.',
    images: [
      'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105222/rebelwear/streetwear-images/h11.jpg',
      'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105223/rebelwear/streetwear-images/h12.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    features: ['HD Screen-Printed Graphic', 'Brushed Fleece Interior', 'Reinforced Ribbed Cuffs', 'Bespoke Colorways on Request']
  },
  'custom-team-uniforms': {
    title: 'Custom Pro Team Basketball Uniform Kit',
    slug: 'custom-team-uniforms',
    price: '65.00',
    category: 'Basketball Uniforms',
    parentCollection: 'Sportswear',
    categoryLink: '/basketball-uniforms',
    description: 'Professional sublimated basketball uniform kit featuring breathable moisture-wicking jersey and tailored athletic shorts. Full custom team roster, numbers, and sponsor logos.',
    images: [
      'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105308/rebelwear/streetwear-images/sportswear-images/basketball-uniform-3.jpg',
      'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105306/rebelwear/streetwear-images/sportswear-images/basketball-uniform-1.jpg'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    features: ['Aerodynamic Micro-Mesh Poly Fabric', 'Sublimated Anti-Fade Print', 'Elastic Drawstring Waistband', 'Full Team Roster Customization']
  },
  'hoodie': {
    title: 'Premium Streetwear Hoodie',
    slug: 'hoodie',
    price: '45.00',
    category: 'Hoodies',
    parentCollection: 'Streetwear',
    categoryLink: '/hoodies',
    description: 'Heavyweight cotton-rich hoodie tailored for luxury streetwear fashion brands and discerning individual rebels.',
    images: [
      'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105223/rebelwear/streetwear-images/h12.jpg',
      'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105222/rebelwear/streetwear-images/h11.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    features: ['100% Cotton Outer', 'Double Lined Hood', 'Custom Ribbing', 'Wholesale Pricing Available']
  },
  'street-tees': {
    title: 'Custom Streetwear Graphic Tees',
    slug: 'street-tees',
    price: '25.00',
    category: 'T-Shirts',
    parentCollection: 'Streetwear',
    categoryLink: '/tshirts',
    description: 'Heavyweight 240 GSM drop-shoulder streetwear t-shirt with premium screen print or puff print graphic capabilities.',
    images: [
      'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105265/rebelwear/streetwear-images/sh1.jpg',
      'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105265/rebelwear/streetwear-images/sh2.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    features: ['240 GSM Heavy Cotton', 'Tight Crewneck Collar', 'Preshrunk Fabric', 'High Density Graphic Print']
  },
  'graphic-tee': {
    title: 'Graphic Street Tee',
    slug: 'graphic-tee',
    price: '23.00',
    category: 'T-Shirts',
    parentCollection: 'Streetwear',
    categoryLink: '/tshirts',
    description: 'Sharp urban graphics pressed on ultra-soft organic cotton. Perfect casual streetwear staple.',
    images: [
      'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105216/rebelwear/streetwear-images/graphictee1.jpg',
      'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105217/rebelwear/streetwear-images/graphictee2.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    features: ['100% Ring-Spun Cotton', 'Silk-Screen Print', 'Comfort Fit', 'Machine Wash Safe']
  },
  'classic-track': {
    title: 'Classic Streetwear Tracksuit',
    slug: 'classic-track',
    price: '89.00',
    category: 'Tracksuits',
    parentCollection: 'Streetwear',
    categoryLink: '/tracksuits',
    description: 'Timeless full-zip tracksuit set with track jacket and tapered jogger pants. Functional style meets street aesthetic.',
    images: [
      'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105197/rebelwear/streetwear-images/classictrack1.jpg',
      'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105201/rebelwear/streetwear-images/classictrack2.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    features: ['Full Jacket + Pant Set', 'Zip Pockets', 'Tapered Ankle Zips', 'Custom Colorways']
  },
  'bike-jacket': {
    title: 'Streetwear Bike Jacket',
    slug: 'bike-jacket',
    price: '89.00',
    category: 'Jackets',
    parentCollection: 'Streetwear',
    categoryLink: '/jackets',
    description: 'Street-ready motorcycle inspired jacket with rugged weatherproof shell and bespoke embroidery.',
    images: [
      'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105180/rebelwear/streetwear-images/bikejacket.jpg',
      'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105181/rebelwear/streetwear-images/bikejacket1.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    features: ['Wind & Water Resistant', 'Heavy Metal Zippers', 'Quilted Shoulder Panels', 'Tailored Fit']
  },
  'crewneck-sweatshirt': {
    title: 'Classic Crewneck Sweatshirt',
    slug: 'crewneck-sweatshirt',
    price: '45.00',
    category: 'Sweatshirts',
    parentCollection: 'Streetwear',
    categoryLink: '/sweatshirts',
    description: 'Heavyweight fleece crewneck pullover with relaxed silhouette and ribbed trim. The essential urban layering staple.',
    images: [
      'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105333/rebelwear/streetwear-images/sweatshirt2.jpg',
      'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105332/rebelwear/streetwear-images/sweatshirt1.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    features: ['Soft Brushed Fleece', 'Coverstitched Seams', 'Preshrunk Cotton-Poly Blend', 'Ideal for Screen Printing']
  },
  'professional-basketball-uniform': {
    title: 'Professional Basketball Team Uniform',
    slug: 'professional-basketball-uniform',
    price: '26.99',
    category: 'Basketball Uniforms',
    parentCollection: 'Sportswear',
    categoryLink: '/basketball-uniforms',
    description: 'Complete tournament-ready basketball uniform set with performance jersey and athletic shorts. Custom sublimation printing available.',
    images: [
      'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105306/rebelwear/streetwear-images/sportswear-images/basketball-uniform-1.jpg',
      'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105307/rebelwear/streetwear-images/sportswear-images/basketball-uniform-2.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    features: ['Moisture-Wicking DryTech Mesh', 'Fade-Proof Sublimated Graphics', 'Flexible Athletic Cut', 'Full Custom Team Branding']
  },
  'professional-baseball-uniform': {
    title: 'Professional Baseball Uniform Set',
    slug: 'professional-baseball-uniform',
    price: '39.99',
    category: 'Baseball Uniforms',
    parentCollection: 'Sportswear',
    categoryLink: '/baseball-uniforms',
    description: 'Classic button-down baseball jersey and double-knee reinforced pants with custom team crest and numbers.',
    images: [
      'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105294/rebelwear/streetwear-images/sportswear-images/baseball-uniform-1.jpg',
      'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105294/rebelwear/streetwear-images/baseball-uniform-2.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    features: ['Button Front Jersey', 'Breathable Poly Blend', 'Reinforced Sliding Knees', 'Custom Team Lettering']
  },
  'professional-soccer-uniform': {
    title: 'Professional Soccer Uniform Kit',
    slug: 'professional-soccer-uniform',
    price: '29.99',
    category: 'Soccer Uniforms',
    parentCollection: 'Sportswear',
    categoryLink: '/soccer-uniforms',
    description: 'Lightweight, rapid-drying soccer jersey and shorts kit engineered for pitch speed, heat ventilation, and team identity.',
    images: [
      'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105326/rebelwear/streetwear-images/sportswear-images/soccer-uniform-3.jpg',
      'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105325/rebelwear/streetwear-images/sportswear-images/soccer-uniform-2.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    features: ['Micro-Ventilation Panels', 'Quick-Dry Aerodynamic Yarn', 'Elastic Waist with Cord', 'Custom Club Crest & Badges']
  }
}

const ProductDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [selectedSize, setSelectedSize] = useState('M')
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    
    // Check static registry first
    if (STATIC_PRODUCTS[slug]) {
      setProduct(STATIC_PRODUCTS[slug])
      trackProductView(STATIC_PRODUCTS[slug])
      setLoading(false)
      return
    }

    // Attempt API fetch
    const fetchApiProduct = async () => {
      try {
        const res = await fetch(`${getApiBaseUrl()}/products/${slug}`)
        if (res.ok) {
          const data = await res.json()
          if (data.success && data.product) {
            const apiProd = {
              ...data.product,
              features: data.product.features || ['Premium Heavyweight Fabric', 'Bespoke Customization', 'Global Delivery', 'Wholesale Quality']
            }
            setProduct(apiProd)
            trackProductView(apiProd)
            setLoading(false)
            return
          }
        }
      } catch (err) {
        console.warn('API product fetch notice:', err.message)
      }
      setProduct(null)
      setLoading(false)
    }

    fetchApiProduct()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white pt-24">
        <div className="w-10 h-10 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white pt-24 px-6">
        <SEO title="Product Not Found" noIndex={true} />
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-black mb-4">Product Not Found</h1>
          <p className="text-neutral-400 mb-8">The requested item could not be found or has moved.</p>
          <Link to="/" className="btn-primary">Return to Storefront</Link>
        </div>
      </div>
    )
  }

  const categoryUrl = product.categoryLink || (product.category === 'Hoodies' ? '/hoodies' : product.category === 'T-Shirts' ? '/tshirts' : '/streetwear')
  const priceNumber = parseFloat(product.price) || 29.99
  const mainImage = product.images?.[0] || 'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105167/rebelwear/rebelwear.jpg'

  // Structured Data: Product + Breadcrumbs Schema
  const productSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `https://rebelwearstore.netlify.app/product/${slug}#breadcrumb`,
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
            'name': product.category,
            'item': `https://rebelwearstore.netlify.app${categoryUrl}`
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': product.title,
            'item': `https://rebelwearstore.netlify.app/product/${slug}`
          }
        ]
      },
      {
        '@type': 'Product',
        '@id': `https://rebelwearstore.netlify.app/product/${slug}#product`,
        'name': product.title,
        'description': product.description,
        'image': product.images || [mainImage],
        'sku': `RW-${slug.toUpperCase()}`,
        'brand': {
          '@type': 'Brand',
          'name': 'REBELWEAR'
        },
        'category': product.category,
        'offers': {
          '@type': 'Offer',
          'url': `https://rebelwearstore.netlify.app/product/${slug}`,
          'priceCurrency': 'USD',
          'price': priceNumber.toFixed(2),
          'priceValidUntil': '2027-12-31',
          'itemCondition': 'https://schema.org/NewCondition',
          'availability': 'https://schema.org/InStock',
          'seller': {
            '@type': 'Organization',
            'name': 'REBELWEAR'
          }
        }
      }
    ]
  }

  const handleOrderRedirect = () => {
    trackBeginCheckout(product, selectedSize, quantity)
    localStorage.setItem('selectedProduct', JSON.stringify(product))
    navigate(`/order/${slug}/0`)
  }

  return (
    <div className="pt-24 bg-neutral-950 text-white min-h-screen">
      <SEO
        title={`${product.title} - Custom ${product.category} Manufacturer`}
        description={`${product.title} by REBELWEAR. ${product.description} Available in sizes ${product.sizes?.join(', ')}. Order or request bulk custom manufacturing.`}
        keywords={`${product.title}, ${product.category}, custom ${product.category}, wholesale ${product.category}, REBELWEAR apparel`}
        image={mainImage}
        type="product"
        schema={productSchema}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="container pt-6 pb-4 text-sm text-neutral-400">
        <ol className="flex items-center gap-2 flex-wrap">
          <li>
            <Link to="/" className="hover:text-secondary transition-colors">Home</Link>
          </li>
          <li><span>/</span></li>
          <li>
            <Link to={categoryUrl} className="hover:text-secondary transition-colors">{product.category}</Link>
          </li>
          <li><span>/</span></li>
          <li className="text-white font-medium truncate max-w-xs sm:max-w-md">{product.title}</li>
        </ol>
      </nav>

      <main className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Product Gallery Showcase */}
          <div className="h-[420px] sm:h-[520px] lg:h-[620px] bg-neutral-900 rounded-3xl overflow-hidden border border-neutral-800">
            <ImageSlider
              images={product.images || [mainImage]}
              autoPlay={false}
              width={1000}
              altText={`${product.title} - ${product.category} REBELWEAR`}
            />
          </div>

          {/* Product Details & Actions */}
          <section className="space-y-6">
            <div>
              <span className="inline-block px-3.5 py-1 rounded-full bg-secondary/15 text-secondary text-xs font-mono font-bold uppercase tracking-wider mb-3">
                {product.category} • REBELWEAR PRO ATELIER
              </span>
              <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
                {product.title}
              </h1>
              <p className="text-3xl sm:text-4xl font-extrabold text-secondary mb-4">
                ${product.price}
                <span className="text-xs sm:text-sm text-neutral-400 font-normal ml-3">
                  (Single & Bulk Batch Tiers Available)
                </span>
              </p>
              <p className="text-neutral-300 text-base sm:text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Size Options */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-300">Select Size</h2>
                  <Link to="/#contact" className="text-xs text-secondary hover:underline">Custom sizing needed?</Link>
                </div>
                <div className="flex gap-3 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[48px] h-12 px-4 rounded-xl font-mono text-sm font-bold border transition-all ${
                        selectedSize === size
                          ? 'border-secondary bg-secondary text-white shadow-lg shadow-secondary/30'
                          : 'border-neutral-700 bg-neutral-900 text-neutral-300 hover:border-neutral-500'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-300 mb-3">Quantity</h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-700 hover:border-neutral-500 flex items-center justify-center text-lg font-bold transition-colors"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="text-xl font-bold font-mono px-4 min-w-[48px] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-700 hover:border-neutral-500 flex items-center justify-center text-lg font-bold transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Technical Specifications / Features */}
            {product.features && (
              <div className="p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-3">
                <h2 className="text-sm font-bold uppercase tracking-wider text-white">Fabric & Craft Specifications</h2>
                <ul className="space-y-2 text-sm text-neutral-300">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-secondary font-bold">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Order / Quote CTA Button */}
            <div className="pt-2">
              <button
                onClick={handleOrderRedirect}
                className="w-full py-4 px-8 bg-secondary hover:bg-secondary/90 text-white rounded-full font-bold uppercase tracking-wider text-sm transition-all shadow-xl shadow-secondary/30 flex items-center justify-center gap-3 cursor-pointer"
              >
                <span>Order / Customize This Item — ${(priceNumber * quantity).toFixed(2)}</span>
                <span>→</span>
              </button>
              <p className="text-xs text-neutral-400 text-center mt-3">
                Worldwide Express Shipping • Custom Embroidery & Sublimation Available
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default ProductDetail
