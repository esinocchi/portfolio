import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Serif option in the writing editor. Font files load only on pages that use it.
const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://esinocchi.me'),
  title: "Evan Sinocchi",
  description: "Portfolio of Evan Sinocchi",
  openGraph: {
    title: "Evan Sinocchi",
    description: "Evan Sinocchi",
    images: [
      {
        url: "/og-home.png",
        width: 1200,
        height: 630,
        alt: "Evan Sinocchi",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Evan Sinocchi",
    description: "Evan Sinocchi",
    images: [
      {
        url: "/og-home.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
