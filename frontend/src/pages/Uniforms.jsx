import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Uniforms = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const uniformTypes = [
    {
      title: 'Basketball Uniforms',
      description: 'Professional basketball jerseys and shorts designed for peak performance on the court.',
      features: ['Moisture-Wicking Fabric', 'Custom Numbers & Names', 'Professional Quality'],
      link: '/basketball-uniforms',
      badge: 'Popular',
      
      image:         '/streetwear images/sportswear images/basketball uniform 3.jpeg',
    },
    {
      title: 'Baseball Uniforms',
      description: 'Classic baseball jerseys and pants with custom team branding and player details.',
      features: ['Breathable Material', 'Flexible Design', 'Team Branding'],
      link: '/baseball-uniforms',
      badge: 'Best Seller',
      image:         '/streetwear images/sportswear images/baseball uniform 2.jpeg',
    },
    {
      title: 'American Football Uniforms',
      description: 'Durable football jerseys designed to withstand the toughest gridiron action.',
      features: ['Quick-Dry Fabric', 'Custom Colors', 'Perfect Fit'],
      link: '/football-uniforms',
      badge: 'New',
      image:         '/streetwear images/sportswear images/american football uniform 7.jpeg',
    },
    {
      title: 'Soccer Uniforms',
      description: 'Lightweight soccer jerseys and shorts built for speed and agility on the pitch.',
      features: ['Weather Resistant', 'Team Logo', 'Premium Quality'],
      link: '/soccer-uniforms',
      image:         '/streetwear images/sportswear images/soccer jersey 8.jpeg',

    },
    {
      title: 'Uniform Accessories',
      description: 'Complete your team\'s look with professional sports accessories.',
      features: ['Team Essentials', 'Custom Branding', 'Premium Quality'],
      link: '/uniform-accessories',
      image:         '/streetwear images/sportswear images/sport-accessory.webp',
    },
  ]

  return (
    <div>
      <section className="relative min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-gray-900/90"></div>
        <div className="container relative z-10 text-center max-w-4xl px-5">
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-wider uppercase">
            TEAM UNIFORMS
          </h1>
          <p className="text-xl font-light mb-4 text-gray-300">Durability Meets Style for Champions</p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Custom sportswear designed to elevate your team's performance and presence. Professional
            quality, unmatched durability, and championship style.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container">
          <h2 className="section-title">Our Team Uniform Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {uniformTypes.map((uniform, index) => (
              <Link
                key={index}
                to={uniform.link}
                className="bg-bg-light rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl block"
              >
                <div className="h-96 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
                  {uniform.image ? (
                    <img 
                      src={uniform.image} 
                      alt={uniform.title}
                      className="w-full h-full object-center"
                    />
                  ) : null}
                  {uniform.badge && (
                    <span className="absolute top-4 right-4 bg-secondary text-white px-4 py-2 rounded-full text-sm font-semibold">
                      {uniform.badge}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{uniform.title}</h3>
                  <p className="text-text-light text-sm mb-2">Team Uniforms</p>
                  <p className="text-text-light text-sm mb-4">{uniform.description}</p>
                  <ul className="text-text-light text-sm space-y-1">
                    {uniform.features.map((feature, idx) => (
                      <li key={idx}>• {feature}</li>
                    ))}
                  </ul>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Uniforms


