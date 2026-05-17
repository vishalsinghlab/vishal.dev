"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, Shield, Zap, GitBranch, Cpu } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    title: "Full-Stack Developer",
    company: "AppCurators Technologies",
    period: "2025 – Present",
    description:
      "Developing full-stack applications for fintech and logistics platforms. Built backend APIs for transaction processing, inventory systems, and order lifecycle management. Integrated third-party services like Stripe, vAuto, and QuickBooks.",
    tech: "React · Node.js · GCP",
    highlight: "Production systems · API design",
  },
  {
    title: "Software Engineer",
    company: "Jai Infoway Pvt. Ltd.",
    period: "2023 – 2025",
    description:
      "Built backend services and AI-driven features using Node.js and Python (FastAPI). Implemented RAG pipelines, vector search systems, and LLM-based applications with real-time streaming responses.",
    tech: "Node.js · FastAPI · Python · LLMs",
    highlight: "AI systems · RAG pipelines",
  },
  {
    title: "Mobile App Developer",
    company: "Brightcode Pvt. Ltd.",
    period: "2024",
    description:
      "Developed React Native applications for logistics and vehicle rental platforms with real-time tracking, booking systems, and payment integrations.",
    tech: "React Native · Node.js · MongoDB",
    highlight: "Real-time features",
  },
  {
    title: "Freelance Full-Stack Developer",
    company: "Self-employed",
    period: "2022 – 2023",
    description:
      "Built and deployed web applications for clients including e-commerce platforms with authentication, payments, and admin dashboards.",
    tech: "Next.js · Firebase",
    highlight: "End-to-end delivery",
  },
];
// Engineering principles
const principles = [
  {
    icon: Shield,
    title: "Idempotency-first",
    description:
      "Every write operation is replay-safe. No duplicate orders, ever.",
  },
  {
    icon: GitBranch,
    title: "Observable by design",
    description: "Structured logs with trace IDs from day one. Debug at 3 AM.",
  },
  {
    icon: Zap,
    title: "Rate limit + retry",
    description:
      "Never fail silently. Exponential backoff with circuit breakers.",
  },
  {
    icon: Cpu,
    title: "Test state mutation",
    description:
      "Unit tests for business logic. Integration tests for contracts.",
  },
];

// Key metrics from your resume
const metrics = [
  { value: "4+", label: "Years of experience", color: "#3B82F6" },
  {
    value: "10K+",
    label: "Daily AI tool calls handled",
    color: "#10B981",
  },
  {
    value: "5K+",
    label: "Requests/min supported (webhooks)",
    color: "#06B6D4",
  },
  {
    value: "92%",
    label: "RAG retrieval success rate",
    color: "#8B5CF6",
  },
  {
    value: "$1M",
    label: "Winning product (Kiddie Kredit)",
    color: "#EC4899",
  },
  {
    value: "190+",
    label: "Countries supported (RomeSIM)",
    color: "#F59E0B",
  },
];

export default function About() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const metricsRef = useRef(null);
  const principlesRef = useRef(null);
  const timelineRef = useRef(null);

  // State for counter animation
  const [counters, setCounters] = useState(metrics.map(() => "0"));

  // Counter animation effect using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            metrics.forEach((metric, idx) => {
              const targetValue = metric.value;
              const numericMatch = targetValue.match(/\d+(?:\.\d+)?/);
              if (!numericMatch) return;

              const targetNum = parseInt(numericMatch[0]);
              const suffix = targetValue.replace(/[\d\.]/g, "");
              const duration = 1500;
              const stepTime = 20;
              const steps = duration / stepTime;
              const increment = targetNum / steps;
              let current = 0;

              const timer = setInterval(() => {
                current += increment;
                if (current >= targetNum) {
                  setCounters((prev) => {
                    const newCounters = [...prev];
                    newCounters[idx] = `${targetNum}${suffix}`;
                    return newCounters;
                  });
                  clearInterval(timer);
                } else {
                  setCounters((prev) => {
                    const newCounters = [...prev];
                    newCounters[idx] = `${Math.floor(current)}${suffix}`;
                    return newCounters;
                  });
                }
              }, stepTime);
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 },
    );

    if (metricsRef.current) {
      observer.observe(metricsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Fade-in content
      gsap.fromTo(
        ".fade-up",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 75%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => {
      // Clean up ScrollTriggers
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.vars?.trigger === contentRef.current ||
          trigger.vars?.trigger === principlesRef.current ||
          trigger.vars?.trigger === timelineRef.current
        ) {
          trigger.kill();
        }
      });
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen py-24 px-6 md:px-12 lg:px-24 overflow-hidden"
      style={{
        background: "var(--gradient-matte)",
        color: "var(--text-primary)",
      }}
    >
      {/* Background */}
      <div className="fixed inset-0 -z-10" aria-hidden="true">
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
            backgroundSize: "90px 90px",
          }}
        />
      </div>

      <div ref={contentRef} className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <header className="mb-16 fade-up opacity-0">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: "var(--accent)" }} />
            <span className="text-xs tracking-[0.3em] text-muted font-medium">
              ABOUT
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl tracking-tight">
            <span className="text-primary font-light">Systems you can</span>
            <br />
            <span className="text-accent font-medium">depend on.</span>
          </h2>
        </header>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-16">
          {/* LEFT COLUMN: Bio + Principles */}
          <div>
            {/* Profile + short bio */}
            <div className="fade-up opacity-0">
              <figure className="relative w-24 h-24 mb-6">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "var(--gradient-metal)",
                    border: "1px solid var(--border-light)",
                  }}
                />
                <div className="relative w-full h-full rounded-full overflow-hidden border border-light">
                  <Image
                    src="/personal/image.webp"
                    alt="Vishal Singh"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </figure>

              <p className="text-lg leading-relaxed text-secondary mb-4">
                I'm{" "}
                <span className="text-primary font-medium">Vishal Singh</span>,
                a full-stack developer focused on building{" "}
                <span className="text-primary">
                  scalable backend systems, APIs, and AI-powered applications
                </span>
                .
              </p>

              <p className="text-secondary mb-6 leading-relaxed">
                I have 4+ years of experience working across web, mobile, and
                backend systems using JavaScript, TypeScript, and Python. My
                work includes building transaction systems, automation
                workflows, and AI-driven platforms using RAG pipelines and LLM
                integrations. I focus on writing reliable, production-ready code
                with proper validation, error handling, and system design
                practices.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Metrics + Experience */}
          <div>
            {/* Timeline */}
            <div ref={timelineRef} className="fade-up opacity-0">
              <h3 className="text-sm font-medium text-muted uppercase tracking-wider mb-5 flex items-center gap-2">
                <Briefcase size={14} className="text-accent" />
                Experience
              </h3>
              <div className="space-y-6">
                {experiences.map((exp, idx) => (
                  <div
                    key={idx}
                    className="relative pl-5"
                    style={{ borderLeft: "1px solid var(--border-light)" }}
                  >
                    <div
                      className="absolute -left-[5px] top-1 w-2 h-2 rounded-full"
                      style={{ background: "var(--accent)" }}
                    />
                    <div className="flex flex-wrap items-baseline justify-between gap-1 mb-1">
                      <h4 className="text-sm font-medium text-primary">
                        {exp.title}
                      </h4>
                      <span className="text-[10px] text-muted">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-xs text-secondary mb-1">{exp.company}</p>
                    <p className="text-xs text-muted mb-2 leading-relaxed">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      <span
                        className="text-[9px] px-1.5 py-0.5 rounded"
                        style={{
                          background: "rgba(59, 130, 246, 0.1)",
                          color: "var(--accent)",
                        }}
                      >
                        {exp.highlight}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA to case studies */}
            <div className="fade-up opacity-0 mt-8">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-sm transition-all"
                style={{ color: "var(--accent)" }}
              >
                <span>View detailed case studies</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
