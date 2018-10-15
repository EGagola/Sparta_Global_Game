var diceNum;
var turnCount = 0;
var red_Piece_Position = 0; //initial position of red piece
var blue_Piece_Position = 0; //Initial position of blue piece
document.addEventListener('DOMContentLoaded', function() {
var start = document.getElementById('startButton');
start.addEventListener("click",function() { //On click of "Roll the dice!" this function happens
  diceNum = Math.ceil(Math.random()*6); //Random number 1-6
  document.getElementById('rollNum').innerHTML = diceNum; //Displays roll on screen
  console.log("Dice rolled: " + diceNum);
  turnCount += 1; //Adds 1 to turn count
  if (turnCount % 2 == 0) { //If even turn count then it is player 2's turn
    console.log("Player 1 turn");
    document.querySelector(".player_1_col").style.backgroundColor = "lightblue";
    document.querySelector(".player_2_col").style.backgroundColor = "white";
    document.getElementById('player_turn').innerHTML = "1";
  } else if (turnCount % 2 == 1) { //If turn count odd then it's player 1's turn
    console.log("Player 2 turn");
    document.querySelector(".player_1_col").style.backgroundColor = "white";
    document.querySelector(".player_2_col").style.backgroundColor = "lightblue";
    document.getElementById('player_turn').innerHTML = "2";

  }else {
    console.log("Argghhhhh");
  }
  console.log(turnCount);
  console.log("DiceNum now equals:" + diceNum);
  //Switch to determine action upon each posible dice roll.
  switch (diceNum) {
    case 1:
        console.log("move to old kent road");
        makeToken(1);
      break;
    case 2:
        console.log("move to whitechapel_road");
        makeToken(2);
      break;
    case 3:
        console.log("move to angel");
        makeToken(3);
      break;
    case 4:
        console.log("move to euston");
        makeToken(4);
      break;
    case 5:
        console.log("move to pentonville");
        makeToken(5);
      break;
    case 6:
        console.log("move to top right");
        makeToken(6);
      break;
    default:
    console.log("Don't move");
  }
})
})

var positionArray = [];
for (var i = 0; i < 24; i++) {
  positionArray[i] = i;
}
for (var i = 0; i < positionArray.length; i++) {
}
console.log(positionArray);

var positionData = function(name,id,value,owner,cost,payout,pieces) {
  this.name = name;
  this.id = id;
  this.value = value;
  this.owner = owner;
  this.cost = cost;
  this.payout = payout;
  this.pieces = pieces;
}
var posDataArray = [];
var GO = new positionData("Go","go",0,0,0,0,3);
posDataArray.push(GO);
var OKR = new positionData("Old Kent Road","old_kent_road",1,0,10,5,0);
posDataArray.push(OKR);
var WCR = new positionData("Whitechapel Road","whitechapel_road",2,0,15,5,0);
posDataArray.push(WCR);
var AI = new positionData("Angel Islington","angel_islington",3,0,20,10,0);
posDataArray.push(AI);
var ER = new positionData("Euston Road","euston_road",4,0,20,10,0);
posDataArray.push(ER);
var PR = new positionData("Pentonville Road","pentonville_road",5,0,25,15,0);
posDataArray.push(PR);
var TR = new positionData("Top Right","top_right",6,0,0,0,0);
posDataArray.push(TR);
var PM = new positionData("Pall Mall","pall_mall",7,0,30,20,0);
posDataArray.push(PM);
var WH = new positionData("Whitehall","whitehall",8,0,30,20,0);
posDataArray.push(WH);
var NA = new positionData("Northumberland Avenue","northumberland_avenue",9,0,30,20,0);
posDataArray.push(NA);
var BS1 = new positionData("Bow Street","bow_street",10,0,35,20,0);
posDataArray.push(BS1);
var MS = new positionData("Marlborough Street","marlborough_street",11,0,40,20,0);
posDataArray.push(MS);
var BR = new positionData("Bottom Right","bottom_right",12,0,0,0,0);
posDataArray.push(BR);
var S = new positionData("Strand","strand",13,0,50,25,0);
posDataArray.push(S);
var FS = new positionData("Fleet Street","fleet_street",14,0,50,25,0);
posDataArray.push(FS);
var TS = new positionData("Trafalgar Square","trafalgar_square",15,0,55,30,0);
posDataArray.push(TS);
var LS = new positionData("Leicester Square","leicester_square",16,0,55,30,0);
posDataArray.push(LS);
var P = new positionData("Picadilly","picadilly",17,0,60,35,0);
posDataArray.push(P);
var BL = new positionData("Bottom Left","bottom_left",18,0,0,0,0);
posDataArray.push(BR);
var RS = new positionData("Regent Street","regent_street",19,0,65,40,0);
posDataArray.push(RS);
var OS = new positionData("Oxford Street","oxford_street",20,0,65,40,0);
posDataArray.push(OS);
var BS2 = new positionData("Bond Street","bond_street",21,0,65,40,0);
posDataArray.push(BS2);
var PL = new positionData("Park Lane","park_lane",22,0,75,50,0);
posDataArray.push(PL);
var M = new positionData("Mayfair","mayfair",23,0,75,50,0);
posDataArray.push(M);


function makeToken(number) {
  var propertyArray = [];
  if (turnCount % 2 == 1) {
    // var newToken = document.createElement('img');
    // newToken.setAttribute("src","http://www.stickpng.com/assets/images/5930074c3919fe0ee3614da0.png");
    // newToken.setAttribute("width",100);
    // newToken.setAttribute("height",100);
    // newToken.setAttribute("alt","Doggo");
    console.log(number);
console.log(document.posDataArray[number].pieces);
var newNum = num;
  document.posDataArray[number].pieces += 1;
  } else if (turnCount % 2 == 0) {
    var newToken = document.createElement('img');
  newToken.setAttribute("src","http://www.stickpng.com/assets/thumbs/5930075f3919fe0ee3614da2.png");
  newToken.setAttribute("width",100);
  newToken.setAttribute("height",100);
  newToken.setAttribute("alt","Boat");
  document.posDataArray[number].pieces += 2;
  }
}
