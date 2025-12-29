import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ImageSlider from './ImageSlider'

const ProductGallery = ({ products }) => {
  const navigate = useNavigate()
  const [currentImageIndices, setCurrentImageIndices] = useState({})

  const handleImageIndexChange = (productIndex, imageIndex) => {
    setCurrentImageIndices(prev => ({
      ...prev,
      [productIndex]: imageIndex
    }))
  }

  const handleBuyNow = (product, productIndex) => {
    const productSlug = product.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    const currentImageIndex = currentImageIndices[productIndex] || 0
    // Pass product data via state so ProductDetail can access it
    navigate(`/product/${productSlug}?image=${currentImageIndex}`, {
      state: {
        product: {
          ...product,
          sizes: product.sizes || ['S', 'M', 'L', 'XL', 'XXL'],
          features: product.features || ['Premium Quality', 'Custom Design Available', 'Worldwide Shipping']
        }
      }
    })
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product, index) => {
        const productSlug = product.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
        return (
          <div
            key={index}
            className="bg-bg-light rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group flex flex-col h-full"
          >
            <Link 
              to={`/product/${productSlug}?image=${currentImageIndices[index] || 0}`}
              state={{
                product: {
                  ...product,
                  sizes: product.sizes || ['S', 'M', 'L', 'XL', 'XXL'],
                  features: product.features || ['Premium Quality', 'Custom Design Available', 'Worldwide Shipping']
                }
              }}
              className="block"
            >
              <div className="h-96 relative object-cover">
                {product.images && product.images.length > 0 ? (
                  <ImageSlider 
                    images={product.images} 
                    autoPlay={false}
                    onIndexChange={(imageIndex) => handleImageIndexChange(index, imageIndex)}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                    <span className="text-6xl opacity-30">🏆</span>
                  </div>
                )}
                {product.badge && (
                  <span className="absolute top-4 right-4 bg-secondary text-white px-4 py-2 rounded-full text-sm font-semibold z-20">
                    {product.badge}
                  </span>
                )}
              </div>
            </Link>
            <div className="p-6 flex flex-col flex-grow">
              <Link 
                to={`/product/${productSlug}?image=${currentImageIndices[index] || 0}`}
                state={{
                  product: {
                    ...product,
                    sizes: product.sizes || ['S', 'M', 'L', 'XL', 'XXL'],
                    features: product.features || ['Premium Quality', 'Custom Design Available', 'Worldwide Shipping']
                  }
                }}
              >
                <h3 className="text-xl font-bold mb-2 hover:text-secondary transition-colors">{product.title}</h3>
              </Link>
              {product.price && (
                <p className="text-secondary text-lg font-semibold mb-2">${product.price}</p>
              )}
              {product.category && (
                <p className="text-text-light text-sm mb-2">{product.category}</p>
              )}
              {product.description && (
                <p className="text-text-light text-sm mb-4 flex-grow">{product.description}</p>
              )}
              <button 
                onClick={(e) => {
                  e.preventDefault()
                  handleBuyNow(product, index)
                }}
                className="w-full bg-secondary text-white py-3 px-6 rounded-xl font-semibold hover:bg-secondary/90 transition-colors mt-auto"
              >
                Buy Now
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ProductGallery

