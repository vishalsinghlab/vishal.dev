"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, ArrowRight, Send } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Reusable Contact Method Card
const ContactMethodCard = ({ type, value, description, Icon, isMobile }) => {
  const cardRef = useRef(null);

  const handleTouchStart = () => {
    if (isMobile) gsap.to(cardRef.current, { scale: 0.98, duration: 0.1 });
  };
  const handleTouchEnd = () => {
    if (isMobile) gsap.to(cardRef.current, { scale: 1, duration: 0.1 });
  };

  return (
    <div
      ref={cardRef}
      className="contact-method group rounded-2xl p-4 sm:p-6 transition-all duration-300 focus:outline-none focus:ring-2"
      style={{
        background: "var(--gradient-metal)",
        border: "1px solid var(--border-light)",
        transform: "translateZ(0)",
        WebkitTapHighlightColor: "transparent",
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      tabIndex={0}
      aria-label={`${type}: ${value}`}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <div
          className="p-2 sm:p-3 rounded-xl shrink-0"
          style={{ background: "var(--accent-muted)" }}
        >
          <Icon
            className="w-4 h-4 sm:w-5 sm:h-5"
            style={{ color: "var(--accent)" }}
            aria-hidden="true"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-muted text-[10px] sm:text-xs tracking-wider">
            {type}
          </div>
          <div className="text-primary text-sm sm:text-lg truncate">
            {value}
          </div>
          <div className="text-muted text-xs sm:text-sm hidden sm:block">
            {description}
          </div>
        </div>
        <ArrowRight className="text-muted/60 group-active:translate-x-1 transition-transform duration-200 w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
      </div>
    </div>
  );
};

export default function Contact() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const formRef = useRef(null);
  const contactMethodsRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detect mobile and reduced motion
  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 768px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleResize = () => setIsMobile(mobileQuery.matches);
    const handleMotion = () => setPrefersReducedMotion(motionQuery.matches);

    handleResize();
    handleMotion();

    mobileQuery.addEventListener("change", handleResize);
    motionQuery.addEventListener("change", handleMotion);

    return () => {
      mobileQuery.removeEventListener("change", handleResize);
      motionQuery.removeEventListener("change", handleMotion);
    };
  }, []);

  const contactMethods = [
    {
      type: "EMAIL",
      value: "bs08081997@gmail.com",
      description: "Best for project inquiries",
      Icon: Mail,
    },
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Replace with real API call in production
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitSuccess(false), 4000);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isMobile || prefersReducedMotion) {
        gsap.set(headerRef.current, { opacity: 1 });
        gsap.set(contactMethodsRef.current.children, { opacity: 1 });
        gsap.set(formRef.current, { opacity: 1 });
      } else {
        gsap.fromTo(
          headerRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2 },
        );

        gsap.fromTo(
          contactMethodsRef.current.children,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 1,
            scrollTrigger: {
              trigger: contactMethodsRef.current,
              start: "top 80%",
            },
          },
        );

        gsap.fromTo(
          formRef.current,
          { x: 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            scrollTrigger: { trigger: formRef.current, start: "top 80%" },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile, prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-12 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 lg:px-24"
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
            background: `radial-gradient(circle at top, var(--accent-muted), transparent 60%), linear-gradient(var(--bg-dark), var(--bg-darker))`,
          }}
        />
        <div
          className="absolute inset-0 opacity-10 hidden sm:block"
          style={{
            backgroundImage: `linear-gradient(var(--border-light) 1px, transparent 1px), linear-gradient(90deg, var(--border-light) 1px, transparent 1px)`,
            backgroundSize: isMobile ? "50px 50px" : "70px 70px",
          }}
        />
        <div
          className="absolute inset-0 opacity-30 sm:hidden"
          style={{
            background:
              "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.3) 100%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-12 sm:mb-16">
          <span className="text-muted text-[11px] sm:text-sm tracking-[0.25em] sm:tracking-[0.3em]">
            <span
              className="inline-block w-8 sm:w-12 h-px mr-3 sm:mr-4"
              style={{ background: "var(--accent)" }}
            />
            CONNECT
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-4 sm:mt-6 leading-tight">
            <span className="font-medium text-primary">Let's</span>
            <span className="ml-2 sm:ml-4 text-secondary">Talk</span>
          </h2>
          <p className="text-secondary max-w-xl sm:max-w-2xl mt-4 sm:mt-6 text-sm sm:text-base">
            Have a project in mind or want to collaborate? Let's create
            something exceptional.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16">
          {/* Contact Methods */}
          <div ref={contactMethodsRef} className="space-y-4 sm:space-y-6">
            {contactMethods.map((method) => (
              <ContactMethodCard
                key={method.type}
                {...method}
                isMobile={isMobile}
              />
            ))}
          </div>

          {/* Contact Form */}
          <div ref={formRef}>
            <div
              className="rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8"
              style={{
                background: "var(--gradient-metal)",
                border: "1px solid var(--border-light)",
                transform: "translateZ(0)",
              }}
            >
              <h3 className="text-xl sm:text-2xl text-primary mb-4 sm:mb-6">
                Send a message
              </h3>

              {submitSuccess && (
                <div
                  className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-xl text-secondary text-sm animate-fade-in"
                  style={{
                    background: "var(--accent-muted)",
                    border: "1px solid var(--border-light)",
                  }}
                >
                  Message sent successfully.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {["name", "email"].map((field) => (
                  <input
                    key={field}
                    name={field}
                    placeholder={`Your ${field}`}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl outline-none text-sm sm:text-base transition-all duration-200 focus:ring-1"
                    style={{
                      background: "var(--input-bg)",
                      border: "1px solid var(--input-border)",
                      color: "var(--text-primary)",
                      borderRadius: "12px",
                      WebkitAppearance: "none",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "var(--accent)";
                      e.target.style.boxShadow =
                        "0 0 0 2px var(--input-focus-ring)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "var(--input-border)";
                      e.target.style.boxShadow = "none";
                    }}
                    autoComplete={field === "email" ? "email" : "name"}
                    inputMode={field === "email" ? "email" : "text"}
                  />
                ))}

                <textarea
                  name="message"
                  rows={4}
                  placeholder="Your message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl outline-none resize-none text-sm sm:text-base transition-all duration-200 focus:ring-1"
                  style={{
                    background: "var(--input-bg)",
                    border: "1px solid var(--input-border)",
                    color: "var(--text-primary)",
                    borderRadius: "12px",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "var(--accent)";
                    e.target.style.boxShadow =
                      "0 0 0 2px var(--input-focus-ring)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "var(--input-border)";
                    e.target.style.boxShadow = "none";
                  }}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 sm:py-4 rounded-xl flex items-center justify-center gap-2 text-sm sm:text-base font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:active:scale-100"
                  style={{
                    background: "var(--gradient-accent)",
                    color: "var(--bg-darker)",
                    boxShadow: "var(--shadow-glow)",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                >
                  <Send size={isMobile ? 14 : 16} />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        @media (max-width: 768px) {
          input,
          textarea,
          button {
            font-size: 16px !important;
          }
          .contact-method {
            cursor: pointer;
          }
        }

        * {
          -webkit-overflow-scrolling: touch;
        }
      `}</style>
    </section>
  );
}
