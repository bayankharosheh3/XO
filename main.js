let playerX = document.getElementById("player1Won");
let playerO = document.getElementById("player2Won");
let playerXBox = document.getElementById("player1");
let playerOBox = document.getElementById("player2");
let draw = document.getElementById("drawTimes");
let round = document.getElementById("roundNumber");
let resetBtn = document.getElementById("reset");
let boxes = Array.from(document.getElementsByClassName("box"));
let winner = document.getElementById("winnerName");
let filledBoxes = [null, null, null, null, null, null, null, null, null];
let currentPlayer = "X";

const changePlayer = () => {
  if (currentPlayer == "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  selectPlayer();
};

const selectPlayer = () => {
  if (currentPlayer == "X") {
    playerOBox.classList.remove("selected");
    playerXBox.classList.add("selected");
  } else {
    playerXBox.classList.remove("selected");
    playerOBox.classList.add("selected");
  }
};

const startGame = () => {
  selectPlayer();
  boxes.forEach((box) => box.addEventListener("click", displayXorO));
  resetBtn.addEventListener("click", resetGame);
};

const displayXorO = (e) => {
  const id = e.target.id;
  if (filledBoxes[id] == null) {
    filledBoxes[id] = currentPlayer;
    e.target.innerText = currentPlayer;
    changePlayer();
    selectTheWinner();
  }
};

wining = [
  [0, 1, 2],
  [0, 4, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];

const selectTheWinner = () => {
  for (let i = 0; i < wining.length; i++) {
    let [box1, box2, box3] = wining[i];
    console.log(filledBoxes[box1], filledBoxes[box2], filledBoxes[box3]);

    if (
      filledBoxes[box1] != null &&
      filledBoxes[box1] == filledBoxes[box2] &&
      filledBoxes[box1] == filledBoxes[box3]
    ) {
      if (filledBoxes[box1] == "X") {
        console.log("X win");
        playerX.innerText++;
        round.innerText++;
        displayWinner("Player 1");
      } else {
        console.log("O win");
        playerO.innerText++;
        round.innerText++;
        displayWinner("Player 2");
      }
    }
  }

  checkDraw();
};

const displayWinner = (win) => {
  winner.innerText = win;
  document.getElementById("layer").style.display = "flex";
  setTimeout(startNewGame, 1200);
};

const startNewGame = () => {
  filledBoxes.fill(null);
  boxes.forEach((box) => (box.innerText = ""));
  currentPlayer = "X";
  document.getElementById("layer").style.display = "none";
};

const checkDraw = () => {
  if (filledBoxes.every((box) => box !== null)) {
    draw.innerText++;
    round.innerText++;
    displayWinner("No one");
  }
};

const resetGame = () => {
  filledBoxes.fill(null);
  boxes.forEach((box) => (box.innerText = ""));
  draw.innerText = 0;
  round.innerText = 0;
  playerO.innerText = 0;
  playerX.innerText = 0;
  currentPlayer = "X";
  selectPlayer();
  document.getElementById("layer").style.display = "none";
};

startGame();
