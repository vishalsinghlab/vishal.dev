"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { keyProjects } from "../../../../data";

gsap.registerPlugin(ScrollTrigger);

export default function Work() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const projectsRef = useRef([]);
  const animationRefs = useRef({});

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      // Header animation
      gsap.fromTo(
        ".work-header",
        { y: isMobile ? 40 : 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      );

      gsap.fromTo(
        projectsRef.current,
        {
          y: isMobile ? 40 : 80,
          opacity: 0,
          rotateX: isMobile ? 0 : 10,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: isMobile ? 0.7 : 0.9,
          stagger: isMobile ? 0.06 : 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
          },
        },
      );

      // Apply hover effects based on isFullPageImage property
      projectsRef.current.forEach((card, cardIndex) => {
        if (!card) return;

        const imageCard = card.querySelector(".project-image-card");
        const image = imageCard?.querySelector("img");
        const imageContainer = imageCard?.querySelector(".image-container");
        const isTouchDevice =
          "ontouchstart" in window || navigator.maxTouchPoints > 0;

        // Get the isFullPageImage property from the project data
        const project = keyProjects[cardIndex];
        const isFullPageImage = project?.isFullPageImage || false;

        if (imageCard && image && !isTouchDevice) {
          let animationFrameId = null;
          let startTime = null;
          let isAnimating = false;

          // Store animation state for cleanup
          animationRefs.current[cardIndex] = {
            frameId: null,
            timeoutId: null,
            isActive: false,
          };

          // Scroll animation for full page images
          const startScrollAnimation = () => {
            if (isAnimating) return;

            isAnimating = true;
            startTime = null;
            const scrollDuration = 3000; // 3 seconds for full scroll

            const animate = (timestamp) => {
              if (!startTime) startTime = timestamp;
              const elapsed = timestamp - startTime;
              let progress = Math.min(elapsed / scrollDuration, 1);

              // Linear motion for consistent speed
              const easeProgress = progress;

              if (image && imageContainer) {
                const containerHeight = imageContainer.clientHeight;
                const imageHeight = image.clientHeight;

                if (containerHeight && imageHeight > containerHeight) {
                  const maxScroll = imageHeight - containerHeight;
                  const scrollY = easeProgress * maxScroll;
                  image.style.transform = `translateY(-${scrollY}px)`;
                }
              }

              if (progress < 1) {
                animationFrameId = requestAnimationFrame(animate);
                animationRefs.current[cardIndex].frameId = animationFrameId;
              } else {
                // Reached bottom, reset and loop
                animationRefs.current[cardIndex].timeoutId = setTimeout(() => {
                  if (image) {
                    image.style.transform = "translateY(0px)";
                  }
                  isAnimating = false;
                  startTime = null;

                  // Restart animation after pause
                  animationRefs.current[cardIndex].timeoutId = setTimeout(
                    () => {
                      startScrollAnimation();
                    },
                    500,
                  );
                }, 500);
              }
            };

            animationFrameId = requestAnimationFrame(animate);
            animationRefs.current[cardIndex].frameId = animationFrameId;
          };

          const stopScrollAnimation = () => {
            if (animationRefs.current[cardIndex].frameId) {
              cancelAnimationFrame(animationRefs.current[cardIndex].frameId);
              animationRefs.current[cardIndex].frameId = null;
            }
            if (animationRefs.current[cardIndex].timeoutId) {
              clearTimeout(animationRefs.current[cardIndex].timeoutId);
              animationRefs.current[cardIndex].timeoutId = null;
            }

            if (image) {
              gsap.killTweensOf(image);
              gsap.to(image, {
                y: 0,
                duration: 0.4,
                ease: "power2.out",
                onComplete: () => {
                  image.style.transform = "translateY(0px)";
                },
              });
            }

            isAnimating = false;
            startTime = null;
          };

          // Scale animation for regular images
          const startScaleAnimation = () => {
            gsap.to(image, {
              scale: 1.1,
              duration: 0.5,
              ease: "power2.out",
            });
          };

          const stopScaleAnimation = () => {
            gsap.killTweensOf(image);
            gsap.to(image, {
              scale: 1,
              duration: 0.4,
              ease: "power2.out",
            });
          };

          // Hover events based on isFullPageImage property
          const handleMouseEnter = () => {
            if (isFullPageImage) {
              // Full page image: scroll from top to bottom
              setTimeout(() => {
                startScrollAnimation();
              }, 50);
            } else {
              // Regular image: just scale
              startScaleAnimation();
            }

            // Scale effect for the card (always apply)
            gsap.to(imageCard, {
              scale: 1.02,
              duration: 0.3,
              ease: "power2.out",
            });
          };

          const handleMouseLeave = () => {
            if (isFullPageImage) {
              stopScrollAnimation();
            } else {
              stopScaleAnimation();
            }

            // Reset card scale
            gsap.to(imageCard, {
              scale: 1,
              duration: 0.4,
              ease: "power2.out",
            });
          };

          card.addEventListener("mouseenter", handleMouseEnter);
          card.addEventListener("mouseleave", handleMouseLeave);

          // Store event listeners for cleanup
          animationRefs.current[cardIndex].events = {
            handleMouseEnter,
            handleMouseLeave,
          };
        }
      });

      // Parallax
      if (!isMobile) {
        gsap.to(".parallax-blob", {
          y: 200,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.2,
          },
        });
      }
    }, sectionRef);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      // Cleanup all animations
      Object.values(animationRefs.current).forEach((anim) => {
        if (anim.frameId) cancelAnimationFrame(anim.frameId);
        if (anim.timeoutId) clearTimeout(anim.timeoutId);
      });
      ctx.revert();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 lg:px-24 overflow-hidden"
      style={{
        background: "var(--gradient-matte)",
        color: "var(--text-primary)",
      }}
    >
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at top, var(--accent-muted), transparent 60%),
              linear-gradient(var(--bg-dark), var(--bg-darker))
            `,
          }}
        />

        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(var(--border-light) 1px, transparent 1px),
              linear-gradient(90deg, var(--border-light) 1px, transparent 1px)
            `,
            backgroundSize: "clamp(30px, 8vw, 90px) clamp(30px, 8vw, 90px)",
          }}
        />

        <div
          className="parallax-blob absolute top-1/2 right-0 -translate-y-1/2 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] rounded-full blur-3xl"
          style={{ background: "var(--accent-muted)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="work-header mb-12 sm:mb-16 md:mb-20">
          <span className="text-muted text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] mb-4 sm:mb-6 inline-block">
            <span
              className="inline-block w-8 sm:w-12 h-px mr-2 sm:mr-4"
              style={{ background: "var(--accent)" }}
            />
            SELECTED WORK
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="font-medium text-primary">Featured</span>
            <span className="block sm:inline ml-0 sm:ml-4 mt-2 sm:mt-0 text-secondary">
              Projects
            </span>
          </h2>
        </div>

        {/* Projects */}
        <div
          ref={containerRef}
          className="space-y-20 md:space-y-28 lg:space-y-36"
        >
          {keyProjects.map((project, index) => (
            <div
              key={project.title}
              ref={(el) => (projectsRef.current[index] = el)}
              className="group relative opacity-0"
            >
              <div
                className={`grid lg:grid-cols-2 gap-8 sm:gap-12 items-start lg:items-center ${
                  index % 2 !== 0 ? "lg:grid-flow-dense" : ""
                }`}
              >
                {/* Content */}
                <div
                  className={`space-y-4 sm:space-y-6 ${index % 2 !== 0 ? "lg:order-last" : ""}`}
                >
                  <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm">
                    <span style={{ color: "var(--text-muted)" }}>
                      0{index + 1}
                    </span>
                    <span
                      className="w-6 sm:w-8 h-px"
                      style={{ background: "var(--border-light)" }}
                    />
                    <span style={{ color: "var(--text-muted)" }}>
                      {project.year}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] xl:text-5xl font-medium text-primary leading-tight">
                    {project.title}
                  </h3>

                  <span className="text-muted text-xs sm:text-sm block">
                    {project.category}
                  </span>

                  <p className="text-secondary text-base sm:text-lg leading-relaxed max-w-xl">
                    {project.description}
                  </p>

                  <a
                    href={project.link}
                    className="group/link inline-flex items-center gap-2 sm:gap-3 transition pt-2"
                    style={{ color: "var(--text-muted)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--text-primary)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--text-muted)")
                    }
                  >
                    <span className="text-xs sm:text-sm tracking-wider">
                      VIEW PROJECT
                    </span>
                    <ArrowRight
                      size={16}
                      className="group-hover/link:translate-x-1 transition"
                    />
                  </a>
                </div>

                {/* Image Card */}
                <div className="mt-6 sm:mt-8 lg:mt-0">
                  <div
                    className="project-image-card relative rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 group-hover:shadow-2xl"
                    style={{
                      background: "var(--gradient-metal)",
                      border: "1px solid var(--border-light)",
                    }}
                  >
                    {/* Top reflection */}
                    <div
                      className="absolute inset-0 pointer-events-none z-20"
                      style={{
                        background: `
                          linear-gradient(
                            to bottom,
                            var(--accent-muted),
                            transparent 40%
                          )
                        `,
                      }}
                    />

                    <div className="image-container relative aspect-[4/3] overflow-hidden">
                      <div
                        className="absolute inset-0 z-10"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.5), transparent 60%)",
                        }}
                      />

                      {!project.image ? (
                        <div className="w-full h-full flex items-center justify-center text-muted p-4 text-center text-sm sm:text-base">
                          Project Image
                        </div>
                      ) : project.isFullPageImage ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full"
                          style={{
                            height: "auto",
                            position: "relative",
                            top: 0,
                            transition:
                              "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                            willChange: "transform",
                          }}
                          loading="lazy"
                        />
                      ) : (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="absolute inset-0 w-full h-full object-cover object-center"
                          style={{
                            transition:
                              "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                            willChange: "transform",
                          }}
                          loading="lazy"
                        />
                      )}
                    </div>

                    {/* Full Page Indicator */}
                    {project.isFullPageImage && (
                      <div
                        className="absolute bottom-2 left-2 text-[10px] px-2 py-1 rounded-full backdrop-blur-sm z-30 pointer-events-none"
                        style={{ color: "var(--text-muted)" }}
                      >
                        ↓ Scroll to view
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Decor */}
        <div
          className="absolute -bottom-20 sm:-bottom-32 -right-20 sm:-right-32 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 rounded-full opacity-10 pointer-events-none"
          style={{ border: "1px solid var(--border-light)" }}
        />
      </div>
    </section>
  );
}
