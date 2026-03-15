// import type { NextConfig } from "next";

import { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   reactCompiler: true,
//   images:{
//     remotePatterns:[
//      {
//       protocol:"https",
//       hostname:"*",
//       port:"",
//       pathname:"/**"
//      }
//     ]
//   }
// };

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  // Enable React Compiler (stable in Next.js 15+)
  reactCompiler: true,

  // Allow remote images from any HTTPS domain (you already had this)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",           // allows any domain
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "**",           // optional: allow http too (less secure)
        port: "",
        pathname: "/**",
      },
    ],
  },

  // Required for WebContainer to work (fixes SharedArrayBuffer error)
  async headers() {
    return [
      {
        // Apply to all routes
        source: "/:path*",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
        ],
      },
    ];
  },

  // Optional but recommended additions

  // Better webpack compatibility (sometimes needed with WebContainer or heavy deps)
  webpack: (config: { resolve: { fallback: any; }; }, { isServer }: any) => {
    // Fix for WebContainer + some node polyfills
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      };
    }
    return config;
  },

  // Enable experimental features (optional – good defaults for 2026)
  experimental: {
    // Better server actions & streaming
    serverActions: {
      bodySizeLimit: "2mb",
    },
    // Turbopack in dev (you can remove if you prefer --no-turbo)
    // turbopack: true,
  },

  // Optional: compress assets more aggressively
  compress: true,

  // Optional: improve production build speed
  // swcMinify: true, // Removed because it's not a valid NextConfig property
};

export default nextConfig;