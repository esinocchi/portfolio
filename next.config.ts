import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Editor uploads go through a server action. Vercel caps request bodies at 4.5 MB,
    // and the upload action enforces its own limit per storage mode.
    serverActions: { bodySizeLimit: "50mb" },
  },
  // Posts written in the editor are read from disk when writing pages render.
  outputFileTracingIncludes: {
    "/writing/**": ["./content/writing/**/*"],
    "/": ["./content/writing/**/*"],
    "/sitemap.xml": ["./content/writing/**/*"],
  },
};

export default nextConfig;
