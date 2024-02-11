// server/server.ts
import http from 'http';
import { Server } from 'socket.io';


const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
  // Handle HTTP requests if needed
});

const io = new Server(server);


io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Handle chat messages
  socket.on('chat message', (message: string) => {
    io.emit('chat message', message); // Broadcast the message to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(3001, () => {
  console.log('WebSocket server listening on port 3001');
});