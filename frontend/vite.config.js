import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://full-stack-booking-application.onrender.com',
        changeOrigin: true,
      },
    },
  },
})
