import { defineConfig } from "vite";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  build: {
    outDir: "./public/dist",
    manifest: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/main.js"),
      },
    },
  },
  resolve: {
    alias: {
      "#components": resolve(__dirname, "src/components"),
      "#pages": resolve(__dirname, "src/pages"),
      "#assets": resolve(__dirname, "src/assets"),
      "#utils": resolve(__dirname, "src/utils"),
    },
  },
});
