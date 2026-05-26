"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState, useRef } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { SiGithub, SiLinkedin } from "react-icons/si";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Blogs", href: "/blogs" },
  { label: "Apps", href: "/apps" },
];

// Custom hook for scroll visibility
function useScrollVisibility(threshold = 10) {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setVisible(
            currentScrollY < lastScrollY.current || currentScrollY < threshold,
          );
          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return visible;
}

// Custom hook for body scroll lock
function useLockBodyScroll(shouldLock) {
  useEffect(() => {
    const original = document.body.style.overflow;

    if (shouldLock) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = original;
    }

    return () => {
      document.body.style.overflow = original;
    };
  }, [shouldLock]);
}

// Custom hook for escape key handler
function useEscapeKey(onEscape) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onEscape();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onEscape]);
}

// NavLink component for consistency
function NavLink({ href, label, isActive, onClick, className = "" }) {
  const active = isActive(href);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative group tracking-wide transition-colors ${className}`}
      style={{
        color: active ? "var(--text-primary)" : "var(--text-muted)",
      }}
      onMouseEnter={(e) => {
        if (!active) e.currentTarget.style.color = "var(--text-primary)";
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.color = "var(--text-muted)";
      }}
    >
      <span className="relative z-10">{label}</span>
      <span
        className={`absolute -bottom-1 left-0 w-full h-px transform transition-transform duration-500 origin-left ${
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        }`}
        style={{ background: "var(--accent)" }}
      />
    </Link>
  );
}

// Mobile menu button component
function MobileMenuButton({ isOpen, onClick }) {
  return (
    <button
      className="md:hidden transition-colors"
      style={{ color: "var(--text-primary)" }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
      onMouseLeave={(e) =>
        (e.currentTarget.style.color = "var(--text-primary)")
      }
      onClick={onClick}
      aria-label={isOpen ? "Close Menu" : "Open Menu"}
      aria-expanded={isOpen}
    >
      {isOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  );
}

// Logo component
function Logo() {
  return (
    <Link
      href="/"
      className="relative group"
      style={{ color: "var(--text-primary)" }}
    >
      <span className="relative z-10 text-2xl font-light tracking-tight">
        <span style={{ color: "var(--accent)" }}>{"<"}</span>
        dev
        <span style={{ color: "var(--accent)" }}>{"/>"}</span>
      </span>
      <div
        className="absolute -inset-2 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500"
        style={{ background: "var(--accent-muted)" }}
      />
    </Link>
  );
}

// Mobile drawer component
function MobileDrawer({ isOpen, onClose, navLinks, isActive }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0"
            style={{ background: "var(--overlay-dark)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="absolute top-0 right-0 h-full w-[280px] px-8 py-12 flex flex-col space-y-8 shadow-2xl"
            style={{
              background: "var(--gradient-matte)",
              borderLeft: "1px solid var(--border-light)",
            }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Close button */}
            <div className="flex justify-end">
              <button
                onClick={onClose}
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--text-primary)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-muted)")
                }
                aria-label="Close Menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Logo */}
            <div
              className="text-2xl font-light"
              style={{ color: "var(--text-primary)" }}
            >
              <span style={{ color: "var(--accent)" }}>{"<"}</span>
              dev
              <span style={{ color: "var(--accent)" }}>{"/>"}</span>
            </div>

            {/* Navigation links */}
            <div className="flex flex-col space-y-6">
              {navLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={onClose}
                  className="relative group text-lg tracking-wide transition-all duration-300"
                  style={{
                    color: isActive(href)
                      ? "var(--text-primary)"
                      : "var(--text-muted)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(href))
                      e.currentTarget.style.color = "var(--text-primary)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(href))
                      e.currentTarget.style.color = "var(--text-muted)";
                  }}
                >
                  <span className="relative z-10">{label}</span>
                  <span
                    className={`absolute -bottom-1 left-0 w-full h-px transform transition-transform duration-500 origin-left ${
                      isActive(href)
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                    style={{ background: "var(--accent)" }}
                  />
                </Link>
              ))}
            </div>

            {/* Social links */}
            <div className="flex gap-6 pt-6">
              <a
                href="https://github.com/vishalsinghlab"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--accent)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--accent-light)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--accent)")
                }
              >
                <SiGithub size={20} />
              </a>

              <a
                href="https://linkedin.com/in/vishal-singh-b57b7b109"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--accent)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--accent-light)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--accent)")
                }
              >
                <SiLinkedin size={20} />
              </a>
            </div>

            {/* Decorative elements */}
            <div
              className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full opacity-20"
              style={{ border: "1px solid var(--border-light)" }}
            />
            <div
              className="absolute -top-20 -left-20 w-40 h-40 rounded-full opacity-20"
              style={{ border: "1px solid var(--border-light)" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Desktop navigation component
function DesktopNav({ navLinks, isActive }) {
  return (
    <div className="hidden md:flex gap-8">
      {navLinks.map(({ label, href }) => (
        <NavLink
          key={href}
          href={href}
          label={label}
          isActive={isActive}
          className="text-sm"
        />
      ))}
    </div>
  );
}

export default function Navbar() {
  const { theme, toggle } = useContext(ThemeContext);
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(
    !pathname.includes("/apps/algo-teacher"),
  );
  const isVisible = useScrollVisibility();
  useLockBodyScroll(menuOpen);
  useEscapeKey(() => setMenuOpen(false));

  if (!showNavbar) {
    return null;
  }

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <motion.nav
        initial={false}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 w-full z-50"
        style={{ mixBlendMode: "difference" }}
      >
        <div className="flex flex-1 items-center justify-between px-8 py-6 max-w-7xl mx-auto">
          {/* Logo */}
          <Logo />

          {/* Nav */}
          <div className="mx-auto hidden md:flex">
            <DesktopNav navLinks={navLinks} isActive={isActive} />
          </div>

          {/* Right side */}
          <div className="flex items-center gap-6">
            {/* Socials */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="https://github.com/vishalsinghlab"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label="GitHub"
              >
                <SiGithub
                  className="transition-all duration-300 group-hover:scale-110"
                  style={{ color: "var(--accent)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--accent-light)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--accent)")
                  }
                  size={18}
                />
              </a>

              <a
                href="https://linkedin.com/in/vishal-singh-b57b7b109"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label="LinkedIn"
              >
                <SiLinkedin
                  className="transition-all duration-300 group-hover:scale-110"
                  style={{ color: "var(--accent)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--accent-light)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--accent)")
                  }
                  size={18}
                />
              </a>
            </div>

            {/* Mobile Menu */}
            <MobileMenuButton isOpen={menuOpen} onClick={toggleMenu} />
          </div>
        </div>
      </motion.nav>

      <MobileDrawer
        isOpen={menuOpen}
        onClose={closeMenu}
        navLinks={navLinks}
        isActive={isActive}
      />
    </>
  );
}
