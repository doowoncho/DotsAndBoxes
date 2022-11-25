const socket = io('http://localhost:3000')

socket.on('connect', () =>{
        // message = socket.id
        // const div = document.createElement("div")
        // div.textContent = message
        // document.getElementById('passContainer')
    console.log("You have connected" + ` your id is ${socket.id}`)
})

socket.on('changeTurn', (turn, dataH, dataV) => {
    setTurn(turn);
    console.log(h,v)
})

socket.on('changeScore', () =>{
    scoreTracker()
})

function createRoom(){
    socket.emit("roomCreate")
}