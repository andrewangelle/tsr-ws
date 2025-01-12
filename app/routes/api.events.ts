import { createAPIFileRoute } from '@tanstack/start/api';

function getRandomMessage() {
  return `data: ${Math.floor(Math.random() * 1000) + 1}\n\n`;
}
export const APIRoute = createAPIFileRoute('/api/events')({
  OPTIONS: () => {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
      },
    });
  },
  GET: () => {
    let message = getRandomMessage();

    setTimeout(() => {
      message = getRandomMessage();
    }, Math.random() * 3000);

    const response = new Response(message, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
      },
    });

    return response;
  },
});
