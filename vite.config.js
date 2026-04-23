import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  root: './frontend',        // 👈 clave — le dice a Vite dónde está el frontend
  build: {
    outDir: './public',      // compila dentro de frontend/public/
    manifest: true,          // genera el manifest.json que necesita vite.js
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'frontend/src/main.js')
      }
    }
  },
  resolve: {
    alias: {
      '#components': resolve(__dirname, 'frontend/src/components'),
      '#pages':      resolve(__dirname, 'frontend/src/pages'),
      '#assets':     resolve(__dirname, 'frontend/src/assets'),
      '#utils':      resolve(__dirname, 'frontend/src/utils'),
    }
  }
});