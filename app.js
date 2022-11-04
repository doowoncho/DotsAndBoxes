turn = 0

v = [[0,0],[0,0],[0,0],[0,0]]
h = [[0,0],[0,0],[0,0],[0,0]]

//need a way to reliably figure out a square is full or not
//then we basically done tho lmao

document.addEventListener('click', (element) =>
  {
    if (element.target.id !== '') {
        squareChecker(element)
    }
  }
);

function colorChange(element){
  let turn = turnTracker()
  if(turn == 0) element.target.style.background='blue'
  else if(turn == 1) element.target.style.background='red'
  else if(turn == 2) {
    element.target.style.background='green'
  }
  element.target.style.opacity='1'
}

function turnTracker(){
  turn ++
  if(turn >2){
    turn = 0
  }
  return turn
}

function squareChecker(element){
  let id = element.target.id;

   if(id[0]=='h'){
      if(h[parseInt(id[1])][parseInt(id[2])] == 0){
         h[parseInt(id[1])][parseInt(id[2])] = 1
         colorChange(element)
        
         console.log(id)
        }
      }
      else{
        if(v[parseInt(id[1])][parseInt(id[2])] == 0){
          v[parseInt(id[1])][parseInt(id[2])] = 1

          console.log(v)

          if(isSquare(id[1],id[2]))  console.log("found")
          colorChange(element)
          console.log(id)
      }
  }

}

function isSquare(x, y){
  found = true
  for(let i = 0; i< 2; i++){
      if(v[x][i] == 0) return false
  }
  return found
}