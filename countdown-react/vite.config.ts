import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), cssInjectedByJsPlugin()],
  server: {
    fs: {
      strict: false
    }
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'countdown-[hash].js',
        assetFileNames: 'countdown-[hash].css',
        chunkFileNames: "countdown-[hash].js",
      },
    },
  },
})