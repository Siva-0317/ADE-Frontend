/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Ensure proper routing
  trailingSlash: false,
  // Skip trailing slash redirect
  skipTrailingSlashRedirect: true,
  // Ensure pages are properly exported
  output: 'standalone',
}

module.exports = nextConfig
