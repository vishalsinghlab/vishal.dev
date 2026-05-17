"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import { FiSearch, FiArrowRight, FiStar, FiExternalLink } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

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

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

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
        <div className="absolute inset-0 bg-[#050505]" />

        {/* grid */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* glow */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-white/[0.03] blur-3xl" />

        {/* radial */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_45%)]" />

        {/* noise */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-soft-light bg-[url('/noise.png')]" />
      </div>

      {/* HERO */}
      <motion.header
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16 text-center"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-xl mb-8"
        >
          <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse" />
          <span className="text-xs tracking-[0.25em] uppercase text-white/50">
            APPLICATION SHOWCASE
          </span>
        </motion.div>

        <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-light tracking-[-0.06em] leading-none">
          <span className="block text-white">Digital</span>

          <span
            className="block text-transparent bg-clip-text"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,0.25))",
            }}
          >
            Experiences
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto mt-8 text-base md:text-lg text-white/45 leading-relaxed"
        >
          Carefully crafted applications blending engineering, performance,
          motion, and immersive user experiences.
        </motion.p>
      </motion.header>

      {/* SEARCH */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.25 }}
        className="relative z-10 max-w-3xl mx-auto px-6 mb-20"
      >
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl">
          {/* shine */}
          <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.05),transparent)] translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000" />

          <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-white/35 text-lg" />

          <input
            type="text"
            placeholder="Search applications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent px-14 py-5 text-white/90 placeholder:text-white/25 outline-none text-base"
          />
        </div>
      </motion.div>

      {/* LOADING */}
      {isLoading ? (
        <div className="h-[40vh] flex items-center justify-center">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border border-white/10 border-t-white/70 animate-spin" />
            <div className="absolute inset-0 blur-2xl bg-white/10 rounded-full" />
          </div>
        </div>
      ) : (
        <>
          {/* FEATURED */}
          <section className="relative z-10 max-w-7xl mx-auto px-6 mb-28">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3 mb-10"
            >
              <FiStar className="text-white/40" />
              <h2 className="text-3xl font-light text-white/90">
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
                    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl"
                  >
                    {/* glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_45%)]" />

                    {/* image */}
                    <div className="relative h-[260px] overflow-hidden">
                      <motion.img
                        whileHover={{ scale: 1.04 }}
                        transition={{ duration: 0.7 }}
                        src={app.image}
                        alt={app.name}
                        className="w-full h-full object-cover"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                      {/* floating category */}
                      <div className="absolute top-5 left-5">
                        <span className="px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.2em] border border-white/10 bg-black/30 backdrop-blur-md text-white/60">
                          {app.category}
                        </span>
                      </div>

                      {/* launch icon */}
                      <motion.div
                        whileHover={{ rotate: 0 }}
                        initial={{ rotate: -12 }}
                        className="absolute top-5 right-5 w-11 h-11 rounded-2xl bg-black/30 border border-white/10 backdrop-blur-md flex items-center justify-center"
                      >
                        <FiExternalLink className="text-white/80" />
                      </motion.div>
                    </div>

                    {/* content */}
                    <div className="p-7">
                      <h3 className="text-2xl font-medium text-white mb-4 tracking-tight">
                        {app.name}
                      </h3>

                      <p className="text-white/50 leading-relaxed mb-6">
                        {app.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {app.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1.5 rounded-full text-xs border border-white/10 bg-white/[0.03] text-white/50"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 text-sm font-medium text-white/80">
                        <span>Launch Experience</span>

                        <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>

                    {/* border glow */}
                    <div className="absolute inset-0 rounded-3xl ring-1 ring-white/5 group-hover:ring-white/10 transition-all duration-500 pointer-events-none" />
                  </motion.a>
                ))}
            </motion.div>
          </section>

          {/* ALL APPS */}
          <section className="relative z-10 max-w-7xl mx-auto px-6 pb-28">
            <h2 className="text-3xl font-light text-white/90 mb-10">
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
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl"
                  >
                    {/* top glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_50%)]" />

                    {/* image */}
                    <div className="relative h-52 overflow-hidden">
                      <motion.img
                        whileHover={{ scale: 1.06 }}
                        transition={{ duration: 0.7 }}
                        src={app.image}
                        alt={app.name}
                        className="w-full h-full object-cover"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    </div>

                    {/* content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-xl font-medium text-white tracking-tight">
                            {app.name}
                          </h3>

                          <div className="w-0 h-px bg-white/40 mt-2 group-hover:w-full transition-all duration-500" />
                        </div>

                        <div className="w-10 h-10 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center">
                          <FiExternalLink className="text-white/50" />
                        </div>
                      </div>

                      <p className="text-sm leading-relaxed text-white/45 line-clamp-3 mb-6">
                        {app.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {app.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-full text-[11px] border border-white/10 text-white/40"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase tracking-[0.2em] text-white/30">
                          {app.category}
                        </span>

                        <div className="flex items-center gap-2 text-sm text-white/70">
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
          <div className="w-24 h-24 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center mb-8">
            <FiSearch className="text-3xl text-white/30" />
          </div>

          <h3 className="text-3xl font-light text-white mb-3">No apps found</h3>

          <p className="text-white/45">
            Try searching with different keywords.
          </p>
        </motion.div>
      )}
    </div>
  );
}
