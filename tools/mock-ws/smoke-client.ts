/**
 * Smoke-test client for the mock server. Connects, runs the full
 * verify_client → client_ready → constructor → update_event flow and
 * exits after receiving N actions. Used to verify the mock end-to-end.
 */
import { io } from 'socket.io-client';

const PORT = Number(process.env.PORT) || 4545;
const TARGET_ACTIONS = Number(process.env.ACTIONS) || 2;

const socket = io(`http://localhost:${PORT}`, {
  transports: ['websocket', 'polling'],
});

let received = 0;

socket.on('connect', () => {
  console.log('[smoke] connected, emitting verify_client');
  socket.emit('verify_client', { Partner: 'smoke-test' });
});
socket.on('verified', (data: { message: string }) => {
  console.log(`[smoke] verified: ${data.message}`);
  socket.emit('client_ready', { EventId: '123456' });
});
socket.on('constructor', (data: { message: { en: string } }) => {
  console.log(`[smoke] constructor: ${data.message.en}`);
});
socket.on('update_event', (data: { message: { Action: string; Team: string; Player: string } }) => {
  received += 1;
  console.log(
    `[smoke] action #${received}: ${data.message.Action} (${data.message.Team}/${data.message.Player})`,
  );
  if (received >= TARGET_ACTIONS) {
    console.log('[smoke] ok');
    socket.disconnect();
    process.exit(0);
  }
});

setTimeout(() => {
  console.error('[smoke] timeout');
  process.exit(1);
}, 15000);
