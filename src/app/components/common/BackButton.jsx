"use client";

import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton({ label = "Back" }) {
  const router = useRouter();
  const pathname = usePathname();

  if (
    pathname === "/" ||
    pathname.includes("/blogs/") ||
    pathname.includes("/docs")
  ) {
    return null;
  }

  return (
    <button
      onClick={() => router.back()}
      className="
        fixed z-[9999]
        top-3 right-3
        md:left-6 md:right-auto
        flex items-center gap-2
        px-4 py-2.5
        rounded-full
        text-sm font-medium
        backdrop-blur-md
        transition-all duration-300
        group
      "
      style={{
        color: "var(--text-primary)",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Icon */}
      <ArrowLeft
        className="
          w-4 h-4
          transition-transform duration-300
          group-hover:-translate-x-1
        "
        style={{ color: "var(--accent)" }}
      />

      {/* Label */}
      <span className="hidden sm:inline text-white/70 group-hover:text-white transition-colors">
        {label}
      </span>

      {/* Hover Glow */}
      <div
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0.12), transparent 70%)",
        }}
      />
    </button>
  );
}
