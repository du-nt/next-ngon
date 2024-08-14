/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://js-post-api.herokuapp.com/api/:path*", // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;
