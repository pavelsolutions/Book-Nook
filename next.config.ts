import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: false,
  partialPrefetching: false,
  reactCompiler: true,

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

  images: {
    remotePatterns: [
      {
        pathname: '/**',
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;