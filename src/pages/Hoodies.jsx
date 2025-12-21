import ProductGallery from '../components/ProductGallery'

const Hoodies = () => {
  const products = [
    {
      title: 'Classic Hoodie',
      price: '49.00',
      category: 'Streetwear',
      description: 'Timeless style with premium comfort. Clean design, everyday comfort.',
      images: [
        '/streetwear images/classichoodie1.jpg',
        '/streetwear images/classichoodie2.jpg',
        '/streetwear images/classichoodie3.jpg',
        '/streetwear images/classichoodie4.jpg',
        '/streetwear images/classichoodie6.jpg',
        '/streetwear images/classsichoodie5.jpg',
      ],
      badge: 'Popular',
    },
    {
      title: 'Oversize Hoodie',
      price: '49.00',
      category: 'Streetwear',
      description: 'Relaxed fit for ultimate comfort. Street-ready silhouette.',
      images: [
        '/streetwear images/oversizehoodie1.jpg',
        '/streetwear images/oversizehoodie2.jpg',
        '/streetwear images/oversizehoodie3.jpg',
        '/streetwear images/oversizehoodie4.jpg',
        '/streetwear images/oversizehoodie5.jpg',
        '/streetwear images/oversizehoodie6.jpg',
        '/streetwear images/oversizehoodie7.jpg',
        '/streetwear images/oversizehoodie8.jpg',
      ],
    },
    {
      title: 'Pullover Hoodie',
      price: '49.00',
      category: 'Streetwear',
      description: 'Classic pullover design with comfortable fit and premium quality.',
      images: [
        '/streetwear images/pulloverhoodie1.jpg',
        '/streetwear images/pulloverhoodie2.jpg',
        '/streetwear images/pulloverhoodie3.jpg',
        '/streetwear images/pulloverhoodie4.jpg',
        '/streetwear images/pulloverhoodie5.jpg',
        '/streetwear images/pulloverhoodie6.jpg',
      ],
    },
    {
      title: 'Zip Hoodie',
      price: '59.00',
      category: 'Streetwear',
      description: 'Versatile zip-up design. Functional zip with soft fleece interior.',
      images: [
        '/streetwear images/Ziphoodie1.jpg',
        '/streetwear images/Ziphoodie2.jpg',
        '/streetwear images/Ziphoodie3.jpg',
        '/streetwear images/Ziphoodie4.jpg',
        '/streetwear images/Ziphoodie5.jpg',
        '/streetwear images/Ziphoodie6.jpg',
      ],
    },
    {
      title: 'Rebel Hoodie',
      price: '39.00',
      category: 'Streetwear',
      description: 'Warm, bold, and made to stand out. Premium cotton blend with custom graphics.',
      images: [
        '/streetwear images/H11.jpeg',
        '/streetwear images/H12.jpeg',
        '/streetwear images/hoo1.jpeg',
        '/streetwear images/hoo2.jpeg',
        '/streetwear images/hood3.avif',
        '/streetwear images/hoodi2.avif',
        '/streetwear images/hoodie1.avif',
      ],
      badge: 'New',
    },
    {
      title: 'Custom Hoodie',
      price: 'Custom Quote',
      category: 'Special Orders',
      description: 'Your design, our quality. Have a unique design in mind? Contact us for personalized solutions.',
      images: ['/streetwear images/customhoodie.webp'],
    },
  ]

  return (
    <div>
      <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-gray-900/90"></div>
        <div className="container relative z-10 text-center max-w-4xl px-5">
          <h1 className="text-2xl md:text-7xl   font-bold mb-4 tracking-wider uppercase bg-gradient-to-r from-white to-secondary bg-clip-text text-transparent">Hoodies</h1>
          <p className="text-xl font-light mb-4 text-gray-300">Warm, bold, and made to stand out.</p>
        </div>
      </section>
      <section className="py-24 bg-white">
        <div className="container">
          <h2 className="section-title mb-12">Hoodies Collection</h2>
          <ProductGallery products={products} />
        </div>
      </section>
    </div>
  )
}

export default Hoodies


