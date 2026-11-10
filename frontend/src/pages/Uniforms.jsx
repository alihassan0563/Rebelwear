import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { cld } from '../utils/cloudinary'
import SEO from '../components/SEO'

const Uniforms = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const uniformTypes = [
    {
      title: 'Basketball Uniforms',
      description: 'Professional basketball jerseys and shorts designed for peak performance and full court mobility.',
      features: ['Moisture-Wicking Fabric', 'Custom Numbers & Names', 'Sublimated Team Graphics'],
      link: '/basketball-uniforms',
      badge: 'Popular',
      image: 'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105308/rebelwear/streetwear-images/sportswear-images/basketball-uniform-3.jpg',
    },
    {
      title: 'Baseball Uniforms',
      description: 'Classic button-down baseball jerseys and double-knee reinforced pants with team branding.',
      features: ['Breathable Poly Blend', 'Reinforced Sliding Knees', 'Custom Team Crests'],
      link: '/baseball-uniforms',
      badge: 'Best Seller',
      image: 'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105294/rebelwear/streetwear-images/sportswear-images/baseball-uniform-2.jpg',
    },
    {
      title: 'American Football Uniforms',
      description: 'Heavy-duty football jerseys and game pants engineered to withstand gridiron impact.',
      features: ['Heavyweight Spandex-Poly Mesh', 'Reinforced Cowl & Shoulders', 'Custom Roster Sublimation'],
      link: '/football-uniforms',
      badge: 'New',
      image: 'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105274/rebelwear/streetwear-images/sportswear-images/american-football-uniform-7.jpg',
    },
    {
      title: 'Soccer Uniforms',
      description: 'Aerodynamic soccer jerseys and athletic shorts built for speed, agility, and ventilation.',
      features: ['Micro-Ventilation Panels', 'Anti-Odor Technology', 'Sublimated Sponsor Badges'],
      link: '/soccer-uniforms',
      image: 'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105321/rebelwear/streetwear-images/sportswear-images/soccer-jersey-8.jpg',
    },
    {
      title: 'Hockey Uniforms',
      description: 'Pro-weight hockey jerseys with reinforced elbows and breathable fighting-strap construction.',
      features: ['Pro-Weight Polyester', 'Double Reinforced Elbows', 'Bespoke Crest Embroidery'],
      link: '/hockey-uniforms',
      image: 'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105169/rebelwear/sports-1.avif',
    },
    {
      title: 'Boxing Uniforms & Gear',
      description: 'Custom satin fight robes, boxing trunks, and corner apparel tailored for championship fighters.',
      features: ['High-Sheen Heavy Satin', 'Elastic Wide Waistbands', 'Custom Fight Name Embroidery'],
      link: '/boxing-uniforms',
      image: 'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105167/rebelwear/rebelwear.jpg',
    },
    {
      title: 'Uniform Accessories',
      description: 'Complete your team setup with sports beanies, compression sleeves, socks, and duffels.',
      features: ['Team Essentials', 'Color-Matched Branding', 'Professional Durability'],
      link: '/uniform-accessories',
      image: 'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105330/rebelwear/streetwear-images/sportswear-images/sport-accessory.webp',
    },
  ]

  const uniformsSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://rebelwearstore.netlify.app/uniforms#breadcrumb',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': 'https://rebelwearstore.netlify.app'
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Team Uniforms',
            'item': 'https://rebelwearstore.netlify.app/uniforms'
          }
        ]
      },
      {
        '@type': 'CollectionPage',
        '@id': 'https://rebelwearstore.netlify.app/uniforms#collection',
        'name': 'Custom Team Uniforms & Sportswear Manufacturer | REBELWEAR',
        'description': 'Manufacturer of custom team uniforms for basketball, baseball, football, soccer, hockey, and combat sports. Factory direct sublimation and embroidery.',
        'url': 'https://rebelwearstore.netlify.app/uniforms',
        'mainEntity': {
          '@type': 'ItemList',
          'itemListElement': uniformTypes.map((uniform, idx) => ({
            '@type': 'ListItem',
            'position': idx + 1,
            'name': uniform.title,
            'url': `https://rebelwearstore.netlify.app${uniform.link}`
          }))
        }
      }
    ]
  }

  return (
    <div>
      <SEO
        title="Custom Team Uniforms & Sportswear Manufacturer | REBELWEAR"
        description="High-performance custom team sports uniforms for basketball, baseball, football, soccer, hockey, and boxing. All-over sublimation, pro-fit fabrics, and fast international delivery."
        keywords="custom team uniforms, custom sportswear manufacturer, sublimated jerseys, custom basketball uniforms, baseball jerseys wholesale, soccer kits"
        canonical="https://rebelwearstore.netlify.app/uniforms"
        schema={uniformsSchema}
      />

      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-black/85 to-gray-900/90"></div>
        <div className="container relative z-10 text-center max-w-4xl px-5">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 border border-secondary/40 text-secondary text-xs sm:text-sm font-bold uppercase tracking-widest mb-4">
            Athletic Team Apparel Atelier
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black mb-6 tracking-wider uppercase bg-gradient-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent">
            TEAM UNIFORMS
          </h1>
          <p className="text-xl sm:text-2xl font-light mb-4 text-gray-300">Durability Meets Championship Style</p>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Custom sportswear engineered to elevate your team's athletic performance and presence. Professional
            fabrics, fade-proof sublimation printing, and unmatched durability on any court, field, or pitch.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-title">Explore Team Uniform Sports</h2>
            <p className="text-neutral-600 text-lg">
              Factory-direct team sportswear tailored for schools, amateur leagues, semi-pro clubs, and professional sports academies worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {uniformTypes.map((uniform, index) => (
              <Link
                key={index}
                to={uniform.link}
                className="bg-bg-light rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col group border border-neutral-100"
              >
                <div className="h-80 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
                  {uniform.image ? (
                    <img
                      src={cld(uniform.image, 800)}
                      alt={`${uniform.title} - Custom Team Uniforms REBELWEAR`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : null}
                  {uniform.badge && (
                    <span className="absolute top-4 right-4 bg-secondary text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase z-20 shadow-md">
                      {uniform.badge}
                    </span>
                  )}
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold mb-3 text-neutral-900 group-hover:text-secondary transition-colors">
                    {uniform.title}
                  </h3>
                  <p className="text-text-light mb-6 flex-grow leading-relaxed">{uniform.description}</p>
                  
                  {uniform.features && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {uniform.features.map((feat, fIdx) => (
                        <span key={fIdx} className="text-xs bg-white px-3 py-1 rounded-full text-neutral-600 border border-neutral-200">
                          {feat}
                        </span>
                      ))}
                    </div>
                  )}

                  <span className="text-secondary font-bold group-hover:translate-x-2 inline-flex items-center gap-2 transition-transform text-sm uppercase tracking-wider mt-auto">
                    <span>View Uniform Lineup</span>
                    <span>→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Athletic Performance Value Props */}
          <div className="mt-24 p-8 sm:p-12 rounded-3xl bg-neutral-900 text-white border border-neutral-800">
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-center mb-10">
              Why Teams Choose REBELWEAR Sports Manufacturing
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <h3 className="text-lg font-bold uppercase tracking-wider text-secondary">Anti-Fade Dye Sublimation</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Infused directly into the textile fibers at 400°F so logos, player names, and numbers never peel, crack, or wash away.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-bold uppercase tracking-wider text-secondary">DryTech Moisture Management</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Hydrophilic mesh fabrics that pull sweat away from athlete skin for rapid evaporation during high-intensity competition.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-bold uppercase tracking-wider text-secondary">Fast Turnaround & Reorders</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Digital pattern archives ensure hassle-free uniform reorders whenever you draft new players or need replacement jerseys.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Uniforms
