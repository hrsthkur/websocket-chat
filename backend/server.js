import express from 'express';
import { createServer } from 'node:http';
import {Server} from 'socket.io'


const app = express();
const server = createServer(app);
const ROOM = 'group'

const io = new Server(server,{
  cors: {
    origin: '*'
  },
})

io.on('connection', (socket)=>{
    console.log("A user connectd", socket.id);

     socket.on("joinRoom",async(userName)=>{
      console.log(`${userName} joined the room`)
      
      await socket.join(ROOM)
      socket.to(ROOM).emit("roomNotice",userName)

      }) 

      socket.on('chatMessage',(msg)=>{
        socket.to(ROOM).emit('chatMessage',msg);
      })

      socket.on('typing' ,(username)=>{
        socket.to(ROOM).emit('typing',username)
      })
      socket.on('stopTyping' ,(username)=>{
        socket.to(ROOM).emit('stopTyping',username)
      })
    
})


      

     

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

server.listen(process.env.PORT || 3000, "0.0.0.0", () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
