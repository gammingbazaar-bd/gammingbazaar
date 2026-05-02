/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🔁 API Proxy (Backend routing)
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://backend.gammingbazaar.com/api/:path*",
      },
      {
        source: "/storage/:path*",
        destination: "https://backend.gammingbazaar.com/storage/:path*",
      },
    ];
  },

  // 🔀 Redirect rules
  async redirects() {
    return [
      {
        source: "/product/:slug",
        destination: "/topup/:slug",
        permanent: true,
      },

      // www → non-www redirect
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.gammingbazaar.com",
          },
        ],
        destination: "https://gammingbazaar.com/:path*",
        permanent: true,
      },
    ];
  },

  // 🖼️ Optional (safe for production images)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "backend.gammingbazaar.com",
      },
    ],
  },
};

export default nextConfig;