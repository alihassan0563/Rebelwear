import ProductGallery from '../components/ProductGallery'

const Sweatshirts = () => {
  const products = [
    {
      title: 'Crewneck Sweatshirt',
      price: '45.00',
      category: 'Streetwear',
      description: 'Classic comfort in premium fabric. Soft fleece interior, clean design.',
      images: [
        '/streetwear images/sweatshirt2.jpg',
        '/streetwear images/sweatshirt1.jpg',
        '/streetwear images/sweatshirt3.jpg',
        '/streetwear images/sweatshirt4.jpg',
        '/streetwear images/sweatshirt5.jpg',
        '/streetwear images/sweatshirt6.jpg',
      ],
      badge: 'Bestseller',
    },
    {
      title: 'Half Zip Sweatshirt',
      price: '49.00',
      category: 'Streetwear',
      description: 'Versatile zip-up design. Minimal aesthetic, maximum comfort.',
      images: [
        '/streetwear images/zipsweat1.jpg',
        '/streetwear images/zipsweat2.jpg',
        '/streetwear images/zipsweat3.jpg',
        '/streetwear images/zipsweat4.jpg',
        '/streetwear images/zipsweat5.jpg',
      ],
    },
    {
      title: 'Premium Sweatshirt',
      price: '45.00',
      category: 'Streetwear',
      description: 'Cozy layers with street-ready style.',
      images: ['/streetwear images/Sweat1.jpg'],
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


