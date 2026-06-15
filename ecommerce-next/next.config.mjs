/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Skip the built-in image proxy in dev: it has a ~7s upstream-fetch
    // timeout that's brittle for large Unsplash images on first load and
    // was returning 500s for the hero. Browser fetches direct from
    // Unsplash. In a production deploy, swap this off and run behind a
    // CDN that can cache the optimized variants.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
