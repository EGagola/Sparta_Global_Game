var turnCount = 0; // How many turns have passed
var player_cycle_count = 0; // How many times a player has completed one circuit of the board
players_array = []; // Array of player objects

// Player constructor
var Player = function(id,name,money,position,turn,idString,owned_properties,times_past_go){
  this.id = id;
  this.name = name;
  this.money = money;
  this.position = position;
  this.turn = turn;
  this.idString = idString;
  this.owned_properties = owned_properties;
  this.times_past_go = times_past_go;
}

// Creates players
var player1 = new Player(1,"Hat Man",1500,0,0,"hat",[],0);
players_array.push(player1);
var player2 = new Player(2,"Booty McBootFace",1500,0,0,"boot",[],0);
players_array.push(player2);
var player3 = new Player(3,"Iron Man",1500,0,0,"iron",[],0);
players_array.push(player3);
var player4 = new Player(4,"Gentleman",1500,0,0,"gent",[],0);
players_array.push(player4);

// Sets starting money for each player
updatePlayerMoney(player1);
updatePlayerMoney(player2);
updatePlayerMoney(player3);
updatePlayerMoney(player4);

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('player_turn').innerHTML = player1.name;
  var start = document.getElementById('startButton');
  start.addEventListener("click",function() {
   // On click of "Roll the dice!" this function happens
  turnCount += 1;
  if (turnCount > 4) {
    turnCount = 1;
    player_cycle_count =+ 1;
  }
    if (turnCount == 1) { // Turn count determines which player will perform actions
      document.querySelector(".player_2_area").style.backgroundColor = "rgba(0,0,255,0.4)"; // Darkens player 2 area to indicate their turn
      document.querySelector(".player_1_area").style.backgroundColor = "rgba(255,0,0,0.2)"; // Reverts player 1 area to standard shade
      document.getElementById('player_turn').innerHTML = player2.name; // Displays current player turn name
      document.getElementById('startButton').style.backgroundColor = "blue"; // Dice roll button becomes colour of player
      diceRoll(player1); // Determines dice roll for player
      move(player1); // Moves player to new spot on board and applies any location functions (e.g chance)
      checkGo(player1); // Check if player passed go on their move
      ownerCheck(player1); // Determines property actions if applicable
    } else if (turnCount == 2) { // Repeat for other players
      document.querySelector(".player_3_area").style.backgroundColor = "rgba(255,255,0,0.7)";
      document.querySelector(".player_2_area").style.backgroundColor = "rgba(0,0,255,0.2)";
      document.getElementById('player_turn').innerHTML = player3.name;
      document.getElementById('startButton').style.backgroundColor = "yellow";
      diceRoll(player2);
      move(player2);
      checkGo(player2);
      ownerCheck(player2);
    } else if (turnCount == 3) {
      document.querySelector(".player_4_area").style.backgroundColor = "rgba(0,255,0,0.6)";
      document.querySelector(".player_3_area").style.backgroundColor = "rgba(255,255,0,0.4)";
      document.getElementById('player_turn').innerHTML = player4.name;
      document.getElementById('startButton').style.backgroundColor = "green";
      diceRoll(player3);
      move(player3);
      checkGo(player3);
      ownerCheck(player3);
    } else if (turnCount == 4) {
      document.querySelector(".player_1_area").style.backgroundColor = "rgba(255,0,0,0.4)";
      document.querySelector(".player_4_area").style.backgroundColor = "rgba(0,255,0,0.2)";
      document.getElementById('player_turn').innerHTML = player1.name;
      document.getElementById('startButton').style.backgroundColor = "red";
      diceRoll(player4);
      move(player4);
      checkGo(player4);
      ownerCheck(player4);
    }
  })
})

// Function that randomly generates a number between 1 and 6
function diceRoll(player) {
  var dice_number_rolled = Math.ceil(Math.random()*6); //Random number generator for integers 1-6
  document.getElementById('rollNum').innerHTML = dice_number_rolled; //Displays roll on screen
  player.position += dice_number_rolled;
  player.turn += 1;
}

// Property constructor
var positionData = function(name,id,value,owner,cost,payout,pieces,set_colour) {
  this.name = name;
  this.id = id;
  this.value = value;
  this.owner = owner;
  this.cost = cost;
  this.payout = payout;
  this.pieces = pieces;
  this.set_colour = set_colour;
}

// Creating information for each location on the board and pushing them to board_location_array
var board_location_array = [];
var GO = new positionData("Go","go",0,4,0,0,0,"n/a");
board_location_array.push(GO);
var OKR = new positionData("Old Kent Road","old_kent_road",1,0,60,15,0,"Brown");
board_location_array.push(OKR);
var WCR = new positionData("Whitechapel Road","whitechapel_road",2,0,60,15,0,"Brown");
board_location_array.push(WCR);
var AI = new positionData("Angel Islington","angel_islington",3,0,100,25,0,"Light Blue");
board_location_array.push(AI);
var ER = new positionData("Euston Road","euston_road",4,0,100,25,0,"Light Blue");
board_location_array.push(ER);
var PR = new positionData("Pentonville Road","pentonville_road",5,0,120,30,0,"Light Blue");
board_location_array.push(PR);
var TR = new positionData("Top Right","top_right",6,6,0,0,0,"n/a");
board_location_array.push(TR);
var PM = new positionData("Pall Mall","pall_mall",7,0,140,35,0,"Light Purple");
board_location_array.push(PM);
var WH = new positionData("Whitehall","whitehall",8,0,140,35,0,"Light Purple");
board_location_array.push(WH);
var NA = new positionData("Northumberland Avenue","northumberland_avenue",9,0,160,40,0,"Light Purple");
board_location_array.push(NA);
var BS1 = new positionData("Bow Street","bow_street",10,0,180,45,0,"Orange");
board_location_array.push(BS1);
var MS = new positionData("Marlborough Street","marlborough_street",11,0,180,45,0,"Orange");
board_location_array.push(MS);
var BR = new positionData("Bottom Right","bottom_right",12,5,0,0,0,"n/a");
board_location_array.push(BR);
var S = new positionData("Strand","strand",13,0,220,55,0,"Red");
board_location_array.push(S);
var FS = new positionData("Fleet Street","fleet_street",14,0,220,55,0,"Red");
board_location_array.push(FS);
var TS = new positionData("Trafalgar Square","trafalgar_square",15,0,240,60,0,"Red");
board_location_array.push(TS);
var LS = new positionData("Leicester Square","leicester_square",16,0,260,65,0,"Yellow");
board_location_array.push(LS);
var P = new positionData("Picadilly","picadilly",17,0,280,70,0,"Yellow");
board_location_array.push(P);
var BL = new positionData("Bottom Left","bottom_left",18,6,0,0,0,"n/a");
board_location_array.push(BL);
var RS = new positionData("Regent Street","regent_street",19,0,300,75,0,"Green");
board_location_array.push(RS);
var OS = new positionData("Oxford Street","oxford_street",20,0,300,75,0,"Green");
board_location_array.push(OS);
var BS2 = new positionData("Bond Street","bond_street",21,0,320,80,0,"Green");
board_location_array.push(BS2);
var PL = new positionData("Park Lane","park_lane",22,0,350,90,0,"Dark Purple");
board_location_array.push(PL);
var M = new positionData("Mayfair","mayfair",23,0,400,100,0,"Dark Purple");
board_location_array.push(M);

// Starting piece value for each position
var pieces_array=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

// Adds to pieces array for value of each player piece
function changePieceValue(board_position) {
  if (turnCount == 1) {
    pieces_array[board_position] += 1; // Player 1 token has a value of 1
  } else if (turnCount == 2) {
    pieces_array[board_position] += 2; // Player 2 token has a value of 2
  } else if (turnCount == 3) {
    pieces_array[board_position] += 4; // Player 3 token has a value of 4
  } else if (turnCount == 4) {
    pieces_array[board_position] += 8; // Player 4 token has a value of 8
  }
}

// Function to display player tokens after dice roll
function makeTokens(board_position) {
  if (turnCount > 0) {
    if (pieces_array[board_position] >= 8) { // Checks if player 4 token on current board position
      var element1 = document.getElementsByClassName('gentIcon hidden');
      element1[board_position].classList.remove('hidden'); // Removes hidden attribute of player 4
      pieces_array[board_position] -= 8 // Removes player 4 piece value from position
    }
    if (pieces_array[board_position] >= 4) { // Repeat for other player tokens
      var element1 = document.getElementsByClassName('ironIcon hidden');
      element1[board_position].classList.remove('hidden');
      pieces_array[board_position] -= 4
    }
    if (pieces_array[board_position] >= 2) {
      var element1 = document.getElementsByClassName('bootIcon hidden');
      element1[board_position].classList.remove('hidden');
      pieces_array[board_position] -= 2
    }
    if (pieces_array[board_position] >= 1) {
      var element1 = document.getElementsByClassName('hatIcon hidden');
      element1[board_position].classList.remove('hidden');
      pieces_array[board_position] -= 1
    }
  }
}

// Function that updates the HTML display for player money
function updatePlayerMoney(player) {
  document.getElementById(player.idString + '_money').innerHTML= player.money;
}

var elem1 = [];
var elem2 = [];
var elem3 = [];
var elem4 = [];

// Function that hides tokens from previous position
function hide_character_icon() {
  if (player_cycle_count > 0) {
    for (var i = 0; i < board_location_array.length; i++) { // Checks every position on board
      if (board_location_array[i].pieces == pieces_array[i]) { // Checks value of pieces array against board_location_array piece value
        if (turnCount == 1) { // If turn count is 1 then player 1 icon has moved so previous needs to be hidden
          elem1[i] = document.getElementsByClassName("hatIcon");
          elem1[0][i].classList.add('hidden'); // Adds hidden class to icon
        } else if (turnCount == 2) { // If turn count is 2 then player 2's icon needs to be hidden etc
          elem2[i] = document.getElementsByClassName('bootIcon');
          elem2[0][i].classList.add("hidden");
      } else if (turnCount == 3) {
          elem3[i] = document.getElementsByClassName('ironIcon');
          elem3[0][i].classList.add("hidden");
      } else if (turnCount == 4) {
          elem4[i] = document.getElementsByClassName('gentIcon');
          elem4[0][i].classList.add("hidden");
        }
      }
    }
  }
}

// Function to check which player owns property on tile player lands on
function ownerCheck(player) {
  if (board_location_array[player.position % 24].owner == 0){ // If owner value is 0 property is unowned
    property_purchase_request(player); // Calls function that gives player the opportunity to purchase property
  }else if (board_location_array[player.position % 24].owner == player.id) { // Checks if the current player owns the property
    alert('You already own this property');
  }else if (board_location_array[player.position % 24].owner != player.id && board_location_array[player.position % 24].owner <= players_array.length) { // Checks if property owned by another player
    alert('You owe ' + players_array[(board_location_array[player.position % 24].owner -1)].name + ' ' + board_location_array[player.position % 24].payout + ' pounds.')
    payment(player , board_location_array[player.position % 24].owner); // Calls payment function
  }
}

// Function that gives player chance to buy property
function property_purchase_request(player) {
  if (player.money >= board_location_array[player.position % 24].cost) { // Check to see if player has enough money to buy property
    var property_purchase_result = window.confirm('Would you like to buy this property?'); // Confirmation box for player, "Ok" gives true output, "Cancel" gives false output
    if (property_purchase_result == false) { // False means player doesn't buy property
      alert('You did not buy ' + board_location_array[player.position % 24].name);
    } else if (property_purchase_result == true) { // True means player purchases property
      alert("You now own " + board_location_array[player.position % 24].name);
      board_location_array[player.position % 24].owner = player.id;
      var propColor = document.getElementsByClassName("property");
      propColor[(player.position % 24)].classList.add(player.idString + "_owned_properties"); // Changes colour of tile to match player colour
      player.money -= board_location_array[player.position % 24].cost;
      updatePlayerMoney(player)
      player.owned_properties.push(board_location_array[player.position % 24].name) // Makes array of all properties owned by player
      player.owned_properties.sort();
      removeList(player);
      makeList(player);
      setCheck(player);
    }
  }else { // If player cannot afford property
    alert('You cannot afford ' + board_location_array[player.position % 24].name);
  }
}

// Function that makes payment from one player to another
function payment(player, property_owner) {
  for (var i = 0; i < players_array.length; i++) {
    if (players_array[i].id == property_owner) { // Checks which player owns the property
      players_array[i].money += board_location_array[player.position % 24].payout; // Owner gains rental money
      player.money -= board_location_array[player.position % 24].payout; // Current player loses money
      document.getElementById(players_array[i].idString + '_money').innerHTML = players_array[i].money;
      updatePlayerMoney(player);
      deathCheck(player);
    }
  }
}

// Function that removes the previous list of owned properties
function removeList(player) {
  var listElem = document.getElementsByClassName(`list${player.id}`)
  listElem[0].parentNode.removeChild(listElem[0]);
}

// Audio file ID's
var w = document.getElementById('iframeAudio');
var y =document.getElementById("sadAudio");
var x = document.getElementById("myAudio");
var z = document.getElementById("carhorn");

// Functions to play various audio cues
function playSadAudio() {
  y.play();
}

function playAudio() {
  x.play();
}

function playcarAudio() {
  x.play();
}

function stopBackMusic() {
  w.stop();
}

// Function that generates owned property lists for each player
function makeList(player) {
  player_property_array = `${player.idString}_owned_properties` // Make the list
  var listElement = document.createElement('ul');
  listElement.classList.add(`list${player.id}`);
  document.getElementById(`p${player.id}Property`).appendChild(listElement); // Add it to the page
  var numberOfListItems = player.owned_properties.length;  // Set up a loop that goes through the items in listItems one at a time
  for (var i = 0; i < numberOfListItems; ++i) {
    var listItem = document.createElement('li'); // create an item for each one
    listItem.innerHTML = player.owned_properties[i]; // Add the item text
    listElement.appendChild(listItem); // Add listItem to the listElement
  }
}

// Function that checks if a player has run out of money
function deathCheck(player) {
  if (player.money < 0) {
    alert(`${player.name} has run out of money!`)
  }
}

// Function that shows instructions when the "Instructions" button is pressed
function instructions() {
alert("MONOPOLY is the game of buying, renting or selling Properties so profitably that players increase their wealth – the wealthiest becoming the eventual winner. Starting from the GO space, move your token around the board according to your roll of the dice. When you land on a Property that is not already owned by anyone else, you may buy it from the Bank. Players who own Properties collect rents from opponents stopping there. On player turn, roll the dice, if you land on an unowned property: Decide whether to buy the property. If you own all properties of the same colour, all properties become twice as valuable and the rent doubles. If you land on a chance card a card will be randomly selected and it's effects will be automatically applied. If you land on your opponents property, you will pay them the value of the rent for that tile.");
}

// Function that tells the player which property they have landed on and gives relevant information
function landAlert(position) {
  alert(`You have landed on ${board_location_array[position].name} which costs £${board_location_array[position].cost} and will return £${board_location_array[position].payout} in rent.`)
}

// Function that runs all functions that relate to player movement
function move(player) {
  switch (player.position % 24) {
    case 1: // Case for location 1 on the board
      changePieceValue(1); // Adjusts piece value for tile landed on
      hide_character_icon(); // Removes previous player icon
      makeTokens(1); // Shows current location icon
      landAlert(1); // Shows relevant information
    break;
    case 2:
      changePieceValue(2);
      hide_character_icon();
      makeTokens(2);
      landAlert(2);
    break;
    case 3:
      changePieceValue(3);
      hide_character_icon();
      makeTokens(3);
      landAlert(3);
    break;
    case 4:
      changePieceValue(4);
      hide_character_icon();
      makeTokens(4);
      landAlert(4);
    break;
    case 5:
      changePieceValue(5);
      hide_character_icon();
      makeTokens(5);
      landAlert(5);
    break;
    case 6:
      changePieceValue(6);
      hide_character_icon();
      makeTokens(6);
      chance(player);
    break;
    case 7:
      changePieceValue(7);
      hide_character_icon();
      makeTokens(7);
      landAlert(7);
    break;
    case 8:
      changePieceValue(8);
      hide_character_icon();
      makeTokens(8);
      landAlert(8);
    break;
    case 9:
      changePieceValue(9);
      hide_character_icon();
      makeTokens(9);
      landAlert(9);
    break;
    case 10:
      changePieceValue(10);
      hide_character_icon();
      makeTokens(10);
      landAlert(10);
    break;
    case 11:
      changePieceValue(11);
      hide_character_icon();
      makeTokens(11);
      landAlert(11);
    break;
    case 12:
      changePieceValue(12);
      hide_character_icon();
      makeTokens(12);
      breakdown(player);
      playSadAudio();
    break;
    case 13:
      changePieceValue(13);
      hide_character_icon();
      makeTokens(13);
      landAlert(13);
    break;
    case 14:
      changePieceValue(14);
      hide_character_icon();
      makeTokens(14);
      landAlert(14);
    break;
    case 15:
      changePieceValue(15);
      hide_character_icon();
      makeTokens(15);
      landAlert(15);
    break;
    case 16:
      changePieceValue(16);
      hide_character_icon();
      makeTokens(16);
      landAlert(16);
    break;
    case 17:
      changePieceValue(17);
      hide_character_icon();
      makeTokens(17);
      landAlert(17);
    break;
    case 18:
      changePieceValue(18);
      hide_character_icon();
      makeTokens(18);
      alert("Free Parking! Pay nothing this turn");
      playcarAudio();
    break;
    case 19:
      changePieceValue(19);
      hide_character_icon();
      makeTokens(19);
      landAlert(19);
    break;
    case 20:
      changePieceValue(20);
      hide_character_icon();
      makeTokens(20);
      landAlert(20);
    break;
    case 21:
      changePieceValue(21);
      hide_character_icon();
      makeTokens(21);
      landAlert(21);
    break;
    case 22:
      changePieceValue(22);
      hide_character_icon();
      makeTokens(22);
      landAlert(22);
    break;
    case 23:
      changePieceValue(23);
      hide_character_icon();
      makeTokens(23);
      landAlert(23);
    break;
    case 0:
      changePieceValue(0);
      hide_character_icon();
      makeTokens(0);
    break;
    default:
    alert("Something went wrong. Don't move");
  }
}

// Function that controls chance cards
function chance(player) {
  var rand = Math.floor(Math.random()*chances.length) // Generates random number based on how many posibilities there are to get
  alert(`${chances[rand]}`)
  switch (rand) { // Switch case for each posibility
    case 0:
      if (player.position % 24 == 6 && turnCount % player.id == 0) {
        player.money -= 60;
        updatePlayerMoney(player)
        playSadAudio()
        deathCheck(player);
      }
    break;
    case 1:
      if (player.position % 24 == 6 && turnCount % player.id == 0) {
        player.money += 1;
        updatePlayerMoney(player)
        playAudio()
      }
    break;
    case 2:
      if (player.position%24 == 6 && turnCount % player.id == 0) {
        player.money += 200;
        updatePlayerMoney(player)
        playAudio();
      }
    break;
    case 3:
      if (player.position%24 == 6 && turnCount % player.id == 0) {
        player.money += 20;
        updatePlayerMoney(player)
        playAudio();
      }
    break;
    case 4:
      if (player.position % 24 == 6 && turnCount % player.id == 0) {
        player.money += 100;
        updatePlayerMoney(player)
        playAudio();
      }
    break;
    case 5:
      if (player.position % 24 == 6 && turnCount % player.id == 0) {
        player.money -= 100;
        updatePlayerMoney(player)
        playSadAudio();
        deathCheck(player);
      }
    break;
    case 6:
      if (player.position % 24 == 6 && turnCount % player.id == 0) {
        player.money -= 50;
        updatePlayerMoney(player)
        playSadAudio()
        deathCheck(player);
      }
    break;
    case 7: //Figure this out
      if (player.position % 24 == 6) {
        player2.money += 50;
        player1.money -= 50;
        document.getElementById('boot_money').innerHTML = player2.money;
        document.getElementById('hat_money').innerHTML = player1.money;
        playAudio();
        deathCheck(player1);
      }else if (player1.position % 24 == 6){
        player1.money += 50;
        player2.money -=50;
        document.getElementById('hat_money').innerHTML = player1.money;
        document.getElementById('boot_money').innerHTML = player2.money;
        playAudio();
        deathCheck(player2);
      }
    break;
    case 8:
      if (player.position % 24 == 6 && turnCount % player.id == 0) {
        player.money -= 10;
        updatePlayerMoney(player)
        playSadAudio();
        deathCheck(player);
      }
    break;
    case 9:
      if (player.position % 24 == 6 && turnCount % player.id == 0) {
        player.money -= 300;
        updatePlayerMoney(player)
        playSadAudio();
        deathCheck(player);
      }
    break;
    default:
  }
}

var chances = ["Chance card! Your neighbour complains that your new extension obstructs light to their property, pay £60 in reparations","Chance card! You come in second place in a beauty contest, win £1!","Chance card! Bank error in your favour, gain £200!","Chance card! Tax refund, claim £20","Chance card! You inherit £100 from a distant relative's death", "Chance card! You mistakenly invest in a Nigerian prince, lose £100","Chance card! Hospital fees, pay £50","Chance card! It's your birthday! Take £50 from the other player!","Chance card! Parking fine pay £10","Chance card! All of your money was invested in the Leyman Brothers, you lose £300"];


// Function that occurs when a player lands on the breakdown tile
function breakdown(player) {
  alert("Your car breaks down, pay £30 in repairs")
  player.money -= 30;
  updatePlayerMoney(player)
  deathCheck(player);
}

// Function that checks if all properties are owned by the same player, and if so, doubles their rental value
function setCheck(player) {
  var total_in_set = 0;
  var owned_in_set = 0;
  for (var i = 0; i < board_location_array.length; i++) {
    if (board_location_array[i].set_colour == board_location_array[player.position % 24].set_colour) {
      total_in_set += 1; // Finds how many properties are in the set
    }
    if (board_location_array[i].set_colour == board_location_array[player.position % 24].set_colour && board_location_array[i].owner == player.id) {
      owned_in_set += 1; // Finds out how many properties the current player owns
    }
  }
  if (owned_in_set == total_in_set) { // If equal then the player owns the entire set
    for (var i = 0; i < board_location_array.length; i++) {
      if (board_location_array[i].set_colour == board_location_array[player.position % 24].set_colour) {
        board_location_array[i].payout = board_location_array[i].payout * 2; // In this case the rent is doubled
      }
    }
    alert(`You have completed the ${board_location_array[player.position % 24].set_colour} set. All of the rents for these properties are doubled`);
  }
}

// Function that checks if the player has passed GO
function checkGo(player) {
  if (Math.floor(player.position/24) != player.times_past_go) { // Checks if the player has gone further round the board than one full circuit
    alert('You have passed Go! Collect £200')
    player.money += 200; // If true then they get £200
    player.times_past_go += 1;
    updatePlayerMoney(player)
  }
}

// Function that reloads the page when "Restart" button pressed
function reload() {
  document.getElementById('reload').addEventListener("click",function(){
    location.reload();
  })
}
