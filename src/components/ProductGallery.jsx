import ImageSlider from './ImageSlider'

const ProductGallery = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product, index) => (
        <div
          key={index}
          className="bg-bg-light rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group"
        >
          <div className="h-72 relative object-cover">
            {product.images && product.images.length > 0 ? (
              <ImageSlider images={product.images} autoPlay={false} />
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
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">{product.title}</h3>
            {product.price && (
              <p className="text-secondary text-lg font-semibold mb-2">${product.price}</p>
            )}
            {product.category && (
              <p className="text-text-light text-sm mb-2">{product.category}</p>
            )}
            {product.description && (
              <p className="text-text-light text-sm">{product.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductGallery

