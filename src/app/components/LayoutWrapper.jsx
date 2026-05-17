"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import BackButton from "./common/BackButton";
import { Toaster } from "@/components/ui/sonner";
import { motion } from "framer-motion";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  // Full-screen routes without layout elements
  const fullScreenRoutes = [
    "/trade-ai",
    "/test",
    "/projects/playground/project-dashboard",
    "/projects/playground/scroll-storytelling",
    "/projects/playground/product-demo",
    "/projects/playground/3d-viewer",
    "/ai-agents",
    "/ai-agent-builder",
    "/apps/live-chat",
  ];

  const isFullScreen = fullScreenRoutes.includes(pathname);

  useEffect(() => {
    const root = document.documentElement;
    // Remove ALL custom classes
    // root.className = "theme-blue";

    if (
      pathname.startsWith("/test") ||
      pathname.includes("/projects/playground/") ||
      pathname === "/ai-agent-builder" ||
      pathname === "/docs"
    ) {
      //root.classList.add("test-theme");
    } else {
      //root.classList.add("app-theme");
    }
  }, [pathname]);

  return (
    <>
      {!isFullScreen && <Navbar />}
      {!isFullScreen && <BackButton label="Back" />}
      {/* {!isFullScreen && <ResumeButton />} */}

      <main
        className={
          isFullScreen
            ? "h-screen w-screen overflow-y-auto"
            : "relative pt-0 z-10"
        }
      >
        {/* Glowing radial blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div
            className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-white/5 blur-3xl rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{
              duration: 12,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
          <motion.div
            className="absolute bottom-[15%] right-[5%] w-[500px] h-[500px] bg-white/10 blur-3xl rounded-full"
            animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.15, 0.08] }}
            transition={{
              duration: 14,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
          <motion.div
            className="absolute top-[40%] right-[30%] w-[300px] h-[300px] bg-white/5 blur-2xl rounded-full"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 18, repeat: Infinity }}
          />
        </div>

        {/* Animated radial-gradient sweep */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              background: [
                "radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 60%)",
                "radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.05) 0%, transparent 60%)",
                "radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 60%)",
              ],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </div>

        {/* Children content wrapped with z-index */}
        <div className="relative z-10">{children}</div>
      </main>

      <div className="fixed bottom-4 right-4 z-[9999]">
        <Toaster />
      </div>
    </>
  );
}
