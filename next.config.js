/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  output: "standalone",
  compiler: {
    removeConsole: process.env.NODE_ENV === "production"
  },
  images: {
    formats: ["image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.23alice.duckdns.org"
      },
      {
        protocol: "http",
        hostname: "localhost"
      }
    ],
    imageSizes: [32, 64, 96, 128, 256, 384],
    minimumCacheTTL: 2592000
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};

module.exports = nextConfig;
