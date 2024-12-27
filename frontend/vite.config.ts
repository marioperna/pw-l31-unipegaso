import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Ascolta su tutte le interfacce di rete
    port: 5173,      // La porta che vuoi esporre
    proxy: {
      '/api': {
        target: process.env.VITE_APP_BACKEND_URL || 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
