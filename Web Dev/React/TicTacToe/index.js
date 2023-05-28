//React app for tictactoe

const GameSquare = ({ value, onClick = null }) => {
	const style = value === "X" ? "gameSquare x" : "gameSquare o";

	return (
		<div className={style} onClick={onClick}>
			{value}
		</div>
	);
};

const GameBoard = () => {
	const [board, setBoard] = React.useState(Array(9).fill(null));
	const [isX, setIsX] = React.useState(true);
	const [label, setLabel] = React.useState("X's Turn");
	const [buttonVisibility, setButtonVisibility] = React.useState(false);

	const handleClick = (idx) => {
		if (checkWin(board) || board[idx]) {
			setButtonVisibility(true);
			return;
		}

		board[idx] = isX ? "X" : "O";
		setBoard(board);
		setIsX(!isX);
		if (checkWin(board)) {
			setLabel(isX ? "X Wins" : "O Wins");
			setButtonVisibility(true);
			return;
		}

		if (board.every((element) => element !== null)) {
			setLabel("Draw!");
			setButtonVisibility(true);
			return;
		}

		setLabel(isX ? "O's Turn" : "X's Turn");
	};

	const checkWin = (board) => {
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
		for (let combination of winningCombinations) {
			const [a, b, c] = combination;

			// Check if all elements in the combination are the same and not empty
			if (board[a] !== null && board[a] === board[b] && board[a] === board[c]) {
				console.log("Winner");
				return true; // Win found
			}
		}
		return false; // No win found
	};

	const resetGame = () => {
		setBoard(Array(9).fill(null));
		setIsX(true);
		setButtonVisibility(false);
		setLabel("X's Turn");
	};

	return (
		<>
			<h2>{label}</h2>
			{buttonVisibility && (
				<button className="resetButton" onClick={resetGame}>
					Play Again!
				</button>
			)}
			<div className="gameBoard">
				{board.map((square, idx) => {
					return (
						<GameSquare
							value={square}
							onClick={() => square === null && handleClick(idx)}
						/>
					);
				})}
			</div>
		</>
	);
};

function App() {
	return (
		<div className="container">
			<h1>Tic-Tac-Toe</h1>
			<GameBoard />
		</div>
	);
}

const domNode = document.getElementById("app");
const root = ReactDOM.createRoot(domNode);

root.render(<App />);
