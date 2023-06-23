/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: "standalone",
  compiler: {
    removeConsole: process.env.NODE_ENV === "production"
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};

module.exports = nextConfig;
