import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { APP_BACKEND_URL } from './src/app.env';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Ascolta su tutte le interfacce di rete
    port: 5173,      // La porta che vuoi esporre
    // proxy: {
    //   '/api': {
    //     target: APP_BACKEND_URL,
    //     changeOrigin: true,
    //   },
    // },
  },
})
