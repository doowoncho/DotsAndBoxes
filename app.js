turn = 0
score = document.getElementById("scoreDislay")
p1Display = document.getElementById("p1Display")
p2Display = document.getElementById("p2Display")
p3Display = document.getElementById("p3Display")
turnDisplay = document.getElementById("turnDisplay")


p1 = 0
p2 = 0
p3 = 0

v = [[0,0],[0,0],[0,0],[0,0], [0,0],[0,0],[0,0],[0,0], [0,0],[0,0],[0,0],[0,0], [0,0],[0,0],[0,0],[0,0]]
h = [[0,0],[0,0],[0,0],[0,0], [0,0],[0,0],[0,0],[0,0], [0,0],[0,0],[0,0],[0,0], [0,0],[0,0],[0,0],[0,0]]

//need a way to reliably figure out a square is full or not
//then we basically done tho lmao

document.addEventListener('click', (element) =>
  {
    if (element.target.id[0] == 'h' || element.target.id[0] == 'v') {
        squareChecker(element)
    }
  }
);

function colorChange(element){
  element.target.style.background= "black"
  element.target.style.opacity='1'
}

function getColor(){
  if(turn == 0) return 'blue'
  else if(turn == 1) return'red'
  else if(turn == 2) {
    return 'green'
  }
  return
}

function turnTracker(){
  turn ++
  if(turn >2){
    turn = 0
  }

  if(turn == 0)turnDisplay.innerHTML ="Player 1's turn"
  if(turn == 1)turnDisplay.innerHTML ="Player 2's turn"
  if(turn == 2)turnDisplay.innerHTML ="Player 3's turn"

  return turn
}

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

function squareChecker(element){
  let id = element.target.id;
  if(id[3] != null){
    row = id[1]+id[2]
    console.log(row)
    col = id[3]
  }else{
    row = id[1]
    col = id[2]
  }

   if(id[0]=='h'){
      if(h[parseInt(row)][parseInt(col)] == 0){
         h[parseInt(row)][parseInt(col)] = 1
         turnTracker()
          if(id != "h10" && id != "h00" && id != "h20" && id != "h30")
          try{
            h[parseInt(row)+4][0] = 1
          }
          catch{

          }

          colorChange(element)
          square = document.getElementById(isSquare(id))
          if (square != null) {
            square.style.background = getColor()
            scoreTracker()
            square = document.getElementById(isSquare(id))
            if (square != null) {
              scoreTracker()
              square.style.background = getColor()
            }
            turn -=1
          }
        }
      }
      else{
        if(v[parseInt(row)][parseInt(col)] == 0){
            v[parseInt(row)][parseInt(col)] = 1
            turnTracker()
            if(id != "v00" && id != "v40" &&id != "v80" &&id != "v71"  &&id != "v111" &&id != "v31" &&id != "v151"&&id != "v120"){
              try{
                v[parseInt(row)+1][0] = 1
                console.log(v)
              }
              catch{

              }
            }
            colorChange(element)
            square = document.getElementById(isSquare(id))
            if (square != null) {
              square.style.background = getColor()
              scoreTracker()
              square = document.getElementById(isSquare(id))
              if (square != null) {
                scoreTracker()
                square.style.background = getColor()
              }
              turn -=1
            }
      }
  }
    gameEnd()
    
}

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


function checkWinner(){
  winner = Math.max(p1,p2,p3)
  console.log(winner)
  if(winner == p1) return 'Player 1'
  else if(winner == p2) return'Player 2'
  else if(winner == p3) {
    return 'Player 3'
  }
}

let popup = document.getElementById("popup");
let winner = document.getElementById("winner")
function openPopup(){
    winner.innerHTML = `The winner is ${checkWinner()}`
    popup.classList.add("open-popup");
}

function closePopup(){
    popup.classList.remove("open-popup");
}
