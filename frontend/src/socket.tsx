import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
// da implementare controllo su variabile di ambiente


const VITE_APP_BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL || 'http://localhost:3000';
console.log('VITE_APP_BACKEND_URL:', VITE_APP_BACKEND_URL);
export const socket = io(VITE_APP_BACKEND_URL);