var playerTurn = true;
var numTurns = 1;

const winningCombinations = [
  // Rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Diagonals
  [0, 4, 8],
  [2, 4, 6],
];

var buttons = document.getElementsByClassName("box");
var turnLabel = document.getElementById("turn-label");
//Asssigning button onclick listeners
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", () => updateBox(i), { once: true });
}

const updateBox = (id) => {
  // buttons[id].style.backgroundColor = "red";
  let button = buttons[id];

  console.log("Turn: " + numTurns + "\nUpdating: " + id + "\n");

  if (playerTurn) {
    button.classList.add("x");
    button.textContent = "X";
    turnLabel.textContent="O's Turn";
  } else {
    button.classList.add("o");
    button.textContent = "O";
    turnLabel.textContent="X's Turn";

  }
  numTurns++;
  button.removeEventListener("click", () => updateBox(id));
  if (numTurns > 5) {
    console.log("Checking for win");
    playerTurn ? checkWin("x") : checkWin("o");
  }

  playerTurn = !playerTurn;
};
// Function to check for a win
function checkWin(sym) {
  // Iterate over each winning combination
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;

    // Check if all elements in the combination are the same and not empty
    if (
      buttons[a].classList.contains(sym) &&
      buttons[b].classList.contains(sym) &&
      buttons[c].classList.contains(sym)
    ) {
      console.log("Winner!");

      buttons[a].style.backgroundColor = "white";
      buttons[b].style.backgroundColor = "white";
      buttons[c].style.backgroundColor = "white";
      return true; // Win found
    }
  }
  return false; // No win found
}
