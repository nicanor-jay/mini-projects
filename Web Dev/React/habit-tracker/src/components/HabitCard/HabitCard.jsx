import { useEffect, useState } from "react";
import "./HabitCard.css";
import "../../variables.css";
import firebase from "../../utils/firebase.js";

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

	const updateHabitState = (date) => {
		const documentRef = habitsRef.doc(habitId);

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
