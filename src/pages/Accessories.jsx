import ProductGallery from '../components/ProductGallery'

const Accessories = () => {
  const products = [
    {
      title: 'Glasses',
      price: '29.00',
      category: 'Accessories',
      description: 'Stylish eyewear to complete your look. Premium quality frames.',
      images: [
        '/streetwear images/glasses1.jpg',
        '/streetwear images/glasses2.jpg',
        '/streetwear images/glasses3.jpg',
        '/streetwear images/glasses4.jpg',
        '/streetwear images/glasses5.jpg',
      ],
    },
    {
      title: 'Cap and Hats',
      price: '22.00',
      category: 'Accessories',
      description: 'Headwear that defines your style. Custom embroidery available.',
      images: [
        '/streetwear images/cap1.jpg',
        '/streetwear images/cap2.jpg',
        '/streetwear images/cap3.jpg',
        '/streetwear images/cap4.jpg',
        '/streetwear images/cap5.jpg',
      ],
    },
    {
      title: 'Beanies',
      price: '15.00',
      category: 'Accessories',
      description: 'Warm and stylish headwear for every season. Adjustable fit.',
      images: [
        '/streetwear images/benies6.jpg',
        '/streetwear images/benies2.jpg',
        '/streetwear images/benies3.jpg',
        '/streetwear images/benies4.jpg',
        '/streetwear images/benies5.jpg',
        '/streetwear images/benies1.jpg',
      ],
    },
    {
      title: 'Other Accessories',
      price: '25.00',
      category: 'Accessories',
      description: 'Everything else: socks, bags, belts, and more. Complete your look with premium accessories.',
      images: [
       
        '/streetwear images/belt1.jpg',
        '/streetwear images/belt2.jpg',
        '/streetwear images/belt3.jpg',
        // Add more socks, bags, belts images here if you get them later.
      ],
    },
  ]

  return (
    <div>
      <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-gray-900/90"></div>
        <div className="container relative z-10 text-center max-w-4xl px-5">
          <h1 className="text-2xl md:text-7xl  font-bold mb-4 tracking-wider uppercase bg-gradient-to-r from-white to-secondary bg-clip-text text-transparent">Accessories</h1>
          <p className="text-xl font-light mb-4 text-gray-300">Complete your look with our accessories.</p>
        </div>
      </section>
      <section className="py-24 bg-white">
        <div className="container">
          <h2 className="section-title mb-12">Accessories Collection</h2>
          <ProductGallery products={products} />
        </div>
      </section>
    </div>
  )
}

export default Accessories


