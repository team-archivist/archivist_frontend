/** next 관련 설정파일입니다 */
const headers = [{ key: "Cache-Control", value: "public, max-age=3600" }];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  productionBrowserSourceMaps: true,

  // transpilePackages: ["@archivist/ui"],

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  /**
   * - next-js 에서 CORS 이슈를 해결하기 위해 Proxy 설정을 사용합니다
   */
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
  //     },
  //   ];
  // },
  distDir: "dist",
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Max-Age", value: "1728000" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type" },
        ],
      },
    ];
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    // config.resolve.alias = {
    //   ...config.resolve.alias,
    //   "@archivist/ui": path.resolve(__dirname, "../../packages/ui"),
    // };

    return config;
  },
};

module.exports = nextConfig;
