import { Link } from 'react-router-dom'
import ImageSlider from './ImageSlider'

const ProductCard = ({ 
  title, 
  category, 
  description, 
  price,
  images = [], 
  badge, 
  link, 
  delay = 0 
}) => {
  return (
    <Link
      to={link}
      className="block bg-bg-light rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="h-72 relative">
        {images.length > 0 ? (
          <ImageSlider images={images} />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
            <span className="text-6xl opacity-30">🏆</span>
          </div>
        )}
        {badge && (
          <span className="absolute top-4 right-4 bg-secondary text-white px-4 py-2 rounded-full text-sm font-semibold">
            {badge}
          </span>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        {price && (
          <p className="text-secondary text-lg font-semibold mb-2">${price}</p>
        )}
        {category && (
          <p className="text-text-light text-sm mb-2">{category}</p>
        )}
        {description && (
          <p className="text-text-light text-sm">{description}</p>
        )}
      </div>
    </Link>
  )
}

export default ProductCard


