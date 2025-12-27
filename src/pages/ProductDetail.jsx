import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import ImageSlider from '../components/ImageSlider'

const ProductDetail = () => {
  const { slug } = useParams()
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)

  // Mock product data - in a real app, this would come from an API
  const getProductBySlug = (slug) => {
    const allProducts = {
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
    return allProducts[slug] || null
  }

  const product = getProductBySlug(slug)

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

  const handleBuyNow = () => {
    // Scroll to contact section on home page
    window.location.href = '/#contact'
  }

  return (
    <div className="pt-24">
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="h-96 lg:h-[600px]">
            <ImageSlider images={product.images} autoPlay={false} />
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
              <h3 className="text-xl font-semibold mb-3">Size</h3>
              <div className="flex gap-3 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border-2 rounded-lg font-semibold transition-colors ${
                      selectedSize === size
                        ? 'border-secondary bg-secondary text-white'
                        : 'border-gray-300 hover:border-secondary'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
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
              className="w-full bg-secondary text-white py-4 px-8 rounded-xl text-xl font-semibold hover:bg-secondary/90 transition-colors"
            >
              Buy Now - ${(parseFloat(product.price) * quantity).toFixed(2)}
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