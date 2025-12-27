import ProductGallery from '../components/ProductGallery'

const BasketballUniforms = () => {
  const products = [
    {
      title: 'Professional Basketball uniform',
      price: '69.99',
      category: 'Basketball Uniforms',
      description: 'Complete basketball uniform set with jersey and shorts. Custom team colors and logos available.',
      images: [
        '/streetwear images/sportswear images/basketball uniform 1.jpeg',
        '/streetwear images/sportswear images/basketball uniform 2.jpeg',
        '/streetwear images/sportswear images/basketball uniform 3.jpeg',
        '/streetwear images/sportswear images/basketball uniform 4.jpeg',
        '/streetwear images/sportswear images/basketball uniform 5.jpeg',
        '/streetwear images/sportswear images/basketball uniform 6.jpeg',
        '/streetwear images/sportswear images/basketball uniform 7.jpeg',
        '/streetwear images/sportswear images/basketball uniform 8.jpeg',
        '/streetwear images/sportswear images/basketball uniform 9.jpeg',
  
      ],
      badge: 'Popular'
    },
    {
      title: 'Elite Basketball Jersey',
      price: '49.99',
      category: 'Basketball Uniforms',
      description: 'Premium basketball uniform with moisture-wicking fabric and professional design.',
      images: [
        '/streetwear images/sportswear images/basketball jersey3.jpeg',
        '/streetwear images/sportswear images/basketball jersey2.jpeg',
        '/streetwear images/sportswear images/basketball jersey1.jpeg',
        '/streetwear images/sportswear images/basketball jersey4.jpeg',
        '/streetwear images/sportswear images/basketball jersey5.jpeg',

      ],
      badge: 'Premium'
    },
    {
      title: 'Custom Team Basketball Kit',
      price: '149.99',
      category: 'Basketball Uniforms',
      description: 'Customizable basketball uniform kit for teams. Available in all sizes and colors.',
      images: [
        '/streetwear images/sportswear images/basketball kit4.jpeg',
        '/streetwear images/sportswear images/basketball kit2.jpeg',
        '/streetwear images/sportswear images/basketball kit3.jpeg',
        '/streetwear images/sportswear images/basketball kit1.jpeg',

      ]
    }
  ]

  return (
    <div>
      <section className="relative min-h-[40vh] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white pt-24">
        <div className="container text-center">
          <h1 className="text-5xl font-black mb-8">Basketball Uniforms</h1>
          <p className="text-xl text-gray-300">Professional basketball jerseys and shorts.</p>
        </div>
      </section>
      <section className="py-24 bg-white">
        <div className="container">
          <h2 className="section-title mb-12">Basketball Uniforms Collection</h2>
          <ProductGallery products={products} />
        </div>
      </section>
    </div>
  )
}

export default BasketballUniforms


