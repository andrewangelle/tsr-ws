import { useEffect, useState } from 'react';

export function useSSE() {
  const [messages, setMessages] = useState<string[]>([]);
  const [sse, setSSE] = useState<EventSource | null>(null);

  useEffect(() => {
    const evtSrc = new EventSource('/api/events');

    evtSrc.addEventListener('message', (event) => {
      console.log('RECEIVED', event);
      setMessages((prevMessages) => [...prevMessages, event.data]);
    });

    setSSE(evtSrc);
  }, []);

  return { messages, sse };
}
