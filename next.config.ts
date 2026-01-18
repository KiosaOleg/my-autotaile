import { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.auto-db.pro",
        port: "",
        pathname: "/images/**"
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "s3-eu-north-1.amazonaws.com",
        port: "",
        pathname: "/utr-detail-images/**"
      }
    ],
    formats: ["image/avif", "image/webp"]
  }
};

export default nextConfig;
