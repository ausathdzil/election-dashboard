import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    qualities: [75, 100],
  },
  transpilePackages: ['echarts', 'zrender'],
  typedRoutes: true,
};

export default nextConfig;
