import { useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import ContactForm from "../components/ContactForm";
import PinnedHeroSection from "../components/PinnedHeroSection";
import TestimonialsSection from "../components/TestimonialsSection";
import { cld } from "../utils/cloudinary";

const Home = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);

    // Smooth scroll for anchor links
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === "#collections") {
        window.dispatchEvent(
          new CustomEvent("rebelwear-scroll-panel", { detail: { panelIndex: 1 } })
        );
        return;
      }
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Featured products data
  const featuredProducts = [
    {
      title: "Hoodie",
      category: "Streetwear",
      description: "Premium cotton blend with custom graphics",
      images: ["https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105223/rebelwear/streetwear-images/h12.jpg"],
      badge: "New",
      link: "/hoodies",
    },
    {
      title: "Custom Uniforms",
      category: "Team Uniforms",
      description: "Born for Motion. Built for Rebels",
      images: ["https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105304/rebelwear/streetwear-images/sportswear-images/basketball-kit3.jpg"],
      badge: "Popular",
      link: "/uniforms",
    },
    {
      title: "Street Tees",
      category: "Streetwear",
      description: "Bold graphics, premium fabric",
      images: ["https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105265/rebelwear/streetwear-images/sh1.jpg"],
      badge: "Hot",
      link: "/tshirts",
    },
    {
      title: "Tracksuits",
      category: "Streetwear",
      description: "Built for the streets. Born to stand out.",
      images: ["https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105227/rebelwear/streetwear-images/hoodie1.avif"],
      link: "/tracksuits",
    },
  ];

  const maincards = [
    {
      link: "/streetwear",
      image: "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105377/rebelwear/streetwear.avif",
      title: "Streetwear Collection",
      desc: "Bold designs that break the mold. Premium fabrics meet urban aesthetics.",
    },
    {
      link: "/uniforms",
      image: "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105169/rebelwear/sports-1.avif",
      title: "Team Uniforms",
      desc: "Custom sportswear for teams. Durability meets style for champions.",
    },
  ];

  return (
    <div>
      {/* Pinned Hero & Collections Multi-Panel ScrollTrigger Section */}
      <PinnedHeroSection />

      {/* About Section */}
      <section id="about" className="py-24 bg-bg-light">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="section-title text-left mb-6">Our Journey</h2>
              <h3 className="text-3xl mb-6 text-secondary">
                Born from Rebellion, Built with Passion
              </h3>
              <p className="text-lg text-text-light mb-6 leading-relaxed">
                REBELWEAR was founded on a simple belief: every individual
                deserves apparel that expresses their authentic self. We started
                as a small custom manufacturer with a vision to create
                streetwear and sportswear that doesn't just fit—it defines.
              </p>
              <p className="text-lg text-text-light leading-relaxed">
                Today, we're a trusted supplier for international customers,
                delivering premium quality garments that blend cutting-edge
                design with unmatched craftsmanship. From custom streetwear to
                team uniforms, we bring your vision to life with precision and
                care.
              </p>
            </div>
            <div className="h-[500px] rounded-3xl overflow-hidden">
              <img
                src={cld("https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105167/rebelwear/rebelwear.jpg", 800)}
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
          <h2 className="section-title text-white">
            Why RebelWear Stands Apart
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🎨",
                title: "Custom Designs",
                description:
                  "Turn your vision into reality with unlimited customization options. We bring your ideas to life.",
              },
              {
                icon: "⭐",
                title: "Premium Fabrics",
                description:
                  "Only the finest materials make the cut. Durability, comfort, and quality in every thread.",
              },
              {
                icon: "🌍",
                title: "Worldwide Shipping",
                description:
                  "We deliver anywhere in the world. Fast, secure, and reliable shipping to your doorstep.",
              },
              {
                icon: "💬",
                title: "Reliable Support",
                description:
                  "Our team is always here to help. From consultation to delivery, we are with you every step.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white/5 p-10 rounded-3xl text-center border border-white/10 transition-all duration-300 hover:bg-white/10 hover:-translate-y-2"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl mb-4 font-bold">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section with GSAP Animations */}
      <TestimonialsSection />

      {/* Stats Section */}
      <section id="stats" className="py-24 bg-white">
        <div className="container">
          <h2 className="section-title">Our Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "👥",
                number: "50+",
                text: "Happy Customers",
                description:
                  "Customers trust us worldwide for their apparel needs",
              },
              {
                icon: "🌍",
                number: "10+",
                text: "Countries Served",
                description: "Delivering quality across the globe",
              },
              {
                icon: "⭐",
                number: "100%",
                text: "Satisfaction Rate",
                description: "Commitment to excellence in every order",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-bg-light p-12 rounded-3xl shadow-lg text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border-2 border-transparent hover:border-secondary"
              >
                <div className="text-6xl mb-4">{stat.icon}</div>
                <h3 className="text-5xl font-black text-black mb-2">
                  {stat.number}
                </h3>
                <p className="text-2xl font-bold text-text-dark mb-4 uppercase tracking-wide">
                  {stat.text}
                </p>
                <p className="text-text-light italic leading-relaxed">
                  {stat.description}
                </p>
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
              <h3 className="text-3xl font-bold mb-4 text-text-dark">
                Start Your Custom Order
              </h3>
              <p className="text-text-light mb-8 leading-relaxed">
                Ready to bring your vision to life? Contact us for custom
                designs, bulk orders, or inquiries.
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
                  <strong className="block mb-2 text-text-dark">
                    Response Time:
                  </strong>
                  <span className="text-text-light">24-48 working hours</span>
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
