import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.glb", "**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.svg"],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./attached_assets"),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    cssCodeSplit: false,
    cssMinify: false, // Disable CSS minification to avoid the escape issues
    minify: "esbuild", // Use esbuild for JS minification only
  },
})
