/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
};

export default nextConfig;


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: 'standalone',
//   reactStrictMode: true,
//   async rewrites() {
//     return [
//       {
//         source: '/api/:path*',
//         destination: 'http://backend:3000/:path*',
//       },
//     ];
//   },
// };

// export default nextConfig;
