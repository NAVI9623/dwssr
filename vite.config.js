import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from 'node.path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '#components': resolve(__dirname, 'src/components'),
      '#pages': resolve(__dirname, 'src/pages'),
      '#assets': resolve(__dirname, 'src/assets'),
      '#utils': resolve(__dirname, 'src/utils'),
    },
  },
})