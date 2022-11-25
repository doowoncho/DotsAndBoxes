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

io.on("connection", (socket) => {
  // ...
});

httpServer.listen(3000);

io.on('connect', socket =>{
  console.log("New User")

  socket.on('moveMade', (turn, dataH, dataV) => {
      socket.broadcast.emit('changeTurn', turn, dataH, dataV)
      console.log(`Player ${turn}'s turn`)
  })


  socket.on('roomCreate', () =>{
    console.log('room created')
  })
  socket.on('score', () => {
    socket.broadcast.emit('changeScore')

  })
  
})

