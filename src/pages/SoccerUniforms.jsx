import ProductGallery from '../components/ProductGallery'

const SoccerUniforms = () => {
  const products = [
    {
      title: 'Professional Soccer Uniform',
      price: '79.99',
      category: 'Soccer Uniforms',
      description: 'Complete soccer uniform set with jersey and shorts. Custom team colors and logos available.',
      images: [
        '/streetwear images/sportswear images/soccer uniform 3.jpeg',
        '/streetwear images/sportswear images/soccer uniform 2.jpeg',
        '/streetwear images/sportswear images/soccer uniform 1.jpeg',
        '/streetwear images/sportswear images/soccer uniform 4.jpeg',
        '/streetwear images/sportswear images/soccer uniform 5.jpeg',
        '/streetwear images/sportswear images/soccer uniform 6.jpeg',

      ],
      badge: 'Popular'
    },
    {
      title: 'Elite Soccer Jersey',
      price: '49.99',
      category: 'Soccer Uniforms',
      description: 'Premium soccer uniform with weather-resistant fabric and professional design.',
      images: [
        '/streetwear images/sportswear images/soccer jersey 8.jpeg',
        '/streetwear images/sportswear images/soccer jersey 1.jpeg',
        '/streetwear images/sportswear images/soccer jersey 2.jpeg',
        '/streetwear images/sportswear images/soccer jersey 3.jpeg',
        '/streetwear images/sportswear images/soccer jersey 4.jpeg',
        '/streetwear images/sportswear images/soccer jersey 5.jpeg',
        '/streetwear images/sportswear images/soccer jersey 6.jpeg',
        '/streetwear images/sportswear images/soccer jersey 7.jpeg',

      ],
      badge: 'Premium'
    },
    {
      title: 'Custom Team Soccer Kit',
      price: '169.99',
      category: 'Soccer Uniforms',
      description: 'Customizable soccer uniform kit for teams. Available in all sizes and colors.',
      images: [
        '/streetwear images/sportswear images/soccer kit 1.jpeg',
        '/streetwear images/sportswear images/soccer kit 2.jpeg',
        '/streetwear images/sportswear images/soccer kit 3.jpeg',
      ]
    }
  ]

  return (
    <div>
      <section className="relative min-h-[40vh] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white pt-24">
        <div className="container text-center">
          <h1 className="text-5xl font-black mb-8">Soccer Uniforms</h1>
          <p className="text-xl text-gray-300">Lightweight soccer jerseys and shorts.</p>
        </div>
      </section>
      <section className="py-24 bg-white">
        <div className="container">
          <h2 className="section-title mb-12">Soccer Uniforms Collection</h2>
          <ProductGallery products={products} />
        </div>
      </section>
    </div>
  )
}

export default SoccerUniforms


