/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    BACKEND_URL: process.env.NODE_ENV === 'development'
      ? 'http://localhost:8787'
      : 'https://summer-flower-b680.engalidanish.workers.dev/',
  },
  swcMinify: true,
};

