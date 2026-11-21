import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // Serves from /alterandsound/ on github.io, or / once custom domain is attached
  base: process.env.VITE_CUSTOM_DOMAIN === 'true' ? '/' : '/alterandsound/',
})
