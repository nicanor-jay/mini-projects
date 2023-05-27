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

const GameSquare = ({ value, onClick = null }) => {
	const style = value === "X" ? "gameSquare x" : "gameSquare o";

	return (
		<div className={style} onClick={onClick}>
			{value}
		</div>
	);
};

const GameBoard = ({ board, onClick }) => {
	return (
		<>
			<div className="gameBoard">
				{board.map((square, idx) => {
					return (
						<GameSquare
							value={square}
							onClick={() => square === null && onClick(idx)}
						/>
					);
				})}
			</div>
		</>
	);
};

function App() {
	const [board, setBoard] = React.useState(Array(9).fill(null));
	const [playerTurn, setPlayerTurn] = React.useState(true);
	const [label, setLabel] = React.useState("X's Turn");
	const [buttonVisibility, setButtonVisibility] = React.useState(false);
	const [numTurns, setNumTurns] = React.useState(1);
	const [gameIsOver, setGameIsOver] = React.useState(false);

	const handleClick = (squareidx) => {
		const newBoard = board.map((value, idx) => {
			if (idx === squareidx) {
				return playerTurn === true ? "X" : "O";
			} else {
				return value;
			}
		});
		setBoard(newBoard);

		playerTurn ? checkWin(newBoard, "X") : checkWin(newBoard, "O");
		if (!gameIsOver) {
			setPlayerTurn(!playerTurn);
			updateLabel();
			setNumTurns(numTurns + 1);
			console.log(numTurns);
		}
	};

	const updateLabel = () => {
		playerTurn ? setLabel("O's Turn") : setLabel("X's Turn");
	};

	//Reset Game
	const resetGame = () => {
		setButtonVisibility(false);
		setPlayerTurn(true);
		updateLabel();
		setBoard(Array(9).fill(null));
		setNumTurns(1);

		//Reset square styles
	};

	//Game finished
	const gameOver = (state) => {
		//Update label to show game state
		switch (state) {
			case "X":
			case "O":
				setLabel(state.toUpperCase() + "'s Wins!");
				break;
			case "draw":
				setLabel("The game is a draw!");
				break;
		}
		setGameIsOver(true);
		setButtonVisibility(true);
	};

	const checkWin = (board, sym) => {
		for (let combination of winningCombinations) {
			const [a, b, c] = combination;

			// Check if all elements in the combination are the same and not empty
			if (board[a] !== null && board[a] === board[b] && board[a] === board[c]) {
				console.log("Winner!");
				gameOver(sym);
				setGameIsOver(true);
				return true; // Win found
			}
		}
		if (numTurns == 10) {
			gameOver("draw");
			setGameIsOver(true);
		}
		return false; // No win found
	};

	return (
		<div className="container">
			<h1>Tic-Tac-Toe</h1>
			<h2>{label}</h2>
			{buttonVisibility && (
				<button className="resetButton" onClick={resetGame}>
					Play Again
				</button>
			)}
			<GameBoard board={board} onClick={handleClick} />
		</div>
	);
}

const domNode = document.getElementById("app");
const root = ReactDOM.createRoot(domNode);

root.render(<App />);
