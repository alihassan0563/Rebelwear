import { useParams, Link, useSearchParams, useLocation } from 'react-router-dom'
import { useState } from 'react'
import ImageSlider from '../components/ImageSlider'

const ProductDetail = () => {
  const { slug } = useParams()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const imageIndex = parseInt(searchParams.get('image') || '0', 10)
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [showSizeChart, setShowSizeChart] = useState(false)
  
  // Get product from location state (passed from ProductGallery) or fallback to slug lookup
  const productFromState = location.state?.product

  // Helper function to convert slug back to title
  const slugToTitle = (slug) => {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  // Get product data - this will be enhanced to fetch from all pages
  // For now, we'll create a product from the slug with default values
  const getProductBySlug = (slug) => {
    // Hardcoded products for specific slugs
    const hardcodedProducts = {
      'hoodie': {
        title: 'Premium Hoodie',
        price: '45.00',
        category: 'Streetwear',
        description: 'Premium cotton blend hoodie with custom graphics. Perfect for streetwear enthusiasts.',
        images: [
          '/streetwear images/H12.jpeg',
          '/streetwear images/H11.jpeg',
          '/streetwear images/hoodi2.avif',
          '/streetwear images/hoo1.jpeg',
          '/streetwear images/hoo2.jpeg',
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        features: ['100% Cotton', 'Custom Graphics', 'Comfortable Fit', 'Machine Washable']
      },
      'custom-uniforms': {
        title: 'Custom Team Uniforms',
        price: '65.00',
        category: 'Sportswear',
        description: 'Professional team uniforms with custom designs. Built for performance and durability.',
        images: [
          '/sports image/basket1.jpeg',
          '/sports image/bskt2.jpg',
          '/sports image/bskt3.jpg',
          '/sports image/bskt4.jpg',
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        features: ['Moisture-Wicking', 'Custom Design', 'Professional Quality', 'Team Colors Available']
      },
      'street-tees': {
        title: 'Street T-Shirts',
        price: '25.00',
        category: 'Streetwear',
        description: 'Bold graphic tees with premium fabric quality.',
        images: [
          '/streetwear images/sh1.jpeg',
          '/streetwear images/sh2.jpeg',
          '/streetwear images/sh3.jpeg',
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        features: ['Premium Cotton', 'Bold Graphics', 'Comfortable Fit', 'Durable Print']
      }
    }

    // If product exists in hardcoded list, return it
    if (hardcodedProducts[slug]) {
      return hardcodedProducts[slug]
    }

    // For products from ProductGallery, we need to reconstruct from slug
    // This is a fallback - ideally products should be passed via state or fetched
    // For now, return a generic product structure
    const title = slugToTitle(slug)
    
    // Try to determine category from slug
    let category = 'Product'
    let defaultImages = ['/rebelwear.jpg']
    let defaultFeatures = ['Premium Quality', 'Custom Design Available', 'Worldwide Shipping']
    
    if (slug.includes('basketball') || slug.includes('baseball') || slug.includes('football') || 
        slug.includes('soccer') || slug.includes('hockey') || slug.includes('boxing')) {
      category = 'Sportswear'
      defaultFeatures = ['Professional Quality', 'Moisture-Wicking', 'Custom Design', 'Team Colors Available']
    } else if (slug.includes('hoodie') || slug.includes('jacket') || slug.includes('tee') || 
               slug.includes('shirt') || slug.includes('sweatshirt') || slug.includes('tracksuit')) {
      category = 'Streetwear'
      defaultFeatures = ['Premium Fabric', 'Bold Designs', 'Comfortable Fit', 'Machine Washable']
    } else if (slug.includes('glasses') || slug.includes('cap') || slug.includes('beanie') || slug.includes('belt')) {
      category = 'Accessories'
      defaultFeatures = ['Premium Quality', 'Stylish Design', 'Durable Construction']
    }

    return {
      title: title,
      price: '0.00', // Will be set from actual product data
      category: category,
      description: `Premium ${title.toLowerCase()} with exceptional quality and design.`,
      images: defaultImages,
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      features: defaultFeatures
    }
  }

  // Use product from state if available, otherwise lookup by slug
  const product = productFromState || getProductBySlug(slug)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <Link to="/" className="btn-primary">Back to Home</Link>
        </div>
      </div>
    )
  }

  // Determine if we should show only single image (from Buy Now) or slider
  // If image index is in URL params, it means user came from Buy Now - show only that image
  const showSingleImage = searchParams.has('image')
  const currentImageIndex = showSingleImage && imageIndex >= 0 && imageIndex < product.images.length 
    ? imageIndex 
    : 0
  const currentImage = product.images[currentImageIndex] || product.images[0]

  const handleBuyNow = () => {
    // Scroll to contact section on home page
    window.location.href = '/#contact'
  }

  return (
    <div className="pt-24">
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images - Show single image if from Buy Now, otherwise slider */}
          <div className="h-96 lg:h-[600px] rounded-lg overflow-hidden">
            {showSingleImage ? (
              <img 
                src={currentImage} 
                alt={product.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <ImageSlider 
                images={product.images} 
                autoPlay={false}
                initialIndex={currentImageIndex}
              />
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-secondary font-semibold mb-2">{product.category}</p>
              <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
              <p className="text-3xl font-bold text-secondary mb-6">${product.price}</p>
              <p className="text-text-light text-lg leading-relaxed">{product.description}</p>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold">Select Size</h3>
                <button
                  onClick={() => setShowSizeChart(!showSizeChart)}
                  className="text-secondary hover:underline text-sm font-medium"
                >
                  {showSizeChart ? 'Hide' : 'View'} Size Chart
                </button>
              </div>
              
              {/* Size Chart Modal/Overlay */}
              {showSizeChart && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowSizeChart(false)}>
                  <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">Size Chart</h2>
                        <button
                          onClick={() => setShowSizeChart(false)}
                          className="text-2xl font-bold text-gray-500 hover:text-gray-800"
                        >
                          ×
                        </button>
                      </div>
                      <img 
                        src="/size chart.jpg" 
                        alt="Size Chart" 
                        className="w-full h-auto rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 border-2 rounded-lg font-semibold transition-colors text-lg ${
                      selectedSize === size
                        ? 'border-secondary bg-secondary text-white'
                        : 'border-gray-300 hover:border-secondary'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && (
                <p className="text-red-500 text-sm mt-2">Please select a size</p>
              )}
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-xl font-semibold mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border-2 border-gray-300 rounded-lg flex items-center justify-center font-bold hover:border-secondary"
                >
                  -
                </button>
                <span className="text-xl font-semibold px-4">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border-2 border-gray-300 rounded-lg flex items-center justify-center font-bold hover:border-secondary"
                >
                  +
                </button>
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-xl font-semibold mb-3">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-secondary">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Buy Button */}
            <button
              onClick={handleBuyNow}
              disabled={!selectedSize}
              className={`w-full py-4 px-8 rounded-xl text-xl font-semibold transition-colors ${
                selectedSize
                  ? 'bg-secondary text-white hover:bg-secondary/90'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {selectedSize 
                ? `Buy Now - $${(parseFloat(product.price) * quantity).toFixed(2)}`
                : 'Please Select a Size'
              }
            </button>

            <p className="text-sm text-text-light text-center">
              Click "Buy Now" to contact us for custom orders and pricing
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail