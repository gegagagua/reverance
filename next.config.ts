import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Serve modern formats first (smaller payloads → faster international loads).
  // next/image already lazy-loads below-the-fold images by default.
  images: {
    formats: ['image/avif', 'image/webp'],
    // Whitelist the quality levels we actually request (65 for thumbnails, 75 default).
    qualities: [65, 75],
    // Optimized images are content-stable, so let the CDN cache them for a year.
    minimumCacheTTL: 31536000,
  },
  // Gzip responses; the production build minifies CSS/JS out of the box.
  compress: true,
  // Long-lived immutable caching for the static theme assets in /public/theme.
  async headers() {
    return [
      {
        source: '/theme/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ]
  },
}

export default nextConfig
