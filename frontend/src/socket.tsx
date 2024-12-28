import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
// da implementare controllo su variabile di ambiente

const APP_BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL as string;

if (!APP_BACKEND_URL) {
  throw new Error('VITE_APP_BACKEND_URL is not defined');
}

console.log('VITE_APP_BACKEND_URL:', APP_BACKEND_URL);

export const socket = io(APP_BACKEND_URL);