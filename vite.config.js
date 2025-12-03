import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  base: "./",
  server: {
    proxy: {
      '/apiv2': {
        target: 'http://192.168.0.205:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/apiv2/, ''),
      },
      '/img': {
        target: 'http://localhost:5173', 
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/images/, ''),
      },
    },
  },
})
