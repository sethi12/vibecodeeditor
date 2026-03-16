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
/** /** @type {import('next').NextConfig} */
const nextConfig = {
  // React Compiler – stable and recommended
  reactCompiler: true,

  // Remote images – your config is correct, but we can make it cleaner
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      // http is rarely needed and less secure – only add if you really use it
      // {
      //   protocol: 'http',
      //   hostname: '**',
      // },
    ],
  },

  // Required for WebContainer (SharedArrayBuffer) – this is correct
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
        ],
      },
    ];
  },

  // Webpack fallback – only needed in client bundles (browser)
  webpack: (config: { resolve: { fallback: any; }; }, { isServer }: any) => {
    if (!isServer) {
      // Prevents "Can't resolve 'fs'" etc. in client code
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
        crypto: false,     // often needed with Prisma/WebContainer
        stream: false,
      };
    }
    return config;
  },

  // Recommended experimental features (stable in 16.x)
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb', // good default for larger payloads
    },
    // If you want to force-disable Turbopack everywhere (recommended for stability)
    // turbopack: false,
  },

  // Production optimizations
  compress: true,
  swcMinify: true,         // yes – this IS valid and recommended
  productionBrowserSourceMaps: false, // reduces bundle size

  // Optional: if you use TypeScript aggressively
  typescript: {
    ignoreBuildErrors: false, // keep strict in production
  },

  // Optional: if you use ESLint
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;