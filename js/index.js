document.addEventListener('DOMContentLoaded', function() {
start();
})
var diceNum = ;

function diceRoll() {
  diceNum = Math.ceil((Math.random()*6);
  document.getElementById('rollNum').innerHTML = diceNum;
  console.log(diceNum);
}
diceRoll();

var boardPositions = [];
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
