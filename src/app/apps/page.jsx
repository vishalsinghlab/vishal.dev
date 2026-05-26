"use client";

import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiSearch, FiArrowRight, FiStar, FiExternalLink } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const apps = [
  {
    id: 1,
    name: "Live Chat",
    description:
      "AI-enhanced real-time messaging with secure, end-to-end encryption for seamless conversations.",
    category: "Communication",
    url: "/apps/live-chat",
    image: "/images/firechat.png",
    featured: true,
    tech: ["Next.js", "Firebase", "AI"],
  },
  {
    id: 2,
    name: "Video Calling",
    description:
      "Real-time video calls with live language translation — choose the language you speak and the language the other participant hears.",
    category: "Communication",
    url: "/apps/video-calling",
    image: "/images/video-calling.png",
    featured: true,
    tech: ["WebRTC", "AI"],
  },
  {
    id: 3,
    name: "AI Agents Builder",
    description:
      "Build, test, and deploy LLM-based agents with a drag-and-drop interface.",
    category: "AI/ML",
    url: "/ai-agents",
    image: "/images/viva.png",
    featured: true,
    tech: ["Next.js", "AI", "LLMs"],
  },
];

export default function AppsShowcase() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const heroRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".hero-line",
          { y: 100, opacity: 0, rotateX: -45 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: "power4.out",
          },
        );

        gsap.fromTo(
          ".hero-pre-title",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.3 },
        );

        gsap.fromTo(
          ".hero-description",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.4 },
        );
      }, heroRef);

      return () => ctx.revert();
    }
  }, [isLoading]);

  const filteredApps = apps.filter(
    (app) =>
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      filter: "blur(8px)",
    },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen overflow-hidden"
      style={{
        background: "var(--gradient-matte)",
        color: "var(--text-primary)",
      }}
    >
      <Head>
        <title>Apps | Vishal Singh</title>
        <meta
          name="description"
          content="Explore cutting-edge applications built with modern technologies"
        />
      </Head>

      {/* BACKGROUND */}
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{ background: "var(--bg-darker)" }}
        />

        {/* grid */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `
              linear-gradient(var(--border-light) 1px, transparent 1px),
              linear-gradient(90deg, var(--border-light) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* glow */}
        <div
          className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full blur-3xl"
          style={{ background: "var(--accent-muted)" }}
        />

        {/* radial */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at top, var(--accent-muted), transparent 45%)",
          }}
        />

        {/* noise */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-soft-light bg-[url('/noise.png')]" />
      </div>

      {/* HERO */}
      <header className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16 text-center">
        <div className="hero-pre-title inline-flex items-center gap-3 mb-8 opacity-0">
          <div className="w-8 h-px" style={{ background: "var(--accent)" }} />
          <span
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: "var(--text-muted)" }}
          >
            APPLICATION SHOWCASE
          </span>
        </div>

        <h1 className="mb-8">
          <div className="overflow-hidden">
            <span
              className="hero-line block text-6xl md:text-7xl lg:text-8xl font-light tracking-tight opacity-0 leading-[1.1]"
              style={{ color: "var(--text-primary)" }}
            >
              Digital
            </span>
          </div>
          <div className="overflow-hidden">
            <span
              className="hero-line block text-6xl md:text-7xl lg:text-8xl font-light tracking-tight opacity-0 leading-[1.1]"
              style={{ color: "var(--text-muted)" }}
            >
              Experiences
            </span>
          </div>
        </h1>

        <p
          className="hero-description max-w-2xl mx-auto mt-6 text-base md:text-lg leading-relaxed opacity-0"
          style={{ color: "var(--text-secondary)" }}
        >
          Carefully crafted applications blending engineering, performance,
          motion, and immersive user experiences.
        </p>
      </header>

      {/* SEARCH */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="relative z-10 max-w-3xl mx-auto px-6 mb-20"
      >
        <div
          className="relative overflow-hidden rounded-2xl backdrop-blur-2xl"
          style={{
            border: "1px solid var(--border-light)",
            background: "var(--bg-light)",
          }}
        >
          {/* shine */}
          <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,var(--accent-muted),transparent)] translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000" />

          <FiSearch
            className="absolute left-6 top-1/2 -translate-y-1/2 text-lg"
            style={{ color: "var(--text-muted)" }}
          />

          <input
            type="text"
            placeholder="Search applications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent px-14 py-5 outline-none text-base"
            style={{
              color: "var(--text-primary)",
            }}
          />
        </div>
      </motion.div>

      {/* LOADING */}
      {isLoading ? (
        <div className="h-[40vh] flex items-center justify-center">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-full animate-spin"
              style={{
                border: "1px solid var(--border-light)",
                borderTopColor: "var(--accent)",
              }}
            />
            <div
              className="absolute inset-0 blur-2xl rounded-full"
              style={{ background: "var(--accent-muted)" }}
            />
          </div>
        </div>
      ) : (
        <>
          {/* FEATURED */}
          <section className="relative z-10 max-w-7xl mx-auto px-6 mb-28">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-3 mb-10"
            >
              <FiStar style={{ color: "var(--text-muted)" }} />
              <h2
                className="text-3xl font-light"
                style={{ color: "var(--text-primary)" }}
              >
                Featured Projects
              </h2>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {filteredApps
                .filter((app) => app.featured)
                .map((app) => (
                  <motion.a
                    href={app.url}
                    key={app.id}
                    variants={itemVariants}
                    whileHover={{ y: -8 }}
                    className="group relative overflow-hidden rounded-3xl backdrop-blur-xl"
                    style={{
                      border: "1px solid var(--border-light)",
                      background: "var(--bg-light)",
                    }}
                  >
                    {/* glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                      style={{
                        background:
                          "radial-gradient(circle at top right, var(--accent-muted), transparent 45%)",
                      }}
                    />

                    {/* image */}
                    <div className="relative h-[260px] overflow-hidden">
                      <motion.img
                        whileHover={{ scale: 1.04 }}
                        transition={{ duration: 0.7 }}
                        src={app.image}
                        alt={app.name}
                        className="w-full h-full object-cover"
                      />

                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to top, var(--overlay-dark), rgba(0,0,0,0.3), transparent)",
                        }}
                      />

                      {/* floating category */}
                      <div className="absolute top-5 left-5">
                        <span
                          className="px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] backdrop-blur-md"
                          style={{
                            border: "1px solid var(--border-light)",
                            background: "var(--overlay-dark)",
                            color: "var(--text-muted)",
                          }}
                        >
                          {app.category}
                        </span>
                      </div>

                      {/* launch icon */}
                      <motion.div
                        whileHover={{ rotate: 0 }}
                        initial={{ rotate: -12 }}
                        className="absolute top-5 right-5 w-11 h-11 rounded-2xl backdrop-blur-md flex items-center justify-center"
                        style={{
                          background: "var(--overlay-dark)",
                          border: "1px solid var(--border-light)",
                        }}
                      >
                        <FiExternalLink
                          style={{ color: "var(--text-muted)" }}
                        />
                      </motion.div>
                    </div>

                    {/* content */}
                    <div className="p-7">
                      <h3
                        className="text-2xl font-medium mb-4 tracking-tight"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {app.name}
                      </h3>

                      <p
                        className="leading-relaxed mb-6"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {app.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {app.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1.5 rounded-full text-xs"
                            style={{
                              border: "1px solid var(--border-light)",
                              background: "var(--bg-light)",
                              color: "var(--text-muted)",
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div
                        className="flex items-center gap-2 text-sm font-medium"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        <span>Launch Experience</span>
                        <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>

                    {/* border glow */}
                    <div
                      className="absolute inset-0 rounded-3xl pointer-events-none transition-all duration-500"
                      style={{
                        boxShadow: "inset 0 0 0 1px var(--border-light)",
                      }}
                    />
                  </motion.a>
                ))}
            </motion.div>
          </section>

          {/* ALL APPS */}
          <section className="relative z-10 max-w-7xl mx-auto px-6 pb-28">
            <h2
              className="text-3xl font-light mb-10"
              style={{ color: "var(--text-primary)" }}
            >
              All Applications
            </h2>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filteredApps.map((app) => (
                  <motion.a
                    layout
                    key={app.id}
                    href={app.url}
                    variants={itemVariants}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ y: -6 }}
                    className="group relative overflow-hidden rounded-2xl backdrop-blur-xl"
                    style={{
                      border: "1px solid var(--border-light)",
                      background: "var(--bg-light)",
                    }}
                  >
                    {/* top glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background:
                          "radial-gradient(circle at top, var(--accent-muted), transparent 50%)",
                      }}
                    />

                    {/* image */}
                    <div className="relative h-52 overflow-hidden">
                      <motion.img
                        whileHover={{ scale: 1.06 }}
                        transition={{ duration: 0.7 }}
                        src={app.image}
                        alt={app.name}
                        className="w-full h-full object-cover"
                      />

                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to top, var(--overlay-dark), rgba(0,0,0,0.2), transparent)",
                        }}
                      />
                    </div>

                    {/* content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <h3
                            className="text-xl font-medium tracking-tight"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {app.name}
                          </h3>

                          <div
                            className="w-0 h-px mt-2 group-hover:w-full transition-all duration-500"
                            style={{ background: "var(--accent)" }}
                          />
                        </div>

                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{
                            border: "1px solid var(--border-light)",
                            background: "var(--bg-light)",
                          }}
                        >
                          <FiExternalLink
                            style={{ color: "var(--text-muted)" }}
                          />
                        </div>
                      </div>

                      <p
                        className="text-sm leading-relaxed line-clamp-3 mb-6"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {app.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {app.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-full text-[10px]"
                            style={{
                              border: "1px solid var(--border-light)",
                              color: "var(--text-muted)",
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <span
                          className="text-[10px] uppercase tracking-[0.2em]"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {app.category}
                        </span>

                        <div
                          className="flex items-center gap-2 text-sm"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          <span>Open</span>
                          <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </AnimatePresence>
            </motion.div>
          </section>
        </>
      )}

      {/* EMPTY */}
      {filteredApps.length === 0 && !isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative z-10 flex flex-col items-center justify-center py-32"
        >
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center mb-8"
            style={{
              border: "1px solid var(--border-light)",
              background: "var(--bg-light)",
            }}
          >
            <FiSearch
              className="text-3xl"
              style={{ color: "var(--text-muted)" }}
            />
          </div>

          <h3
            className="text-3xl font-light mb-3"
            style={{ color: "var(--text-primary)" }}
          >
            No apps found
          </h3>

          <p style={{ color: "var(--text-muted)" }}>
            Try searching with different keywords.
          </p>
        </motion.div>
      )}
    </div>
  );
}
