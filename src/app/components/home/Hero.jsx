"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowDown } from "lucide-react";

import {
  SiFrontendmentor,
  SiServerless,
  SiGooglecloud,
  SiOpenai,
} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const expertise = [
  {
    title: "Frontend Engineering",
    icon: SiFrontendmentor,
    description: "Modern UI systems, animations & interactions",
  },
  {
    title: "Backend Architecture",
    icon: SiServerless,
    description: "Node.js, NestJS, FastAPI & scalable APIs",
  },
  {
    title: "Cloud & Infrastructure",
    icon: SiGooglecloud,
    description: "Deployment pipelines, Docker & cloud systems",
  },
  {
    title: "AI Systems",
    icon: SiOpenai,
    description: "LLM integrations, agents & automation",
  },
];

function Expertise({ activeIndex, setActiveIndex }) {
  return (
    <div className="tech-stack relative mt-10 sm:mt-14 px-2">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
        {expertise.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="tech-item opacity-0"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div
                className="group relative overflow-hidden rounded-2xl backdrop-blur-md p-5 h-full transition-all duration-500 hover:-translate-y-1"
                style={{
                  background:
                    activeIndex === index
                      ? "var(--accent-muted)"
                      : "var(--bg-light)",
                  borderColor:
                    activeIndex === index
                      ? "var(--border-medium)"
                      : "var(--border-light)",
                  boxShadow:
                    activeIndex === index
                      ? "var(--shadow-glow)"
                      : "var(--shadow-sm)",
                }}
              >
                {/* Glow effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: "var(--gradient-metal)",
                  }}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110"
                    style={{
                      background: "var(--accent-muted)",
                      border: "1px solid var(--border-light)",
                    }}
                  >
                    <Icon size={24} style={{ color: "var(--accent)" }} />
                  </div>

                  {/* Title */}
                  <h3 className="text-sm sm:text-base font-medium text-primary tracking-wide">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted group-hover:text-secondary transition-colors duration-300">
                    {item.description}
                  </p>

                  {/* Active indicator */}
                  <div
                    className={`mt-4 h-px transition-all duration-500 ${
                      activeIndex === index
                        ? "w-full opacity-100"
                        : "w-0 opacity-0"
                    }`}
                    style={{
                      background: "var(--gradient-accent)",
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const CTA_MAGNETIC_MULTIPLIER = 0.22;
const HERO_LINE_DURATION = 0.7;

function Loader({ onComplete }) {
  const loaderRef = useRef(null);
  const textRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = textRef.current.querySelectorAll(".loader-char");

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(loaderRef.current, {
            opacity: 0,
            duration: 0.45,
            ease: "power3.out",
            onComplete: () => {
              onComplete();
              loaderRef.current.style.display = "none";
            },
          });
        },
      });

      tl.fromTo(
        chars,
        {
          opacity: 0,
          y: 30,
          filter: "blur(8px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.7,
          stagger: 0.03,
          ease: "power3.out",
        },
      ).fromTo(
        lineRef.current,
        {
          scaleX: 0,
          opacity: 0,
        },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.45,
          ease: "power2.out",
        },
        "-=0.3",
      );
    }, loaderRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 bg-darker z-[200] flex items-center justify-center"
    >
      <div className="text-center">
        <div
          ref={textRef}
          className="flex items-center justify-center gap-1 sm:gap-2"
        >
          {"VISHAL SINGH".split("").map((char, i) => (
            <span
              key={i}
              className="loader-char inline-block text-5xl sm:text-6xl md:text-7xl font-light tracking-tight"
              style={{
                color:
                  char === " "
                    ? "transparent"
                    : i < 6
                      ? "var(--text-primary)"
                      : "var(--text-secondary)",
                width: char === " " ? "0.4em" : "auto",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>

        <div
          ref={lineRef}
          className="h-px bg-gradient-to-r from-transparent via-border-medium to-transparent mt-5 mx-auto w-40"
          style={{ transform: "scaleX(0)" }}
        />

        <p className="text-[10px] tracking-[0.25em] text-muted mt-4 font-light">
          ENGINEERING SCALABLE SYSTEMS
        </p>
      </div>
    </div>
  );
}

export default function HomeHero() {
  const router = useRouter();

  const containerRef = useRef(null);
  const ctaRef = useRef(null);

  const animationFrameRef = useRef(null);

  const [isReady, setIsReady] = useState(false);
  const [activeTech, setActiveTech] = useState(null);

  const handleLaunch = useCallback(() => {
    router.push("/projects");
  }, [router]);

  useEffect(() => {
    if (!isReady || !ctaRef.current) return;

    const ctaEl = ctaRef.current;

    const handleMouseMove = (e) => {
      if (window.innerWidth < 768) return;

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        const rect = ctaEl.getBoundingClientRect();

        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(ctaEl, {
          x: x * CTA_MAGNETIC_MULTIPLIER,
          y: y * CTA_MAGNETIC_MULTIPLIER,
          duration: 0.4,
          ease: "power2.out",
        });
      });
    };

    const handleMouseLeave = () => {
      gsap.to(ctaEl, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.4)",
      });
    };

    ctaEl.addEventListener("mousemove", handleMouseMove);
    ctaEl.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      ctaEl.removeEventListener("mousemove", handleMouseMove);
      ctaEl.removeEventListener("mouseleave", handleMouseLeave);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isReady]);

  useEffect(() => {
    if (!isReady || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      heroTl
        .fromTo(
          ".hero-line",
          {
            y: 120,
            opacity: 0,
            filter: "blur(10px)",
          },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: HERO_LINE_DURATION,
            stagger: 0.12,
          },
        )
        .fromTo(
          ".hero-pre-title",
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          "-=0.8",
        )
        .fromTo(
          ".hero-description",
          {
            opacity: 0,
            y: 24,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          "-=0.55",
        )
        .fromTo(
          ".hero-cta-wrapper",
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          "-=0.45",
        );

      ScrollTrigger.create({
        trigger: ".tech-stack",
        start: "top bottom-=80",
        onEnter: () => {
          gsap.fromTo(
            ".tech-item",
            {
              opacity: 0,
              y: 16,
            },
            {
              opacity: 1,
              y: 0,
              stagger: 0.04,
              duration: 0.5,
              ease: "power2.out",
            },
          );
        },
      });

      if (window.innerWidth >= 768) {
        gsap.to(".parallax-layer-1", {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });

        gsap.to(".parallax-layer-2", {
          yPercent: 35,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      gsap.to(".floating-orb-1", {
        x: 60,
        y: 40,
        duration: 18,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".floating-orb-2", {
        x: -50,
        y: -30,
        duration: 14,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isReady]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-darker">
      {!isReady && <Loader onComplete={() => setIsReady(true)} />}

      <section
        ref={containerRef}
        className="relative min-h-screen overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-matte">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />

          <div className="floating-orb-1 parallax-layer-1 absolute -top-24 -right-24 w-[320px] md:w-[420px] h-[320px] md:h-[420px] bg-accent/5 rounded-full blur-3xl" />

          <div className="floating-orb-2 parallax-layer-2 absolute -bottom-24 -left-24 w-[280px] md:w-[500px] h-[280px] md:h-[500px] bg-accent-muted/5 rounded-full blur-3xl" />
        </div>

        {/* Main content */}
        <div className="relative z-10 min-h-screen flex flex-col justify-between px-4 sm:px-6 lg:px-10 pt-20 pb-10">
          <div className="flex-1 flex items-center">
            <div className="max-w-7xl mx-auto w-full">
              {/* Pre title */}
              <div className="hero-pre-title inline-flex items-center gap-3 mb-6 opacity-0">
                <div
                  className="w-10 h-px"
                  style={{
                    background: "var(--accent)",
                  }}
                />

                <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-muted font-normal">
                  VISHAL SINGH — Full Stack Developer
                </span>
              </div>
              {/* Headline */}
              <h1 className="mb-8">
                <span className="hero-line block text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl leading-[1.02] tracking-tight text-primary font-light opacity-0">
                  DESIGNING
                </span>

                <span className="hero-line block text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl leading-[1.02] tracking-tight font-light opacity-0">
                  <span className="text-secondary relative inline-block">
                    & BUILDING SOFTWARE
                    <span className="absolute left-0 -bottom-2 w-1/3 h-px bg-gradient-to-r from-border-medium to-transparent" />
                  </span>
                </span>
              </h1>
              {/* Description */}
              <div className="hero-description opacity-0">
                <p className="max-w-2xl text-sm sm:text-base md:text-lg text-secondary leading-relaxed font-light">
                  I enjoy building fast, reliable web applications and backend
                  systems that solve real problems.
                </p>
              </div>
              {/* CTA */}
              <div className="hero-cta-wrapper mt-10 flex flex-col sm:flex-row gap-4 opacity-0">
                <button
                  ref={ctaRef}
                  onClick={handleLaunch}
                  className="group relative overflow-hidden rounded-full px-7 py-4 min-h-[48px] transition-all focus:outline-none focus:ring-2 focus:ring-accent/40"
                  style={{
                    background: "var(--gradient-accent)",
                    color: "var(--bg-darker)",
                    boxShadow: "var(--shadow-glow)",
                  }}
                >
                  <span className="relative z-10 flex items-center gap-2 text-sm tracking-wide font-medium">
                    <span className="transition-transform duration-300 group-hover:-translate-x-1">
                      VIEW WORK
                    </span>

                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </button>

                <button
                  onClick={() =>
                    document
                      .getElementById("about")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="group flex items-center gap-2 rounded-full border px-6 py-4 min-h-[48px] transition-all duration-300"
                  style={{
                    borderColor: "var(--border-light)",
                    color: "var(--text-muted)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--border-medium)";
                    e.currentTarget.style.color = "var(--text-secondary)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border-light)";
                    e.currentTarget.style.color = "var(--text-muted)";
                  }}
                >
                  <span className="text-sm tracking-wide font-light">
                    LEARN MORE
                  </span>

                  <ArrowDown
                    size={16}
                    className="opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tech stack */}
        <Expertise activeIndex={activeTech} setActiveIndex={setActiveTech} />

        {/* Scroll indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 opacity-60">
          <div className="w-px h-10 bg-gradient-to-b from-transparent via-border-light/30 to-border-light/50" />

          <span className="text-[9px] tracking-[0.3em] text-muted/40 font-light">
            SCROLL
          </span>
        </div>
      </section>

      <style jsx>{`
        .floating-orb-1,
        .floating-orb-2,
        .parallax-layer-1,
        .parallax-layer-2 {
          will-change: transform;
        }

        @media (prefers-reduced-motion: reduce) {
          .floating-orb-1,
          .floating-orb-2,
          .parallax-layer-1,
          .parallax-layer-2 {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}
