"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { categories } from "../../../../data";
import { Sparkles, Zap, Cpu, Layers, Boxes, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function TechStack() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const floatingOrbsRef = useRef([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Handle mobile
    const mobileQuery = window.matchMedia("(max-width: 768px)");
    const handleMobileChange = () => setIsMobile(mobileQuery.matches);
    handleMobileChange();
    mobileQuery.addEventListener("change", handleMobileChange);

    // Handle reduced motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = () => setIsReducedMotion(motionQuery.matches);
    handleMotionChange();
    motionQuery.addEventListener("change", handleMotionChange);

    // Mouse move effect for 3D tilt
    const handleMouseMove = (e) => {
      if (isMobile) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      mobileQuery.removeEventListener("change", handleMobileChange);
      motionQuery.removeEventListener("change", handleMotionChange);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMobile]);

  useEffect(() => {
    if (isMobile || isReducedMotion) {
      // Apply static styles for mobile or reduced motion
      if (headerRef.current) gsap.set(headerRef.current, { y: 0, opacity: 1 });
      gsap.set(sectionRef.current.querySelectorAll(".tech-category"), {
        y: 0,
        opacity: 1,
        rotateX: 0,
      });
      gsap.set(sectionRef.current.querySelectorAll(".skill-item"), {
        scale: 1,
        opacity: 1,
      });
      return;
    }

    const ctx = gsap.context(() => {
      // Animate floating orbs
      floatingOrbsRef.current.forEach((orb, i) => {
        if (!orb) return;
        gsap.to(orb, {
          y: i % 2 === 0 ? 40 : -30,
          x: i % 3 === 0 ? 30 : -20,
          duration: 8 + i * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.5,
        });
      });

      // Header animation with word split effect
      const headerChars = headerRef.current?.querySelectorAll(".header-char");
      if (headerChars) {
        gsap.fromTo(
          headerChars,
          {
            y: 80,
            opacity: 0,
            rotateX: -90,
            filter: "blur(8px)",
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.03,
            ease: "back.out(1.2)",
          },
        );
      }

      // Category entrance animation
      gsap.fromTo(
        sectionRef.current.querySelectorAll(".tech-category"),
        {
          y: 80,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            end: "bottom 70%",
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
          },
        },
      );

      // Skill items with staggered bounce
      gsap.fromTo(
        sectionRef.current.querySelectorAll(".skill-item"),
        {
          scale: 0.8,
          opacity: 0,
          y: 30,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.03,
          ease: "back.out(0.6)",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile, isReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-20 md:py-28 px-4 md:px-12 lg:px-24 overflow-hidden"
      style={{
        background: "var(--gradient-matte)",
        color: "var(--text-primary)",
      }}
    >
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Base gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 30% 20%, var(--accent-muted), transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(96, 165, 250, 0.08), transparent 50%),
              linear-gradient(135deg, var(--bg-dark), var(--bg-darker))
            `,
          }}
        />

        {/* Animated grid pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(var(--border-light) 1px, transparent 1px),
              linear-gradient(90deg, var(--border-light) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            animation: "gridMove 30s linear infinite",
          }}
        />

        {/* Floating gradient orbs */}
        <div
          ref={(el) => (floatingOrbsRef.current[0] = el)}
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(124, 197, 184, 0.15), transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          ref={(el) => (floatingOrbsRef.current[1] = el)}
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(96, 165, 250, 0.12), transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          ref={(el) => (floatingOrbsRef.current[2] = el)}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(167, 139, 250, 0.08), transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <div
          ref={headerRef}
          className="mb-16 md:mb-20 text-center md:text-left"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-8 h-px" style={{ background: "var(--accent)" }} />
            <span className="text-xs md:text-sm tracking-[0.3em] text-muted font-medium uppercase">
              EXPERTISE
            </span>
            <Sparkles size={14} className="text-accent animate-pulse" />
          </div>

          <div className="overflow-hidden">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold">
              <span className="inline-block overflow-hidden">
                {"Tech".split("").map((char, i) => (
                  <span
                    key={i}
                    className="header-char inline-block"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--text-primary), var(--text-secondary))",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    {char}
                  </span>
                ))}
              </span>
              <span className="inline-block overflow-hidden ml-2 md:ml-4">
                {"Stack".split("").map((char, i) => (
                  <span
                    key={i}
                    className="header-char inline-block"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--accent), var(--accent-secondary))",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    {char}
                  </span>
                ))}
              </span>
            </h2>
          </div>

          <div className="relative">
            <p className="max-w-2xl mt-6 text-base md:text-lg leading-relaxed text-secondary">
              My curated collection of technologies and tools I use to build
              exceptional digital experiences. Each skill is battle-tested in
              production environments.
            </p>
            <div className="absolute -top-10 -right-10 w-20 h-20 opacity-20">
              <Zap className="w-full h-full text-accent" />
            </div>
          </div>
        </div>

        {/* Enhanced Grid */}
        <div
          ref={gridRef}
          className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          role="list"
        >
          {categories.map((category, idx) => (
            <div
              key={`${category.title}-${idx}`}
              className="tech-category group relative rounded-2xl overflow-hidden"
              style={{
                transform:
                  !isMobile && !isReducedMotion
                    ? `perspective(1000px) rotateX(${mousePosition.y * 0.02}deg) rotateY(${mousePosition.x * 0.02}deg)`
                    : "none",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={() => setHoveredCategory(idx)}
              onMouseLeave={() => setHoveredCategory(null)}
              role="listitem"
              aria-label={category.title}
            >
              {/* Card Background with Gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background: "var(--gradient-metal)",
                  border: "1px solid var(--border-light)",
                  borderRadius: "1rem",
                }}
              />

              {/* Animated border glow on hover */}
              <div
                className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${
                  hoveredCategory === idx ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  background:
                    "linear-gradient(135deg, var(--accent-muted), transparent)",
                  filter: "blur(20px)",
                }}
              />

              {/* Card Content */}
              <div className="relative p-6 md:p-8">
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="relative p-2.5 rounded-xl overflow-hidden group-hover:scale-110 transition-transform duration-300"
                    style={{
                      background: "var(--gradient-metal)",
                      border: "1px solid var(--border-light)",
                      boxShadow: `
                        inset 0 1px 0 var(--border-light),
                        0 4px 12px rgba(0,0,0,0.6)
                      `,
                    }}
                  >
                    <category.icon
                      className="w-5 h-5 md:w-6 md:h-6 transition-all duration-300"
                      style={{
                        color:
                          hoveredCategory === idx
                            ? "var(--accent)"
                            : "var(--text-muted)",
                      }}
                    />

                    {/* Icon shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </div>

                  <div>
                    <h3 className="text-lg md:text-xl font-semibold tracking-wide">
                      <span
                        className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                        style={{
                          backgroundImage:
                            "linear-gradient(135deg, var(--text-primary), var(--accent))",
                          WebkitBackgroundClip: "text",
                          backgroundClip: "text",
                          color: "transparent",
                        }}
                      >
                        {category.title}
                      </span>
                    </h3>
                    <div className="flex items-center gap-1 mt-1">
                      <Boxes size={12} className="text-muted" />
                      <span className="text-xs text-muted">
                        {category.skills.length} technologies
                      </span>
                    </div>
                  </div>
                </div>

                {/* Skills Grid - Enhanced */}
                <div className="grid gap-3 grid-cols-3">
                  {category.skills.map((skill, sidx) => (
                    <div key={sidx} className="skill-item group/skill relative">
                      <div
                        className="relative flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300 cursor-pointer overflow-hidden"
                        style={{
                          background: "rgba(0, 0, 0, 0.2)",
                          border: `1px solid ${
                            hoveredCategory === idx
                              ? "var(--border-medium)"
                              : "var(--border-light)"
                          }`,
                          backdropFilter: "blur(4px)",
                        }}
                      >
                        {/* Hover gradient overlay */}
                        <div
                          className="absolute inset-0 opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300"
                          style={{
                            background:
                              "linear-gradient(135deg, var(--accent-muted), transparent)",
                          }}
                        />

                        {/* Icon with animation */}
                        <div className="relative z-10">
                          <div
                            className="text-2xl md:text-3xl transition-all duration-300 group-hover/skill:scale-110"
                            style={{
                              color:
                                hoveredCategory === idx
                                  ? "var(--accent)"
                                  : "var(--text-secondary)",
                            }}
                          >
                            {skill.icon}
                          </div>
                        </div>

                        {/* Skill name */}
                        <span
                          className="relative z-10 text-[10px] md:text-xs font-medium text-center transition-all duration-300 group-hover/skill:text-accent"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {skill.name}
                        </span>

                        {/* Animated underline */}
                        <div
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-accent to-transparent transition-all duration-300"
                          style={{
                            width: hoveredCategory === idx ? "60%" : "0%",
                            opacity: hoveredCategory === idx ? 1 : 0,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Category Stats */}
                <div className="mt-6 pt-4 border-t border-border-light">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted">Expertise Level</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((star) => (
                        <div
                          key={star}
                          className="w-1.5 h-1.5 rounded-full"
                          style={{
                            background:
                              star <= (category.skills.length % 3) + 1
                                ? "var(--accent)"
                                : "var(--border-medium)",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                {!isMobile && hoveredCategory === idx && (
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 opacity-20 animate-spin-slow">
                    <Layers className="w-full h-full text-accent" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Styles */}
      <style jsx>{`
        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(60px, 60px);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .tech-category {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
        }

        @media (hover: hover) and (pointer: fine) {
          .tech-category:hover {
            transform: translateY(-8px) scale(1.02);
          }
        }

        .skill-item {
          transition: all 0.3s ease;
        }

        @media (max-width: 768px) {
          .skill-item {
            min-height: 80px;
          }
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar for cards */
        .tech-category::-webkit-scrollbar {
          width: 4px;
        }

        .tech-category::-webkit-scrollbar-track {
          background: var(--border-light);
          border-radius: 4px;
        }

        .tech-category::-webkit-scrollbar-thumb {
          background: var(--accent);
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
}
