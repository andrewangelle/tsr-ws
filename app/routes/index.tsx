import { createFileRoute } from '@tanstack/react-router';
import { useWebSocket } from '~/components/useWebSocket';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { messages } = useWebSocket();

  return (
    <div>
      <h1>Websocket messages</h1>

      <ul>
        {messages.map((message, index) => (
          <li key={Math.random()}>{message}</li>
        ))}
      </ul>
    </div>
  );
}
