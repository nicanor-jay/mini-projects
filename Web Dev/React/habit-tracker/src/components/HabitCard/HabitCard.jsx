import { useEffect, useState } from "react";
import "./HabitCard.css";
import "../../variables.css";

function HabitCard({ habitId, name, color, history, updateHabitsHistory }) {
	const toggleState = (idx) => {
		updateHabitsHistory(habitId, idx);
	};

	return (
		<div className="card">
			<h2 className="habit-name" style={{ color: color }}>
				{name}
			</h2>
			<div className="history-container">
				{history.slice(0, 5).map((state, idx) => {
					return state.completed ? (
						<i
							className="fa-solid fa-check check-mark"
							key={idx}
							style={{ color: color }}
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
