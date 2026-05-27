"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";

// Highlight.js for code
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

// ShadCN UI components
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const BlogDetailPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [processedContent, setProcessedContent] = useState(null);
  const [loading, setLoading] = useState(true);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [replyName, setReplyName] = useState("");
  const [replyEmail, setReplyEmail] = useState("");

  // Fetch blog and comments
  useEffect(() => {
    if (!slug) return;

    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${slug}`);
        const data = await res.json();
        if (!data.error) setBlog(data);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/blogs/${slug}/comments`);
        const data = await res.json();
        if (!data.error) setComments(data);
      } catch (err) {
        console.error("Failed to fetch comments:", err);
      }
    };

    fetchBlog();
    fetchComments();
  }, [slug]);

  // Process blog content (wrap images)
  useEffect(() => {
    if (!blog?.content) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(blog.content, "text/html");

    doc.querySelectorAll("img").forEach((img) => {
      if (img.closest(".img-container-blog")) return;
      const wrapper = document.createElement("div");
      wrapper.className = "img-container-blog";
      img.replaceWith(wrapper);
      wrapper.appendChild(img);
    });

    setProcessedContent(doc.body.innerHTML);
  }, [blog?.content]);

  // Highlight code after content is set
  useEffect(() => {
    if (!processedContent) return;
    document.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightElement(block);
    });
  }, [processedContent]);

  // Handle posting new comment
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/blogs/${slug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, content: newComment }),
      });

      if (res.ok) {
        const data = await res.json();
        setComments((prev) => [...prev, data]);
        setNewComment("");
        setName("");
        setEmail("");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Start reply
  const handleReply = (commentId) => {
    setReplyingTo(commentId);
    setReplyContent("");
    setReplyName("");
    setReplyEmail("");
  };

  // Submit reply
  const handleSubmitReply = async (e, parentId) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/blogs/${slug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: replyName,
          email: replyEmail,
          content: replyContent,
          parentId,
        }),
      });
      if (res.ok) {
        const newReply = await res.json();
        setComments((prev) =>
          prev.map((c) =>
            c._id === parentId
              ? { ...c, replies: [...(c.replies || []), newReply] }
              : c,
          ),
        );
        setReplyingTo(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading screen
  if (loading)
    return (
      <div
        className="flex items-center justify-center h-screen"
        style={{ background: "var(--gradient-matte)" }}
      >
        <div className="relative">
          <div
            className="w-12 h-12 rounded-full animate-spin"
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
    );

  // 404 if no blog
  if (!blog)
    return (
      <div
        className="flex flex-col items-center justify-center h-screen text-center px-4"
        style={{
          background: "var(--gradient-matte)",
          color: "var(--text-primary)",
        }}
      >
        <h1
          className="text-3xl sm:text-4xl font-bold mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          404 — Not Found
        </h1>
        <p className="mb-4" style={{ color: "var(--text-muted)" }}>
          We couldn't find that blog.
        </p>
        <Link
          href="/blogs"
          className="px-4 py-2 rounded-full transition-all duration-300 hover:scale-[1.02] inline-flex items-center gap-2"
          style={{
            background: "var(--gradient-metal)",
            border: "1px solid var(--border-light)",
            color: "var(--accent)",
          }}
        >
          ← Back to Blogs
        </Link>
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen px-4 py-10 max-w-5xl mx-auto pt-24"
      style={{
        background: "var(--gradient-matte)",
        color: "var(--text-primary)",
      }}
    >
      {/* Back Button */}
      <div className="mb-10">
        <Link
          href="/blogs"
          className="cursor-pointer inline-flex items-center gap-2 text-sm transition-colors hover:text-white/80"
          style={{ color: "var(--accent)" }}
        >
          ← Back to Blogs
        </Link>
      </div>

      {/* Blog Header */}
      <h1
        className="text-2xl sm:text-4xl font-light mb-2 break-words"
        style={{ color: "var(--text-primary)" }}
      >
        {blog.title}
      </h1>
      <p
        className="text-sm italic border-l-4 pl-3 mb-6"
        style={{ color: "var(--text-muted)", borderLeftColor: "var(--accent)" }}
      >
        Published on {blog.date}
      </p>

      {/* Blog Content */}
      <div
        className="rounded-3xl p-4 sm:p-6 mb-10"
        style={{
          background: "var(--gradient-metal)",
          border: "1px solid var(--border-light)",
        }}
      >
        <article
          className="prose max-w-none prose-pre:overflow-x-auto prose-pre:rounded-xl prose-pre:p-4 prose-img:rounded-xl break-words"
          dangerouslySetInnerHTML={{ __html: processedContent }}
        />
      </div>

      {/* Comments Section */}
      <div
        className="rounded-3xl p-4 sm:p-6 mb-10"
        style={{
          background: "var(--gradient-metal)",
          border: "1px solid var(--border-light)",
        }}
      >
        <h2
          className="text-xl sm:text-2xl font-light mb-6"
          style={{ color: "var(--text-primary)" }}
        >
          Comments ({comments.length})
        </h2>

        {comments.length > 0 ? (
          <div className="space-y-6">
            {comments.map((comment) => (
              <div
                key={comment._id}
                className="rounded-xl p-4"
                style={{
                  background: "var(--bg-light)",
                  border: "1px solid var(--border-light)",
                }}
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">
                  <h3
                    className="font-medium text-sm"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {comment.name}
                  </h3>
                  <span
                    className="text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p
                  className="text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {comment.content}
                </p>
                <button
                  className="mt-2 text-xs transition-colors hover:text-white/80"
                  style={{ color: "var(--accent)" }}
                  onClick={() => handleReply(comment._id)}
                >
                  Reply
                </button>

                {comment.replies?.length > 0 && (
                  <div
                    className="ml-2 sm:ml-4 mt-4 pl-2 sm:pl-4 space-y-3"
                    style={{ borderLeft: "2px solid var(--border-light)" }}
                  >
                    {comment.replies.map((reply) => (
                      <div
                        key={reply._id}
                        className="p-3 rounded-lg"
                        style={{
                          background: "var(--bg-light)",
                          border: "1px solid var(--border-light)",
                        }}
                      >
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1 gap-1">
                          <span
                            className="font-medium text-sm"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            {reply.name}
                          </span>
                          <span
                            className="text-xs"
                            style={{ color: "var(--text-muted)" }}
                          >
                            {new Date(reply.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p
                          className="text-sm"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {reply.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {replyingTo === comment._id && (
                  <form
                    className="mt-4 ml-2 sm:ml-4 p-4 rounded-xl space-y-2"
                    style={{
                      background: "var(--gradient-metal)",
                      border: "1px solid var(--border-light)",
                    }}
                    onSubmit={(e) => handleSubmitReply(e, comment._id)}
                  >
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Input
                        required
                        placeholder="Your name"
                        value={replyName}
                        onChange={(e) => setReplyName(e.target.value)}
                        className="bg-white/5 border-white/10 text-white/90 placeholder:text-white/30"
                        style={{
                          background: "var(--input-bg)",
                          borderColor: "var(--input-border)",
                          color: "var(--text-primary)",
                        }}
                      />
                      <Input
                        required
                        type="email"
                        placeholder="your@email.com"
                        value={replyEmail}
                        onChange={(e) => setReplyEmail(e.target.value)}
                        className="bg-white/5 border-white/10 text-white/90 placeholder:text-white/30"
                        style={{
                          background: "var(--input-bg)",
                          borderColor: "var(--input-border)",
                          color: "var(--text-primary)",
                        }}
                      />
                    </div>
                    <Textarea
                      required
                      rows={2}
                      placeholder="Your reply..."
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      className="bg-white/5 border-white/10 text-white/90 placeholder:text-white/30"
                      style={{
                        background: "var(--input-bg)",
                        borderColor: "var(--input-border)",
                        color: "var(--text-primary)",
                      }}
                    />
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto cursor-pointer"
                        style={{
                          background: "var(--gradient-accent)",
                          color: "var(--bg-darker)",
                        }}
                      >
                        {isSubmitting ? "Replying..." : "Post Reply"}
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setReplyingTo(null)}
                        className="cursor-pointer"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="italic" style={{ color: "var(--text-muted)" }}>
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>

      {/* New Comment Form */}
      <div
        className="rounded-3xl p-4 sm:p-6"
        style={{
          background: "var(--gradient-metal)",
          border: "1px solid var(--border-light)",
        }}
      >
        <h2
          className="text-xl sm:text-2xl font-light mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          Join the Discussion
        </h2>
        <form onSubmit={handleSubmitComment} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Your name"
              className="bg-white/5 border-white/10 text-white/90 placeholder:text-white/30"
              style={{
                background: "var(--input-bg)",
                borderColor: "var(--input-border)",
                color: "var(--text-primary)",
              }}
            />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
              className="bg-white/5 border-white/10 text-white/90 placeholder:text-white/30"
              style={{
                background: "var(--input-bg)",
                borderColor: "var(--input-border)",
                color: "var(--text-primary)",
              }}
            />
          </div>
          <Textarea
            rows={4}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
            placeholder="Share your thoughts..."
            className="bg-white/5 border-white/10 text-white/90 placeholder:text-white/30"
            style={{
              background: "var(--input-bg)",
              borderColor: "var(--input-border)",
              color: "var(--text-primary)",
            }}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer"
            style={{
              background: "var(--gradient-accent)",
              color: "var(--bg-darker)",
            }}
          >
            {isSubmitting ? "Posting..." : "Post Comment"}
          </Button>
        </form>
      </div>

      {/* Global styles for prose content */}
      <style jsx global>{`
        .prose {
          color: var(--text-secondary) !important;
        }
        .prose h1,
        .prose h2,
        .prose h3,
        .prose h4 {
          color: var(--text-primary) !important;
        }
        .prose p {
          color: var(--text-secondary) !important;
        }
        .prose code {
          color: var(--accent) !important;
          background: var(--accent-muted) !important;
        }
        .prose pre {
          background: var(--bg-darker) !important;
          border: 1px solid var(--border-light) !important;
        }
        .prose blockquote {
          border-left-color: var(--accent) !important;
          color: var(--text-muted) !important;
        }
        .prose a {
          color: var(--accent) !important;
        }
        .prose a:hover {
          color: var(--accent-light) !important;
        }
        .prose strong {
          color: var(--text-primary) !important;
        }
        .prose hr {
          border-color: var(--border-light) !important;
        }
        .img-container-blog {
          background: var(--bg-light) !important;
          border: 1px solid var(--border-light) !important;
        }
      `}</style>
    </motion.div>
  );
};

export default BlogDetailPage;
