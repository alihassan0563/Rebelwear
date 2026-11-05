import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cld } from "../utils/cloudinary";

gsap.registerPlugin(ScrollTrigger);

const PinnedHeroSection = () => {
  const containerRef = useRef(null);
  const pinRef = useRef(null);
  const progressBarRef = useRef(null);
  const scrollTriggerInstanceRef = useRef(null);
  const activePanelRef = useRef(0);

  const panel1Ref = useRef(null);
  const panel2Ref = useRef(null);
  const panel3Ref = useRef(null);
  const panel4Ref = useRef(null);

  const panel1ContentRef = useRef(null);
  const panel2ContentRef = useRef(null);
  const panel3ContentRef = useRef(null);
  const panel4ContentRef = useRef(null);

  // Intro entrance element refs
  const heroBadgeRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const heroDescRef = useRef(null);
  const heroSpecsRef = useRef(null);
  const heroCtasRef = useRef(null);
  const heroScrollPromptRef = useRef(null);

  const [activePanel, setActivePanel] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const panels = [
    { id: "hero", label: "Hero", num: "01" },
    { id: "streetwear", label: "Streetwear", num: "02" },
    { id: "uniforms", label: "Team Uniforms", num: "03" },
    { id: "atelier", label: "Custom Atelier", num: "04" },
  ];

  // Preload hero collection showcase images to prevent decoding stutter mid-scroll
  useEffect(() => {
    const preloadUrls = [
      cld(
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105377/rebelwear/streetwear.avif",
        800
      ),
      cld(
        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105304/rebelwear/streetwear-images/sportswear-images/basketball-kit3.jpg",
        800
      ),
    ];
    preloadUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, []);

  // Helper to jump directly to a specific panel on click
  const scrollToPanel = useCallback((index) => {
    const st = scrollTriggerInstanceRef.current;
    if (!st) return;

    // Center progress for each panel's hold plateau:
    // Panel 0 (Hero): 0
    // Panel 1 (Streetwear): 0.34
    // Panel 2 (Uniforms): 0.66
    // Panel 3 (Atelier): 0.96
    const targets = [0, 0.34, 0.66, 0.96];
    const targetProgress = targets[index] !== undefined ? targets[index] : 0;
    const targetScroll = st.start + (st.end - st.start) * targetProgress;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  }, []);

  // Listen for custom navigation event or hash jump
  useEffect(() => {
    const handleCustomNav = (e) => {
      if (e.detail && typeof e.detail.panelIndex === "number") {
        scrollToPanel(e.detail.panelIndex);
      }
    };

    window.addEventListener("rebelwear-scroll-panel", handleCustomNav);
    return () => window.removeEventListener("rebelwear-scroll-panel", handleCustomNav);
  }, [scrollToPanel]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // Check prefers-reduced-motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsReducedMotion(prefersReduced);

    mm.add(
      {
        reduceMotion: "(prefers-reduced-motion: reduce)",
        desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        mobile: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const { reduceMotion, desktop } = context.conditions;

        if (reduceMotion) {
          // In reduced motion mode, we don't pin or scrub.
          // Reset all panels to relative, visible stacked flow.
          gsap.set(
            [panel1Ref.current, panel2Ref.current, panel3Ref.current, panel4Ref.current],
            { clearProps: "all" }
          );
          return;
        }

        // Smooth initial entrance animation for Hero (Panel 1)
        const entranceTl = gsap.timeline({ delay: 0.1 });
        entranceTl
          .fromTo(
            heroBadgeRef.current,
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
          )
          .fromTo(
            heroTitleRef.current,
            { opacity: 0, y: 30, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: "power3.out" },
            "-=0.6"
          )
          .fromTo(
            heroSubtitleRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
            "-=0.6"
          )
          .fromTo(
            [heroDescRef.current, heroSpecsRef.current, heroCtasRef.current],
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
            "-=0.5"
          )
          .fromTo(
            heroScrollPromptRef.current,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
            "-=0.4"
          );

        // Initially position panels 2, 3, 4 below viewport with GPU promotion
        gsap.set(panel1Ref.current, { yPercent: 0, scale: 1, opacity: 1, zIndex: 10, force3D: true });
        gsap.set(panel2Ref.current, { yPercent: 100, scale: 1, opacity: 1, zIndex: 20, force3D: true });
        gsap.set(panel3Ref.current, { yPercent: 100, scale: 1, opacity: 1, zIndex: 30, force3D: true });
        gsap.set(panel4Ref.current, { yPercent: 100, scale: 1, opacity: 1, zIndex: 40, force3D: true });

        // Build the scroll-driven master timeline
        // 320% on desktop gives comfortable reading distance per panel without feeling dragged out
        const scrollDistance = desktop ? "320%" : "260%";

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinRef.current,
            start: "top top",
            end: `+=${scrollDistance}`,
            pin: true,
            pinSpacing: true,
            scrub: 1.0, // Silky smooth damping without jerky snap conflicts
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              // Direct GPU compositor transform update for progress bar — ZERO React re-renders!
              if (progressBarRef.current) {
                progressBarRef.current.style.transform = `scaleX(${self.progress})`;
              }

              // Only trigger React state update when activePanel index actually changes
              const p = self.progress;
              let newPanel = 0;
              if (p >= 0.80) {
                newPanel = 3;
              } else if (p >= 0.48) {
                newPanel = 2;
              } else if (p >= 0.18) {
                newPanel = 1;
              } else {
                newPanel = 0;
              }

              if (activePanelRef.current !== newPanel) {
                activePanelRef.current = newPanel;
                setActivePanel(newPanel);
              }
            },
          },
        });

        scrollTriggerInstanceRef.current = tl.scrollTrigger;

        // Total timeline duration: 6.0 units
        // Time 0.0 - 0.5: Step 1 (Hero) hold
        // Time 0.5 - 1.7: Transition 1 -> 2 (Hero to Streetwear)
        // Time 1.7 - 2.4: Step 2 (Streetwear) hold
        // Time 2.4 - 3.6: Transition 2 -> 3 (Streetwear to Uniforms)
        // Time 3.6 - 4.3: Step 3 (Uniforms) hold
        // Time 4.3 - 5.5: Transition 3 -> 4 (Uniforms to Atelier)
        // Time 5.5 - 6.0: Step 4 (Atelier) hold

        // ==========================================
        // Transition 1 -> 2 (Hero to Streetwear)
        // ==========================================
        tl.to(
          panel2Ref.current,
          {
            yPercent: 0,
            ease: "power1.inOut",
            duration: 1.2,
            force3D: true,
          },
          0.5
        )
          .to(
            panel1ContentRef.current,
            {
              yPercent: -12,
              opacity: 0,
              scale: 0.94,
              ease: "power1.inOut",
              duration: 1.0,
              force3D: true,
            },
            0.5
          )
          .fromTo(
            panel2ContentRef.current,
            { y: 35, opacity: 0.2 },
            { y: 0, opacity: 1, ease: "power1.out", duration: 0.8, force3D: true },
            0.8
          );

        // ==========================================
        // Transition 2 -> 3 (Streetwear to Uniforms)
        // ==========================================
        tl.to(
          panel3Ref.current,
          {
            yPercent: 0,
            ease: "power1.inOut",
            duration: 1.2,
            force3D: true,
          },
          2.4
        )
          .to(
            panel2ContentRef.current,
            {
              yPercent: -12,
              opacity: 0,
              scale: 0.94,
              ease: "power1.inOut",
              duration: 1.0,
              force3D: true,
            },
            2.4
          )
          .fromTo(
            panel3ContentRef.current,
            { y: 35, opacity: 0.2 },
            { y: 0, opacity: 1, ease: "power1.out", duration: 0.8, force3D: true },
            2.7
          );

        // ==========================================
        // Transition 3 -> 4 (Uniforms to Atelier / Hub)
        // ==========================================
        tl.to(
          panel4Ref.current,
          {
            yPercent: 0,
            ease: "power1.inOut",
            duration: 1.2,
            force3D: true,
          },
          4.3
        )
          .to(
            panel3ContentRef.current,
            {
              yPercent: -12,
              opacity: 0,
              scale: 0.94,
              ease: "power1.inOut",
              duration: 1.0,
              force3D: true,
            },
            4.3
          )
          .fromTo(
            panel4ContentRef.current,
            { y: 35, opacity: 0.2 },
            { y: 0, opacity: 1, ease: "power1.out", duration: 0.8, force3D: true },
            4.6
          );

        // Anchor end of timeline at 6.0 with comfortable hold for Panel 4 before smooth unpinning
        tl.to({}, { duration: 0.5 }, 5.5);
      }
    );

    // Refresh ScrollTrigger after assets settle
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(refreshTimer);
      mm.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-black text-white" id="home">
      {/* Anchor helper for #collections so clicking collections in navbar can target the collection panels */}
      <div id="collections" className="absolute top-0 pointer-events-none opacity-0" aria-hidden="true" />

      {/* Main Pinned Viewport Container */}
      <div
        ref={pinRef}
        className={`relative w-full ${
          isReducedMotion ? "min-h-screen" : "h-screen h-[100svh]"
        } overflow-hidden bg-black select-none`}
      >
        {/* Top Scroll Progress Indicator (GPU Transform Scaled) */}
        {!isReducedMotion && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-50 pointer-events-none">
            <div
              ref={progressBarRef}
              className="h-full w-full bg-gradient-to-r from-secondary via-orange-500 to-amber-400 origin-left will-change-transform"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        )}

        {/* Floating Side Panel Navigation Dots (Desktop) */}
        {!isReducedMotion && (
          <nav
            aria-label="Hero Panel Navigation"
            className="absolute right-5 lg:right-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-end gap-5 bg-black/40 backdrop-blur-md px-3 py-4 rounded-full border border-white/10"
          >
            {panels.map((panel, idx) => {
              const isActive = activePanel === idx;
              return (
                <button
                  key={panel.id}
                  onClick={() => scrollToPanel(idx)}
                  className="group flex items-center gap-3 bg-transparent border-none cursor-pointer outline-none transition-all duration-300"
                  aria-label={`Jump to ${panel.label}`}
                >
                  <span
                    className={`text-xs font-mono font-bold transition-all duration-300 ${
                      isActive
                        ? "text-secondary opacity-100 translate-x-0"
                        : "text-gray-400 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0"
                    }`}
                  >
                    {panel.num} {panel.label}
                  </span>
                  <div
                    className={`rounded-full transition-all duration-300 ${
                      isActive
                        ? "w-3 h-8 bg-secondary shadow-lg shadow-secondary/50"
                        : "w-2.5 h-2.5 bg-white/30 group-hover:bg-white group-hover:scale-125"
                    }`}
                  />
                </button>
              );
            })}
          </nav>
        )}

        {/* Mobile Active Panel Pill Indicator */}
        {!isReducedMotion && (
          <div className="md:hidden absolute top-20 right-4 z-40 bg-black/70 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-xs font-mono text-gray-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span>
              {panels[activePanel]?.num} / 04 • {panels[activePanel]?.label}
            </span>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PANEL 1: HERO ORIGIN & BRAND MANIFESTO */}
        {/* ========================================================================= */}
        <section
          ref={panel1Ref}
          aria-label="Brand Overview"
          className={`panel absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-950 via-zinc-900 to-black overflow-hidden will-change-transform transform-gpu ${
            isReducedMotion ? "!relative min-h-screen" : ""
          }`}
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          {/* Subtle Ambient Glowing Background Orb */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/15 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

          <div
            ref={panel1ContentRef}
            className="container relative z-10 text-center max-w-5xl px-6 pt-16 pb-12 flex flex-col items-center justify-center will-change-transform"
          >
            {/* Top pill badge */}
            <div
              ref={heroBadgeRef}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-secondary text-xs sm:text-sm font-semibold tracking-wider uppercase mb-6 shadow-inner"
            >
              <span className="w-2 h-2 rounded-full bg-secondary animate-ping" />
              <span>DROP 2026 // STREETWEAR & ATHLETIC ATELIER</span>
            </div>

            {/* Giant Title */}
            <h1
              ref={heroTitleRef}
              className="text-4xl sm:text-5xl lg:text-8xl mt-10 font-black tracking-tight uppercase leading-none mb-3 bg-gradient-to-b from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent"
            >
              REBEL<span className="text-secondary">WEAR</span>
            </h1>

            <h2
              ref={heroSubtitleRef}
              className="text-2xl sm:text-4xl md:text-5xl font-black tracking-widest uppercase mb-6 text-white drop-shadow-md"
            >
              DARE TO BE DIFFERENT
            </h2>

            <p
              ref={heroDescRef}
              className="text-base sm:text-xl md:text-2xl font-light mb-6 text-neutral-300 max-w-3xl leading-relaxed"
            >
              Premium Heavyweight Streetwear & Championship Team Uniforms.
            </p>

            <p className="text-sm sm:text-base md:text-lg mb-8 text-neutral-400 max-w-2xl leading-relaxed">
              We craft authentic street essentials and elite custom sportswear that embody
              your rebellious spirit. From one-off custom kits to global bulk production.
            </p>

            {/* Spec Highlights */}
            <div
              ref={heroSpecsRef}
              className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10 text-xs sm:text-sm text-neutral-300 font-mono"
            >
              <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10">
                ✦ 420+ GSM Heavyweight Cotton
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10">
                ✦ Moisture-Wicking Aero-Dri Tech
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10">
                ✦ Worldwide Express Shipping
              </span>
            </div>

            {/* Action Buttons */}
            <div ref={heroCtasRef} className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => scrollToPanel(1)}
                className="btn-primary flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Collections</span>
                <span>↓</span>
              </button>
              <a href="#contact" className="btn-secondary">
                Request Custom Quote
              </a>
            </div>

            {/* Scroll Down Prompt Indicator */}
            {!isReducedMotion && (
              <div
                ref={heroScrollPromptRef}
                onClick={() => scrollToPanel(1)}
                className="mt-10 sm:mt-12 flex flex-col items-center gap-2 cursor-pointer text-neutral-400 hover:text-white transition-colors group"
              >
                <span className="text-xs font-mono tracking-widest uppercase text-neutral-400 group-hover:text-secondary transition-colors">
                  Scroll to explore collections
                </span>
                <div className="w-5 h-9 rounded-full border-2 border-white/30 flex items-start justify-center p-1 group-hover:border-secondary transition-colors">
                  <div className="w-1.5 h-2 bg-secondary rounded-full animate-bounce" />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PANEL 2: COLLECTION 01 - STREETWEAR CULTURE */}
        {/* ========================================================================= */}
        <section
          ref={panel2Ref}
          aria-label="Streetwear Collection"
          className={`panel absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-950 via-zinc-950 to-neutral-900 border-t border-white/15 overflow-hidden will-change-transform transform-gpu ${
            isReducedMotion ? "!relative min-h-screen border-none" : ""
          }`}
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[140px] pointer-events-none" />

          <div
            ref={panel2ContentRef}
            className="container relative z-10 max-w-6xl px-6 py-12 pt-16 flex flex-col justify-center h-full will-change-transform"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Copy & Details */}
              <div className="lg:col-span-7 flex flex-col items-start text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-xs sm:text-sm font-mono tracking-wider uppercase mb-4">
                  <span>COLLECTION 01</span>
                  <span>//</span>
                  <span>STREETWEAR CULTURE</span>
                </div>

                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-4 text-white leading-tight">
                  URBAN EDGES. <br />
                  <span className="bg-gradient-to-r from-secondary via-orange-400 to-amber-300 bg-clip-text text-transparent">
                    RAW ATTITUDE.
                  </span>
                </h2>

                <p className="text-sm sm:text-base lg:text-lg text-neutral-300 mb-6 leading-relaxed">
                  Engineered for the streets. Heavyweight drop-shoulder hoodies, vintage-washed
                  oversized tees, technical tracksuits, and structured outerwear designed to break
                  mold and establish dominance.
                </p>

                {/* Streetwear Feature Highlights */}
                <div className="space-y-2.5 mb-6 text-xs sm:text-sm text-neutral-300">
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-secondary/20 text-secondary flex items-center justify-center font-bold text-xs flex-shrink-0">
                      ✓
                    </span>
                    <span>400–480 GSM Heavyweight French Terry & 100% Combed Cotton</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-secondary/20 text-secondary flex items-center justify-center font-bold text-xs flex-shrink-0">
                      ✓
                    </span>
                    <span>High-Density Puff Prints, Precision Embroidery & Acid Washes</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-secondary/20 text-secondary flex items-center justify-center font-bold text-xs flex-shrink-0">
                      ✓
                    </span>
                    <span>Modern Boxy, Relaxed, and Drop-Shoulder Tailored Cuts</span>
                  </div>
                </div>

                {/* Category Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {[
                    { name: "Hoodies", path: "/hoodies" },
                    { name: "T-Shirts", path: "/tshirts" },
                    { name: "Tracksuits", path: "/tracksuits" },
                    { name: "Jackets", path: "/jackets" },
                    { name: "Sweatshirts", path: "/sweatshirts" },
                  ].map((cat) => (
                    <Link
                      key={cat.name}
                      to={cat.path}
                      className="px-3 py-1 text-xs font-medium rounded-lg bg-white/5 border border-white/10 hover:border-secondary hover:text-secondary transition-all"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-4 items-center">
                  <Link to="/streetwear" className="btn-primary">
                    Explore Streetwear →
                  </Link>
                  <button
                    onClick={() => scrollToPanel(2)}
                    className="px-6 py-4 rounded-full bg-white/5 border border-white/10 text-white font-semibold uppercase tracking-wider text-sm hover:bg-white/10 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Next: Team Uniforms</span>
                    <span>↓</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Visual Showcase Card */}
              <div className="lg:col-span-5 relative group">
                <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-neutral-900 shadow-2xl transition-all duration-500 group-hover:border-secondary/40">
                  <div className="h-64 sm:h-80 lg:h-[420px] w-full relative overflow-hidden bg-gradient-to-br from-neutral-800 to-black">
                    <img
                      src={cld(
                        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105377/rebelwear/streetwear.avif",
                        800
                      )}
                      alt="REBELWEAR Streetwear Collection"
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      loading="eager"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                    {/* Floating pill badge */}
                    <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 text-xs font-mono text-secondary">
                      ★ 420 GSM STREET HEAVYWEIGHT
                    </div>

                    {/* Bottom floating details */}
                    <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex justify-between items-center">
                      <div>
                        <p className="text-xs font-mono text-neutral-400 uppercase">Featured Silhouette</p>
                        <h4 className="text-base font-bold text-white">Boxy Distressed Hoodie</h4>
                      </div>
                      <Link
                        to="/hoodies"
                        className="px-3.5 py-1.5 rounded-full bg-secondary text-white text-xs font-bold hover:scale-105 transition-transform"
                      >
                        View Drop
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PANEL 3: COLLECTION 02 - PRO SPORTS UNIFORMS */}
        {/* ========================================================================= */}
        <section
          ref={panel3Ref}
          aria-label="Sports Uniforms Collection"
          className={`panel absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-950 via-neutral-900 to-black border-t border-white/15 overflow-hidden will-change-transform transform-gpu ${
            isReducedMotion ? "!relative min-h-screen border-none" : ""
          }`}
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

          <div
            ref={panel3ContentRef}
            className="container relative z-10 max-w-6xl px-6 py-12 pt-16 flex flex-col justify-center h-full will-change-transform"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Visual Showcase Card */}
              <div className="order-2 lg:order-1 lg:col-span-5 relative group">
                <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-neutral-900 shadow-2xl transition-all duration-500 group-hover:border-secondary/40">
                  <div className="h-64 sm:h-80 lg:h-[420px] w-full relative overflow-hidden bg-gradient-to-br from-neutral-800 to-black">
                    <img
                      src={cld(
                        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105304/rebelwear/streetwear-images/sportswear-images/basketball-kit3.jpg",
                        800
                      )}
                      alt="REBELWEAR Sports Uniforms"
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      loading="eager"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                    {/* Floating pill badge */}
                    <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 text-xs font-mono text-secondary">
                      ⚡ PRO CLUB SPECIFICATION
                    </div>

                    {/* Bottom floating details */}
                    <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex justify-between items-center">
                      <div>
                        <p className="text-xs font-mono text-neutral-400 uppercase">Teamwear Category</p>
                        <h4 className="text-base font-bold text-white">Championship Basketball Kit</h4>
                      </div>
                      <Link
                        to="/basketball-uniforms"
                        className="px-3.5 py-1.5 rounded-full bg-secondary text-white text-xs font-bold hover:scale-105 transition-transform"
                      >
                        Explore Kit
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Copy & Details */}
              <div className="order-1 lg:order-2 lg:col-span-7 flex flex-col items-start text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-xs sm:text-sm font-mono tracking-wider uppercase mb-4">
                  <span>COLLECTION 02</span>
                  <span>//</span>
                  <span>PRO ATHLETIC UNIFORMS</span>
                </div>

                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-4 text-white leading-tight">
                  BORN FOR MOTION. <br />
                  <span className="bg-gradient-to-r from-secondary via-orange-400 to-amber-300 bg-clip-text text-transparent">
                    BUILT FOR VICTORY.
                  </span>
                </h2>

                <p className="text-sm sm:text-base lg:text-lg text-neutral-300 mb-6 leading-relaxed">
                  Championship-grade team uniforms engineered for elite athletic performance.
                  Equipping basketball, football, soccer, baseball, and combat clubs worldwide with
                  durable, breathable, and fully custom performance kits.
                </p>

                {/* Uniform Feature Highlights */}
                <div className="space-y-2.5 mb-6 text-xs sm:text-sm text-neutral-300">
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-secondary/20 text-secondary flex items-center justify-center font-bold text-xs flex-shrink-0">
                      ✓
                    </span>
                    <span>Advanced Aero-Dri Moisture-Wicking & Anti-Chafe Mesh Fabric</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-secondary/20 text-secondary flex items-center justify-center font-bold text-xs flex-shrink-0">
                      ✓
                    </span>
                    <span>Full Sublimation, Tackle Twill Numbers & Reinforced Seams</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-secondary/20 text-secondary flex items-center justify-center font-bold text-xs flex-shrink-0">
                      ✓
                    </span>
                    <span>Tailored Team Rosters, Custom Sizing & Fast Sample Prototyping</span>
                  </div>
                </div>

                {/* Sports Category Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {[
                    { name: "Basketball", path: "/basketball-uniforms" },
                    { name: "Soccer", path: "/soccer-uniforms" },
                    { name: "Football", path: "/football-uniforms" },
                    { name: "Baseball", path: "/baseball-uniforms" },
                    { name: "Boxing & Combat", path: "/boxing-uniforms" },
                  ].map((cat) => (
                    <Link
                      key={cat.name}
                      to={cat.path}
                      className="px-3 py-1 text-xs font-medium rounded-lg bg-white/5 border border-white/10 hover:border-secondary hover:text-secondary transition-all"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-4 items-center">
                  <Link to="/uniforms" className="btn-primary">
                    Explore All Uniforms →
                  </Link>
                  <button
                    onClick={() => scrollToPanel(3)}
                    className="px-6 py-4 rounded-full bg-white/5 border border-white/10 text-white font-semibold uppercase tracking-wider text-sm hover:bg-white/10 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Next: Custom Atelier</span>
                    <span>↓</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PANEL 4: THE REBEL ATELIER & COMPLETE CATALOG GATEWAY */}
        {/* ========================================================================= */}
        <section
          ref={panel4Ref}
          aria-label="Custom Atelier & Catalog"
          className={`panel absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-black via-zinc-950 to-neutral-900 border-t border-white/15 overflow-hidden will-change-transform transform-gpu ${
            isReducedMotion ? "!relative min-h-screen border-none" : ""
          }`}
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-secondary/10 rounded-full blur-[160px] pointer-events-none" />

          <div
            ref={panel4ContentRef}
            className="container relative z-10 max-w-6xl px-6 py-10 pt-16 flex flex-col justify-center h-full text-center will-change-transform"
          >
            {/* Header pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-xs sm:text-sm font-mono tracking-wider uppercase mb-3 mx-auto">
              <span>THE REBEL ATELIER</span>
              <span>//</span>
              <span>CUSTOM ORDERS & WORLDWIDE SUPPLY</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white mb-3">
              YOUR BRAND VISION.{" "}
              <span className="bg-gradient-to-r from-secondary to-amber-400 bg-clip-text text-transparent">
                ZERO COMPROMISES.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto mb-8">
              Whether building an independent streetwear label or outfitting a sports federation,
              REBELWEAR delivers premium end-to-end manufacturing with global express delivery.
            </p>

            {/* Dual Collection Portal Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full mb-8 text-left">
              {/* Streetwear Portal Card */}
              <div className="relative group rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md hover:border-secondary/50 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 bg-neutral-800 border border-white/10">
                    <img
                      src={cld(
                        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105377/rebelwear/streetwear.avif",
                        200
                      )}
                      alt="Streetwear Preview"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-secondary transition-colors">
                      Streetwear Collection
                    </h3>
                    <p className="text-xs text-neutral-400">Hoodies • Tees • Joggers • Outerwear</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-neutral-300 mb-5 leading-relaxed">
                  Boxy oversized silhouettes, high-density prints, vintage washes, and luxury
                  cotton. Ready for private label branding.
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <Link
                    to="/streetwear"
                    className="text-secondary font-bold text-sm inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Browse Catalog</span>
                    <span>→</span>
                  </Link>
                  <Link
                    to="/hoodies"
                    className="text-xs text-neutral-400 hover:text-white transition-colors"
                  >
                    View Hoodies
                  </Link>
                </div>
              </div>

              {/* Uniforms Portal Card */}
              <div className="relative group rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md hover:border-secondary/50 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 bg-neutral-800 border border-white/10">
                    <img
                      src={cld(
                        "https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105169/rebelwear/sports-1.avif",
                        200
                      )}
                      alt="Sports Preview"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-secondary transition-colors">
                      Team Uniforms & Kits
                    </h3>
                    <p className="text-xs text-neutral-400">Basketball • Soccer • Football • Combat</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-neutral-300 mb-5 leading-relaxed">
                  High-performance moisture-wicking jerseys, custom team sublimation, numbers,
                  names, and match-ready gear.
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <Link
                    to="/uniforms"
                    className="text-secondary font-bold text-sm inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Browse Catalog</span>
                    <span>→</span>
                  </Link>
                  <Link
                    to="/basketball-uniforms"
                    className="text-xs text-neutral-400 hover:text-white transition-colors"
                  >
                    View Basketball
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom Service Guarantees Bar */}
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-neutral-400 font-mono mb-8 border-t border-white/10 pt-6">
              <span className="flex items-center gap-2">
                <span className="text-secondary">✦</span> Low MOQs (From 20 Pcs)
              </span>
              <span className="flex items-center gap-2">
                <span className="text-secondary">✦</span> Free Digital 3D Mockups
              </span>
              <span className="flex items-center gap-2">
                <span className="text-secondary">✦</span> 24–48h Consultation Turnaround
              </span>
            </div>

            {/* Smooth Unpin & Continue Prompt */}
            {!isReducedMotion && (
              <div className="flex flex-col items-center gap-2 text-neutral-400">
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                  Scroll down for Our Journey, Featured Products & Reviews ↓
                </span>
                <div className="w-1 h-6 bg-gradient-to-b from-secondary to-transparent rounded-full animate-pulse" />
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PinnedHeroSection;
