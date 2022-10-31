//DOM
const board = document.getElementById("board");
const box = document.getElementsByClassName("box");
const restartartingGame = document.getElementById("restartButton");
const gameStatus = document.getElementById("GameStat");

const buttonPlayer1 = document.getElementById("buttonplayer1");
const buttonPlayer2 = document.getElementById("buttonplayer2");
//form not working
const myForm = document.getElementById("myForm");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
let huh = document.getElementById("huh");


//the 'variables'
let THEGAMESTARTED = false;
let player = "X";

let gameState = {
  square: ["", "", "", "", "", "", "", "", ""],
};
const winConditions = [
  //going across
  //winnning conditions = 8
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  //going down
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  //going diag
  [0, 4, 8],
  [2, 4, 6],
];
//functions

function playerTurn() {
  //if X switch to O if O switch to X
  player = player == "X" ? "O" : "X";
  gameStatus.innerText = `${player}'s TURN`;
}
//winning function
function winner() {
  let round = false;

  //loop through winning conditions
  for (let i = 0; i < winConditions.length; i++) {
    const con = winConditions[i];
    //check nulls inside winning conditions and the index 0
    const bx1 = gameState.square[con[0]];
    const bx2 = gameState.square[con[1]];
    const bx3 = gameState.square[con[2]];

    if (bx1 === "" || bx2 === "" || bx3 === "") {
      continue;
    }

    if (bx1 == bx2 && bx2 == bx3) {
      round = true;
      break;
    }
  }
  //when someone wins and if there is a winner display current winnner or draw
  if (round) {
    playerTurn();
    gameStatus.innerText = `${player} wins!`;
    round = false;

    //else if gameState.square doesnt inlude any empty squares we want a draw
  } else if (!gameState.square.includes("")) {
    gameStatus.innerText = "DRAW";
  }
}
//rendering game
function renderBoard() {
  for (let i = 0; i < gameState.square.length; i++) {
    const currValue = gameState.square[i];
    const box = document.getElementById(`${i}`);
    box.innerText = currValue;
  }
}


//form not working
myForm.addEventListener("submit", function(e){
  e.preventDefault();
  huh.innerText = `${player1}is O ${player2} is X`;

})

//when user clicks on player 2
buttonPlayer2.addEventListener("click", function () {
  //make a two player form so when user presses enter we can render all the stuff and continue the game
  gameStatus.innerText = "X BEGINS";
  board.addEventListener("click", function (event) {

    THEGAMESTARTED = true;
    const index = event.target.id;

    if (gameState.square[index] === "X" || gameState.square[index] === "O") {
      return;
    }

    gameState.square[index] = player;
    playerTurn();
    winner();
    renderBoard();
  });
});

restartartingGame.addEventListener("click", function () {
  gameState = {
    square: ["", "", "", "", "", "", "", "", ""],
  };
  let THEGAMESTARTED = false;
  let player = "X";
  playerTurn();
  renderBoard();
});

