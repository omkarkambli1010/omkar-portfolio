import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  reactCompiler: true,

  sassOptions: {
    includePaths: [path.join(process.cwd(), 'src/styles')],
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 768, 1024, 1280, 1536],
    imageSizes: [64, 128, 256, 384],
  },

  experimental: {
    optimizePackageImports: ['gsap', 'lenis'],
  },
};

export default nextConfig;
