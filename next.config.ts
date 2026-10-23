import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a self-contained .next/standalone server for a lean Docker image
  // (no node_modules copy needed at runtime). See AGENTS.md — verified against
  // node_modules/next/dist/docs/.../next-config-js/output.md.
  output: "standalone",
};

export default nextConfig;
