import ProductGallery from '../components/ProductGallery'

const HockeyUniforms = () => {
  const products = [
    {
      title: 'Professional Hockey Uniform',
      price: '90.00',
      category: 'Hockey Uniforms',
      description: 'Complete hockey uniform set with jersey. Custom team colors and logos available.',
      images: [
        '/sports image/hockey1.jpeg',
      ],
      badge: 'Popular'
    },
    {
      title: 'Elite Hockey Jersey',
      price: '100.00',
      category: 'Hockey Uniforms',
      description: 'Premium hockey uniform with durable construction and professional design.',
      images: [
        '/sports image/hockey1.jpeg',
      ],
      badge: 'Premium'
    },
    {
      title: 'Custom Team Hockey Kit',
      price: '80.00',
      category: 'Hockey Uniforms',
      description: 'Customizable hockey uniform kit for teams. Available in all sizes and colors.',
      images: [
        '/sports image/hockey1.jpeg',
      ]
    }
  ]

  return (
    <div>
      <section className="relative min-h-[40vh] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white pt-24">
        <div className="container text-center">
          <h1 className="text-5xl font-black mb-8">Hockey Uniforms</h1>
          <p className="text-xl text-gray-300">Professional hockey jerseys.</p>
        </div>
      </section>
      <section className="py-24 bg-white">
        <div className="container">
          <h2 className="section-title mb-12">Hockey Uniforms Collection</h2>
          <ProductGallery products={products} />
        </div>
      </section>
    </div>
  )
}

export default HockeyUniforms


