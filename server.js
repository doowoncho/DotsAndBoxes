const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors:{
    origin:"*",
    //       // allowedHeaders: ['Content-Type'],
    //       // credentials: true
  },
});

httpServer.listen(3000);

rooms = 0

io.on('connect', socket =>{
  console.log("New User")

  socket.on('moveMade', (id, code) => {
      socket.to(code).emit('changeTurn', id)
  })

  socket.on('join-room', (code) =>{
    console.log(`joined room ${code}`)
    socket.join(code)
    if((io.sockets.adapter.rooms.get(code).size) == 3) {
        socket.emit('roomFull')
    }
    if((io.sockets.adapter.rooms.get(code).size) > 3) {
      socket.leave(code)
    }
  })

  socket.on('score', (code) => {
    socket.to(code).emit('changeScore')
  })
  
})

