import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
// da implementare controllo su variabile di ambiente
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000';

export const socket = io(URL);