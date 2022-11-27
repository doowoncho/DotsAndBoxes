const socket = io('http://localhost:3000')

const urlParams = new URLSearchParams(window.location.search);
const host = urlParams.get('playerType') == "host";

code = null
player = null

//logic seems to be off by a bit when someone gets a square

socket.on('connect', () =>{
        if(host == true){
            const div = document.createElement("div")
            div.textContent = "Room Code: " +"test"+socket.id
            document.getElementById('passContainer').append(div)
            code = "test"+socket.id
            socket.emit("join-room", code)     
            player = 0
          }
          else{
            openJoinPop()
            player = 1

          }
})
        
socket.on('changeTurn', (id) => {
  squareChecker(id)
})

socket.on('changeScore', () =>{
  scoreTracker()
})

socket.on('roomFull', () => {
  player = 2

})
//keeps track of the turns by increasing turn by 1 everytime a move is made
turn = 0
//the different actual displays that show scores as well ahs whos turn it is
score = document.getElementById("scoreDislay")
p1Display = document.getElementById("p1Display")
p2Display = document.getElementById("p2Display")
p3Display = document.getElementById("p3Display")
turnDisplay = document.getElementById("turnDisplay")

p1 = 0
p2 = 0
p3 = 0

//these two 2d arrays keep track of which vertical lines have been filled and which
//horizontal lines have been filled in order to see where a complete square is made
v = [[0,0],[0,0],[0,0],[0,0], [0,0],[0,0],[0,0],[0,0], [0,0],[0,0],[0,0],[0,0], [0,0],[0,0],[0,0],[0,0]]
h = [[0,0],[0,0],[0,0],[0,0], [0,0],[0,0],[0,0],[0,0], [0,0],[0,0],[0,0],[0,0], [0,0],[0,0],[0,0],[0,0]]

//checks the id of the element that is clicked!
document.addEventListener('click', (element) =>
  {
    if(turn == player){
        if (element.target.id[0] == 'h' || element.target.id[0] == 'v') {
            squareChecker(element.target.id)  
            socket.emit('moveMade', element.target.id, code)
        }
    }
  }
);

//changes the line dive that has been clicked to be black and visible
function colorChange(id){
  element = document.getElementById(id)
  element.style.background= "black"
  element.style.opacity='1'
}

//this return the correct color depending on which player's turn it is
function getColor(){
  if(turn == 0) return 'blue'
  else if(turn == 1) return'red'
  else if(turn == 2) {
    return 'green'
  }
  return
}

//this changes the turns, displays the turns as well as returns 
//which player's turn it currently is
function turnTracker(foundSquare){
  if(foundSquare == false)turn ++
  if(turn >2){
    turn = 0
  }
  turnDisplayer()
}

function turnDisplayer(){
    if(turn == 0)turnDisplay.innerHTML ="Player 1's turn"
    if(turn == 1)turnDisplay.innerHTML ="Player 2's turn"
    if(turn == 2)turnDisplay.innerHTML ="Player 3's turn"
}

//This changes the display as well as the score to keep track
//of the scores
function scoreTracker(){
  if(turn == 0){
    p1+=1
    p1Display.innerHTML =`P1: ${p1}`

  }
  if(turn == 1){
    p2+=1
    p2Display.innerHTML =`P2: ${p2}`
  }
  if(turn == 2){
    p3+=1
    p3Display.innerHTML =`P3: ${p3}`
  }
}

//this function fills in the 2d array at the correct indices and also checks
//the corresponding indices in order to see if a square is supposed to be filled or not
function squareChecker(id){
  foundSquare = false
  if(id[3] != null){
    row = id[1]+id[2]
    col = id[3]
  }else{
    row = id[1]
    col = id[2]
  }

   if(id[0]=='h'){
      if(h[parseInt(row)][parseInt(col)] == 0){
         h[parseInt(row)][parseInt(col)] = 1
        //  turnTracker()

         //this if and try block make sure to also chang    e a 0 to a 1 in the index that
         //corresponds to the adjacent square since some lines can complete more than 1 square!
         //the if is to check if it is an edge line, thus can only create 1 sqaure at most
          if(id != "h10" && id != "h00" && id != "h20" && id != "h30")
          try{
            h[parseInt(row)+4][0] = 1
          }
          catch{

          }
          colorChange(id)
          square = document.getElementById(isSquare(id))
          if (square != null) {
            square.style.background = getColor()
            scoreTracker()
            square = document.getElementById(isSquare(id))
            if (square != null) {
              scoreTracker()
              square.style.background = getColor()
            }
            foundSquare = true
          }
          turnTracker(foundSquare)
        }
      }
      else{
        if(v[parseInt(row)][parseInt(col)] == 0){
            v[parseInt(row)][parseInt(col)] = 1
            // turnTracker()
            if(id != "v00" && id != "v40" &&id != "v80" &&id != "v71"  &&id != "v111" &&id != "v31" &&id != "v151"&&id != "v120"){
              try{
                v[parseInt(row)+1][0] = 1
                console.log(v)
              }
              catch{

              }
            }
            colorChange(id)
            square = document.getElementById(isSquare(id))
            if (square != null) {
              square.style.background = getColor()
              scoreTracker()
              square = document.getElementById(isSquare(id))
              if (square != null) {
                scoreTracker()
                square.style.background = getColor()
              }
              foundSquare = true
            }
            turnTracker(foundSquare)
          }
  }
    gameEnd()
}

//this will check all corresponding indices of the id of the div that has been 
//clicked and thus will return which square has been filled, if any!
function isSquare(){
  for(let i = 0; i< h.length; i++){
      if((v[i][0] == 1 && v[i][1] == 1 && h[i][0] == 1 && h[i][1] == 1)){
        v[i][0] = 2
        v[i][1] = 2
        h[i][0] = 2
        h[i][1] = 2
        return i
      } 

      //every combination that could occur between a pre-finished square and a newly finished one
      if((v[i][0] == 2 && v[i][1] == 1 && h[i][0] == 1 && h[i][1] == 1)){
        v[i][0] = 2
        v[i][1] = 2
        h[i][0] = 2
        h[i][1] = 2
        return i
      } 
      if((v[i][0] == 1 && v[i][1] == 2 && h[i][0] == 1 && h[i][1] == 1)){
        v[i][0] = 2
        v[i][1] = 2
        h[i][0] = 2
        h[i][1] = 2
        return i
      } 
      if((v[i][0] == 1 && v[i][1] == 1 && h[i][0] == 2 && h[i][1] == 1)){
        v[i][0] = 2
        v[i][1] = 2
        h[i][0] = 2
        h[i][1] = 2
        return i
      } 
      if((v[i][0] == 1 && v[i][1] == 1 && h[i][0] == 1 && h[i][1] == 2)){
        v[i][0] = 2
        v[i][1] = 2
        h[i][0] = 2
        h[i][1] = 2
        return i
      } 
  }
  return null
}

//checks both 2d arrays to see if there are no more lines to be clicked!
function gameEnd(){

  end = true
  count = 0

  for(let i = 0; i< h.length; i++){
    for(let j = 0; j< 2; j++){
      if (h[i][j] == 0){
          end = false
      }
    }
  }
  for(let i = 0; i< v.length; i++){
    for(let j = 0; j< 2; j++){
      if (v[i][j] == 0){
          end = false
      }
    }
  }

  if(end == true){
    openPopup()
  }

}

//finds the highest score and returns who the winner is accordingly!
function checkWinner(){
  winner = Math.max(p1,p2,p3)
  console.log(winner)
  if(winner == p1) return 'Player 1'
  else if(winner == p2) return'Player 2'
  else if(winner == p3) {
    return 'Player 3'
  }
}

//creates a popup that displays the winning player
let popup = document.getElementById("popup");
let winner = document.getElementById("winner")
function openPopup(){
    winner.innerHTML = `The winner is ${checkWinner()}`
    popup.classList.add("open-popup");
}

function closePopup(){
    popup.classList.remove("open-popup");
}


let join = document.getElementById("joinPop");
function openJoinPop(){
  join.classList.add("open-popup");
}

function closeJoinPop(){
  let input = document.getElementById("code");
  code = input.value
  socket.emit("join-room", code)
  join.classList.remove("open-popup");
}