import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import GiantCursor from "@/components/GiantCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const bricolage_grotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Evan Sinocchi",
  description: "Portfolio of Evan Sinocchi, a passionate full stack developer specializing in React, Node.js, and modern web technologies. Explore my projects, experience, and skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${bricolage_grotesque.variable} antialiased`}
      >
        <GiantCursor />
        {children}
      </body>
    </html>
  );
}
