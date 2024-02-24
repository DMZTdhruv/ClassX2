/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa'
const nextConfig = {
  ...withPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
    scope: '/',
  }),
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}

export default nextConfig
