/** @type {import('next').NextConfig} */

const PROXY_API = process.env.PROXY_API || "http://localhost:8080";

const nextConfig = {
  reactStrictMode: false,
  productionBrowserSourceMaps: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: "/backend-api/:path*",
        destination: `${PROXY_API}/:path*`,
      },
    ];
  },
  /**
   * - next-js 에서 CORS 이슈를 해결하기 위해 Proxy 설정을 사용합니다
   */
  distDir: "dist",
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "223.130.128.93",
        port: "8080",
      },
    ],
  },
};

module.exports = nextConfig;
