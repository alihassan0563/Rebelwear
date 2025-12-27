import ProductGallery from '../components/ProductGallery'

const BaseballUniforms = () => {
  const products = [
    {
      title: 'Professional Baseball Uniform',
      price: '75.00',
      category: 'Baseball Uniforms',
      description: 'Complete baseball uniform set with jersey and pants. Custom team colors and logos available.',
      images: [
        '/sports image/baseball1.jpeg',
      ],
      badge: 'Popular'
    },
    {
      title: 'Elite Baseball Jersey',
      price: '85.00',
      category: 'Baseball Uniforms',
      description: 'Premium baseball uniform with breathable fabric and professional design.',
      images: [
        '/sports image/baseball1.jpeg',
      ],
      badge: 'Premium'
    },
    {
      title: 'Custom Team Baseball Kit',
      price: '65.00',
      category: 'Baseball Uniforms',
      description: 'Customizable baseball uniform kit for teams. Available in all sizes and colors.',
      images: [
        '/sports image/baseball1.jpeg',
      ]
    }
  ]

  return (
    <div>
      <section className="relative min-h-[40vh] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white pt-24">
        <div className="container text-center">
          <h1 className="text-5xl font-black mb-8">Baseball Uniforms</h1>
          <p className="text-xl text-gray-300">Classic baseball jerseys and pants.</p>
        </div>
      </section>
      <section className="py-24 bg-white">
        <div className="container">
          <h2 className="section-title mb-12">Baseball Uniforms Collection</h2>
          <ProductGallery products={products} />
        </div>
      </section>
    </div>
  )
}

export default BaseballUniforms


