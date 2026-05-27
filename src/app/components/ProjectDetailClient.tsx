"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  CheckCircle,
  ExternalLink,
  Code2,
  Cpu,
  Database,
  Globe,
  Layout,
  Sparkles,
  Bot,
  Plug,
  CreditCard,
  Cloud,
  Smartphone,
  MapPin,
  MessageSquare,
  Monitor,
  Video,
  Repeat,
  Zap,
  ArrowRight,
} from "lucide-react";
import ProjectGalleryClient from "./ProjectGalleryClient";

// Complete tag icon mapping
const tagIcons: Record<string, React.ReactNode> = {
  React: <Layout size={14} />,
  "Next.js": <Globe size={14} />,
  Nextjs: <Globe size={14} />,
  "Node.js": <Cpu size={14} />,
  NodeJS: <Cpu size={14} />,
  Express: <Cpu size={14} />,
  "Express.js": <Cpu size={14} />,
  MongoDB: <Database size={14} />,
  Firebase: <Sparkles size={14} />,
  TypeScript: <Code2 size={14} />,
  JavaScript: <Code2 size={14} />,
  Python: <Code2 size={14} />,
  "AI Agents": <Bot size={14} />,
  MCP: <Plug size={14} />,
  GCP: <Cloud size={14} />,
  AWS: <Cloud size={14} />,
  RAG: <Database size={14} />,
  Langchain: <Sparkles size={14} />,
  FASTAPI: <Zap size={14} />,
  FastAPI: <Zap size={14} />,
  WebRTC: <Video size={14} />,
  "Socket.io": <MessageSquare size={14} />,
  "React Native": <Smartphone size={14} />,
  Android: <Smartphone size={14} />,
  IOS: <Smartphone size={14} />,
  Electron: <Monitor size={14} />,
  WordPress: <Globe size={14} />,
  Angular: <Layout size={14} />,
  Webhook: <Plug size={14} />,
  Automation: <Repeat size={14} />,
  Tracking: <MapPin size={14} />,
  Animation: <Sparkles size={14} />,
  Vercel: <Globe size={14} />,
  "Payment Gateway": <CreditCard size={14} />,
};

// Type definitions
interface Feature {
  title: string;
  icon: React.ReactNode;
  description: string;
}

interface Metric {
  value: string;
  label: string;
  color?: string;
}

interface Project {
  title: string;
  slug: string;
  description: string;
  link?: string;
  images: string[];
  fullPageImages?: string[];
  tags: string[];
  features?: Feature[];
  contributions?: string[];
  displayImage: string;
  metrics?: Metric[];
  challenge?: string;
  results?: string[];
}

// Default metrics for projects (colors removed, will use CSS vars)
const defaultMetrics: Record<string, Metric[]> = {
  "koodums-chat": [
    { value: "10K+", label: "Daily tool calls" },
    { value: "<150ms", label: "Avg latency" },
    { value: "40%", label: "Token reduction" },
    { value: "92%", label: "Retrieval rate" },
  ],
  investoreye: [
    { value: "10K+", label: "Pages processed" },
    { value: "92%", label: "Retrieval accuracy" },
    { value: "Real-time", label: "Sentiment analysis" },
    { value: "SEC", label: "Filings" },
  ],
  resiliq: [
    { value: "5K+", label: "Req/min" },
    { value: "Exactly-once", label: "Processing" },
    { value: "HMAC", label: "Security" },
    { value: "409", label: "Conflict detection" },
  ],
  velotransact: [
    { value: "Multi-role", label: "User types" },
    { value: "Stripe", label: "Payments" },
    { value: "vAuto", label: "Inventory sync" },
    { value: "Real-time", label: "Transactions" },
  ],
};

// Default challenge text
const defaultChallenges: Record<string, string> = {
  resiliq:
    "Third-party webhook deliveries were causing duplicate orders and inventory mismatches. The system needed exactly-once processing under high concurrency.",
  "koodums-chat":
    "AI agents needed to orchestrate multiple external tools while maintaining conversational context and sub-second response times.",
  investoreye:
    "Financial analysts needed conversational querying of thousands of earnings call transcripts — keyword search wasn't enough.",
};

// Default results
const defaultResults: Record<string, string[]> = {
  resiliq: [
    "Zero duplicate orders since deployment",
    "5K req/min sustained without degradation",
    "Full auditability with trace IDs",
  ],
  "koodums-chat": [
    "10K+ daily tool calls at <150ms latency",
    "40% token reduction, 92% retrieval accuracy",
    "Successfully integrated Maps, YouTube, and APIs",
  ],
  investoreye: [
    "92% retrieval accuracy on transcripts",
    "Real-time sentiment analysis",
    "Voice assistant for conversational queries",
  ],
};

interface ProjectDetailClientProps {
  project: Project;
}

export default function ProjectDetailClient({
  project,
}: ProjectDetailClientProps) {
  const metrics = project.metrics || defaultMetrics[project.slug] || [];
  const challenge = project.challenge || defaultChallenges[project.slug];
  const results = project.results || defaultResults[project.slug];

  return (
    <main
      className="min-h-screen"
      style={{
        background: "var(--gradient-matte)",
        color: "var(--text-primary)",
      }}
    >
      {/* Hero Section - Full width with gradient */}
      <div
        className="relative overflow-hidden"
        style={{ borderBottom: "1px solid var(--border-light)" }}
      >
        {/* Background gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, var(--accent-muted), transparent, transparent)",
          }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          {/* Pre-title badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <div className="w-8 h-px" style={{ background: "var(--accent)" }} />
            <span
              className="text-[10px] tracking-[0.3em] uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              FEATURED PROJECT
            </span>
          </motion.div>

          {/* Title with gradient accent */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight mb-6 leading-[1.1]"
          >
            <span style={{ color: "var(--text-primary)" }}>
              {project.title}
            </span>
          </motion.h1>

          {/* Description with accent line */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="max-w-2xl mb-8"
          >
            <div
              className="w-12 h-px mb-4"
              style={{
                background:
                  "linear-gradient(to right, var(--accent), transparent)",
              }}
            />
            <p
              className="text-base md:text-lg leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {project.description}
            </p>
          </motion.div>

          {/* Metrics row - Glass card style */}
          {metrics.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              {metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-sm"
                  style={{
                    background: "var(--bg-light)",
                    border: "1px solid var(--border-light)",
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: "var(--accent)" }}
                  />
                  <div className="flex items-baseline gap-1.5">
                    <span
                      className="text-sm font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {metric.value}
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {metric.label}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* CTA + Tags row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="flex flex-wrap items-center gap-4"
          >
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden cursor-pointer inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                style={{
                  background: "var(--gradient-accent)",
                  color: "var(--bg-darker)",
                }}
              >
                <ExternalLink
                  size={14}
                  className="transition-transform group-hover:rotate-12"
                />
                <span>Live Demo</span>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(120deg, transparent, rgba(255,255,255,0.2), transparent)",
                    transform: "skewX(-20deg)",
                  }}
                />
              </a>
            )}

            <div className="flex flex-wrap gap-2">
              {project.tags?.slice(0, 6).map((tag, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02]"
                  style={{
                    background: "var(--bg-light)",
                    color: "var(--text-secondary)",
                    border: "1px solid var(--border-light)",
                  }}
                >
                  {tagIcons[tag] ?? (
                    <Code2 size={12} style={{ color: "var(--accent)" }} />
                  )}
                  {tag}
                </span>
              ))}
              {project.tags && project.tags.length > 6 && (
                <span
                  className="px-3 py-1.5 text-xs font-medium"
                  style={{ color: "var(--text-muted)" }}
                >
                  +{project.tags.length - 6} more
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Gallery Section - Full width image */}
      <div style={{ borderBottom: "1px solid var(--border-light)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <ProjectGalleryClient
            images={project.images}
            fullPageImages={project.fullPageImages}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Two column layout for desktop */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left: Main content (2/3 width) */}
          <div className="lg:col-span-2 space-y-12">
            {/* Challenge + Results combined */}
            {(challenge || results) && (
              <div className="space-y-6">
                {challenge && (
                  <div>
                    <h2
                      className="text-xs font-medium uppercase tracking-wider mb-3"
                      style={{ color: "var(--text-muted)" }}
                    >
                      THE CHALLENGE
                    </h2>
                    <p
                      className="text-base leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {challenge}
                    </p>
                  </div>
                )}

                {results && results.length > 0 && (
                  <div>
                    <h2
                      className="text-xs font-medium uppercase tracking-wider mb-3"
                      style={{ color: "var(--text-muted)" }}
                    >
                      OUTCOMES
                    </h2>
                    <div className="flex flex-wrap gap-3">
                      {results.map((result, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                          style={{
                            background: "var(--accent-muted)",
                            border: "1px solid var(--border-light)",
                          }}
                        >
                          <CheckCircle
                            size={12}
                            style={{ color: "var(--accent)" }}
                          />
                          <span
                            className="text-sm"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            {result}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Features - Clean grid */}
            {project.features && project.features.length > 0 && (
              <div>
                <h2
                  className="text-xs font-medium uppercase tracking-wider mb-6"
                  style={{ color: "var(--text-muted)" }}
                >
                  KEY FEATURES
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {project.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="group p-4 rounded-xl transition-all hover:bg-white/5"
                      style={{
                        border: "1px solid var(--border-light)",
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="mt-0.5"
                          style={{ color: "var(--accent)" }}
                        >
                          {feature.icon}
                        </div>
                        <div>
                          <h3
                            className="text-sm font-medium mb-1"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {feature.title}
                          </h3>
                          <p
                            className="text-xs leading-relaxed"
                            style={{ color: "var(--text-muted)" }}
                          >
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contributions */}
            {project.contributions && project.contributions.length > 0 && (
              <div>
                <h2
                  className="text-xs font-medium uppercase tracking-wider mb-6"
                  style={{ color: "var(--text-muted)" }}
                >
                  MY CONTRIBUTIONS
                </h2>
                <div className="space-y-3">
                  {project.contributions.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex gap-3 text-sm"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <CheckCircle
                        size={14}
                        className="shrink-0"
                        style={{ color: "var(--accent)" }}
                      />
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Sidebar (1/3 width) */}
          <div className="space-y-8">
            {/* Tech Stack Card */}
            {project.tags && project.tags.length > 0 && (
              <div
                className="rounded-xl p-5"
                style={{
                  background: "var(--bg-light)",
                  border: "1px solid var(--border-light)",
                }}
              >
                <h3
                  className="text-xs uppercase tracking-wider mb-4"
                  style={{ color: "var(--text-muted)" }}
                >
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs"
                      style={{
                        background: "var(--bg-light)",
                        color: "var(--text-muted)",
                      }}
                    >
                      {tagIcons[tag] ?? (
                        <Code2
                          size={12}
                          style={{ color: "var(--text-muted)" }}
                        />
                      )}
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Stats Card */}
            {metrics.length > 0 && (
              <div
                className="rounded-xl p-5"
                style={{
                  background: "var(--bg-light)",
                  border: "1px solid var(--border-light)",
                }}
              >
                <h3
                  className="text-xs uppercase tracking-wider mb-4"
                  style={{ color: "var(--text-muted)" }}
                >
                  Key Metrics
                </h3>
                <div className="space-y-3">
                  {metrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center"
                    >
                      <span
                        className="text-sm"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {metric.label}
                      </span>
                      <span
                        className="font-medium"
                        style={{ color: "var(--accent)" }}
                      >
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Card */}
            {project.link && (
              <div
                className="rounded-xl p-5 text-center"
                style={{
                  background: "var(--bg-light)",
                  border: "1px solid var(--border-light)",
                }}
              >
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium transition-all hover:gap-3"
                  style={{ color: "var(--accent)" }}
                >
                  View Live Project
                  <ExternalLink size={14} />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
