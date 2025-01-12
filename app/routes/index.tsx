import { createFileRoute } from '@tanstack/react-router';
import { useSSE } from '~/components/useSSE';
import { useWebSocket } from '~/components/useWebSocket';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { messages } = useWebSocket();
  const { messages: sseMsgs } = useSSE();
  return (
    <div>
      <h1>Websocket messages</h1>

      <ul>
        {messages.map((message, index) => (
          <li key={Math.random()}>{message}</li>
        ))}
      </ul>

      <h2> SSE messages </h2>
      <ul>
        {sseMsgs.map((message, index) => (
          <li key={Math.random()}>{message}</li>
        ))}
      </ul>
    </div>
  );
}
