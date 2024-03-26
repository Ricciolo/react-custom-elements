import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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