import { useEffect } from 'react'
import { cld } from '../utils/cloudinary'
import SEO from '../components/SEO'

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  const stats = [
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
    {
      icon: '🎨',
      number: '1000+',
      text: 'Custom Designs',
      description: 'Unique designs created for our clients',
    },
  ]

  const values = [
    {
      icon: '🎨',
      title: 'Custom Designs',
      description:
        'Turn your vision into reality with unlimited customization options. We bring your ideas to life with precision and creativity.',
    },
    {
      icon: '⭐',
      title: 'Premium Quality',
      description:
        'Only the finest materials make the cut. Durability, comfort, and quality in every thread of our garments.',
    },
    {
      icon: '🌍',
      title: 'Worldwide Shipping',
      description:
        'We deliver anywhere in the world. Fast, secure, and reliable shipping to your doorstep, no matter where you are.',
    },
    {
      icon: '💬',
      title: 'Reliable Support',
      description:
        'Our team is always here to help. From consultation to delivery, we are with you every step of the way.',
    },
  ]

  const team = [
    {
      name: 'Alex Johnson',
      role: 'Founder & CEO',
      image: 'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105167/rebelwear/rebelwear.jpg',
      description: 'Visionary leader with 10+ years in fashion industry',
    },
    {
      name: 'Sarah Chen',
      role: 'Creative Director',
      image: 'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105167/rebelwear/rebelwear.jpg',
      description: 'Award-winning designer specializing in streetwear',
    },
    {
      name: 'Marcus Williams',
      role: 'Production Manager',
      image: 'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105167/rebelwear/rebelwear.jpg',
      description: 'Ensuring quality and timely delivery worldwide',
    },
    {
      name: 'Emma Thompson',
      role: 'Customer Relations',
      image: 'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105167/rebelwear/rebelwear.jpg',
      description: 'Dedicated to providing exceptional customer service',
    },
  ]

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": "https://rebelwearstore.netlify.app/about#webpage",
    "url": "https://rebelwearstore.netlify.app/about",
    "name": "About REBELWEAR | Premium Streetwear & Sportswear Manufacturer",
    "description": "Learn about REBELWEAR's story, manufacturing standards, and custom streetwear and athletic uniform production capabilities.",
    "mainEntity": {
      "@type": "Organization",
      "name": "REBELWEAR",
      "url": "https://rebelwearstore.netlify.app",
      "logo": "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105167/rebelwear/rebelwear.jpg"
    }
  };

  return (
    <div>
      <SEO
        title="About REBELWEAR | Premium Streetwear & Sportswear Manufacturer"
        description="Discover REBELWEAR's story, craftsmanship, and manufacturing capabilities. We craft custom streetwear and championship sports team uniforms shipped worldwide."
        keywords="about REBELWEAR, apparel manufacturer, streetwear factory, custom uniform supplier, sportswear production"
        canonical="https://rebelwearstore.netlify.app/about"
        schema={aboutSchema}
      />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-gray-900/90"></div>
        <div className="container relative z-10 text-center max-w-4xl px-5">
          <h1 className="text-3xl md:text-7xl font-bold mb-4 tracking-wider uppercase bg-gradient-to-r from-white to-secondary bg-clip-text text-transparent">
            About REBELWEAR
          </h1>
          <p className="text-xl font-light mb-4 text-gray-300">
            Born from Rebellion, Built with Passion
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            We craft authentic streetwear and team uniforms that embody your rebellious spirit. From
            bespoke prototypes to global bulk apparel manufacturing, we deliver uncompromising quality.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="section-title text-left mb-6">Our Manufacturing Journey</h2>
              <h3 className="text-3xl mb-6 text-secondary font-bold">Born from Rebellion, Built with Passion</h3>
              <p className="text-lg text-text-light mb-6 leading-relaxed">
                REBELWEAR was founded on a simple belief: every individual and athletic club deserves apparel that
                expresses their authentic identity. We started as an agile custom manufacturer with a vision
                to create streetwear and sportswear that doesn't just fit—it defines champions.
              </p>
              <p className="text-lg text-text-light mb-6 leading-relaxed">
                Today, we're a trusted partner for international brands, delivering premium quality
                garments that blend cutting-edge design with unmatched craftsmanship. From heavyweight
                fleece hoodies to sublimated pro jerseys, we bring your vision to life with precision and care.
              </p>
              <p className="text-lg text-text-light leading-relaxed">
                Our commitment to premium fabrics, ethical production, and fast turnaround has made us a leading
                destination in custom apparel manufacturing.
              </p>
            </div>
            <div className="h-[500px] rounded-3xl overflow-hidden shadow-xl">
              <img
                src={cld("https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105167/rebelwear/rebelwear.jpg", 800)}
                alt="REBELWEAR Apparel Production Studio & Craft Workshop"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-24 bg-bg-light">
        <div className="container">
          <h2 className="section-title">Our Achievements</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white p-12 rounded-3xl shadow-lg text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border-2 border-transparent hover:border-secondary"
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

      {/* Our Values Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <h2 className="section-title">Why RebelWear Stands Apart</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-bg-light p-10 rounded-3xl text-center border border-gray-200 transition-all duration-300 hover:bg-white hover:shadow-xl hover:-translate-y-2"
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-2xl mb-4 font-bold">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     

      {/* Mission Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="section-title">Our Mission</h2>
            <p className="text-xl text-text-light leading-relaxed mb-8">
              To empower individuals and teams to express their unique identity through premium quality
              streetwear and sportswear. We believe that what you wear should reflect who you are—bold,
              authentic, and unapologetically yourself.
            </p>
            <p className="text-lg text-text-light leading-relaxed">
              Every garment we create is a statement. Every design tells a story. Every order is a
              commitment to excellence. This is REBELWEAR—where fashion meets rebellion, and quality
              meets passion.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About










