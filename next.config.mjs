// In Next.js, you should use either domains or remotePatterns, but not both in the same configuration.

// next.config.js// next.config.mjs
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com", // Allow specific hostname
      },
      {
        protocol: "https",
        hostname: "*", // Allow any hostname (use cautiously)
      },
    ],
  },

  experimental:{
    ppr:"incremental",
    after:true,
  },

  devIndicators:{
    appIsrStatus: true,
    buildActivity: true,
    buildActivityPosition :"bottom-right",
  },


};

export default nextConfig;
