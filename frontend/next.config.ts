import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    esmExternals: false
  },
  compiler: {
    styledComponents: true
  }
};

export default nextConfig;
