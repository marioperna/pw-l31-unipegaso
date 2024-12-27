import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
// da implementare controllo su variabile di ambiente

const APP_BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL as string || 'http://localhost:3000';
export const socket = io(APP_BACKEND_URL);