import ProductGallery from '../components/ProductGallery'

const FootballUniforms = () => {
  const products = [
    {
      title: 'Professional Football Uniform',
      price: '85.00',
      category: 'American Football Uniforms',
      description: 'Complete football uniform set with jersey and pants. Custom team colors and logos available.',
      images: [
        '/sports image/football1.jpeg',
      ],
      badge: 'Popular'
    },
    {
      title: 'Elite Football Jersey',
      price: '95.00',
      category: 'American Football Uniforms',
      description: 'Premium football uniform with quick-dry fabric and professional design.',
      images: [
        '/sports image/football1.jpeg',
      ],
      badge: 'Premium'
    },
    {
      title: 'Custom Team Football Kit',
      price: '75.00',
      category: 'American Football Uniforms',
      description: 'Customizable football uniform kit for teams. Available in all sizes and colors.',
      images: [
        '/sports image/football1.jpeg',
      ]
    }
  ]

  return (
    <div>
      <section className="relative min-h-[40vh] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white pt-24">
        <div className="container text-center">
          <h1 className="text-5xl font-black mb-8">American Football Uniforms</h1>
          <p className="text-xl text-gray-300">Durable football jerseys for the gridiron.</p>
        </div>
      </section>
      <section className="py-24 bg-white">
        <div className="container">
          <h2 className="section-title mb-12">American Football Uniforms Collection</h2>
          <ProductGallery products={products} />
        </div>
      </section>
    </div>
  )
}

export default FootballUniforms


