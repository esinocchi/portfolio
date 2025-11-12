import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import GiantCursor from "@/components/GiantCursor";
import { Analytics } from "@vercel/analytics/react";

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: "Evan Sinocchi",
  description: "Portfolio of Evan Sinocchi",
  openGraph: {
    title: "Evan Sinocchi",
    description: "Evan Sinocchi",
    images: [
      {
        url: "/profile.jpg",
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
        url: "/profile.jpg",
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
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${bricolage_grotesque.variable} antialiased`}
      >
        <GiantCursor />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
