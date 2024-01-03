/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

const typescript = {
  typescript: {
    ignoreBuildErrors: true,
  }
}

module.exports = {
  nextConfig,
  typescript: {
    ignoreBuildErrors: true,
  },
  // pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js']
}
// {
//   webpack5: true,
//   webpack: (config) => {
//     config.resolve.fallback = { fs: false, path: false };

//     return config;
//   },
// }