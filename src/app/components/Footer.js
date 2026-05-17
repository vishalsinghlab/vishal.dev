"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaArrowUp } from "react-icons/fa";
import { FiArrowUpRight, FiMapPin, FiMail } from "react-icons/fi";
import Link from "next/link";

export default function Footer() {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.2 });
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Show/hide scroll button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const socialLinks = [
    {
      icon: <FaGithub className="w-5 h-5" />,
      href: "https://github.com/vishalsinghlab",
      label: "GitHub",
      color: "hover:text-gray-300",
      bgHover: "hover:bg-gray-800",
    },
    {
      icon: <FaLinkedin className="w-5 h-5" />,
      href: "https://linkedin.com/in/vishal-singh-b57b7b109",
      label: "LinkedIn",
      color: "hover:text-blue-400",
      bgHover: "hover:bg-blue-900/20",
    },
  ];

  const footerLinks = [
    { name: "HOME", href: "/", description: "Welcome to my space" },
    { name: "PROJECTS", href: "/projects", description: "Things I've built" },
    { name: "BLOGS", href: "/blogs", description: "Thoughts & insights" },
    { name: "APPS", href: "/apps", description: "Tools I've created" },
  ];

  const stats = [
    { label: "YEARS OF CODE", value: "4+", suffix: "", icon: "💻" },
    { label: "PROJECTS", value: "16+", suffix: "", icon: "🚀" },
    { label: "CLIENTS", value: "16+", suffix: "", icon: "🤝" },
  ];

  // Animation variants
  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 0.5,
      },
    },
  };

  const socialVariant = {
    hidden: { scale: 0, opacity: 0, rotate: -180 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 12,
        mass: 0.8,
      },
    },
    hover: {
      scale: 1.15,
      rotate: 5,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
    tap: { scale: 0.95 },
  };

  return (
    <>
      <footer
        ref={footerRef}
        className="relative overflow-hidden mt-auto"
        style={{
          background: "var(--gradient-matte)",
          color: "var(--text-primary)",
        }}
      >
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent animate-pulse" />
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-l from-blue-500/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative px-4 sm:px-6 md:px-12 lg:px-24 py-16 sm:py-20 md:py-24">
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16"
              variants={containerVariant}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {/* Brand Section - Enhanced */}
              <motion.div
                className="lg:col-span-4 space-y-4"
                variants={itemVariant}
              >
                <Link
                  href="/"
                  className="inline-block group relative"
                  aria-label="Home"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="relative z-10 text-3xl sm:text-4xl font-light tracking-tight">
                      <span style={{ color: "var(--text-muted)" }}>{"<"}</span>
                      <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                        VS
                      </span>
                      <span style={{ color: "var(--text-muted)" }}>{"/>"}</span>
                    </span>
                  </motion.div>
                </Link>

                <motion.p
                  className="text-sm leading-relaxed max-w-md"
                  style={{ color: "var(--text-secondary)" }}
                  variants={itemVariant}
                >
                  Crafting digital experiences where precision meets poetry, and
                  performance becomes art.
                </motion.p>

                <motion.div
                  className="flex items-center gap-3 text-sm"
                  style={{ color: "var(--text-secondary)" }}
                  variants={itemVariant}
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                  </span>
                  <span className="font-medium">Available for work</span>
                </motion.div>
              </motion.div>

              {/* Navigation - Enhanced */}
              <motion.div className="lg:col-span-3" variants={itemVariant}>
                <h3
                  className="text-xs tracking-[0.3em] mb-6 font-semibold"
                  style={{ color: "var(--text-muted)" }}
                >
                  NAVIGATION
                </h3>
                <ul className="space-y-4">
                  {footerLinks.map((link, index) => (
                    <motion.li
                      key={index}
                      variants={itemVariant}
                      custom={index}
                    >
                      <Link
                        href={link.href}
                        className="group flex flex-col gap-1"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="text-sm font-medium transition-colors group-hover:text-white"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            {link.name}
                          </span>
                          <FiArrowUpRight className="opacity-0 group-hover:opacity-100 transition-all text-xs -translate-y-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                        <span
                          className="text-[11px] transition-colors group-hover:text-white/60"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {link.description}
                        </span>
                        <motion.div
                          className="h-px w-0 group-hover:w-full transition-all duration-500"
                          style={{ background: "var(--accent)" }}
                        />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Contact - Enhanced */}
              <motion.div className="lg:col-span-3" variants={itemVariant}>
                <h3
                  className="text-xs tracking-[0.3em] mb-6 font-semibold"
                  style={{ color: "var(--text-muted)" }}
                >
                  CONNECT
                </h3>

                <div className="space-y-4 text-sm">
                  <motion.a
                    href="mailto:bs08081996@gmail.com"
                    className="group flex items-center gap-3 transition-all break-all"
                    style={{ color: "var(--text-secondary)" }}
                    whileHover={{ x: 5 }}
                  >
                    <FiMail className="text-base flex-shrink-0" />
                    <span className="relative overflow-hidden">
                      bs08081996@gmail.com
                      <span
                        className="absolute -bottom-1 left-0 w-full h-px transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
                        style={{ background: "var(--accent)" }}
                      />
                    </span>
                  </motion.a>

                  <motion.div
                    className="flex items-center gap-3"
                    style={{ color: "var(--text-muted)" }}
                    whileHover={{ x: 5 }}
                  >
                    <FiMapPin className="text-base" />
                    <span>Ranchi, India</span>
                  </motion.div>
                </div>
              </motion.div>

              {/* Stats - Enhanced */}
              <motion.div className="lg:col-span-2" variants={itemVariant}>
                <h3
                  className="text-xs tracking-[0.3em] mb-6 font-semibold"
                  style={{ color: "var(--text-muted)" }}
                >
                  STATS
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      className="space-y-1"
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="text-2xl font-light tracking-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                        {stat.value}
                      </div>
                      <div
                        className="text-[10px] tracking-wider leading-tight"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {stat.label}
                      </div>
                      <div className="text-sm opacity-50">{stat.icon}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Bottom Section - Enhanced */}
            <motion.div
              className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left"
              style={{ borderTop: "1px solid var(--border-light)" }}
              variants={containerVariant}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <motion.div
                className="text-xs"
                style={{ color: "var(--text-muted)" }}
                variants={itemVariant}
              >
                © 2023 VISHAL SINGH. All rights reserved.
              </motion.div>

              {/* Social Links - Enhanced */}
              <motion.div className="flex gap-3" variants={itemVariant}>
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={socialVariant}
                    whileHover="hover"
                    whileTap="tap"
                    className="relative group"
                    aria-label={social.label}
                  >
                    <div
                      className={`p-2.5 rounded-full transition-all duration-300 ${social.bgHover}`}
                      style={{
                        background: "var(--gradient-metal)",
                        border: "1px solid var(--border-light)",
                      }}
                    >
                      <div
                        className={`text-sm transition-colors duration-300 ${social.color}`}
                      >
                        {social.icon}
                      </div>
                    </div>
                    <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      {social.label}
                    </span>
                  </motion.a>
                ))}
              </motion.div>

              <motion.div className="flex gap-4" variants={itemVariant}>
                <Link
                  href="/privacy"
                  className="text-[10px] hover:text-white transition-colors"
                  style={{ color: "var(--text-muted)" }}
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-[10px] hover:text-white transition-colors"
                  style={{ color: "var(--text-muted)" }}
                >
                  Terms of Use
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </footer>
    </>
  );
}
