import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "https://book-it-backend.vercel.app",
    },
  },
  // build: {
  //   outDir: "../backend/static",
  // },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
