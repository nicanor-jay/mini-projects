import { useEffect, useState } from "react";
import "./HabitHeader.css";
import "../../variables.css";

function HabitCard(dates = []) {
	const [currDates, setCurrDates] = useState(dates);
	return (
		<div className="card">
			<h2 className="habit-title fw-bold">Habits</h2>
			<div className="date-container"></div>
		</div>
	);
}

export default HabitCard;
