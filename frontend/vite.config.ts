import { defineConfig, ServerOptions } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/


const commonServerParams: ServerOptions = {
  host: '0.0.0.0', // Ascolta su tutte le interfacce di rete
  port: 5173,      // La porta che vuoi esporre
}


const devServer: ServerOptions = {
  ...commonServerParams,
  open: true,      // Apre il browser automaticamente
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
    }
  }
};

const prodServer: ServerOptions = {
  ...commonServerParams,
};

const serverConfig = process.env.NODE_ENV === 'production' ? prodServer : devServer;
export default defineConfig({
  plugins: [react()],
  server: {
    ...serverConfig
  },
})