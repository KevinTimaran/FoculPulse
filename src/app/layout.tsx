import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FoculPulse - Smartwatch App",
  description: "Web-based interactive simulator for smartwatch app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} dark h-full`}>
      <body className="min-h-full bg-black text-[#F5F5F7] antialiased">
        {children}
      </body>
    </html>
  );
}
