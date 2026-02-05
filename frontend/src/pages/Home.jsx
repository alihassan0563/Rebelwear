import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import ContactForm from '../components/ContactForm'

const Home = () => {
  const reviewsRef = useRef(null)

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0)
    
    // Smooth scroll for anchor links
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash) {
        const element = document.querySelector(hash)
        if (element) {
          const headerOffset = 80
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
        }
      }
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Reviews data
  const reviews = [
    {
      stars: '★★★★★',
      text: '"Exceptional quality and service! REBELWEAR brought our team\'s vision to life with custom uniforms that exceeded expectations."',
      author: 'Sarah Chen',
      location: 'Basketball Team, USA',
    },
    {
      stars: '★★★★★',
      text: '"The premium fabrics and attention to detail are unmatched. Our streetwear collection is absolutely stunning!"',
      author: 'Marcus Williams',
      location: 'Clothing Brand, UK',
    },
    {
      stars: '★★★★★',
      text: '"Fast worldwide shipping and incredible customer support. REBELWEAR is our go-to supplier for quality apparel."',
      author: 'Liam Rodriguez',
      location: 'Sports Club, Canada',
    },
    {
      stars: '★★★★★',
      text: '"Outstanding custom designs! They perfectly captured our brand aesthetic and delivered on time. Highly recommended!"',
      author: 'Emma Thompson',
      location: 'Fashion Brand, Australia',
    },
    {
      stars: '★★★★★',
      text: '"The quality of materials is top-notch. Our team uniforms look professional and have lasted through multiple seasons."',
      author: 'James Wilson',
      location: 'Soccer Team, Germany',
    },
    {
      stars: '★★★★★',
      text: '"From consultation to delivery, the experience was smooth. The custom designs exceeded our expectations."',
      author: 'Sophie Martinez',
      location: 'Streetwear Brand, Spain',
    },
    {
      stars: '★★★★★',
      text: '"Best apparel supplier we\'ve worked with! Great prices, excellent quality, and responsive communication."',
      author: 'David Kim',
      location: 'Sports Organization, Japan',
    },
    {
      stars: '★★★★★',
      text: '"REBELWEAR brings creativity and professionalism together. Our streetwear line has never looked better!"',
      author: 'Amanda Lopez',
      location: 'Fashion Boutique, Mexico',
    },
  ]

  // Featured products data
  const featuredProducts = [
    {
      title: 'Hoodie',
      category: 'Streetwear',
      description: 'Premium cotton blend with custom graphics',
      images: [
        '/streetwear images/H12.jpeg',
        
      ],
      badge: 'New',
      link: '/hoodies',
    },
    {
      title: 'Custom Uniforms',
      category: 'Team Uniforms',
      description: 'Born for Motion. Built for Rebels',
      images: [
        '/streetwear images/sportswear images/basketball kit3.jpeg'
      ],
      badge: 'Popular',
      link: '/uniforms',
    },
    {
      title: 'Street Tees',
      category: 'Streetwear',
      description: 'Bold graphics, premium fabric',
      images: [
        '/streetwear images/sh1.jpeg',

    
      ],
      badge: 'Hot',
      link: '/tshirts',
    },
    {
      title: 'Tracksuits',
      category: 'Streetwear',
      description: 'Built for the streets. Born to stand out.',
      images: [
        '/streetwear images/hoodie1.avif',
      ],
      link: '/tracksuits',
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-gray-900/90"></div>
        <div className="container relative z-10 text-center max-w-4xl px-5 py-20">
          <h1 className="text-7xl md:text-8xl font-black mb-4 tracking-wider uppercase bg-gradient-to-r from-white to-secondary bg-clip-text text-transparent">
            Rebelwear
          </h1>
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-wider uppercase">
            DARE TO BE DIFFERENT
          </h1>
          <p className="text-2xl font-light mb-6 text-gray-300">
            Premium Streetwear & Sportswear for the Bold
          </p>
          <p className="text-lg mb-8 text-gray-400 max-w-2xl mx-auto">
            We craft authentic streetwear and team uniforms that embody your rebellious spirit. From
            custom designs to worldwide shipping, we deliver quality that defines your identity.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="#products" className="btn-primary">
              Shop Now
            </a>
            <a href="#collections" className="btn-secondary">
              Explore Collections
            </a>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <span className="text-4xl text-white/70">↓</span>
        </div>
      </section>

      {/* Collections Section */}
      <section id="collections" className="py-24 bg-white">
        <div className="container">
          <h2 className="section-title">Our Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link
              to="/streetwear"
              className="bg-bg-light rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group"
            >
              <div className="h-96 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
                <img
                  src="streetwear.avif"
                  alt="Streetwear Collection"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">Streetwear Collection</h3>
                <p className="text-text-light mb-6">
                  Bold designs that break the mold. Premium fabrics meet urban aesthetics.
                </p>
                <span className="text-secondary font-semibold group-hover:translate-x-2 inline-block transition-transform">
                  Explore →
                </span>
              </div>
            </Link>

            <Link
              to="/uniforms"
              className="bg-bg-light rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group"
            >
              <div className="h-96 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
                <img
                  src="/sports 1.avif"
                  alt="Team Uniforms"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">Team Uniforms</h3>
                <p className="text-text-light mb-6">
                  Custom sportswear for teams. Durability meets style for champions.
                </p>
                <span className="text-secondary font-semibold group-hover:translate-x-2 inline-block transition-transform">
                  Explore →
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-bg-light">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="section-title text-left mb-6">Our Journey</h2>
              <h3 className="text-3xl mb-6 text-secondary">Born from Rebellion, Built with Passion</h3>
              <p className="text-lg text-text-light mb-6 leading-relaxed">
                REBELWEAR was founded on a simple belief: every individual deserves apparel that
                expresses their authentic self. We started as a small custom manufacturer with a vision
                to create streetwear and sportswear that doesn't just fit—it defines.
              </p>
              <p className="text-lg text-text-light leading-relaxed">
                Today, we're a trusted supplier for international customers, delivering premium quality
                garments that blend cutting-edge design with unmatched craftsmanship. From custom
                streetwear to team uniforms, we bring your vision to life with precision and care.
              </p>
            </div>
            <div className="h-[500px] rounded-3xl overflow-hidden">
              <img
                src="/rebelwear.jpg"
                alt="REBELWEAR"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="py-24 bg-white">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {featuredProducts.map((product, index) => (
              <ProductCard key={index} {...product} delay={index * 100} />
            ))}
          </div>
          <div className="text-center">
            <a href="#contact" className="btn-primary">
              Request Custom Quote
            </a>
          </div>
        </div>
      </section>

      {/* Why RebelWear */}
      <section id="why" className="py-24 bg-primary text-white">
        <div className="container">
          <h2 className="section-title text-white">Why RebelWear Stands Apart</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '🎨',
                title: 'Custom Designs',
                description:
                  'Turn your vision into reality with unlimited customization options. We bring your ideas to life.',
              },
              {
                icon: '⭐',
                title: 'Premium Fabrics',
                description:
                  'Only the finest materials make the cut. Durability, comfort, and quality in every thread.',
              },
              {
                icon: '🌍',
                title: 'Worldwide Shipping',
                description:
                  'We deliver anywhere in the world. Fast, secure, and reliable shipping to your doorstep.',
              },
              {
                icon: '💬',
                title: 'Reliable Support',
                description:
                  'Our team is always here to help. From consultation to delivery, we are with you every step.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white/5 p-10 rounded-3xl text-center border border-white/10 transition-all duration-300 hover:bg-white/10 hover:-translate-y-2"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl mb-4 font-bold">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-24 bg-bg-light">
        <div className="container">
          <h2 className="section-title">What Our Customers Say</h2>
          <div
            ref={reviewsRef}
            className="overflow-x-auto overflow-y-hidden py-5 -mx-5 cursor-grab active:cursor-grabbing scroll-smooth"
            style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
          >
            <div className="flex gap-8 px-5" style={{ width: 'max-content' }}>
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-white p-10 rounded-3xl shadow-lg flex-shrink-0 w-[350px] max-w-[350px] scroll-snap-align-start transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="text-secondary text-2xl mb-6">★★★★★</div>
                  <p className="italic text-text-light mb-6 leading-relaxed">{review.text}</p>
                  <div>
                    <strong className="block text-text-dark mb-1">{review.author}</strong>
                    <span className="text-text-light text-sm">{review.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-24 bg-white">
        <div className="container">
          <h2 className="section-title">Our Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '👥',
                number: '50+',
                text: 'Happy Customers',
                description: 'Customers trust us worldwide for their apparel needs',
              },
              {
                icon: '🌍',
                number: '10+',
                text: 'Countries Served',
                description: 'Delivering quality across the globe',
              },
              {
                icon: '⭐',
                number: '100%',
                text: 'Satisfaction Rate',
                description: 'Commitment to excellence in every order',
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-bg-light p-12 rounded-3xl shadow-lg text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border-2 border-transparent hover:border-secondary"
              >
                <div className="text-6xl mb-4">{stat.icon}</div>
                <h3 className="text-5xl font-black text-black mb-2">{stat.number}</h3>
                <p className="text-2xl font-bold text-text-dark mb-4 uppercase tracking-wide">
                  {stat.text}
                </p>
                <p className="text-text-light italic leading-relaxed">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-3xl font-bold mb-4 text-text-dark">Start Your Custom Order</h3>
              <p className="text-text-light mb-8 leading-relaxed">
                Ready to bring your vision to life? Contact us for custom designs, bulk orders, or
                inquiries.
              </p>
              <div className="flex flex-col gap-6">
                <div className="bg-bg-light p-6 rounded-2xl">
                  <strong className="block mb-2 text-text-dark">Email:</strong>
                  <a
                    href="mailto:rebelwear40@gmail.com"
                    className="text-secondary hover:underline transition-colors"
                  >
                    rebelwear40@gmail.com
                  </a>
                </div>
                <div className="bg-bg-light p-6 rounded-2xl">
                  <strong className="block mb-2 text-text-dark">Phone:</strong>
                  <a
                    href="tel:+923313337574"
                    className="text-secondary hover:underline transition-colors"
                  >
                    +92 3313337574
                  </a>
                </div>
                <div className="bg-bg-light p-6 rounded-2xl">
                  <strong className="block mb-2 text-text-dark">Response Time:</strong>
                  <span className="text-text-light">24-48 working hours</span>
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

