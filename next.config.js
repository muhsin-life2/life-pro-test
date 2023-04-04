/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['life-cdn.lifepharmacy.com', 'lifeadmin-app.s3.me-south-1.amazonaws.com', 'www.lifepharmacy.com'],
  },
  experimental: {
    appDir: true
  }
}

module.exports = nextConfig
