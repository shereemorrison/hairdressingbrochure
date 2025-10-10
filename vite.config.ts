import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { VitePWA } from 'vite-plugin-pwa'
import path from "path"

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['assets/logo.webp', 'assets/bendigoLogo.webp'],
      manifest: {
        name: 'Celebrate Hairdressing - Bendigo TAFE',
        short_name: 'Hairdressing',
        description: 'A modern, interactive brochure for Bendigo TAFE\'s hairdressing program.',
        theme_color: '#000000',
        background_color: '#000000',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: '/assets/logo.webp',
            sizes: '192x192',
            type: 'image/webp',
            purpose: 'any maskable'
          },
          {
            src: '/assets/logo.webp',
            sizes: '512x512',
            type: 'image/webp',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,webp,png,jpg,jpeg,svg,glb,json}'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB (your bundle is ~3.7MB)
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
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
