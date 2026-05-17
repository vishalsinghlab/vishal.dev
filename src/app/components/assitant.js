"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { ChatBotIcon } from "./ChatIcon";
import { X } from "lucide-react";

export default function AssistantModal({ onClose }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    setMessages([
      { role: "assistant", text: "Hi, I am ViVA. How can I help you today?" },
    ]);
    return () => (document.body.style.overflow = "auto");
  }, []);

  const handleAsk = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMsg.text }),
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let result = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        result += decoder.decode(value);

        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant") {
            return [...prev.slice(0, -1), { role: "assistant", text: result }];
          }
          return [...prev, { role: "assistant", text: result }];
        });
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Something went wrong. Try again!" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{
          background: "var(--overlay-bg)",
          backdropFilter: "var(--backdrop-blur)",
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-xl h-[75vh] mx-4 flex flex-col overflow-hidden"
          style={{
            background: "var(--gradient-matte)",
            border: "1px solid var(--border-light)",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-xl)",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-5 py-4"
            style={{ borderBottom: "1px solid var(--border-light)" }}
          >
            <h2
              style={{
                color: "var(--text-muted)",
                fontSize: "0.875rem",
                letterSpacing: "0.05em",
              }}
            >
              Chat with ViVA
            </h2>

            <button
              onClick={onClose}
              className="transition-colors cursor-pointer"
              style={{ color: "var(--text-muted)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--text-primary)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-muted)")
              }
            >
              <X size={18} />
            </button>
          </div>

          {/* Chat */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            <style jsx>{`
              .chat-container::-webkit-scrollbar {
                width: 8px;
              }
              .chat-container::-webkit-scrollbar-track {
                background: transparent;
              }
              .chat-container::-webkit-scrollbar-thumb {
                background: var(--border-light);
                border-radius: 8px;
              }
              .chat-container::-webkit-scrollbar-thumb:hover {
                background: var(--border-medium);
              }
            `}</style>

            {messages.map((msg, i) => (
              <ChatMessage key={i} msg={msg} />
            ))}

            {loading && <TypingIndicator />}

            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div
            style={{
              padding: "var(--spacing-md)",
              borderTop: "1px solid var(--border-light)",
            }}
          >
            <div
              className="flex items-center gap-3 transition-all focus-within:border-opacity-100"
              style={{
                background: "var(--input-bg)",
                border: "1px solid var(--input-border)",
                borderRadius: "var(--radius-full)",
                padding: "0.75rem 1rem",
              }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAsk()}
                placeholder="Ask anything..."
                className="flex-1 bg-transparent outline-none"
                style={{
                  color: "var(--text-primary)",
                  fontSize: "0.875rem",
                }}
                disabled={loading}
              />

              <button
                onClick={handleAsk}
                disabled={loading || !input.trim()}
                className="p-2 rounded-full transition-all disabled:opacity-30"
                style={{
                  background: "var(--accent-muted)",
                  color: "var(--accent)",
                }}
                onMouseEnter={(e) => {
                  if (!loading && input.trim()) {
                    e.currentTarget.style.background = "var(--accent)";
                    e.currentTarget.style.color = "var(--bg-dark)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--accent-muted)";
                  e.currentTarget.style.color = "var(--accent)";
                }}
              >
                <FaPaperPlane className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function ChatMessage({ msg }) {
  const isUser = msg.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} gap-3`}>
      {!isUser && (
        <div style={{ paddingTop: "4px", opacity: 0.8 }}>
          <ChatBotIcon size={22} />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[75%] px-4 py-3 text-sm leading-relaxed"
        style={{
          borderRadius: "var(--radius-lg)",
          ...(isUser
            ? {
                background: "var(--accent)",
                color: "var(--bg-dark)",
                borderBottomRightRadius: "4px",
              }
            : {
                background: "var(--bg-elevated)",
                color: "var(--text-primary)",
                borderBottomLeftRadius: "4px",
                border: "1px solid var(--border-light)",
              }),
        }}
      >
        {isUser ? (
          msg.text
        ) : (
          <div
            className="prose text-sm max-w-none"
            style={{
              color: "var(--text-primary)",
              "--tw-prose-body": "var(--text-secondary)",
              "--tw-prose-headings": "var(--text-primary)",
              "--tw-prose-links": "var(--accent)",
              "--tw-prose-code": "var(--text-primary)",
            }}
          >
            <ReactMarkdown>{msg.text}</ReactMarkdown>
          </div>
        )}
      </motion.div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div
      className="flex items-center gap-2 text-sm"
      style={{ color: "var(--text-muted)" }}
    >
      <div className="flex gap-1">
        <span
          className="w-2 h-2 rounded-full animate-bounce"
          style={{ background: "var(--accent)", opacity: 0.6 }}
        />
        <span
          className="w-2 h-2 rounded-full animate-bounce"
          style={{
            background: "var(--accent)",
            opacity: 0.6,
            animationDelay: "100ms",
          }}
        />
        <span
          className="w-2 h-2 rounded-full animate-bounce"
          style={{
            background: "var(--accent)",
            opacity: 0.6,
            animationDelay: "200ms",
          }}
        />
      </div>
      ViVA is thinking...
    </div>
  );
}
