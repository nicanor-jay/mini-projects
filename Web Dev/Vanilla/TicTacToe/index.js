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
const resetButton = document.getElementById("reset-button");
var turnLabel = document.getElementById("turn-label");
resetButton.addEventListener("click", () => resetGame());
resetButton.style.display = "none";

//Assigning button onclick listeners
for (let i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener("click", () => updateBox(i), { once: true });
}

//Reset Game
const resetGame = () => {
	console.log("Reset");

	resetButton.style.display = "none";
	turnLabel.textContent = "X's Turn";
	turnLabel.style.fontSize = "24px";
	numTurns = 1;
	playerTurn = true;

	for (let i = 0; i < buttons.length; i++) {
		buttons[i].removeEventListener("click", () => updateBox(i), { once: true });
		buttons[i].addEventListener("click", () => updateBox(i), { once: true });
		buttons[i].classList.remove("x");
		buttons[i].classList.remove("o");
		buttons[i].classList.remove("winning-buttons");
		buttons[i].textContent = "";
	}
};

//Game finished
const gameOver = (state) => {
	//Update label to show game state
	switch (state) {
		case "x":
		case "o":
			turnLabel.textContent = state.toUpperCase() + "'s Wins!";
			turnLabel.style.fontSize = "50px";
			break;
			break;
		case "draw":
			turnLabel.textContent = "The game is a draw!";
			break;
	}
	resetButton.style.display = "inline-block";
};

//Updating each box
const updateBox = (id) => {
	let button = buttons[id];

	console.log("Turn: " + numTurns + "\nUpdating: " + id + "\n");

	if (playerTurn) {
		button.classList.add("x");
		button.textContent = "X";
		turnLabel.textContent = "O's Turn";
	} else {
		button.classList.add("o");
		button.textContent = "O";
		turnLabel.textContent = "X's Turn";
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
			gameOver(sym);

			buttons[a].classList.add("winning-buttons");
			buttons[b].classList.add("winning-buttons");
			buttons[c].classList.add("winning-buttons");

			return true; // Win found
		}
	}

	if (numTurns == 10) {
		gameOver("draw");
	}

	return false; // No win found
}
