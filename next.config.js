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
  compress: true,
  swcMinify: true,
  output: 'standalone',
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
        maxSize: 24 * 1024 * 1024, // 24 MiB
      };
    }
    return config;
  },
}
