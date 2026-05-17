"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";

export default function ProjectCard({
  slug,
  title,
  description,
  displayImage,
  images = [],
  tags = [],
  liveComponent = null,
  fullPageImages = [],
}) {
  const [hovered, setHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const animationRef = useRef(null);
  const transitionTimeoutRef = useRef(null);

  const imageToShow =
    hovered && images.length > 0 ? images[currentImageIndex] : displayImage;

  const isFullPage = fullPageImages.includes(imageToShow);

  // Full page auto scroll animation
  useEffect(() => {
    if (!liveComponent && hovered && images.length > 0) {
      if (isFullPage) {
        const startScroll = () => {
          let startTime = null;
          const scrollDuration = 3200;

          const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;

            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / scrollDuration, 1);

            const easeProgress = 1 - Math.pow(1 - progress, 3);

            setScrollProgress(easeProgress * 100);

            if (progress < 1) {
              animationRef.current = requestAnimationFrame(animate);
            } else {
              setIsTransitioning(true);

              transitionTimeoutRef.current = setTimeout(() => {
                setCurrentImageIndex((prev) => (prev + 1) % images.length);
                setScrollProgress(0);
                setIsTransitioning(false);
              }, 500);
            }
          };

          animationRef.current = requestAnimationFrame(animate);
        };

        startScroll();
      } else {
        const interval = setInterval(() => {
          setIsTransitioning(true);

          setTimeout(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
            setIsTransitioning(false);
          }, 250);
        }, 2600);

        return () => clearInterval(interval);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, [hovered, images, currentImageIndex, liveComponent, isFullPage]);

  // Reset states on leave
  useEffect(() => {
    if (!hovered) {
      setCurrentImageIndex(0);
      setScrollProgress(0);
      setIsTransitioning(false);

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    }
  }, [hovered]);

  return (
    <Link href={`/projects/${slug}`} className="block h-full">
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{ y: -6 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl"
        style={{
          background: "var(--gradient-metal)",
          border: "1px solid var(--border-light)",
          boxShadow:
            "0 1px 1px rgba(255,255,255,0.04) inset, 0 20px 40px rgba(0,0,0,0.25)",
        }}
      >
        {/* Glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at top right, rgba(255,255,255,0.08), transparent 45%)",
          }}
        />

        {/* IMAGE SECTION */}
        <div className="relative aspect-[16/10] overflow-hidden">
          {liveComponent ? (
            <div className="h-full w-full">{liveComponent}</div>
          ) : (
            <>
              {/* Blurred BG */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  opacity: isTransitioning ? 0 : 1,
                  scale: hovered ? 1.06 : 1,
                }}
                transition={{ duration: 0.45 }}
                style={{
                  backgroundImage: `url(${imageToShow})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "blur(30px)",
                  transform: "scale(1.15)",
                }}
              />

              {/* Dark overlay */}
              <div
                className="absolute inset-0 z-10"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.82), rgba(0,0,0,0.15), rgba(0,0,0,0.05))",
                }}
              />

              {/* Main image */}
              <motion.div
                className="absolute inset-0 z-20"
                animate={{
                  opacity: isTransitioning ? 0 : 1,
                  scale: hovered ? 1.02 : 1,
                }}
                transition={{ duration: 0.45 }}
                style={{
                  backgroundImage: `url(${imageToShow})`,
                  backgroundSize: isFullPage ? "100% auto" : "contain",
                  backgroundPosition: isFullPage
                    ? `center ${scrollProgress}%`
                    : "center",
                  backgroundRepeat: "no-repeat",
                }}
              />
            </>
          )}

          {/* Shine */}
          <motion.div
            className="absolute inset-0 z-30"
            initial={{ x: "-120%" }}
            animate={hovered ? { x: "120%" } : { x: "-120%" }}
            transition={{
              duration: 1.2,
              ease: "easeInOut",
            }}
            style={{
              background:
                "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)",
            }}
          />

          {/* Image Counter */}
          {hovered && images.length > 1 && (
            <div className="absolute right-3 top-3 z-40 flex items-center gap-1 rounded-full border border-white/10 bg-black/40 px-2 py-1 backdrop-blur-md">
              {images.map((_, index) => (
                <motion.div
                  key={index}
                  animate={{
                    width: index === currentImageIndex ? 18 : 6,
                    opacity: index === currentImageIndex ? 1 : 0.4,
                  }}
                  transition={{ duration: 0.25 }}
                  className="h-1.5 rounded-full bg-white"
                />
              ))}
            </div>
          )}

          {/* Scroll Indicator */}
          <AnimatePresence>
            {hovered && isFullPage && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="absolute bottom-3 left-3 z-40 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-[10px] text-white/70 backdrop-blur-md"
              >
                Scrolling • {Math.round(scrollProgress)}%
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CONTENT */}
        <div className="relative z-40 flex flex-1 flex-col p-5">
          {/* Top row */}
          <div className="mb-3 flex items-start justify-between gap-4">
            <div>
              <h3
                className="text-xl font-semibold tracking-tight transition-all duration-300 group-hover:translate-x-0.5"
                style={{ color: "var(--text-primary)" }}
              >
                {title}
              </h3>

              <div
                className="mt-2 h-px w-10 transition-all duration-500 group-hover:w-16"
                style={{
                  background:
                    "linear-gradient(to right, var(--accent), transparent)",
                }}
              />
            </div>

            <motion.div
              whileHover={{ rotate: 0 }}
              initial={{ rotate: -12 }}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-md"
            >
              <ArrowUpRight size={18} style={{ color: "var(--accent)" }} />
            </motion.div>
          </div>

          {/* Description */}
          <p
            className="mb-5 line-clamp-3 text-sm leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            {description}
          </p>

          {/* Tags */}
          <div className="mt-auto flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <motion.span
                key={i}
                whileHover={{ y: -2 }}
                className="rounded-full border px-3 py-1 text-[11px] font-medium tracking-wide backdrop-blur-md"
                style={{
                  color: "var(--text-secondary)",
                  background: "rgba(255,255,255,0.04)",
                  borderColor: "var(--border-light)",
                }}
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* Footer CTA */}
          <div
            className="mt-5 flex items-center gap-2 text-sm font-medium transition-all duration-300 group-hover:translate-x-1"
            style={{ color: "var(--accent)" }}
          >
            <span>View Project</span>

            <ExternalLink size={14} className="opacity-80" />
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
