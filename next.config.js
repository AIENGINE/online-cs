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
    ]
  },
  env: {
    BACKEND_URL: process.env.NODE_ENV === 'development'
      ? 'http://localhost:8787' // Local Cloudflare Worker URL
      : 'https://summer-flower-b680.engalidanish.workers.dev/', // Deployed Cloudflare Worker URL
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.cache = false;
    }
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        maxSize: 200000, // 200 KB
      };
    }
    return config;
  },
};
