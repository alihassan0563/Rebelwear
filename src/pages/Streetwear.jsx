import { Link } from 'react-router-dom'

const Streetwear = () => {
  const categories = [
    {
      title: 'Hoodies',
      description: 'Warm, bold, and made to stand out.',
      image: '/streetwear images/H12.jpeg',
      link: '/hoodies',
    },
    {
      title: 'T-Shirts',
      description: 'Premium cotton tees with bold graphics.',
      image: '/streetwear images/sh3.jpeg',
      link: '/tshirts',
    },
    {
      title: 'Sweatshirts',
      description: 'Cozy layers with street-ready style.',
      image: '/streetwear images/Sweat1.jpg',
      link: '/sweatshirts',
    },
    {
      title: 'Tracksuits',
      description: 'Built for motion. Born for rebels.',
      image: '/streetwear images/hoodiecol.jpg',
      link: '/tracksuits',
    },
    {
      title: 'Jackets',
      description: 'Street-ready outerwear with attitude.',
      image: '/streetwear images/jacket2.avif',
      link: '/jackets',
    },
    {
      title: 'Accessories',
      description: 'Complete your look with our accessories.',
      image: '/streetwear images/accessories.jpg',
      link: '/accessories',
    },
  ]

  return (
    <div>
      <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-gray-900/90"></div>
        <div className="container relative z-10 text-center max-w-4xl px-5">
          <h1 className="text-7xl md:text-8xl font-bold mb-4 tracking-wider uppercase bg-gradient-to-r from-white to-secondary bg-clip-text text-transparent">
            STREETWEAR COLLECTION
          </h1>
          <p className="text-xl font-light mb-4 text-gray-300">Bold Designs That Break the Mold</p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Premium fabrics meet urban aesthetics. Express your rebellious spirit with our custom
            streetwear designed for those who dare to be different.
          </p>
        </div>
        
      </section>

      <section className="py-24 bg-white">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={category.link}
                className="bg-bg-light rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group"
              >
                <div className="h-72 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4">{category.title}</h3>
                  <p className="text-text-light mb-6">{category.description}</p>
                  <span className="text-secondary font-semibold group-hover:translate-x-2 inline-block transition-transform">
                    Explore →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Streetwear


