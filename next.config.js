/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // swcMinify: true,
  env: {
    NAME_HOST: process.env.NAME_HOST,
  },
  images: {
    domains: ['cloud.vnthread.com'],
  },
}

module.exports = nextConfig


