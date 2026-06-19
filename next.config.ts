import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Serve modern formats first (smaller payloads → faster international loads).
  // next/image already lazy-loads below-the-fold images by default.
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Gzip responses; the production build minifies CSS/JS out of the box.
  compress: true,
}

export default nextConfig
