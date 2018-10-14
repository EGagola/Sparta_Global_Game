var diceNum;
var turnCount = 0;
document.addEventListener('DOMContentLoaded', function() {
var start = document.getElementById('startButton');
start.addEventListener("click",function() {
  diceNum = Math.ceil(Math.random()*6);
  document.getElementById('rollNum').innerHTML = diceNum;
  console.log(diceNum);
  turnCount += 1;
  if (turnCount % 2 ==0) {
    console.log("Player 1 turn");
    document.querySelector(".player_1_col").style.backgroundColor = "lightblue";
    document.querySelector(".player_2_col").style.backgroundColor = "white";
  } else if (turnCount % 2 ==1) {
    console.log("Player 2 turn");
    document.querySelector(".player_1_col").style.backgroundColor = "white";
    document.querySelector(".player_2_col").style.backgroundColor = "lightblue";
  }else {
    console.log("Argghhhhh");
  }
  console.log(turnCount);
  switch (diceNum) {
    case (diceNum == 1):
        console.log("move to old kent road");
      break;
    case (diceNum == 2):
        console.log("move to whitechapel_road");
      break;
    case (diceNum == 3):
        console.log("move to amgel");
      break;
    default:
    console.log("Don't move");


  }
})
})


var boardPositions = [];
boardPositions[0] = document.getElementsByClassName('old_kent_road');
boardPositions[1] = document.getElementsByClassName('whitechapel_road');
boardPositions[2] = document.getElementsByClassName('angel_islington');

var redPiece, bluePiece;

// function gamePiece(width, height, color, x, y) {
//   this.width = width;
//   this.height = height;
//   this.color = color;
//   this.x = x;
//   this.y = y;
// }
// function start(){
//   redPiece = new gamePiece(20,20,"red",10,10);
//   bluePiece = new gamePiece(20,20,"blue",40,10);
// }
