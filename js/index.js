var diceNum;
var p1Pos = 0;
var p2Pos = 0;
var turnCount = 0;
var p1Dollar = 1000;
var p1TurnCount = 0;
var p2TurnCount = 0;
document.getElementById('player1_money').innerHTML= p1Dollar;
var p2Dollar = 1000;
document.getElementById('player2_money').innerHTML = p2Dollar;
document.addEventListener('DOMContentLoaded', function() {
  makeTokens(0);
var start = document.getElementById('startButton');
start.addEventListener("click",function() { //On click of "Roll the dice!" this function happens
  diceNum = Math.ceil(Math.random()*6); //Random number 1-6
  document.getElementById('rollNum').innerHTML = diceNum; //Displays roll on screen
  turnCount +=1; //Adds 1 to turn count
  console.log("turn " +turnCount);
  console.log("DiceNum now equals:" + diceNum);
  if (turnCount %2 == 1) {
    p1Pos += diceNum;
    p1TurnCount += 1;
    console.log(p1TurnCount + "Player 1 Turn count");
  }else if (turnCount %2 ==0) {
        p2Pos += diceNum;
        p2TurnCount +=1;
        console.log(p2TurnCount + "Player 2 turn count");
  }
  if (turnCount % 2 == 1) { //If odd turn count then it is player 1's turn
    console.log("Player 1 turn");
    document.querySelector(".player_1_col").style.backgroundColor = "white";
    document.querySelector(".player_2_col").style.backgroundColor = "lightblue";
    document.getElementById('player_turn').innerHTML = "2";

    switch (p1Pos % 24) {
      case 1:
          console.log("P1 move to old kent road");
          changePieceValue(1);
          deleteTokens();
          makeTokens(1);
        break;
      case 2:
          console.log(" P1 move to whitechapel_road");
          changePieceValue(2);
          deleteTokens();
          makeTokens(2);
        break;
      case 3:
          console.log("P1move to angel");
          changePieceValue(3);
          deleteTokens();
          makeTokens(3);
        break;
      case 4:
          console.log("P1move to euston");
          changePieceValue(4);
          deleteTokens();
          makeTokens(4);
        break;
      case 5:
          console.log("P1move to pentonville");
          changePieceValue(5);
          deleteTokens();
          makeTokens(5);
        break;
      case 6:
          console.log("P1move to top right");
          changePieceValue(6);
          deleteTokens();
          makeTokens(6);
        break;
      case 7:
          console.log("P1move to pall mall");
          changePieceValue(7);
          makeTokens(7);
        break;
      case 8:
          console.log("P1 move to whitehall");
          changePieceValue(8);
          makeTokens(8);
        break;
      case 9:
          console.log("P1 move to northumberland_avenue");
          changePieceValue(9);
          makeTokens(9);
        break;
      case 10:
          console.log("P1move to bow street");
          changePieceValue(10);
          makeTokens(10);
        break;
      case 11:
          console.log("P1move to marlborough street");
          changePieceValue(11);
          makeTokens(11);
        break;
      case 12:
          console.log("P1move to bottom right");
          changePieceValue(12);
          makeTokens(12);
        break;
      case 13:
          console.log("P1move to strand");
          changePieceValue(13);
          makeTokens(13);
        break;
      case 14:
          console.log("P1move to fleet street");
          changePieceValue(14);
          makeTokens(14);
        break;
      case 15:
          console.log("P1move to trafalgar_square");
          changePieceValue(15);
          makeTokens(15);
        break;
      case 16:
          console.log("P1move to leicester_square");
          changePieceValue(16);
          makeTokens(16);
        break;
      case 17:
          console.log("P1move to picadilly");
          changePieceValue(17);
          makeTokens(17);
        break;
      case 18:
          console.log("P1move to bottom left");
          changePieceValue(18);
          makeTokens(18);
        break;
      case 19:
          console.log("P1 move to regent_street");
          changePieceValue(19);
          makeTokens(19);
        break;
      case 20:
          console.log("P1move to oxford street");
          changePieceValue(20);
          makeTokens(20);
        break;
      case 21:
          console.log("P1move to bond street");
          changePieceValue(21);
          makeTokens(21);
        break;
      case 22:
          console.log("P1 move to park lane");
          changePieceValue(22);
          makeTokens(22);
        break;
      case 23:
          console.log("P1 move to mayfair");
          changePieceValue(23);
          makeTokens(23);
        break;
      case 0:
          console.log("P1 move to go");
          changePieceValue(0);
          makeTokens(0);
        break;
      default:
      console.log("Don't move");
    }
    if (posDataArray[p1Pos%24].owner == 0) {
      if (p1Dollar >= posDataArray[p1Pos%24].cost) {
        var P1ownerRequest = prompt("Would you like to buy this property?")
          if (P1ownerRequest == "Yes") {
            console.log("You now own " + posDataArray[p1Pos%24].name);
            posDataArray[p1Pos].owner += 1;
            var propColorP1 = document.getElementsByClassName("property");
            propColorP1[(p1Pos%24)].classList.add("p1Own");
            p1Dollar -= posDataArray[p1Pos%24].cost;
            document.getElementById('player1_money').innerHTML= p1Dollar;
          }else if (P1ownerRequest == "No") {
            console.log("Property not bought");
          }else {
            console.log("Invalid input, you don't deserve a property");
          }
      }else {
        alert("You cannot afford this property")
      }
    }else if (posDataArray[p1Pos%24].owner == 2) {
      alert("You owe " + posDataArray[p1Pos%24].payout + " Pounds")
      p1Dollar -= posDataArray[p1Pos%24].payout;
      p2Dollar += posDataArray[p1Pos%24].payout;
      document.getElementById('player1_money').innerHTML= p1Dollar;
      document.getElementById('player2_money').innerHTML= p2Dollar;
    }else if (posDataArray[p1Pos%24].owner == 3) {
      console.log("You just won £50!");
      p1Dollar += 50;
      document.getElementById('player1_money').innerHTML= p1Dollar;
    }
  } else if (turnCount % 2 == 0) { //If turn count even then it's player 1's turn
    console.log("Player 2 turn");
    document.querySelector(".player_1_col").style.backgroundColor = "rgba(255,0,0,0.4)";
    document.querySelector(".player_2_col").style.backgroundColor = "white";
    document.getElementById('player_turn').innerHTML = "1";

    switch (p2Pos % 24) {
      case 1:
          console.log("P2 move to old kent road");
          changePieceValue(1);
          // deleteTokens(1);
          makeTokens(1);
        break;
      case 2:
          console.log(" P2 move to whitechapel_road");
          changePieceValue(2);
          makeTokens(2);
        break;
      case 3:
          console.log("P2move to angel");
          changePieceValue(3);
          makeTokens(3);
        break;
      case 4:
          console.log("P2move to euston");
          changePieceValue(4);
          makeTokens(4);
        break;
      case 5:
          console.log("P2move to pentonville");
          changePieceValue(5);
          makeTokens(5);
        break;
      case 6:
          console.log("P2move to top right");
          changePieceValue(6);
          makeTokens(6);
        break;
      case 7:
          console.log("P2move to pall mall");
          changePieceValue(7);
          makeTokens(7);
        break;
      case 8:
          console.log("P2move to whitehall");
          changePieceValue(8);
          makeTokens(8);
        break;
      case 9:
          console.log("P2move to northumberland_avenue");
          changePieceValue(9);
          makeTokens(9);
        break;
      case 10:
          console.log("P2move to bow street");
          changePieceValue(10);
          makeTokens(10);
        break;
      case 11:
          console.log("P2move to marlborough street");
          changePieceValue(11);
          makeTokens(11);
        break;
      case 12:
          console.log("P2move to bottom right");
          changePieceValue(12);
          makeTokens(12);
        break;
      case 13:
          console.log("P2move to strand");
          changePieceValue(13);
          makeTokens(13);
        break;
      case 14:
          console.log("P2move to fleet street");
          changePieceValue(14);
          makeTokens(14);
        break;
      case 15:
          console.log("P2move to trafalgar_square");
          changePieceValue(15);
          makeTokens(15);
        break;
      case 16:
          console.log("P2move to leicester_square");
          changePieceValue(16);
          makeTokens(16);
        break;
      case 17:
          console.log("P2move to picadilly");
          changePieceValue(17);
          makeTokens(17);
        break;
      case 18:
          console.log("P2move to bottom left");
          changePieceValue(18);
          makeTokens(18);
        break;
      case 19:
          console.log("P2 move to regent_street");
          changePieceValue(19);
          makeTokens(19);
        break;
      case 20:
          console.log("P2move to oxford street");
          changePieceValue(20);
          makeTokens(20);
        break;
      case 21:
          console.log("P2move to bond street");
          changePieceValue(21);
          makeTokens(21);
        break;
      case 22:
          console.log("P2 move to park lane");
          changePieceValue(22);
          makeTokens(22);
        break;
      case 23:
          console.log("P2 move to mayfair");
          changePieceValue(23);
          makeTokens(23);
        break;
      case 0:
          console.log("P2 move to go");
          changePieceValue(0);
          makeTokens(0);
        break;
      default:
      console.log("Don't move");
    }
    if (posDataArray[p2Pos%24].owner == 0) {
      if (p2Dollar >= posDataArray[p2Pos%24].cost) {
        var P2ownerRequest = prompt("Would you like to buy this property?")
        if (P2ownerRequest == "Yes") {
          console.log("You now own " + posDataArray[p2Pos%24].name);
          posDataArray[p2Pos].owner += 2;
          var propColorP2 = document.getElementsByClassName("property");
          propColorP2[(p2Pos%24)].classList.add("p2Own");
          p2Dollar -= posDataArray[p2Pos%24].cost;
          document.getElementById('player2_money').innerHTML = p2Dollar;
        }else if (P2ownerRequest == "No") {
          console.log("Property not bought");
        }else {
        console.log("Invalid input, you don't deserve a property");
      }
    }else {
      alert("You cannot afford this property")
    }
  }else if (posDataArray[p2Pos%24].owner == 1) {
      alert("You owe " + posDataArray[p2Pos%24].payout + " Pounds")
      p2Dollar -= posDataArray[p2Pos%24].payout;
      p1Dollar += posDataArray[p2Pos%24].payout;
      document.getElementById('player2_money').innerHTML = p2Dollar;
      document.getElementById('player1_money').innerHTML= p1Dollar;
  }else if (posDataArray[p1Pos%24].owner == 3) {
    console.log("You just won £50!");
    p2Dollar += 50;
    document.getElementById('player2_money').innerHTML= p2Dollar;
  }
  }else {
    console.log("Argghhhhh");
  }
  console.log(p1Pos + " is the current position of P1");
  console.log(p2Pos + " is the current position of P2");
  console.log(posDataArray[p1Pos].name + " is the current position of player one");
  console.log(posDataArray[p2Pos].name + " is the current position of player two");
  console.log("DiceNum is : " + diceNum );
})
})
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
var TR = new positionData("Top Right","top_right",6,3,0,0,0);
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
var BR = new positionData("Bottom Right","bottom_right",12,3,0,0,0);
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
var BL = new positionData("Bottom Left","bottom_left",18,3,0,0,0);
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

function changePieceValue(number) {
  if (turnCount % 2 == 1) {
    posDataArray[number].pieces += 1;
    // posDataArray[(number-diceNum)] -= 1;
    console.log("P1 pieces " + posDataArray[number].pieces);
  } else if (turnCount % 2 == 0) {
    var newToken = document.createElement('img');
    posDataArray[number].pieces += 2;
    // posDataArray[(number-diceNum)] -= 2;
    console.log("P2 pieces " + posDataArray[number].pieces);
  }
}
function makeTokens(number) {
  if (turnCount > 0) {
    if (turnCount%2 ==1) {
      if (posDataArray[number].pieces == 1) {
        var element = document.getElementsByClassName("doggoimg hidden");
        element[number-p1TurnCount].classList.remove("hidden");
        console.log(posDataArray[number].name);
        console.log(number + "This is the number");

      }else if (posDataArray[number].pieces == 2) {
        var element = document.getElementsByClassName("boatimg hidden");
          element[number].classList.remove("hidden");
      }else if (posDataArray[number].pieces == 3) {
        var element1 = document.getElementsByClassName("doggoimg");
        element1[number].classList.remove("hidden");
        var element2 = document.getElementsByClassName("boatimg");
        element2[number].classList.remove("hidden");
    }} else if (turnCount%2 ==0) {
      if (posDataArray[number].pieces == 1) {
        var element = document.getElementsByClassName("doggoimg hidden");
        element[number-p1TurnCount].classList.remove("hidden");
        console.log(posDataArray[number].name);
        console.log(number + "This is the number");

      }else if (posDataArray[number].pieces == 2) {
        var element = document.getElementsByClassName("boatimg hidden");
          element[number-p2TurnCount].classList.remove("hidden");
      }else if (posDataArray[number].pieces == 3) {
        var element1 = document.getElementsByClassName("doggoimg");
        element1[number-p1TurnCount].classList.remove("hidden");
        var element2 = document.getElementsByClassName("boatimg");
        element2[number-p2TurnCount].classList.remove("hidden");
    }}

  }

}
var prevPos1 = p1Pos - diceNum;
var prevPos2 = p2Pos - diceNum;
function deleteTokens() {
  // for (var i = 1; i < 24; i++) {
  //   if (posDataArray[i].pieces == 0 || posDataArray[i].pieces == undefined) {
  //     var elem = document.getElementsByClassName("doggimg")
  //     elem[i].classList.add('hidden')
  //   } else
  //   var elem = document.getElementsByClassName('boatimg');
  //   elem[i].classList.add("hidden");
  // }
};
