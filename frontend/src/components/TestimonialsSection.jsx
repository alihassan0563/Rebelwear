import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reviewsData = [
  {
    stars: "★★★★★",
    text: '"Exceptional quality and service! REBELWEAR brought our team\'s vision to life with custom uniforms that exceeded expectations."',
    author: "Sarah Chen",
    location: "Basketball Team, USA",
  },
  {
    stars: "★★★★★",
    text: '"The premium fabrics and attention to detail are unmatched. Our streetwear collection is absolutely stunning!"',
    author: "Marcus Williams",
    location: "Clothing Brand, UK",
  },
  {
    stars: "★★★★★",
    text: '"Fast worldwide shipping and incredible customer support. REBELWEAR is our go-to supplier for quality apparel."',
    author: "Liam Rodriguez",
    location: "Sports Club, Canada",
  },
  {
    stars: "★★★★★",
    text: '"Outstanding custom designs! They perfectly captured our brand aesthetic and delivered on time. Highly recommended!"',
    author: "Emma Thompson",
    location: "Fashion Brand, Australia",
  },
  {
    stars: "★★★★★",
    text: '"The quality of materials is top-notch. Our team uniforms look professional and have lasted through multiple seasons."',
    author: "James Wilson",
    location: "Soccer Team, Germany",
  },
  {
    stars: "★★★★★",
    text: '"From consultation to delivery, the experience was smooth. The custom designs exceeded our expectations."',
    author: "Sophie Martinez",
    location: "Streetwear Brand, Spain",
  },
  {
    stars: "★★★★★",
    text: '"Best apparel supplier we\'ve worked with! Great prices, excellent quality, and responsive communication."',
    author: "David Kim",
    location: "Sports Organization, Japan",
  },
  {
    stars: "★★★★★",
    text: '"REBELWEAR brings creativity and professionalism together. Our streetwear line has never looked better!"',
    author: "Amanda Lopez",
    location: "Fashion Boutique, Mexico",
  },
];

const TestimonialsSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const underlineRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const slider = sliderRef.current;
    if (!section) return;

    // Use GSAP context for automatic and safe scoping/cleanup
    const ctx = gsap.context(() => {
      // Respect prefers-reduced-motion accessibility preference
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const cards = gsap.utils.toArray(".testimonial-card", section);

      if (!prefersReducedMotion) {
        // =========================================================================
        // A. Section Entrance Master Timeline (Triggered once with ScrollTrigger)
        // =========================================================================
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true,
          },
        });

        // 1. Heading Fade-in + Upward Movement
        tl.from(headingRef.current, {
          y: 28,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
        })
          // 2. Orange Underline Scale/Width Expansion
          .from(
            underlineRef.current,
            {
              scaleX: 0,
              duration: 0.65,
              ease: "power3.out",
            },
            "-=0.4"
          );

        // 3. Sequential Staggered Entrance for Cards & Inner Details
        cards.forEach((card, index) => {
          const cardStartTime = 0.35 + index * 0.12;
          const stars = card.querySelectorAll(".star-icon");
          const quote = card.querySelector(".testimonial-quote");
          const author = card.querySelector(".testimonial-author");

          // B. Card Entrance: Opacity, Y, and Subtle Scale
          tl.from(
            card,
            {
              y: 35,
              opacity: 0,
              scale: 0.96,
              duration: 0.65,
              ease: "power2.out",
            },
            cardStartTime
          );

          // C. Star Rating Animation: Gentle scale & staggered pop-in
          tl.from(
            stars,
            {
              scale: 0.3,
              opacity: 0,
              duration: 0.28,
              ease: "back.out(1.5)",
              stagger: 0.03,
            },
            cardStartTime + 0.18
          );

          // D. Testimonial Quote: Smooth fade-in and upward slide
          tl.from(
            quote,
            {
              y: 12,
              opacity: 0,
              duration: 0.4,
              ease: "power2.out",
            },
            cardStartTime + 0.25
          );

          // D. Customer Author Details: Small delay after the quote
          tl.from(
            author,
            {
              y: 10,
              opacity: 0,
              duration: 0.35,
              ease: "power2.out",
            },
            cardStartTime + 0.35
          );
        });
      }

      // =========================================================================
      // E. GSAP Hover Interactions on Cards (Smooth Lift & Shadow Enhancement)
      // =========================================================================
      cards.forEach((card) => {
        const handleMouseEnter = () => {
          gsap.to(card, {
            y: -8,
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.12), 0 8px 10px -6px rgba(0, 0, 0, 0.06)",
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        const handleMouseLeave = () => {
          gsap.to(card, {
            y: 0,
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.05)",
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        card.addEventListener("mouseenter", handleMouseEnter);
        card.addEventListener("mouseleave", handleMouseLeave);
      });
    }, section);

    // =========================================================================
    // Slider Drag-to-Scroll Support for Carousel
    // =========================================================================
    if (slider) {
      let isDown = false;
      let startX = 0;
      let scrollLeftPos = 0;

      const handleMouseDown = (e) => {
        isDown = true;
        slider.classList.add("cursor-grabbing");
        slider.classList.remove("cursor-grab");
        startX = e.pageX - slider.offsetLeft;
        scrollLeftPos = slider.scrollLeft;
      };

      const handleMouseLeaveSlider = () => {
        isDown = false;
        slider.classList.remove("cursor-grabbing");
        slider.classList.add("cursor-grab");
      };

      const handleMouseUp = () => {
        isDown = false;
        slider.classList.remove("cursor-grabbing");
        slider.classList.add("cursor-grab");
      };

      const handleMouseMove = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.4;
        slider.scrollLeft = scrollLeftPos - walk;
      };

      slider.addEventListener("mousedown", handleMouseDown);
      slider.addEventListener("mouseleave", handleMouseLeaveSlider);
      slider.addEventListener("mouseup", handleMouseUp);
      slider.addEventListener("mousemove", handleMouseMove);

      return () => {
        slider.removeEventListener("mousedown", handleMouseDown);
        slider.removeEventListener("mouseleave", handleMouseLeaveSlider);
        slider.removeEventListener("mouseup", handleMouseUp);
        slider.removeEventListener("mousemove", handleMouseMove);
        ctx.revert();
      };
    }

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="reviews" className="py-24 bg-bg-light overflow-hidden">
      <div className="container">
        {/* Section Heading & Animated Orange Underline */}
        <div className="text-center mb-12">
          <h2
            ref={headingRef}
            className="text-4xl sm:text-5xl font-black text-text-dark text-center inline-block"
          >
            What Our Customers Say
          </h2>
          <span
            ref={underlineRef}
            className="block w-20 h-1 bg-secondary mx-auto mt-3 rounded-full origin-center"
          />
        </div>

        {/* Carousel / Horizontal Cards Slider */}
        <div
          ref={sliderRef}
          className="overflow-x-auto overflow-y-hidden py-5 -mx-5 cursor-grab scroll-smooth select-none"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <div className="flex gap-8 px-5" style={{ width: "max-content" }}>
            {reviewsData.map((review, index) => (
              <div
                key={index}
                className="testimonial-card bg-white p-10 rounded-3xl shadow-lg flex-shrink-0 w-[350px] max-w-[350px] scroll-snap-align-start select-none"
                style={{ willChange: "transform, opacity, box-shadow" }}
              >
                {/* 5 Orange Stars with Individual GSAP Reveal */}
                <div className="stars-wrapper text-secondary text-2xl mb-6 flex gap-1 items-center">
                  {Array.from({ length: 5 }).map((_, starIdx) => (
                    <span
                      key={starIdx}
                      className="star-icon inline-block origin-center"
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* Testimonial Quote */}
                <p className="testimonial-quote italic text-text-light mb-6 leading-relaxed">
                  {review.text}
                </p>

                {/* Author Name and Company/Location Details */}
                <div className="testimonial-author">
                  <strong className="block text-text-dark mb-1">
                    {review.author}
                  </strong>
                  <span className="text-text-light text-sm">
                    {review.location}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
