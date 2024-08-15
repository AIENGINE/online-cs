/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
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
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.cache = false;
    }
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
        maxSize: 60000,
      };
    }
    config.optimization.minimize = true;
    return config;
  },
  swcMinify: true,
  productionBrowserSourceMaps: false,
  experimental: {
    modularizeImports: {
      '@material-ui/core/': {
        transform: '@material-ui/core/{{ member }}',
      },
      '@material-ui/icons/': {
        transform: '@material-ui/icons/{{ member }}',
      },
    },
  },
  compress: true,
  poweredByHeader: false,
};

module.exports = withBundleAnalyzer(nextConfig);
