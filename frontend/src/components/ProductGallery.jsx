import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import ImageSlider from './ImageSlider'

const ProductGallery = ({ products }) => {
  const navigate = useNavigate()
  const [currentImageIndexes, setCurrentImageIndexes] = useState({})

  const handleImageChange = (productIndex, imageIndex) => {
    setCurrentImageIndexes(prev => ({
      ...prev,
      [productIndex]: imageIndex
    }))
  }

  const getProductSlug = (product) => {
    return product.slug || product.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  }

  const handleBuyNow = (product, productIndex, e) => {
    if (e) e.preventDefault()
    const currentImageIndex = currentImageIndexes[productIndex] || 0
    const productSlug = getProductSlug(product)
    localStorage.setItem('selectedProduct', JSON.stringify(product))
    navigate(`/order/${productSlug}/${currentImageIndex}`)
    window.scrollTo(0, 0)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product, index) => {
        const productSlug = getProductSlug(product)
        const currentImgIdx = currentImageIndexes[index] || 0
        const orderUrl = `/order/${productSlug}/${currentImgIdx}`
        const altLabel = `${product.title} - ${product.category || 'Apparel'} | REBELWEAR`

        return (
          <article
            key={product._id || productSlug || index}
            className="bg-bg-light rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group flex flex-col h-full border border-neutral-100"
            itemScope
            itemType="https://schema.org/Product"
          >
            <div 
              onClick={(e) => handleBuyNow(product, index, e)}
              className="h-72 relative object-cover cursor-pointer bg-neutral-900"
            >
              {product.images && product.images.length > 0 ? (
                <ImageSlider 
                  images={product.images} 
                  autoPlay={false} 
                  altText={altLabel}
                  onImageChange={(imageIndex) => handleImageChange(index, imageIndex)}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                  <span className="text-6xl opacity-30">🏆</span>
                </div>
              )}
              {product.badge && (
                <span className="absolute top-4 right-4 bg-secondary text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase z-20 shadow-md">
                  {product.badge}
                </span>
              )}
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div>
                <Link
                  to={orderUrl}
                  onClick={(e) => handleBuyNow(product, index, e)}
                  className="block hover:text-secondary transition-colors"
                  aria-label={`Order ${product.title}`}
                >
                  <h3 className="text-xl font-bold mb-2 text-neutral-900 line-clamp-1" itemProp="name">
                    {product.title}
                  </h3>
                </Link>
              </div>
              {product.price && (
                <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
                  <meta itemProp="priceCurrency" content="USD" />
                  <meta itemProp="price" content={product.price.replace(/[^0-9.]/g, '')} />
                  <link itemProp="availability" href="https://schema.org/InStock" />
                  <p className="text-secondary text-xl font-extrabold mb-2">
                    ${product.price}
                  </p>
                </div>
              )}
              {product.category && (
                <p className="text-text-light text-xs font-semibold uppercase tracking-wider mb-2" itemProp="category">
                  {product.category}
                </p>
              )}
              {product.description && (
                <p className="text-text-light text-sm mb-6 flex-grow leading-relaxed line-clamp-2" itemProp="description">
                  {product.description}
                </p>
              )}
              <Link 
                to={orderUrl}
                onClick={(e) => handleBuyNow(product, index, e)}
                className="w-full text-center bg-secondary text-white py-3 px-6 rounded-xl font-bold uppercase tracking-wider text-xs hover:bg-secondary/90 transition-all shadow-md shadow-secondary/20 mt-auto block"
                aria-label={`Buy ${product.title} Now`}
              >
                Order / Customize Now
              </Link>
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default ProductGallery
