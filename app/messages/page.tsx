'use client'

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

interface Message {
  id: number;
  content: string;
}

const socket = io('http://localhost:3001'); // Replace with your server URL

const Index: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  useEffect(() => {
    // Listen for incoming messages
    socket.on('chat message', (message: string) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length, content: message },
      ]);
    });
  }, []);

  const sendMessage = () => {
    socket.emit('chat message', newMessage);
    setNewMessage('');
  };

  return (
    <div>
      <h1>Real-Time Chat</h1>
      <div>
        {messages.map((message) => (
          <div key={message.id}>{message.content}</div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Index;