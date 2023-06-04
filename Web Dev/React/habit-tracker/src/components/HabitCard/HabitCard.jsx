import { useEffect, useState } from "react";
import "./HabitCard.css";
import "../../variables.css";

function HabitCard({
	habitId,
	name,
	color,
	history,
	updateHabitsHistory,
	dateIndex,
	onClick,
}) {
	const toggleState = (idx) => {
		updateHabitsHistory(habitId, dateIndex + idx);
	};

	return (
		<div className="card">
			<h2
				className="habit-name"
				style={{ color: color }}
				onClick={() => onClick(habitId)}
				data-toggle="modal"
				data-target="#viewHabitModal"
			>
				{name}
			</h2>
			<i className="fa-solid fa-caret-left hidden"></i>
			<div className="history-container">
				{history.slice(dateIndex, dateIndex + 5).map((state, idx) => {
					return state.completed ? (
						<i
							className="fa-solid fa-check check-mark"
							key={idx + dateIndex}
							style={{ color: color }}
							onClick={() => toggleState(idx)}
						></i>
					) : (
						<i
							className="fa-solid fa-xmark x-mark"
							key={idx + dateIndex}
							onClick={() => toggleState(idx)}
						></i>
					);
				})}
			</div>

			<i className="fa-solid fa-caret-right hidden"></i>
		</div>
	);
}

export default HabitCard;
