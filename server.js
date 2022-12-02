const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cookieParser = require('cookie-parser')
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

io.on('connect', socket =>{
  socket.on('moveMade', (id, code) => {
      socket.to(code).emit('changeTurn', id)
  })


  socket.on('join-room', (code, name, playerList, cb) =>{    

    socket.join(code)
    if((io.sockets.adapter.rooms.get(code).size) > 3) {
      socket.leave(code)
    }
    else{
      socket.to(code).emit('addPlayer', name)
      cb(io.sockets.adapter.rooms.get(code).size)
    }
  })

  socket.on('score', (code) => {
    socket.to(code).emit('changeScore')
  })

  socket.on('nameList', (playerList, code) =>{
    io.in(code).emit('setPlayers', playerList)
  })
})



