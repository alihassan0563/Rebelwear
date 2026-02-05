import { useEffect } from 'react'
import ProductGallery from '../components/ProductGallery'

const UniformAccessories = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  const products = [
    {
      title: 'Socks',
      price: '12.00',
      category: 'Uniform Accessories',
      description: 'High-performance athletic socks for maximum comfort and support.',
      images: [],
    },
    {
      title: 'Eyewear',
      price: '35.00',
      category: 'Uniform Accessories',
      description: 'Protective sports eyewear designed for performance and safety.',
      images: [],
    },
    {
      title: 'Sports Bag',
      price: '45.00',
      category: 'Uniform Accessories',
      description: 'Durable sports bags to carry all your team gear with ease.',
      images: [],
    },
    {
      title: 'Sports Watch',
      price: '55.00',
      category: 'Uniform Accessories',
      description: 'Track your performance with precision sports watches.',
      images: [],
    },
    {
      title: 'Caps',
      price: '20.00',
      category: 'Uniform Accessories',
      description: 'Team caps with custom branding and embroidery options.',
      images: [],
    },
    {
      title: 'Other Items',
      price: '25.00',
      category: 'Uniform Accessories',
      description: 'Additional team accessories and essentials for complete sports gear.',
      images: [],
    },
  ]

  return (
    <div>
      <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-gray-900/90"></div>
        <div className="container relative z-10 text-center max-w-4xl px-5">
          <h1 className="text-2xl md:text-7xl font-bold mb-4 tracking-wider uppercase bg-gradient-to-r from-white to-secondary bg-clip-text text-transparent">
            Team Uniform Accessories
          </h1>
          <p className="text-xl font-light mb-4 text-gray-300">
            Complete your team's look with professional sports accessories.
          </p>
        </div>
      </section>
      <section className="py-24 bg-white">
        <div className="container">
          <h2 className="section-title mb-12">Uniform Accessories Collection</h2>
          <ProductGallery products={products} />
        </div>
      </section>
    </div>
  )
}

export default UniformAccessories
