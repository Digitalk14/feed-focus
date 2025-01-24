import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    loader: 'custom',
    loaderFile: './supabase-nextjs-image-loader.js',
  },
};

export default nextConfig;
