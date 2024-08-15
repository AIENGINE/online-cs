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
      ? 'http://localhost:8787'
      : 'https://summer-flower-b680.engalidanish.workers.dev/',
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.cache = false;
    }
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        maxSize: 100000, // 100 KB
      };
    }
    // Minimize all JavaScript output of chunks
    config.optimization.minimize = true;
    // Perform code splitting
    config.optimization.splitChunks.chunks = 'all';
    return config;
  },
  // Enable production mode
  productionBrowserSourceMaps: false,
  swcMinify: true,
  // Disable image optimization
  images: {
    unoptimized: true,
  },
};
