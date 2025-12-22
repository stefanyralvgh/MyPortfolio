/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed output: "export" to allow dynamic pages and API routes
  // If you need static export for production, use: next export command instead

  // Configure allowed origins for development
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
