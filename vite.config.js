import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  //kết nối với api local
  // proxy cho backend server
  server: {
    port: 3000,
    //proxy cho backend server
    proxy: {
      //proxy all requests starting with /api to backend server
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      }
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})