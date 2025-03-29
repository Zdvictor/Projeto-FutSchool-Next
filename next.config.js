/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
  images: {
    domains: ['ui-avatars.com', 'i.pravatar.cc', 'img.freepik.com', 'img.icons8.com']
  },
}

module.exports = nextConfig 