import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  trailingSlash: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mega.nz',
        port: '',
        pathname: '/file/**',
      },
    ],
  },
};

export default nextConfig;
