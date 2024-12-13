// next.config.js
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["avatars.githubusercontent.com"], // Add the domain here
  },
};

export default nextConfig;
