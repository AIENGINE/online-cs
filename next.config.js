const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
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
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 50,
        minSize: 5000,
        maxSize: 20000,
      };
    }
    config.externals = [...config.externals, 'canvas', 'jsdom'];
    return config;
  },
  swcMinify: true,
  productionBrowserSourceMaps: false,
  experimental: {
    optimizeCss: true,
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
