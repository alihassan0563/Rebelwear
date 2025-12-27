import ProductGallery from '../components/ProductGallery'

const BoxingUniforms = () => {
  const products = [
    {
      title: 'Professional Boxing Uniform',
      price: '70.00',
      category: 'Boxing Uniforms',
      description: 'Complete boxing gear set. Custom designs and colors available.',
      images: [
        '/sports image/boxing1.jpeg',
      ],
      badge: 'Popular'
    },
    {
      title: 'Elite Boxing Gear',
      price: '80.00',
      category: 'Boxing Uniforms',
      description: 'Premium boxing uniform with breathable fabric and professional design.',
      images: [
        '/sports image/boxing1.jpeg',
      ],
      badge: 'Premium'
    },
    {
      title: 'Custom Boxing Kit',
      price: '60.00',
      category: 'Boxing Uniforms',
      description: 'Customizable boxing uniform kit. Available in all sizes and colors.',
      images: [
        '/sports image/boxing1.jpeg',
      ]
    }
  ]

  return (
    <div>
      <section className="relative min-h-[40vh] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white pt-24">
        <div className="container text-center">
          <h1 className="text-5xl font-black mb-8">Boxing Uniforms</h1>
          <p className="text-xl text-gray-300">Professional boxing gear.</p>
        </div>
      </section>
      <section className="py-24 bg-white">
        <div className="container">
          <h2 className="section-title mb-12">Boxing Uniforms Collection</h2>
          <ProductGallery products={products} />
        </div>
      </section>
    </div>
  )
}

export default BoxingUniforms


