import { io } from 'socket.io-client';
import { APP_BACKEND_URL } from './app.env';

// "undefined" means the URL will be computed from the `window.location` object
// da implementare controllo su variabile di ambiente

export const socket = io(APP_BACKEND_URL);