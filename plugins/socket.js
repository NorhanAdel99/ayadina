// plugins/socket.js
import { provide, inject } from 'vue';
import io from 'socket.io-client';

const serverUrl = process.env.SERVER_URL || 'https://iadeena.com:4758';
const socket = io(serverUrl, {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  transports: ['websocket'],
});

const socketState = {
  connected: false,
  fooEvents: [],
  barEvents: [],
};

// Emit an event when the socket is connected
socket.on('connect', () => {
  socketState.connected = true;
  console.log('Socket connected');
  socket.emit('user_connected', { /* any additional data you want to send */ });
});

// Listen for a disconnect event
socket.on('disconnect', () => {
  socketState.connected = false;
  console.log('Socket disconnected');
});

// Event listener for "foo" event
socket.on('foo', (...args) => {
  socketState.fooEvents.push(args);
});

// Event listener for "bar" event
socket.on('bar', (...args) => {
  socketState.barEvents.push(args);
});

export default defineNuxtPlugin((nuxtApp) => {
    return {
        provide: {
          socket: socket,
          socketState: socketState
        },
      };
});