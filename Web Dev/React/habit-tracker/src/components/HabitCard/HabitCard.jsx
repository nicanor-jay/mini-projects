import { useEffect, useState } from "react";
import "./HabitCard.css";
import "../../variables.css";
import firebase from "../../utils/firebase.js";
import getDaysBetweenDates from "../../utils/getDaysBetweenDates";
import generateHistory from "../../utils/generateHistory";

function HabitCard({
	habitId,
	name,
	color,
	history,
	dateIndex,
	handleHabitClick,
}) {
	const firestore = firebase.firestore();
	const habitsRef = firestore.collection("habits");
	const documentRef = habitsRef.doc(habitId);
	const [habitData, setHabitData] = useState([]);

	useEffect(() => {
		//Add missing data if app hasn't been accessed in some time.
		//Works by getting the number of days between the most recent document
		// and the current date. Generates the number of missing days with "false"
		// completions, and inserts into document.

		const today = new Date();
		const currentDateString = today.toLocaleDateString();

		if (currentDateString == history[0].date) {
			return;
		}

		const dateGapData = generateHistory(
			getDaysBetweenDates(currentDateString, history[0].date),
			false
		);

		const updatedHabitHistory = [...dateGapData, ...history];

		documentRef
			.update({ habitHistory: updatedHabitHistory.slice(0, 100) })
			.then()
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const updateHabitState = (date) => {
		const updatedHabitHistory = history.map((entry) => {
			if (entry.date === date) {
				// Replace with your specific date
				return { ...entry, completed: !entry.completed }; // Toggle the boolean value
			}
			return entry;
		});

		documentRef
			.update({ habitHistory: updatedHabitHistory })
			.then(() => console.log("Toggled " + name + " " + date))
			.catch((error) => {
				console.log("Error toggling " + name + " " + date);
			});
	};

	return (
		<div className="card">
			<h2
				className="habit-name"
				style={{ color: color }}
				onClick={() => handleHabitClick(habitId)}
				data-toggle="modal"
				data-target="#viewHabitModal"
			>
				{name}
			</h2>
			<i className="fa-solid fa-caret-left hidden"></i>
			<div className="history-container">
				{history.slice(dateIndex, dateIndex + 10).map((state, idx) => {
					return state.completed ? (
						<i
							className="fa-solid fa-check check-mark"
							key={idx + dateIndex}
							style={{ color: color }}
							onClick={() => updateHabitState(state.date)}
						></i>
					) : (
						<i
							className="fa-solid fa-xmark x-mark"
							key={idx + dateIndex}
							onClick={() => updateHabitState(state.date)}
						></i>
					);
				})}
			</div>

			<i className="fa-solid fa-caret-right hidden"></i>
		</div>
	);
}

export default HabitCard;
