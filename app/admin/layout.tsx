import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Fraunces } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin", "latin-ext"], display: "swap", variable: "--font-inter" });
const fraunces = Fraunces({ subsets: ["latin", "latin-ext"], display: "swap", variable: "--font-fraunces" });

export const metadata: Metadata = {
  title: "Admin · MasajGO",
  robots: { index: false, follow: false, noarchive: true, nosnippet: true },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ro" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen bg-cream-50 text-ink-900 antialiased">{children}</body>
    </html>
  );
}
