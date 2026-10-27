import { useEffect } from 'react'
import ProductGallery from '../components/ProductGallery'

const Jackets = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  const products = [
    {
      title: 'Bike Jacket',
      price: '89.00',
      category: 'Streetwear',
      description: 'Street-ready outerwear with attitude. Weather resistant, bold designs.',
      images: [
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105180/rebelwear/streetwear-images/bikejacket.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105181/rebelwear/streetwear-images/bikejacket1.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105182/rebelwear/streetwear-images/bikejacket2.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105182/rebelwear/streetwear-images/bikejacket3.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105183/rebelwear/streetwear-images/bikejacket4.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105185/rebelwear/streetwear-images/bikejacket6.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105186/rebelwear/streetwear-images/bikejacket7.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105187/rebelwear/streetwear-images/bikejacket8.jpg',
      ],
      badge: 'Hot',
    },
    {
      title: 'Premium Jacket Collection',
      price: '79.00',
      category: 'Streetwear',
      description: 'Modern designs for every season. Elevate your style with premium street jackets.',
      images: [
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105228/rebelwear/streetwear-images/jacket1.avif',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105229/rebelwear/streetwear-images/jacket2.avif',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105230/rebelwear/streetwear-images/jacket3.avif',
      ],
    },
    {
      title: 'Puffer Jacket',
      price: '99.00',
      category: 'Streetwear',
      description: 'Warmth meets style. Year-round comfort with bold designs.',
      images: [
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105254/rebelwear/streetwear-images/puffer1.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105255/rebelwear/streetwear-images/puffer2.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105256/rebelwear/streetwear-images/puffer3.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105257/rebelwear/streetwear-images/puffer4.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105258/rebelwear/streetwear-images/puffer5.jpg',
      ],
    },
    {
      title: 'Varsity Jacket',
      price: '95.00',
      category: 'Streetwear',
      description: 'Classic athletic style. Built for motion, designed for rebels.',
      images: [
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105351/rebelwear/streetwear-images/versity1.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105354/rebelwear/streetwear-images/versity2.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105355/rebelwear/streetwear-images/versity3.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105356/rebelwear/streetwear-images/versity4.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105357/rebelwear/streetwear-images/versity5.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105358/rebelwear/streetwear-images/versity6.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105359/rebelwear/streetwear-images/versity7.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105360/rebelwear/streetwear-images/versity8.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105361/rebelwear/streetwear-images/versity9.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105352/rebelwear/streetwear-images/versity10.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105353/rebelwear/streetwear-images/versity11.jpg',
      ],
      badge: 'Popular',
    },
  ]

  return (
    <div>
      <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-gray-900/90"></div>
        <div className="container relative z-10 text-center max-w-4xl px-5">
          <h1 className="text-2xl md:text-7xl  font-bold mb-4 tracking-wider uppercase bg-gradient-to-r from-white to-secondary bg-clip-text text-transparent">Jackets</h1>
          <p className="text-xl font-light mb-4 text-gray-300">Street-ready outerwear with attitude.</p>
        </div>
      </section>
      <section className="py-24 bg-white">
        <div className="container">
          <h2 className="section-title mb-12">Jackets Collection</h2>
          <ProductGallery products={products} />
        </div>
      </section>
    </div>
  )
}

export default Jackets


