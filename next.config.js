/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['api.stability.ai', 'replicate.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig
