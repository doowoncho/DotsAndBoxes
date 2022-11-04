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
    if (element.target.id !== '') {
        squareChecker(element)
    }
  }
);

//if i want the hover effect with colors

// document.addEventListener('mouseover', (element) =>
//   {
//     if ((element.target.id[0] == 'h' || element.target.id[0] == 'v')) {
//         element.target.style.background= getColor()
//     }
     
//   }
// );

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

// function scoreTracker(){
//   if(turn == 0)p2+=1
//   if(turn == 1)p3+=1
//   if(turn == 2)p1+=1
// }

function squareChecker(element){
  let id = element.target.id;
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
          try{
            h[parseInt(row)+4][0] = 1
          }
          catch{

          }

         square = document.getElementById(isSquare(id))
         if (square != null) {
          square.style.background = getColor()
          turn-=1

        }
        colorChange(element)
        }
      }
      else{
        if(v[parseInt(row)][parseInt(col)] == 0){
            v[parseInt(row)][parseInt(col)] = 1
            if(id != "v00" && id != "v40" &&id != "v80" ){
              try{
                v[parseInt(row)+1][0] = 1
              }
              catch{

              }
            }
          colorChange(element)
          square = document.getElementById(isSquare(id))
          if (square != null) {
            square.style.background = getColor()
            turn -=1
          }
      }
  }

    turnTracker()
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