import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  experimental: {
    serverActions: {
      bodySizeLimit: "200mb", // ✅ allow large video uploads
    },
  },
};

export default nextConfig;
