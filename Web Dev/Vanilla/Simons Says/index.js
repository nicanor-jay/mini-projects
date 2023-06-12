const colourButtons = document.querySelectorAll(".simonButton");
const colours = ["blue", "red", "green", "yellow"];
let currNumInputs = 0;
let gamePattern = ["blue", "red", "green"];
let userPattern = [];
const delay = 800;

function resetGame() {
	gamePattern = [];
	userPattern = [];
	numTurns = 0;
}

function addToPattern() {
	const randomIndex = Math.floor(Math.random() * colours.length);
	gamePattern.push(colours[randomIndex]);
	console.log(gamePattern);
	computerRenderClicks();
}

function computerRenderClicks() {
	let index = 0;

	const interval = setInterval(() => {
		if (index >= gamePattern.length) {
			clearInterval(interval); // Stop the interval when all buttons have been pressed
			return;
		}

		const id = gamePattern[index];
		const button = document.getElementById(id);
		button.classList.add("pressed");

		playSound(id);

		setTimeout(() => {
			button.classList.remove("pressed");
		}, delay / 2); // Remove the class after half the delay time

		index++;
	}, delay);
}

function handleButtonClick(event) {
	playSound(event.target.id);
	userPattern.push(event.target.id);
	if (currNumInputs < gamePattern.length - 1) {
		if (gamePattern[currNumInputs] == userPattern[currNumInputs]) {
			//User got it right
			currNumInputs += 1;
		} else {
			//User got it wrong
			//Play pattern again
			computerRenderClicks();
			currNumInputs = 0;
		}
	} else {
		currNumInputs = 0;
		userPattern = [];
		addToPattern();
	}
}

function playSound(id) {
	var audio = document.getElementById(`${id}-audio`);
	audio.play();
}

colourButtons.forEach((button) => {
	button.addEventListener("click", handleButtonClick);
});

const startButton = document.getElementById("startButton");
startButton.addEventListener("click", addToPattern);
