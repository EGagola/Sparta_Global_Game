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
            checkOwner();
          }else if (P1ownerRequest == "no") {
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
      playAudio();
      if (p1Dollar < 0) {
        alert("Hat Man has run out of money! Booty McBootFace is the winner!")
      }
    }else if (posDataArray[p1Pos%24].owner == 3) {
      p1Dollar += 20;
      document.getElementById('player1_money').innerHTML= p1Dollar;
      playAudio();

    }else if (posDataArray[p1Pos%24].owner == 4) {
      p1Dollar += 50;
      document.getElementById('player1_money').innerHTML= p1Dollar;
      playAudio();

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
          checkOwner();
        }else if (P2ownerRequest == "no") {
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
    playAudio();

  }else if (posDataArray[p2Pos%24].owner == 4) {
    p2Dollar += 200;
    document.getElementById('player2_money').innerHTML= p2Dollar;
    playAudio();

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
var BL = new positionData("Bottom Left","bottom_left",18,6,0,0,0);
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
  } else if (turnCount % 2 == 0) {
    var newToken = document.createElement('img');
    pieces[number] += 2;
    // posDataArray[(number-diceNum)] -= 2;
  }
}
function makeTokens(number) {
  if (turnCount > 0) {
    if (turnCount%2 ==1) {

      if (posDataArray[number].pieces == (pieces[number]-1)) {
        var element = document.getElementsByClassName("doggoimg hidden");
        element[number].classList.remove("hidden");
        posDataArray[number].pieces = pieces[number];

      }else if (posDataArray[number].pieces == (pieces[number]-2)) {
        var element = document.getElementsByClassName("boatimg hidden");
          element[number].classList.remove("hidden");
          posDataArray[number].pieces = pieces[number];


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

        posDataArray[number].pieces = pieces[number];



      }else if (posDataArray[number].pieces == (pieces[number]-2)) {
        var element = document.getElementsByClassName("boatimg hidden");
          element[number].classList.remove("hidden");
          posDataArray[number].pieces = pieces[number];



      }else if (posDataArray[number].pieces == (pieces[number]-3)) {
        var element1 = document.getElementsByClassName("doggoimg");
        element1[number].classList.remove("hidden");
        var element2 = document.getElementsByClassName("boatimg");
        element2[number].classList.remove("hidden");
        posDataArray[number].pieces = pieces[number];


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
var y =document.getElementById("sadAudio");
var x = document.getElementById("myAudio");
function playSadAudio() {
  y.play();
}
function playAudio() {
    x.play();
}
var z = document.getElementById("carhorn");
var w = document.getElementById('iframeAudio');
function playcarAudio() {
  x.play();
}
function stopBackMusic() {
  w.stop();
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
alert("MONOPOLY is the game of buying, renting or selling Properties so profitably that players increase their wealth – the wealthiest becoming the eventual winner. Starting from the GO space, move your token around the board according to your roll of the dice. When you land on a Property that is not already owned by anyone else, you may buy it from the Bank. Players who own Properties collect rents from opponents stopping there. On player turn, roll the dice, if you land on an unowned property: Decide whether to buy the property. If you own all properties of the same colour, all properties become twice as valuable and the rent doubles. If you land on a chance card a card will be randomly selected and it's effects will be automatically applied. If you land on your opponents property, you will pay them the value of the rent for that tile.");
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
        playSadAudio();
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
        alert("Free Parking! Pay nothing this turn");
        playcarAudio();
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
        alert("You landed on Go and gain £200!")
        if (turnCount%2 == 1) {
          p1Dollar += 200;
          document.getElementById('player1_money').innerHTML = p1Dollar;
        } else {
          p2Dollar += 200;
          document.getElementById('player2_money').innerHTML = p2Dollar;
        }
      break;
    default:
    console.log("Don't move");
  }
}
function chance() {
  var rand = Math.floor(Math.random()*chances.length)
  alert(`${chances[rand]}`)
  switch (rand) {
    case 1:
      if (p2Pos%24 == 6) {
        p2Dollar -= 60;
        document.getElementById('player2_money').innerHTML = p2Dollar;
        playSadAudio()
        if (p2Dollar <0) {
          alert("Booty McBootFace has run out of money! Hat Man is the winner!")
        }
      }else if (p1Pos%24 == 6){
        p1Dollar -= 60;
        document.getElementById('player1_money').innerHTML = p1Dollar;
        playSadAudio()
        if (p1Dollar < 0) {
          alert("Hat Man has run out of money! Booty McBootFace is the winner!")
        }
      }
    break;
    break;
    case 1:
      if (p2Pos%24 == 6) {
        p2Dollar += 1;
        document.getElementById('player2_money').innerHTML = p2Dollar;
        playAudio()
      }else if (p1Pos%24 == 6){
        p1Dollar += 1;
        document.getElementById('player1_money').innerHTML = p1Dollar;
        playAudio()
      }
    break;
    case 2:
      if (p2Pos%24 == 6) {
        p2Dollar += 200;
        document.getElementById('player2_money').innerHTML = p2Dollar;
        playAudio();

      }else if (p1Pos%24 == 6){
        p1Dollar += 200;
        document.getElementById('player1_money').innerHTML = p1Dollar;
        playAudio();

      }
    break;
    case 3:
      if (p2Pos%24 == 6) {
        p2Dollar += 20;
        document.getElementById('player2_money').innerHTML = p2Dollar;
        playAudio();

      }else if (p1Pos%24 == 6){
        p1Dollar += 20;
        document.getElementById('player1_money').innerHTML = p1Dollar;
        playAudio();

      }
    break;
    case 4:
      if (p2Pos%24 == 6) {
        p2Dollar += 100;
        document.getElementById('player2_money').innerHTML = p2Dollar;
        playAudio();

      }else if (p1Pos%24 == 6){
        p1Dollar += 100;
        document.getElementById('player1_money').innerHTML = p1Dollar;
        playAudio();

      }
    break;
    case 5:
    if (p2Pos%24 == 6) {
      p2Dollar -= 100;
      document.getElementById('player2_money').innerHTML = p2Dollar;
      playSadAudio();
      if (p2Dollar < 0 ) {
        alert("Booty McBootFace has run out of money! Hat Man is the winner!")

      }
      } else if (p1Pos%24 == 6){
        p1Dollar -= 100;
        document.getElementById('player1_money').innerHTML = p1Dollar;
        playSadAudio();
      }      if (p1Dollar < 0) {
              alert("Hat Man has run out of money! Booty McBootFace is the winner!")
            }
    break;
    case 6:
      if (p2Pos%24 == 6) {
        p2Dollar -= 50;
        document.getElementById('player2_money').innerHTML = p2Dollar;
        playSadAudio()
        if (p2Dollar <0) {
          alert("Booty McBootFace has run out of money! Hat Man is the winner!")
        }
      }else if (p1Pos%24 == 6){
        p1Dollar -= 50;
        document.getElementById('player1_money').innerHTML = p1Dollar;
        playSadAudio()
        if (p1Dollar < 0) {
          alert("Hat Man has run out of money! Booty McBootFace is the winner!")
        }
      }
    break;
    case 7:
      if (p2Pos%24 == 6) {
        p2Dollar += 50;
        p1Dollar -= 50;
        document.getElementById('player2_money').innerHTML = p2Dollar;
        document.getElementById('player1_money').innerHTML = p1Dollar;
        playAudio();
        if (p1Dollar < 0) {
          alert("Hat Man has run out of money! Booty McBootFace is the winner!")
        }
      }else if (p1Pos%24 == 6){
        p1Dollar += 50;
        p2Dollar -=50;
        document.getElementById('player1_money').innerHTML = p1Dollar;
        document.getElementById('player2_money').innerHTML = p2Dollar;
        playAudio();
        if (p2Dollar <0) {
          alert("Booty McBootFace has run out of money! Hat Man is the winner!")
        }
      }
    break;
    case 8:
      if (p2Pos%24 == 6) {
        p2Dollar -= 10;
        document.getElementById('player2_money').innerHTML = p2Dollar;
        playSadAudio();
        if (p2Dollar < 0) {
          alert("Booty McBootFace has run out of money! Hat Man is the winner!")
        }
      }else if (p1Pos%24 == 6){
        p1Dollar -= 10;
        document.getElementById('player1_money').innerHTML = p1Dollar;
        playSadAudio();
      }      if (p1Dollar < 0) {
              alert("Hat Man has run out of money! Booty McBootFace is the winner!")
            }
    break;
    case 9:
      if (p2Pos%24 == 6) {
        p2Dollar -= 300;
        document.getElementById('player2_money').innerHTML = p2Dollar;
        playSadAudio();
        if (p2Dollar < 0) {
        alert("Booty McBootFace has run out of money! Hat Man is the winner!")
        }
      }else if (p1Pos%24 == 6){
        p1Dollar -= 300;
        document.getElementById('player1_money').innerHTML = p1Dollar;
        playSadAudio();
      }      if (p1Dollar < 0) {
              alert("Hat Man has run out of money! Booty McBootFace is the winner!")
            }
    break;
    default:

  }
}
var chances = ["Chance card! Your neighbour complains that your new extension obstructs light to their property, pay £60 in reparations","Chance card! You come in second place in a beauty contest, win £1!","Chance card! Bank error in your favour, gain £200!","Chance card! Tax refund, claim £20","Chance card! You inherit £100 from a distant relative's death", "Chance card! You mistakenly invest in a Nigerian prince, lose £100","Chance card! Hospital fees, pay £50","Chance card! It's your birthday! Take £50 from the other player!","Chance card! Parking fine pay £10","Chance card! All of your money was invested in the Leyman Brothers, you lose £300"];
var brown =0;
var lb = 0;
var lp =0;
var orange = 0;
var red = 0;
var yellow = 0;
var green = 0;
var purple =0;
function checkOwner() {
  if (posDataArray[1].owner == posDataArray[2].owner && posDataArray[1].owner != 0 && brown == 0) {
    posDataArray[1].payout = (posDataArray[1].payout*2);
    posDataArray[2].payout = (posDataArray[2].payout*2);
    alert("You have completed the brown set. Rent for these properties is doubled");
    brown++;
  }else if (posDataArray[3].owner == posDataArray[4].owner && posDataArray[4].owner == posDataArray[5].owner && posDataArray[3].owner !=0 && lb ==0) {
    posDataArray[3].payout = (posDataArray[3].payout*2);
    posDataArray[4].payout = (posDataArray[4].payout*2);
    posDataArray[5].payout = (posDataArray[5].payout*2);
    alert("You have completed the light blue set. Rent for these properties is doubled");
    lb++;
  }else if (posDataArray[7].owner == posDataArray[8].owner && posDataArray[8].owner == posDataArray[9].owner && posDataArray[7].owner !=0 && lp ==0) {
    posDataArray[7].payout = (posDataArray[7].payout*2);
    posDataArray[8].payout = (posDataArray[8].payout*2);
    posDataArray[9].payout = (posDataArray[9].payout*2);
    alert("You have completed the light purple set. Rent for these properties is doubled");
    lp++;
  }else if (posDataArray[10].owner == posDataArray[11].owner && posDataArray[10].owner !=0 && orange == 0) {
    posDataArray[10].payout = (posDataArray[10].payout*2);
    posDataArray[11].payout = (posDataArray[11].payout*2);
    alert("You have completed the orange set. Rent for these properties is doubled");
    orange++;
  }else if (posDataArray[13].owner == posDataArray[14].owner && posDataArray[14].owner == posDataArray[15].owner && posDataArray[13].owner !=0 && red ==0) {
    posDataArray[13].payout = (posDataArray[13].payout*2);
    posDataArray[14].payout = (posDataArray[14].payout*2);
    posDataArray[15].payout = (posDataArray[15].payout*2);
    alert("You have completed the red set. Rent for these properties is doubled");
    red++;
  }else if (posDataArray[16].owner == posDataArray[17].owner && posDataArray[17].owner !=0 && yellow ==0) {
    posDataArray[16].payout = (posDataArray[16].payout*2);
    posDataArray[17].payout = (posDataArray[17].payout*2);
    alert("You have completed the yellow set. Rent for these properties is doubled");
    yellow++;
  }else if (posDataArray[19].owner == posDataArray[20].owner && posDataArray[20].owner == posDataArray[21].owner && posDataArray[19].owner !=0 && green ==0) {
    posDataArray[19].payout = (posDataArray[19].payout*2);
    posDataArray[20].payout = (posDataArray[20].payout*2);
    posDataArray[21].payout = (posDataArray[21].payout*2);
    alert("You have completed the green set. Rent for these properties is doubled");
    green++;
  }else if (posDataArray[22].owner == posDataArray[23].owner && posDataArray[22].owner !=0 && purple ==0) {
    posDataArray[22].payout = (posDataArray[22].payout*2);
    posDataArray[23].payout = (posDataArray[23].payout*2);
    alert("You have completed the dark purple set. Rent for these properties is doubled");
    purple++;
  }
}function reload() {
  document.getElementById('reload').addEventListener("click",function(){
    location.reload();
  })
}
