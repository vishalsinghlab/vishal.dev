import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";

import "./globals.css";

import { ThemeProvider } from "@/context/ThemeContext";
import LayoutWrapper from "@/app/components/LayoutWrapper";
import AssistantWrapper from "./components/AssistantWrapper";
import BackButton from "./components/common/BackButton";
import BackToTop from "./components/common/BackToTop";

// Body font
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Headings font
const heading = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Mono font
const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="app-theme theme-blue">
      <body
        className={`${inter.variable} ${heading.variable} ${mono.variable} antialiased`}
      >
        <ThemeProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </ThemeProvider>

        <BackButton />
        <BackToTop />
        <AssistantWrapper />
      </body>
    </html>
  );
}
