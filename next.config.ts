import type { NextConfig } from "next";

// @ts-ignore: Ignore TypeScript errors in this file
const nextConfig: NextConfig = {
  images : {
    domains: [
      "api.microlink.io", // Microlink Image Preview
    ],
  },
  // Your config options here
  typescript: {
    ignoreBuildErrors: true, // Ignores TypeScript errors during the build process
  },
};

export default nextConfig;
