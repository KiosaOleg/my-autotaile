import { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["image.auto-db.pro", "via.placeholder.com"],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
