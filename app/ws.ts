import { defineEventHandler, defineWebSocket } from 'vinxi/http';

export const socket = defineWebSocket({
  async upgrade(request) {
    console.log('Upgrade request', request.headers);
    return { status: 101 };
  },
  async open(peer) {
    peer.publish('test', `User ${peer} has connected!`);
    peer.send('You have connected successfully!');
    peer.subscribe('test');

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    (peer as any).token = 'test-1';

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    console.log((peer as any).token);
  },
  async message(peer, msg) {
    const message = msg.text();
    console.log('msg', peer.id, message);
    peer.publish('test', message);
    peer.send('Hello to you!');
  },
  async close(peer, details) {
    peer.publish('test', `User ${peer} has disconnected!`);
    console.log('close', peer.id, details.reason);
  },
  async error(peer, error) {
    console.log('error', peer.id, error);
  },
});

export default defineEventHandler({
  handler(e) {
    console.log('Socket handler', e);
  },
  websocket: socket,
});
