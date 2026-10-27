import { useEffect } from 'react'
import ProductGallery from '../components/ProductGallery'

const Sweatshirts = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  const products = [
    {
      title: 'Crewneck Sweatshirt',
      price: '45.00',
      category: 'Streetwear',
      description: 'Classic comfort in premium fabric. Soft fleece interior, clean design.',
      images: [
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105333/rebelwear/streetwear-images/sweatshirt2.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105332/rebelwear/streetwear-images/sweatshirt1.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105334/rebelwear/streetwear-images/sweatshirt3.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105334/rebelwear/streetwear-images/sweatshirt4.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105335/rebelwear/streetwear-images/sweatshirt5.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105336/rebelwear/streetwear-images/sweatshirt6.jpg',
      ],
      badge: 'Bestseller',
    },
    {
      title: 'Half Zip Sweatshirt',
      price: '49.00',
      category: 'Streetwear',
      description: 'Versatile zip-up design. Minimal aesthetic, maximum comfort.',
      images: [
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105373/rebelwear/streetwear-images/zipsweat1.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105374/rebelwear/streetwear-images/zipsweat2.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105375/rebelwear/streetwear-images/zipsweat3.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105376/rebelwear/streetwear-images/zipsweat4.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105376/rebelwear/streetwear-images/zipsweat5.jpg',
      ],
    },
    {
      title: 'Premium Sweatshirt',
      price: '45.00',
      category: 'Streetwear',
      description: 'Cozy layers with street-ready style.',
      images: ['https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105331/rebelwear/streetwear-images/sweat1.jpg'],
    },
  ]

  return (
    <div>
      <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-gray-900/90"></div>
        <div className="container relative z-10 text-center max-w-4xl px-5">
          <h1 className="text-2xl md:text-7xl  font-bold mb-4 tracking-wider uppercase bg-gradient-to-r from-white to-secondary bg-clip-text text-transparent">Sweatshirts</h1>
          <p className="text-xl font-light mb-4 text-gray-300">Cozy layers with street-ready style.</p>
        </div>
      </section>
      <section className="py-24 bg-white">
        <div className="container">
          <h2 className="section-title mb-12">Sweatshirts Collection</h2>
          <ProductGallery products={products} />
        </div>
      </section>
    </div>
  )
}

export default Sweatshirts


