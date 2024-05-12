/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bmlyrfaxilldeeoyvuqi.supabase.co",
        port: "",
        // pathname: "/t/p/**",
      },
    ],
  },
};

export default nextConfig;
