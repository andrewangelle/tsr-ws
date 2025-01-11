import { useEffect, useState } from 'react';

export function useWebSocket() {
  const [messages, setMessages] = useState<string[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket('/_ws');

    // const ws = new WebSocket('wss://deploy-preview-13--sleepy-williams-1461a6.netlify.app/_ws')

    ws.onopen = (e) => {
      console.log('Connection opened', e);
    };
    ws.onmessage = (event) => {
      console.log('Received message:', event.data);
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };
    ws.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };
    setWs(ws);
  }, []);

  return { messages, ws };
}
