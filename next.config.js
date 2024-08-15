/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '**'
      }
    ],
    unoptimized: true,
  },
  env: {
    BACKEND_URL: process.env.NODE_ENV === 'development'
      ? 'http://localhost:8787'
      : 'https://summer-flower-b680.engalidanish.workers.dev/',
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 30,
        minSize: 10000,
        maxSize: 25000,
      };
    }
    config.externals = [...config.externals, 'canvas', 'jsdom'];
    return config;
  },
  swcMinify: true,
  productionBrowserSourceMaps: false,
  experimental: {
    optimizeCss: true,
  },
};
