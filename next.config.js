/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/j/:key",
        destination: "/api/j/:key"
      }
    ];
  },
};

module.exports = nextConfig;
