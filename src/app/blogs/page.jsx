// pages/blogs/page.jsx
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import LoginModal from "../components/Modals/LoginModal";
import { Trash, FilePenLineIcon, Send, Share2, PenLine, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const TiptapEditor = dynamic(() => import("../components/Editor"), {
  ssr: false,
});

export default function MyBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [showEditor, setShowEditor] = useState(false);
  const [form, setForm] = useState({ title: "", content: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const blogsRef = useRef(null);
  const editorRef = useRef(null);
  const loaderRef = useRef(null);
  const blogCardsRef = useRef([]);

  // Fetch blogs
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => (document.body.style.overflow = "auto"),
      });

      tl.to(loaderRef.current, {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.8,
        ease: "power4.inOut",
        delay: 1,
      })
        .to(loaderRef.current, { display: "none" }, "-=1.3")
        .fromTo(
          ".hero-line",
          { y: 100, opacity: 0, rotateX: -45 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.5,
            stagger: 0.1,
            ease: "power4.out",
          },
          "-=0.3",
        )
        .fromTo(
          ".hero-pre-title",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          "-=1",
        )
        .fromTo(
          ".hero-description",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          "-=0.8",
        )
        .fromTo(
          ".hero-cta",
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "elastic.out(1, 0.5)",
          },
          "-=0.7",
        );
    });

    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error("Failed to load blogs", err))
      .finally(() => setLoading(false));

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!blogs.length) return;

    const ctx = gsap.context(() => {
      blogCardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { y: 100, opacity: 0, rotateX: 15 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.2,
            delay: index * 0.1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: blogsRef.current,
              start: "top 80%",
            },
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [blogs]);

  const handlePost = useCallback(async () => {
    try {
      const existing = blogs.find((b) => b.title === form.title);
      const isEdit = !!existing;
      const url = isEdit ? `/api/blogs/${existing._id}` : "/api/blogs";

      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) return alert(data.error || "Something went wrong");

      setBlogs((prev) =>
        isEdit
          ? prev.map((b) => (b._id === data.blog._id ? data.blog : b))
          : [data.blog, ...prev],
      );
      setForm({ title: "", content: "" });

      gsap.to(editorRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.5,
        onComplete: () => setShowEditor(false),
      });
    } catch (err) {
      console.error(err);
      alert("Network error");
    }
  }, [blogs, form]);

  const extractImage = (content) => {
    const match = content?.match(/<img[^>]+src=["']([^"'>]+)["']/);
    return match?.[1] || null;
  };

  return (
    <>
      {/* Loader */}
      <div
        ref={loaderRef}
        className="fixed inset-0 z-[100] flex items-center justify-center"
        style={{ background: "var(--bg-darker)", transformOrigin: "top" }}
      >
        <div className="text-center relative">
          <div className="relative">
            <span
              className="text-8xl font-light tracking-tight relative z-10"
              style={{ color: "var(--text-primary)" }}
            >
              B<span style={{ color: "var(--text-muted)" }}>.</span>LOG
            </span>
            <div
              className="absolute inset-0 blur-3xl animate-pulse"
              style={{
                background: "var(--gradient-metal)",
                opacity: 0.5,
              }}
            />
          </div>
          <div className="mt-8 relative">
            <div
              className="w-32 h-px mx-auto"
              style={{
                background:
                  "linear-gradient(to right, transparent, var(--accent), transparent)",
              }}
            />
            <div
              className="w-32 h-px mx-auto mt-1 animate-pulse"
              style={{
                background:
                  "linear-gradient(to right, transparent, var(--border-light), transparent)",
              }}
            />
          </div>
          <div
            className="mt-8 text-xs tracking-[0.3em] animate-pulse"
            style={{ color: "var(--text-muted)" }}
          >
            BUILDER'S LOG
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main
        ref={containerRef}
        className="relative min-h-screen overflow-x-hidden pt-24"
        style={{
          background: "var(--gradient-matte)",
          color: "var(--text-primary)",
        }}
      >
        {showLogin && (
          <LoginModal
            onClose={() => setShowLogin(false)}
            onSuccess={() => {
              setIsLoggedIn(true);
              setShowLogin(false);
              setShowEditor(true);
            }}
          />
        )}

        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative min-h-[60vh] flex items-center px-6 md:px-12 lg:px-24"
        >
          <div className="max-w-7xl mx-auto w-full relative z-10">
            <span className="hero-pre-title inline-block text-sm tracking-[0.3em] mb-6 opacity-0">
              <span
                className="inline-block w-12 h-px mr-4 align-middle"
                style={{ background: "var(--accent)" }}
              />
              <span style={{ color: "var(--text-muted)" }}>BUILDER'S LOG</span>
            </span>
            <h1 className="mb-8">
              <div className="overflow-hidden">
                <span
                  className="hero-line block text-7xl font-light tracking-tight opacity-0 leading-[0.9]"
                  style={{ color: "var(--text-primary)" }}
                >
                  THOUGHTS
                </span>
              </div>
              <div className="overflow-hidden">
                <span
                  className="hero-line block text-7xl font-light tracking-tight opacity-0 leading-[0.9]"
                  style={{ color: "var(--text-primary)" }}
                >
                  <span
                    style={{ color: "var(--text-muted)" }}
                    className="relative"
                  >
                    & INSIGHTS
                    <span
                      className="absolute -top-4 -right-4 text-[10px] tracking-widest rotate-12"
                      style={{ color: "var(--text-muted)" }}
                    >
                      ✦ {new Date().getFullYear()}
                    </span>
                  </span>
                </span>
              </div>
            </h1>
            <div className="hero-description max-w-2xl opacity-0">
              <p
                className="text-xl md:text-2xl leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                Practical insights, real-world experiments, and lessons learned
                while shipping products.
              </p>
            </div>

            <div className="hero-cta mt-12 opacity-0">
              <button
                onClick={() =>
                  !isLoggedIn ? setShowLogin(true) : setShowEditor(!showEditor)
                }
                className="magnetic-button group relative px-8 py-4 rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: "var(--gradient-metal)",
                  border: "1px solid var(--border-light)",
                }}
              >
                <span
                  className="relative z-10 tracking-wider text-sm font-medium flex items-center gap-2 transition-colors"
                  style={{ color: "var(--text-muted)" }}
                >
                  <PenLine size={16} />
                  WRITE NEW POST
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: "var(--gradient-accent-soft)",
                  }}
                />
              </button>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
            <div className="relative">
              <div
                className="w-px h-24 mx-auto animate-scroll"
                style={{
                  background:
                    "linear-gradient(to bottom, var(--border-medium), var(--border-light), transparent)",
                }}
              />
              <div className="absolute top-20 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                <span
                  className="text-[10px] tracking-[0.3em] rotate-90 block"
                  style={{ color: "var(--text-muted)" }}
                >
                  SCROLL
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Editor Section */}
        {showEditor && (
          <div
            ref={editorRef}
            className="relative px-4 sm:px-6 md:px-12 lg:px-24 mb-16 md:mb-24"
          >
            <div className="max-w-4xl mx-auto">
              <div
                className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8"
                style={{
                  background: "var(--gradient-metal)",
                  border: "1px solid var(--border-light)",
                }}
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                  <h3
                    className="text-lg sm:text-xl md:text-2xl font-light"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {form.title ? "Continue Writing" : "New Entry"}
                  </h3>
                  <button
                    onClick={() => setShowEditor(false)}
                    className="self-end sm:self-auto p-2 rounded-full transition-colors hover:bg-white/10"
                  >
                    <X size={20} style={{ color: "var(--text-muted)" }} />
                  </button>
                </div>

                {/* Title Input */}
                <input
                  placeholder="Cosmic Title..."
                  className="w-full mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg sm:rounded-xl focus:outline-none transition-colors text-base sm:text-lg md:text-xl"
                  style={{
                    background: "var(--input-bg)",
                    border: "1px solid var(--input-border)",
                    color: "var(--text-primary)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "var(--accent)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "var(--input-border)";
                  }}
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />

                {/* Editor */}
                <div className="min-h-[250px] sm:min-h-[350px] md:min-h-[50vh] mb-6">
                  <TiptapEditor
                    immediatelyRender={false}
                    value={form.content}
                    onChange={(val) => setForm({ ...form, content: val })}
                    onClose={() => setShowEditor(false)}
                  />
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row sm:justify-end gap-3 sm:gap-4 mt-6 sm:mt-8">
                  <button
                    onClick={() =>
                      window.open(
                        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://yourdomain.com/blogs/${form.title.toLowerCase().replace(/\s+/g, "-")}`)}`,
                        "_blank",
                      )
                    }
                    className="w-full sm:w-auto magnetic-button group relative px-5 sm:px-6 py-3 rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      background: "var(--gradient-metal)",
                      border: "1px solid var(--border-light)",
                    }}
                  >
                    <span
                      className="relative z-10 text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <Share2 size={16} />
                      SHARE
                    </span>
                  </button>

                  <button
                    onClick={handlePost}
                    className="w-full sm:w-auto magnetic-button group relative px-6 sm:px-8 py-3 rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      background: "var(--gradient-metal)",
                      border: "1px solid var(--border-light)",
                    }}
                  >
                    <span
                      className="relative z-10 text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <Send size={16} />
                      <span className="hidden sm:inline">
                        LAUNCH INTO ORBIT
                      </span>
                      <span className="sm:hidden">POST</span>
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blogs Grid */}
        <section
          ref={blogsRef}
          className="relative px-6 md:px-12 lg:px-24 py-24"
        >
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-5xl md:text-6xl font-light">
                <span className="inline-block overflow-hidden">
                  <span
                    className="block animate-slide-up"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Latest
                  </span>
                </span>
                <span className="inline-block overflow-hidden ml-4">
                  <span
                    className="block animate-slide-up delay-100"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Entries
                  </span>
                </span>
              </h2>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="relative">
                  <div
                    className="w-16 h-16 rounded-full animate-spin"
                    style={{
                      border: "2px solid var(--border-light)",
                      borderTopColor: "var(--accent)",
                    }}
                  />
                  <div
                    className="absolute inset-0 blur-xl animate-pulse"
                    style={{ background: "var(--accent-muted)" }}
                  />
                </div>
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 gap-8 perspective">
                {blogs.map((blog, index) => {
                  const imageUrl = extractImage(blog.content);
                  return (
                    <div
                      key={blog._id}
                      ref={(el) => (blogCardsRef.current[index] = el)}
                      className="group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                      style={{
                        background: "var(--gradient-metal)",
                        border: "1px solid var(--border-light)",
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                        style={{
                          background:
                            "linear-gradient(135deg, var(--accent-muted), transparent)",
                        }}
                      />
                      <div
                        className="card-overlay absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                        style={{
                          background:
                            "radial-gradient(circle at 50% 50%, var(--accent-muted), transparent 50%)",
                        }}
                      />
                      <Link
                        href={`/blogs/${blog._id}`}
                        className="block relative p-6"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <span
                            className="text-sm tracking-wider"
                            style={{ color: "var(--text-muted)" }}
                          >
                            {(index + 1).toString().padStart(2, "0")}
                          </span>
                          <span
                            className="text-[10px] px-3 py-1 rounded-full"
                            style={{
                              border: "1px solid var(--border-light)",
                              background: "var(--accent-muted)",
                              color: "var(--text-muted)",
                            }}
                          >
                            {new Date(blog.date).getFullYear()}
                          </span>
                        </div>
                        {imageUrl ? (
                          <div className="w-full h-48 overflow-hidden rounded-xl mb-4">
                            <img
                              src={imageUrl}
                              alt={blog.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          </div>
                        ) : (
                          <div
                            className="w-full h-48 rounded-xl mb-4 flex items-center justify-center"
                            style={{ background: "var(--accent-muted)" }}
                          >
                            <svg
                              viewBox="0 0 64 64"
                              className="w-16 h-16"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              style={{ color: "var(--text-muted)" }}
                            >
                              <path d="M14 8h28l8 8v40H14z" />
                              <path d="M42 8v8h8" />
                              <path d="M24 30l-6 6 6 6" />
                              <path d="M40 30l6 6-6 6" />
                              <path d="M30 26l4 16" />
                            </svg>
                          </div>
                        )}
                        <h3
                          className="text-xl mb-2 font-light line-clamp-2"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {blog.title}
                        </h3>
                        <p
                          className="text-sm mb-4 line-clamp-2"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {blog.summary}
                        </p>
                        <div
                          className="flex items-center gap-2 transition-colors"
                          style={{ color: "var(--text-muted)" }}
                        >
                          <span className="text-[10px] tracking-wider">
                            READ MORE
                          </span>
                          <svg
                            className="w-3 h-3 transform group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </div>
                      </Link>

                      {isLoggedIn && (
                        <div className="absolute top-4 right-4 flex gap-2 z-10">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setForm({
                                title: blog.title,
                                content: blog.content,
                              });
                              setShowEditor(true);
                            }}
                            className="p-2 rounded-full transition-colors hover:bg-white/10 backdrop-blur-sm"
                            style={{
                              background: "var(--overlay-dark)",
                              border: "1px solid var(--border-light)",
                            }}
                          >
                            <FilePenLineIcon
                              size={14}
                              style={{ color: "var(--text-muted)" }}
                            />
                          </button>
                          <button
                            onClick={async (e) => {
                              e.preventDefault();
                              if (
                                !confirm(
                                  "Are you sure you want to delete this cosmic entry?",
                                )
                              )
                                return;
                              await fetch(`/api/blogs/${blog._id}`, {
                                method: "DELETE",
                              });
                              setBlogs((prev) =>
                                prev.filter((b) => b._id !== blog._id),
                              );
                            }}
                            className="p-2 rounded-full transition-colors hover:bg-white/10 backdrop-blur-sm"
                            style={{
                              background: "var(--overlay-dark)",
                              border: "1px solid var(--border-light)",
                            }}
                          >
                            <Trash
                              size={14}
                              style={{ color: "var(--text-muted)" }}
                            />
                          </button>
                        </div>
                      )}

                      <div
                        className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-700"
                        style={{ border: "1px solid var(--border-light)" }}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>

      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        @keyframes scroll {
          0% {
            transform: translateY(-100%);
          }
          50% {
            transform: translateY(100%);
          }
          100% {
            transform: translateY(-100%);
          }
        }
        .animate-slide-up {
          animation: slideUp 1s ease-out forwards;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .animate-scroll {
          animation: scroll 3s ease-in-out infinite;
        }
        .perspective {
          perspective: 2000px;
        }
        .parallax-layer-1,
        .parallax-layer-2,
        .parallax-layer-3 {
          will-change: transform;
        }
      `}</style>
    </>
  );
}
