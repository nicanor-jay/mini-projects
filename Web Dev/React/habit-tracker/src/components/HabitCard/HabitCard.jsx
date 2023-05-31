import { useEffect, useState } from "react";
import "./HabitCard.css";
import "../../variables.css";

function HabitCard({ value = "Hello", history }) {
	const [habitName, setHabitName] = useState(value);
	const [habitHistory, setHabitHistory] = useState(history);
	const [recentHistory, setRecentHistory] = useState([
		...habitHistory.slice(0, 5),
	]);
	``;

	useEffect(() => {
		setRecentHistory([...habitHistory.slice(0, 5)]);
	}, [habitHistory]);

	const toggleState = (idx) => {
		let newArray = [...habitHistory];
		newArray[idx] = !newArray[idx];
		setHabitHistory(newArray);
	};

	return (
		<div className="card">
			<h2 className="habit-name">{habitName}</h2>
			<div className="history-container">
				{recentHistory.map((state, idx) => {
					return state ? (
						<i
							className="fa-solid fa-check check-mark"
							key={idx}
							onClick={() => toggleState(idx)}
						></i>
					) : (
						<i
							className="fa-solid fa-xmark x-mark"
							key={idx}
							onClick={() => toggleState(idx)}
						></i>
					);
				})}
			</div>
		</div>
	);
}

export default HabitCard;
