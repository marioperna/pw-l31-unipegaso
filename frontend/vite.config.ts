import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { APP_BACKEND_URL } from './src/app.env';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: APP_BACKEND_URL,
        changeOrigin: true,
      },
    },
  },
})
