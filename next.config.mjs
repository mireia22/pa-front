/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/static/**",
      },
      {
        protocol: "https",
        hostname: "pa-back.onrender.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
