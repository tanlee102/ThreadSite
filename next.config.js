/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: false,
  // swcMinify: true,
  env: {
    NAME_HOST: process.env.NAME_HOST,
  }
}

module.exports = nextConfig


