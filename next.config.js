const API_URL = process.env.API_URL || "";
const WEBSITE_URL = process.env.WEBSITE_URL || "";
const NUM_MILLISECS_TO_WARN_BEFORE_LOGOUT =
  process.env.NUM_MILLISECS_TO_WARN_BEFORE_LOGOUT || "";
const NUM_MILLISECS_TO_SHOW_TIMEOUT_ALERT =
  process.env.NUM_MILLISECS_TO_SHOW_TIMEOUT_ALERT || "";
const USER_COOKIE_NAME = process.env.USER_COOKIE_NAME || "";
const BASE_PATH = process.env.BASE_PATH || "";
const ASSET_PREFIX = process.env.ASSET_PREFIX || "";

/**@type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const nextConfig = {

  env: {
    API_URL,
    WEBSITE_URL,
    NUM_MILLISECS_TO_WARN_BEFORE_LOGOUT,
    NUM_MILLISECS_TO_SHOW_TIMEOUT_ALERT,
    USER_COOKIE_NAME,
    BASE_PATH,
  },
  reactStrictMode: true,
  trailingSlash: true,
  swcMinify: true,
  basePath: BASE_PATH,
  assetPrefix: ASSET_PREFIX,
  compiler: {
    removeConsole: isProd,
  },
  images: {
    loader: "imgix",
    path: "/",
    unoptimized: true,
  },
};

module.exports = nextConfig;
