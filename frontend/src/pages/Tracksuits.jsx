import { useEffect } from 'react'
import ProductGallery from '../components/ProductGallery'

const Tracksuits = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const products = [
    {
      title: 'Classic Track',
      price: '89.00',
      category: 'Streetwear',
      description: 'Timeless tracksuit design. Built for motion, born for rebels.',
      images: [
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105197/rebelwear/streetwear-images/classictrack1.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105201/rebelwear/streetwear-images/classictrack2.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105202/rebelwear/streetwear-images/classictrack3.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105203/rebelwear/streetwear-images/classictrack4.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105204/rebelwear/streetwear-images/classictrack5.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105205/rebelwear/streetwear-images/classictrack6.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105206/rebelwear/streetwear-images/classictrack7.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105206/rebelwear/streetwear-images/classictrack8.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105207/rebelwear/streetwear-images/classictrack9.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105198/rebelwear/streetwear-images/classictrack10.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105199/rebelwear/streetwear-images/classictrack11.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105200/rebelwear/streetwear-images/classictrack12.jpg',
      ],
      badge: 'Popular',
    },
    {
      title: 'Performance Track',
      price: '95.00',
      category: 'Streetwear',
      description: 'Built for motion. Born for rebels. Functional style meets street aesthetic.',
      images: [
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105239/rebelwear/streetwear-images/performancetrack1.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105240/rebelwear/streetwear-images/performancetrack2.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105241/rebelwear/streetwear-images/performancetrack3.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105241/rebelwear/streetwear-images/performancetrack4.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105242/rebelwear/streetwear-images/performancetrack5.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105243/rebelwear/streetwear-images/performancetrack6.jpg',
      ],
    },
    {
      title: 'Sweatsuit',
      price: '85.00',
      category: 'Streetwear',
      description: 'Comfort meets style. Cozy layers with street-ready design.',
      images: [
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105337/rebelwear/streetwear-images/sweatsuit1.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105337/rebelwear/streetwear-images/sweatsuit2.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105338/rebelwear/streetwear-images/sweatsuit3.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105339/rebelwear/streetwear-images/sweatsuit4.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105340/rebelwear/streetwear-images/sweatsuit5.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105341/rebelwear/streetwear-images/sweatsuit6.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105342/rebelwear/streetwear-images/sweatsuit7.jpg',
      ],
    },
    {
      title: 'Premium Track Collection',
      price: '99.00',
      category: 'Streetwear',
      description: 'Built for the streets. Born to stand out. Premium quality fabric.',
      images: [
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105346/rebelwear/streetwear-images/tra1.avif',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105347/rebelwear/streetwear-images/tra2.avif',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105348/rebelwear/streetwear-images/tra3.avif',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105348/rebelwear/streetwear-images/tra4.avif',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105350/rebelwear/streetwear-images/tra5.avif',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105350/rebelwear/streetwear-images/tra6.avif',
      ],
      badge: 'New',
    },
  ]

  return (
    <div>
      <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-gray-900/90"></div>
        <div className="container relative z-10 text-center max-w-4xl px-5">
          <h1 className="text-2xl md:text-7xl font-bold mb-4 tracking-wider uppercase bg-gradient-to-r from-white to-secondary bg-clip-text text-transparent">Tracksuits</h1>
          <p className="text-xl font-light mb-4 text-gray-300">Built for the streets. Born to stand out.</p>
        </div>
      </section>
      <section className="py-24 bg-white">
        <div className="container">
          <h2 className="section-title mb-12">Tracksuits Collection</h2>
          <ProductGallery products={products} />
        </div>
      </section>
    </div>
  )
}

export default Tracksuits


