import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["192.168.100.5"],
  images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "s4.anilist.co",
    },
  ],
},
};

export default nextConfig;
