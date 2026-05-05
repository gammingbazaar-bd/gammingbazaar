/** @type {import('next').NextConfig} */
const nextConfig = {
  // API Proxy
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

  // Redirects
  async redirects() {
    return [
      {
        source: "/product/garena-free-fire-indonesia-top-up-in-bangladesh",
        destination: "/topup/free-fire-diamond-top-up-indonesia",
        permanent: true,
      },
      {
        source: "/product/free-fire-indonesia-top-up",
        destination: "/topup/free-fire-diamond-top-up-indonesia",
        permanent: true,
      },
      {
        source: "/product/netflix-gift-card-turkey-tl",
        destination: "/topup/netflix-tl-gift-card-bd",
        permanent: true,
      },
      {
        source: "/product/unipin-voucher-bd-server",
        destination: "/topup/unipin-uc-buy-bd",
        permanent: true,
      },
      {
        source: "/product/free-fire-bd-membership",
        destination: "/topup/free-fire-weekly-membership-bd",
        permanent: true,
      },
      {
        source: "/product/ff-diamond-top-up",
        destination: "/topup/free-fire-top-up",
        permanent: true,
      },
      {
        source: "/product/pubg-mobile-uc-station",
        destination: "/topup/pubg-uc-top-up-bd",
        permanent: true,
      },
      {
        source: "/product/free-fire-diamond-top-up",
        destination: "/topup/free-fire-top-up",
        permanent: true,
      },
      {
        source: "/product/free-fire-diamond-top-up-bd-bkash",
        destination: "/topup/free-fire-top-up",
        permanent: true,
      },
      {
        source: "/product/free-fire-top-up-bangladesh",
        destination: "/topup/free-fire-top-up",
        permanent: true,
      },
      {
        source: "/product/fc-mobile-point-silver",
        destination: "/topup/fc-mobile-top-up-bd",
        permanent: true,
      },
      {
      source: "/shop/:path*",
      destination: "/topup",
      permanent: true,
      },
      {
        source: "/about-us/:path*",
        destination: "/about",
        permanent: true,
      },
      {
      source: "/product/:slug",
      destination: "/topup/:slug",
      permanent: true,
      },

      // www → non-www
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

  // Images
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