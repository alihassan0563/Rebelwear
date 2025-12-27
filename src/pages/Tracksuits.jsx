import ProductGallery from '../components/ProductGallery'

const Tracksuits = () => {
  const products = [
    {
      title: 'Classic Track',
      price: '89.00',
      category: 'Streetwear',
      description: 'Timeless tracksuit design. Built for motion, born for rebels.',
      images: [
        '/streetwear images/classictrack1.jpg',
        '/streetwear images/classictrack2.jpg',
        '/streetwear images/classictrack3.jpg',
        '/streetwear images/classictrack4.jpg',
        '/streetwear images/classictrack5.jpg',
        '/streetwear images/classictrack6.jpg',
        '/streetwear images/classictrack7.jpg',
        '/streetwear images/classictrack8.jpg',
        '/streetwear images/classictrack9.jpg',
        '/streetwear images/classictrack10.jpg',
        '/streetwear images/classictrack11.jpg',
        '/streetwear images/classictrack12.jpg',
      ],
      badge: 'Popular',
    },
    {
      title: 'Performance Track',
      price: '95.00',
      category: 'Streetwear',
      description: 'Built for motion. Born for rebels. Functional style meets street aesthetic.',
      images: [
        '/streetwear images/performancetrack1.jpg',
        '/streetwear images/performancetrack2.jpg',
        '/streetwear images/performancetrack3.jpg',
        '/streetwear images/performancetrack4.jpg',
        '/streetwear images/performancetrack5.jpg',
        '/streetwear images/performancetrack6.jpg',
      ],
    },
    {
      title: 'Sweatsuit',
      price: '85.00',
      category: 'Streetwear',
      description: 'Comfort meets style. Cozy layers with street-ready design.',
      images: [
        '/streetwear images/sweatsuit1.jpg',
        '/streetwear images/sweatsuit2.jpg',
        '/streetwear images/sweatsuit3.jpg',
        '/streetwear images/sweatsuit4.jpg',
        '/streetwear images/sweatsuit5.jpg',
        '/streetwear images/sweatsuit6.jpg',
        '/streetwear images/sweatsuit7.jpg',
      ],
    },
    {
      title: 'Premium Track Collection',
      price: '99.00',
      category: 'Streetwear',
      description: 'Built for the streets. Born to stand out. Premium quality fabric.',
      images: [
        '/streetwear images/Tra1.avif',
        '/streetwear images/Tra2.avif',
        '/streetwear images/Tra3.avif',
        '/streetwear images/Tra4.avif',
        '/streetwear images/Tra5.avif',
        '/streetwear images/Tra6.avif',
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


