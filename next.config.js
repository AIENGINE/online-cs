/** @type {import('next').NextConfig} */
module.exports = {
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
        maxSize: 50000, // 50 KB
      };
    }
    config.optimization.minimize = true;
    config.optimization.splitChunks.chunks = 'all';
    // Remove moment.js locales
    config.plugins.push(new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }));
    return config;
  },
  productionBrowserSourceMaps: false,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  // Disable unnecessary features
  reactStrictMode: false,
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@mui/material', '@mui/icons-material'],
  },
  // Compress HTML and inline CSS
  compress: true,
  poweredByHeader: false,
};
