import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@designcodeio/threeui/style.css",
        replacement: path.resolve(__dirname, "src/shaders/threeui.css"),
      },
      {
        find: "@designcodeio/threeui",
        replacement: path.resolve(__dirname, "src/shaders/index.ts"),
      },
    ],
  },
  build: {
    outDir: "prod-bundle",
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
          if (id.includes("inlinedAssets") || id.includes("three.min.js")) {
            return "three-biome-assets";
          }
          if (id.includes("SylvaLivingWorldScene") || id.includes("inner-green-3d.html")) {
            return "biome-engine";
          }
        },
      },
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    allowedHosts: true,
  },
  preview: {
    host: "0.0.0.0",
    port: 4173,
    allowedHosts: true,
    headers: {
      "Cache-Control": "public, max-age=3600",
    },
  },
});
