var diceNum;
var p1Pos = 0;
var p2Pos = 0;
var turnCount = 0;
var p1Dollar = 1500;
var p1TurnCount = 0;
var p2TurnCount = 0;
var p1Own = [];
var p2Own = [];
document.getElementById('player1_money').innerHTML= p1Dollar;
var p2Dollar = 1500;
document.getElementById('player2_money').innerHTML = p2Dollar;
document.addEventListener('DOMContentLoaded', function() {
  makeTokens(0);
var start = document.getElementById('startButton');
start.addEventListener("click",function() { //On click of "Roll the dice!" this function happens
  diceNum = Math.ceil(Math.random()*6); //Random number 1-6
  document.getElementById('rollNum').innerHTML = diceNum; //Displays roll on screen
  turnCount +=1; //Adds 1 to turn count
  if (turnCount %2 == 1) {
    p1Pos += diceNum;
    p1TurnCount += 1;
  }else if (turnCount %2 ==0) {
        p2Pos += diceNum;
        p2TurnCount +=1;
  }
  if (turnCount % 2 == 1) { //If odd turn count then it is player 1's turn
    document.querySelector(".player_1_col").style.backgroundColor = "rgba(255,0,0,0.1)";
    document.querySelector(".player_2_col").style.backgroundColor = "rgba(0,0,255,0.4)";
    document.getElementById('player_turn').innerHTML = "2";
    document.getElementById('startButton').style.backgroundColor = "blue";

move(p1Pos);

    if (posDataArray[p1Pos%24].owner == 0) {
      if (p1Dollar >= posDataArray[p1Pos%24].cost) {
        var P1ownerRequest = prompt("Would you like to buy this property?").toLowerCase();
          if (P1ownerRequest == "yes") {
            alert("You now own " + posDataArray[p1Pos%24].name);
            posDataArray[p1Pos%24].owner += 1;
            var propColorP1 = document.getElementsByClassName("property");
            propColorP1[(p1Pos%24)].classList.add("p1Own");
            p1Dollar -= posDataArray[p1Pos%24].cost;
            document.getElementById('player1_money').innerHTML= p1Dollar;
            p1Own.push(posDataArray[p1Pos%24].name)
            p1Own.sort();
            removeListP1();
            makeListP1();
          }else if (P1ownerRequest == "No") {
            alert("You have not bought the property");
          }else {
            alert("Invalid input, you don't deserve a property");
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
      if (p1Dollar < 0) {
        alert("Hat Man has run out of money! Booty McBootFace is the winner!")
      }
    }else if (posDataArray[p1Pos%24].owner == 3) {
      p1Dollar += 20;
      document.getElementById('player1_money').innerHTML= p1Dollar;
    }else if (posDataArray[p1Pos%24].owner == 4) {
      p1Dollar += 50;
      document.getElementById('player1_money').innerHTML= p1Dollar;
    } else if (posDataArray[p1Pos%24].owner ==5) {
      p1Dollar -= 30;
      document.getElementById('player1_money').innerHTML= p1Dollar;
      if (p1Dollar < 0) {
        alert("Hat Man has run out of money! Booty McBootFace is the winner!")
      }
    }
  } else if (turnCount % 2 == 0) { //If turn count even then it's player 1's turn
    document.querySelector(".player_1_col").style.backgroundColor = "rgba(255,0,0,0.4)";
    document.querySelector(".player_2_col").style.backgroundColor = "rgba(0,0,255,0.1)";
    document.getElementById('player_turn').innerHTML = "1";
    document.getElementById('startButton').style.backgroundColor = "red";


move(p2Pos);
    if (posDataArray[p2Pos%24].owner == 0) {
      if (p2Dollar >= posDataArray[p2Pos%24].cost) {
        var P2ownerRequest = prompt("Would you like to buy this property?").toLowerCase();
        if (P2ownerRequest == "yes") {
          alert("You now own " + posDataArray[p2Pos%24].name);
          posDataArray[p2Pos%24].owner += 2;
          var propColorP2 = document.getElementsByClassName("property");
          propColorP2[(p2Pos%24)].classList.add("p2Own");
          p2Dollar -= posDataArray[p2Pos%24].cost;
          document.getElementById('player2_money').innerHTML = p2Dollar;
          p2Own.push(posDataArray[p2Pos%24].name)
          p2Own.sort();
          removeListP2();
          makeListP2();
        }else if (P2ownerRequest == "No") {
          alert("Property not bought");
        }else {
        alert("Invalid input, you don't deserve a property");
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
      if (p2Dollar < 0) {
        alert("Booty McBootFace has run out of money! Hat Man is the winner!")
      }
  }else if (posDataArray[p2Pos%24].owner == 3) {
    console.log("You just won £20!");
    p2Dollar += 20;
    document.getElementById('player2_money').innerHTML= p2Dollar;
  }else if (posDataArray[p2Pos%24].owner == 4) {
    p2Dollar += 50;
    document.getElementById('player2_money').innerHTML= p2Dollar;
  }else if (posDataArray[p2Pos%24].owner ==5) {
    p2Dollar -= 30;
    document.getElementById('player2_money').innerHTML= p2Dollar;
    if (p2Dollar < 0) {
      alert("Booty McBootFace has run out of money! Hat Man is the winner!")
    }
  }
  }else {
    console.log("Argghhhhh");
  }
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
var GO = new positionData("Go","go",0,4,0,0,0);
posDataArray.push(GO);
var OKR = new positionData("Old Kent Road","old_kent_road",1,0,60,15,0);
posDataArray.push(OKR);
var WCR = new positionData("Whitechapel Road","whitechapel_road",2,0,60,15,0);
posDataArray.push(WCR);
var AI = new positionData("Angel Islington","angel_islington",3,0,100,25,0);
posDataArray.push(AI);
var ER = new positionData("Euston Road","euston_road",4,0,100,25,0);
posDataArray.push(ER);
var PR = new positionData("Pentonville Road","pentonville_road",5,0,120,30,0);
posDataArray.push(PR);
var TR = new positionData("Top Right","top_right",6,6,0,0,0);
posDataArray.push(TR);
var PM = new positionData("Pall Mall","pall_mall",7,0,140,35,0);
posDataArray.push(PM);
var WH = new positionData("Whitehall","whitehall",8,0,140,35,0);
posDataArray.push(WH);
var NA = new positionData("Northumberland Avenue","northumberland_avenue",9,0,160,40,0);
posDataArray.push(NA);
var BS1 = new positionData("Bow Street","bow_street",10,0,180,45,0);
posDataArray.push(BS1);
var MS = new positionData("Marlborough Street","marlborough_street",11,0,180,45,0);
posDataArray.push(MS);
var BR = new positionData("Bottom Right","bottom_right",12,5,0,0,0);
posDataArray.push(BR);
var S = new positionData("Strand","strand",13,0,220,55,0);
posDataArray.push(S);
var FS = new positionData("Fleet Street","fleet_street",14,0,220,55,0);
posDataArray.push(FS);
var TS = new positionData("Trafalgar Square","trafalgar_square",15,0,240,60,0);
posDataArray.push(TS);
var LS = new positionData("Leicester Square","leicester_square",16,0,260,65,0);
posDataArray.push(LS);
var P = new positionData("Picadilly","picadilly",17,0,280,70,0);
posDataArray.push(P);
var BL = new positionData("Bottom Left","bottom_left",18,3,0,0,0);
posDataArray.push(BL);
var RS = new positionData("Regent Street","regent_street",19,0,300,75,0);
posDataArray.push(RS);
var OS = new positionData("Oxford Street","oxford_street",20,0,300,75,0);
posDataArray.push(OS);
var BS2 = new positionData("Bond Street","bond_street",21,0,320,80,0);
posDataArray.push(BS2);
var PL = new positionData("Park Lane","park_lane",22,0,350,90,0);
posDataArray.push(PL);
var M = new positionData("Mayfair","mayfair",23,0,400,100,0);
posDataArray.push(M);
var pieces=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
function changePieceValue(number) {
  if (turnCount % 2 == 1) {
    pieces[number] += 1;
    // posDataArray[(number-diceNum)] -= 1;
    console.log("P1 pieces " + posDataArray[number].pieces);
  } else if (turnCount % 2 == 0) {
    var newToken = document.createElement('img');
    pieces[number] += 2;
    // posDataArray[(number-diceNum)] -= 2;
    console.log("P2 pieces " + posDataArray[number].pieces);
  }
}
function makeTokens(number) {
  if (turnCount > 0) {
    if (turnCount%2 ==1) {
      console.log(pieces[number] + "p1 pieces(number)");
      console.log(posDataArray[number].pieces);
      if (posDataArray[number].pieces == (pieces[number]-1)) {
        var element = document.getElementsByClassName("doggoimg hidden");
        element[number].classList.remove("hidden");
        posDataArray[number].pieces = pieces[number];
        console.log(posDataArray[number].name);
        console.log(posDataArray[number].pieces + "This is the number");
        console.log(posDataArray[number].pieces + "0Number 1 to be checked");
        console.log(pieces[number] + "0 Number 2 to be checked");
      }else if (posDataArray[number].pieces == (pieces[number]-2)) {
        var element = document.getElementsByClassName("boatimg hidden");
          element[number].classList.remove("hidden");
          posDataArray[number].pieces = pieces[number];
          console.log(posDataArray[number].pieces + "1Number 1 to be checked");
          console.log(pieces[number] + "1Number 2 to be checked");

      }else if (posDataArray[number].pieces == (pieces[number]-3)) {
        var element1 = document.getElementsByClassName("doggoimg");
        element1[number].classList.remove("hidden");
        var element2 = document.getElementsByClassName("boatimg");
        element2[number].classList.remove("hidden");
        posDataArray[number].pieces = pieces[number];
        console.log(posDataArray[number].pieces + "2Number 1 to be checked");
        console.log(pieces[number] + "2Number 2 to be checked");

    }} else if (turnCount%2 ==0) {
      if (posDataArray[number].pieces == (pieces[number]-1)) {
        var element = document.getElementsByClassName("doggoimg hidden");
        element[number].classList.remove("hidden");
        console.log(posDataArray[number].name);
        console.log(number + "This is the number");
        posDataArray[number].pieces = pieces[number];
        console.log(posDataArray[number].pieces + "3Number 1 to be checked");
        console.log(pieces[number] + "3Number 2 to be checked");


      }else if (posDataArray[number].pieces == (pieces[number]-2)) {
        var element = document.getElementsByClassName("boatimg hidden");
          element[number].classList.remove("hidden");
          posDataArray[number].pieces = pieces[number];
          console.log(posDataArray[number].pieces + "4Number 1 to be checked");
          console.log(pieces[number] + "4Number 2 to be checked");


      }else if (posDataArray[number].pieces == (pieces[number]-3)) {
        var element1 = document.getElementsByClassName("doggoimg");
        element1[number].classList.remove("hidden");
        var element2 = document.getElementsByClassName("boatimg");
        element2[number].classList.remove("hidden");
        posDataArray[number].pieces = pieces[number];
        console.log(posDataArray[number].pieces + "5Number 1 to be checked");
        console.log(pieces[number] + "5Number 2 to be checked");

    }
  }
  }}

var elem1 = [];
var elem2 = [];
// var prevPos1 = p1Pos - diceNum;
// var prevPos2 = p2Pos - diceNum;
function deleteTokens() {
  if (turnCount >2) {
    for (var i = 0; i < posDataArray.length; i++) {
      if (posDataArray[i].pieces == pieces[i]) {
        if (turnCount%2 ==1) {
          elem1[i] = document.getElementsByClassName("doggoimg");
          elem1[0][i].classList.add('hidden');
        } else if (turnCount%2 ==0) {
          elem2[i] = document.getElementsByClassName('boatimg');
        elem2[0][i].classList.add("hidden");
        }
      }
    }
  }
};

function removeListP1() {
  var listElemP1 = document.getElementsByClassName('list1')
  listElemP1[0].parentNode.removeChild(listElemP1[0]);
  // listElemP1[1].parentNode.removeChild(listElemP1[0]);

}
function removeListP2() {
  var listElemP2 = document.getElementsByClassName('list2');
    listElemP2[0].parentNode.removeChild(listElemP2[0]);
}
function makeListP1() {
    // Make the list
    var listElementP1 = document.createElement('ul');
    listElementP1.classList.add("list1");

    // Add it to the page
    document.getElementById('p1Property').appendChild(listElementP1);

    // Set up a loop that goes through the items in listItems one at a time
    var numberOfListItems1 = p1Own.length;

    for (var i = 0; i < numberOfListItems1; ++i) {
        // create an item for each one
        var listItem1 = document.createElement('li');
        console.log(listItem1);
        // Add the item text
        listItem1.innerHTML = p1Own[i];

        // Add listItem to the listElement
        listElementP1.appendChild(listItem1);
    }
}
function makeListP2() {
    // Make the list
    var listElementP2 = document.createElement('ul');
    listElementP2.classList.add("list2");

    // Add it to the page
    document.getElementById('p2Property').appendChild(listElementP2);

    // Set up a loop that goes through the items in listItems one at a time
    var numberOfListItems2 = p2Own.length;

    for (var i = 0; i < numberOfListItems2; ++i) {
        // create an item for each one
        var listItem2 = document.createElement('li');
        console.log(listItem2);
        // Add the item text
        listItem2.innerHTML = p2Own[i];

        // Add listItem to the listElement
        listElementP2.appendChild(listItem2);
    }
}
function instructions() {
  alert('MONOPOLY is the game of buying, renting or selling Properties so profitably that players increase their wealth – the wealthiest becoming the eventual winner. Starting from the GO space, move your token around the board according to your roll of the dice. When you land on a Property that is not already owned by anyone else, you may buy it from the Bank. Players who own Properties collect rents from opponents stopping there. You must always obey the instructions given on Community Chest and Chance cards.')
}
function landAlert(number) {
  alert(`You have landed on ${posDataArray[number].name} which costs £${posDataArray[number].cost} and will return £${posDataArray[number].payout} in rent.`)
}
function move(position) {
  switch (position % 24) {
    case 1:
        changePieceValue(1);
        deleteTokens();
        makeTokens(1);
        landAlert(1);
      break;
    case 2:
        changePieceValue(2);
        deleteTokens();
        makeTokens(2);
        landAlert(2);
      break;
    case 3:
        changePieceValue(3);
        deleteTokens();
        makeTokens(3);
        landAlert(3);
      break;
    case 4:
        changePieceValue(4);
        deleteTokens();
        makeTokens(4);
        landAlert(4);
      break;
    case 5:
        changePieceValue(5);
        deleteTokens();
        makeTokens(5);
        landAlert(5);
      break;
    case 6:
        changePieceValue(6);
        deleteTokens();
        makeTokens(6);
        chance();
      break;
    case 7:
        changePieceValue(7);
        deleteTokens();
        makeTokens(7);
        landAlert(7);
      break;
    case 8:
        changePieceValue(8);
        deleteTokens();
        makeTokens(8);
        landAlert(8);
      break;
    case 9:
        changePieceValue(9);
        deleteTokens();
        makeTokens(9);
        landAlert(9);
      break;
    case 10:
        changePieceValue(10);
        deleteTokens();
        makeTokens(10);
        landAlert(10);
      break;
    case 11:
        changePieceValue(11);
        deleteTokens();
        makeTokens(11);
        landAlert(11);
      break;
    case 12:
        changePieceValue(12);
        deleteTokens();
        makeTokens(12);
        alert("Your car breaks down, pay £30 in repairs")
      break;
    case 13:
        changePieceValue(13);
        deleteTokens();
        makeTokens(13);
        landAlert(13);
      break;
    case 14:
        changePieceValue(14);
        deleteTokens();
        makeTokens(14);
        landAlert(14);
      break;
    case 15:
        changePieceValue(15);
        deleteTokens();
        makeTokens(15);
        landAlert(15);
      break;
    case 16:
        changePieceValue(16);
        deleteTokens();
        makeTokens(16);
        landAlert(16);
      break;
    case 17:
        changePieceValue(17);
        deleteTokens();
        makeTokens(17);
        landAlert(17);
      break;
    case 18:
        changePieceValue(18);
        deleteTokens();
        makeTokens(18);
        alert("Free Parking! Pay nothing this turn")
      break;
    case 19:
        changePieceValue(19);
        deleteTokens();
        makeTokens(19);
        landAlert(19);
      break;
    case 20:
        changePieceValue(20);
        deleteTokens();
        makeTokens(20);
        landAlert(20);
      break;
    case 21:
        changePieceValue(21);
        deleteTokens();
        makeTokens(21);
        landAlert(21);
      break;
    case 22:
        changePieceValue(22);
        deleteTokens();
        makeTokens(22);
        landAlert(22);
      break;
    case 23:
        changePieceValue(23);
        deleteTokens();
        makeTokens(23);
        landAlert(23);
      break;
    case 0:
        changePieceValue(0);
        deleteTokens();
        makeTokens(0);
        alert("You landed on Go and find £50!")
      break;
    default:
    console.log("Don't move");
  }
}
function chance() {
  var rand = Math.floor(Math.random()*chances.length)
  alert(`${chances[rand]}`)
  switch (rand) {
    case 0:
      if (p1Pos%24 ==6) {
        changePieceValue(0);
        deleteTokens();
        makeTokens(0);
        p1Pos -=6;
        p1TurnCount +=1;
        p1Dollar += 50;
        document.getElementById('player1_money').innerHTML = p1Dollar;
      }else if (p2Pos%24 ==6) {
        changePieceValue(0);
        deleteTokens();
        makeTokens(0);
        landAlert(0);
        p2TurnCount +=1
        p2Pos -=6;
        p2Dollar += 50;
        document.getElementById('player2_money').innerHTML = p2Dollar;
      }
    break;
    case 1:
    if (p1Pos%24 == 6) {
      changePieceValue(3);
      deleteTokens();
      makeTokens(3);
      landAlert(3);
      p1Pos -=3;
      p1TurnCount +=1;
    }else if (p2Pos%24 == 6) {
      changePieceValue(3);
      deleteTokens();
      makeTokens(3);
      landAlert(3);
      p2TurnCount +=1
      p2Pos -=3
    }
    break;
    case 2:
      if (p2Pos%24 == 6) {
        p2Dollar += 200;
        document.getElementById('player2_money').innerHTML = p2Dollar;
      }else if (p1Pos%24 == 6 || p1Pos%24 ==18){
        p1Dollar += 200;
        document.getElementById('player1_money').innerHTML = p1Dollar;
      }
    break;
    case 3:
      if (p2Pos%24 == 6) {
        p2Dollar += 20;
        document.getElementById('player2_money').innerHTML = p2Dollar;
      }else if (p1Pos%24 == 6 || p1Pos%24 ==18){
        p1Dollar += 20;
        document.getElementById('player1_money').innerHTML = p1Dollar;
      }
    break;
    case 4:
      if (p2Pos%24 == 6 || p2Pos%24 == 18) {
        p2Dollar += 100;
        document.getElementById('player2_money').innerHTML = p2Dollar;
      }else if (p1Pos%24 == 6 || p1Pos%24 ==18){
        p1Dollar += 100;
        document.getElementById('player1_money').innerHTML = p1Dollar;
      }
    break;
    case 5:
      if (p1Pos%24 == 6) {

        changePieceValue(9);
        deleteTokens();
        makeTokens(9);
        landAlert(9);
        p1Pos +=3
        p1turnCount +=1;
      } else if (p2Pos%24 == 6) {

        changePieceValue(9);
        deleteTokens();
        makeTokens(9);
        landAlert(9);
        p2Pos +=3;
        p2TurnCount +=1
      }
    break;
    case 6:
      if (p2Pos%24 == 6 || p2Pos%24 == 18) {
        p2Dollar -= 50;
        document.getElementById('player2_money').innerHTML = p2Dollar;
      }else if (p1Pos%24 == 6 || p1Pos%24 ==18){
        p1Dollar -= 50;
        document.getElementById('player1_money').innerHTML = p1Dollar;
      }
    break;
    case 7:
      if (p2Pos%24 == 6) {
        p2Dollar += 50;
        p1Dollar -= 50;
        document.getElementById('player2_money').innerHTML = p2Dollar;
        document.getElementById('player1_money').innerHTML = p1Dollar;
      }else if (p1Pos%24 == 6 || p1Pos%24 ==18){
        p1Dollar += 50;
        p2Dollar -=50;
        document.getElementById('player1_money').innerHTML = p1Dollar;
        document.getElementById('player2_money').innerHTML = p2Dollar;
      }
    default:

  }
}
var chances = ["Chance card! Advance To Go!","Chance card! Go back 3 spaces","Chance card! Bank error in your favour, gain £200!","Chance card! Tax refund, claim £20","Chance card! You inherit £100 from a distant relative's death", "Chance card! Move forward 3 spaces","Chance card! Hospital fees, pay £50","Chance card! It's your birthday! Take £50 from the other player!"];
