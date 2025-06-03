/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://backend:3000/:path*',
      },
         {
        source: '/api/second-backend/:path*',
        destination: 'http://backend2:3002/:path*',
      },
    ];
  },
};

export default nextConfig;
