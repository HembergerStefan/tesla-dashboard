import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: { externalDir: true },  // allow ../shared
};

export default nextConfig;
