import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5174,
    // En dev, les formulaires publics POSTent vers le backend de l'outil interne
    // (mêmes routes /api/public/*). En prod, Caddy fait le même reverse-proxy.
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
});
