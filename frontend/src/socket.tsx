import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
// da implementare controllo su variabile di ambiente


const VITE_APP_BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL || 'https://pw-l31-unipegaso-be.marioperna.com';
export const socket = io(VITE_APP_BACKEND_URL);